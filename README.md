# SAM — System Access Matrix

Athena exercise asset. A Donovian-language hack-forum site used to seed
LOCKJAW CERBERUS lore for the wider scenario.

> Exercise Athena Strike 2026 — all groups, accounts and operations on this
> site are fictional. Donovia, Pirtuni, Otso, Olvana etc. are scenario
> countries.

## Stack

- Next.js 15 (App Router) + React 19
- Prisma + SQLite (file-backed, persists in `data/`)
- NextAuth (credentials)
- Tailwind v4

## Develop

```bash
cp .env.example .env       # or set values manually
npm install
npx prisma migrate dev
npm run db:seed
npm run dev
```

`.env` minimum:

```
DATABASE_URL="file:./data/dev.db"
NEXTAUTH_SECRET="dev-only-secret-change-in-prod"
NEXTAUTH_URL="http://localhost:3000"
```

## Seeded accounts

Every account is hashed from the password **`changeme`**.

| Login            | Role      | Affiliation       |
| ---------------- | --------- | ----------------- |
| ChelyustAdmin    | admin     | LOCKJAW CERBERUS  |
| VektorPrime      | admin     | VECTOR CERBERUS   |
| Grim_Broker      | moderator | LOCKJAW CERBERUS  |
| BlackLock_S      | moderator | LOCKJAW CERBERUS  |
| FIN73            | vetted    | LOCKJAW CERBERUS  |
| kosa_88          | vetted    | HOLLOW SCYTHE     |
| Ёж_2014          | vetted    | CRIMSON HEDGEHOG  |
| ostrov_zero      | vetted    | —                 |
| skoroh0d         | vetted    | —                 |
| pwn_ded          | vetted    | —                 |
| telega_off       | user      | —                 |
| noviy_2026       | user      | —                 |
| athena_demo      | admin     | —                 |

### Sign-up invite codes

The sign-up form needs an invite code. Valid codes the seed accepts:

```
LJC-2024-CERB-0001
LJC-2024-CERB-0002
LJC-2024-CERB-0003
VCT-2024-XRAY-0011
VCT-2024-XRAY-0012
ATHENA-DEMO-0001
```

## Deploy

Range deployment follows the same pattern as `/var/www/twatter`:

- systemd unit `sam.service` runs `next start` on `127.0.0.1:18093`
- nginx terminates TLS using the shared self-signed range cert
- `sam-update.service` runs on every boot — `git reset --hard origin/main`
  + rebuild — so student-side edits on the box are wiped
- `data/` and `uploads/` are excluded from the wipe so blue-team
  hardening (changed passwords, etc.) persists

See `deploy.yml` for the full Ansible task list.

## Project layout

```
prisma/
  schema.prisma          # Users / Categories / Threads / Posts / Operations / PMs
  seed.ts                # Scenario content — LOCKJAW CERBERUS + allies
src/
  app/
    page.tsx             # Forum index
    c/[slug]/            # Category view + new-thread form
    t/[slug]/            # Thread view (posts + reply)
    u/[username]/        # Operator profile
    operations/          # Public claims registry
    members/             # Operator directory
    manifest/            # LOCKJAW CERBERUS manifesto (RU + EN)
    sign-in / sign-up/   # Auth pages
    api/                 # Threads, posts, register, NextAuth route
    components/
      layout/            # Header / Footer / ExerciseBanner
      forum/             # Category list, thread row, post card, etc.
  lib/
    prisma.ts            # Prisma singleton
    auth.ts              # NextAuth options
    lang.tsx             # Donovian (Cyrillic) / English toggle
    format.ts            # Relative timestamps, ISO formatting
    slug.ts              # Cyrillic → URL slug
  providers/             # Session + language providers
```

## Language model

The UI is Donovian-primary (Cyrillic) with a runtime EN translation toggle
that lives in `localStorage` under `sam.lang`. Every post and every
category/thread title is stored with both a primary body and an English
body. The lang context exposes `t("…ru…", "…en…")` for static strings.

## Athena banner

`ExerciseBanner` is pinned to the bottom of every page so the fictional-content
notice is always visible.
