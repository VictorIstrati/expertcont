import type { SectionKey } from "@expertcont/i18n";
import { site } from "../../site";

export const EMAIL = site.business.email;
export const PHONE = site.business.phone;
export const DPO_EMAIL = "dpo@expertcont.md";
export const LEGAL_NAME = site.business.name;
export const ADDR_RO = `${site.business.address.street.ro}, ${site.business.address.city.ro}, ${site.business.address.postalCode}`;
export const ADDR_RU = `${site.business.address.street.ru}, ${site.business.address.city.ru}, ${site.business.address.postalCode}`;
export const ADDR_EN = `${site.business.address.street.en}, ${site.business.address.city.en}, ${site.business.address.postalCode}`;

export interface LegalSection {
  h: string;
  t: string;
  link?: { section: SectionKey; label: string };
}

export interface LegalData {
  title: string;
  lastUpdated: string;
  updated: string;
  sections: LegalSection[];
  questionsTitle: string;
  questionsBody: string;
  questionsEmail: string;
  questionsBtn: string;
}
