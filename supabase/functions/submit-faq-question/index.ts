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
  topic?: unknown;
  question?: unknown;
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
  const question = requireString(body.question, 5_000);
  if (!name) return badRequest(req, 'name is required');
  if (!email) return badRequest(req, 'valid email is required');
  if (!question) return badRequest(req, 'question is required');

  const language = normalizeLanguage(body.language);
  const topic = clampString(body.topic, 80);

  const supabase = getServiceClient();
  try {
    const { data: parent, error: parentErr } = await supabase
      .from('faq_question_submissions')
      .insert({
        language,
        name,
        email,
        topic,
        source_url: sourceUrl(req, body.source_url),
        user_agent: userAgent(req),
        ip_hash: await hashIp(req),
      })
      .select('id')
      .single();
    if (parentErr || !parent) throw parentErr ?? new Error('insert failed');

    const { error: trErr } = await supabase
      .from('faq_question_submission_translations')
      .insert({ submission_id: parent.id, language, question });
    if (trErr) throw trErr;

    await notify({
      kind: 'faq_question',
      language,
      summary: { id: parent.id, name, email, topic: topic ?? '—', question },
    });

    return json(req, { ok: true, id: parent.id }, 201);
  } catch (err) {
    return serverError(req, err);
  }
});
