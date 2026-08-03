import type { MatchResult } from "@/lib/types";
import { MatchCard } from "./MatchCard";

export function MatchesGrid({
  matches,
  requestedIds,
  onToggleRequest,
}: {
  matches: MatchResult[];
  requestedIds: string[];
  onToggleRequest: (circle: MatchResult) => void;
}) {
  if (matches.length === 0) {
    return (
      <div>
        <h1 className="font-heading text-4xl">No matches yet</h1>
        <p className="mt-4 text-zinc-700">
          Try widening your answers — a broader goal or &quot;Either&quot; for
          meeting format will surface more Circles.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-heading text-4xl">
        {matches.length} matched {matches.length === 1 ? "Circle" : "Circles"}
        !
      </h1>
      <p className="mt-2 text-lg text-zinc-700">
        Request to join Circles that interest you.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {matches.map((circle) => (
          <MatchCard
            key={circle.id}
            circle={circle}
            requested={requestedIds.includes(circle.id)}
            onToggleRequest={() => onToggleRequest(circle)}
          />
        ))}
      </div>
    </div>
  );
}
