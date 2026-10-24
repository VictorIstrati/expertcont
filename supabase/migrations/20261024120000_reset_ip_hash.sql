update public.contact_submissions set ip_hash = null where ip_hash is not null;
update public.book_a_call_submissions set ip_hash = null where ip_hash is not null;
update public.quotes set ip_hash = null where ip_hash is not null;
update public.faq_question_submissions set ip_hash = null where ip_hash is not null;
update public.reviews set ip_hash = null where ip_hash is not null;
