alter table public.contact_submissions
  alter column email drop not null,
  drop constraint contact_submissions_email_check,
  add constraint contact_submissions_email_check check (length(email) <= 320),
  add constraint contact_submissions_phone_required check (phone is not null and length(phone) >= 1) not valid;

alter table public.book_a_call_submissions
  alter column email drop not null,
  drop constraint book_a_call_submissions_email_check,
  add constraint book_a_call_submissions_email_check check (length(email) <= 320),
  add constraint book_a_call_submissions_phone_required check (phone is not null and length(phone) >= 1) not valid;
