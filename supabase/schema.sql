create extension if not exists pgcrypto;

create type public.shop_status as enum ('pilot', 'active', 'paused');
create type public.shop_plan as enum ('pilot', 'starter', 'assisted');
create type public.order_status as enum (
  'new',
  'confirmed',
  'packed',
  'courier_ready',
  'shipped',
  'delivered',
  'cancelled',
  'returned'
);
create type public.payment_method as enum ('cod', 'manual_bkash', 'manual_nagad');
create type public.payment_status as enum (
  'unpaid',
  'awaiting_verification',
  'verified',
  'failed',
  'refunded'
);
create type public.courier_provider as enum (
  'steadfast',
  'pathao',
  'redx',
  'ecourier',
  'paperfly',
  'manual'
);
create type public.reply_language as enum ('bn', 'en');
create type public.member_role as enum ('owner', 'admin', 'operator');
create type public.webhook_provider as enum ('meta');
create type public.webhook_event_type as enum ('comment', 'message', 'test');
create type public.webhook_status as enum ('simulated', 'matched', 'fallback', 'failed');
create type public.billing_status as enum ('trial', 'due', 'paid', 'overdue');

create table public.shops (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  owner_name text not null default '',
  phone text not null default '',
  email text not null default '',
  logo_url text,
  support_phone text not null default '',
  default_district text not null default 'Dhaka',
  default_courier public.courier_provider not null default 'steadfast',
  plan public.shop_plan not null default 'pilot',
  status public.shop_status not null default 'pilot',
  billing_notes text not null default '',
  support_notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.shop_members (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references public.shops(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.member_role not null default 'operator',
  created_at timestamptz not null default now(),
  unique (shop_id, user_id)
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references public.shops(id) on delete cascade,
  slug text not null,
  name text not null,
  name_bn text not null default '',
  description text not null default '',
  price numeric(12, 2) not null check (price > 0),
  compare_at_price numeric(12, 2) check (compare_at_price is null or compare_at_price >= price),
  delivery_charge numeric(12, 2) not null default 0 check (delivery_charge >= 0),
  stock integer not null default 0 check (stock >= 0),
  variants jsonb not null default '[]'::jsonb,
  keywords text[] not null default '{}',
  image_url text not null default '',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (shop_id, slug)
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references public.shops(id) on delete cascade,
  product_id uuid not null references public.products(id),
  customer jsonb not null,
  quantity integer not null check (quantity > 0),
  variant text,
  payment_method public.payment_method not null default 'cod',
  payment_status public.payment_status not null default 'unpaid',
  payment_reference text,
  status public.order_status not null default 'new',
  courier_provider public.courier_provider not null default 'steadfast',
  tracking_id text,
  merchant_notes text,
  customer_notes text,
  subtotal numeric(12, 2) not null check (subtotal >= 0),
  delivery_charge numeric(12, 2) not null default 0 check (delivery_charge >= 0),
  total numeric(12, 2) not null check (total >= 0),
  sla_deadline timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.reply_templates (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references public.shops(id) on delete cascade,
  language public.reply_language not null default 'bn',
  title text not null,
  trigger text not null,
  body text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.webhook_events (
  id uuid primary key default gen_random_uuid(),
  provider public.webhook_provider not null default 'meta',
  event_type public.webhook_event_type not null default 'test',
  source_id text not null,
  matched_product_id uuid references public.products(id) on delete set null,
  message text not null default '',
  reply text not null default '',
  status public.webhook_status not null default 'simulated',
  created_at timestamptz not null default now()
);

create table public.billing_records (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references public.shops(id) on delete cascade,
  plan public.shop_plan not null default 'pilot',
  amount numeric(12, 2) not null default 0 check (amount >= 0),
  period text not null,
  status public.billing_status not null default 'trial',
  notes text not null default '',
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_shops_updated_at
before update on public.shops
for each row execute function public.set_updated_at();

create trigger set_products_updated_at
before update on public.products
for each row execute function public.set_updated_at();

create trigger set_orders_updated_at
before update on public.orders
for each row execute function public.set_updated_at();

create index shops_slug_idx on public.shops (slug);
create index shop_members_user_id_idx on public.shop_members (user_id);
create index products_shop_id_created_at_idx on public.products (shop_id, created_at desc);
create index products_shop_id_slug_idx on public.products (shop_id, slug);
create index products_keywords_gin_idx on public.products using gin (keywords);
create index orders_shop_id_created_at_idx on public.orders (shop_id, created_at desc);
create index orders_shop_id_status_idx on public.orders (shop_id, status);
create index orders_shop_id_payment_status_idx on public.orders (shop_id, payment_status);
create index webhook_events_created_at_idx on public.webhook_events (created_at desc);
create index billing_records_shop_id_created_at_idx on public.billing_records (shop_id, created_at desc);

alter table public.shops enable row level security;
alter table public.shop_members enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.reply_templates enable row level security;
alter table public.webhook_events enable row level security;
alter table public.billing_records enable row level security;

create or replace function public.is_shop_member(target_shop_id uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.shop_members
    where shop_id = target_shop_id
      and user_id = auth.uid()
  );
$$;

create policy "members can read their shops"
on public.shops for select
to authenticated
using (public.is_shop_member(id));

create policy "members can update their shops"
on public.shops for update
to authenticated
using (public.is_shop_member(id))
with check (public.is_shop_member(id));

create policy "members can read memberships"
on public.shop_members for select
to authenticated
using (public.is_shop_member(shop_id));

create policy "members can read products"
on public.products for select
to authenticated
using (public.is_shop_member(shop_id));

create policy "members can write products"
on public.products for all
to authenticated
using (public.is_shop_member(shop_id))
with check (public.is_shop_member(shop_id));

create policy "public can read active product links"
on public.products for select
to anon
using (active);

create policy "members can read orders"
on public.orders for select
to authenticated
using (public.is_shop_member(shop_id));

create policy "members can update orders"
on public.orders for update
to authenticated
using (public.is_shop_member(shop_id))
with check (public.is_shop_member(shop_id));

create policy "server routes can create public orders"
on public.orders for insert
to anon, authenticated
with check (
  exists (
    select 1
    from public.products
    where products.id = product_id
      and products.shop_id = shop_id
      and products.active = true
  )
);

create policy "members can read templates"
on public.reply_templates for select
to authenticated
using (public.is_shop_member(shop_id));

create policy "members can write templates"
on public.reply_templates for all
to authenticated
using (public.is_shop_member(shop_id))
with check (public.is_shop_member(shop_id));

create policy "members can read billing"
on public.billing_records for select
to authenticated
using (public.is_shop_member(shop_id));

create policy "members can read webhook events"
on public.webhook_events for select
to authenticated
using (
  matched_product_id is null
  or exists (
    select 1
    from public.products
    where products.id = matched_product_id
      and public.is_shop_member(products.shop_id)
  )
);

create policy "authenticated can insert webhook events"
on public.webhook_events for insert
to authenticated
with check (true);
