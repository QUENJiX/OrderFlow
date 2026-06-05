# 30-Day Launch Guide: OrderFlow BD

Prepared for: Hasib, 2nd-year CS student at North South University, Dhaka  
Start date: Sunday, May 24, 2026  
End date: Monday, June 22, 2026  
Working product name: OrderFlow BD  
Category: Bangladesh F-commerce / social commerce operations  
Initial wedge: Facebook-first sellers, starting with fashion and beauty shops  

---

## 0. The Point Of This 30-Day Sprint

OrderFlow BD should not start as a giant commerce platform.

It should start as a brutally simple question:

> Can we help real Facebook-first sellers capture more orders and reduce manual order/courier work enough that they will pay?

The first 30 days are not about becoming Shopify, ManyChat, Meta Business Suite, a courier company, or a payment gateway.

The first 30 days are about proving one workflow:

> Facebook inquiry -> order link -> COD order -> merchant dashboard -> courier-ready export.

Meta automation is important later, but it must not block validation.

The rule:

> Validate the workflow manually before depending on Meta App Review.

---

## Relationship To Existing Planning Docs

This guide supersedes the older Meta-first launch sequence in `SAAS_MASTER_PLAN.md`, `USER_ACTION_PLAN.md`, and `INVESTMENT_AND_MARKETING_PLAN.md` for the first 30 days only.

Use those files as production, budget, and Meta readiness references. Use this guide as the day-by-day execution plan until manual seller validation is complete.

The key sequencing rule is:

> Manual order-link validation first. Meta automation second.

Budget update from `INVESTMENT_AND_MARKETING_PLAN.md`, refreshed 2026-05-24:

- First-30-day spend should be BDT 2,500-8,000 if we use one or two AI/dev subscriptions.
- Hard cap for the first 30 days: BDT 10,000.
- Start with ChatGPT Plus/Codex or Claude Pro; use both only if both are helping daily.
- Do not buy ChatGPT Pro, Claude Max, SSLCOMMERZ, Vercel Pro, Supabase Pro, paid ads, or company setup before seller proof.
- Upgrade hosting/backend only after 3 active pilots or 50 real orders.

---

## 1. Strategic Context

You are researching multiple genuine ideas:

- Portflow AI: customs/document automation.
- Export Compliance OS: compliance packets and evidence workflows for RMG exporters.
- OrderFlow BD: F-commerce order workflow for Facebook sellers.

All three solve real pain. But a founder cannot execute three day-one products at once.

For the next 30 days, OrderFlow BD should be the active execution wedge because:

- You can reach sellers quickly.
- You can demo quickly.
- You can get real orders quickly.
- You can potentially earn first SaaS/service revenue.
- You can learn sales, onboarding, support, pricing, and retention.
- You can fund domains, hosting, database, and AI subscriptions from early customers.

This does not mean Export Compliance OS is abandoned. It means OrderFlow is the fastest training ground and cashflow wedge.

Recommended time split for the next 30 days:

- 85% OrderFlow execution.
- 10% Export Compliance research calls.
- 5% idea notes and market tracking.

Do not build Portflow or Export Compliance during this 30-day sprint unless a serious customer appears with documents and budget.

---

## 2. Market Research Snapshot

### 2.1 Bangladesh F-commerce is a real behavior, not a theory

Bangladeshi consumers already discover, ask about, and buy products through Facebook, Messenger, Instagram, WhatsApp, and other social channels.

Useful source:

