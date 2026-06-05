# OrderFlow BD

Comment-to-order SaaS MVP for Bangladesh F-commerce merchants.

Current validation rule:

Manual order-link pilots come before Meta App Review. The first proof is whether real sellers will send product/order links to real customers, capture COD orders, and use courier-ready export. Meta automation comes after that workflow proves useful.

Current budget rule:

First-30-day spend stays capped at BDT 10,000. AI/dev subscriptions are allowed if they help shipping; paid hosting, domain, ads, payment gateway, and company setup wait for seller proof.

## What is built

- Next.js dashboard for merchant operations.
- Product catalog with public order pages.
- Order creation API with COD and manual bKash/Nagad tracking.
- Meta webhook verification and demo event processing.
- Compliant messaging adapter with simulated replies until Meta credentials are approved.
- Courier CSV export plus adapter boundary for Pathao, Steadfast, and RedX.
- Admin/billing surfaces for the paid pilot.
- Supabase-ready repository adapter, Auth login screen, schema, seed data, and local/Supabase mode diagnostics.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

With no Supabase env vars, the app intentionally runs in local in-memory mode.
This is the practical MVP path for demos and manual pilots.

Useful demo routes:

- Dashboard: `http://localhost:3000`
- Public order page: `http://localhost:3000/order/nur-fashion/linen-kurti`
- Health: `http://localhost:3000/api/health`
- Meta webhook verify: `http://localhost:3000/api/meta/webhook?hub.mode=subscribe&hub.verify_token=orderflow-local-verify-token&hub.challenge=ok`

To simulate a Meta comment webhook:

```bash
curl -X POST http://localhost:3000/api/meta/test
```

## Supabase setup

The app switches to Supabase mode only when the public Supabase URL and public
key are both configured. Until then, it keeps using the local demo repository.

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Run `supabase/seed.sql` after the schema succeeds.
4. Copy `.env.example` to `.env.local`.
5. Set:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-public-key
```

`NEXT_PUBLIC_SUPABASE_ANON_KEY` is accepted as a compatibility alias. Keep
`SUPABASE_SERVICE_ROLE_KEY` or `SUPABASE_SECRET_KEY` server-only if you add
admin-only workflows later; the current browser login path does not require a
service key.

After changing env vars, restart `npm run dev`. Check:

- Runtime status: `http://localhost:3000/settings`
- Login screen: `http://localhost:3000/login`
- API status: `http://localhost:3000/api/health`

## Verification

Before shipping changes, run:

```bash
npm test
npm run lint
npm run build
npm audit
```

## Production setup checklist

1. Create Supabase project and run `supabase/schema.sql`.
2. Run `supabase/seed.sql` for the demo pilot workspace.
3. Add `.env.local` values from `.env.example`.
4. Run manual order-link pilots before waiting for Meta permissions.
5. Create Meta Developer app and configure `/api/meta/webhook` after manual validation is positive.
6. Complete required Meta permissions and App Review when automation is worth unlocking.
7. Add payment provider credentials after pilot validation.
8. Add courier provider credentials when merchants need direct booking.

The app currently uses an in-memory demo store if Supabase is not configured.
