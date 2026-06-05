# SaaS Master Plan

Last updated: 2026-05-24  
Working product name: OrderFlow BD  
Brand decision: OrderFlow BD approved as the working launch brand  
Market: Bangladesh F-commerce / social commerce  
Primary wedge: Facebook commerce sellers, starting with fashion and beauty shops

Current launch decision, updated 2026-05-24:

- The first 30-day validation does not wait for Meta App Review. Manual order links, COD order capture, and courier-ready export are the validation workflow.
- Meta-powered comment/inbox automation remains a major product advantage, but it is a Phase 3/4 accelerator after seller usage and willingness to pay are proven.
- COD is the default payment flow for validation and launch; online payment gateways are deferred until merchant demand is proven.
- Courier CSV/manual export is the first fulfillment path. Steadfast is the first courier API target after pilot shops prove courier automation is a real bottleneck.
- Budget refresh: first-30-day cash spend should stay at BDT 2,500-8,000 with a hard cap of BDT 10,000, mainly for one or two AI/dev subscriptions and light outreach. Production hosting, domains, gateways, ads, and company setup wait for seller proof.

This document is the master reference for the full SaaS plan. Use it as the index before making product, engineering, sales, or integration decisions. The goal is to keep the project focused while still preserving the long-term vision.

## 1. One-Line Product Definition

OrderFlow BD helps Bangladeshi F-commerce sellers turn Facebook comments, inbox inquiries, and manual seller replies into confirmed COD orders and courier-ready shipments from one dashboard.

## 2. Market Thesis

Bangladesh has a large, socially driven retail market where many small merchants sell primarily through Facebook Pages, Messenger, Instagram, WhatsApp, and mobile financial services.

The opportunity exists because the current F-commerce workflow is painfully manual:

- Customers ask price/details repeatedly in comments and inbox.
- Merchants manually reply, negotiate, and collect customer information.
- Buyers pay through bKash/Nagad or choose COD.
- Merchants manually verify payment screenshots and SMS records.
- Addresses are copied into spreadsheets or courier portals.
- Tracking updates are manually sent back to buyers.
- Delivery compliance pressure creates operational risk.

The SaaS opportunity is to automate the journey from inquiry to confirmed order while keeping the workflow familiar for Bangladeshi sellers.

## 3. Strategic Positioning

Do not position this as a generic chatbot.

Use this positioning:

> Turn Facebook comments, inbox inquiries, and manual seller replies into confirmed COD orders and courier-ready shipments.

Primary message:

- Save time on repetitive replies.
- Capture orders faster.
- Reduce lost inquiries.
- Track payments and deliveries clearly.
- Give small F-commerce shops a professional order workflow without forcing them to build a website.

Avoid early positioning like:

- Full AI commerce operating system.
- Enterprise CRM.
- Marketplace.
- Generic social media automation tool.

## 4. Target Customer

### First Target Segment

Fashion and beauty F-commerce shops in Bangladesh.

Why:

- High comment volume.
- Frequent price/details questions.
- Visual catalog-driven selling.
- Repeat buyers.
- Common COD and bKash/Nagad workflows.
- Strong presence of women-owned micro/small businesses.
- Easier to template replies, product pages, delivery notes, and campaigns.

### Ideal Pilot Shop

- Facebook-first seller.
- At least 30-50 orders per month.
- Gets repeated price/details/size/stock questions.
- Uses COD, bKash, Nagad, or manual MFS collection.
- Uses Pathao, Steadfast, RedX, eCourier, or similar courier.
- Owner/operator is willing to use a dashboard daily.
- Has proper Facebook Page admin access.

### Avoid Initially

- Shops with no real order volume.
- Shops that only want a free chatbot.
- Shops selling restricted or high-risk products.
- Shops with unclear ownership/admin access.
- Highly custom B2B sellers where every order requires heavy negotiation.

## 5. Core Problem Map

### Inbox Chaos

Merchants lose time replying to repeated questions such as:

- Price?
- Dam koto?
- Available?
- Size?
- Delivery charge?
- COD ache?
- Location?

### Order Fragmentation

