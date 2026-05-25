select schemaname, tablename, rowsecurity as rls_on,
         (select count(*) from pg_policies p where p.schemaname=t.schemaname and p.tablename=t.tablename) as policy_count
  from pg_tables t
  where schemaname='public' order by tablename;