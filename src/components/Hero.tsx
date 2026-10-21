import { heroCopy } from "@/lib/content";
import { archAvif, archSizes, archWebp } from "@/lib/img";
import { T } from "./T";
import { Qamariya } from "./Qamariya";

const BASE = import.meta.env.BASE_URL;

export function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section id="top" className="relative overflow-hidden bg-[radial-gradient(120%_70%_at_50%_0%,#fbf7f0_0%,#f7f1e8_55%,#efe5d6_100%)]">
      <div className="mx-auto grid max-w-7xl gap-7 px-6 pt-[calc(4.5rem+env(safe-area-inset-top))] pb-10 lg:grid-cols-[1fr_minmax(0,36rem)] lg:items-center lg:gap-20 lg:px-10 lg:pt-32 lg:pb-24">
        <div className="relative mx-auto w-full max-w-[26rem] lg:order-2 lg:max-w-none">
          <div aria-hidden className="absolute -inset-x-2 -top-2 bottom-[-0.5rem] rounded-t-full border border-brass/45" />
          <div className="relative h-[min(40svh,24rem)] overflow-hidden rounded-t-full bg-sandstone shadow-[0_40px_70px_-45px_rgba(43,30,22,0.55)] lg:h-[min(76vh,44rem)]">
            <picture>
              <source type="image/avif" srcSet={archAvif} sizes={archSizes} />
              <img
                src={`${BASE}img/arch-720.webp`}
                srcSet={archWebp}
                sizes={archSizes}
                alt=""
                aria-hidden
                width={870}
                height={1088}
                fetchPriority="high"
                decoding="async"
                className="size-full object-cover"
              />
            </picture>
          </div>
        </div>

        <div className="text-center lg:order-1 lg:text-start">
          <Qamariya className="glass-glow mx-auto mb-2 w-14 lg:mx-0 lg:mb-5 lg:w-24" />
          <p className="text-xs font-medium tracking-[0.22em] text-brass-deep uppercase">
            <T v={heroCopy.eyebrow} />
          </p>
          <h1 data-hf className="font-display mt-4 text-[2.55rem] leading-[1.2] text-espresso sm:text-6xl lg:text-[4.6rem] lg:leading-[1.25]">
            <T v={heroCopy.title} />
          </h1>
          <p className="mx-auto mt-3 max-w-[22rem] text-[0.98rem] leading-relaxed text-cocoa lg:mx-0 lg:mt-6 lg:max-w-md lg:text-lg">
            <T v={heroCopy.line} />
          </p>
          <button
            type="button"
            onClick={onBook}
            className="press mt-6 inline-flex min-h-14 w-full max-w-[22rem] items-center justify-center gap-2 rounded-full bg-espresso px-8 text-base font-semibold text-cream shadow-[0_16px_30px_-18px_rgba(43,30,22,0.9)] lg:mt-9 lg:w-auto"
            data-hero-cta
          >
            <T v={heroCopy.cta} />
          </button>
          <ul className="mt-6 hidden flex-wrap gap-x-6 gap-y-2 text-sm text-cocoa lg:flex">
            {heroCopy.facts.map((f) => (
              <li key={f.en} className="flex items-center gap-2">
                <span aria-hidden className="size-1.5 rotate-45 bg-brass" />
                <T v={f} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
