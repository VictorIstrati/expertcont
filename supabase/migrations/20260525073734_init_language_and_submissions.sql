-- Language enum (default-locale: ro; targets: ru, en).
create type public.language as enum ('ro', 'ru', 'en');

-- Shared status enum for moderated/processed submissions.
create type public.submission_status as enum ('new', 'in_progress', 'done', 'spam');

-- ---------------------------------------------------------------------------
-- contact_submissions
-- ---------------------------------------------------------------------------
create table public.contact_submissions (
  id           uuid primary key default gen_random_uuid(),
  language     public.language not null,
  name         text not null check (length(name) between 1 and 200),
  email        text not null check (length(email) between 3 and 320),
  phone        text check (length(phone) <= 50),
  company      text check (length(company) <= 200),
  status       public.submission_status not null default 'new',
  source_url   text check (length(source_url) <= 500),
  user_agent   text check (length(user_agent) <= 500),
  ip_hash      text check (length(ip_hash) <= 128),
  created_at   timestamptz not null default now()
);

create table public.contact_submission_translations (
  submission_id uuid not null references public.contact_submissions(id) on delete cascade,
  language      public.language not null,
  subject       text check (length(subject) <= 300),
  message       text not null check (length(message) between 1 and 10000),
  primary key (submission_id, language)
);

create index contact_submissions_created_at_idx on public.contact_submissions (created_at desc);
create index contact_submissions_status_idx on public.contact_submissions (status);

-- ---------------------------------------------------------------------------
-- reviews
-- ---------------------------------------------------------------------------
create table public.reviews (
  id           uuid primary key default gen_random_uuid(),
  language     public.language not null,
  name         text not null check (length(name) between 1 and 200),
  email        text check (length(email) <= 320),
  rating       smallint not null check (rating between 1 and 5),
  status       public.submission_status not null default 'new',
  published    boolean not null default false,
  source_url   text check (length(source_url) <= 500),
  user_agent   text check (length(user_agent) <= 500),
  ip_hash      text check (length(ip_hash) <= 128),
  created_at   timestamptz not null default now()
);

create table public.review_translations (
  submission_id uuid not null references public.reviews(id) on delete cascade,
  language      public.language not null,
  title         text check (length(title) <= 200),
  content       text not null check (length(content) between 1 and 5000),
  primary key (submission_id, language)
);

create index reviews_created_at_idx on public.reviews (created_at desc);
create index reviews_published_idx on public.reviews (published) where published;

-- ---------------------------------------------------------------------------
-- book_a_call_submissions
-- ---------------------------------------------------------------------------
create table public.book_a_call_submissions (
  id              uuid primary key default gen_random_uuid(),
  language        public.language not null,
  name            text not null check (length(name) between 1 and 200),
  email           text not null check (length(email) between 3 and 320),
  phone           text check (length(phone) <= 50),
  company         text check (length(company) <= 200),
  preferred_at    timestamptz,
  status          public.submission_status not null default 'new',
  source_url      text check (length(source_url) <= 500),
  user_agent      text check (length(user_agent) <= 500),
  ip_hash         text check (length(ip_hash) <= 128),
  created_at      timestamptz not null default now()
);

create table public.book_a_call_submission_translations (
  submission_id uuid not null references public.book_a_call_submissions(id) on delete cascade,
  language      public.language not null,
  notes         text check (length(notes) <= 5000),
  primary key (submission_id, language)
);

create index book_a_call_submissions_created_at_idx on public.book_a_call_submissions (created_at desc);
create index book_a_call_submissions_status_idx on public.book_a_call_submissions (status);

-- ---------------------------------------------------------------------------
-- newsletter_subscribers (no translatable body — email-only)
-- ---------------------------------------------------------------------------
create type public.newsletter_status as enum ('pending', 'confirmed', 'unsubscribed', 'bounced');

create table public.newsletter_subscribers (
  id                 uuid primary key default gen_random_uuid(),
  language           public.language not null,
  email              text not null check (length(email) between 3 and 320),
  status             public.newsletter_status not null default 'pending',
  confirmation_token text unique,
  confirmed_at       timestamptz,
  unsubscribed_at    timestamptz,
  source_url         text check (length(source_url) <= 500),
  user_agent         text check (length(user_agent) <= 500),
  ip_hash            text check (length(ip_hash) <= 128),
  created_at         timestamptz not null default now()
);

-- Same email may re-subscribe after unsubscribing, but only one *active* row.
create unique index newsletter_subscribers_email_active_idx
  on public.newsletter_subscribers (lower(email))
  where status in ('pending', 'confirmed');

create index newsletter_subscribers_created_at_idx on public.newsletter_subscribers (created_at desc);

-- ---------------------------------------------------------------------------
-- RLS: locked down. All public writes go through edge functions (service role).
-- ---------------------------------------------------------------------------
alter table public.contact_submissions                  enable row level security;
alter table public.contact_submission_translations      enable row level security;
alter table public.reviews                   enable row level security;
alter table public.review_translations       enable row level security;
alter table public.book_a_call_submissions              enable row level security;
alter table public.book_a_call_submission_translations  enable row level security;
alter table public.newsletter_subscribers               enable row level security;

-- No anon/authenticated policies are defined: only the service_role key
-- (used inside edge functions) can read/write. This prevents browser clients
-- from exfiltrating submissions even if the anon key leaks.
