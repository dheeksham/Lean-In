import type { Goal, MeetingFormat, Stage } from "./types";

export const GOAL_OPTIONS: { key: Goal; label: string }[] = [
  { key: "negotiation", label: "Negotiation and Pay" },
  { key: "leadership", label: "Leadership and Management" },
  { key: "transition", label: "Career Transition" },
  { key: "confidence", label: "Confidence and Visibility" },
];

export const STAGE_OPTIONS: { key: Stage; label: string }[] = [
  { key: "early", label: "Early Career (0-5 years)" },
  { key: "mid", label: "Mid Level (5-10 years)" },
  { key: "senior", label: "Senior (10+ years)" },
];

export const FORMAT_OPTIONS: { key: MeetingFormat; label: string }[] = [
  { key: "virtual", label: "Virtually" },
  { key: "in-person", label: "In-Person" },
  { key: "either", label: "Either" },
];

export function goalLabel(key: string): string {
  return GOAL_OPTIONS.find((g) => g.key === key)?.label ?? key;
}
