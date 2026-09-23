export default function AboutPage() {
  return (
    <div className="bg-[#f9f8f6] text-[#2a2520] min-h-screen">
      <section className="py-32 md:py-40 border-b border-[#2a2520]/10">
        <div className="container mx-auto px-6 lg:px-16 text-center max-w-4xl">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#C2410C] mb-6">
            Riad di Siena · Marrakech Medina
          </p>
          <h1 className="font-display font-medium text-[#2a2520] text-[clamp(2.6rem,7vw,4.5rem)] tracking-[-0.02em] leading-[0.95] mb-6">
            About
          </h1>
          <p className="text-lg md:text-xl text-[#2a2520]/70 font-light leading-relaxed max-w-2xl mx-auto">
            An 18th-century house in the Laksour quarter of Marrakech medina,
            two minutes from Jemaa el-Fna.
          </p>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl space-y-10 text-lg md:text-xl leading-relaxed text-[#2a2520]/85">
          <p>
            Riad di Siena is a privately-owned maison d&apos;h&ocirc;tes — a small
            traditional Moroccan house, restored room by room over more than
            twenty years and run by the family who lives in it. Six rooms
            across two adjoining houses: three around a central courtyard
            at the main riad, three at The Douaria annex a
            few steps away.
          </p>
          <p>
            The house keeps its original character: tadelakt walls — burnished
            lime plaster — and bejmat floors, the hand-made terracotta tiles
            underfoot, and a rooftop terrace with views over the medina
            rooftops to the Atlas Mountains. Nothing has been gutted or styled.
            What was here in the 1700s is mostly still here.
          </p>
          <p>
            We&apos;re a small team. Zahra and the women who keep the riad have
            been here for years and most guests remember them by name. We
            cook breakfast every morning on the rooftop, arrange airport
            transfers, walk new arrivals through the medina the first time,
            and answer the phone ourselves.
          </p>
          <p>
            Riad di Siena is part of{" "}
            <a
              href="https://www.slowmorocco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-[#2a2520]/30 underline-offset-4 hover:decoration-[#2a2520]/70 transition-colors"
            >
              Slow Morocco
            </a>
            , a small family of properties — the riad in Marrakech, a kasbah
            in the High Atlas, a desert camp in the dunes near Merzouga, and
            a working farm — designed to be visited slowly, one after the
            other, on a journey south.
          </p>
          <p className="font-serif italic text-[#2a2520]/80">
            We are happiest when our guests leave feeling more themselves than
            when they arrived.
          </p>
        </div>
      </section>
    </div>
  );
}
