export function PillButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-full border px-[18px] py-2.5 text-lg transition-colors ${
        selected
          ? "border-maroon bg-maroon text-cream"
          : "border-maroon/70 bg-transparent text-zinc-900 hover:bg-maroon/5"
      }`}
    >
      {label}
    </button>
  );
}
