import { useRef, useState } from "react";
import { rooms, ui } from "@/lib/content";
import { pic } from "@/lib/img";
import { useLang } from "@/lib/lang";
import { waLink, waRoom } from "@/lib/wa";
import { Sheet } from "./Sheet";
import { T } from "./T";
import { Icon } from "./Icon";
import { roomPhotos } from "./Rooms";
import { RailDots, useRailIndex } from "./Section";

export function RoomSheet({ index, onClose, onBook }: { index: number | null; onClose: () => void; onBook: (room: number) => void }) {
  const { lang } = useLang();
  const [shown, setShown] = useState(0);
  const last = useRef(0);
  if (index !== null) last.current = index;
  const i = index ?? last.current;
  const room = rooms.items[i]!;
  const photos = roomPhotos[i]!;
  const rail = useRef<HTMLDivElement>(null);
  const track = useRailIndex(photos.length);
  return (
    <Sheet open={index !== null} onClose={onClose} label={room.name[lang]} testId="room-sheet">
      <div ref={rail} onScroll={() => track(rail.current, setShown)} className="rail" data-room-gallery>
        {photos.map((p, k) => (
          <div key={p + k} className="w-full">
            <img
              {...pic(p, "(min-width: 1024px) 36rem, 100vw")}
              alt={`${room.name[lang]} — ${ui.photo[lang]} ${k + 1}`}
              width={1200}
              height={800}
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
              draggable={false}
            />
          </div>
        ))}
      </div>
      <RailDots count={photos.length} active={shown} label={`${ui.photo[lang]} ${shown + 1} ${ui.of[lang]} ${photos.length}`} />
      <div className="px-6 pt-4">
        <p className="text-xs font-medium tracking-[0.2em] text-brass-deep uppercase"><T v={room.size} /></p>
        <h2 className="font-display mt-1 text-3xl text-espresso"><T v={room.name} /></h2>
        <p className="mt-2 leading-relaxed text-cocoa"><T v={room.text} /></p>
        <h3 className="mt-6 text-sm font-semibold text-espresso"><T v={ui.features} /></h3>
        <ul className="mt-3 grid grid-cols-2 gap-2">
          {[...room.tags, { en: "Breakfast included", ar: "الإفطار مشمول" }, { en: "Hammam access", ar: "دخول الحمّام" }, { en: "Airport transfer", ar: "توصيل المطار" }].map((t) => (
            <li key={t.en} className="flex min-h-11 items-center gap-2 rounded-xl bg-white px-3 text-sm text-espresso ring-1 ring-espresso/5">
              <span aria-hidden className="size-1.5 shrink-0 rotate-45 bg-saffron" />
              <T v={t} />
            </li>
          ))}
        </ul>
        <div className="mt-6 grid gap-2.5">
          <a
            href={waLink(waRoom(room.name[lang], lang))}
            target="_blank"
            rel="noopener"
            className="press flex min-h-14 items-center justify-center gap-2 rounded-full bg-wa px-6 font-semibold text-white"
            data-request-room
          >
            <Icon name="wa" />
            <T v={ui.requestRoom} />
          </a>
          <button type="button" onClick={() => onBook(i)} className="press flex min-h-12 items-center justify-center gap-2 rounded-full border border-espresso/20 px-6 text-sm font-semibold text-espresso">
            <Icon name="calendar" className="size-4" />
            <T v={ui.bookDates} />
          </button>
        </div>
      </div>
    </Sheet>
  );
}
