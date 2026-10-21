import { useEffect, useState } from "react";
import { booking, rooms, ui, type Lang } from "@/lib/content";
import { useLang } from "@/lib/lang";
import { waLink } from "@/lib/wa";
import { Sheet } from "./Sheet";
import { T } from "./T";
import { Icon } from "./Icon";

const iso = (d: Date) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
const addDays = (s: string, n: number) => { const d = new Date(s + "T12:00:00"); d.setDate(d.getDate() + n); return iso(d); };
const nightsBetween = (a: string, b: string) => Math.round((new Date(b + "T12:00:00").getTime() - new Date(a + "T12:00:00").getTime()) / 86400000);
const fmt = (s: string, lang: Lang) =>
  new Date(s + "T12:00:00").toLocaleDateString(lang === "ar" ? "ar-YE" : "en-GB", { weekday: "short", day: "numeric", month: "long", year: "numeric" });

const ar = (n: number) => n.toLocaleString("ar-EG");

export function buildMessage(lang: Lang, v: { checkIn: string; checkOut: string; adults: number; children: number; room: number; name: string; note: string }) {
  const room = v.room < 0 ? booking.anyRoom[lang] : rooms.items[v.room]!.name[lang];
  const n = nightsBetween(v.checkIn, v.checkOut);
  if (lang === "ar") {
    return [
      "مرحبًا دار السماء، أودّ طلب حجز:",
      `• الوصول: ${fmt(v.checkIn, lang)}`,
      `• المغادرة: ${fmt(v.checkOut, lang)} (${ar(n)} ${n === 1 ? "ليلة" : n === 2 ? "ليلتان" : n <= 10 ? "ليالٍ" : "ليلة"})`,
      `• البالغون: ${ar(v.adults)}${v.children ? ` · الأطفال: ${ar(v.children)}` : ""}`,
      `• الغرفة: ${room}`,
      `• الاسم: ${v.name.trim()}`,
      v.note.trim() ? `• ملاحظة: ${v.note.trim()}` : "",
      "هل الغرفة متوفّرة؟ شكرًا.",
    ].filter(Boolean).join("\n");
  }
  return [
    "Hello Dar Al Sama, I'd like to request a booking:",
    `• Check-in: ${fmt(v.checkIn, lang)}`,
    `• Check-out: ${fmt(v.checkOut, lang)} (${n} night${n === 1 ? "" : "s"})`,
    `• Guests: ${v.adults} adult${v.adults === 1 ? "" : "s"}${v.children ? `, ${v.children} child${v.children === 1 ? "" : "ren"}` : ""}`,
    `• Room: ${room}`,
    `• Name: ${v.name.trim()}`,
    v.note.trim() ? `• Note: ${v.note.trim()}` : "",
    "Is it available? Thank you.",
  ].filter(Boolean).join("\n");
}

function Counter({ label, hint, value, min, max, onChange, id }: { label: typeof booking.adults; hint: typeof booking.adultsHint; value: number; min: number; max: number; onChange: (n: number) => void; id: string }) {
  const { lang } = useLang();
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 ring-1 ring-espresso/5">
      <div>
        <p className="font-semibold text-espresso"><T v={label} /></p>
        <p className="text-sm text-cocoa"><T v={hint} /></p>
      </div>
      <div className="flex items-center gap-3">
        <button type="button" disabled={value <= min} onClick={() => onChange(value - 1)} aria-label={`${booking.decrease[lang]} — ${label[lang]}`} className="press grid size-11 place-items-center rounded-full border border-espresso/20 text-espresso disabled:opacity-35" data-dec={id}>
          <Icon name="minus" />
        </button>
        <output className="w-6 text-center text-lg font-semibold tabular-nums" aria-live="polite" data-count={id}>{value}</output>
        <button type="button" disabled={value >= max} onClick={() => onChange(value + 1)} aria-label={`${booking.increase[lang]} — ${label[lang]}`} className="press grid size-11 place-items-center rounded-full border border-espresso/20 text-espresso disabled:opacity-35" data-inc={id}>
          <Icon name="plus" />
        </button>
      </div>
    </div>
  );
}

