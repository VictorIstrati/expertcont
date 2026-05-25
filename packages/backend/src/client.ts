import type {
  BookACallInput,
  ContactInput,
  FaqQuestionInput,
  NewsletterInput,
  QuoteInput,
  ReviewInput,
  SubmitResult,
} from './types.js';

export type BackendClientConfig = {
  /** Supabase project URL, e.g. https://xxx.supabase.co or http://127.0.0.1:55421 */
  supabaseUrl: string;
  /** Supabase publishable key (`sb_publishable_…`) — safe to ship to browser. */
  supabasePublishableKey: string;
  /** Optional fetch implementation (defaults to global fetch). */
  fetch?: typeof fetch;
};

export class BackendClient {
  constructor(private readonly cfg: BackendClientConfig) {}

  submitContact(input: ContactInput): Promise<SubmitResult> {
    return this.call('submit-contact', input);
  }

  submitReview(input: ReviewInput): Promise<SubmitResult> {
    return this.call('submit-review', input);
  }

  submitBookACall(input: BookACallInput): Promise<SubmitResult> {
    return this.call('submit-book-a-call', input);
  }

  submitNewsletter(input: NewsletterInput): Promise<SubmitResult> {
    return this.call('submit-newsletter', input);
  }

  submitFaqQuestion(input: FaqQuestionInput): Promise<SubmitResult> {
    return this.call('submit-faq-question', input);
  }

  submitQuote(input: QuoteInput): Promise<SubmitResult> {
    return this.call('submit-quote', input);
  }

  private async call(fn: string, body: unknown): Promise<SubmitResult> {
    const f = this.cfg.fetch ?? fetch;
    const res = await f(`${this.cfg.supabaseUrl}/functions/v1/${fn}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: this.cfg.supabasePublishableKey,
        Authorization: `Bearer ${this.cfg.supabasePublishableKey}`,
      },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    const parsed = safeJson(text);
    if (!res.ok) {
      const error = (parsed && typeof parsed === 'object' && 'error' in parsed && typeof parsed.error === 'string')
        ? parsed.error
        : `Request failed (${res.status})`;
      return { ok: false, error, status: res.status };
    }
    return parsed as SubmitResult;
  }
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
