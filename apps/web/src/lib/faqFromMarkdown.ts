import type { FaqEntry } from "./jsonLd";

const FAQ_HEADINGS = [
  "Întrebări frecvente",
  "Частые вопросы",
  "Frequently asked questions",
  "Часті запитання",
];

function toPlainText(markdown: string): string {
  return markdown
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function faqFromMarkdown(body: string): FaqEntry[] {
  const section = body
    .split(/^## /m)
    .find((part) => FAQ_HEADINGS.includes((part.split("\n", 1)[0] ?? "").trim()));
  if (!section) return [];

  return section
    .split(/^### /m)
    .slice(1)
    .map((block) => {
      const [question = "", ...answer] = block.split("\n");
      const beforeRule = answer.join("\n").split(/^---$/m)[0] ?? "";
      return { q: toPlainText(question), a: toPlainText(beforeRule) };
    })
    .filter((entry) => entry.q !== "" && entry.a !== "");
}
