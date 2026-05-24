import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  let pathname = url.pathname;
  // 1. Strip legacy /ro prefix — RO is the default locale and serves at /.
  const deRoed = pathname.replace(/^\/ro(?=\/|$)/, "");
  if (deRoed !== pathname) pathname = deRoed || "/";
  // 2. Strip trailing slash from non-root paths so /ru/ → /ru, /en/foo/ → /en/foo.
  // Keeps canonical URLs unique and prevents duplicate-content indexing.
  if (pathname.length > 1 && pathname.endsWith("/")) {
    pathname = pathname.replace(/\/+$/, "");
  }
  if (pathname !== url.pathname) {
    return context.redirect(pathname + url.search + url.hash, 308);
  }
  return next();
});
