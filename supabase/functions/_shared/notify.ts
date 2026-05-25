/**
 * Telegram notifications for new form submissions.
 *
 * Required env: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
 * (Optional) TELEGRAM_PARSE_MODE — default 'HTML'.
 */

export type NotifyPayload =
  | {
      kind: 'contact';
      language: string;
      summary: { id: string; name: string; email: string; subject: string; phone?: string | null; message?: string };
    }
  | {
      kind: 'review';
      language: string;
      summary: { id: string; name: string; rating: number; title: string; content?: string };
    }
  | {
      kind: 'newsletter';
      language: string;
      summary: { id: string; email: string };
    }
  | {
      kind: 'book_a_call';
      language: string;
      summary: { id: string; name: string; email: string; preferred_at: string | null; notes?: string | null };
    }
  | {
      kind: 'faq_question';
      language: string;
      summary: { id: string; name: string; email: string; topic: string; question: string };
    }
  | {
      kind: 'quote';
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
            | { key: 'accounting'; industry: string; invoices: number; revenueMDL: number; vat: boolean }
            | { key: 'hr'; employees: number; perEmployee: number }
            | { key: 'legal' | 'financial' | 'it'; hours: number; hourlyRate: number };
        }>;
        message?: string;
      };
    };

const HEADINGS: Record<NotifyPayload['kind'], string> = {
  contact: '📨 New contact message',
  review: '⭐ New review',
  newsletter: '📰 New newsletter subscriber',
  book_a_call: '📞 New booking request',
  faq_question: '❓ New FAQ question',
  quote: '💰 New price quote',
};

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function row(label: string, value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === '') return '';
  return `<b>${escapeHtml(label)}:</b> ${escapeHtml(String(value))}\n`;
}

function renderMessage(payload: NotifyPayload): string {
  const head = `<b>${HEADINGS[payload.kind]}</b>\n\n`;
  switch (payload.kind) {
    case 'contact': {
      const s = payload.summary;
      return (
        head +
        row('Name', s.name) +
        row('Email', s.email) +
        row('Phone', s.phone) +
        row('Subject', s.subject) +
        (s.message ? `\n${escapeHtml(s.message).slice(0, 3500)}` : '')
      );
    }
    case 'review': {
      const s = payload.summary;
      const stars = '★'.repeat(s.rating) + '☆'.repeat(5 - s.rating);
      return (
        head +
        row('Name', s.name) +
        row('Rating', `${stars} (${s.rating}/5)`) +
        row('Title', s.title) +
        (s.content ? `\n${escapeHtml(s.content).slice(0, 3500)}` : '')
      );
    }
    case 'newsletter':
      return head + row('Email', payload.summary.email);
    case 'book_a_call': {
      const s = payload.summary;
      return (
        head +
        row('Name', s.name) +
        row('Email', s.email) +
        row('Preferred at', s.preferred_at ?? '—') +
        (s.notes ? `\n${escapeHtml(s.notes).slice(0, 3500)}` : '')
      );
    }
    case 'faq_question': {
      const s = payload.summary;
      return (
        head +
        row('Name', s.name) +
        row('Email', s.email) +
        row('Topic', s.topic) +
        `\n${escapeHtml(s.question).slice(0, 3500)}`
      );
    }
    case 'quote': {
      const s = payload.summary;
      const fmt = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 2 });
      type QuoteParams = NonNullable<(typeof s)['items'][number]['params']>;
      const renderParamLines = (params: QuoteParams): string[] => {
        switch (params.key) {
          case 'accounting':
            return [
              `Industry: ${escapeHtml(params.industry)}`,
              `Invoices/mo: ${params.invoices}`,
              `Revenue: ${fmt(params.revenueMDL)} MDL`,
              `VAT registered: ${params.vat ? 'Yes' : 'No'}`,
            ];
          case 'hr':
            return [`Employees: ${params.employees} × ${fmt(params.perEmployee)} MDL`];
          case 'legal':
          case 'financial':
          case 'it':
            return [`Hours: ${params.hours} × ${fmt(params.hourlyRate)} MDL/h`];
        }
      };
      const itemsBlock =
        s.items.length === 0
          ? ''
          : '\n<b>Items:</b>\n' +
            s.items
              .slice(0, 20)
              .map((it) => {
                const label = escapeHtml(it.label ?? '—');
                const priceParts: string[] = [];
                if (it.originalSubtotal !== undefined && it.discountPct !== undefined) {
                  priceParts.push(`<s>${fmt(it.originalSubtotal)}</s>`);
                  priceParts.push(`<b>${fmt(it.subtotal)} MDL</b>`);
                  priceParts.push(`(−${it.discountPct}%)`);
                } else {
                  priceParts.push(`<b>${fmt(it.subtotal)} MDL</b>`);
                }
                const head = `• ${label} — ${priceParts.join(' ')}`;
                const detailLines = it.params
                  ? renderParamLines(it.params).map((line) => `   ${line}`)
                  : it.detail
                    ? [`   ${escapeHtml(it.detail)}`]
                    : [];
                return [head, ...detailLines].join('\n');
              })
              .join('\n\n');
      return (
        head +
        row('Name', s.name) +
        row('Phone', s.phone) +
        row('Email', s.email) +
        row('Total', `${fmt(s.total_mdl)} MDL/mo`) +
        itemsBlock +
        (s.message ? `\n\n<b>Message:</b>\n${escapeHtml(s.message).slice(0, 3500)}` : '')
      );
    }
  }
}

export async function notify(payload: NotifyPayload): Promise<void> {
  const token = Deno.env.get('TELEGRAM_BOT_TOKEN');
  const chatId = Deno.env.get('TELEGRAM_CHAT_ID');
  if (!token || !chatId) {
    console.warn('[notify] TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID not set; skipping', payload.kind);
    return;
  }

  const text = renderMessage(payload);
  const parseMode = Deno.env.get('TELEGRAM_PARSE_MODE') ?? 'HTML';

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: parseMode,
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error('[notify] telegram error', res.status, body);
    }
  } catch (err) {
    // Never let a Telegram failure break the submission flow.
    console.error('[notify] telegram fetch failed', err);
  }
}
