create table if not exists public.media_usage (
  id uuid primary key default gen_random_uuid(),
  media_id uuid not null references public.media(id) on delete cascade,
  entity_type text not null,
  entity_id uuid not null,
  field_name text not null,
  created_at timestamptz not null default now(),
  unique(media_id, entity_type, entity_id, field_name)
);

alter table public.media_usage enable row level security;

create policy "Staff read media usage"
on public.media_usage for select
using (public.current_user_role() in ('admin','editor','viewer'));

create policy "Staff manage media usage"
on public.media_usage for all
using (public.current_user_role() in ('admin','editor'))
with check (public.current_user_role() in ('admin','editor'));
