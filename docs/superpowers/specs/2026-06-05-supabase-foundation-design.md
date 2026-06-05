# OrderFlow BD Supabase Foundation Design

Date: 2026-06-05

## Goal

Move OrderFlow BD from local-only MVP toward a production SaaS foundation without breaking the current pilot workflow. The app should keep working with in-memory data when Supabase credentials are missing, and switch to a Supabase-ready mode when env vars are present.

## Scope

This phase adds:

- Git checkpointing for the current MVP.
- Supabase dependency setup.
- Environment validation and mode selection.
- SQL schema for shops, shop members, products, orders, reply templates, webhook events, and billing records.
- RLS-ready tenant boundaries based on authenticated shop membership.
- Server and browser Supabase clients.
- A repository factory that chooses local or Supabase mode.
- A Supabase repository adapter with read/write methods matching the current repository interface.
- Auth pages for login and callback plumbing.
- Settings/status UI that explains whether the app is running in local mode or Supabase mode.
- Seed SQL for the current demo shop and products.

This phase does not require live Supabase credentials to keep local development working. If credentials are provided later, the same code path can be tested against the real project.

Out of scope:

- Meta OAuth.
- Payment gateway callbacks.
- Courier API booking.
- Complex role management beyond owner/admin/operator membership.
- Public self-signup.
- Billing automation.

## Architecture

Keep the existing repository interface as the app boundary. Add:

- `src/lib/config/env.ts`: validates app and Supabase env vars and computes runtime mode.
- `src/lib/supabase/server.ts`: server-side Supabase client using cookies.
- `src/lib/supabase/browser.ts`: browser-side Supabase client for login forms.
- `src/lib/store/supabase-store.ts`: Supabase implementation of `OrderFlowRepository`.
- `src/lib/store/index.ts`: selects Supabase repository only when usable env vars are configured.
- `supabase/schema.sql`: production schema, indexes, triggers, and RLS policies.
- `supabase/seed.sql`: demo shop/product/template seed data.

The local store remains the default when Supabase env vars are not configured. This protects demo work and keeps verification possible in this workspace.

## Database Model

Tables:

- `shops`
- `shop_members`
- `products`
- `orders`
- `reply_templates`
- `webhook_events`
- `billing_records`

RLS policy principle:

- Users can access a shop only when `auth.uid()` is listed in `shop_members.user_id`.
- `service_role` server contexts may perform administrative operations through Supabase service credentials later, but service keys must never be exposed to browser code.
- Public order creation needs a controlled path. For this phase, app route handlers use server-side repository calls and can insert orders for active product links. The public browser never talks directly to Supabase tables.

Indexes:

- Slugs for lookup.
- Shop-scoped product/order filters.
- Created-at indexes for recent order/event screens.
- Status indexes for courier/order queues.

## Auth Flow

Add login routes:

- `/login`: email password form and local-mode notice.
- `/auth/callback`: placeholder callback page for Supabase auth redirect.

When Supabase env vars are configured, the login form can call Supabase Auth. When not configured, the page explains local mode and links back to the dashboard.

Invite-only merchant onboarding remains the intended production policy. This phase prepares the code path but does not open public signup.

## Testing

Add tests for:

- Runtime mode detection from env-like objects.
- Supabase repository mapping between DB rows and domain types.
- Repository factory fallback behavior when Supabase config is missing.

Existing domain/store tests must keep passing. Final verification must run:

- `npm test`
- `npm run lint`
- `npm run build`
- `npm audit`

Browser smoke should verify dashboard/settings/login render in local mode.

## Acceptance Criteria

- Git has a clean initial MVP checkpoint.
- Supabase schema and seed files exist.
- App still works locally with no Supabase env vars.
- Settings page clearly shows local vs Supabase readiness.
- Login page exists and does not imply production auth is active when env vars are missing.
- Repository factory keeps current local behavior by default.
- Supabase repository adapter compiles and has tested row mapping.
- No secrets are committed.
- Tests, lint, build, and audit pass.
