import { preflight } from '../_shared/cors.ts';
import { getServiceClient } from '../_shared/supabase.ts';
import { normalizeLanguage, isEmail, requireString, clampString } from '../_shared/types.ts';
import { hashIp, userAgent, sourceUrl } from '../_shared/request-meta.ts';
import { json, badRequest, methodNotAllowed, serverError } from '../_shared/respond.ts';
import { notify } from '../_shared/notify.ts';

type Body = {
  language?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  preferred_at?: unknown;
  notes?: unknown;
  source_url?: unknown;
};

function parsePreferredAt(value: unknown): string | null {
  if (typeof value !== 'string' || !value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

Deno.serve(async (req) => {
  const pre = preflight(req);
  if (pre) return pre;
  if (req.method !== 'POST') return methodNotAllowed(req);

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return badRequest(req, 'Invalid JSON');
  }

  const name = requireString(body.name, 200);
  const email = isEmail(body.email) ? (body.email as string) : null;
  if (!name) return badRequest(req, 'name is required');
  if (!email) return badRequest(req, 'valid email is required');

  const language = normalizeLanguage(body.language);
  const phone = clampString(body.phone, 50);
  const company = clampString(body.company, 200);
  const notes = clampString(body.notes, 5_000);
  const preferred_at = parsePreferredAt(body.preferred_at);

  const supabase = getServiceClient();
  try {
    const { data: parent, error: parentErr } = await supabase
      .from('book_a_call_submissions')
      .insert({
        language,
        name,
        email,
        phone,
        company,
        preferred_at,
        source_url: sourceUrl(req, body.source_url),
        user_agent: userAgent(req),
        ip_hash: await hashIp(req),
      })
      .select('id')
      .single();
    if (parentErr || !parent) throw parentErr ?? new Error('insert failed');

    if (notes) {
      const { error: trErr } = await supabase
        .from('book_a_call_submission_translations')
        .insert({ submission_id: parent.id, language, notes });
      if (trErr) throw trErr;
    }

    await notify({
      kind: 'book_a_call',
      language,
      summary: { id: parent.id, name, email, preferred_at, notes },
    });

    return json(req, { ok: true, id: parent.id }, 201);
  } catch (err) {
    return serverError(req, err);
  }
});
