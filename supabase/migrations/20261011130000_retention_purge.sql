create extension if not exists pg_cron with schema pg_catalog;

grant usage on schema cron to postgres;

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
  delete from public.newsletter_subscribers
    where status in ('unsubscribed', 'bounced')
      and coalesce(unsubscribed_at, created_at) < now() - interval '30 days';
end;
$$;

revoke execute on function public.purge_expired_submissions() from public, anon, authenticated;

select cron.schedule(
  'purge-expired-submissions',
  '15 3 * * *',
  'select public.purge_expired_submissions()'
);
