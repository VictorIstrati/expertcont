import { preflight } from "../_shared/cors.ts";
import { getServiceClient } from "../_shared/supabase.ts";
import { normalizeLanguage, isEmail, requireString, clampString } from "../_shared/types.ts";
import { hashIp, userAgent, sourceUrl } from "../_shared/request-meta.ts";
import { json, badRequest, methodNotAllowed, serverError } from "../_shared/respond.ts";
import { notify } from "../_shared/notify.ts";

type QuoteItem = {
  key?: unknown;
  label?: unknown;
  detail?: unknown;
  params?: unknown;
  subtotal?: unknown;
  discountPct?: unknown;
  saleMonths?: unknown;
  originalSubtotal?: unknown;
};

type SanitizedParams =
  | { key: "accounting"; industry: string; invoices: number; revenueMDL: number; vat: boolean }
  | { key: "hr"; employees: number; perEmployee: number }
  | { key: "legal" | "financial" | "it"; hours: number; hourlyRate: number }
  | null;

function num(v: unknown): number {
  return typeof v === "number" && Number.isFinite(v) ? v : 0;
}

function sanitizeParams(raw: unknown): SanitizedParams {
  if (!raw || typeof raw !== "object") return null;
  const p = raw as Record<string, unknown>;
  switch (p.key) {
    case "accounting":
      return {
        key: "accounting",
        industry: typeof p.industry === "string" ? p.industry.slice(0, 100) : "",
        invoices: num(p.invoices),
        revenueMDL: num(p.revenueMDL),
        vat: p.vat === true,
      };
    case "hr":
      return { key: "hr", employees: num(p.employees), perEmployee: num(p.perEmployee) };
    case "legal":
    case "financial":
    case "it":
      return { key: p.key, hours: num(p.hours), hourlyRate: num(p.hourlyRate) };
    default:
      return null;
  }
}

type Body = {
  language?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  message?: unknown;
  total_mdl?: unknown;
  items?: unknown;
  source_url?: unknown;
};

const MAX_ITEMS = 50;

function sanitizeItems(input: unknown) {
  if (!Array.isArray(input)) return [];
  return input.slice(0, MAX_ITEMS).map((raw) => {
    const it = (raw ?? {}) as QuoteItem;
    const params = sanitizeParams(it.params);
    return {
      key: typeof it.key === "string" ? it.key.slice(0, 80) : null,
      label: typeof it.label === "string" ? it.label.slice(0, 200) : null,
      detail: typeof it.detail === "string" ? it.detail.slice(0, 300) : null,
      subtotal: num(it.subtotal),
      ...(params ? { params } : {}),
      ...(typeof it.discountPct === "number" ? { discountPct: it.discountPct } : {}),
      ...(typeof it.saleMonths === "number" ? { saleMonths: it.saleMonths } : {}),
      ...(typeof it.originalSubtotal === "number" ? { originalSubtotal: it.originalSubtotal } : {}),
    };
  });
}

Deno.serve(async (req) => {
  const pre = preflight(req);
  if (pre) return pre;
  if (req.method !== "POST") return methodNotAllowed(req);

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return badRequest(req, "Invalid JSON");
  }

  const name = requireString(body.name, 200);
  const phone = requireString(body.phone, 50);
  if (!name) return badRequest(req, "name is required");
  if (!phone) return badRequest(req, "phone is required");

  const totalNum = typeof body.total_mdl === "number" ? body.total_mdl : Number(body.total_mdl);
  if (!Number.isFinite(totalNum) || totalNum < 0) {
    return badRequest(req, "total_mdl must be a non-negative number");
  }

  const language = normalizeLanguage(body.language);
  const email = isEmail(body.email) ? (body.email as string) : null;
  const company = clampString(body.company, 200);
  const message = clampString(body.message, 5_000);
  const items = sanitizeItems(body.items);

  const supabase = getServiceClient();
  try {
    const { data: parent, error: parentErr } = await supabase
      .from("quotes")
      .insert({
        language,
        name,
        email,
        phone,
        company,
        total_mdl: totalNum,
        items,
        source_url: sourceUrl(req, body.source_url),
        user_agent: userAgent(req),
        ip_hash: await hashIp(req),
      })
      .select("id")
      .single();
    if (parentErr || !parent) throw parentErr ?? new Error("insert failed");

    if (message) {
      const { error: trErr } = await supabase
        .from("quote_translations")
        .insert({ submission_id: parent.id, language, message });
      if (trErr) throw trErr;
    }

    await notify({
      kind: "quote",
      language,
      summary: {
        id: parent.id,
        name,
        phone,
        email,
        total_mdl: totalNum,
        items: items.map((it) => ({
          label: it.label,
          detail: it.detail,
          subtotal: it.subtotal,
          ...(it.params ? { params: it.params } : {}),
          ...(it.discountPct !== undefined ? { discountPct: it.discountPct } : {}),
          ...(it.originalSubtotal !== undefined ? { originalSubtotal: it.originalSubtotal } : {}),
        })),
        message: message ?? undefined,
      },
    });

    return json(req, { ok: true, id: parent.id }, 201);
  } catch (err) {
    return serverError(req, err);
  }
});
