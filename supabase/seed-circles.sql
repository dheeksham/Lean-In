-- Run this in the Supabase SQL Editor AFTER creating the tables.

-- ── Tables ───────────────────────────────────────────────────
-- Fields marked NEW don't exist on Lean In's current Circle
-- record. The creation form collects name, description, location,
-- company affiliation, open-to-members, and meeting format only —
-- there's nothing structured about what a Circle is for or who
-- it's for, which is why the directory can be browsed but not
-- matched. These two fields are the proposal.

create table circles (
  id        text primary key,
  name      text not null,
  blurb     text not null,
  focus     text[] not null,          -- NEW: what the Circle is about
  stage     text[] not null,          -- NEW: who it's for
  format    text not null,            -- exists: Virtual / In-person / Hybrid
  city      text,                     -- exists: Location
  members   int  not null,            -- exists: shown publicly
  started   date not null,            -- exists: "Started Jun 2026"
  open      boolean not null default true,  -- exists: open to new members
  image_url text
);

create table join_requests (
  id          uuid primary key default gen_random_uuid(),
  circle_id   text not null references circles(id),
  member_name text not null,
  status      text not null default 'pending',
  created_at  timestamptz not null default now()
);

alter table circles enable row level security;
alter table join_requests enable row level security;

create policy "read circles" on circles for select using (true);
create policy "read requests" on join_requests for select using (true);
create policy "create requests" on join_requests for insert with check (true);

-- ── The 16 Circles ───────────────────────────────────────────
-- Member counts and start dates together give momentum: a Circle
-- started two months ago with 50 members is obviously alive; one
-- started eight months ago with 1 member is obviously not. Both
-- numbers are public on a Circle page today.

insert into circles (id, name, blurb, focus, stage, format, city, members, started, open) values

('negotiating-your-worth', 'Negotiating Your Worth',
 'For women preparing for raise and offer conversations. We rehearse the script, then debrief how it actually went.',
 '{negotiation,confidence}', '{early,mid}', 'in-person', 'Vancouver', 34, '2026-02-01', true),

('first-time-managers', 'First-Time Managers',
 'For women in their first people-management role. We trade playbooks on delegation, feedback, and managing up.',
 '{leadership}', '{early,mid}', 'in-person', 'Vancouver', 47, '2025-11-01', true),

('coast-to-corner-office', 'Coast to Corner Office',
 'Senior women mapping the last stretch to the executive table — sponsorship, board readiness, and the conversations nobody prepares you for.',
 '{leadership,negotiation,confidence}', '{senior}', 'in-person', 'Vancouver', 19, '2026-03-01', true),

('starting-over', 'Starting Over',
 'For women changing industry, function, or city. Practical steps, honest reality checks, and people who have done it.',
 '{transition,confidence}', '{early,mid,senior}', 'in-person', 'Vancouver', 26, '2026-01-01', true),

('the-ask', 'The Ask',
 'A new Circle for women getting ready to negotiate. The leader is still gathering members.',
 '{negotiation}', '{early,mid}', 'in-person', 'Vancouver', 1, '2025-10-01', true),

('bc-women-who-lead', 'BC Women Who Lead',
 'A Vancouver Circle for women going after promotions and scaling a venture. We meet to share what is working, compare notes, and think through next steps together.',
 '{leadership,negotiation}', '{mid,senior}', 'hybrid', 'Vancouver', 22, '2026-04-01', true),

('speak-up', 'Speak Up',
 'Building the muscle to be heard in rooms where you are outnumbered — and to ask for what you are owed. Low-stakes practice, high-stakes payoff.',
 '{confidence,negotiation}', '{early,mid}', 'hybrid', 'Vancouver', 41, '2025-12-01', true),

('founders-table', 'Founders'' Table',
 'Women running their own ventures, from first hire to first raise. We work through the decisions that do not have a playbook.',
 '{leadership,transition}', '{mid,senior}', 'hybrid', 'Vancouver', 15, '2026-05-01', true),

('new-chapter', 'New Chapter',
 'Small group for women mid-transition. The group is still finding its rhythm.',
 '{transition}', '{early,mid,senior}', 'hybrid', 'Vancouver', 3, '2025-09-01', true),

('lead-louder', 'Lead Louder',
 'Recently created and looking for founding members to help shape how it runs.',
 '{leadership,confidence}', '{early,mid}', 'hybrid', 'Vancouver', 2, '2026-07-01', true),

('ask-for-more', 'Ask For More',
 'A working group for salary and scope conversations. Bring a real negotiation you are facing; leave with a plan for it.',
 '{negotiation}', '{early,mid,senior}', 'virtual', null, 58, '2025-12-01', true),

('the-pivot', 'The Pivot',
 'Career changers holding each other accountable through industry and function switches. Accountability, not just advice.',
 '{transition}', '{mid,senior}', 'virtual', null, 31, '2026-02-01', true),

('back-to-work', 'Back to Work',
 'For women returning after a career break. Practical re-entry support and a soft place to land.',
 '{transition,confidence}', '{early,mid,senior}', 'virtual', null, 24, '2026-03-01', true),

('rooted-and-rising', 'Rooted & Rising',
 'Early-career women building executive presence before the title arrives.',
 '{confidence,leadership}', '{early}', 'virtual', null, 62, '2025-10-01', true),

('c-suite-track', 'The C-Suite Track',
 'Senior leaders navigating the path to the executive table. Sponsorship, board readiness, and hard conversations.',
 '{leadership,negotiation,confidence}', '{senior}', 'virtual', null, 12, '2025-11-01', true),

('managing-managers', 'Managing Managers',
 'For women leading other leaders. Org design, hiring, and what changes when your team stops being your team.',
 '{leadership}', '{mid,senior}', 'virtual', null, 38, '2026-01-01', true);
