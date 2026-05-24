#!/usr/bin/env node
// Post-build step: emit /foo.md alongside every /foo.html in dist/.
//
// The HTML page is the single source of truth. We extract <main id="page-content">
// (wrapped by PageShell) and convert that subtree to Markdown. JSON-LD scripts,
// nav, footer, cookie banner, modal hosts, and client islands are not part of
// page-content, so they're naturally excluded.
//
// Each .md file mirrors the URL of its sibling HTML: dist/preturi.html → /preturi.md,
// dist/blog/foo.html → /blog/foo.md. Index files map to .md as well: dist/index.html → /index.md.

import { readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import fg from "fast-glob";
import { load } from "cheerio";
import TurndownService from "turndown";

const ROOT = dirname(fileURLToPath(import.meta.url));
const DIST = join(ROOT, "..", "dist");
const SITE_URL = process.env.PUBLIC_SITE_URL ?? "https://expertcont.md";

const turndown = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
  emDelimiter: "_",
  linkStyle: "inlined",
});

// Strip <script>, <style>, and SVG icons — they pollute Markdown output.
turndown.remove(["script", "style", "svg", "noscript"]);

// Tables: turndown's default table rendering relies on the `gfm` plugin. Use a
// lightweight inline replacement so we don't pull another dep.
turndown.addRule("preserveTables", {
  filter: "table",
  replacement: (_content, node) => {
    const rows = Array.from(node.querySelectorAll("tr"));
    if (rows.length === 0) return "";
    const cells = (tr) =>
      Array.from(tr.querySelectorAll("th,td")).map((c) =>
        (c.textContent ?? "").replace(/\s+/g, " ").trim(),
      );
    const [head, ...body] = rows;
    const headCells = cells(head);
    const lines = [
      `| ${headCells.join(" | ")} |`,
      `| ${headCells.map(() => "---").join(" | ")} |`,
      ...body.map((r) => `| ${cells(r).join(" | ")} |`),
    ];
    return `\n\n${lines.join("\n")}\n\n`;
  },
});

async function extractPage(htmlPath) {
  const raw = await readFile(htmlPath, "utf8");
  const $ = load(raw);

  const title = $("title").first().text().trim();
  const description = ($('meta[name="description"]').attr("content") ?? "").trim();
  const canonical = ($('link[rel="canonical"]').attr("href") ?? "").trim();
  const ogLocale = ($('meta[property="og:locale"]').attr("content") ?? "").trim();
  const htmlLang = ($("html").attr("lang") ?? "").trim();

  const main = $("#page-content");
  if (main.length === 0) {
    return { meta: { title, description, canonical, ogLocale, htmlLang }, md: null };
  }

  // Drop client-side-only widgets that have no meaningful static content
  // (cookie banner, modal host hydration markers, theme toggles).
  main.find("[data-island-no-md]").remove();

  // Absolute-ify internal links so the Markdown stays useful when consumed
  // out of context (e.g., fed to an LLM that opens the citations).
  main.find("a[href^='/']").each((_i, el) => {
    const href = $(el).attr("href");
    if (href) $(el).attr("href", `${SITE_URL}${href}`);
  });

  const body = turndown.turndown(main.html() ?? "");
  const frontmatter = [
    "---",
    `title: ${JSON.stringify(title)}`,
    description ? `description: ${JSON.stringify(description)}` : null,
    canonical ? `canonical: ${canonical}` : null,
    ogLocale ? `locale: ${ogLocale}` : null,
    "---",
    "",
  ]
    .filter(Boolean)
    .join("\n");

  const md = `${frontmatter}\n# ${title}\n\n${body.trim()}\n`;
  return { meta: { title, description, canonical, ogLocale, htmlLang }, md };
}

