create or replace function public.purge_expired_submissions()
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  delete from public.contact_submissions where created_at < now() - interval '12 months';
  delete from public.book_a_call_submissions where created_at < now() - interval '12 months';
  delete from public.quotes where created_at < now() - interval '12 months';
  delete from public.faq_question_submissions where created_at < now() - interval '12 months';
  delete from public.reviews where not published and created_at < now() - interval '12 months';
end;
$$;

revoke execute on function public.purge_expired_submissions() from public, anon, authenticated;

drop table if exists public.newsletter_subscribers;
drop type if exists public.newsletter_status;