export function BookingSheet({ open, room: initialRoom, onClose }: { open: boolean; room: number; onClose: () => void }) {
  const { lang } = useLang();
  const [step, setStep] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [room, setRoom] = useState(-1);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!open) return;
    setStep(0);
    setTouched(false);
    setRoom(initialRoom);
    if (!checkIn) {
      const a = addDays(iso(new Date()), 14);
      setCheckIn(a);
      setCheckOut(addDays(a, 3));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialRoom]);

  const today = iso(new Date());
  const datesOk = !!checkIn && !!checkOut && nightsBetween(checkIn, checkOut) > 0;
  const nameOk = name.trim().length > 1;
  const canNext = step === 0 ? datesOk : step === 3 ? nameOk : true;
  const message = datesOk ? buildMessage(lang, { checkIn, checkOut, adults, children, room, name, note }) : "";
  const steps = booking.steps;
  const icons = ["calendar", "users", "bed", "user"];

  return (
    <Sheet open={open} onClose={onClose} label={booking.title[lang]} testId="booking-sheet">
      <div className="px-6 pt-2">
        <h2 className="font-display text-3xl text-espresso"><T v={booking.title} /></h2>
        <ol className="mt-4 grid grid-cols-4 gap-1.5" aria-label={booking.title[lang]}>
          {steps.map((s, i) => (
            <li key={s.en} aria-current={i === step ? "step" : undefined}>
              <span className={`block h-1 rounded-full transition-colors ${i <= step ? "bg-brass-deep" : "bg-espresso/12"}`} />
              <span className={`mt-2 flex items-center gap-1 text-[0.72rem] ${i === step ? "font-semibold text-espresso" : "text-cocoa"}`}>
                <Icon name={icons[i]!} className="size-3.5 shrink-0" />
                <T v={s} />
              </span>
            </li>
          ))}
        </ol>
        <p className="sr-only" aria-live="polite">{`${booking.stepOf[lang]} ${step + 1} ${ui.of[lang]} 4: ${steps[step]![lang]}`}</p>

        <div className="mt-6 min-h-[17rem]" data-step={step}>
          {step === 0 && (
            <div className="grid gap-3">
              <label className="block rounded-2xl bg-white p-4 ring-1 ring-espresso/5">
                <span className="text-sm font-semibold text-espresso"><T v={booking.checkIn} /></span>
                <input type="date" min={today} value={checkIn} onChange={(e) => { setCheckIn(e.target.value); if (checkOut <= e.target.value) setCheckOut(addDays(e.target.value, 1)); }} className="mt-1 block min-h-11 w-full bg-transparent text-lg text-espresso outline-none" data-check-in />
              </label>
              <label className="block rounded-2xl bg-white p-4 ring-1 ring-espresso/5">
                <span className="text-sm font-semibold text-espresso"><T v={booking.checkOut} /></span>
                <input type="date" min={checkIn ? addDays(checkIn, 1) : today} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="mt-1 block min-h-11 w-full bg-transparent text-lg text-espresso outline-none" data-check-out />
              </label>
              <p className={`text-sm ${datesOk ? "text-cocoa" : "text-ruby"}`} role="status">
                {datesOk ? `${lang === "ar" ? ar(nightsBetween(checkIn, checkOut)) : nightsBetween(checkIn, checkOut)} ${booking.nights[lang]}` : booking.invalidDates[lang]}
              </p>
            </div>
          )}
          {step === 1 && (
            <div className="grid gap-3">
              <Counter id="adults" label={booking.adults} hint={booking.adultsHint} value={adults} min={1} max={8} onChange={setAdults} />
              <Counter id="children" label={booking.children} hint={booking.childrenHint} value={children} min={0} max={6} onChange={setChildren} />
            </div>
          )}
          {step === 2 && (
            <fieldset className="grid gap-2.5">
              <legend className="sr-only"><T v={steps[2]!} /></legend>
              {[-1, 0, 1, 2].map((r) => (
                <label key={r} className={`press flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl p-4 ring-1 transition-colors ${room === r ? "bg-white ring-2 ring-brass-deep" : "bg-white/70 ring-espresso/8"}`}>
                  <input type="radio" name="room" checked={room === r} onChange={() => setRoom(r)} className="size-5 accent-[#84652f]" data-room-option={r} />
                  <span>
                    <span className="block font-semibold text-espresso">{r < 0 ? <T v={booking.anyRoom} /> : <T v={rooms.items[r]!.name} />}</span>
                    {r >= 0 && <span className="block text-sm text-cocoa"><T v={rooms.items[r]!.size} /></span>}
                  </span>
                </label>
              ))}
            </fieldset>
          )}
          {step === 3 && (
            <div className="grid gap-3">
              <label className="block rounded-2xl bg-white p-4 ring-1 ring-espresso/5">
                <span className="text-sm font-semibold text-espresso"><T v={booking.name} /></span>
                <input type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} onBlur={() => setTouched(true)} placeholder={booking.namePh[lang]} className="mt-1 block min-h-11 w-full bg-transparent text-lg text-espresso outline-none placeholder:text-cocoa/60" data-name />
              </label>
              {touched && !nameOk && <p className="text-sm text-ruby" role="alert">{booking.needName[lang]}</p>}
              <label className="block rounded-2xl bg-white p-4 ring-1 ring-espresso/5">
                <span className="text-sm font-semibold text-espresso"><T v={booking.note} /></span>
                <textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder={booking.notePh[lang]} className="mt-1 block w-full resize-none bg-transparent text-espresso outline-none placeholder:text-cocoa/60" />
              </label>
              {nameOk && (
                <div className="rounded-2xl border border-dashed border-brass/50 p-4">
                  <p className="text-xs font-semibold tracking-wide text-brass-deep uppercase"><T v={booking.summary} /></p>
                  <p className="mt-2 text-sm leading-relaxed whitespace-pre-line text-espresso" data-summary>{message}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="sticky bottom-0 -mx-6 mt-4 flex gap-2.5 bg-cream px-6 pt-3">
          {step > 0 && (
            <button type="button" onClick={() => setStep((s) => s - 1)} className="press min-h-14 rounded-full border border-espresso/20 px-6 font-semibold text-espresso" data-back>
              <T v={ui.back} />
            </button>
          )}
          {step < 3 ? (
            <button type="button" disabled={!canNext} onClick={() => setStep((s) => s + 1)} className="press min-h-14 flex-1 rounded-full bg-espresso px-6 font-semibold text-cream disabled:opacity-40" data-next>
              <T v={ui.next} />
            </button>
          ) : nameOk ? (
            <a href={waLink(message)} target="_blank" rel="noopener" className="press flex min-h-14 flex-1 items-center justify-center gap-2 rounded-full bg-wa px-6 font-semibold text-white" data-send>
              <Icon name="wa" />
              <T v={booking.send} />
            </a>
          ) : (
            <button type="button" onClick={() => setTouched(true)} aria-disabled="true" className="press flex min-h-14 flex-1 items-center justify-center gap-2 rounded-full bg-wa/45 px-6 font-semibold text-white" data-send-disabled>
              <Icon name="wa" />
              <T v={booking.send} />
            </button>
          )}
        </div>
      </div>
    </Sheet>
  );
}