Order details live across:

- Facebook comments.
- Messenger.
- WhatsApp.
- Instagram DM.
- bKash/Nagad SMS.
- Screenshots.
- Spreadsheet.
- Courier dashboard.

### Payment Verification Pain

Manual payment handling requires:

- Customer sends screenshot or transaction ID.
- Merchant checks MFS app/SMS.
- Merchant marks order manually.
- Mistakes cause fraud, duplicate orders, or angry customers.

### Courier Syncing Pain

Merchants manually:

- Copy customer name.
- Copy phone.
- Copy address.
- Enter COD amount.
- Book courier.
- Copy tracking ID.
- Message buyer again.

### Delivery SLA Risk

Bangladesh digital commerce expectations and regulations create pressure around delivery timing. Manual logs make it hard to track whether Dhaka and outside-Dhaka shipments are at risk of missing promised windows.

## 6. Product Principles

1. Sell an order workflow, not a chatbot.
2. Start with Facebook because the strongest demand is there.
3. Use official APIs only; no scraping or fake browser automation.
4. Use manual fallbacks where approvals are slow.
5. Make the first product useful before Meta/payment/courier approvals are complete.
6. Design for Bangla-first customer communication with English-friendly merchant operations.
7. Keep the first buyer clear: active F-commerce shop owners.
8. Optimize for paid retention, not vanity signups.
9. Build integration adapters early, but ship with manual/export modes where needed.
10. Do not overbuild NLP before collecting real Bangla/English merchant conversations.
11. Do not call the automated product launched until Facebook comment/inquiry automation works for the pilot workflow.
12. Do call the validation pilot live once manual order links, COD order capture, and courier export work with real sellers.
13. Defer payment gateways, paid ads, and multi-channel expansion until COD + manual-order-link usage proves demand.

## 7. Current Implementation Status

The current codebase is a local MVP/demo.

Already built:

- Next.js app scaffold.
- Improved SaaS dashboard UI.
- Merchant dashboard.
- Product catalog page.
- Orders page.
- Admin/billing page.
- Settings/integration page.
- Public customer order page.
- Demo in-memory data store.
- Order creation API.
- Meta webhook verification and processing route.
- Meta test simulator.
- Courier CSV export.
- Provider adapter structure for messaging, payments, and couriers.
- Supabase schema draft.
- User-side action checklist in `USER_ACTION_PLAN.md`.

Not production-ready yet:

- Supabase persistence is not wired.
- Real login/auth is not wired.
- Product/order/rule editing is mostly not functional.
- Meta OAuth and real Page tokens are not wired.
- Real payment gateway automation is not wired.
- Real courier API booking is not wired.
- Vercel deployment is not configured.
- Monitoring, audit logs, and production security hardening are not complete.

## 8. MVP Wedge

The first validation product should be intentionally narrow:

> Manual Facebook inquiry to confirmed COD order.

The first validation workflow:

1. Merchant signs in or uses a pilot shop workspace.
2. Merchant creates shop profile.
3. Merchant adds products.
4. Each product gets a hosted order link.
5. Merchant manually replies to Facebook comments/inbox messages with the relevant order link.
6. Customer submits name, phone, address, quantity, variant, and payment method.
7. Merchant sees order in dashboard.
8. Merchant marks COD/manual bKash/Nagad status.
9. Merchant exports courier CSV or copies courier-ready details.
10. Merchant updates order status and tracking.

The first automation product comes after this validation workflow works. Meta-powered detection and replies should be built when real seller usage proves that automation will increase conversion or reduce repetitive labor enough to justify App Review effort.

## 9. Full Long-Term Vision

Long-term, OrderFlow BD becomes a unified social commerce orchestration platform.

Future modules:

- Facebook comment/DM automation.
- Messenger customer support inbox.
- Instagram DM/comment integration.
- WhatsApp Business integration.
- Product catalog.
- Inventory management.
- Order management.
- MFS/payment verification.
- Courier booking and tracking.
- SLA monitoring.
- Customer history and repeat buyer tagging.
- Abandoned inquiry/order recovery.
- Bangla/English NLP reply suggestions.
- Merchant analytics.
- Admin/billing system.
- Viral branded invoice/order/tracking links.

