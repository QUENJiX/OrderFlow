# OrderFlow BD - Founder Action Plan

Last updated: 2026-05-24  
Original research pass: 2026-04-29  
Workspace: `C:\Users\User\Documents\Codex\2026-05-23\files-mentioned-by-the-user-ai`
Working product name: OrderFlow BD. Brand is approved as the working launch name; domain selection should use this direction unless availability forces a small variation.

This file is the founder-side action plan. It tells you what to do, what to prepare, and what not to touch yet.

The current app is a local MVP/demo. Do not treat production setup as the main work yet. The main work is getting real sellers to try the manual order-link workflow.

Current launch decision, updated 2026-05-24:

- Manual order-link sharing is now the first validation workflow, not just a fallback.
- The first 30 days should prove that sellers will use order links, COD order capture, and courier-ready export before we wait for Meta approval.
- Facebook automation remains the core future advantage, but Meta App Review should run after manual validation creates enough evidence.
- COD remains the launch payment method.
- Payment gateways and paid marketing are deferred.
- Courier CSV export is the first courier workflow. Steadfast API is the first direct API target after pilot demand is proven.
- Keep a cash buffer; do not spend the full BDT 50,000 immediately.
- Budget refresh, 2026-05-24: first-30-day spend should be BDT 2,500-8,000 if using one or two AI/dev subscriptions, with a hard cap of BDT 10,000.

## Ground Rules

1. Do not commit secrets to GitHub.
2. Do not paste secret keys into public chats, Google Docs, screenshots, or issue trackers.
3. Put secrets into `.env.local` locally or into Vercel/Supabase secret settings when I ask.
4. Use a password manager for all account passwords, database passwords, API keys, and recovery codes.
5. Enable 2FA on GitHub, Vercel, Supabase, Meta, payment, and courier accounts.
6. Use real business information wherever Meta/payment/courier verification is involved. Mismatched names, phone numbers, addresses, and websites are a common real-world cause of rejection.
7. Do not buy tools, domains, paid hosting, payment gateways, or ads just because the plan mentions them. Spend only when a gate below says yes.
8. AI/dev subscriptions are the only tool spend allowed before seller proof. Start with one paid AI/dev subscription unless usage limits are blocking real shipping work.

## Read This First

For the next 30 days, this is the real job:

```text
Find 30 real Facebook sellers.
Talk to at least 15.
Onboard 3-5 shops.
Capture real COD orders through OrderFlow links.
Get 2 sellers willing to pay.
```

Everything else is secondary.

### Your First 48 Hours

Do these before touching Meta, payments, courier APIs, or company documents:

1. Create a CRM sheet.
2. Add 30 Facebook shops.
3. Send 10-15 outreach messages.
4. Ask friends for seller introductions.
5. Prepare the Quick Seller Form.
6. Book at least 3 seller calls.
7. Write down every objection sellers give you.

If this feels uncomfortable, that is normal. This is the real founder work.

### What You Do Now

- Build a CRM sheet of target shops.
- Send seller outreach messages.
- Run short seller interviews.
- Use the Quick Seller Form from `SURVEY_QUESTIONNAIRES_BN.md`.
- Ask sellers to test manual OrderFlow links for 7 days.
- Collect proof: orders captured, time saved, objections, willingness to pay.

### What You Do Later

- GitHub/Supabase/Vercel setup.
- Domain and business email.
- Public legal pages.
- Meta Business and Developer setup.
- Steadfast API request.
- Payment gateway applications.

### What You Do Not Do Yet

- Do not spend on SSLCOMMERZ.
- Do not run paid ads.
- Do not wait for Meta App Review.
- Do not form a company yet.
- Do not build Instagram/WhatsApp/payment/courier integrations before seller demand proves the need.

## Decision Gates

### Gate 0: AI/Dev Subscription

Allowed immediately:

- ChatGPT Plus/Codex or Claude Pro if it directly helps us build, debug, research, and ship.
- ChatGPT Plus/Codex plus Claude Pro only if both are used daily.

Do not buy yet:

- ChatGPT Pro.
- Claude Max.
- Extra API credits.

Budget:

```text
One AI/dev subscription: BDT 2,500/month
Two AI/dev subscriptions: BDT 5,000/month
First-30-day hard cap including outreach: BDT 10,000
```

### Gate 1: Start Technical Setup

Start GitHub/Supabase/Vercel setup only after:

