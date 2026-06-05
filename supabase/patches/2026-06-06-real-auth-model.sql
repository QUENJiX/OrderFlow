create table if not exists public.platform_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'owner',
  created_at timestamptz not null default now()
);

create index if not exists platform_admins_created_at_idx
on public.platform_admins (created_at desc);

alter table public.platform_admins enable row level security;

create or replace function public.is_platform_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.platform_admins
    where user_id = auth.uid()
  );
$$;

create or replace function public.create_merchant_shop(
  shop_name text,
  owner_name text default '',
  support_phone text default '',
  default_district text default 'Dhaka'
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  actor uuid := auth.uid();
  base_slug text;
  candidate_slug text;
  new_shop_id uuid;
  suffix integer := 0;
begin
  if actor is null then
    raise exception 'Authentication is required';
  end if;

  if length(trim(coalesce(shop_name, ''))) < 2 then
    raise exception 'Shop name is required';
  end if;

  base_slug := lower(regexp_replace(trim(shop_name), '[^a-z0-9]+', '-', 'g'));
  base_slug := trim(both '-' from base_slug);
  if base_slug = '' then
    base_slug := 'shop';
  end if;

  candidate_slug := base_slug;
  while exists (select 1 from public.shops where slug = candidate_slug) loop
    suffix := suffix + 1;
    candidate_slug := base_slug || '-' || suffix::text;
  end loop;

  insert into public.shops (
    slug,
    name,
    owner_name,
    phone,
    email,
    support_phone,
    default_district,
    status,
    plan,
    billing_notes,
    support_notes
  ) values (
    candidate_slug,
    trim(shop_name),
    trim(coalesce(owner_name, '')),
    trim(coalesce(support_phone, '')),
    coalesce(auth.jwt() ->> 'email', ''),
    trim(coalesce(support_phone, '')),
    trim(coalesce(default_district, 'Dhaka')),
    'active',
    'pilot',
    'Merchant-created workspace.',
    'Created from merchant onboarding.'
  )
  returning id into new_shop_id;

  insert into public.shop_members (shop_id, user_id, role)
  values (new_shop_id, actor, 'owner')
  on conflict (shop_id, user_id) do update set role = 'owner';

  return new_shop_id;
end;
$$;

drop policy if exists "users can read own platform admin row" on public.platform_admins;
create policy "users can read own platform admin row"
on public.platform_admins for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "platform admins can read platform admin rows" on public.platform_admins;
create policy "platform admins can read platform admin rows"
on public.platform_admins for select
to authenticated
using (public.is_platform_admin());

drop policy if exists "platform admins can read all shops" on public.shops;
create policy "platform admins can read all shops"
on public.shops for select
to authenticated
using (public.is_platform_admin());

drop policy if exists "platform admins can read all products" on public.products;
create policy "platform admins can read all products"
on public.products for select
to authenticated
using (public.is_platform_admin());

drop policy if exists "platform admins can read all orders" on public.orders;
create policy "platform admins can read all orders"
on public.orders for select
to authenticated
using (public.is_platform_admin());

drop policy if exists "platform admins can read all templates" on public.reply_templates;
create policy "platform admins can read all templates"
on public.reply_templates for select
to authenticated
using (public.is_platform_admin());

drop policy if exists "platform admins can read all billing" on public.billing_records;
create policy "platform admins can read all billing"
on public.billing_records for select
to authenticated
using (public.is_platform_admin());

drop policy if exists "platform admins can read all webhook events" on public.webhook_events;
create policy "platform admins can read all webhook events"
on public.webhook_events for select
to authenticated
using (public.is_platform_admin());