## 10. Roadmap Overview

### Phase 0 - Local MVP/Demo

Status: mostly complete.

Goal:

- Make the product tangible and clickable.
- Validate product shape before production infrastructure.

Includes:

- Dashboard.
- Catalog.
- Orders.
- Admin/settings.
- Public order page.
- Demo APIs.
- Provider adapters.
- Supabase schema draft.

### Phase 1 - Production SaaS Foundation

Goal:

- Replace demo state with real persistence and auth.

Build:

- Supabase database connection.
- Supabase Auth.
- Merchant login.
- Tenant-safe data access.
- Shop/member roles.
- Product CRUD.
- Order CRUD.
- Automation rule CRUD.
- Billing records.
- Webhook event persistence.
- Admin invite/onboarding flow.

Acceptance criteria:

- A real merchant can log in.
- Data persists after restart/deploy.
- Shops cannot access other shops' data.
- Admin can manage pilot shops.
- Product/order/rule workflows work without editing code.

### Phase 2 - Vercel Staging Deployment

Goal:

- Put the app online for controlled pilot testing.

Build/configure:

- GitHub repo.
- Vercel project.
- Production/preview env vars.
- Supabase production URL/keys.
- Auth redirect URLs.
- Basic error logging.
- Health checks.
- Public legal pages.

Acceptance criteria:

- App runs on Vercel.
- Public order pages work.
- Merchant login works.
- Orders persist in Supabase.
- Staging URL is shareable with pilot merchants.

### Phase 3 - Meta-Ready Automation Build

Goal:

- Build the automation layer after manual order-link pilots prove seller usage, order capture, and willingness to pay. Prepare for Meta App Review only when automation is worth unlocking.

Build:

- Meta OAuth/Page connection UI.
- Secure Page token storage.
- Webhook subscription management.
- Comment/inquiry event ingestion.
- Keyword/rule matching.
- Public reply and private reply paths where Meta allows them.
- Fallback reply for unmatched/random messages.
- Reviewer-ready test Page, test product, test comment, and dashboard proof.
- Public legal pages required for review.
- Better onboarding checklist.
- Product import helper.

Acceptance criteria:

- Reviewer can reproduce the full automation flow from a clean account.
- Each requested Meta permission is visibly demonstrated.
- Test comments create dashboard events and order-link replies.
- Fallback reply prevents silent bot behavior.
- Public legal pages are live and match Meta app settings.

### Phase 4 - Meta App Review and Automation Launch

Goal:

- Secure Meta approval and upgrade the validated manual COD pilot into an automation-assisted workflow.

Build:

- Meta OAuth.
- Facebook Page connection.
- Store Page tokens securely.
- Webhook subscription.
- Webhook signature validation.
- Comment event ingestion.
- Keyword matching.
- Compliant public replies.
- Private reply/DM where Meta allows it.
- Human fallback when automation is restricted.
- App Review preparation flow.
- Reviewer-reproducible demo flow.
- Fresh App Review screencast script.
- Fallback reply for unmatched/random messages.
- COD order dashboard.
- Steadfast courier adapter if credentials are available.
- Courier CSV fallback.

Acceptance criteria:

- Test Facebook Page can connect.
- Meta webhook receives real events.
- Matched comments create logged automation actions.
- System replies only through approved/compliant routes.
- App Review materials can be prepared from working functionality.
- A clean reviewer account can reproduce the exact flow described in submission notes.
- Each requested Meta permission is visibly demonstrated in the product and screencast.
- At least 1 pilot shop can run the full workflow: Facebook inquiry -> automated reply/order link -> COD order -> Steadfast/API or CSV booking.

### Phase 5 - Payments

Goal:

- Move from manual payment tracking to gateway-backed verification.

Recommended sequence:

1. Keep COD and manual bKash/Nagad.
2. Add SSLCOMMERZ first for multi-method checkout.
3. Add bKash PGW/tokenized checkout.
4. Add Nagad if merchant demand justifies it.

