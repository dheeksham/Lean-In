import { FORMAT_OPTIONS, GOAL_OPTIONS, STAGE_OPTIONS } from "@/lib/labels";
import type { Goal, MeetingFormat, Stage } from "@/lib/types";
import { PillButton } from "./PillButton";

export function IntakeForm({
  goals,
  onToggleGoal,
  stage,
  onStageChange,
  format,
  onFormatChange,
}: {
  goals: Goal[];
  onToggleGoal: (goal: Goal) => void;
  stage: Stage | null;
  onStageChange: (stage: Stage) => void;
  format: MeetingFormat | null;
  onFormatChange: (format: MeetingFormat) => void;
}) {
  return (
    <div>
      <h1 className="font-heading text-4xl">Find a Circle</h1>
      <p className="mt-4 text-lg text-zinc-700">
        Lean In Circles are small groups that meet regularly to share
        experiences, exchange advice, build confidence, and support one
        another through real conversations. We&apos;re excited for you to
        join one.
      </p>

      <h2 className="mt-10 font-heading text-2xl">
        What are you working on right now?
      </h2>
      <div className="mt-4 flex flex-wrap gap-3">
        {GOAL_OPTIONS.map((g) => (
          <PillButton
            key={g.key}
            label={g.label}
            selected={goals.includes(g.key)}
            onClick={() => onToggleGoal(g.key)}
          />
        ))}
      </div>

      <h2 className="mt-10 font-heading text-2xl">
        Where are you in your career?
      </h2>
      <div className="mt-4 flex flex-wrap gap-3">
        {STAGE_OPTIONS.map((s) => (
          <PillButton
            key={s.key}
            label={s.label}
            selected={stage === s.key}
            onClick={() => onStageChange(s.key)}
          />
        ))}
      </div>

      <h2 className="mt-10 font-heading text-2xl">How do you want to meet?</h2>
      <div className="mt-4 flex flex-wrap gap-3">
        {FORMAT_OPTIONS.map((f) => (
          <PillButton
            key={f.key}
            label={f.label}
            selected={format === f.key}
            onClick={() => onFormatChange(f.key)}
          />
        ))}
      </div>
    </div>
  );
}