- DHL Bangladesh describes Facebook commerce as a meaningful selling channel in Bangladesh and explains how businesses use Facebook Marketplace, Pages, and social interaction to reach buyers. Source: [DHL - How Facebook Commerce Works in Bangladesh](https://www.dhl.com/discover/en-bd/small-business-advice/starting-a-business/how-facebook-commerce-works-bangladesh)

Practical implication:

You do not need to convince merchants to sell on Facebook. They already do. You need to convince them that a light order workflow is better than messy manual inbox handling.

### 2.2 Delivery expectations create operational pressure

Bangladesh's Digital Commerce Operational Guidelines 2021 shaped expectations around delivery timing and transparency.

Useful sources:

- The Business Standard reported that the finalized guidelines set expectations for delivery within 5 days for same-city delivery and up to 10 days for different-city delivery. Source: [TBS - E-commerce guidelines finalised keeping 5-day delivery time](https://www.tbsnews.net/economy/e-commerce-have-deliver-products-within-5-days-commerce-ministry-268369)
- Daily Star's overview explains that the Guidelines were issued on July 4, 2021 to support transparency, accountability, consumer rights, and trust in digital commerce. Source: [Daily Star - Overview of Digital Commerce Operational Guidelines 2021](https://online.thedailystar.net/law-our-rights/news/overview-the-digital-commerce-operational-guidelines-2021-2128871)

Practical implication:

OrderFlow can use SLA/delivery-risk tracking as a useful later feature, but it should not be the first pitch. First pitch is order capture and courier readiness.

### 2.3 Courier infrastructure already supports e-commerce sellers

Bangladesh has courier providers serving e-commerce and social commerce merchants.

Useful examples:

- Steadfast's merchant portal positions itself around e-commerce delivery, warehousing, packaging, and merchant logistics. Source: [Steadfast merchant portal](https://merchant.packzy.com/)
- Pathao Courier and similar services are widely used by social/e-commerce sellers, with COD and merchant workflows commonly discussed across the market.

Practical implication:

You do not need to become a courier platform. Start with CSV export and manual tracking ID entry. Add courier APIs only when pilot merchants prove which provider matters most.

### 2.4 Meta automation is valuable but risky as a launch dependency

Facebook/Messenger automation depends on Meta permissions, webhooks, Page access, and sometimes App Review/business verification. This can take time and can fail for non-product reasons.

Useful source:

- Meta's own Help Center states that Pages can use Meta APIs on the Developer Platform to create automated chats on Messenger. Source: [Meta Help - Automated and AI chats with Pages on Messenger](https://www.facebook.com/help/messenger-app/1127097651266653/Automated%2Band%2BAI%2Bchats%2Bwith%2BPages%2Bon%2BMessenger)

Practical implication:

Do not wait for Meta automation to start selling and testing. Validate order links, COD capture, dashboard, and courier export first.

---

## 3. Product Definition

### One-line definition

OrderFlow BD helps Bangladeshi Facebook sellers turn comments and inbox inquiries into confirmed COD orders and courier-ready shipments.

### First promise

> Stop losing orders in comments and inbox. Send one order link, collect customer details, track COD orders, and export courier-ready shipments.

### What it is not yet

OrderFlow is not yet:

- a full chatbot
- a full Shopify alternative
- a marketplace
- a payment gateway
- a courier company
- a full CRM
- a multi-channel automation system

Those may come later. The first product should feel like a small, useful order desk for Facebook shops.

---

## 4. First Customer Segment

### Start with fashion and beauty F-commerce shops

Why this segment:

- Many products are visual.
- Customers ask repeated questions.
- Comment and inbox volume is common.
- COD is common.
- Products can be represented with photos, price, size, color, stock, and delivery charge.
- Sellers often run without a proper website.
- Many shops are owner-operated, so decision cycles are short.

### Ideal pilot merchant

Look for shops that:

- sell mainly through Facebook Page or group presence
- have at least 30-50 monthly orders
- receive repeated "price/size/available/delivery charge/COD" questions
- use COD
- use Steadfast, Pathao, RedX, eCourier, or similar courier
- currently copy orders into spreadsheets, notebooks, courier portals, or Messenger notes
- have an owner or operator willing to test a dashboard daily

### Avoid in the first month

Avoid shops that:

- have almost no order volume
- only want free software
- sell restricted/high-risk products
- cannot prove Page ownership/admin access
- demand full automation before trying anything
- require complex custom negotiation for every order
- are already heavily set up on Shopify/WooCommerce and only want a plugin

---

## 5. Problem Hypotheses To Validate

These are assumptions. The 30-day plan exists to test them.

### Hypothesis 1: Sellers lose time answering repeated questions

Target signal:

- 15+ sellers mention repeated price/availability/delivery/COD questions.
- 5+ sellers say this takes significant daily time.

### Hypothesis 2: Sellers lose orders because inbox/comment flow is messy

Target signal:

- Sellers can describe customers being missed, forgotten, or replied to late.
- Sellers have no clean count of inquiries vs confirmed orders.

### Hypothesis 3: Manual order collection is painful

Target signal:

- Sellers currently ask for name, phone, address, product, size/color, and COD manually.
- Sellers copy this information into courier portals or spreadsheets.

### Hypothesis 4: A simple order link is useful even before Meta automation

Target signal:

- At least 3 sellers are willing to manually send OrderFlow links to customers for one week.

### Hypothesis 5: Sellers will pay

Target signal:

- At least 2 sellers commit to paying after a trial.
- Ideal early paid target: BDT 1,000-3,000/month per shop or BDT 500-1,500 setup fee plus monthly fee.

---

## 6. MVP Scope

### MVP workflow

1. Merchant creates products.
2. Each product gets an order link.
3. Merchant manually sends link in Facebook comments/inbox.
4. Customer opens link.
5. Customer submits:
   - name
   - phone
   - district/area
   - full address
   - product/variant
   - quantity
   - payment method, initially COD
6. Merchant sees order in dashboard.
7. Merchant marks order confirmed/packed/shipped/delivered/cancelled.
8. Merchant exports courier CSV or copies courier-ready details.
9. Merchant enters tracking ID manually if available.

### P0 features

Build these first:

- merchant login or simple pilot shop access
- shop profile
- product catalog
- public order page
- order dashboard
- status update
- courier CSV export
- manual tracking ID field
- customer phone/address validation basics
- seller reply templates
- simple metrics:
  - orders today
  - pending orders
  - courier-ready orders
  - delivered/cancelled count

### P1 features

Build only after pilot usage:

- product variants
- stock tracking
- order notes
- customer history
- repeat buyer flag
- basic analytics
- CSV import for products
- bulk status update
- courier-specific CSV templates
- admin dashboard

### P2 features

Do later:

- Meta OAuth/Page connection
- comment webhook ingestion
- automatic public/private replies
- Messenger inbox
- Instagram integration
- WhatsApp Business integration
- bKash/Nagad/SSLCOMMERZ gateway
- courier API booking
- advanced Bangla/English NLP
- abandoned inquiry recovery

---

## 7. The Meta Rule

### Hard rule

Meta Review must not block customer validation.

### What to validate before Meta approval

You can validate:

- whether sellers want order links
- whether customers fill forms
- whether merchants use the dashboard
- whether courier export saves time
- whether sellers will pay
- whether reply templates reduce effort

All of that can happen without Meta approval.

### Meta automation later

Meta automation becomes valuable once we already know:

- sellers have inquiry volume
- order links convert
- merchants use the dashboard
- the workflow saves time
- there is willingness to pay

At that point, automation increases speed and conversion. It is not the first proof.

---

## 8. Buyer Survey vs Seller Survey

You mentioned you already made questionnaires for buyers and sellers. Good.

But remember:

> Buyer survey data is supporting evidence. Seller behavior is the main evidence.

### Buyer survey goals

Use buyer surveys to learn:

- do buyers trust Facebook shops?
- do they prefer COD?
- what makes them abandon an order?
- do they like order links?
- what information do they want before ordering?
- do they want tracking updates?
- do they worry about fake pages?

Useful sample size:

- 50-100 buyer responses.

### Seller survey goals

Use seller surveys to learn:

- monthly orders
- daily comment/inbox volume
- current order collection method
- courier provider
- payment method
- time spent replying
- pain with missed messages
- willingness to try order links
- willingness to pay

Useful sample size:

- 30-50 seller responses.

### What surveys cannot prove

Surveys cannot prove:

- sellers will use the dashboard
- sellers will send links to customers
- customers will submit real orders
- sellers will pay after trial

Only a live pilot can prove that.

---

## 9. Success Metrics

### Minimum success by Day 30

- 30 sellers contacted
- 15 seller conversations
- 3-5 pilot shops onboarded
- 50 real orders captured through OrderFlow
- 2 shops willing to pay after trial
- 1 clear acquisition channel identified

### Strong success by Day 30

- 60 sellers contacted
- 25 seller conversations
- 5-8 pilot shops onboarded
- 100+ real orders captured
- 3 paying or payment-ready shops
- one shop uses OrderFlow daily for at least 7 days
- at least one strong case study

### Failure signals

- sellers say "nice idea" but will not test
- sellers refuse to send order links manually
- customers do not fill the order form
- seller support burden is too high
- no one agrees to pay even BDT 1,000/month
- the product does not save time versus existing workflow

---

## 10. Pricing For First 30 Days

Do not overcomplicate pricing.

### Trial offer

Give 7-14 days free only if the seller agrees to real usage:

- add at least 5 products
- send links to real customers
- capture at least 10 orders
- give feedback twice

No passive free accounts.

### Early paid options

Option A: Starter monthly

- BDT 1,500/month
- 1 Facebook Page/shop
- product links
- order dashboard
- courier CSV export
- manual tracking

Option B: Setup plus monthly

- BDT 1,000-2,000 setup/onboarding
- BDT 1,000-2,000/month
- good for sellers who need done-for-you setup

Option C: Pilot package

- BDT 2,000-5,000 for first month
- includes product setup, templates, dashboard, and support

Recommended first ask:

> I will set up your products, order links, dashboard, and courier export. Use it for 7 days. If it saves time and captures orders properly, continue at BDT 1,500/month.

---

## 11. Outreach Plan

### Prospect target

Build a list of 80 potential sellers.

Breakdown:

- 30 fashion pages
- 20 beauty/cosmetics pages
- 10 accessories pages
- 10 home/lifestyle pages
- 10 friends/family/referral sellers

### Where to find sellers

- Facebook Pages your friends buy from
- Facebook seller groups
- Instagram shops with Facebook presence
- women entrepreneur groups
- NSU student/friend networks
- courier merchant communities
- local boutique pages

### CRM columns

Track:

- shop name
- category
- Facebook URL
- owner/admin name
- contact method
- monthly order estimate
- courier provider
- contacted date
- response
- call/demo scheduled
- pain score
- pilot interest
- products added
- orders captured
- payment likelihood
- next action

### Pain score

Use:

- 1: no real pain
- 2: mild curiosity
- 3: interested but low order volume
- 4: clear pain and willing to test
- 5: urgent pain, real order volume, likely to pay

Focus on 4 and 5.

---

## 12. Outreach Scripts

### Short Facebook message

Hi, I am Hasib from NSU. I am building a simple order tool for Facebook shops in Bangladesh. It helps sellers send product order links, collect COD orders, and export courier-ready order lists instead of copying everything manually. I am looking for 3-5 pilot shops. Would you be open to a 10-minute chat?

### Follow-up

Just following up once. I am not selling a big package. I am testing whether a simple order link + dashboard can save Facebook sellers time. If your shop gets regular inbox/comment orders, I would love to set it up for a short pilot.

### Referral message to friends

Do you know any Facebook shop owner who gets regular orders? I am building OrderFlow BD, a simple tool to turn inbox/comment inquiries into COD orders and courier-ready lists. I need 3-5 pilot sellers, preferably fashion/beauty shops.

### Seller call opener

Thanks for taking the time. I am not here to force software on you. I am trying to understand how Facebook sellers currently collect orders, verify details, and prepare courier shipments. If the pain is real, I can set up a small tool for your shop and test it with real orders.

---

## 13. Seller Discovery Script

Ask for stories, not opinions.

### Shop context

1. What do you sell?
2. How long have you been selling through Facebook?
3. Roughly how many orders do you get per month?
4. Which channels bring orders: comments, inbox, WhatsApp, Instagram, phone?
5. Which courier do you use?
6. Do you mostly do COD, advance payment, or both?

### Current workflow

7. When someone comments "price?" what happens next?
8. How do you collect name, phone, address, product, size/color, quantity?
9. Where do you store confirmed orders?
10. Do you use Excel, notebook, courier portal, Messenger labels, or something else?
11. Who prepares courier entries?
12. How long does order processing take each day?

### Pain

13. Do you ever miss comments or inbox messages?
14. Do customers disappear because replies are late?
15. Do customers send incomplete addresses?
16. Do courier entries ever have mistakes?
17. Do you struggle to track delivered/cancelled/returned orders?
18. What is the most annoying repeated task?

### Existing tools

19. Do you use Meta Business Suite?
20. Do you use Shopify, WooCommerce, Google Forms, Excel, or any order tool?
21. What do you dislike about current tools?
22. Have you tried a chatbot? What happened?

### Test and payment

23. If I create order links for your top products, would you send them to real customers for 7 days?
24. If it saves time, would BDT 1,500/month be reasonable?
25. Would you prefer monthly fee, per-order fee, or setup fee plus monthly?
26. Can we set up 5 products now and test with your next orders?

### Closing

27. Who else should I talk to?
28. Can I follow up after setting up a demo for your shop?
29. If this works, what would make you continue using it?

---

## 14. Buyer Discovery Questions

Use your friends and buyer survey to understand customer behavior.

Ask:

1. How often do you buy from Facebook shops?
2. What categories do you buy?
3. Do you prefer COD or advance payment?
4. What makes you trust a Facebook shop?
5. What makes you abandon an order?
6. Do you dislike filling forms?
7. Would you use an order link from a Facebook shop?
8. What information must be visible before ordering?
9. Do you want tracking updates?
10. What makes you feel a shop is professional?

Important:

Buyer enthusiasm is not enough. Sellers pay. Seller behavior decides.

---

## 15. MVP Build Plan

### Recommended stack

Use the existing project direction:

- Next.js
- TypeScript
- Supabase for auth/database when ready
- Vercel for deployment
- CSV export for courier workflow

### First production data model

Core tables:

- shops
- shop_members
- products
- product_variants
- orders
- order_items
- customers
- courier_exports
- status_events
- reply_templates
- billing_records

### Order statuses

Use:

- new
- confirmed
- packed
- courier_ready
- shipped
- delivered
- cancelled
- returned

Keep payment simple:

- COD
- manual bKash
- manual Nagad

But launch with COD first.

### Public order page fields

Required:

- customer name
- phone
- district
- area
- full address
- product
- variant/size/color if needed
- quantity
- payment method
- note

Optional later:

- alternative phone
- delivery date preference
- coupon
- payment screenshot

### Courier CSV fields

Start generic:

- customer_name
- phone
- address
- district
- area
- product_name
- quantity
- COD_amount
- delivery_charge
- merchant_invoice_id
- note

Later create courier-specific templates.

---

## 16. Day-By-Day Plan

### Week 1: Merchant discovery and manual validation setup

Goal by end of Week 1:

- 30 sellers listed
- 10 sellers contacted
- 5 seller conversations completed
- 1-2 pilot shops verbally interested
- MVP scope locked

#### Day 1 - Sunday, May 24, 2026

Theme: Set up the battlefield.

Tasks:

- Create OrderFlow CRM.
- List 30 Facebook shops.
- Sort by category: fashion, beauty, accessories, lifestyle.
- Send first 10 messages.
- Ask friends for 10 seller introductions.
- Review existing buyer and seller questionnaires.
- Remove questions that do not affect product or pricing.
- Write one-line pitch and pilot offer.

Deliverables:

- CRM v1.
- 10 outbound messages.
- cleaned seller questionnaire.
- cleaned buyer questionnaire.

#### Day 2 - Monday, May 25, 2026

Theme: First seller calls.

Tasks:

- Send 10 more seller messages.
- Conduct 1-2 seller calls if possible.
- Ask every seller about monthly order volume, courier provider, and COD workflow.
- Identify whether they already use Google Forms, Excel, Meta Business Suite, or courier dashboard.
- Create a fake/demo shop in OrderFlow with 5 products.

Deliverables:

- 20 total sellers contacted.
- 2 call notes.
- demo shop skeleton.

#### Day 3 - Tuesday, May 26, 2026

Theme: Build only the demo needed.

Tasks:

- Create 5 demo products:
  - image placeholder
  - price
  - delivery charge
  - COD option
- Create public order page.
- Create order dashboard.
- Create CSV export.
- Send 10 more outreach messages.

Deliverables:

- first clickable demo.
- 30 sellers contacted.

#### Day 4 - Wednesday, May 27, 2026

Theme: Show demo, collect objections.

Tasks:

- Conduct 2 seller calls/demos.
- Ask if they would send the order link manually for 7 days.
- Record objections:
  - customers will not fill form
  - I already use Excel
  - I need Messenger automation
  - I need courier API
  - I need bKash verification
- Do not defend too much. Learn.

Deliverables:

- 2 demo notes.
- objection list.

#### Day 5 - Thursday, May 28, 2026

Theme: Improve the manual pilot flow.

Tasks:

- Add reply templates.
- Add "copy order link" button.
- Add simple order confirmation page.
- Add merchant notification placeholder, even if manual for now.
- Add dashboard filters: new, confirmed, courier-ready.
- Ask 2 warm sellers for 7-day pilot.

Deliverables:

- demo v0.2.
- 2 pilot asks.

#### Day 6 - Friday, May 29, 2026

Theme: Buyer sanity check.

Tasks:

- Send buyer survey to 20 friends/classmates.
- Ask them to place fake orders through demo link.
- Watch where they get confused.
- Improve public order form.
- Ensure mobile experience is clean.

Deliverables:

- 20 buyer tests requested.
- order page improvements.

#### Day 7 - Saturday, May 30, 2026

Theme: Week 1 review.

Tasks:

- Count:
  - sellers contacted
  - seller calls
  - pilot interest
  - buyer survey responses
  - biggest objections
- Decide whether the target remains fashion/beauty.
- Select 3 pilot candidates.

Week 1 gate:

- Green: 5+ seller calls and 2+ pilot candidates.
- Yellow: seller interest exists but no pilot yet.
- Red: no seller conversations.

If red:

- Stop building for 3 days and do only outreach.

---

### Week 2: Launch concierge pilots

Goal by end of Week 2:

- 3 pilot shops onboarded
- 20+ real orders captured
- manual process measured

#### Day 8 - Sunday, May 31, 2026

Theme: Pilot onboarding.

Tasks:

- Onboard pilot shop #1.
- Add 5-10 real products.
- Add delivery charges.
- Create reply templates.
- Teach seller how to copy/send links.
- Ask seller to send links for every serious inquiry.

Deliverables:

- pilot shop #1 live.

#### Day 9 - Monday, June 1, 2026

Theme: Pilot shop #2.

Tasks:

- Onboard pilot shop #2.
- Repeat done-for-you setup.
- Record setup time.
- Note which product info is hard to collect.
- Add missing fields if repeated.

Deliverables:

- pilot shop #2 live.

#### Day 10 - Tuesday, June 2, 2026

Theme: Pilot shop #3.

Tasks:

- Onboard pilot shop #3.
- Create courier CSV template based on their courier.
- Test 3 fake orders with seller.
- Ask seller to use it for real customers.

Deliverables:

- pilot shop #3 live.

#### Day 11 - Wednesday, June 3, 2026

Theme: Order capture monitoring.

Tasks:

- Check how many real orders came in.
- Ask sellers:
  - Did customers fill the form?
  - Did anyone complain?
  - Did it save time?
  - Did you forget to send links?
- Add reminders or simpler copy button if needed.

Deliverables:

- usage notes.
- first order count.

#### Day 12 - Thursday, June 4, 2026

Theme: Courier workflow.

Tasks:

- Watch one seller prepare courier entries.
- Compare:
  - old process time
  - OrderFlow CSV/copy process time
- Add fields needed for courier.
- Improve CSV export.

Deliverables:

- courier workflow v0.2.

#### Day 13 - Friday, June 5, 2026

Theme: Fix trust and professionalism.

Tasks:

- Add shop branding/logo.
- Add product image to order page.
- Add clear total amount:
  - product price
  - delivery charge
  - COD amount
- Add confirmation text for customer.
- Add merchant order notes.

Deliverables:

- order page v0.3.

#### Day 14 - Saturday, June 6, 2026

Theme: Week 2 review.

Tasks:

- Count:
  - pilot shops live
  - products added
  - orders captured
  - customer drop-offs
  - seller complaints
  - courier exports
- Ask each seller:
  - Would you keep using this next week?
  - What would make you pay?

Week 2 gate:

- Green: 3 pilots and 20+ real orders.
- Yellow: pilots live but low usage.
- Red: sellers do not send links.

If red:

- The issue may be habit change. Add stronger onboarding, templates, and daily seller reminders.

---

### Week 3: Convert usage into payment signal

Goal by end of Week 3:

- 50+ real orders captured
- 2 sellers ready to pay or extend
- pricing tested

#### Day 15 - Sunday, June 7, 2026

Theme: Daily-use habit.

Tasks:

- Send each pilot seller a short daily usage prompt.
- Add dashboard metric:
  - orders today
  - pending courier
- Add "copy customer details" button.
- Add "copy reply template" button if not done.

Deliverables:

- better daily workflow.

#### Day 16 - Monday, June 8, 2026

Theme: More pilots.

Tasks:

- Contact 15 more sellers using early pilot screenshots.
- Ask for 2 more pilot shops.
- Prioritize sellers with 50+ monthly orders.

Deliverables:

- 45+ sellers contacted total.
- 1-2 additional pilot candidates.

#### Day 17 - Tuesday, June 9, 2026

Theme: Payment conversation #1.

Tasks:

- Ask pilot seller #1:
  - What did this save?
  - What is missing?
  - Would you pay BDT 1,500/month?
  - If not, what price feels fair?
- Do not argue. Record answer.

Deliverables:

- payment note #1.

#### Day 18 - Wednesday, June 10, 2026

Theme: Payment conversation #2 and #3.

Tasks:

- Repeat pricing conversation with pilot sellers #2 and #3.
- Test setup fee vs monthly.
- Ask if done-for-you product setup is valuable.

Deliverables:

- pricing notes.

#### Day 19 - Thursday, June 11, 2026

Theme: Case study draft.

Tasks:

- Pick best pilot.
- Write:
  - shop category
  - products added
  - orders captured
  - time saved
  - seller quote if allowed
  - before/after workflow
- Keep it anonymous if needed.

Deliverables:

- case study v0.1.

#### Day 20 - Friday, June 12, 2026

Theme: Product cleanup.

Tasks:

- Fix top 5 recurring issues.
- Remove confusing UI.
- Improve mobile layout.
- Improve CSV fields.
- Add simple admin view for your own support.

Deliverables:

- pilot-ready v0.4.

#### Day 21 - Saturday, June 13, 2026

Theme: Week 3 review.

Tasks:

- Count:
  - active pilot shops
  - total orders captured
  - sellers contacted
  - sellers willing to pay
  - top support issues
- Decide whether to ask for payment in Week 4.

Week 3 gate:

- Green: 50+ orders and 2 payment-ready sellers.
- Yellow: usage exists but payment weak.
- Red: sellers not using after onboarding.

If yellow:

- Offer setup + managed service instead of pure SaaS.

---

### Week 4: Close first payments and decide next phase

Goal by end of Week 4:

- 2 paid or payment-committed shops
- 100+ total orders if possible
- clear decision on continuing OrderFlow

#### Day 22 - Sunday, June 14, 2026

Theme: Paid plan offer.

Tasks:

- Prepare simple paid offer:
  - BDT 1,500/month starter
  - BDT 2,500/month with done-for-you support
  - optional BDT 1,000 setup fee
- Send to pilot sellers.
- Ask for payment after trial.

Deliverables:

- paid offer sent.

#### Day 23 - Monday, June 15, 2026

Theme: Seller acquisition push.

Tasks:

- Contact 20 more sellers.
- Use real case study:
  - "We helped a fashion seller capture X orders through order links and courier-ready export."
- Ask existing pilots for referrals.

Deliverables:

- 65+ sellers contacted total.

#### Day 24 - Tuesday, June 16, 2026

Theme: Operational support.

Tasks:

- Help pilot sellers process orders.
- Document support questions.
- Create FAQ:
  - how to add products
  - how to send link
  - how to export courier CSV
  - how to mark shipped/delivered

Deliverables:

- seller FAQ v0.1.

#### Day 25 - Wednesday, June 17, 2026

Theme: Close first payment.

Tasks:

- Ask each active pilot:
  - "Do you want to continue next month?"
  - "Can we start your paid plan from next week?"
- Offer founder pricing.
- Do not discount below seriousness.

Deliverables:

- first paid commitment target.

#### Day 26 - Thursday, June 18, 2026

Theme: Meta readiness in parallel.

Tasks:

- Create Meta task checklist:
  - Meta Business account
  - Developer app
  - test Page
  - privacy policy page
  - data deletion page
  - screencast plan
  - permissions list
- Do not submit unless product flow is working and review materials are clean.

Deliverables:

- Meta readiness checklist.

#### Day 27 - Friday, June 19, 2026

Theme: Retention check.

Tasks:

- Check if sellers still use OrderFlow without you pushing.
- Identify daily habit:
  - sending links
  - checking dashboard
  - exporting courier list
- If they stop using it, ask why immediately.

Deliverables:

- retention notes.

#### Day 28 - Saturday, June 20, 2026

Theme: Month-end metrics.

Tasks:

- Count:
  - seller contacts
  - seller calls
  - pilots onboarded
  - products created
  - real orders captured
  - paid commitments
  - churned pilots
  - support hours
- Calculate:
  - average orders per pilot
  - support time per shop
  - likely ARPU

Deliverables:

- metrics report.

#### Day 29 - Sunday, June 21, 2026

Theme: Decision prep.

Tasks:

- Write honest answers:
  - Do sellers have urgent pain?
  - Does the product save time?
  - Do customers complete order forms?
  - Will sellers pay?
  - Is support manageable?
  - Is Meta automation necessary or just nice?
- Compare OrderFlow with Export Compliance opportunity.

Deliverables:

- decision memo v0.1.

#### Day 30 - Monday, June 22, 2026

Theme: Go/no-go/narrow decision.

Make one of these decisions:

1. Continue OrderFlow for another 60 days.
2. Narrow OrderFlow to a smaller workflow.
3. Pause OrderFlow and shift energy to Export Compliance.

Continue if:

- 3-5 shops onboarded.
- 50-100 real orders captured.
- 2 shops willing to pay.
- support burden is manageable.
- acquisition path is clear.

Narrow if:

- sellers like one piece, such as courier export or order links, but not the full dashboard.

Pause if:

- sellers will not pay.
- sellers do not use it after setup.
- customers do not trust order links.
- support eats too much time for low ARPU.

---

## 17. Weekly Reporting Template

Use this every Saturday.

Week:

Dates:

Sellers contacted:

Seller calls:

Buyer survey responses:

Pilot shops onboarded:

Products added:

Real orders captured:

Courier exports:

Payment conversations:

Paid commitments:

Top 3 seller pains:

Top 3 objections:

Top 3 product fixes:

Decision for next week:

---

## 18. Product Guardrails

### Build

Build features that:

- help capture orders
- reduce manual copying
- reduce incomplete customer info
- prepare courier shipments
- help sellers reply faster
- help you prove willingness to pay

### Do not build yet

Avoid:

- full AI chatbot
- complex NLP
- payment gateway integrations
- courier API integrations
- WhatsApp/Instagram expansion
- mobile app
- inventory accounting
- ads manager
- marketplace
- full CRM

The first product should be boring enough to use daily.

---

## 19. Founder Operating Rules

### Rule 1: No coding-only days in the first week

Every day must include outreach or conversations.

### Rule 2: Survey responses are not validation

Validation means real seller usage and payment signal.

### Rule 3: Meta is parallel, not blocking

Start Meta preparation, but do not wait for approval to pilot.

### Rule 4: Support time is a metric

If each BDT 1,500/month shop needs 5 hours of support, the model is broken unless you charge setup fees or move upmarket.

### Rule 5: Keep Export Compliance warm

Do 1-2 light research conversations per week for Export Compliance, but do not build it during this sprint.

### Rule 6: Ask for money early

Do not wait until the product feels perfect. Ask after the seller has seen real value.

---

## 20. Go-To-Market Experiments

Test these channels:

1. Friends who buy from Facebook shops
   - Ask them to introduce shop owners.

2. Direct Facebook Page messages
   - Works best if you are specific and polite.

3. Women entrepreneur groups
   - Good for fashion/beauty shops, but avoid spam.

4. Courier merchant groups
   - Sellers already thinking about orders and delivery.

5. NSU network
   - Friends, seniors, alumni, family businesses.

6. Case-study outreach
   - After first pilot, show actual result.

Track which channel produces real calls and pilots.

---

## 21. First Case Study Template

Title:

How a Facebook fashion seller used OrderFlow to capture COD orders faster

Details:

- Seller type:
- Product category:
- Monthly order estimate:
- Old workflow:
- OrderFlow workflow:
- Products added:
- Orders captured:
- Time saved:
- Courier workflow improvement:
- Seller quote:
- What still needs improvement:

Use anonymous version unless seller gives permission.

---

## 22. The Billion-Dollar Ecosystem Thought

It is okay to dream about a larger ecosystem:

- social commerce order flow
- seller payments
- courier orchestration
- credit/working capital
- supplier sourcing
- compliance and trust
- buyer protection
- merchant analytics

But ecosystems are not launched. They are accumulated.

The first step is one painful workflow:

> I got a customer in my Facebook inbox. Help me turn that into a clean order and delivery.

If OrderFlow wins that workflow, future layers become possible.

---

## 23. Source List

Sources used for market and regulatory context:

- [DHL - How Facebook Commerce Works in Bangladesh](https://www.dhl.com/discover/en-bd/small-business-advice/starting-a-business/how-facebook-commerce-works-bangladesh)
- [TBS - E-commerce guidelines finalised keeping 5-day delivery time](https://www.tbsnews.net/economy/e-commerce-have-deliver-products-within-5-days-commerce-ministry-268369)
- [Daily Star - Overview of the Digital Commerce Operational Guidelines 2021](https://online.thedailystar.net/law-our-rights/news/overview-the-digital-commerce-operational-guidelines-2021-2128871)
- [Meta Help - Automated and AI chats with Pages on Messenger](https://www.facebook.com/help/messenger-app/1127097651266653/Automated%2Band%2BAI%2Bchats%2Bwith%2BPages%2Bon%2BMessenger)
- [Steadfast merchant portal](https://merchant.packzy.com/)
