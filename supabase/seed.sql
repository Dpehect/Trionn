insert into public.categories (name, slug, sort_order)
values
  ('Digital flagship', 'digital-flagship', 1),
  ('Interactive identity', 'interactive-identity', 2),
  ('Commerce experience', 'commerce-experience', 3)
on conflict (slug) do nothing;

insert into public.services (title, slug, description, sort_order)
values
  ('Strategy', 'strategy', 'Positioning, narrative and product logic.', 1),
  ('Experience design', 'experience-design', 'Editorial systems and interaction design.', 2),
  ('Motion systems', 'motion-systems', 'Motion language across interface and media.', 3),
  ('Creative development', 'creative-development', 'Production engineering for ambitious experiences.', 4),
  ('WebGL', 'webgl', 'Interactive 3D with adaptive performance.', 5)
on conflict (slug) do nothing;
