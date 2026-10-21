import type { Lang } from "./content";

// The demo hotel's own phone number is fictional, so bookings go to this WhatsApp number.
export const WHATSAPP = "601151198497";
export const PHONE_TEL = "+601151198497";
export const MAP_URL = "https://www.google.com/maps/search/?api=1&query=Old+City+of+Sana%27a%2C+Yemen";
export const waLink = (text: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

export const waGeneral: Record<Lang, string> = {
  ar: "مرحبًا دار السماء، أودّ الاستفسار عن توفّر الغرف.",
  en: "Hello Dar Al Sama, I'd like to ask about room availability.",
};
export const waRoom = (room: string, lang: Lang) =>
  lang === "ar" ? `مرحبًا دار السماء، أودّ طلب «${room}». هل هي متوفّرة؟` : `Hello Dar Al Sama, I'd like to request the ${room}. Is it available?`;
