-- Migration 01 — profiles (data-model.md, auth slice)
-- Base account table: one row per user, created by trigger on signup.
-- Table boundary = privacy boundary: nothing public lives here.

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default '',
  avatar_path text,
  pronouns text,
  created_at timestamptz not null default now()
);

comment on table public.profiles is
  'Private base profile (1:1 auth.users). Public data belongs in professional_profiles.';

alter table public.profiles enable row level security;

-- Owner can read and update their own row.
-- Counterpart read (shared conversation) arrives with the chat slice.
create policy "profiles_select_own"
  on public.profiles for select
  using ((select auth.uid()) = id);

create policy "profiles_update_own"
  on public.profiles for update
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- Deliberately NO insert policy (rows are created only by the trigger below)
-- and NO delete policy (account erasure goes through the GDPR deletion
-- script with the service role).

-- Auto-create a profile on signup. security definer + empty search_path per
-- Supabase hardening guidance.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'display_name',
      split_part(new.email, '@', 1)
    )
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
