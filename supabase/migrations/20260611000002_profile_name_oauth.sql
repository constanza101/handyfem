-- Migration 02 — OAuth-aware display_name in the signup trigger.
-- Google (and most OAuth providers) supply `name` / `full_name` in
-- raw_user_meta_data, never `display_name`. Without these fallbacks every
-- OAuth user got their email local-part as their publicly visible name —
-- leaking part of their email address (privacy promise violation).

create or replace function public.handle_new_user()
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
      new.raw_user_meta_data ->> 'name',
      new.raw_user_meta_data ->> 'full_name',
      split_part(new.email, '@', 1)
    )
  );
  return new;
end;
$$;
