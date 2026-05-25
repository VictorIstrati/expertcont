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
  subject?: unknown;
  message?: unknown;
  source_url?: unknown;
};

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
  const message = requireString(body.message, 10_000);
  if (!name) return badRequest(req, 'name is required');
  if (!email) return badRequest(req, 'valid email is required');
  if (!message) return badRequest(req, 'message is required');

  const language = normalizeLanguage(body.language);
  const phone = clampString(body.phone, 50);
  const company = clampString(body.company, 200);
  const subject = clampString(body.subject, 300);

  const supabase = getServiceClient();
  try {
    const { data: parent, error: parentErr } = await supabase
      .from('contact_submissions')
      .insert({
        language,
        name,
        email,
        phone,
        company,
        source_url: sourceUrl(req, body.source_url),
        user_agent: userAgent(req),
        ip_hash: await hashIp(req),
      })
      .select('id')
      .single();
    if (parentErr || !parent) throw parentErr ?? new Error('insert failed');

    const { error: trErr } = await supabase
      .from('contact_submission_translations')
      .insert({ submission_id: parent.id, language, subject, message });
    if (trErr) throw trErr;

    await notify({
      kind: 'contact',
      language,
      summary: { id: parent.id, name, email, phone, subject: subject ?? '(no subject)', message },
    });

    return json(req, { ok: true, id: parent.id }, 201);
  } catch (err) {
    return serverError(req, err);
  }
});