Build:

- Payment provider adapter implementation.
- Payment request creation.
- Payment callback/IPN routes.
- Transaction verification.
- Payment state transitions.
- Refund/cancellation notes.
- Payment audit log.

Acceptance criteria:

- Customer can pay through approved provider.
- Order payment state updates automatically.
- Failed/pending payments are handled safely.
- Merchant can still use manual payment fallback.

### Phase 6 - Courier Automation

Goal:

- Reduce manual courier booking.

Recommended sequence:

1. Steadfast API if credentials/docs are available.
2. Courier CSV fallback if API approval is delayed.
3. Pathao API if merchant account access is available.
4. RedX/eCourier based on pilot demand.

Build:

- Courier provider adapter implementation.
- Shipment creation.
- COD amount handling.
- Pickup location management.
- Tracking ID storage.
- Tracking update sync where supported.
- Return/cancellation status.

Acceptance criteria:

- Merchant can create shipments from confirmed/paid orders.
- Tracking IDs are stored and visible.
- Courier failures are logged and recoverable.
- CSV fallback remains available.

### Phase 7 - Growth, NLP, and Multi-Channel

Goal:

- Expand once the core Facebook order workflow is proven.

Build:

- Bangla/English NLP for intent detection.
- Reply suggestions and confidence scoring.
- Abandoned inquiry recovery.
- Customer profiles and repeat buyer tags.
- Instagram integration.
- WhatsApp Business integration.
- Analytics by product, source, campaign, and delivery performance.
- Referral/freemium loops.
- Volume-based billing.

Acceptance criteria:

- NLP improves response speed without hurting accuracy.
- Merchants see measurable time saved.
- Additional channels increase orders, not complexity.
- Paid retention remains strong.

## 11. Key Features by Module

### Merchant Dashboard

- Daily order count.
- Revenue estimate.
- Pending payment count.
- Courier-ready count.
- SLA risk alerts.
- Automation reply count.
- Conversion rate from inquiries to orders.

### Product Catalog

- Product name in English and Bangla.
- Price.
- Compare-at price.
- Delivery fee.
- Stock.
- Variants.
- Keywords.
- Product/order page link.
- Active/inactive state.

### Automation Rules

- Keyword triggers.
- Product-specific or general rules.
- Bangla public reply.
- English public reply.
- Bangla DM template.
- English DM template.
- Order link variable.
- Enabled/disabled state.
- Audit log of triggered replies.

### Order Management

- Customer name.
- Phone.
- Address.
- District/area.
- Product.
- Quantity.
- Payment method.
- Payment reference.
- Payment verification state.
- Courier provider.
- Tracking ID.
- Status.
- Notes.
- SLA deadline.

Order statuses:

- New.
- Confirmed.
- Awaiting payment.
- Paid.
- Packed.
- Shipped.
- Delivered.
- Cancelled.
- Returned.

### Payment Workflow

MVP:

- COD.
- Manual bKash.
- Manual Nagad.
- Payment reference capture.
- Merchant mark-as-verified.

Future:

- SSLCOMMERZ checkout.
- bKash PGW.
- Nagad gateway.
- IPN/callback verification.
- Payment audit log.

### Courier Workflow

MVP:

- Courier CSV export.
- Manual tracking ID entry.
- Courier provider selection.

Future:

- Pathao API.
- Steadfast API.
- RedX API.
- Tracking sync.
- Return management.

### Admin/Billing

MVP:

- Shops list.
- Plan.
- Status.
- Manual invoices.
- Payment status.
- Usage count.
- Support notes.

Future:

- Automated billing.
- Usage-based billing.
- Suspension/reactivation.
- Admin audit logs.

## 12. Virality and Growth Loops

### Powered By Watermark

Add subtle branding to:

- Public order page.
- Invoice/confirmation page.
- Tracking page.
- Customer messages where appropriate.

Example:

> Order powered by OrderFlow BD

Goal:

- Buyers who also sell online discover the product.
- Merchants see competitors using professional order links.

### Referral Loop

Future:

- Give merchants free extra order quota for referrals.
- Give women-led pilot sellers early founder pricing.
- Add shareable product/order pages.

