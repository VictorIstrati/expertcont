import { defineConfig } from "astro/config";
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const SITE = "https://expertcont.md";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Section keys mirrored from @expertcont/i18n. Kept in sync manually because
// astro.config can't import workspace ESM that depends on Lingui macros.
const routeSegments = {
  solutions: { ro: "solutii", ru: "resheniya", en: "solutions" },
  services: { ro: "servicii", ru: "uslugi", en: "services" },
  pricing: { ro: "preturi", ru: "tseny", en: "pricing" },
  contact: { ro: "contact", ru: "kontakty", en: "contact" },
  faq: { ro: "intrebari-frecvente", ru: "voprosy", en: "faq" },
  reviews: { ro: "recenzii", ru: "otzyvy", en: "reviews" },
  blog: { ro: "blog", ru: "blog", en: "blog" },
  guides: { ro: "ghiduri", ru: "rukovodstva", en: "guides" },
  about: { ro: "despre-noi", ru: "o-nas", en: "about" },
  privacy: { ro: "confidentialitate", ru: "konfidentsialnost", en: "privacy" },
  terms: { ro: "termeni", ru: "usloviya", en: "terms" },
  cookies: { ro: "cookies", ru: "cookies", en: "cookies" },
  partners: { ro: "parteneri", ru: "partnery", en: "partners" },
  careers: { ro: "cariere", ru: "kariera", en: "careers" },
  sitemap: { ro: "harta-site", ru: "karta-sayta", en: "sitemap" },
};

const LOCALES = ["ro", "ru", "en"];

function localePrefix(locale) {
  return locale === "ro" ? "" : `/${locale}`;
}

function loadMetaSlugs(dir) {
  const fullDir = resolve(__dirname, "src/content", dir);
  const map = {};
  for (const file of readdirSync(fullDir)) {
    if (!file.endsWith(".json")) continue;
    const data = JSON.parse(readFileSync(resolve(fullDir, file), "utf8"));
    map[data.id] = { slugs: data.slugs, updated: data.updated };
  }
  return map;
}

const contentSlugs = {
  services: loadMetaSlugs("services-meta"),
  blog: loadMetaSlugs("blog-meta"),
  guides: loadMetaSlugs("guides-meta"),
};

function buildAlternateIndex() {
  const index = new Map();

  function add(siblings, lastmod) {
    for (const locale of LOCALES) {
      index.set(siblings[locale], { siblings, lastmod });
    }
  }

  add({ ro: "/", ru: "/ru", en: "/en" });

  for (const section of Object.keys(routeSegments)) {
    const siblings = {};
    for (const locale of LOCALES) {
      siblings[locale] = `${localePrefix(locale)}/${routeSegments[section][locale]}`;
    }
    add(siblings);
  }

  for (const section of ["services", "blog", "guides"]) {
    for (const id of Object.keys(contentSlugs[section])) {
      const { slugs, updated } = contentSlugs[section][id];
      const siblings = {};
      for (const locale of LOCALES) {
        siblings[locale] =
          `${localePrefix(locale)}/${routeSegments[section][locale]}/${slugs[locale]}`;
      }
      add(siblings, updated);
    }
  }

  return index;
}

const alternateIndex = buildAlternateIndex();

function normalizePath(url) {
  try {
    const u = new URL(url);
    let p = u.pathname.replace(/\/$/, "");
    if (p === "") p = "/";
    return p;
  } catch {
    return url;
  }
}

export default defineConfig({
  site: SITE,
  integrations: [
    mdx(),
    react({
      babel: {
        plugins: ["@lingui/babel-plugin-lingui-macro"],
      },
    }),
    sitemap({
      serialize(item) {
        // Strip trailing slashes so <loc> matches our canonicals (Base.astro
        // uses path without trailing slash).
        const url = item.url.replace(/\/$/, "") || `${SITE}/`;
        const path = normalizePath(url);
        const match = alternateIndex.get(path);
        if (!match) return { ...item, url };
        const links = LOCALES.map((locale) => ({
          lang: locale,
          url: `${SITE}${match.siblings[locale]}`,
        }));
        links.push({ lang: "x-default", url: `${SITE}${match.siblings.ro}` });
        return {
          ...item,
          url,
          links,
          ...(match.lastmod ? { lastmod: match.lastmod } : {}),
        };
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
