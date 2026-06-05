# OrderFlow BD MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local-first Next.js MVP for manual OrderFlow BD validation: products, public order links, COD/manual MFS orders, order operations, reply templates, courier CSV export, legal pages, and future integration boundaries.

**Architecture:** Create a Next.js App Router project in the current `E:\OrderFlow` folder. Keep behavior-heavy code in tested domain/store modules, then expose it through route handlers and reusable UI components. Use an in-memory repository now, with provider and store interfaces ready for Supabase, Meta, payment, and courier implementations later.

**Tech Stack:** Next.js, React, TypeScript, Vitest, CSS modules/global CSS, in-memory local store.

---

## File Structure

- Create `package.json`, `tsconfig.json`, `next.config.ts`, `vitest.config.ts`, `.gitignore`, `.env.example`.
- Create `src/lib/domain/types.ts` for domain types and enums.
- Create `src/lib/domain/seed.ts` for demo shop, products, templates, billing, and seeded orders.
- Create `src/lib/domain/validation.ts` for phone/order/product validation.
- Create `src/lib/domain/money.ts` for totals and formatting.
- Create `src/lib/domain/csv.ts` for courier CSV generation.
- Create `src/lib/store/repository.ts` for the repository interface.
- Create `src/lib/store/local-store.ts` for local in-memory repository.
- Create `src/lib/providers/messaging.ts`, `src/lib/providers/payments.ts`, `src/lib/providers/couriers.ts` for adapters.
- Create `src/lib/api/responses.ts` for structured API responses.
- Create tests under `src/lib/**/*.test.ts`.
- Create `src/app/layout.tsx`, `src/app/page.tsx`, route pages, API route handlers, and global styles.
- Create `src/components` for app shell, tables, forms, status controls, copy buttons, and metric panels.

---

