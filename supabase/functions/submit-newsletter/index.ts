import { preflight } from '../_shared/cors.ts';
import { getServiceClient } from '../_shared/supabase.ts';
import { normalizeLanguage, isEmail } from '../_shared/types.ts';
import { hashIp, userAgent, sourceUrl } from '../_shared/request-meta.ts';
import { json, badRequest, methodNotAllowed, serverError } from '../_shared/respond.ts';
import { notify } from '../_shared/notify.ts';

type Body = {
  language?: unknown;
  email?: unknown;
  source_url?: unknown;
};

function makeToken(): string {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
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

  if (!isEmail(body.email)) return badRequest(req, 'valid email is required');
  const email = (body.email as string).toLowerCase();
  const language = normalizeLanguage(body.language);

  const supabase = getServiceClient();
  try {
    const { data: existing, error: existingErr } = await supabase
      .from('newsletter_subscribers')
      .select('id, status')
      .ilike('email', email)
      .in('status', ['pending', 'confirmed'])
      .maybeSingle();
    if (existingErr) throw existingErr;
    if (existing) {
      return json(req, { ok: true, id: existing.id, already_subscribed: true }, 200);
    }

    const { data: inserted, error: insertErr } = await supabase
      .from('newsletter_subscribers')
      .insert({
        language,
        email,
        confirmation_token: makeToken(),
        source_url: sourceUrl(req, body.source_url),
        user_agent: userAgent(req),
        ip_hash: await hashIp(req),
      })
      .select('id')
      .single();
    if (insertErr || !inserted) throw insertErr ?? new Error('insert failed');

    await notify({ kind: 'newsletter', language, summary: { id: inserted.id, email } });

    return json(req, { ok: true, id: inserted.id }, 201);
  } catch (err) {
    return serverError(req, err);
  }
});