/** Categorize a canonical URL path into an llms.txt section. */
function categorize(path) {
  const m = path.match(/^\/(ro|ru|en)(\/.*)?$|^\/?(.*)$/);
  let locale = "ro";
  let rest = path;
  if (path === "/" || path === "") {
    return { section: "Home", locale: "ro", order: 0 };
  }
  if (path.startsWith("/ru")) {
    locale = "ru";
    rest = path.slice(3) || "/";
  } else if (path.startsWith("/en")) {
    locale = "en";
    rest = path.slice(3) || "/";
  }
  if (rest === "/" || rest === "") return { section: "Home", locale, order: 0 };

  // Strip leading slash for matching.
  const r = rest.replace(/^\//, "");
  // Section-level pages (RO slugs + RU + EN equivalents).
  const sections = {
    Pricing: ["preturi", "tseny", "pricing"],
    Services: ["servicii", "uslugi", "services"],
    Blog: ["blog"],
    Guides: ["ghiduri", "rukovodstva", "guides"],
    About: ["despre-noi", "o-nas", "about"],
    Contact: ["contact", "kontakty"],
    FAQ: ["intrebari-frecvente", "voprosy", "faq"],
    Reviews: ["recenzii", "otzyvy", "reviews"],
    Solutions: ["solutii", "resheniya", "solutions"],
    Partners: ["parteneri", "partnery", "partners"],
    Careers: ["cariere", "kariera", "careers"],
    "HTML Sitemap": ["harta-site", "karta-sayta", "sitemap"],
    Legal: [
      "confidentialitate",
      "termeni",
      "cookies",
      "konfidentsialnost",
      "usloviya",
      "privacy",
      "terms",
    ],
  };

  const [first, ...rest2] = r.split("/");
  for (const [section, slugs] of Object.entries(sections)) {
    if (slugs.includes(first)) {
      const isDetail = rest2.length > 0;
      const order =
        { Home: 0, Pricing: 1, Services: 2, Blog: 3, Guides: 4, About: 5, FAQ: 6, Reviews: 7 }[
          section
        ] ?? 9;
      return {
        section: isDetail ? `${section} — articles` : section,
        locale,
        order,
        isDetail,
      };
    }
  }
  return { section: "Other", locale, order: 10, isDetail: false };
}

const LOCALE_LABEL = { ro: "RO", ru: "RU", en: "EN" };
const LOCALE_ORDER = { ro: 0, ru: 1, en: 2 };

function cleanTitle(title) {
  // Strip the " — ExpertCont" suffix that every page carries in its <title>.
  return title.replace(/\s+[—–-]\s+ExpertCont\s*$/i, "").trim();
}

function pathFromCanonical(canonical) {
  try {
    return new URL(canonical).pathname.replace(/\/$/, "") || "/";
  } catch {
    return null;
  }
}

function buildLlmsTxt(entries) {
  // entries: [{ canonical, mdUrl, title, description, locale, section, order, isDetail }]
  // Group by section name preserving insertion order via Map.
  const bySection = new Map();
  for (const e of entries) {
    if (!bySection.has(e.section)) bySection.set(e.section, []);
    bySection.get(e.section).push(e);
  }

  // Sort each section: locale (ro→ru→en) then alphabetical by title.
  for (const list of bySection.values()) {
    list.sort((a, b) => {
      const la = LOCALE_ORDER[a.locale] ?? 9;
      const lb = LOCALE_ORDER[b.locale] ?? 9;
      if (la !== lb) return la - lb;
      return a.title.localeCompare(b.title);
    });
  }

  // Order sections.
  const sortedSections = [...bySection.entries()].sort(([aName], [bName]) => {
    const aOrder = bySection.get(aName)[0].order ?? 9;
    const bOrder = bySection.get(bName)[0].order ?? 9;
    if (aOrder !== bOrder) return aOrder - bOrder;
    return aName.localeCompare(bName);
  });

  const lines = [];
  lines.push("# ExpertCont");
  lines.push("");
  lines.push(
    "> Servicii de contabilitate, evidență contabilă, consultanță juridică, HR și IT pentru companii din Republica Moldova. Pachete transparente de la 2499 MDL/lună (Start, Standard, Premium). Site trilingv (română, rusă, engleză).",
  );
  lines.push("");
  lines.push(
    "ExpertCont is an accounting firm based in Chișinău, Moldova, serving SRL, SA, ÎI and NGO clients across the country. Every page on this site is also available as clean Markdown by appending `.md` to the URL (e.g. `/preturi` → `/preturi.md`). Links below point to those Markdown views.",
  );
  lines.push("");

  // Move Home up first explicitly.
  const homeEntries = bySection.get("Home") ?? [];
  if (homeEntries.length > 0) {
    lines.push("## Home");
    lines.push("");
    for (const e of homeEntries) {
      lines.push(`- [${cleanTitle(e.title)} (${LOCALE_LABEL[e.locale]})](${e.mdUrl})`);
    }
    lines.push("");
  }

  // Then main content sections in declared order.
  const MAIN = ["Pricing", "Services", "Blog", "Guides", "About", "FAQ", "Reviews"];
  for (const sec of MAIN) {
    // Combine index + detail entries under one heading; index pages first.
    const index = bySection.get(sec) ?? [];
    const detail = bySection.get(`${sec} — articles`) ?? [];
    if (index.length === 0 && detail.length === 0) continue;
    lines.push(`## ${sec}`);
    lines.push("");
    for (const e of [...index, ...detail]) {
      const label = `${cleanTitle(e.title)} (${LOCALE_LABEL[e.locale]})`;
      if (e.description) {
        lines.push(`- [${label}](${e.mdUrl}): ${e.description}`);
      } else {
        lines.push(`- [${label}](${e.mdUrl})`);
      }
    }
    lines.push("");
  }

  // Optional section: legal + sitemap + other less-essential pages.
  const optionalSections = ["Solutions", "Partners", "Careers", "Contact", "Legal", "HTML Sitemap"];
  const optionalEntries = optionalSections.flatMap((s) => bySection.get(s) ?? []);
  if (optionalEntries.length > 0) {
    lines.push("## Optional");
    lines.push("");
    for (const e of optionalEntries) {
      const label = `${cleanTitle(e.title)} (${LOCALE_LABEL[e.locale]})`;
      lines.push(`- [${label}](${e.mdUrl})`);
    }
    lines.push(`- [XML sitemap](${SITE_URL}/sitemap.xml): Machine-readable index of all pages`);
    lines.push(`- [robots.txt](${SITE_URL}/robots.txt): Crawler access policy`);
    lines.push("");
  }

  return lines.join("\n");
}

async function main() {
  const htmlFiles = await fg(["**/*.html"], { cwd: DIST, absolute: true });

  const llmsEntries = [];
  let written = 0;
  let skipped = 0;
  for (const htmlPath of htmlFiles) {
    const result = await extractPage(htmlPath);
    if (result === null) {
      skipped += 1;
      continue;
    }
    const { meta, md } = result;

    if (md !== null) {
      const mdPath = htmlPath.replace(/\.html$/, ".md");
      // Prepend UTF-8 BOM so naive servers (incl. astro preview, which omits
      // the charset on text/markdown) trigger correct browser decoding.
      // Cloudflare Pages still serves explicit charset=utf-8 via public/_headers.
      await writeFile(mdPath, `﻿${md}`, "utf8");
      written += 1;
    }

    // Collect metadata for llms.txt (skip pages without canonical or content).
    const path = pathFromCanonical(meta.canonical);
    if (path && md !== null) {
      const cat = categorize(path);
      llmsEntries.push({
        canonical: meta.canonical,
        mdUrl: `${SITE_URL}${path === "/" ? "/index.md" : `${path}.md`}`,
        title: meta.title,
        description: meta.description,
        ...cat,
      });
    }
  }

  // Emit llms.txt at the dist root (no BOM — it's ASCII-safe in the header,
  // and any UTF-8 in titles/descriptions is fine since llms.txt consumers
  // are LLMs that read raw bytes).
  const llmsTxt = buildLlmsTxt(llmsEntries);
  await writeFile(join(DIST, "llms.txt"), `﻿${llmsTxt}`, "utf8");

  console.log(
    `[generate-markdown] wrote ${written} .md file(s) + llms.txt (${llmsEntries.length} entries)` +
      (skipped > 0 ? `, skipped ${skipped} page(s) without <main id="page-content">` : ""),
  );
}

main().catch((err) => {
  console.error("[generate-markdown] failed:", err);
  process.exit(1);
});
