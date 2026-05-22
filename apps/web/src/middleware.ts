import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  if (url.pathname === "/ro" || url.pathname.startsWith("/ro/")) {
    const target = url.pathname.replace(/^\/ro/, "") || "/";
    return context.redirect(target + url.search, 308);
  }
  return next();
});
