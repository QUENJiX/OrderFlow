drop policy if exists "public can read active shop links" on public.shops;
create policy "public can read active shop links"
on public.shops for select
to anon, authenticated
using (status in ('pilot', 'active'));

drop policy if exists "public can read active product links" on public.products;
create policy "public can read active product links"
on public.products for select
to anon, authenticated
using (active);

drop policy if exists "authenticated can insert webhook events" on public.webhook_events;
drop policy if exists "server routes can insert webhook events" on public.webhook_events;
create policy "server routes can insert webhook events"
on public.webhook_events for insert
to anon, authenticated
with check (true);
