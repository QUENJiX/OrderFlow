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
- Supabase schema draft for production persistence.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Useful demo routes:

- Dashboard: `http://localhost:3000`
- Public order page: `http://localhost:3000/order/nur-fashion/linen-kurti`
- Health: `http://localhost:3000/api/health`
- Meta webhook verify: `http://localhost:3000/api/meta/webhook?hub.mode=subscribe&hub.verify_token=orderflow-local-verify-token&hub.challenge=ok`

To simulate a Meta comment webhook:

```bash
curl -X POST http://localhost:3000/api/meta/test
```

## Production setup checklist

1. Create Supabase project and run `supabase/schema.sql`.
2. Add `.env` values from `.env.example`.
3. Run manual order-link pilots before waiting for Meta permissions.
4. Create Meta Developer app and configure `/api/meta/webhook` after manual validation is positive.
5. Complete required Meta permissions and App Review when automation is worth unlocking.
6. Add payment provider credentials after pilot validation.
7. Add courier provider credentials when merchants need direct booking.

The app currently uses an in-memory demo store if Supabase is not configured.
