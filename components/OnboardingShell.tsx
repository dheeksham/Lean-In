import type { ReactNode } from "react";

const STEPS = [
  "Welcome",
  "Find a Circle to Join",
  "Connect with your Community",
  "Build leadership skills",
  "You're in",
];

export function OnboardingShell({
  children,
  footer,
}: {
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-cream text-zinc-900">
      <header className="flex h-[50px] shrink-0 items-center justify-center border-b border-maroon px-8">
        <span className="text-lg font-semibold tracking-widest">
          LEAN <span className="underline decoration-2">IN</span> CONNECT
        </span>
      </header>

      <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
        <nav className="shrink-0 overflow-y-auto bg-maroon px-8 py-10 text-base text-cream md:w-[296px]">
          <ol className="space-y-6">
            {STEPS.map((step, i) => (
              <li key={step} className="flex items-center gap-3">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs ${
                    i === 0
                      ? "bg-cream/30"
                      : i === 1
                        ? "bg-white font-semibold text-maroon"
                        : "border border-cream/60"
                  }`}
                >
                  {i === 0 ? "✓" : i + 1}
                </span>
                <span className={i === 1 ? "font-medium" : "opacity-90"}>
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </nav>

        <main className="flex-1 overflow-y-auto px-6 py-10 md:px-12">
          {children}
        </main>
      </div>

      <footer className="flex h-[70px] shrink-0 items-center justify-end gap-4 border-t border-maroon/20 bg-cream px-6 md:px-12">
        {footer}
      </footer>
    </div>
  );
}
