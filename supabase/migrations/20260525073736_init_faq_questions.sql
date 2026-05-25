-- User-submitted FAQ questions (distinct from the curated `faqs` table).
-- Same parent + translations pattern as the other submission tables.

create table public.faq_question_submissions (
  id           uuid primary key default gen_random_uuid(),
  language     public.language not null,
  name         text not null check (length(name) between 1 and 200),
  email        text not null check (length(email) between 3 and 320),
  topic        text check (length(topic) <= 80),
  status       public.submission_status not null default 'new',
  source_url   text check (length(source_url) <= 500),
  user_agent   text check (length(user_agent) <= 500),
  ip_hash      text check (length(ip_hash) <= 128),
  created_at   timestamptz not null default now()
);

create table public.faq_question_submission_translations (
  submission_id uuid not null references public.faq_question_submissions(id) on delete cascade,
  language      public.language not null,
  question      text not null check (length(question) between 1 and 5000),
  primary key (submission_id, language)
);

create index faq_question_submissions_created_at_idx on public.faq_question_submissions (created_at desc);
create index faq_question_submissions_status_idx on public.faq_question_submissions (status);

alter table public.faq_question_submissions             enable row level security;
alter table public.faq_question_submission_translations enable row level security;
