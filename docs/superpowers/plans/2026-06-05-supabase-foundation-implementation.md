# Supabase Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Supabase-ready production foundation while preserving the current local MVP workflow.

**Architecture:** Keep the existing `OrderFlowRepository` boundary. Add environment mode detection, Supabase clients, a Supabase repository adapter, SQL schema/seed files, and auth/status UI. Default to the local repository when Supabase env vars are absent.

**Tech Stack:** Next.js App Router, TypeScript, Supabase JS/SSR, Postgres SQL with RLS, Vitest.

---

## Task 1: Runtime Config

**Files:**
- Create: `src/lib/config/env.ts`
- Test: `src/lib/config/env.test.ts`

- [x] Write failing tests for local mode, Supabase mode, and missing partial config.
- [x] Run `npm test -- src/lib/config/env.test.ts` and verify failure.
- [x] Implement env parsing and mode selection.
- [x] Run the test and verify pass.

## Task 2: Supabase Dependency And Clients

**Files:**
- Modify: `package.json`
- Create: `src/lib/supabase/server.ts`
- Create: `src/lib/supabase/browser.ts`
- Create: `src/lib/supabase/types.ts`

- [x] Install `@supabase/supabase-js` and `@supabase/ssr`.
- [x] Add typed server and browser client helpers.
- [x] Ensure no service key is used in browser code.

## Task 3: Schema And Seed SQL

**Files:**
- Create: `supabase/schema.sql`
- Create: `supabase/seed.sql`

- [x] Add enums/tables for shops, members, products, orders, templates, webhook events, billing records.
- [x] Add updated-at trigger helper.
- [x] Add indexes for slug lookup, shop-scoped lists, statuses, and created-at screens.
- [x] Enable RLS and add membership-based policies.
- [x] Add demo seed data matching the local MVP.

## Task 4: Supabase Repository Adapter

**Files:**
- Test: `src/lib/store/supabase-store.test.ts`
- Create: `src/lib/store/supabase-store.ts`
- Modify: `src/lib/store/index.ts`

- [x] Write failing tests for row/domain mapping and local fallback.
- [x] Run the tests and verify failure.
- [x] Implement row mapping helpers and adapter skeleton.
- [x] Implement repository factory selection.
- [x] Run tests and verify pass.

## Task 5: Auth And Status UI

**Files:**
- Create: `src/app/login/page.tsx`
- Create: `src/components/login-form.tsx`
- Create: `src/app/auth/callback/route.ts`
- Modify: `src/app/settings/page.tsx`
- Modify: `src/components/app-shell.tsx`
- Modify: `.env.example`

- [x] Add login page with local-mode fallback text and Supabase email/password form.
- [x] Add callback route with clear next-step redirect state.
- [x] Add settings mode diagnostics and schema setup guidance.
- [x] Add login link to app shell.
- [x] Update `.env.example` with `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` naming while keeping anon alias compatibility.

## Task 6: Verification

- [x] Run `npm test`.
- [x] Run `npm run lint`.
- [x] Run `npm run build`.
- [x] Run `npm audit`.
- [x] Browser check `/`, `/settings`, and `/login` in local mode.
- [x] Commit the Supabase foundation changes.

## Self-Review

Spec coverage:

- Runtime config, schema, RLS, clients, repository selection, auth UI, and local fallback are covered.

Placeholder scan:

- Future integrations are out of scope. This plan implements the Supabase foundation files and UI diagnostics needed now.

Type consistency:

- Repository adapter uses existing domain types and does not change public API route contracts.
