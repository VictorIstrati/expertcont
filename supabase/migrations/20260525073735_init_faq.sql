-- FAQ: editor-curated, three translations per item, publicly readable.

create table public.faq_categories (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique check (length(slug) between 1 and 80),
  sort_order  integer not null default 0,
  published   boolean not null default true,
  created_at  timestamptz not null default now()
);

create table public.faq_category_translations (
  category_id uuid not null references public.faq_categories(id) on delete cascade,
  language    public.language not null,
  name        text not null check (length(name) between 1 and 200),
  primary key (category_id, language)
);

create table public.faqs (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique check (length(slug) between 1 and 120),
  category_id uuid references public.faq_categories(id) on delete set null,
  sort_order  integer not null default 0,
  published   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table public.faq_translations (
  faq_id    uuid not null references public.faqs(id) on delete cascade,
  language  public.language not null,
  question  text not null check (length(question) between 1 and 500),
  answer    text not null check (length(answer) between 1 and 10000),
  primary key (faq_id, language)
);

create index faqs_published_sort_idx on public.faqs (published, sort_order);
create index faq_categories_published_sort_idx on public.faq_categories (published, sort_order);

-- Keep updated_at fresh.
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger faqs_set_updated_at
  before update on public.faqs
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- RLS: published rows are readable by anon; writes are service_role only.
-- ---------------------------------------------------------------------------
alter table public.faqs                       enable row level security;
alter table public.faq_translations           enable row level security;
alter table public.faq_categories             enable row level security;
alter table public.faq_category_translations  enable row level security;

create policy "faqs_public_read"
  on public.faqs for select
  to anon, authenticated
  using (published);

create policy "faq_translations_public_read"
  on public.faq_translations for select
  to anon, authenticated
  using (exists (select 1 from public.faqs f where f.id = faq_id and f.published));

create policy "faq_categories_public_read"
  on public.faq_categories for select
  to anon, authenticated
  using (published);

create policy "faq_category_translations_public_read"
  on public.faq_category_translations for select
  to anon, authenticated
  using (exists (select 1 from public.faq_categories c where c.id = category_id and c.published));
