import type { ReactNode } from "react";
import type { L } from "@/lib/content";
import { T } from "./T";

export function SectionHead({ eyebrow, title, text, action }: { eyebrow: L; title: L; text?: L; action?: ReactNode }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 px-6 lg:mb-10 lg:px-0">
      <div className="max-w-2xl">
        <p className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-brass-deep uppercase">
          <span aria-hidden className="h-px w-6 bg-brass" />
          <T v={eyebrow} />
        </p>
        <h2 className="font-display mt-2 text-[2rem] leading-tight text-espresso lg:text-5xl">
          <T v={title} />
        </h2>
        {text && (
          <p className="mt-2 text-[0.95rem] leading-relaxed text-cocoa lg:mt-4 lg:text-base">
            <T v={text} />
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

/** Dots that follow a horizontal rail (works in RTL, where scrollLeft is negative). */
export function RailDots({ count, active, label }: { count: number; active: number; label: string }) {
  return (
    <div className="mt-4 flex justify-center gap-1.5 lg:hidden" aria-label={label} role="status">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-brass-deep" : "w-1.5 bg-espresso/20"}`} />
      ))}
    </div>
  );
}

export function useRailIndex(count: number) {
  return (el: HTMLElement | null, set: (n: number) => void) => {
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    if (!first) return;
    const step = first.getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap || "0");
    set(Math.min(count - 1, Math.round(Math.abs(el.scrollLeft) / step)));
  };
}
