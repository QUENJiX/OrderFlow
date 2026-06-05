# Meta App Review Readiness Plan

Last updated: 2026-05-24  
Purpose: prevent avoidable Meta App Review rejections before we submit the app. Working name is OrderFlow BD.

This checklist is based on the Reddit App Review failure patterns the founder shared, plus our current project state. The key lesson is simple: Meta reviewers do not debug or infer. They must be able to reproduce the exact permission flow quickly, visually, and with the same test account/page described in the submission.

## 1. Current Verdict

Our product strategy is compatible with Meta App Review, but the current implementation is not yet ready for submission.

Current status:

- Good: official-API-only strategy.
- Good: hosted order-link fallback exists.
- Good: webhook verification route exists.
- Good: webhook signature validation code exists.
- Good: Meta test simulator exists.
- Gap: real Meta OAuth is not implemented.
- Gap: Page token exchange/storage is not implemented.
- Gap: reviewer login/test account flow is not implemented.
- Gap: public legal pages are not implemented in code yet.
- Gap: live permission usage cannot yet be visually demonstrated.
- Gap: fallback bot reply for every unexpected message is not implemented.
- Gap: App Review screencast script and notes are not prepared.

Bottom line:

> Do not submit for Meta App Review until the reviewer can log in, grant permissions, connect a real test Page, trigger a real comment/message, see the app respond, and see the result in our dashboard.

Launch implication:

> Meta App Review is not a blocker for customer validation. Manual order links are the first pilot path. Meta App Review becomes necessary when we upgrade the validated workflow into Facebook comment/inbox automation.

Business verification assumption:

- Meta business verification is not always required at the first dashboard click, but for advanced access and real merchant Page automation we should assume it may be required.
- Prepare for business verification before submission: matching domain, business email, public legal pages, business address/phone, and likely a Bangladesh trade license or equivalent legal document.
- Keep a trade-license/document reserve, but do not spend it until the app is close to review or Meta/provider prompts for it.

## 2. Reddit Rejection Pattern Matrix

| Reddit rejection pattern | Risk for us | Current state | Required fix before submission |
|---|---|---|---|
| Unable to verify use case experience in app | High | Plan mentions App Review, but no reproducible reviewer flow yet | Create one exact reviewer path: login -> Meta permission grant -> Page connection -> comment test -> dashboard event/order result |
| Fails generic screencast check | Medium-high | No screencast plan yet | Record a fresh video for each submission using the live app, real test Page, and real dashboard |
| Unable to approve permission request | High | We cannot visually prove `pages_messaging` or Page permissions yet | Show each requested permission being used onscreen; request only permissions used in the video |
| Broken Facebook Login | High | OAuth not implemented yet | Test OAuth from clean browser/external network with reviewer credentials before submitting |
| Bot stopped responding/messaging turned off | Medium-high | Current webhook ignores unmatched messages/comments | Add fallback reply and test random user messages; verify Page messaging is enabled |
| Privacy policy/verification issues | High | Docs say we need pages, but app has no public legal routes yet | Add public `/privacy`, `/terms`, `/data-deletion`, `/contact`; match URLs in Meta app settings |

## 3. Permission Strategy

Request the minimum permissions needed for the first App Review submission.

Likely first submission:

```text
pages_show_list
pages_read_engagement
pages_manage_metadata
pages_manage_engagement
pages_messaging
```

Do not request Instagram, WhatsApp, Ads, or advanced analytics permissions in the first Meta review unless the live product visibly uses them.

For each permission, prepare:

```text
Permission:
Why needed:
Where reviewer sees it in UI:
Exact screencast timestamp:
Exact test account/page used:
Expected result:
Fallback behavior:
```

## 4. Reviewer Test Setup

Before submission, create and verify one consistent review setup.

Required assets:

```text
Reviewer merchant login email:
Reviewer merchant login password:
Meta test/reviewer Facebook account:
Facebook Page assigned to that account:
Page ID:
Page name:
Meta app role assigned:
Business/Page permissions assigned:
Test product name:
Test comment text:
Expected automated reply:
Expected dashboard event:
Expected order link:
```

Rules:

- Use the same test user in the app, Meta dashboard, screencast, and submission notes.
- Make sure the test user can see and manage the Facebook Page.
- Do not rely on the founder's own account for the reviewer flow.
- Test from a clean browser profile or incognito window.
- Test from an external network before submission.

## 5. Required App Behavior Before Review

### Facebook Login / OAuth

The reviewer must be able to:

1. Open our app URL.
2. Log in with provided merchant credentials.
3. Click "Connect Facebook Page".
4. See Meta permission dialog.
5. Grant requested permissions.
6. Return to our app successfully.
7. Select or confirm the connected Page.

Failure conditions we must prevent:

- Redirect URI mismatch.
- App stuck in development mode without reviewer access.
- Reviewer account lacks Page access.
- OAuth error not shown clearly.
- App URL fails or loads slowly.

### Webhook and Reply Flow

The reviewer must be able to see:

1. A real comment/message is sent to the connected Page.
2. Our webhook receives the event.
3. The app logs the event.
4. The app sends a public/private reply where allowed.
5. The dashboard shows the automation result.
6. The reply contains a real order link.
7. The order link opens and works.

### Fallback Reply

If the user sends an unknown message, the bot should not go silent.

Fallback example:

```text
Thanks for your message. A team member will reply soon. You can also view available products here: {shop_order_link}
```

This matters because reviewers may send random input.

## 6. Screencast Requirements

Record a fresh screencast for every submission.

Minimum video flow:

