import type { APIRoute } from "astro";

const SITE = "https://expertcont.md";

// Mirrors the sitemapindex emitted by @astrojs/sitemap at /sitemap-index.xml,
// so the conventional /sitemap.xml URL also works for crawlers that hardcode it.
export const GET: APIRoute = () =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${SITE}/sitemap-0.xml</loc></sitemap>
</sitemapindex>
`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
