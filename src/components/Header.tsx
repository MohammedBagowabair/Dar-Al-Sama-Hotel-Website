import { useEffect, useState } from "react";
import { brand, nav, ui, a11y } from "@/lib/content";
import { useLang } from "@/lib/lang";
import { T } from "./T";
import { Icon } from "./Icon";

const links = [
  { id: "rooms", label: nav.rooms },
  { id: "experiences", label: { en: "Experiences", ar: "التجارب" } },
  { id: "amenities", label: nav.amenities },
  { id: "gallery", label: nav.gallery },
  { id: "location", label: { en: "Location", ar: "الموقع" } },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`press flex min-h-11 items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 40 40" className="size-9" aria-hidden>
        <path d="M6 37V19a14 14 0 0 1 28 0v18Z" fill="#f7f1e8" stroke="#b08a4a" strokeWidth={1.6} />
        <path d="M11 19a9 9 0 0 1 18 0Z" fill="#8e2b3a" />
        <path d="M15.5 19a4.5 4.5 0 0 1 9 0Z" fill="#d99a2b" />
        <path d="M20 10v9M13.6 12.6l6.4 6.4M26.4 12.6 20 19" stroke="#f7f1e8" strokeWidth={1.2} />
        <rect x={16} y={24} width={8} height={13} rx={4} fill="#1f5c5b" />
      </svg>
      <span className="leading-none">
        <span data-hf className="font-display block text-[1.35rem] text-espresso"><T v={brand.name} /></span>
        <span className="mt-0.5 block text-[0.6rem] tracking-[0.26em] text-brass-deep uppercase">
          <T v={{ en: "Hotel & Residences", ar: "فندق وأجنحة" }} />
        </span>
      </span>
    </a>
  );
}

export function Header({ onBook }: { onBook: () => void }) {
  const { lang, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-[background-color,box-shadow] duration-300 ${
        scrolled ? "bg-cream/92 shadow-[0_1px_0_rgba(43,30,22,0.08),0_12px_30px_-24px_rgba(43,30,22,0.5)] backdrop-blur-md" : "bg-cream/0"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-10">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="inline-flex min-h-11 min-w-11 items-center justify-center text-sm text-cocoa transition-colors hover:text-brass-deep">
              <T v={l.label} />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={a11y.langSwitch[lang]}
            className="press inline-flex min-h-11 items-center gap-1.5 rounded-full border border-espresso/15 bg-white/60 px-4 text-sm font-medium text-espresso"
            data-lang-toggle
          >
            <Icon name="globe" className="size-4" />
            <T v={nav.langLabel} />
          </button>
          <button
            type="button"
            onClick={onBook}
            className="press hidden min-h-11 items-center gap-2 rounded-full bg-espresso px-5 text-sm font-semibold text-cream lg:inline-flex"
          >
            <Icon name="wa" className="size-4" />
            <T v={ui.book} />
          </button>
        </div>
      </div>
    </header>
  );
}
