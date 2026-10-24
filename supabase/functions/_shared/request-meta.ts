const encoder = new TextEncoder();
let hmacKey: Promise<CryptoKey> | null = null;

function ipHashKey(): Promise<CryptoKey> | null {
  const secret = Deno.env.get("IP_HASH_SALT");
  if (!secret || secret.length < 32) return null;
  hmacKey ??= crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return hmacKey;
}

export async function hashIp(req: Request): Promise<string | null> {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? req.headers.get("x-real-ip");
  if (!ip) return null;
  const key = ipHashKey();
  if (!key) return null;
  const signature = await crypto.subtle.sign("HMAC", await key, encoder.encode(ip));
  return Array.from(new Uint8Array(signature))
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
