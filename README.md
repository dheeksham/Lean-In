## Find Your Circle
**Live demo:** [add your deployed URL]
**Repo:** [add your repo URL]

### The problem I chose
Lean In Connect's promise is on the first screen of onboarding: women in Circles are nearly 2x as likely to get promoted or receive a raise. However, that outcome only occurs once a woman is in the *right* Circle, one that matches what she's working on and that is active. The current product makes reaching that state difficult. Step 2 of member onboarding is titled "Find a Circle to join." It explains what Circles are, tells her to browse the directory and filter by topic or location, and shows a screenshot of that directory. The user can't do anything further on this screen and the actual finding is deferred to a checklist item seen after onboarding ends.

Meanwhile the directory itself is thousands of Circles across 183 countries, many with a single member, not actively meeting, and no signal of which ones fit her goals. For example, the screenshot used to illustrate step 2 leads with a Circle that has one member. So the platform delivers its value proposition everywhere except the step that unlocks it. That's the gap I built for.

### What I built
1. **Intake** questions: What the onboardee is working on, where they are in their career, and how they would like to meet. Career stage is pre-filled from the job title her profile already collected in step 1. 
2. **Matches**: A short ranked list instead of a directory catered towards the user's input preferences.

The user finishes onboarding already matched, with a request in flight, instead of with a to-do item. Step 2 marks itself complete, which means the final onboarding checklist can drop "Find a Circle to join" entirely.

### Where I focused, and why
I went deeper on the front end and on the product thinking behind the matching, because that's where my strengths lie and where I think the
biggest gap in the current experience is. The back end is real but deliberately small and enough to prove the architecture is sound.

### What's real vs. mocked
**Real:**
Circles live in a Postgres table (Supabase), not in the bundle. Matching runs server-side. The client sends their answers and receives a ranked list; it never sees the scoring weights. Join requests persist - Refresh the page and their pending requests are still there.

**Mocked:**
The member profile is hardcoded rather than session-backed. Auth was listed as one option among several for the end-to-end piece, and I
rather spent time on matching than on a login screen. In production, this reads from the session. Circle photos are placeholders. The seed data is 16 Circles I wrote, sized so every combination of answers returns at least two results. Two Circle fields don't exist yet, explanation below.

### The data for matching isn't there yet
Circle creation collects name, description, location, company affiliation, whether it's open to new members, and how it meets. There is no structure about what a Circle is *for* or who it's for. That's why the directory can be browsed but not matched. Filtering by "topic" means searching description text, which is why a user ends up guessing. Therefore, this prototype proposes two new fields at Circle creation: **focus** (what the Circle is about) and **stage** (Who it's for). Two additions to a form that already asks five questions. The seed data models what they would contain and everything else that is matched is already public on a Circle page today.

### How the matching works

Each Circle is scored against her three answers:

| Signal | Weight | Why |
|---|---|---|
| Goal overlap | +10 each | The strongest predictor of fit |
| Career stage fit | +6 | Matters, but a stretch group can still work |
| Momentum | +8 / +3 / −6 | A Circle that hasn't grown can't deliver the outcome |
| Format match | +5, or +2 for hybrid | Hybrid genuinely satisfies either preference |

**Momentum** is members divided by months since the Circle started, both numbers already public. A Circle started two months ago with 50 members is obviously alive. One started eight months ago with 1 member is obviously not, and it shouldn't outrank a thriving Circle just because its topic matches. New Circles aren't punished for being new: a Circle started last month with 2 members scores as steady, not stalled. The ones that sink are the ones that have had time and haven't grown.

## Tradeoffs

- **Three questions, not ten.** A longer intake would match better and
  convert worse. Pre-filling career stage from the existing profile buys
  accuracy without adding a question.
- **Hybrid counts partially for both formats.** It genuinely satisfies
  either preference, and it meaningfully widens results for the thinner
  combinations.
- **In-person is filtered by city, not ranked down by distance.** An
  in-person Circle in another city isn't a worse match, it's not a match.
- **Struggling Circles still appear.** Hiding them would be cleaner, but a
  new Circle looking for founding members is a real opportunity — she just
  needs to know that's what she's choosing, which the member count and start
  date tell her.
- **No new data is invented.** Everything shown on a card is either already
  public on a Circle page or one of the two proposed fields.

## What I'd build next

- **Auth**, so the profile is real and requests belong to an account.
- **The leader's side.** Requests currently go into a table with nobody to review them. The obvious next piece is a leader inbox with accept/decline.
- **Learning from outcomes.** Right now the weights are my judgment. With real data — who joined, who stayed past three meetings — the weights should be fit to retention rather than guessed.
- **The waitlist as a signal.** Repeated demand for a full Circle is the
  clearest possible prompt to start a similar one, and Lean In needs more
  leaders.
- **Accessibility pass.** Keyboard and screen reader paths are handled but
  not tested properly.

## A note on scope

This ran longer than the suggested three hours. Most of the extra time went
into the seed data — making sure every combination of answers returns
something sensible, and that the results include the struggling Circles the
current directory hides, since that's the case the whole idea turns on.
