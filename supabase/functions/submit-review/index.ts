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
  rating?: unknown;
  title?: unknown;
  content?: unknown;
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
  const content = requireString(body.content, 5_000);
  const ratingNum = typeof body.rating === 'number' ? body.rating : Number(body.rating);
  if (!name) return badRequest(req, 'name is required');
  if (!content) return badRequest(req, 'content is required');
  if (!Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
    return badRequest(req, 'rating must be an integer between 1 and 5');
  }

  const language = normalizeLanguage(body.language);
  const email = isEmail(body.email) ? (body.email as string) : null;
  const title = clampString(body.title, 200);

  const supabase = getServiceClient();
  try {
    const { data: parent, error: parentErr } = await supabase
      .from('reviews')
      .insert({
        language,
        name,
        email,
        rating: ratingNum,
        source_url: sourceUrl(req, body.source_url),
        user_agent: userAgent(req),
        ip_hash: await hashIp(req),
      })
      .select('id')
      .single();
    if (parentErr || !parent) throw parentErr ?? new Error('insert failed');

    const { error: trErr } = await supabase
      .from('review_translations')
      .insert({ submission_id: parent.id, language, title, content });
    if (trErr) throw trErr;

    await notify({
      kind: 'review',
      language,
      summary: { id: parent.id, name, rating: ratingNum, title: title ?? '', content },
    });

    return json(req, { ok: true, id: parent.id }, 201);
  } catch (err) {
    return serverError(req, err);
  }
});
