# OrderFlow BD Practical MVP Design

Date: 2026-06-05

## Goal

Build a practical OrderFlow BD MVP from the existing docs in this workspace. The first release must let a Bangladesh F-commerce merchant create products, share public order links manually, capture COD/manual MFS orders, manage order status, and export courier-ready CSV files. The codebase should stay ready for the full SaaS later: Supabase auth/persistence, Meta automation, payment gateways, and courier APIs should be addable through clear boundaries rather than rewrites.

## Product Scope

The MVP focuses on the manual validation workflow described in the docs:

1. A merchant opens a dashboard for a pilot shop.
2. The merchant creates and manages products with price, delivery charge, stock, variants, keywords, and active state.
3. Each product has a public order link.
4. The merchant manually sends that link in Facebook comments, Messenger, WhatsApp, or Instagram.
5. A customer submits name, phone, district, area, full address, quantity, variant, payment method, and notes.
6. The merchant sees the order in the dashboard.
7. The merchant updates status, payment verification, courier provider, tracking ID, and notes.
8. The merchant exports a generic courier CSV or copies customer/order details.
9. The merchant uses Bangla/English reply templates to answer repeated inquiries faster.

Out of scope for this MVP: real Meta OAuth, real Facebook replies, real payment gateway transactions, real courier booking APIs, multi-tenant production auth, subscription billing automation, advanced NLP, WhatsApp/Instagram APIs, and mobile native apps. The UI may show integration readiness panels, but they must be clearly marked as not connected in local MVP mode.

## Architecture

Use Next.js App Router with TypeScript. The app should run locally with no external credentials and use an in-memory demo store for pilot data. Keep data access behind a repository interface so a Supabase implementation can replace the demo store later. Keep provider actions behind adapter interfaces so Meta messaging, payments, and couriers can be implemented without changing UI workflows.

Primary layers:

- `src/lib/domain`: shared types, constants, validation helpers, CSV helpers, and demo seed data.
- `src/lib/store`: repository interface plus local in-memory implementation.
- `src/lib/providers`: adapter interfaces for messaging, payments, and couriers with local stub implementations.
- `src/app`: Next.js pages and route handlers.
- `src/components`: reusable UI primitives and feature components.

The MVP should be server-first where practical. Interactive product/order management can use client components and route handlers. No secrets should be exposed to client code.

## Routes

Merchant routes:

- `/` dashboard overview with key metrics, recent orders, courier-ready queue, and reply template shortcuts.
- `/products` product catalog with create/edit/delete, active state, order-link copy, and product preview link.
- `/orders` order workspace with filters, status updates, payment state, courier fields, tracking ID, notes, CSV export, and copy details.
- `/templates` reply templates in Bangla and English for price, availability, COD, delivery charge, and order link responses.
- `/settings` shop profile, local MVP mode indicator, and future integration panels for Supabase, Meta, payments, and couriers.
- `/admin` lightweight pilot/admin view for shops, plans, order counts, billing notes, and support notes.

Public routes:

- `/order/[shopSlug]/[productSlug]` mobile-first public order page.
- `/order/[shopSlug]/[productSlug]/success` confirmation state after order creation.
- `/privacy`, `/terms`, `/data-deletion`, `/contact` public legal and trust pages.

API routes:

- `GET /api/health` returns app health and local mode.
- `GET /api/products` lists products.
- `POST /api/products` creates a product.
- `PATCH /api/products/[productId]` updates a product.
- `DELETE /api/products/[productId]` soft-deactivates a product.
- `GET /api/orders` lists orders.
- `POST /api/orders` creates an order from a public order page.
- `PATCH /api/orders/[orderId]` updates order status, payment, courier, tracking, and notes.
- `GET /api/orders/export` returns generic courier CSV.
- `GET /api/meta/webhook` supports Meta webhook verification for future readiness.
- `POST /api/meta/test` simulates a Meta comment/inquiry event and records a local demo event.

## Data Model

Use TypeScript domain types that map cleanly to future Supabase tables:

- `Shop`: id, slug, name, ownerName, phone, email, logoUrl, supportPhone, defaultDistrict, defaultCourier, plan, status.
- `Product`: id, shopId, slug, name, nameBn, description, price, compareAtPrice, deliveryCharge, stock, variants, keywords, imageUrl, active, createdAt, updatedAt.
- `Order`: id, shopId, productId, customer, quantity, variant, paymentMethod, paymentStatus, paymentReference, status, courierProvider, trackingId, merchantNotes, customerNotes, subtotal, deliveryCharge, total, slaDeadline, createdAt, updatedAt.
- `Customer`: name, phone, alternatePhone, district, area, address.
- `ReplyTemplate`: id, shopId, language, title, trigger, body, active.
- `WebhookEvent`: id, provider, eventType, sourceId, matchedProductId, message, reply, status, createdAt.
- `BillingRecord`: id, shopId, plan, amount, period, status, notes, createdAt.

Order statuses:

- `new`
- `confirmed`
- `packed`
- `courier_ready`
- `shipped`
- `delivered`
- `cancelled`
- `returned`

Payment methods:

- `cod`
- `manual_bkash`
- `manual_nagad`

Payment statuses:

- `unpaid`
- `awaiting_verification`
- `verified`
- `failed`
- `refunded`

## UX Design

The UI should feel like a quiet operations tool for owner-operators, not a marketing site. The first screen should be the dashboard, not a landing page. Use dense but readable layouts: side navigation, compact metric tiles, tables, filters, and clear action buttons. The public order page should be mobile-first, trustworthy, and simple.

Design principles:

- Make the daily workflow obvious: copy product link, receive order, confirm, prepare courier, export.
- Keep Bangla customer-facing copy where useful, with English merchant operations labels.
- Use restrained colors, high contrast, and clear status styling.
- Prefer tables/lists for operational data instead of decorative card grids.
- Keep forms short and forgiving.
- Make inactive future integrations visible as roadmap-ready but not misleading.

Expected controls:

- Icon buttons for copy, export, edit, delete/deactivate, and refresh.
- Select menus for status, payment, courier, and filters.
- Inputs/textareas for product and order fields.
- Tabs or segmented controls for order filters.
- Toast-style feedback or inline success states for copy/export/update actions.

## Error Handling

Validation must catch missing customer name, invalid Bangladesh phone format, missing address, invalid quantity, inactive product, and stock lower than quantity. API responses should return structured JSON with `ok`, `error`, and optional `fieldErrors`. The public order form should show field-level errors. Merchant actions should show clear failure messages without exposing stack traces.

The local store is reset on server restart. The app should show a local/demo mode notice in settings and health output so this is never mistaken for production persistence.

## Future Integration Boundaries

Supabase:

- The repository interface should define product, order, shop, template, webhook event, and billing operations.
- A future `supabaseStore` can implement the same interface with RLS-backed tables.

Meta:

- Webhook verification and demo event simulation should exist now.
- Real OAuth, Page selection, token storage, webhook subscription, signature enforcement, and approved replies are later implementations behind a messaging provider.

Payments:

- Manual bKash/Nagad and COD are active now.
- SSLCOMMERZ, bKash PGW, and Nagad gateway implementations should later plug into a payment provider interface.

Couriers:

- Generic CSV export is active now.
- Steadfast, Pathao, RedX, and eCourier should later plug into a courier provider interface with shipment creation and tracking update methods.

## Testing And Verification

Use TDD for behavior-heavy units: validation, order totals, status transitions, CSV generation, and store operations. Use route-level tests where practical. Verify the UI by running the dev server and checking:

- Dashboard loads.
- Product create/edit/deactivate works.
- Public order page creates an order.
- Order status/payment/courier updates persist in local mode.
- Courier CSV downloads with expected columns.
- Legal pages are public.
- Health route returns OK.
- Meta webhook verification challenge returns the challenge.

Run `npm test`, `npm run lint`, and `npm run build` before handoff once the app exists.

## Acceptance Criteria

The MVP is ready when:

- `npm install`, `npm run dev`, and `npm run build` work.
- A merchant can manage a seeded pilot shop and products locally.
- A customer can submit a real-looking COD/manual MFS order through a public product link.
- Orders appear in the merchant workspace with totals and customer details.
- Merchant status/payment/courier updates work.
- Generic courier CSV export works.
- Reply templates are usable and copyable.
- Legal/trust pages are present.
- Provider and store boundaries are in place for Supabase, Meta, payments, and courier APIs later.
- The app remains honest about local demo mode and does not imply unavailable integrations are live.
