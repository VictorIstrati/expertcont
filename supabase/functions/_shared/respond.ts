import { corsHeaders } from './cors.ts';

export function json(req: Request, body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders(req.headers.get('origin')),
      'Content-Type': 'application/json',
    },
  });
}

export function badRequest(req: Request, message: string): Response {
  return json(req, { error: message }, 400);
}

export function methodNotAllowed(req: Request): Response {
  return json(req, { error: 'Method not allowed' }, 405);
}

export function serverError(req: Request, err: unknown): Response {
  console.error('edge function error', err);
  return json(req, { error: 'Internal error' }, 500);
}
