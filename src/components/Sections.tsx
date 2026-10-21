import { useRef, useState } from "react";
import { amenities, experiences, faq, footer, gallery, location, testimonials, ui, brand, nav } from "@/lib/content";
import { pic } from "@/lib/img";
import { useLang } from "@/lib/lang";
import { MAP_URL, PHONE_TEL, waGeneral, waLink } from "@/lib/wa";
import { T } from "./T";
import { Icon } from "./Icon";
import { LazyImg } from "./LazyImg";
import { Reveal } from "./Reveal";
import { RailDots, SectionHead, useRailIndex } from "./Section";
import { Logo } from "./Header";
import { Qamariya } from "./Qamariya";

export function Experiences() {
  const { lang } = useLang();
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const track = useRailIndex(experiences.items.length);
  return (
    <section id="experiences" className="scroll-mt-20 bg-limestone py-14 lg:py-24">
      <div className="mx-auto max-w-7xl lg:px-10">
        <SectionHead eyebrow={experiences.eyebrow} title={experiences.title} />
        <div ref={rail} onScroll={() => track(rail.current, setActive)} className="rail scroll-px-6 gap-3 px-6 lg:gap-6 lg:px-0" data-experiences-rail>
          {experiences.items.map((x, i) => (
            <article key={x.name.en} className="relative isolate aspect-[9/14] w-[68%] overflow-hidden rounded-[1.6rem] bg-espresso sm:w-[42%] lg:w-[calc((100%-4.5rem)/4)]">
              <LazyImg {...pic(x.img, "(min-width: 1024px) 22vw, 68vw")} alt={x.name[lang]} width={800} height={800} className="absolute inset-0 -z-10 size-full object-cover" />
              <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-espresso/90 via-espresso/25 to-transparent" />
              <div className="flex gap-1 p-3" aria-hidden>
                {experiences.items.map((_, k) => (
                  <span key={k} className={`h-0.5 flex-1 rounded-full ${k <= i ? "bg-cream" : "bg-cream/35"}`} />
                ))}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
                <p className="text-[0.7rem] font-medium tracking-[0.14em] text-saffron uppercase"><T v={x.tag} /></p>
                <h3 className="font-display mt-1.5 text-[1.65rem] leading-tight"><T v={x.name} /></h3>
                <p className="mt-1.5 text-sm leading-relaxed text-cream/85"><T v={x.text} /></p>
              </div>
            </article>
          ))}
        </div>
        <RailDots count={experiences.items.length} active={active} label={`${active + 1}/${experiences.items.length}`} />
      </div>
    </section>
  );
}

const amenityIcons = ["pool", "spa", "wifi", "car", "bell", "dumbbell", "parking", "desk"];

