-- Price-quote requests from the calculator modal.
-- The `items` JSONB column stores a frozen snapshot of the calculator
-- breakdown at the moment of submission — we never query across line items,
-- so normalizing them into a child table would be churn for no benefit.

create table public.quotes (
  id           uuid primary key default gen_random_uuid(),
  language     public.language not null,
  name         text not null check (length(name) between 1 and 200),
  email        text check (length(email) <= 320),
  phone        text not null check (length(phone) between 1 and 50),
  company      text check (length(company) <= 200),
  total_mdl    numeric(12, 2) not null check (total_mdl >= 0),
  items        jsonb not null default '[]'::jsonb,
  status       public.submission_status not null default 'new',
  source_url   text check (length(source_url) <= 500),
  user_agent   text check (length(user_agent) <= 500),
  ip_hash      text check (length(ip_hash) <= 128),
  created_at   timestamptz not null default now()
);

create table public.quote_translations (
  submission_id uuid not null references public.quotes(id) on delete cascade,
  language      public.language not null,
  message       text check (length(message) <= 5000),
  primary key (submission_id, language)
);

create index quotes_created_at_idx on public.quotes (created_at desc);
create index quotes_status_idx on public.quotes (status);

alter table public.quotes              enable row level security;
alter table public.quote_translations  enable row level security;