- 10+ seller conversations are done.
- 2+ sellers agree to test manual order links.
- You know their product categories, courier, payment method, and current order workflow.

### Gate 2: Buy Domain And Email

Buy domain/business email only after:

- 3 pilot shops are likely, or
- you need a public link that looks more trustworthy than localhost/Vercel preview.

### Gate 3: Prepare Meta App Review

Start serious Meta App Review work only after:

- 3-5 sellers have tested manual links.
- at least 50 real orders are captured, or sellers clearly say automation is the missing piece.
- 2 sellers say they would pay if automation is added.

### Gate 4: Courier API

Request Steadfast/Pathao/RedX API access only after:

- pilot sellers actually use courier export, and
- manual CSV/copy-paste becomes a repeated bottleneck.

### Gate 5: Payment Gateway

Apply for SSLCOMMERZ/bKash/Nagad gateway only after:

- multiple sellers ask for online payment automation, and
- COD/manual payment tracking is no longer enough.

## Execution Order

Follow this order. Do not use the section numbers below as the work order.

1. Build the seller CRM and contact real shops.
2. Run the shortened seller survey and deep interviews.
3. Recruit 3-5 pilot shops for manual order-link validation.
4. Use one controlled AI/dev subscription to accelerate building and research.
5. Create/prepare GitHub, Supabase, and Vercel when pilots are likely.
6. Prepare a basic domain, business email, and public legal pages when moving from local demo to shareable pilot.
7. Prepare Meta Business + Developer setup after manual validation is positive.
8. Prepare for Meta App Review and likely business verification only when automation is worth unlocking.
9. Prepare Steadfast courier account/API access after courier CSV usage proves the bottleneck.
10. Defer payment gateway accounts unless pilot merchants demand them.
11. Bring me the safe handoff items listed at the end of this file.

## 1. GitHub

When to do this: after Gate 1.

We need GitHub so Vercel can deploy automatically from the code repository.

Steps:

1. Create or use a GitHub account: https://github.com
2. Enable 2FA.
3. Create a private repository named something like `orderflow-bd`.
4. Make sure you are the repository owner.
5. Later, I can help push the code from this local project into that repo.

Bring me:

```text
GitHub account email:
GitHub username:
Repository URL:
Is the repository private? yes/no
```

Important: Vercel requires proper GitHub ownership/permissions to import a repo. Vercel's docs say a personal-account repo must be imported by the repo owner, and organization repos need owner/member access.