export function Amenities() {
  return (
    <section id="amenities" className="scroll-mt-20 py-14 lg:py-24">
      <div className="mx-auto max-w-7xl lg:px-10">
        <SectionHead eyebrow={amenities.eyebrow} title={amenities.title} />
        <ul className="grid grid-cols-4 gap-x-2 gap-y-5 px-5 lg:grid-cols-8 lg:gap-6 lg:px-0">
          {amenities.items.map((a, i) => (
            <li key={a.name.en} className="text-center">
              <Reveal delay={i * 40}>
                <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-white text-teal shadow-[0_10px_24px_-18px_rgba(43,30,22,0.6)] ring-1 ring-espresso/5 lg:size-16">
                  <Icon name={amenityIcons[i]!} className="size-6" />
                </span>
                <span className="mt-2 block text-[0.78rem] leading-snug font-medium text-espresso"><T v={a.name} /></span>
                <span className="mt-0.5 hidden text-xs text-cocoa lg:block"><T v={a.text} /></span>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Reviews() {
  const { lang } = useLang();
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const track = useRailIndex(testimonials.items.length);
  return (
    <section className="bg-white/60 py-14 lg:py-24">
      <div className="mx-auto max-w-7xl lg:px-10">
        <SectionHead
          eyebrow={testimonials.eyebrow}
          title={testimonials.title}
          text={ui.reviewsScore}
        />
        <div ref={rail} onScroll={() => track(rail.current, setActive)} className="rail scroll-px-6 gap-3 px-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:px-0">
          {testimonials.items.map((t) => (
            <figure key={t.name} className="flex w-[86%] flex-col rounded-[1.6rem] bg-cream p-6 ring-1 ring-espresso/6 lg:w-auto">
              <div className="flex gap-0.5 text-saffron" role="img" aria-label="5/5">
                {Array.from({ length: 5 }, (_, k) => <Icon key={k} name="star" className="size-4 fill-current" />)}
              </div>
              <blockquote className="font-display mt-4 flex-1 text-[1.35rem] leading-snug text-espresso">“<T v={t.quote} />”</blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="block font-semibold text-espresso">{t.name}</span>
                <span className="text-cocoa"><T v={t.role} /></span>
              </figcaption>
            </figure>
          ))}
        </div>
        <RailDots count={testimonials.items.length} active={active} label={`${active + 1}/${testimonials.items.length} ${lang === "ar" ? "" : ""}`.trim()} />
      </div>
    </section>
  );
}

export const galleryShots = ["hero", "detail", "coffee", "spa", "dining", "city"];

export function Gallery({ onOpen }: { onOpen: (i: number) => void }) {
  const { lang } = useLang();
  return (
    <section id="gallery" className="scroll-mt-20 py-14 lg:py-24">
      <div className="mx-auto max-w-7xl lg:px-10">
        <SectionHead eyebrow={gallery.eyebrow} title={gallery.title} text={gallery.text} />
        <div className="grid grid-cols-2 gap-2 px-4 lg:grid-cols-4 lg:gap-4 lg:px-0">
          {galleryShots.map((s, i) => (
            <button
              key={s}
              type="button"
              onClick={() => onOpen(i)}
              aria-label={`${ui.openPhoto[lang]}: ${gallery.captions[i]![lang]}`}
              className={`press group relative overflow-hidden rounded-2xl bg-sandstone ${i === 0 ? "col-span-2 aspect-[16/10] lg:row-span-2 lg:aspect-auto" : i === 5 ? "col-span-2 aspect-[16/9] lg:col-span-1 lg:aspect-square" : "aspect-square"}`}
              data-gallery-item={i}
            >
              <LazyImg {...pic(s, i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw")} alt={gallery.captions[i]![lang]} width={800} height={800} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute bottom-2 grid size-9 place-items-center rounded-full bg-cream/85 text-espresso ltr:right-2 rtl:left-2" aria-hidden>
                <Icon name="expand" className="size-4" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Location() {
  return (
    <section id="location" className="scroll-mt-20 bg-limestone py-14 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10">
        <div>
          <SectionHead eyebrow={location.eyebrow} title={location.title} />
          <p className="flex items-start gap-2 px-6 text-cocoa lg:px-0">
            <Icon name="pin" className="mt-0.5 size-5 shrink-0 text-ruby" />
            <T v={{ en: "Al-Qi'yah Street, Old Sana'a, Yemen", ar: "شارع القِيعة، صنعاء القديمة، اليمن" }} />
          </p>
          <ul className="mt-5 divide-y divide-espresso/10 px-6 lg:px-0">
            {location.distances.map((d) => (
              <li key={d.place.en} className="flex min-h-12 items-center justify-between gap-4 text-sm">
                <span className="font-medium text-espresso"><T v={d.place} /></span>
                <span className="text-cocoa"><T v={d.time} /></span>
              </li>
            ))}
          </ul>
          <div className="px-6 lg:px-0">
            <a href={MAP_URL} target="_blank" rel="noopener" className="press mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-espresso px-6 text-sm font-semibold text-cream">
              <Icon name="pin" className="size-4" />
              <T v={location.open} />
            </a>
          </div>
        </div>
        <a href={MAP_URL} target="_blank" rel="noopener" aria-label={location.open.en} className="press relative mx-6 block aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-[#ece0cc] ring-1 ring-espresso/8 lg:mx-0">
          <svg viewBox="0 0 400 300" className="size-full" aria-hidden>
            <rect width="400" height="300" fill="#ece0cc" />
            <g fill="none" stroke="#fbf7f0" strokeLinecap="round">
              <path d="M-10 210C80 190 120 120 210 130s150 60 210 40" strokeWidth="14" />
              <path d="M60 -10c20 90 10 160 40 320M300 -10c-30 100-10 190-60 320M-10 70c120 20 260-10 420 20" strokeWidth="7" />
              <path d="M140 0c10 60 50 90 40 150s30 100 20 160M0 140c60-10 110 20 180 0s140-40 230-20" strokeWidth="4" />
            </g>
            <g fill="#e2d3bb">
              {Array.from({ length: 34 }, (_, i) => (
                <rect key={i} x={(i * 53) % 380 + 6} y={((i * 37) % 260) + 10} width={14 + (i % 3) * 6} height={12 + (i % 4) * 5} rx="2" />
              ))}
            </g>
            <path d="M120 0v300M0 250h400" stroke="#d6c4a6" strokeDasharray="3 6" />
          </svg>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
            <span className="grid size-14 place-items-center rounded-full rounded-br-none bg-ruby text-cream shadow-lg [transform:rotate(45deg)]">
              <span className="[transform:rotate(-45deg)]"><Icon name="pin" className="size-6" /></span>
            </span>
          </span>
          <span className="absolute bottom-3 rounded-full bg-cream/90 px-3 py-1.5 text-xs font-semibold text-espresso ltr:left-3 rtl:right-3"><T v={brand.name} /></span>
        </a>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="py-14 lg:py-24">
      <div className="mx-auto max-w-3xl lg:px-10">
        <SectionHead eyebrow={faq.eyebrow} title={faq.title} />
        <div className="mx-4 divide-y divide-espresso/10 rounded-[1.5rem] bg-white px-2 ring-1 ring-espresso/5 lg:mx-0">
          {faq.items.map((f) => (
            <details key={f.q.en} className="group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-3 py-3 font-semibold text-espresso">
                <T v={f.q} />
                <span className="faq-icon grid size-8 shrink-0 place-items-center rounded-full bg-cream text-brass-deep transition-transform duration-300">
                  <Icon name="plus" className="size-4" />
                </span>
              </summary>
              <p className="px-3 pb-4 text-[0.95rem] leading-relaxed text-cocoa"><T v={f.a} /></p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { lang } = useLang();
  const year = 2026;
  return (
    <footer className="relative overflow-hidden bg-espresso pt-14 pb-[calc(7rem+env(safe-area-inset-bottom))] text-cream lg:pb-12">
      <Qamariya className="pointer-events-none absolute -top-2 left-1/2 w-[34rem] max-w-none -translate-x-1/2 opacity-[0.07]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-10">
        <div>
          <div className="[&_*]:!text-cream [&_.text-brass-deep]:!text-saffron"><Logo /></div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/75"><T v={footer.blurb} /></p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-saffron uppercase"><T v={footer.links} /></p>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 text-sm lg:grid-cols-1">
            {[["rooms", nav.rooms], ["experiences", { en: "Experiences", ar: "التجارب" }], ["amenities", nav.amenities], ["gallery", nav.gallery], ["location", { en: "Location", ar: "الموقع" }]].map(([id, l]) => (
              <li key={id as string}><a href={`#${id}`} className="inline-flex min-h-11 min-w-11 items-center text-cream/80 hover:text-cream"><T v={l as typeof nav.rooms} /></a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-saffron uppercase"><T v={footer.reach} /></p>
          <ul className="mt-3 text-sm">
            <li><a href={waLink(waGeneral[lang])} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-2 text-cream/80 hover:text-cream"><Icon name="wa" className="size-4" /> WhatsApp</a></li>
            <li><a href={`tel:${PHONE_TEL}`} className="inline-flex min-h-11 items-center gap-2 text-cream/80 hover:text-cream" dir="ltr"><Icon name="phone" className="size-4" /> +60 11-5119 8497</a></li>
            <li className="flex min-h-11 items-center gap-2 text-cream/80"><Icon name="pin" className="size-4" /> <T v={{ en: "Old Sana'a, Yemen", ar: "صنعاء القديمة، اليمن" }} /></li>
          </ul>
        </div>
      </div>
      <div className="relative mx-auto mt-10 max-w-7xl border-t border-cream/12 px-6 pt-5 text-xs text-cream/65 lg:px-10">
        <p>© {year} <T v={brand.full} />. <T v={footer.rights} /></p>
        <p className="mt-1.5"><T v={footer.note} /></p>
      </div>
    </footer>
  );
}

export function BottomBar({ onBook }: { onBook: () => void }) {
  return (
    <nav
      className="wa-bar fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
      aria-label="Quick actions"
    >
      <div className="mx-auto flex max-w-md items-stretch gap-1.5 rounded-[1.4rem] bg-white/92 p-1.5 shadow-[0_18px_40px_-16px_rgba(43,30,22,0.45)] ring-1 ring-espresso/8 backdrop-blur-md">
        <button type="button" onClick={onBook} className="press flex min-h-12 flex-1 items-center justify-center gap-2 rounded-[1rem] bg-wa px-4 text-[0.95rem] font-semibold text-white" data-bar-book>
          <Icon name="wa" />
          <T v={ui.book} />
        </button>
        <a href={`tel:${PHONE_TEL}`} className="press flex min-h-12 w-16 flex-col items-center justify-center gap-0.5 rounded-[1rem] text-[0.7rem] font-medium text-espresso" data-bar-call>
          <Icon name="phone" />
          <T v={ui.call} />
        </a>
        <a href={MAP_URL} target="_blank" rel="noopener" className="press flex min-h-12 w-16 flex-col items-center justify-center gap-0.5 rounded-[1rem] text-[0.7rem] font-medium text-espresso" data-bar-map>
          <Icon name="pin" />
          <T v={ui.map} />
        </a>
      </div>
    </nav>
  );
}
