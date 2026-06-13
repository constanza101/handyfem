-- Migration 03 — specialties (data-model.md, onboarding/profile slice)
-- Trade taxonomy: a public lookup table referenced by professional_profiles.
-- `slug` is the stable key (FKs + directory-filter URLs reference it); `name`
-- is the Spanish display string. v2 multilingual is additive against `slug` —
-- no change to this table's references is required (mvp-plan §5).

create table public.specialties (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  position smallint not null default 0,
  created_at timestamptz not null default now()
);

comment on table public.specialties is
  'Public trade taxonomy. Display name is Spanish (MVP); slug is the stable key for FKs and directory URLs.';

alter table public.specialties enable row level security;

-- Public read (directory filters, onboarding select). Anyone, signed in or not.
create policy "specialties_select_all"
  on public.specialties for select
  using (true);

-- Deliberately NO insert/update/delete policies: with RLS enabled and no
-- permissive write policy, every client write is denied. Seeds and future
-- edits go through the service role (which bypasses RLS).

-- Seed. position pins display order; "Otro" stays last as a catch-all (a
-- curation follow-up, not a directory facet).
insert into public.specialties (name, slug, position) values
  ('Electricidad',                       'electricidad',                10),
  ('Fontanería',                         'fontaneria',                  20),
  ('Carpintería',                        'carpinteria',                 30),
  ('Soldadura',                          'soldadura',                   40),
  ('Mecánica',                           'mecanica',                    50),
  ('Climatización',                      'climatizacion',               60),
  ('Construcción',                       'construccion',                70),
  ('Reformas',                           'reformas',                    80),
  ('Pintura',                            'pintura',                     90),
  ('Instalaciones',                      'instalaciones',              100),
  ('Mantenimiento',                      'mantenimiento',              110),
  ('Cerrajería',                         'cerrajeria',                 120),
  ('Jardinería',                         'jardineria',                 130),
  ('Limpieza',                           'limpieza',                   140),
  ('Montaje de muebles',                 'montaje-muebles',            150),
  ('Reparación de electrodomésticos',    'reparacion-electrodomesticos', 160),
  ('Otro',                               'otro',                       999);