1. Start from logged-out app state.
2. Log in as reviewer merchant.
3. Click Facebook Page connection.
4. Show Meta permission screen.
5. Grant permissions.
6. Return to app and show connected Page name.
7. Open or show the real Facebook Page.
8. Post a real test comment/message.
9. Show our dashboard receiving/logging the event.
10. Show the automated reply/message result.
11. Click the order link.
12. Submit a test order.
13. Show the order in our dashboard.

Video rules:

- Use the live deployed app, not local development.
- Use real Page names and real test product names.
- No placeholder text like "imagine this works."
- No reused old video.
- No skipped permission screen.
- Narration or captions should explain what permission is being demonstrated.
- Keep it concise but complete.

## 7. Submission Notes Template

Use this style when submitting:

```text
App purpose:
OrderFlow BD helps Facebook Page merchants respond to customer price/detail inquiries, send order links, and track resulting COD orders and courier-ready shipments.

Reviewer credentials:
URL:
Email:
Password:

Facebook test account:
Name/email:
Page assigned:
Page ID:

Steps to reproduce:
1. Log in to the app using the reviewer credentials.
2. Go to Settings -> Facebook Connection.
3. Click Connect Facebook Page.
4. Approve the requested permissions.
5. Confirm the connected Page shown in the app.
6. On the Facebook Page, post the test comment: "price dam kurti please".
7. Return to the app dashboard and open Webhook Events.
8. Confirm the event is logged and an order link reply is generated.
9. Open the generated order link and submit a test order.
10. Go to Orders and confirm the order appears.

Permission usage:
- pages_show_list: lets the merchant select Pages they manage.
- pages_read_engagement: reads Page comment events needed to detect customer inquiries.
- pages_manage_metadata: subscribes the Page to webhook events.
- pages_manage_engagement: allows compliant Page replies to customer comments.
- pages_messaging: allows compliant messaging flows where approved.

Privacy policy:
Direct public URL:

Data deletion:
Direct public URL:
```

## 8. Public Legal Page Requirements

Before review, the app must expose:

```text
/privacy
/terms
/data-deletion
/contact
```

The privacy policy must:

- Be public and direct.
- Not redirect to the homepage.
- Not require login.
- Mention the exact app/business name.
- Explain Facebook Page/comment/message data usage.
- Explain order/customer data usage.
- Explain retention and deletion.
- Provide contact email.

The data deletion page must:

- Be public and direct.
- Explain how a user/merchant requests deletion.
- Provide email/contact method.
- Explain expected processing time.
- Mention exceptions for legal/accounting/fraud records.

## 9. Engineering Tasks To Add Before Review

Add these to the production roadmap:

1. Public legal routes: `/privacy`, `/terms`, `/data-deletion`, `/contact`.
2. Meta OAuth route and callback.
3. Secure Page token storage.
4. Facebook Page selection UI.
5. Webhook subscription management.
6. Event log UI with raw provider status and replay/debug state.
7. Fallback reply for unmatched/random messages.
8. Reviewer demo mode with stable test product, Page, and order flow.
9. App Review checklist page for internal admin.
10. Health checks for OAuth callback, webhook callback, and public legal routes.

## 10. Pre-Submission Checklist

Do not submit unless every item is true:

```text
[ ] Production app URL loads from a clean browser.
[ ] Reviewer merchant credentials work.
[ ] Reviewer Facebook account has Page access.
[ ] Meta app is configured with correct URLs.
[ ] Privacy Policy URL is direct and public.
[ ] Data Deletion URL is direct and public.
[ ] OAuth redirect works.
[ ] Permission screen appears in the real flow.
[ ] Page connection succeeds.
[ ] Webhook callback verifies successfully in Meta dashboard.
[ ] Webhook signature validation is enabled in production.
[ ] Test comment/message produces a visible dashboard event.
[ ] Requested permission usage is visually shown.
[ ] Bot/fallback responds to random input.
[ ] Screencast is fresh and matches submission notes.
[ ] Submission notes match the app exactly.
[ ] No placeholder/mocked-only behavior is shown.
```

## 11. Current Code-Level Notes

Current good points:

- `src/app/api/meta/webhook/route.ts` verifies Meta webhook challenge.
- `src/app/api/meta/webhook/route.ts` validates `x-hub-signature-256` when `META_WEBHOOK_SECRET` is configured.
- `src/app/api/meta/test/route.ts` can simulate a feed/comment event.
- `src/lib/meta.ts` records webhook events and runs keyword matching.
- `src/lib/providers/messaging.ts` uses a provider adapter boundary.

Current risks:

- Signature validation currently allows requests through if `META_WEBHOOK_SECRET` is missing. This is acceptable for local demo but must be blocked or loudly failed in production.
- The messaging provider does not yet send real Meta API calls.
- The adapter returns failure when Meta credentials are configured because Page token exchange is not implemented.
- Unmatched comments/messages are ignored instead of receiving a fallback response.
- There is no real Facebook Login flow.
- There is no reviewer-facing connected Page UI.

## 12. Decision

The Reddit post does not invalidate our plan. It makes our plan stricter.

The corrected plan is:

1. Validate the manual order-link workflow with real sellers first.
2. Build production SaaS foundation when pilots justify it.
3. Add public legal pages before Meta submission.
4. Add real Meta OAuth and Page connection.
5. Build a reviewer-reproducible end-to-end demo path.
6. Only request permissions that are visibly used.
7. Record a fresh screencast that exactly matches submission notes.
8. Submit after the flow works from a clean reviewer account.

This should reduce the risk of repeated App Review rejection loops.
