import { useCallback, useState } from "react";
import { LangProvider } from "@/lib/lang";
import { a11y } from "@/lib/content";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Rooms } from "./components/Rooms";
import { RoomSheet } from "./components/RoomSheet";
import { BookingSheet } from "./components/Booking";
import { Lightbox } from "./components/Lightbox";
import { Amenities, BottomBar, Experiences, Faq, Footer, Gallery, Location, Reviews } from "./components/Sections";
import { T } from "./components/T";

function Page() {
  const [room, setRoom] = useState<number | null>(null);
  const [book, setBook] = useState<{ open: boolean; room: number }>({ open: false, room: -1 });
  const [photo, setPhoto] = useState<number | null>(null);
  const openBook = useCallback((r = -1) => { setRoom(null); setBook({ open: true, room: r }); }, []);
  const closeBook = useCallback(() => setBook((b) => ({ ...b, open: false })), []);
  const closeRoom = useCallback(() => setRoom(null), []);
  const closePhoto = useCallback(() => setPhoto(null), []);
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:z-[90] focus:rounded-full focus:bg-espresso focus:px-5 focus:py-3 focus:text-cream ltr:focus:left-3 rtl:focus:right-3">
        <T v={a11y.skip} />
      </a>
      <Header onBook={() => openBook()} />
      <main id="main">
        <Hero onBook={() => openBook()} />
        <About />
        <Rooms onOpen={setRoom} />
        <Experiences />
        <Amenities />
        <Reviews />
        <Gallery onOpen={setPhoto} />
        <Location />
        <Faq />
      </main>
      <Footer />
      <BottomBar onBook={() => openBook()} />
      <RoomSheet index={room} onClose={closeRoom} onBook={(r) => openBook(r)} />
      <BookingSheet open={book.open} room={book.room} onClose={closeBook} />
      <Lightbox index={photo} onClose={closePhoto} />
    </>
  );
}

export function App() {
  return (
    <LangProvider>
      <Page />
    </LangProvider>
  );
}