### Community Loop

Target:

- Facebook seller groups.
- e-CAB/network groups.
- Women entrepreneur communities.
- Courier/payment partner communities.

## 13. Pricing Strategy

Start simple. Do not introduce complex GMV pricing before payment automation exists.

### Pilot

- 0-500 BDT/month or free for 30 days.
- Manual onboarding.
- Limited shops only.
- Goal: feedback and retention.

### Starter

- Around BDT 1,500/month.
- 1 Facebook Page.
- Up to 500 monthly orders.
- Basic automation.
- Manual payments.
- Courier export.

### Growth

- Around BDT 2,500-4,000/month.
- Multiple Pages.
- Higher order limit.
- More automation rules.
- Team members.
- Advanced analytics.

### Future Add-ons

- Payment automation fee.
- Extra order volume.
- Extra Pages.
- Extra team members.
- SMS/WhatsApp notification credits.
- Premium support/onboarding.

## 14. Success Metrics

### Product Metrics

- Orders captured per shop.
- Comment/inquiry to order conversion rate.
- Time from inquiry to order.
- Payment verification time.
- Courier booking time.
- SLA risk count.
- Repeat merchant usage days.

### Business Metrics

- Number of active paying shops.
- Month 1 retention.
- Month 2 retention.
- ARPU.
- Support load per merchant.
- Churn reasons.
- Referral signups.

### First Pilot Success Target

- 3-5 shops onboarded.
- 100+ real orders captured.
- At least 2 shops willing to pay after trial.
- Clear proof that manual effort is reduced.

### 60-90 Day Success Target

- 10 paying shops retained after one billing cycle.
- At least 1-2 repeatable acquisition channels identified.
- At least one integration priority confirmed by actual merchant demand.

## 15. Technical Architecture

### Current Stack

- Next.js.
- TypeScript.
- CSS modules/global CSS style system.
- Supabase planned for database/auth.
- Vercel planned for deployment.

### Production Stack

- Next.js App Router.
- Supabase Postgres.
- Supabase Auth.
- Supabase Row Level Security.
- Vercel hosting.
- Provider adapters for Meta, payments, couriers.

### Core Data Tables

- Shops.
- Shop members.
- Products.
- Automation rules.
- Orders.
- Webhook events.
- Billing records.
- Provider credentials/secrets.
- Audit logs.
- Customer records later.

### Security Requirements

- Tenant isolation with RLS.
- Server-only secret keys.
- Webhook signature validation.
- Idempotent webhook event processing.
- Audit logs for sensitive actions.
- No secrets in browser code.
- No secrets in GitHub.
- Admin-only access to cross-shop data.

## 16. Integration Strategy

### Meta

Use official APIs only.

Need:

- Meta Business.
- Meta Developer App.
- Facebook Page.
- App Review where required.
- Page permissions.
- Webhook callback URL.
- Verify token.
- App secret signature validation.

Fallback:

- Public order links.
- Manual merchant handling.
- Human handoff when private reply/DM is restricted.

Rule:

- Meta automation is not a dependency for customer validation. Manual order-link sharing is the first pilot path; Meta automation becomes a launch accelerator after validation.

### Payments

MVP:

- COD.
- Manual bKash/Nagad reference tracking.

Future:

- SSLCOMMERZ.
- bKash PGW.
- Nagad.

Rule:

- Do not block the manual COD validation pilot waiting for payment gateway approval.
- COD is the launch payment method; gateways are a later conversion and verification upgrade.

### Couriers

MVP:

- CSV export.
- Manual tracking entry.

Future:

- Pathao.
- Steadfast.
- RedX.
- eCourier, if demand exists.

Rule:

- Add courier APIs based on the couriers pilot shops actually use.

## 17. User Responsibilities

The user/founder must prepare:

- GitHub repo/account.
- Supabase project.
- Vercel account.
- Domain.
- Business email.
- Legal pages.
- Business documents.
- Meta Business.
- Meta Developer App.
- Facebook Page access.
- Payment gateway accounts.
- Courier merchant accounts.
- Pilot merchant list.

