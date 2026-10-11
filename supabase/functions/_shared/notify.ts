/**
 * Zoho Cliq notifications for new form submissions.
 *
 * Required env: ZOHO_CLIQ_WEBHOOK_URL — the channel's incoming-message URL
 * including its zapikey, e.g.
 * https://cliq.zoho.eu/api/v2/channelsbyname/<channel>/message?zapikey=<key>
 */

export type NotifyPayload =
  | {
      kind: "contact";
      language: string;
      summary: {
        id: string;
        name: string;
        phone: string;
        email: string | null;
        subject: string;
        message?: string;
      };
    }
  | {
      kind: "review";
      language: string;
      summary: { id: string; name: string; rating: number; title: string; content?: string };
    }
  | {
      kind: "newsletter";
      language: string;
      summary: { id: string; email: string };
    }
  | {
      kind: "book_a_call";
      language: string;
      summary: {
        id: string;
        name: string;
        phone: string;
        email: string | null;
        preferred_at: string | null;
        notes?: string | null;
      };
    }
  | {
      kind: "faq_question";
      language: string;
      summary: { id: string; name: string; email: string; topic: string; question: string };
    }
  | {
      kind: "quote";
      language: string;
      summary: {
        id: string;
        name: string;
        phone: string;
        email: string | null;
        total_mdl: number;
        items: Array<{
          label?: string | null;
          detail?: string | null;
          subtotal: number;
          discountPct?: number;
          originalSubtotal?: number;
          params?:
            | {
                key: "accounting";
                industry: string;
                invoices: number;
                revenueMDL: number;
                vat: boolean;
              }
            | { key: "hr"; employees: number; perEmployee: number }
            | { key: "legal" | "financial" | "it"; hours: number; hourlyRate: number };
        }>;
        message?: string;
      };
    };

const HEADINGS: Record<NotifyPayload["kind"], string> = {
  contact: "📨 New contact message",
  review: "⭐ New review",
  newsletter: "📰 New newsletter subscriber",
  book_a_call: "📞 New booking request",
  faq_question: "❓ New FAQ question",
  quote: "💰 New price quote",
};

function row(label: string, value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === "") return "";
  return `*${label}:* ${String(value)}\n`;
}

function renderMessage(payload: NotifyPayload): string {
  const head = `*${HEADINGS[payload.kind]}*\n\n`;
  switch (payload.kind) {
    case "contact": {
      const s = payload.summary;
      return (
        head +
        row("Name", s.name) +
        row("Phone", s.phone) +
        row("Email", s.email) +
        row("Subject", s.subject) +
        (s.message ? `\n${s.message.slice(0, 3500)}` : "")
      );
    }
    case "review": {
      const s = payload.summary;
      const stars = "★".repeat(s.rating) + "☆".repeat(5 - s.rating);
      return (
        head +
        row("Name", s.name) +
        row("Rating", `${stars} (${s.rating}/5)`) +
        row("Title", s.title) +
        (s.content ? `\n${s.content.slice(0, 3500)}` : "")
      );
    }
    case "newsletter":
      return head + row("Email", payload.summary.email);
    case "book_a_call": {
      const s = payload.summary;
      return (
        head +
        row("Name", s.name) +
        row("Phone", s.phone) +
        row("Email", s.email) +
        row("Preferred at", s.preferred_at ?? "—") +
        (s.notes ? `\n${s.notes.slice(0, 3500)}` : "")
      );
    }
    case "faq_question": {
      const s = payload.summary;
      return (
        head +
        row("Name", s.name) +
        row("Email", s.email) +
        row("Topic", s.topic) +
        `\n${s.question.slice(0, 3500)}`
      );
    }
    case "quote": {
      const s = payload.summary;
      const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 2 });
      type QuoteParams = NonNullable<(typeof s)["items"][number]["params"]>;
      const renderParamLines = (params: QuoteParams): string[] => {
        switch (params.key) {
          case "accounting":
            return [
              `Industry: ${params.industry}`,
              `Invoices/mo: ${params.invoices}`,
              `Revenue: ${fmt(params.revenueMDL)} MDL`,
              `VAT registered: ${params.vat ? "Yes" : "No"}`,
            ];
          case "hr":
            return [`Employees: ${params.employees} × ${fmt(params.perEmployee)} MDL`];
          case "legal":
          case "financial":
          case "it":
            return [`Hours: ${params.hours} × ${fmt(params.hourlyRate)} MDL/h`];
        }
      };
      const itemsBlock =
        s.items.length === 0
          ? ""
          : "\n*Items:*\n" +
            s.items
              .slice(0, 20)
              .map((it) => {
                const label = it.label ?? "—";
                const priceParts: string[] = [];
                if (it.originalSubtotal !== undefined && it.discountPct !== undefined) {
                  priceParts.push(`~${fmt(it.originalSubtotal)}~`);
                  priceParts.push(`*${fmt(it.subtotal)} MDL*`);
                  priceParts.push(`(−${it.discountPct}%)`);
                } else {
                  priceParts.push(`*${fmt(it.subtotal)} MDL*`);
                }
                const head = `• ${label} — ${priceParts.join(" ")}`;
                const detailLines = it.params
                  ? renderParamLines(it.params).map((line) => `   ${line}`)
                  : it.detail
                    ? [`   ${it.detail}`]
                    : [];
                return [head, ...detailLines].join("\n");
              })
              .join("\n\n");
      return (
        head +
        row("Name", s.name) +
        row("Phone", s.phone) +
        row("Email", s.email) +
        row("Total", `${fmt(s.total_mdl)} MDL/mo`) +
        itemsBlock +
        (s.message ? `\n\n*Message:*\n${s.message.slice(0, 3500)}` : "")
      );
    }
  }
}

export async function notify(payload: NotifyPayload): Promise<void> {
  const webhookUrl = Deno.env.get("ZOHO_CLIQ_WEBHOOK_URL");
  if (!webhookUrl) {
    console.warn("[notify] ZOHO_CLIQ_WEBHOOK_URL not set; skipping", payload.kind);
    return;
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: renderMessage(payload) }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error("[notify] zoho cliq error", res.status, body);
    }
  } catch (err) {
    console.error("[notify] zoho cliq fetch failed", err);
  }
}
