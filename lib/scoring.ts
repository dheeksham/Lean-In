import { goalLabel } from "./labels";
import type { Circle, IntakeAnswers, MatchResult } from "./types";

// Momentum = members ÷ months since the Circle started. Two numbers already
// public on a Circle page today. See README for the full rationale.
const MOMENTUM_STRONG = 5;
const MOMENTUM_STEADY = 1.5;

function monthsSince(dateStr: string, now: Date = new Date()): number {
  const started = new Date(dateStr);
  const months =
    (now.getFullYear() - started.getFullYear()) * 12 +
    (now.getMonth() - started.getMonth());
  return Math.max(months, 1);
}

// In-person only counts as reachable if it's in the member's city — an
// in-person Circle in another city isn't a worse match, it's not a match.
function isReachable(circle: Circle, memberCity: string): boolean {
  if (circle.format === "in-person") return circle.city === memberCity;
  return true;
}

function matchesFormatPreference(
  circle: Circle,
  format: IntakeAnswers["format"]
): boolean {
  if (format === "either") return true;
  if (format === "virtual") return circle.format !== "in-person";
  return circle.format !== "virtual";
}

function matchesStage(circle: Circle, stage: IntakeAnswers["stage"]): boolean {
  return circle.stage.includes(stage);
}

function hasGoalOverlap(circle: Circle, goals: IntakeAnswers["goals"]): boolean {
  return goals.some((goal) => circle.focus.includes(goal));
}

function scoreCircle(
  circle: Circle,
  answers: IntakeAnswers
): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  // Goal overlap is a hard filter by the time a Circle reaches this point —
  // see rankCircles — so it always contributes here. Career stage is also a
  // hard filter, but every surviving Circle matches it equally, so it isn't
  // scored — it couldn't change the order.
  const matchedGoals = answers.goals.filter((goal) =>
    circle.focus.includes(goal)
  );
  score += matchedGoals.length * 10;
  reasons.push(`Matches ${matchedGoals.map(goalLabel).join(" and ")}`);

  const momentum = circle.members / monthsSince(circle.started);
  if (momentum >= MOMENTUM_STRONG) {
    score += 8;
    reasons.push(`Active — ${circle.members} members and growing`);
  } else if (momentum >= MOMENTUM_STEADY) {
    score += 3;
    reasons.push(`Steady group of ${circle.members}`);
  } else {
    score -= 6;
  }

  if (circle.format === "hybrid") {
    score += 2;
    reasons.push("Meets hybrid, so it works either way");
  } else if (answers.format !== "either" && circle.format === answers.format) {
    score += 5;
    reasons.push(
      circle.format === "virtual"
        ? "Meets virtually, like you wanted"
        : "Meets in person, like you wanted"
    );
  }

  return { score, reasons };
}

export function rankCircles(
  circles: Circle[],
  answers: IntakeAnswers,
  memberCity: string
): MatchResult[] {
  return circles
    .filter(
      (circle) =>
        circle.open &&
        isReachable(circle, memberCity) &&
        matchesFormatPreference(circle, answers.format) &&
        matchesStage(circle, answers.stage) &&
        hasGoalOverlap(circle, answers.goals)
    )
    .map((circle) => {
      const { score, reasons } = scoreCircle(circle, answers);
      return { ...circle, score, reasons };
    })
    .sort((a, b) => b.score - a.score);
}
