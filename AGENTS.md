# B-Side Payload CMS — Agent Guide

This is the Content Management System for [b-side.ms](https://b-side.ms). It is Payload CMS **v3** on Next.js **15 App Router**, MongoDB, and Keycloak.

Read this file before changing collections, access, plugins, env, Docker, or anything the public website consumes.

Planned work lives in [ROADMAP.md](./ROADMAP.md). Implement it in small PRs, not as one change. Keep it in sync with the website copy.

Sister frontend repo: [bside-ms/bside_website](https://github.com/bside-ms/bside_website). That repo has its own `AGENTS.md`. Treat the two as one system. The website never imports this package. It consumes the REST API and a copied `payload-types.ts`.

## What this app is

- Admin UI: `https://cms.b-side.ms/admin` (local `http://localhost:3000/admin`)
- REST API: `https://cms.b-side.ms/api/...`
- `/` redirects to `/admin` (`src/middleware.ts`)
- GraphQL is **disabled** (`graphQL.disable: true`). Do not add GraphQL clients on the website.
- Locales: `de` (default) and `en`, with fallback
- Rich text: **Slate**, not Lexical
- Auth for humans: Keycloak OAuth (`payload-oauth2`), local password strategy disabled
- Auth for the website preview: `api-users` collection with API keys
- Media files: local disk, in production bind-mounted to `/srv/docker/b-side.ms/cms/media`

This repo is CMS-only. It does not render the public site.

## Local development

Package manager is **Yarn 4** (`packageManager: yarn@4.9.2`). The website uses npm. Do not add a `package-lock.json`.

```bash
cp .env.skel .env
docker compose up -d          # Mongo 4.4.6 on localhost:27017
yarn install
yarn dev                      # http://localhost:3000
```

After changing collections, globals, blocks, or custom admin components:

```bash
yarn generate:types           # writes src/payload-types.ts
yarn generate:importmap       # required after admin component changes
```

Then **manually copy** `src/payload-types.ts` into `types/payload/payload-types.ts` in [bside-ms/bside_website](https://github.com/bside-ms/bside_website) if the website should see the new shapes. That copy step is the current official workflow. Awkward, but do not invent a shared package unless someone explicitly wants that migration.

Other scripts: `yarn lint`, `yarn prettier`, `yarn ts-check`, `yarn build`, `yarn payload`.

## Content model

Collections in `src/payload.config.ts` (order is admin nav-ish, not load-bearing):

| Slug | File | Who writes | Website use |
| --- | --- | --- | --- |
| `events` | `collections/Events.ts` | logged-in users create; editors update; admin deletes | `/events`, circle/org overviews |
| `circles` | `collections/Circles.ts` | admin create/delete; `hasCircleAccess` update | `/kreise/[slug]` and rewrites |
| `organisations` | `collections/Organisation.ts` | admin create/delete; editors update | `/kultur`, `/quartier`, `/bside/kollektiv` |
| `media` | `collections/Media.ts` | users upload; public read; admin delete | images via CMS URL |
| `news` | `collections/News.ts` | users create/update; admin delete | `/news` |
| `pages` | `collections/Pages.ts` | admin create/delete; editors update | `/[...slug]`, plus `home` / `bside` |
| `users` | `collections/Users/Users.ts` | OAuth can create; admin manages | admin only |
| `api-users` | `collections/Users/ApiUsers.ts` | admin | website preview key |
| `contact-forms` | `collections/Administration/ContactForms.ts` | **public create** | website archives sent mails |
| `not-found-pages` | `collections/Administration/NotFound.ts` | **public create** | website 404 logger |
| `redirects` | plugin | admin | website Next redirects at **website build** time |

Globals:

| Slug | File | Website |
| --- | --- | --- |
| `start-page` | `globals/StartPage.ts` | homepage hero |
| `about-bside` | `globals/AboutBside.ts` | `/bside` intro + four sections |
| `event-page` | `globals/EventPage.ts` | `/events` |
| `event-archive` | `globals/EventArchive.ts` | `/events/history` |
| `banner` | `globals/Banner.ts` | site-wide header banner |

`pages` uses `nestedDocsPlugin` (breadcrumbs / parent). SEO plugin is on `organisations`, `circles`, `pages` (upload field disabled; website screenshots instead). `payload-blurhash-plugin` runs on `media`.

### Roles

`users.roles` is a multi-select. Helpers in `src/access/`:

| Role | Meaning |
| --- | --- |
| `public` | logged-in member. Can create events/news/media. Can update own-ish news. Cannot publish privileged fields |
| `editor` | update events, pages, orgs, circles (circles also via membership) |
| `organisator` | update selected globals (`start-page`, `about-bside`, event pages) |
| `admin` | everything, including users, redirects, deletes |

`isUserOrPublished`: anonymous requests only see `_status: published`. That is why the website can fetch without a real API key.

`hasCircleAccess`: editors/admins always; others only circles listed on `user.circles`.

`organisator` is defined but unused on collections (globals only).

Users: `disableLocalStrategy: true`. Login is Keycloak. `create` on users is open so the OAuth callback can insert first-time users. Default role is `public`. Admins assign elevated roles in Payload, not in Keycloak (Keycloak `members` is read but not mapped to roles).

API users: `useAPIKey: true`, no password login. Website `PAYLOAD_API_COLLECTION` must be the slug `api-users`.

### Blocks

Defined under `src/blocks/`. Website renderer is `ReusableBlocks.tsx` in the other repo. Slugs must match exactly:

`callToAction`, `content`, `mediaBlock`, `mediaContent`, `headlineBlock`, `circleOverview`, `eventOverview`, `teaser`, `slider`.

Not every collection allows every block. Circles omit `slider`. Organisations add `circleOverview`. If you add a block, attach it only where editors need it, then add the website renderer and copy types.

### Slugs and live preview

Live preview URLs use `NEXT_PUBLIC_SITE_URL` + locale prefix.

Website event/news URLs are `{last4OfMongoId}-{kebabCase(slug|title)}`. `createNewsSlug` in this repo matches that. `createEventSlug` in this repo does **not** prefix the last-4 id when a slug exists. If you touch event slugs, align both repos and keep old URLs working on the website (`createEventSlugOld`).

`identifier` on events/news is an `afterRead` hook returning `id.slice(-4)`. It is not written in `beforeChange`. Do not assume `where[identifier][equals=...]` queries stored documents.

### Media

`staticDir` resolves to repo-root `media/` locally and `/home/node/media` in Docker (compose mounts `./media`). Allowed types: png, jpeg, webp, avif. Sizes: `event` 1080², `thumbnail` 480x320, `wide` 1248x288. `alt` is required (`-` for decorative).

Production media is **not** in git. Losing the server `media/` volume loses files even if Mongo still has metadata.

## Cross-repo contract

The website depends on:

- REST shapes staying stable (`/api/{collection}`, `/api/globals/{slug}`, query syntax)
- Published documents being publicly readable
- Public `create` on `contact-forms` and `not-found-pages`
- Block slugs and field names
- Locale `de` / `en`
- Media URLs on `cms.b-side.ms` (website `next.config.js` image allowlist)
- Redirects collection existing and returning `from` / `to` as the plugin defines them
- Hardcoded organisation ids still pointing at Kultur / GmbH / Kollektiv

Breaking any of that is a website incident, not just a CMS cleanup.

Website organisation ids (production Mongo):

- Kollektiv: `647e605b7054a955522b2471` → `/bside/kollektiv`
- Kultur e.V.: `647e60a67054a955522b24ad` → `/kultur`
- GmbH: `647e60bd7054a955522b24cb` → `/quartier`

Do not delete or recreate those docs casually.

Redirect edits are visible on the website only after a **website image rebuild**. The admin description already says so. There is no CMS webhook that revalidates Next.

Website A1 is live (`POST https://b-side.ms/api/revalidate`, header `x-revalidation-key`). A2 wires this key. Do not bake it into the CMS image. Do not start A2 in the G0 Hub-cutover PR.

## Env vars

| Name | Purpose |
| --- | --- |
| `PAYLOAD_SECRET` | Payload encryption / JWT |
| `MONGODB_URI` | production: `mongodb://payload_mongo/payload` |
| `NEXT_PUBLIC_CMS_URL` | public CMS URL, **baked at Docker build** (GitHub Actions build-arg `CMS_URL`, was Hub `hooks/build`) |
| `NEXT_PUBLIC_SITE_URL` | public website URL, used in live preview links |
| `COOKIE_DOMAIN` | production `cms.b-side.ms` |
| `NEXT_PUBLIC_OAUTH_SERVER` | Keycloak realm URL |
| `CLIENT_ID` / `CLIENT_SECRET` | Keycloak client `payload` |
| `REVALIDATION_KEY` | same secret as website `website.env`. Website A1 is live. A2 will POST `/api/revalidate` with header `x-revalidation-key`. Do not bake into the image. |
| `TZ` | `Europe/Berlin` |

`NEXT_PUBLIC_CMS_URL` must be passed as a Docker build-arg. Runtime-only changes will not fix OAuth callback / client bundle values.

CORS is `*`. Tighten only if the website and admin origins are fully enumerated and tested.

## Deploy

GitHub: `bside-ms/bside_payload`. Production branch is `main`. A `dev` branch was sketched for a test image and is not a live environment.

### What GitHub Actions actually do

`.github/workflows/docker-image.yml` runs `yarn install --frozen-lockfile`, `yarn lint`, `yarn ts-check`, `yarn prettier` on every push. On `main` it also builds and pushes `bsidems/bside-cms:latest` plus `bsidems/bside-cms:<sha>`. One build-arg: `CMS_URL` → `NEXT_PUBLIC_CMS_URL`. That value must be `https://cms.b-side.ms`. It is a GitHub **variable**, not a secret.

### What actually builds the image

GitHub Actions. Image is public `bsidems/bside-cms`. Do not bake secrets. `hooks/build` is leftover from Docker Hub Automated Builds and is not used anymore.

### Server

Path: `/srv/docker/b-side.ms/cms/`

- `docker-compose.yml` — `payload` + `payload_mongo`
- `.env` — secrets
- `data/` — Mongo WiredTiger files (`./data:/data/db`)
- `media/` — uploads (`./media:/home/node/media`)
- `migrations/` on the server is leftover from an older layout; in-repo migrations live in `src/migrations/`
- `docker-compose.rollback.yml` — emergency previous image

Networks: external `bside_payload` (Traefik) and `bside_payload_internal` (CMS ↔ Mongo). Mongo publishes `127.0.0.1:27017` only.

After Actions finishes a `main` build, point server compose at `bsidems/bside-cms:latest` and deploy only the CMS app (leave Mongo running):

```bash
docker compose up -d --pull always payload
```

`docker compose down` is not required and takes Mongo down with it. Never add `-v` to `down` (that would wipe `data/` and can orphan the media mount story). Volumes stay put across a normal recreate.

Compose still sets `PAYLOAD_CONFIG_PATH=/home/node/dist/payload.config.js`. That is a **Payload v2 leftover**. This app is Payload 3 / Next. Do not revive a `dist/` Express build to satisfy that variable.

Local `docker-compose.yml` in this repo starts **Mongo only**. It does not run the CMS container.

Dockerfile: Node 20 Alpine, Yarn 4 via corepack, `yarn build`, runtime copies `.next` + `node_modules`, `yarn start -p 3000`. Media is not copied into the image (`.dockerignore` excludes it); the volume must exist on the host.

## Migrations

`src/migrations/` is Payload Mongo migrations. They run with the app / Payload migrate commands, not from the server `migrations/` folder.

Do not use `db push` as a substitute for a migration if existing production documents must be transformed. Read the Prisma-unrelated Payload migrate docs in-repo history before adding files. Current examples: versions v1→v2, and publishing all redirects.

## Decision rules

- If the website must render it, it belongs in a collection/global/block, not as a one-off Next page with hardcoded German copy. Exception: a few marketing/donation pages already live only in the website repo.
- Access: default to published-for-anonymous, authenticated-for-drafts. Do not lock down published `read` without a website API-key plan.
- Do not enable GraphQL.
- Do not switch Slate → Lexical without a data migration and a website serialiser rewrite.
- Do not add a second auth strategy without checking Keycloak + cookie domain + `sameSite: None`.
- Keep `users.create` working for OAuth first login. Restrict roles in field access, not by blocking create entirely.
- Public `create` on contact/404 collections is intentional. Do not add sensitive fields there.
- Regenerating types is mandatory after schema edits. Copy them to the website in the same change set if the frontend is affected.
- Production Mongo is 4.4.6. Do not assume 6+/7 features or change the image casually; the data volume is years old.

## Known traps

- README says "Payload automatically runs migrations when the schema changes". Treat that as incomplete. Explicit migrations exist and matter for production data.
- No `next.config` file is in this repo. Do not add one unless you know you need `withPayload` or image config. Verify against current Payload 3 generated layout before inventing one.
- Admin-generated files (`src/app/(payload)/layout.tsx`, `importMap.js`) say they can be overwritten. Prefer Payload generate commands over hand edits.
- Live preview links for some globals omit a `/` (`...SITE_URL` + `bside`). Fix only if you are already touching those URLs.
- Website ISR + build-time redirects mean CMS publish ≠ instant live site.
