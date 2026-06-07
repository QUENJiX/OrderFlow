# OrderFlow BD

OrderFlow BD is moving from a validated manual order-link baseline to a full automated production SaaS for Bangladesh F-commerce merchants.

## Current Decision

The basic flow has been tested:

- Merchant account creation.
- Shop setup.
- Public order creation.
- Merchant order status updates.

That baseline proves the order desk can work. It is no longer the product target.

The active product target is now:

> A production SaaS that turns Facebook/WhatsApp customer inquiries into confirmed orders, verifies COD/manual and gateway payments, prepares courier handoff, tracks merchant operations, and gives the founder a platform control system.

Manual order links remain as fallback and recovery paths, not the main launch strategy.

## Reference Images

The current target is derived from the three reference images in `docs/reference`:

- `Landing_Page.png`
- `Marchants_Dashboard.png`
- `Founder_Dashboard.png`

Use these images for product contents, modules, page inventory, and feature expectations. Do not copy their UI exactly. The frontend should keep the current OrderFlow styling language and add the richer elements shown in the references.

Theme direction:

- Light mode: white, dark, and green.
- Dark mode: dark, green, and golden.

## Current App Baseline

Already present in the codebase:

- Next.js App Router app.
- Merchant auth and setup.
- Supabase-backed mode when env vars are configured.
- Merchant dashboard, products, orders, replies/templates, customers, settings.
- Public product order pages.
- COD/manual bKash/manual Nagad order capture.
- Merchant order status and payment status updates.
- Courier CSV export.
- Platform control area for founder/admin views.
- Meta webhook verification and local/test event processing.
- Provider adapter boundaries for messaging, payments, and couriers.

## Production Target

The full SaaS must include:

- Public landing page built around automated comment-to-order conversion.
- Merchant command center with dashboard, order queue, products, replies, customers, integrations, billing, and support.
- Automation engine for Facebook Page comments/messages and WhatsApp handoff where officially supported.
- Payment workflow covering COD, manual MFS, and gateway-ready verification.
- Courier workflow covering CSV fallback, API booking, tracking, and delivery exceptions.
- Founder/admin control center for merchants, GMV, orders, payments, payouts, billing, support/risk, reports, integrations, platform health, and audit logs.
- Production deployment, monitoring, security, backups, and operational runbooks.

## Core Docs

- `docs/SAAS_MASTER_PLAN.md`: product strategy, modules, and roadmap.
- `docs/PRODUCTION_SAAS_REQUIREMENTS.md`: detailed feature requirements from the reference images.
- `docs/AUTOMATION_AND_INTEGRATIONS_PLAN.md`: Meta, WhatsApp, payment, courier, and notification automation plan.
- `docs/PRODUCTION_ROADMAP.md`: build phases and acceptance gates.
- `docs/PRODUCTION_DEPLOYMENT_RUNBOOK.md`: deployment, environment, monitoring, backup, and release checklist.
- `docs/USER_ACTION_PLAN.md`: founder-side accounts, credentials, approvals, and launch tasks.
- `docs/INVESTMENT_AND_MARKETING_PLAN.md`: production SaaS budget, pricing, and GTM plan.
- `docs/META_APP_REVIEW_READINESS.md`: Meta App Review readiness for the automated product.
- `docs/reference/REFERENCE_IMAGE_ANALYSIS.md`: extracted product contents from the three reference images.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Useful routes:

- Landing page: `http://localhost:3000`
- Merchant login/signup: `http://localhost:3000/merchant/login`
- Merchant setup: `http://localhost:3000/merchant/setup`
- Merchant dashboard: `http://localhost:3000/merchant/dashboard`
- Merchant orders: `http://localhost:3000/merchant/orders`
- Merchant products: `http://localhost:3000/merchant/products`
- Merchant replies: `http://localhost:3000/merchant/replies`
- Merchant customers: `http://localhost:3000/merchant/customers`
- Merchant settings: `http://localhost:3000/merchant/settings`
- Founder control login: `http://localhost:3000/control/login`
- Founder control overview: `http://localhost:3000/control`
- Health: `http://localhost:3000/api/health`

## Supabase Setup

The app switches to Supabase mode only when the public Supabase URL and public key are configured.

Required:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-public-key
```

`NEXT_PUBLIC_SUPABASE_ANON_KEY` is accepted as a compatibility alias.

Server-only keys must never be exposed to the browser:

```bash
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_SECRET_KEY=
```

Schema files:

- `supabase/schema.sql`
- `supabase/patches/2026-06-06-real-auth-model.sql`
- `supabase/patches/2026-06-06-public-order-link-policies.sql`
- `supabase/patches/2026-06-06-premium-ops-admin-updates.sql`

## Verification

Before shipping changes:

```bash
npm test
npm run lint
npm run build
npm audit
```

Production readiness requires more than these commands. See `docs/PRODUCTION_DEPLOYMENT_RUNBOOK.md` for the release checklist.
