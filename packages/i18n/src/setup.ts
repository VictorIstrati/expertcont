import { i18n } from "@lingui/core";
import type { Messages } from "@lingui/core";
import type { Locale } from "./locales";

export async function activateLocale(locale: Locale): Promise<void> {
  let mod!: { messages: Messages };
  switch (locale) {
    case "ro":
      mod = await import("./locales/ro/messages");
      break;
    case "ru":
      mod = await import("./locales/ru/messages");
      break;
    case "en":
      mod = await import("./locales/en/messages");
      break;
  }
  i18n.load(locale, mod.messages);
  i18n.activate(locale);
}

export { i18n };
