# Real Auth Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the seeded demo-shop flow with a real merchant landing, merchant auth/onboarding, protected merchant app, and hidden platform admin area.

**Architecture:** Keep the existing product/order repository and UI workspaces, but change route ownership. Public routes become landing/order pages; merchant routes resolve the current shop from Supabase Auth membership; platform admin routes require a separate `platform_admins` table. Existing demo seed data remains optional database sample data and is no longer used to choose the active shop.

**Tech Stack:** Next.js App Router, TypeScript, Supabase Auth/Postgres/RLS, Vitest, existing CSS design system.

---

## File Structure

- `src/lib/auth/session.ts`: server-side Supabase user, merchant shop, and platform admin helpers.
- `src/lib/auth/session.test.ts`: pure tests for route destinations and access-state helpers.
- `src/lib/supabase/types.ts`: add `shop_members`, `platform_admins`, and `create_merchant_shop` function types.
- `supabase/schema.sql`: update base schema for platform admins, merchant shop creation RPC, and RLS policies.
- `supabase/patches/2026-06-06-real-auth-model.sql`: safe SQL patch for the already-created Supabase project.
- `src/app/page.tsx`: public landing page.
- `src/app/merchant/login/page.tsx`: merchant login/signup page.
- `src/components/auth-form.tsx`: reusable sign-in/sign-up form.
- `src/app/merchant/setup/page.tsx`: merchant shop onboarding.
- `src/components/merchant-setup-form.tsx`: client shop setup form.
- `src/app/api/merchant/setup/route.ts`: authenticated shop creation API.
- `src/components/app-shell.tsx`: merchant app shell with merchant-only nav.
- `src/app/merchant/dashboard/page.tsx`, `products/page.tsx`, `orders/page.tsx`, `templates/page.tsx`, `settings/page.tsx`: protected merchant screens.
- `src/app/control/login/page.tsx`: hidden platform admin login page.
- `src/app/control/page.tsx`: hidden platform admin dashboard.
- Legacy `src/app/login`, `src/app/products`, `src/app/orders`, `src/app/templates`, `src/app/settings`, `src/app/admin`: redirect to the new real routes.

## Tasks

### Task 1: Auth State Helpers

- [x] Write failing tests for real auth routing helpers in `src/lib/auth/session.test.ts`.
- [x] Implement `getMerchantDestination`, `getControlDestination`, and server helpers in `src/lib/auth/session.ts`.
- [x] Verify `npm test -- src/lib/auth/session.test.ts`.

### Task 2: Supabase Real Auth Schema

- [x] Add `platform_admins` and `create_merchant_shop` function to `supabase/schema.sql`.
- [x] Add matching safe patch at `supabase/patches/2026-06-06-real-auth-model.sql`.
- [x] Update `src/lib/supabase/types.ts` with `shop_members`, `platform_admins`, and RPC type entries.

### Task 3: Public Landing And Auth Forms

- [x] Replace `/` with a public landing page that sends merchants to `/merchant/login`.
- [x] Replace the old login component with `AuthForm` supporting sign in and sign up.
- [x] Add `/merchant/login` and `/control/login`.
- [x] Redirect `/login` to `/merchant/login`.

### Task 4: Merchant Onboarding And Protected App

- [x] Add `/merchant/setup` and `MerchantSetupForm`.
- [x] Add `/api/merchant/setup` to call `create_merchant_shop`.
- [x] Move dashboard/products/orders/templates/settings to `/merchant/*`.
- [x] Resolve the merchant shop from the logged-in user instead of `demoShop.slug`.
- [x] Redirect old top-level merchant routes to `/merchant/*`.

### Task 5: Hidden Platform Admin

- [x] Add `requirePlatformAdmin` helper.
- [x] Add `/control` admin dashboard with total shops, total orders, total revenue, and recent shop list.
- [x] Redirect old `/admin` to `/control`.

### Task 6: Verification And Publish

- [x] Run `npm test`.
- [x] Run `npm run lint`.
- [x] Run `npm run build`.
- [x] Run `npm audit`.
- [x] Browser-check landing, merchant login, merchant setup/dashboard redirect behavior, and control login.
- [x] Commit the real auth/platform changes.

## Success Criteria

- `/` no longer shows merchant app navigation.
- Merchant pages are under `/merchant/*`.
- Hidden admin is under `/control` and is not linked from public/merchant nav.
- No route uses `demoShop.slug` to decide the current merchant shop.
- A merchant can sign up/login, create a shop, and then land in their dashboard.
- A platform admin is controlled by `platform_admins`, not by shop membership.
- Existing public order pages keep working by shop slug and product slug.