## Task 1: Scaffold The Next.js Project

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `vitest.config.ts`
- Create: `.gitignore`
- Create: `.env.example`
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`

- [ ] **Step 1: Create project config files**

Use Next.js App Router, Vitest, TypeScript strict mode, and scripts for `dev`, `build`, `start`, `test`, and `lint`.

- [ ] **Step 2: Install dependencies**

Run: `npm install`

Expected: dependencies install and `package-lock.json` is created.

- [ ] **Step 3: Run baseline checks**

Run: `npm test`

Expected: Vitest reports no test files or exits successfully after initial tests are added in later tasks.

---

## Task 2: Build Domain Types And Seed Data With Tests

**Files:**
- Create: `src/lib/domain/types.ts`
- Create: `src/lib/domain/seed.ts`
- Test: `src/lib/domain/money.test.ts`
- Create: `src/lib/domain/money.ts`

- [ ] **Step 1: Write failing money tests**

Test that order totals calculate `price * quantity + deliveryCharge`, and that BDT formatting includes a thousands-separated amount.

- [ ] **Step 2: Run tests to verify failure**

Run: `npm test -- src/lib/domain/money.test.ts`

Expected: FAIL because `calculateOrderTotals` and `formatBdt` do not exist yet.

- [ ] **Step 3: Implement types, seed data, and money helpers**

Define shop, product, order, customer, template, webhook event, billing record, status, payment, and courier types. Seed one shop, at least four products, reply templates, billing records, and realistic orders.

- [ ] **Step 4: Run tests to verify pass**

Run: `npm test -- src/lib/domain/money.test.ts`

Expected: PASS.

---

## Task 3: Build Validation And CSV Helpers With Tests

**Files:**
- Test: `src/lib/domain/validation.test.ts`
- Test: `src/lib/domain/csv.test.ts`
- Create: `src/lib/domain/validation.ts`
- Create: `src/lib/domain/csv.ts`

- [ ] **Step 1: Write failing validation tests**

Cover valid Bangladesh phone formats, invalid phone formats, missing address, inactive product, invalid quantity, and stock lower than requested quantity.

- [ ] **Step 2: Run validation tests to verify failure**

Run: `npm test -- src/lib/domain/validation.test.ts`

Expected: FAIL because validation helpers do not exist yet.

- [ ] **Step 3: Implement validation helpers**

Implement product input validation and order input validation returning structured field errors.

- [ ] **Step 4: Run validation tests to verify pass**

Run: `npm test -- src/lib/domain/validation.test.ts`

Expected: PASS.

- [ ] **Step 5: Write failing CSV tests**

Cover generic courier columns and escaping commas/quotes/newlines.

- [ ] **Step 6: Run CSV tests to verify failure**

Run: `npm test -- src/lib/domain/csv.test.ts`

Expected: FAIL because CSV helper does not exist yet.

- [ ] **Step 7: Implement CSV helper**

Implement `buildCourierCsv(orders, products)` with the expected generic courier columns.

- [ ] **Step 8: Run CSV tests to verify pass**

Run: `npm test -- src/lib/domain/csv.test.ts`

Expected: PASS.

---

## Task 4: Build Local Repository And Provider Boundaries

**Files:**
- Test: `src/lib/store/local-store.test.ts`
- Create: `src/lib/store/repository.ts`
- Create: `src/lib/store/local-store.ts`
- Create: `src/lib/store/index.ts`
- Create: `src/lib/providers/messaging.ts`
- Create: `src/lib/providers/payments.ts`
- Create: `src/lib/providers/couriers.ts`

- [ ] **Step 1: Write failing store tests**

Cover listing products, creating an order from valid input, patching order status, soft-deactivating a product, and recording a webhook event.

- [ ] **Step 2: Run store tests to verify failure**

Run: `npm test -- src/lib/store/local-store.test.ts`

Expected: FAIL because repository functions do not exist yet.

- [ ] **Step 3: Implement repository interface and local store**

Implement a singleton local store seeded from demo data. Expose CRUD methods for shops, products, orders, templates, webhook events, and billing records.

- [ ] **Step 4: Implement provider stubs**

Add local messaging, payment, and courier adapter interfaces with stub implementations that report `mode: "local-demo"`.

- [ ] **Step 5: Run store tests to verify pass**

Run: `npm test -- src/lib/store/local-store.test.ts`

Expected: PASS.

---

## Task 5: Build API Route Handlers

**Files:**
- Create: `src/lib/api/responses.ts`
- Create: `src/app/api/health/route.ts`
- Create: `src/app/api/products/route.ts`
- Create: `src/app/api/products/[productId]/route.ts`
- Create: `src/app/api/orders/route.ts`
- Create: `src/app/api/orders/[orderId]/route.ts`
- Create: `src/app/api/orders/export/route.ts`
- Create: `src/app/api/meta/webhook/route.ts`
- Create: `src/app/api/meta/test/route.ts`

- [ ] **Step 1: Implement structured API responses**

Return JSON shapes `{ ok: true, data }` and `{ ok: false, error, fieldErrors? }`.

- [ ] **Step 2: Implement product and order routes**

Use local store methods and validation helpers. Ensure public order creation rejects invalid customer/order input.

- [ ] **Step 3: Implement export, health, and Meta demo routes**

Return CSV from `/api/orders/export`, health JSON from `/api/health`, Meta verify challenge from `/api/meta/webhook`, and local webhook event simulation from `/api/meta/test`.

- [ ] **Step 4: Run tests**

Run: `npm test`

Expected: all domain and store tests pass.

---

## Task 6: Build Merchant UI

**Files:**
- Create: `src/components/app-shell.tsx`
- Create: `src/components/forms.tsx`
- Create: `src/components/metric-card.tsx`
- Create: `src/components/status-badge.tsx`
- Create: `src/components/copy-button.tsx`
- Create: `src/components/product-manager.tsx`
- Create: `src/components/orders-workspace.tsx`
- Create: `src/components/templates-workspace.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/products/page.tsx`
- Create: `src/app/orders/page.tsx`
- Create: `src/app/templates/page.tsx`
- Create: `src/app/settings/page.tsx`
- Create: `src/app/admin/page.tsx`

- [ ] **Step 1: Build app shell and shared UI components**

Create side navigation, header, local-mode marker, metric card, status badge, copy button, and form field styling.

- [ ] **Step 2: Build dashboard page**

Show order metrics, recent orders, courier-ready orders, and reply template shortcuts.

- [ ] **Step 3: Build product manager**

Support product create, edit, deactivate, active state, and order-link copy.

- [ ] **Step 4: Build orders workspace**

Support filters, status/payment/courier/tracking/notes updates, CSV export link, and copyable customer details.

- [ ] **Step 5: Build templates, settings, and admin pages**

Show copyable reply templates, shop settings, local mode, future integration panels, pilot shop billing/support records, and recent webhook events.

---

## Task 7: Build Public Order And Legal Pages

**Files:**
- Create: `src/app/order/[shopSlug]/[productSlug]/page.tsx`
- Create: `src/app/order/[shopSlug]/[productSlug]/success/page.tsx`
- Create: `src/components/public-order-form.tsx`
- Create: `src/app/privacy/page.tsx`
- Create: `src/app/terms/page.tsx`
- Create: `src/app/data-deletion/page.tsx`
- Create: `src/app/contact/page.tsx`

- [ ] **Step 1: Build public order form**

Show product image, price, delivery charge, total estimate, customer fields, payment method, quantity, variant, and customer notes. Submit to `/api/orders`.

- [ ] **Step 2: Build success page**

Show order confirmation guidance and support contact details after submission.

- [ ] **Step 3: Build legal/trust pages**

Create public privacy, terms, data deletion, and contact pages with OrderFlow BD-specific content.

---

## Task 8: Verify Build And Browser Workflow

**Files:**
- Modify only files needed to fix verification failures.

- [ ] **Step 1: Run tests**

Run: `npm test`

Expected: all tests pass.

- [ ] **Step 2: Run lint**

Run: `npm run lint`

Expected: no lint errors.

- [ ] **Step 3: Run production build**

Run: `npm run build`

Expected: Next.js production build completes.

- [ ] **Step 4: Start dev server**

Run: `npm run dev`

Expected: app starts on `http://localhost:3000`.

- [ ] **Step 5: Verify core workflow**

Open the local app and verify dashboard, product management, public order submission, order updates, CSV export, health route, and Meta webhook verify route.

---

## Self-Review

Spec coverage:

- Manual product links, public orders, COD/manual MFS, order management, courier CSV, reply templates, legal pages, health route, Meta verify readiness, local store, and future integration boundaries are covered.

Placeholder scan:

- This plan intentionally avoids deferred implementation language for MVP tasks. Future integrations are represented as adapter boundaries and visible inactive panels, not promised as working external services.

Type consistency:

- Domain type names match the spec: `Shop`, `Product`, `Order`, `Customer`, `ReplyTemplate`, `WebhookEvent`, and `BillingRecord`.
