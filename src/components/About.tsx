import { about, stats } from "@/lib/content";
import { pic } from "@/lib/img";
import { useLang } from "@/lib/lang";
import { T } from "./T";
import { LazyImg } from "./LazyImg";
import { Reveal } from "./Reveal";

export function About() {
  const { lang } = useLang();
  const s = [stats.rooms, stats.airport, stats.rating];
  return (
    <section id="about" className="scroll-mt-20 py-12 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20 lg:px-10">
        <Reveal>
          <p className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-brass-deep uppercase">
            <span aria-hidden className="h-px w-6 bg-brass" />
            <T v={about.eyebrow} />
          </p>
          <h2 className="font-display mt-2 text-[2rem] leading-tight lg:text-5xl"><T v={about.title} /></h2>
          <p className="mt-3 leading-relaxed text-cocoa"><T v={about.p1} /></p>
          <dl className="mt-7 grid grid-cols-3 divide-x divide-espresso/10 rounded-2xl bg-white py-4 ring-1 ring-espresso/5 rtl:divide-x-reverse">
            {s.map((x) => (
              <div key={x.label.en} className="px-2 text-center">
                <dt className="sr-only"><T v={x.label} /></dt>
                <dd className="font-display text-3xl text-teal">{x.value}</dd>
                <dd className="mt-0.5 text-[0.72rem] leading-tight text-cocoa"><T v={x.label} /></dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={80} className="relative">
          <div className="grid grid-cols-[1.2fr_1fr] gap-3">
            <LazyImg {...pic("detail", "(min-width: 1024px) 28vw, 55vw")} alt={lang === "ar" ? "قمرية وزخارف جصّية على واجهة صنعانية" : "Qamariya window and gypsum frieze"} width={912} height={912} className="aspect-[3/4] w-full rounded-t-full rounded-b-2xl object-cover" />
            <div className="flex flex-col gap-3 pt-10">
              <LazyImg {...pic("city", "(min-width: 1024px) 22vw, 45vw")} alt={lang === "ar" ? "أبراج صنعاء القديمة عند الفجر" : "Old Sana'a tower houses at dawn"} width={1200} height={800} className="aspect-square w-full rounded-2xl object-cover" />
              <blockquote className="font-display rounded-2xl bg-limestone p-4 text-[1.05rem] leading-snug text-espresso">“<T v={about.quote} />”</blockquote>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
