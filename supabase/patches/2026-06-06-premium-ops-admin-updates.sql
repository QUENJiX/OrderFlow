drop policy if exists "platform admins can update shops" on public.shops;
create policy "platform admins can update shops"
on public.shops for update
to authenticated
using (public.is_platform_admin())
with check (public.is_platform_admin());

drop policy if exists "platform admins can update billing" on public.billing_records;
create policy "platform admins can update billing"
on public.billing_records for update
to authenticated
using (public.is_platform_admin())
with check (public.is_platform_admin());
