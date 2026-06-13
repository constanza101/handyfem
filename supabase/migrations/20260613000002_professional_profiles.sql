-- Migration 04 — professional_profiles + portfolio_photos
-- (data-model.md, onboarding/profile slice)
-- The public storefront. Every column here is publishable by design
-- (data-model principle 1: table boundary = privacy boundary). Contact data
-- stays in auth.users; nothing personal-private lives in this table.

create table public.professional_profiles (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references public.profiles (id) on delete cascade,
  slug text not null unique,
  specialty_id uuid not null references public.specialties (id),
  professional_name text not null,
  bio text not null default '',
  rate_info text,
  work_cities text[] not null default '{}',
  is_published boolean not null default false,
  verified boolean not null default false,
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

comment on table public.professional_profiles is
  'Public storefront (1:1 with profiles, created at onboarding). Public when is_published; verified is service-role only.';

alter table public.professional_profiles enable row level security;

-- SELECT: the world reads published profiles; the owner also reads her own draft.
create policy "professional_profiles_select_published"
  on public.professional_profiles for select
  using (is_published = true);

create policy "professional_profiles_select_own"
  on public.professional_profiles for select
  using ((select auth.uid()) = profile_id);

-- INSERT / UPDATE: owner only, and only on her own row.
create policy "professional_profiles_insert_own"
  on public.professional_profiles for insert
  with check ((select auth.uid()) = profile_id);

create policy "professional_profiles_update_own"
  on public.professional_profiles for update
  using ((select auth.uid()) = profile_id)
  with check ((select auth.uid()) = profile_id);

-- Deliberately NO delete policy: account erasure runs through the GDPR deletion
-- script with the service role (cascades from profiles).

-- Column-level write privileges. RLS controls which ROWS an owner may touch;
-- these GRANTs control which COLUMNS. Together they let an owner edit her
-- storefront but never self-grant trust: `verified` / `verified_at` are absent
-- from the grants, so only the service role (which bypasses this) can set them.
revoke insert, update on public.professional_profiles from authenticated;

grant insert (profile_id, slug, specialty_id, professional_name, bio, rate_info, work_cities, is_published)
  on public.professional_profiles to authenticated;

grant update (slug, specialty_id, professional_name, bio, rate_info, work_cities, is_published)
  on public.professional_profiles to authenticated;

-- Directory performance indexes (specialty_id, GIN on work_cities, is_published)
-- are added with the directory slice (data-model migration order step 3), not here.

create table public.portfolio_photos (
  id uuid primary key default gen_random_uuid(),
  professional_id uuid not null references public.professional_profiles (id) on delete cascade,
  storage_path text not null,
  position smallint not null default 0,
  created_at timestamptz not null default now()
);

comment on table public.portfolio_photos is
  'Portfolio images. Stores the storage key (data-model principle 5), never a full URL — provider-agnostic.';

alter table public.portfolio_photos enable row level security;

-- SELECT: public when the parent profile is published; owner always (drafts too).
create policy "portfolio_photos_select_published"
  on public.portfolio_photos for select
  using (
    exists (
      select 1 from public.professional_profiles pp
      where pp.id = professional_id and pp.is_published = true
    )
  );

create policy "portfolio_photos_select_own"
  on public.portfolio_photos for select
  using (
    exists (
      select 1 from public.professional_profiles pp
      where pp.id = professional_id and pp.profile_id = (select auth.uid())
    )
  );

-- INSERT / UPDATE / DELETE: only the owner of the parent profile.
create policy "portfolio_photos_insert_own"
  on public.portfolio_photos for insert
  with check (
    exists (
      select 1 from public.professional_profiles pp
      where pp.id = professional_id and pp.profile_id = (select auth.uid())
    )
  );

create policy "portfolio_photos_update_own"
  on public.portfolio_photos for update
  using (
    exists (
      select 1 from public.professional_profiles pp
      where pp.id = professional_id and pp.profile_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1 from public.professional_profiles pp
      where pp.id = professional_id and pp.profile_id = (select auth.uid())
    )
  );

create policy "portfolio_photos_delete_own"
  on public.portfolio_photos for delete
  using (
    exists (
      select 1 from public.professional_profiles pp
      where pp.id = professional_id and pp.profile_id = (select auth.uid())
    )
  );