Source: [Vercel GitHub deployment docs](https://vercel.com/docs/git/vercel-for-github)

## 2. Supabase

When to do this: after Gate 1, or when real pilot data needs persistence.

Supabase will become our production database, auth system, and storage layer.

Steps:

1. Create a Supabase account: https://supabase.com
2. Create a new organization if needed.
3. Create a new project named `orderflow-bd`.
4. Choose the nearest stable region available to Bangladesh. Usually Singapore or India/Mumbai is preferable if offered.
5. Save the database password in your password manager.
6. Wait until the project finishes provisioning.
7. Go to Project Settings -> API Keys.
8. Copy the project URL.
9. Copy the publishable key if available. Supabase now recommends `sb_publishable_...` keys over older JWT `anon` keys.
10. Copy a secret key if available. Supabase now recommends `sb_secret_...` keys over older JWT `service_role` keys.
11. If your dashboard only shows legacy keys, copy the `anon` key and `service_role` key too.

Bring me:

```text
Supabase project name:
Supabase project ref:
Supabase region:
Supabase project URL:
Supabase publishable key or anon key:
Supabase secret key or service_role key:
Database password saved? yes/no
```

Security note:

- The publishable/anon key can exist in frontend code, but the secret/service_role key must never be exposed in the browser.
- Supabase says secret keys bypass Row Level Security and should not be sent over chat/email/SMS or stored in source control.
- For the next coding phase, if possible, we should use the new `sb_publishable_...` and `sb_secret_...` keys. If your project only exposes legacy keys, we can start with those and migrate later.

Sources:

- [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys)
- [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)

## 3. Supabase Auth Settings

When to do this: after Supabase exists and you are preparing a shareable pilot.

We will add real login for merchants/admins.

Steps:

1. In Supabase, go to Authentication -> URL Configuration.
2. For local development, add:

```text
http://localhost:3000/**
http://127.0.0.1:3000/**
```

3. After Vercel deployment, add the production domain:

```text
https://your-domain.com/**
```

4. Add Vercel preview URL pattern once we know your Vercel team/account slug:

```text
https://*-<your-vercel-team-or-account-slug>.vercel.app/**
```

5. Keep email/password auth enabled for the first version.
6. Do not enable public self-signup for random users until we add invite/onboarding rules.

Bring me:

```text
Supabase Auth Site URL currently set to:
Additional Redirect URLs added? yes/no
Do you want invite-only merchant signup first? yes/no
```

Source: [Supabase redirect URL docs](https://supabase.com/docs/guides/auth/redirect-urls)

## 4. Vercel

When to do this: after Gate 1, when pilot sellers need to use the app outside your laptop.

Vercel will host the Next.js app.

Steps:

1. Create a Vercel account: https://vercel.com
2. Connect GitHub to Vercel.
3. Do not deploy production yet unless we are doing it together.
4. Create or reserve a project name like `orderflow-bd`.
5. Once we push to GitHub, import the GitHub repo into Vercel.
6. Prepare to add environment variables in Vercel for Production, Preview, and Development.

Bring me:

```text
Vercel account email:
Vercel username/team slug:
Project name reserved:
GitHub connected? yes/no
Custom domain planned? yes/no
Custom domain:
```

Environment variables we will eventually add:

```text
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=          # or publishable key, depending on final code naming
SUPABASE_SERVICE_ROLE_KEY=              # or secret key, server-only
META_APP_ID=
META_APP_SECRET=
META_VERIFY_TOKEN=
META_WEBHOOK_SECRET=
SSLCOMMERZ_STORE_ID=
SSLCOMMERZ_STORE_PASSWORD=
BKASH_APP_KEY=
BKASH_APP_SECRET=
BKASH_USERNAME=
BKASH_PASSWORD=
PATHAO_CLIENT_ID=
PATHAO_CLIENT_SECRET=
STEADFAST_API_KEY=
STEADFAST_SECRET_KEY=
REDX_API_KEY=
```

Important:

- Vercel environment variables apply separately to Production, Preview, and Development.
- A change to a Vercel environment variable only applies to new deployments.
- Next.js frontend-visible variables need the `NEXT_PUBLIC_` prefix.

Sources:

- [Vercel environment variables](https://vercel.com/docs/environment-variables)
- [Vercel framework environment variables](https://vercel.com/docs/environment-variables/framework-environment-variables)

## 5. Domain, Website, and Legal Pages

When to do this: after Gate 2.

This matters for Meta App Review, business trust, payment onboarding, and merchant confidence.

Steps:

1. Buy or choose a domain. Example:

```text
orderflowbd.com
orderflow.com.bd
orderflowbd.app
```

2. Set up a business email on that domain. Example:

```text
support@orderflowbd.com
admin@orderflowbd.com
legal@orderflowbd.com
```

3. Prepare these public pages before Meta App Review:

```text
/privacy
/terms
/data-deletion
/refund-policy
/contact
```

4. The privacy policy URL must be public, HTTPS, not behind login, and not a Google Doc/Facebook post/private page.
5. Put the legal business name, business address, and contact email on the site footer or contact page.

Bring me:

```text
Domain:
Business email:
Privacy Policy URL:
Terms URL:
Data Deletion URL:
Contact email:
Support phone:
Legal business name to show publicly:
```

If you do not have a registered company yet, we can still deploy a pilot, but Meta/payment/courier approvals may be harder or slower.

## 6. Business Identity Documents

When to do this: later. Prepare information mentally now, but do not spend on documents until Meta, courier, payment, or a serious partner asks for them.

For Meta, payment gateways, and courier merchant accounts, prepare documents that match exactly.

Do not spend on all documents immediately. For the BDT 50,000 plan, reserve money for trade license/basic documents and spend it only when we are close to Meta App Review, Steadfast merchant verification, or another provider explicitly asks for it.

Prepare:

```text
Legal business name:
Trade name / brand name:
Owner/director name:
Business address:
Business phone:
Business email:
Website:
Trade license / registration certificate:
TIN/eTIN:
BIN/VAT certificate, if applicable:
Business bank account details:
Bank statement or official document showing business name/address:
Utility bill or address proof, if available:
Owner/director NID/passport:
```

Real-world warning:

- If the Meta Business name says one thing, the trade license says another, and the website says a third thing, verification can fail.
- Use the same spelling, punctuation, phone number, and address everywhere.

Budget rule:

- Expected practical trade license/basic document reserve: BDT 10,000-15,000.
- Do not form a private limited company yet unless a provider or partner forces it.
- Keep the rest of the BDT 50,000 as runway for AI/dev subscriptions, hosting, review, courier testing, and emergencies.
- Do not let first-30-day cash spend cross BDT 10,000 unless a real pilot shop is blocked by something specific.

## 7. Meta Business Setup

When to do this: after Gate 3, or lightly earlier if setup is free and does not distract from seller validation.

Meta is the hardest external dependency. We need to prepare carefully.

Steps:

1. Use a real personal Facebook account in good standing.
2. Enable 2FA on the Facebook account.
3. Create or access a Meta Business Portfolio / Business Manager:

```text
https://business.facebook.com/settings/
```

4. Add your business details exactly as shown on documents.
5. Add your Facebook Page to the business portfolio.
6. Add your domain to the business portfolio if Meta offers domain verification.
7. Add your business email and phone.
8. Start business verification from Business Settings -> Security Center if the option is available.
9. If the verification button is not available yet, continue with Developer App setup first; Meta sometimes unlocks verification after an app requests access.

Bring me:

```text
Meta Business Portfolio name:
Meta Business ID:
Facebook Page URL:
Facebook Page ID:
Admin Facebook account email:
Business verification status: not started / in review / verified / rejected
Domain verified in Meta? yes/no
```

Official Meta pages can require login and may block automated readers, so verify current labels inside your own Meta dashboard.

Useful official entry points:

- [Meta Business Settings](https://business.facebook.com/settings/)
- [Meta for Developers](https://developers.facebook.com/)
- [Meta Business Help Center](https://www.facebook.com/business/help)

## 8. Meta Developer App

When to do this: after Gate 3.

This is needed for Facebook Page connection, webhooks, and compliant automation.

Steps:

1. Go to https://developers.facebook.com/
2. Create a new app.
3. Use a business/app type suitable for business integrations if Meta asks.
4. Connect the app to your Meta Business Portfolio.
5. Add the app name `OrderFlow BD`. Update it before review only if domain or brand availability forces a change.
6. Add app contact email.
7. Add privacy policy URL.
8. Add terms URL if requested.
9. Add user data deletion instructions/callback URL.
10. Add the Messenger product and/or relevant Facebook Login/Page products when we reach integration.
11. Save the App ID and App Secret.

Bring me:

```text
Meta App ID:
Meta App Secret saved? yes/no
Meta app mode: development/live
App connected to Business Portfolio? yes/no
Privacy Policy URL added? yes/no
Data Deletion URL added? yes/no
```

Likely permissions/use cases we will prepare for:

```text
pages_show_list
pages_read_engagement
pages_manage_metadata
pages_manage_engagement
pages_messaging
```

We will verify the exact permission set inside the current Meta dashboard during implementation, because Meta permission names and review requirements can change.

What Meta App Review will likely need:

1. Working production/staging URL.
2. Login credentials for reviewer if the dashboard is protected.
3. Test Facebook Page connected to the app.
4. Clear screencast showing the exact feature using the requested permissions.
5. Explanation of why each permission is necessary.
6. Public privacy policy and data deletion page.
7. Business verification, if Meta requires it for advanced access.

App Review anti-rejection checklist:

1. Use one reviewer Facebook account and make sure it has access to the exact test Page.
2. Use the same reviewer merchant login in the app, screencast, and submission notes.
3. Record a fresh screencast for each submission.
4. Show the full flow: app login -> Meta permission screen -> Page connection -> test comment/message -> dashboard event -> reply/order link -> test order.
5. Do not skip the permission screen.
6. Do not use placeholder Page names, fake product names, or "imagine this works" narration.
7. Test from a clean browser or external network before submitting.
8. Make sure Page messaging is enabled if requesting messaging permissions.
9. Make sure the app gives a fallback response to unexpected/random messages.
10. Make sure privacy policy and data deletion URLs are public, direct, and match the URLs in Meta settings.

Important:

- We will not use scraping, browser automation, fake accounts, or unofficial Messenger automation.
- Expect App Review to take time and possibly require resubmission.
- Use `META_APP_REVIEW_READINESS.md` as the final checklist before any Meta submission.

## 9. Meta Webhook Details

When to do this: after Meta Developer setup and deployment are ready.

After Vercel deployment, we will configure Meta webhooks.

You do not need to do this alone yet, but prepare for:

```text
Callback URL:
https://your-domain.com/api/meta/webhook

Verify token:
I will generate this with you; save it as META_VERIFY_TOKEN.

Webhook secret / app secret:
Used to validate x-hub-signature-256.
```

Bring me when ready:

```text
Final app URL/domain:
Meta App ID:
Meta App Secret:
Facebook Page ID:
Page admin account ready for testing? yes/no
```

## 10. Payment Setup

When to do this: after Gate 5. For now, COD and manual bKash/Nagad tracking are enough.

For the pilot, we can use COD and manual bKash/Nagad tracking. For production checkout automation, prepare one gateway first.

Updated launch rule:

- COD is enough for launch.
- Payment gateways are not required for the manual validation pilot.
- Do not pay SSLCOMMERZ/bKash/Nagad setup costs until real merchants repeatedly ask for online payment automation.

Recommended first gateway: SSLCOMMERZ, because it can handle multiple Bangladeshi payment methods behind one integration.

### SSLCOMMERZ

Steps:

1. Create a sandbox account from the SSLCOMMERZ developer site.
2. Apply for production merchant account when ready.
3. Ask for:

```text
Store ID
Store password
Sandbox credentials
Production credentials
IPN setup access
Settlement/bank account setup
```

4. We will configure an IPN URL later:

```text
https://your-domain.com/api/payments/sslcommerz/ipn
```

Source: [SSLCOMMERZ Developer Arena](https://developer.sslcommerz.com/)

### bKash PGW

Steps:

1. Contact bKash for merchant/payment gateway access.
2. Ask specifically for PGW/tokenized checkout credentials.
3. Prepare merchant documents and business bank details.
4. Ask for sandbox and production credentials.

Bring me:

```text
bKash merchant number:
bKash PGW app key:
bKash PGW app secret:
bKash username:
bKash password:
Sandbox or production:
```

Source: [bKash PGW Tokenized Checkout terms](https://www.bkash.com/en/page/tokenized_checkout)

### Nagad

Steps:

1. Contact Nagad merchant/e-commerce payment gateway support.
2. Ask for merchant API / checkout API access.
3. Ask for sandbox, production, callback/IPN documentation, and settlement process.

Bring me:

```text
Nagad merchant ID:
Nagad API credentials:
Sandbox or production:
Nagad integration documentation/contact:
```

Important:

- For real production, avoid relying on personal "Send Money" as the main business payment flow.
- Manual bKash/Nagad is acceptable for early pilot validation, but real payment automation should use merchant/gateway accounts.

## 11. Courier Setup

When to do this: after Gate 4. For now, use CSV export and manual tracking entry.

The pilot can start with CSV export. Direct API booking comes after merchant/API access.

### Pathao Courier

Steps:

1. Register as a Pathao Courier merchant.
2. Provide business name, owner name, mobile number, and email.
3. Complete store and payment information inside the merchant panel.
4. Ask Pathao support/account manager for API access if available for your merchant account.

Bring me:

```text
Pathao merchant account created? yes/no
Pathao merchant/store ID:
Pickup address:
Pickup contact name:
Pickup contact phone:
API client ID:
API client secret:
API docs/contact person:
```

Source: [Pathao Courier merchant information](https://pathao.com/courier/)

### Steadfast Courier

Steps:

1. Register at Steadfast.
2. Complete merchant verification.
3. Confirm COD settings, pickup address, billing rules, and return handling.
4. Ask for API credentials/documentation.

Bring me:

```text
Steadfast merchant account created? yes/no
Steadfast merchant ID:
Pickup address:
API key:
Secret key:
API docs/contact person:
```

Source: [Steadfast terms and merchant registration details](https://www.steadfast.com.bd/terms-and-condition-in-bangla)

### RedX

Steps:

1. Create RedX merchant account if you want RedX in V1.
2. Complete merchant verification and COD/payout setup.
3. Ask support for API credentials and documentation.

Bring me:

```text
RedX merchant account created? yes/no
RedX merchant ID:
API key:
API docs/contact person:
```

## 12. Pilot Merchant Data

This is the most important section in the document. Before production coding finishes, collect 5-20 real pilot shops. We should not build blindly.

For each pilot shop, collect:

```text
Shop name:
Owner name:
Owner phone:
Owner email:
Facebook Page URL:
Facebook Page ID, if known:
Monthly order volume:
Average order value:
Main product categories:
Current payment methods:
Current courier:
Top 20 repeated comment questions:
Top 20 products:
Return/cancellation pain points:
Willingness to pay monthly fee:
```

Recommended pilot criteria:

- Facebook-first seller.
- At least 30-50 orders/month.
- Comments regularly include price/details questions.
- Owner is willing to manually send OrderFlow links to real customers for 7 days.
- Merchant accepts COD and/or bKash/Nagad.

Avoid for first pilot:

- Shops with no real order flow.
- Shops that only want a free chatbot.
- Shops selling restricted/high-risk products.
- Shops with messy ownership of Facebook Page/admin access.

## 13. Policies We Need to Publish

Prepare simple first versions:

1. Privacy Policy.
2. Terms of Service.
3. Data Deletion Instructions.
4. Merchant Agreement.
5. Refund/Return/Cancellation Policy.
6. Payment Terms.
7. Courier/Delivery Disclaimer.

Minimum privacy policy topics:

- What merchant/customer data we collect.
- Why we collect it.
- How we use Facebook Page/comment/message data.
- How long we retain order/customer data.
- Who can access the data.
- How users can request deletion.
- Contact email.

Minimum data deletion page:

- Email address for deletion requests.
- What information the requester must provide.
- Expected response time.
- What data may need to be retained for legal/accounting/fraud reasons.

## 14. What to Bring Me Before Next Coding Phase

Before the full production coding phase, bring pilot evidence first. This is more important than API keys.

```text
Seller CRM created: yes/no
Sellers contacted:
Seller calls completed:
Pilot shops verbally interested:
Pilot shops ready to manually send order links:
Top courier providers found:
Top 5 repeated seller questions/pains:
Willingness to pay signal:
```

Then fill in the technical/account handoff below.

Fill this in and bring it back:

```text
GitHub
- GitHub username:
- Repo URL:

Supabase
- Project URL:
- Project ref:
- Publishable key or anon key:
- Secret key or service_role key:
- Region:
- DB password saved in password manager: yes/no

Vercel
- Account/team slug:
- Project name:
- GitHub connected: yes/no
- Custom domain:

Domain/Legal
- Domain:
- Business email:
- Legal business name:
- Privacy Policy URL:
- Terms URL:
- Data Deletion URL:

Meta
- Meta Business ID:
- Facebook Page URL:
- Facebook Page ID:
- Meta App ID:
- Meta App Secret saved: yes/no
- Business verification status:

Payments
- SSLCOMMERZ sandbox: yes/no
- SSLCOMMERZ production: yes/no
- bKash merchant/PGW: yes/no
- Nagad merchant/API: yes/no

Courier
- Pathao merchant: yes/no
- Steadfast merchant: yes/no
- RedX merchant: yes/no

Pilot Shops
- Number of shops recruited:
- First shop ready for testing:
```

## 15. What I Will Do After You Bring These

Once you bring the Supabase/Vercel/GitHub basics, I will:

1. Commit/checkpoint the current MVP.
2. Push or guide pushing to GitHub.
3. Replace the in-memory demo store with Supabase.
4. Add real auth and tenant-safe data access.
5. Add product/order/automation CRUD.
6. Add admin invite/onboarding flows.
7. Deploy staging to Vercel.
8. Add public legal pages.
9. Configure production environment variables.
10. Add Meta OAuth/webhook integration.
11. Build reviewer-reproducible automation flow.
12. Prepare App Review test flows and screenshots/screencast checklist.
13. Add Steadfast integration when credentials are available, keeping CSV fallback.

## Sources Checked

- [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys)
- [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase Auth redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls)
- [Vercel environment variables](https://vercel.com/docs/environment-variables)
- [Vercel GitHub deployments](https://vercel.com/docs/git/vercel-for-github)
- [Vercel framework env variables](https://vercel.com/docs/environment-variables/framework-environment-variables)
- [SSLCOMMERZ Developer Arena](https://developer.sslcommerz.com/)
- [bKash PGW Tokenized Checkout terms](https://www.bkash.com/en/page/tokenized_checkout)
- [Pathao Courier](https://pathao.com/courier/)
- [Steadfast Courier terms](https://www.steadfast.com.bd/terms-and-condition-in-bangla)
- [Meta for Developers](https://developers.facebook.com/)
- [Meta Business Settings](https://business.facebook.com/settings/)
- [Meta Business Help Center](https://www.facebook.com/business/help)
