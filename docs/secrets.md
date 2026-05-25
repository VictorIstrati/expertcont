# Secrets & environment variables

All secrets are stored in **Doppler** (`expertcont` project, configs `dev` / `stg` / `prd`). The repo is bound to the `dev` config via `~/.doppler/.doppler.yaml`. Run anything that needs secrets with `doppler run -- <cmd>`.

```bash
doppler setup --project expertcont --config dev    # one-time, per machine
doppler run -- pnpm dev                            # injects secrets at runtime
```

## Secrets reference

### Frontend (Astro / `apps/web`) — exposed to browser, prefixed `PUBLIC_*`

| Key | Local dev value | Notes |
| --- | --- | --- |
| `PUBLIC_SUPABASE_URL` | `http://127.0.0.1:55421` | Local API port (see `supabase/config.toml`). Production: hosted project URL. |
| `PUBLIC_SUPABASE_PUBLISHABLE_KEY` | (from Supabase dashboard → Settings → API Keys) | New-format key (`sb_publishable_…`), replaces the legacy `anon` key. Safe to ship to browser — RLS protects writes. |

### Backend / CLI (server-only, never `PUBLIC_*`)

| Key | Purpose |
| --- | --- |
| `SUPABASE_ACCESS_TOKEN` | `supabase` CLI login token. Generate at https://supabase.com/dashboard/account/tokens. |
| `SUPABASE_DB_PASSWORD` | Cloud DB password. Set when creating the project. |
| `SUPABASE_SECRET_KEY` | New-format key (`sb_secret_…`), replaces the legacy `service_role` key. Bypasses RLS — only used in edge functions and ops scripts. |

### Edge function secrets

Edge functions read env from `supabase/functions/.env.local` (gitignored). `supabase functions serve` does **not** inherit env from the parent shell, so `doppler run --` wrapping the serve command does nothing. The pattern is: dump Doppler → file → start the runtime with `--env-file`.

| Key | Purpose |
| --- | --- |
| `TELEGRAM_BOT_TOKEN` | Telegram bot for form-submission notifications. |
| `TELEGRAM_CHAT_ID` | Destination chat for notifications. |
| `IP_HASH_SALT` | Salt for hashing visitor IPs (see `_shared/request-meta.ts`). |
| `ALLOWED_ORIGINS` | Comma-separated CORS allowlist. |

**Local dev** (one command refreshes the snapshot + boots the runtime):

```bash
pnpm functions:dev
```

That runs `functions:env` (dumps the active Doppler config to `supabase/functions/.env.local`) then `supabase functions serve --env-file ... --no-verify-jwt`. Re-run any time you change Doppler secrets.

**Production** (push the prd Doppler secrets to the linked Supabase project):

```bash
doppler run --config prd -- bash -c \
  'supabase secrets set TELEGRAM_BOT_TOKEN="$TELEGRAM_BOT_TOKEN" TELEGRAM_CHAT_ID="$TELEGRAM_CHAT_ID" IP_HASH_SALT="$IP_HASH_SALT" ALLOWED_ORIGINS="$ALLOWED_ORIGINS"'
```

## Local Supabase ports

See `supabase/config.toml`. Custom ports (avoid conflicts with other Supabase instances):

| Service | Port |
| --- | --- |
| API | 55421 |
| DB | 55422 |
| DB shadow | 55420 |
| Pooler | 55429 |
| Studio | 55423 |
| Inbucket (email UI) | 55424 |
| Analytics | 55427 |
| Edge inspector | 55483 |
