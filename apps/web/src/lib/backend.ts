import { BackendClient } from "@expertcont/backend";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const supabasePublishableKey = import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY as
  | string
  | undefined;

if (!supabaseUrl || !supabasePublishableKey) {
  // Fail loud at module load — silent missing config makes form bugs invisible.
  throw new Error(
    "PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_PUBLISHABLE_KEY must be set. Run `doppler run -- pnpm dev`.",
  );
}

export const backendClient = new BackendClient({
  supabaseUrl,
  supabasePublishableKey,
});

export { detectLanguage } from "@expertcont/backend/lang";
export type {
  Language,
  ContactInput,
  ReviewInput,
  BookACallInput,
  NewsletterInput,
  FaqQuestionInput,
  QuoteInput,
  QuoteItem,
  SubmitResult,
} from "@expertcont/backend";
