import { useRef, useState } from "react";
import { rooms, ui } from "@/lib/content";
import { pic } from "@/lib/img";
import { useLang } from "@/lib/lang";
import { T } from "./T";
import { Icon } from "./Icon";
import { LazyImg } from "./LazyImg";
import { RailDots, SectionHead, useRailIndex } from "./Section";

export const roomPhotos = [
  ["detail", "city", "coffee"],
  ["suite", "spa", "majlis"],
  ["majlis", "dining", "city"],
];

export function Rooms({ onOpen }: { onOpen: (i: number) => void }) {
  const { lang } = useLang();
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const track = useRailIndex(rooms.items.length);
  return (
    <section id="rooms" className="scroll-mt-20 py-14 lg:py-24">
      <div className="mx-auto max-w-7xl lg:px-10">
        <SectionHead eyebrow={rooms.eyebrow} title={rooms.title} text={rooms.text} />
        <div
          ref={rail}
          onScroll={() => track(rail.current, setActive)}
          className="rail scroll-px-6 gap-3 px-6 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:px-0"
          data-rooms-rail
        >
          {rooms.items.map((room, i) => (
            <article key={room.name.en} className="w-[calc(100%-1.5rem)] lg:w-auto">
              <button
                type="button"
                onClick={() => onOpen(i)}
                className="press group block w-full overflow-hidden rounded-[1.6rem] bg-white text-start shadow-[0_24px_50px_-36px_rgba(43,30,22,0.55)] ring-1 ring-espresso/5"
                aria-label={`${ui.viewRoom[lang]}: ${room.name[lang]}`}
                data-room-card={i}
              >
                <div className="relative aspect-[4/3.6] overflow-hidden bg-sandstone">
                  <LazyImg
                    {...pic(roomPhotos[i]![0]!, "(min-width: 1024px) 30vw, 92vw")}
                    alt={room.name[lang]}
                    width={1200}
                    height={800}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-3 rounded-full bg-cream/90 px-3 py-1.5 text-xs font-medium text-espresso ltr:left-3 rtl:right-3">
                    <T v={room.size} />
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-2xl text-espresso"><T v={room.name} /></h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-cocoa"><T v={room.text} /></p>
                  <span className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-teal">
                    <T v={ui.viewRoom} />
                    <Icon name="chevron" className="size-4 rtl:rotate-180" />
                  </span>
                </div>
              </button>
            </article>
          ))}
        </div>
        <RailDots count={rooms.items.length} active={active} label={`${rooms.swipe[lang]} ${active + 1}/${rooms.items.length}`} />
      </div>
    </section>
  );
}