Detailed step-by-step user tasks are documented in:

`USER_ACTION_PLAN.md`

## 18. Engineering Responsibilities

Codex/engineering will:

- Maintain the app codebase.
- Improve UI/UX.
- Wire Supabase persistence/auth.
- Implement CRUD workflows.
- Build tenant-safe access.
- Deploy to Vercel.
- Implement provider adapters.
- Add real integrations when credentials are available.
- Build App Review support flows.
- Add tests/checks.
- Keep roadmap aligned with this master plan.

## 19. Non-Goals for the First Production Phase

Do not build these before Supabase/auth/pilot basics are stable:

- Full AI/NLP automation.
- Multi-channel WhatsApp/Instagram support.
- Automated subscription billing.
- Complex CRM.
- Marketplace.
- Mobile app.
- Full inventory accounting system.
- Warehouse management.
- Enterprise roles/permissions.
- Custom workflow builder.

These may come later, but they are distractions before the paid pilot is working.

## 20. Key Risks

### Meta Approval Risk

Meta permissions and App Review can delay private messaging automation.

Mitigation:

- Build hosted order links and public reply fallback.
- Use official APIs only.
- Prepare App Review materials carefully.
- Follow `META_APP_REVIEW_READINESS.md` before submitting.
- Ensure reviewer credentials, Facebook Page access, screencast, submission notes, privacy URL, and data deletion URL all describe the same live flow.
- Never submit with placeholder UI, inaccessible reviewer accounts, missing Page assignment, broken OAuth, or silent bot behavior.

### Merchant Adoption Risk

Small sellers may resist dashboards if onboarding is hard.

Mitigation:

- Keep workflows simple.
- Provide done-for-you onboarding.
- Start with product/order links and clear order list.

### Payment Verification Risk

Manual bKash/Nagad is error-prone.

Mitigation:

- Capture transaction reference.
- Add payment verified state.
- Add automated gateway later.

### Courier Fragmentation Risk

Different shops use different couriers.

Mitigation:

- CSV export first.
- Add APIs by actual pilot demand.

### Scope Creep Risk

The long-term platform is large.

Mitigation:

- Follow this master plan.
- Build phase by phase.
- Use paid retention as the decision filter.

## 21. Immediate Next Steps

### User

1. Build a seller CRM with at least 30 target Facebook shops.
2. Shorten the seller questionnaire and run seller conversations.
3. Recruit 3-5 pilot shops for manual order-link validation.
4. Bring GitHub, Supabase, and Vercel basics when pilots are likely.
5. Begin Meta Business/Developer setup after the manual pilot shows real usage.

### Engineering

After user brings required accounts/keys:

1. Checkpoint current MVP.
2. Push to GitHub.
3. Wire Supabase.
4. Add auth.
5. Add tenant-safe CRUD.
6. Deploy staging on Vercel.
7. Start pilot testing.

## 22. Decision Filter

When deciding whether to add a feature, ask:

1. Does it help a Facebook-first merchant capture or fulfill orders?
2. Does it reduce manual work in replies, payments, or courier booking?
3. Does it help reach 10 paying retained shops?
4. Can it work before external approvals, or does it have a fallback?
5. Is it needed for the next pilot milestone?

If the answer is mostly no, defer it.

## 23. Master Reference Files

- `README.md` - current app setup and local run instructions.
- `USER_ACTION_PLAN.md` - founder/user tasks and credentials checklist.
- `SAAS_MASTER_PLAN.md` - product, roadmap, architecture, and strategy reference.
- `META_APP_REVIEW_READINESS.md` - Meta App Review rejection-prevention checklist.
- `supabase/schema.sql` - draft production database schema.
- `.env.example` - environment variables we expect to configure.

## 24. Current North Star

The next milestone is not "build every feature."

The next milestone is:

> A real deployed SaaS where 3-5 pilot merchants can add products, send manual order links to real Facebook customers, receive COD orders, and create/export courier-ready shipments.

After that works reliably, we add Meta automation, payment gateways, courier automation, NLP, and multi-channel support.
