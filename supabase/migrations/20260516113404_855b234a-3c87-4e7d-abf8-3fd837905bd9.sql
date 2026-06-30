
create table public.vehicles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  plate text,
  created_at timestamptz not null default now()
);
alter table public.vehicles enable row level security;
create policy "vehicles_select_own" on public.vehicles for select using (auth.uid() = user_id);
create policy "vehicles_insert_own" on public.vehicles for insert with check (auth.uid() = user_id);
create policy "vehicles_update_own" on public.vehicles for update using (auth.uid() = user_id);
create policy "vehicles_delete_own" on public.vehicles for delete using (auth.uid() = user_id);

create table public.readings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  mileage integer not null,
  image_url text,
  notes text,
  risk_level text not null default 'low',
  risk_reason text,
  created_at timestamptz not null default now()
);
alter table public.readings enable row level security;
create policy "readings_select_own" on public.readings for select using (auth.uid() = user_id);
create policy "readings_insert_own" on public.readings for insert with check (auth.uid() = user_id);
create policy "readings_update_own" on public.readings for update using (auth.uid() = user_id);
create policy "readings_delete_own" on public.readings for delete using (auth.uid() = user_id);
create index readings_vehicle_idx on public.readings(vehicle_id, created_at desc);

insert into storage.buckets (id, name, public) values ('odometers', 'odometers', false)
  on conflict (id) do nothing;

create policy "odo_read_own" on storage.objects for select
  using (bucket_id = 'odometers' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "odo_insert_own" on storage.objects for insert
  with check (bucket_id = 'odometers' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "odo_delete_own" on storage.objects for delete
  using (bucket_id = 'odometers' and auth.uid()::text = (storage.foldername(name))[1]);
