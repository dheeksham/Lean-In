## Find Your Circle
*Live demo:* https://lean-in-eight.vercel.app/

*Repo:* https://github.com/dheeksham/Lean-In

*Stack:* Next.js, TypeScript, Supabase, deployed on Vercel.

### Chosen Problem
Lean In Connect's promise is on the 1st onboarding screen: Women in Circles are nearly 2x as likely to get promoted or receive a raise. However, that outcome only occurs once a woman is in the *right* Circle which matches what she's working on and is actually active. While I was signing up as a new member, I noticed that Step 2 is called "Find a Circle to Join," but it only explains what Circles are and shows a screenshot of the directory. This screen is not actionable and the actual finding gets deferred to a checklist item after onboarding ends. The directory itself is thousands of Circles across 183 countries, many with a single member, not actively meeting, and no signal of which ones fit the user's goals. Therefore, this is the discovery gap that I built for.

### What I built
1. **Intake** questions: What the onboardee is working on, where they are in their career, and how they would like to meet.
2. **Matches**: A short ranked list instead of a directory catered towards the user's input preferences.

The user finishes onboarding already matched, with a request in flight, instead of with a to-do item and Step 2 marks itself complete.

### Where I focused, and why
I went deeper on the front end and on the product thinking behind the matching, because that's where my strengths lie and where I think the
biggest gap in the current experience is.

###Technical Process
- Platform Audit, Competitive Analysis, Design exploration ([Figma Working File](https://www.figma.com/design/2DYXJjvxQI9qN0rg2Rr0Oe/Lean-In?node-id=0-1&t=3SkulXIediH1jLNI-1)), Building in Claude Code
- Maintained branding and onbarding structure, changed typography and tightened layout 

### What's Real vs. Mocked
**Real:**
Circles live in a Postgres table (Supabase), not in the bundle. Matching runs server-side. The client sends their answers and receives a ranked list; it never sees the scoring weights. Join requests persist - Refresh the page and their pending requests are still there.

**Mocked:**
The member profile is hardcoded rather than session-backed as I prioritized spending time on matching than on a login screen. In production, this reads from the session. Circle photos are placeholders and the seed data is 16 Circles I wrote, sized so every combination of answers returns at least two results. However, 2 Circle fields don't exist yet, explanation below.

### The data for matching isn't there yet
Circle creation collects name, description, location, company affiliation, whether it's open to new members, and how it meets. There is no structure about *what* a Circle is for or *who* it's for. That's why the directory can be browsed but not matched. Filtering by "topic" means searching description text, which is why a user ends up guessing. Therefore, this prototype proposes two new fields at Circle creation: Focus and Stage.

### How the matching works

Each Circle is scored against her three answers:

| Signal | Weight | Why |
|---|---|---|
| Goal overlap | +10 each | The strongest predictor of fit |
| Momentum | +8 / +3 / −6 | A Circle that hasn't grown can't deliver the outcome |
| Format match | +5, or +2 for hybrid | Hybrid satisfies either preference |

**Momentum** is members divided by months since the Circle started, both numbers already public. A Circle started two months ago with 50 members is obviously alive. One started eight months ago with 1 member is obviously not, and it shouldn't outrank a thriving Circle just because its topic matches. New Circles aren't punished for being new: a Circle started last month with 2 members scores as steady, not stalled. The ones that sink are the ones that have had time and haven't grown.

### Tradeoffs

- **Three questions** A longer intake would match better but makes onboarding extensive.
- **In-person is filtered by city, not ranked down by distance.** An in-person Circle in another city isn't a worse match, it's not a match.
- **Struggling Circles still appear.** Hiding them would be cleaner, but a new Circle looking for founding members is a real opportunity and the user needs to know that's what she's choosing - which the member count and start date signify.

### What I'd build next

- **Auth:** so the profile is real and requests belong to an account.
- **The Circle Leader's view:** A leader inbox with accept/decline for join requests.
- **Learning from outcomes.** The weights are currently my own judgment of what is important. With real data on who joined and who was still showing up after three meetings, they should be fit to retention rather than guessed.
