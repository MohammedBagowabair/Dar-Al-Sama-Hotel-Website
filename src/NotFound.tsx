import { LangProvider } from "@/lib/lang";
import { notFound } from "@/lib/content";
import { T } from "./components/T";
import { Qamariya } from "./components/Qamariya";
import { Logo } from "./components/Header";

export function NotFoundApp() {
  return (
    <LangProvider>
      <main className="grid min-h-[100svh] place-items-center bg-cream px-6 text-center">
        <div className="max-w-sm">
          <div className="flex justify-center"><Logo /></div>
          <Qamariya className="mx-auto mt-10 w-56" />
          <p className="font-display mt-6 text-6xl text-brass-deep">404</p>
          <h1 className="font-display mt-2 text-3xl text-espresso"><T v={notFound.title} /></h1>
          <p className="mt-3 text-cocoa"><T v={notFound.text} /></p>
          <a href={import.meta.env.BASE_URL} className="press mt-8 inline-flex min-h-12 items-center rounded-full bg-espresso px-7 font-semibold text-cream"><T v={notFound.home} /></a>
        </div>
      </main>
    </LangProvider>
  );
}
