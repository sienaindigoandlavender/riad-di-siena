export const dynamic = 'force-dynamic';

import Link from "next/link";
import { getSections, getList, getHero } from "@/lib/data";
import KinfolkTile from "@/components/KinfolkTile";

export default async function Home() {
  const [sections, testimonials, beyondTheWalls, douariaHero] = await Promise.all([
    getSections("home"),
    getList("testimonials"),
    getList("beyond_the_walls"),
    getHero("douaria_hero"),
  ]);

  const hero = sections["hero"];
  const filter = sections["filter"];
  const quote = testimonials[0];

  // Lead the "Beyond the Walls" grid with The Douaria (the annex), then the rest.
  const douariaTile = douariaHero?.Image_URL
    ? [{
        Property_ID: "the-douaria",
        Name: "The Douaria",
        Tagline: "The annex, a few steps away",
        Image_URL: douariaHero.Image_URL,
        Link: "/the-douaria",
      }]
    : [];
  const rest = beyondTheWalls.filter((p: any) => !/douaria/i.test(p.Name || ""));
  const walls = [...douariaTile, ...rest];

  return (
    <main className="min-h-screen bg-[hsl(var(--background))]">

      {/* ══════════════════════════════════════════════════
          HERO — one still image, the name, one quiet line.
          ══════════════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[640px] overflow-hidden bg-[hsl(var(--sand))]">
        {hero?.Image_URL && (
          <>
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${hero.Image_URL})` }} />
            <img src={hero.Image_URL} alt="Riad di Siena, an 18th-century house in the Marrakech medina" className="sr-only" aria-hidden="true" />
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/20" />

        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-10 lg:px-14 pb-16 md:pb-24 lg:pb-28">
          <div className="max-w-4xl">
            <h1 className="font-display text-white font-medium text-[clamp(2.8rem,7.5vw,6rem)] tracking-[-0.025em] leading-[0.92]">
              Welcome home.
            </h1>
            <p className="text-white/85 text-lg md:text-2xl font-light leading-relaxed max-w-2xl mt-6">
              An 18th-century house in the heart of the medina. Old walls, deep quiet,
              genuine care.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          DYAFA — the one thing that makes us different.
          Copy from the Riad constitution (§12–13).
          ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden px-6 md:px-10 lg:px-14 py-28 md:py-48">
        {/* Arabic watermark — ضيافة (dyafa), faint, read over */}
        <span
          aria-hidden="true"
          dir="rtl"
          className="pointer-events-none select-none absolute inset-0 flex items-center justify-center text-[hsl(var(--foreground))]/[0.05] leading-none"
          style={{ fontFamily: "'Amiri', serif", fontSize: "clamp(9rem, 26vw, 26rem)" }}
        >
          ضيافة
        </span>
        <div className="relative z-10 max-w-3xl md:ml-[8%]">
          <h2 className="font-display text-[clamp(1.6rem,3.6vw,2.9rem)] font-medium tracking-[-0.02em] leading-[1.12] mb-8">
            There is an old Arabic word for the way a guest is received: dyafa.
          </h2>
          <p className="text-lg md:text-xl leading-loose text-foreground/75 max-w-2xl">
            Born in the desert, where taking in a weary traveler was a sacred duty, it
            lives on in Moroccan life as a point of honor. When you cross our threshold
            you are not a customer to be attended to, but a guest to be cared for: met
            with a hot glass of tea, a room prepared with devotion, and the ease of
            knowing you are held by a house that takes real pride in your comfort.
          </p>
          <Link
            href="/philosophy"
            className="inline-block mt-10 text-[11px] tracking-[0.16em] uppercase border-b border-foreground pb-1 hover:text-[#C2410C] hover:border-[#C2410C] transition-colors"
          >
            Our philosophy →
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          BEYOND THE WALLS — where the sanctuary continues.
          ══════════════════════════════════════════════════ */}
      {walls.length > 0 && (
        <section className="px-6 md:px-10 lg:px-14 py-20 md:py-28 bg-[hsl(var(--secondary))]">
          <div className="max-w-7xl mx-auto">
            <Link href="/beyond-the-walls" className="group block mb-10 md:mb-12">
              <p className="text-[11px] tracking-[0.28em] uppercase text-foreground/40 mb-3">Beyond the Walls</p>
              <h2 className="font-display text-xl md:text-2xl font-medium tracking-[-0.01em] text-foreground/85 group-hover:text-[#C2410C] transition-colors">
                Where the sanctuary continues.{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </h2>
            </Link>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {walls.map((p: any) => (
                <KinfolkTile
                  key={p.Property_ID || p.Name}
                  href={p.Link || "#"}
                  image={p.Image_URL}
                  kicker={p.Location || undefined}
                  title={p.Name}
                  sub={p.Tagline || undefined}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          ONE GUEST. No carousel, no stars, no rotation.
          ══════════════════════════════════════════════════ */}
      {quote?.Quote && (
        <section className="px-6 md:px-10 lg:px-14 py-24 md:py-40">
          <figure className="max-w-3xl mx-auto text-center">
            <blockquote className="font-display italic text-[clamp(1.5rem,3.4vw,2.4rem)] font-normal leading-[1.35] text-foreground/90">
              {quote.Quote}
            </blockquote>
            {quote.Guest_Name && (
              <figcaption className="mt-8 text-[11px] tracking-[0.2em] uppercase text-foreground/45">
                {quote.Guest_Name}
              </figcaption>
            )}
          </figure>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          A NOTE BEFORE YOU BOOK — honesty as disclosure, low and quiet.
          ══════════════════════════════════════════════════ */}
      {filter && (
        <section className="px-6 md:px-10 lg:px-14 py-16 md:py-20 bg-[hsl(var(--secondary))]">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-[11px] tracking-[0.28em] uppercase text-foreground/40 mb-5">
              A note before you book
            </p>
            <h2 className="font-display text-xl md:text-2xl font-medium tracking-[-0.01em] leading-snug mb-4 text-foreground/85">
              {filter.Title}
            </h2>
            <p className="text-[15px] leading-relaxed text-foreground/55">
              {filter.Body}
            </p>
            {filter.Button_Text && filter.Button_Link && (
              <Link
                href={filter.Button_Link}
                className="inline-block mt-7 text-[11px] tracking-[0.16em] uppercase text-foreground/50 border-b border-foreground/40 pb-1 hover:text-[#C2410C] hover:border-[#C2410C] transition-colors"
              >
                {filter.Button_Text}
              </Link>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
