"use client";

import { useEffect, useState } from "react";
import { IntakeForm } from "@/components/IntakeForm";
import { MatchesGrid } from "@/components/MatchesGrid";
import { OnboardingShell } from "@/components/OnboardingShell";
import type {
  Goal,
  IntakeAnswers,
  JoinRequestRow,
  MatchResult,
  MeetingFormat,
  Stage,
} from "@/lib/types";

type Step = "intake" | "matches";

export default function Home() {
  const [step, setStep] = useState<Step>("intake");
  const [goals, setGoals] = useState<Goal[]>([]);
  const [stage, setStage] = useState<Stage | null>(null);
  const [format, setFormat] = useState<MeetingFormat | null>(null);

  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [loadingMatches, setLoadingMatches] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [requestedIds, setRequestedIds] = useState<string[]>([]);

  // Requests persist — reload them on mount so a refresh still shows what's pending.
  useEffect(() => {
    fetch("/api/join-requests")
      .then((res) => res.json())
      .then((data: { requests?: JoinRequestRow[] }) => {
        setRequestedIds((data.requests ?? []).map((r) => r.circle_id));
      })
      .catch(() => {
        // Non-fatal — the intake flow still works without prior requests loaded.
      });
  }, []);

  const canContinue = goals.length > 0 && !!stage && !!format;

  function toggleGoal(goal: Goal) {
    setGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  }

  async function handleShowMatches() {
    if (!canContinue || !format || !stage) return;
    setLoadingMatches(true);
    setError(null);
    try {
      const answers: IntakeAnswers = { goals, stage, format };
      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
      if (!res.ok) throw new Error("Could not load matches. Try again.");
      const data: { matches: MatchResult[] } = await res.json();
      setMatches(data.matches ?? []);
      setStep("matches");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoadingMatches(false);
    }
  }

  async function handleToggleRequest(circle: MatchResult) {
    setError(null);
    const alreadyRequested = requestedIds.includes(circle.id);
    try {
      const res = await fetch("/api/join-requests", {
        method: alreadyRequested ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ circleId: circle.id }),
      });
      if (!res.ok) {
        throw new Error(
          alreadyRequested
            ? "Could not withdraw that request. Try again."
            : "Could not send that request. Try again."
        );
      }
      setRequestedIds((prev) =>
        alreadyRequested
          ? prev.filter((id) => id !== circle.id)
          : [...prev, circle.id]
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    }
  }

  return (
    <OnboardingShell
      footer={
        step === "intake" ? (
          <button
            type="button"
            disabled={!canContinue || loadingMatches}
            onClick={handleShowMatches}
            className="rounded-md bg-maroon px-6 py-3 text-cream disabled:opacity-40"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setStep("intake")}
            className="px-6 py-3 text-black"
          >
            Back
          </button>
        )
      }
    >
      {error && (
        <p className="mb-6 rounded bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {step === "intake" && (
        <IntakeForm
          goals={goals}
          onToggleGoal={toggleGoal}
          stage={stage}
          onStageChange={setStage}
          format={format}
          onFormatChange={setFormat}
        />
      )}

      {step === "matches" && (
        <MatchesGrid
          matches={matches}
          requestedIds={requestedIds}
          onToggleRequest={handleToggleRequest}
        />
      )}
    </OnboardingShell>
  );
}
