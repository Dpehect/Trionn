create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'viewer'
    check (role in ('admin','editor','viewer')),
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  storage_path text unique not null,
  mime_type text not null,
  width integer,
  height integer,
  duration numeric,
  alt_text text,
  blur_hash text,
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  subtitle text,
  summary text not null,
  category_id uuid references public.categories(id) on delete set null,
  year text not null,
  client text,
  accent_color text,
  cover_media_id uuid references public.media(id) on delete set null,
  services jsonb not null default '[]'::jsonb,
  metric text,
  status text not null default 'draft'
    check (status in ('draft','published','archived')),
  featured boolean not null default false,
  sort_order integer not null default 0,
  seo_title text,
  seo_description text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_blocks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  block_type text not null,
  content jsonb not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  sort_order integer not null default 0,
  status text not null default 'published'
    check (status in ('draft','published','archived')),
  created_at timestamptz not null default now()
);

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  bio text,
  image_id uuid references public.media(id) on delete set null,
  video_id uuid references public.media(id) on delete set null,
  social_links jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  status text not null default 'published'
    check (status in ('draft','published','archived')),
  created_at timestamptz not null default now()
);

alter table public.inquiries
  add column if not exists project_type text,
  add column if not exists timeline text,
  add column if not exists services jsonb not null default '[]'::jsonb,
  add column if not exists attachments jsonb not null default '[]'::jsonb,
  add column if not exists assigned_to uuid references public.profiles(id) on delete set null,
  add column if not exists updated_at timestamptz not null default now();

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.media enable row level security;
alter table public.projects enable row level security;
alter table public.project_blocks enable row level security;
alter table public.services enable row level security;
alter table public.team_members enable row level security;
alter table public.inquiries enable row level security;
alter table public.audit_logs enable row level security;
alter table public.site_settings enable row level security;

create or replace function public.current_user_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid()
$$;

create policy "Public read published projects"
on public.projects for select
using (status = 'published');

create policy "Public read project blocks"
on public.project_blocks for select
using (
  exists (
    select 1 from public.projects
    where projects.id = project_blocks.project_id
      and projects.status = 'published'
  )
);

create policy "Public read categories"
on public.categories for select
using (true);

create policy "Public read services"
on public.services for select
using (status = 'published');

create policy "Public read team"
on public.team_members for select
using (status = 'published');

create policy "Public create inquiries"
on public.inquiries for insert
with check (true);

create policy "Staff manage projects"
on public.projects for all
using (public.current_user_role() in ('admin','editor'))
with check (public.current_user_role() in ('admin','editor'));

create policy "Staff manage project blocks"
on public.project_blocks for all
using (public.current_user_role() in ('admin','editor'))
with check (public.current_user_role() in ('admin','editor'));

create policy "Staff manage inquiries"
on public.inquiries for all
using (public.current_user_role() in ('admin','editor','viewer'))
with check (public.current_user_role() in ('admin','editor'));

create policy "Admin manage profiles"
on public.profiles for all
using (public.current_user_role() = 'admin')
with check (public.current_user_role() = 'admin');

insert into storage.buckets (id, name, public)
values ('project-media', 'project-media', true)
on conflict (id) do nothing;

create policy "Public read project media"
on storage.objects for select
using (bucket_id = 'project-media');

create policy "Staff upload project media"
on storage.objects for insert
with check (
  bucket_id = 'project-media'
  and public.current_user_role() in ('admin','editor')
);
