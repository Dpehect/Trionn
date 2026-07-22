create extension if not exists "pgcrypto";

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text not null,
  budget text not null check (budget in ('10-25k','25-50k','50-100k','100k+')),
  message text not null,
  status text not null default 'new' check (status in ('new','reviewing','closed')),
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null,
  year text not null,
  summary text not null,
  metric text,
  accent text,
  services jsonb not null default '[]'::jsonb,
  chapters jsonb not null default '[]'::jsonb,
  status text not null default 'draft' check (status in ('draft','published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;
alter table public.projects enable row level security;

create policy "Public can read published projects"
on public.projects for select
using (status = 'published');

create policy "Public can create inquiries"
on public.inquiries for insert
with check (true);
