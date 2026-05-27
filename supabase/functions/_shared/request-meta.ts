/**
 * Hash the caller IP with a server-side salt so we can rate-limit / dedupe
 * without storing raw IPs (GDPR-friendlier).
 */
export async function hashIp(req: Request): Promise<string | null> {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? req.headers.get("x-real-ip");
  if (!ip) return null;
  const salt = Deno.env.get("IP_HASH_SALT") ?? "";
  const data = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function userAgent(req: Request): string | null {
  return req.headers.get("user-agent")?.slice(0, 500) ?? null;
}

export function sourceUrl(req: Request, fallback?: unknown): string | null {
  if (typeof fallback === "string" && fallback.length <= 500) return fallback;
  return req.headers.get("referer")?.slice(0, 500) ?? null;
}
