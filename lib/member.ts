import type { Stage } from "./types";

// The member profile is hardcoded rather than session-backed — see README.
// In production this would come from the signed-in member's session.
export const MEMBER = {
  name: "Morgan Reyes",
  // Hardcoded for this prototype. In production this comes from her profile —
  // onboarding already collects location at signup.
  city: "Vancouver",
  careerStage: "mid" as Stage,
};
