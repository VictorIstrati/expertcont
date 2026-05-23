import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  const stripped = url.pathname.replace(/^\/ro(?=\/|$)/, "");
  if (stripped !== url.pathname) {
    const dest = (stripped || "/") + url.search + url.hash;
    return context.redirect(dest, 308);
  }
  return next();
});
