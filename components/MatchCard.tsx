import { HomeIcon, MixIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { imageForCircle, needsGradientOverlay } from "@/lib/circleImages";
import type { MatchResult } from "@/lib/types";

function formatStarted(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function formatLabel(format: MatchResult["format"]): string {
  if (format === "in-person") return "In-person";
  if (format === "hybrid") return "Hybrid";
  return "Virtual";
}

function FormatIcon({ format }: { format: MatchResult["format"] }) {
  if (format === "in-person") return <HomeIcon width={24} height={24} />;
  if (format === "hybrid") return <MixIcon width={24} height={24} />;
  return (
    <Image src="/icons/video-on-line.png" alt="" width={24} height={24} />
  );
}

export function MatchCard({
  circle,
  requested,
  onToggleRequest,
}: {
  circle: MatchResult;
  requested: boolean;
  onToggleRequest: () => void;
}) {
  const image = imageForCircle(circle.id);

  return (
    <div className="group relative overflow-hidden rounded-lg bg-white">
      <div className="relative flex h-40 items-start justify-end overflow-hidden p-3">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        {needsGradientOverlay(image) && (
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 100%)",
            }}
          />
        )}
        <button
          type="button"
          onClick={onToggleRequest}
          title={requested ? "Click to withdraw your request" : undefined}
          className={`relative z-10 rounded-lg px-4 py-2 text-lg font-medium transition-colors ${
            requested
              ? "bg-zinc-200 text-zinc-900"
              : "bg-maroon text-white hover:bg-maroon-dark"
          }`}
        >
          {requested ? "Requested" : "Request to Join"}
        </button>
      </div>

      <div className="p-5">
        <h3 className="font-heading text-xl">{circle.name}</h3>
        <p className="mt-2 text-lg text-zinc-700">{circle.blurb}</p>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-lg text-zinc-600">
          <span className="flex items-center gap-2">
            <FormatIcon format={circle.format} />
            {formatLabel(circle.format)}
          </span>
          <span className="flex items-center gap-2">
            <Image
              src="/icons/wordpress_people.png"
              alt=""
              width={24}
              height={24}
            />
            {circle.members} members
          </span>
          <span className="flex items-center gap-2">
            <Image
              src="/icons/calendar-line.png"
              alt=""
              width={24}
              height={24}
            />
            Started {formatStarted(circle.started)}
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-lg bg-black opacity-0 transition-opacity group-hover:opacity-[0.08]" />
    </div>
  );
}
