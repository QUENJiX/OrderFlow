insert into public.shops (
  id,
  slug,
  name,
  owner_name,
  phone,
  email,
  support_phone,
  default_district,
  default_courier,
  plan,
  status,
  billing_notes,
  support_notes
) values (
  '00000000-0000-0000-0000-000000000001',
  'nur-fashion',
  'Nur Fashion',
  'Nusrat Jahan',
  '+8801711122233',
  'owner@nur-fashion.example',
  '+8801711122233',
  'Dhaka',
  'steadfast',
  'pilot',
  'pilot',
  '7-day assisted pilot. Founder pricing target BDT 1,500/month.',
  'Fashion pilot shop. Needs done-for-you product setup and courier CSV export.'
) on conflict (id) do update set
  name = excluded.name,
  updated_at = now();

insert into public.products (
  id,
  shop_id,
  slug,
  name,
  name_bn,
  description,
  price,
  compare_at_price,
  delivery_charge,
  stock,
  variants,
  keywords,
  image_url,
  active
) values
(
  '00000000-0000-0000-0000-000000000101',
  '00000000-0000-0000-0000-000000000001',
  'linen-kurti',
  'Linen Kurti',
  'লিনেন কুর্তি',
  'Lightweight linen kurti with breathable fabric, daily wear fit, and size options.',
  1450,
  1750,
  80,
  36,
  '[{"name":"S","stock":8},{"name":"M","stock":14},{"name":"L","stock":10},{"name":"XL","stock":4}]'::jsonb,
  array['kurti','linen','কুর্তি','price','dam'],
  'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=80',
  true
),
(
  '00000000-0000-0000-0000-000000000102',
  '00000000-0000-0000-0000-000000000001',
  'cotton-three-piece',
  'Cotton Three Piece',
  'কটন থ্রি-পিস',
  'Soft cotton three-piece set with printed dupatta and comfortable summer cut.',
  2100,
  2450,
  100,
  24,
  '[{"name":"Blue","stock":8},{"name":"Rose","stock":7},{"name":"Olive","stock":9}]'::jsonb,
  array['three piece','cotton','থ্রি','delivery'],
  'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=900&q=80',
  true
) on conflict (id) do update set
  name = excluded.name,
  updated_at = now();

insert into public.reply_templates (
  shop_id,
  language,
  title,
  trigger,
  body,
  active
) values
(
  '00000000-0000-0000-0000-000000000001',
  'bn',
  'Price reply',
  'price/dam',
  'আপু, দাম {price} টাকা। COD available আছে। Order করতে এই link ব্যবহার করুন: {order_link}',
  true
),
(
  '00000000-0000-0000-0000-000000000001',
  'en',
  'Order link reply',
  'order',
  'You can confirm the order here: {order_link}. Please add your phone, address, quantity, and COD preference.',
  true
);

insert into public.billing_records (
  shop_id,
  plan,
  amount,
  period,
  status,
  notes
) values (
  '00000000-0000-0000-0000-000000000001',
  'pilot',
  0,
  '7-day pilot',
  'trial',
  'Convert to Starter after live order-link usage.'
);
