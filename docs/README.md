# OrderFlow BD

Comment-to-order SaaS MVP for Bangladesh F-commerce merchants.

Current validation rule:

Manual order-link pilots come before Meta App Review. The first proof is whether real sellers will send product/order links to real customers, capture COD orders, and use courier-ready export. Meta automation comes after that workflow proves useful.

Current budget rule:

First-30-day spend stays capped at BDT 10,000. AI/dev subscriptions are allowed if they help shipping; paid hosting, domain, ads, payment gateway, and company setup wait for seller proof.

## What is built

- Public landing page plus merchant dashboard for operations.
- Product catalog with public order pages.
- Order creation API with COD and manual bKash/Nagad tracking.
- Meta webhook verification plus merchant-owned test event processing.
- Compliant messaging adapter with simulated replies until Meta credentials are approved.
- Courier CSV export plus adapter boundary for Pathao, Steadfast, and RedX.
- Hidden platform control surface for developer/admin stats.
- Supabase repository adapter, real merchant Auth, shop setup, platform admin Auth, schema, and local/Supabase diagnostics.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

With no Supabase env vars, the app intentionally runs in local in-memory mode.
This is the practical MVP path for demos and manual pilots.

Useful routes:

- Landing page: `http://localhost:3000`
- Merchant login/signup: `http://localhost:3000/merchant/login`
- Merchant setup: `http://localhost:3000/merchant/setup`
- Merchant dashboard: `http://localhost:3000/merchant/dashboard`
- Hidden platform control login: `http://localhost:3000/control/login`
- Health: `http://localhost:3000/api/health`
- Meta webhook verify: `http://localhost:3000/api/meta/webhook?hub.mode=subscribe&hub.verify_token=orderflow-local-verify-token&hub.challenge=ok`

To simulate a Meta comment webhook:

```bash
curl -X POST http://localhost:3000/api/meta/test
```

## Supabase setup

The app switches to Supabase mode only when the public Supabase URL and public
key are both configured. Until then, it keeps using the local in-memory repository.

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. If your database already has the old schema, run `supabase/patches/2026-06-06-real-auth-model.sql`.
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

After changing env vars, restart `npm run dev`.

Merchant flow:

1. Open `http://localhost:3000/merchant/login`.
2. Create a merchant account or sign in.
3. Complete `http://localhost:3000/merchant/setup`.
4. Use `http://localhost:3000/merchant/dashboard`.

Platform admin flow:

1. Create or sign in with your developer Supabase Auth user.
2. In Supabase SQL editor, grant that user platform access:

```sql
insert into public.platform_admins (user_id, role)
select id, 'owner'
from auth.users
where email = 'your-developer-email@example.com'
on conflict (user_id) do update set role = excluded.role;
```

3. Open `http://localhost:3000/control/login`.

Check runtime status at `http://localhost:3000/api/health`.

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
2. Add `.env.local` values from `.env.example`.
3. Create your developer Auth user and insert it into `platform_admins`.
4. Let merchants create their own shops through `/merchant/login` and `/merchant/setup`.
5. Run manual order-link pilots before waiting for Meta permissions.
6. Create Meta Developer app and configure `/api/meta/webhook` after manual validation is positive.
7. Complete required Meta permissions and App Review when automation is worth unlocking.
8. Add payment provider credentials after pilot validation.
9. Add courier provider credentials when merchants need direct booking.

The app currently uses an in-memory demo store if Supabase is not configured.
