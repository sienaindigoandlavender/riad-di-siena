import { getHero, getList } from "@/lib/data";
import BeyondTheWallsNav from "@/components/BeyondTheWallsNav";

export default async function TheFarmPage() {
  const [hero, paragraphs, produce] = await Promise.all([
    getHero("farm_hero"),
    getList("farm_content"),
    getList("farm_produce"),
  ]);

  const heroImage = hero?.Image_URL || "";

  return (
    <div className="bg-[#f5f0e8] text-[#2a2520] min-h-screen">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center relative">
        {heroImage && (
          <>
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${heroImage}')` }} />
            <img src={heroImage} alt="The Farm in Atlas foothills, Morocco, part of Riad di Siena collection" className="sr-only" aria-hidden="true" />
            <div className="absolute inset-0 bg-[#2a2520]/40" />
          </>
        )}
        <div className="container mx-auto px-6 lg:px-16 text-center max-w-4xl relative z-10">
          {hero?.Location && (
            <p className="text-xs tracking-[0.4em] uppercase text-white/60 mb-8">{hero.Location}</p>
          )}
          <h1 className="text-3xl md:text-5xl lg:text-6xl tracking-[0.15em] font-light mb-8 text-white">
            T H E<br />F A R M
          </h1>
          {hero?.Subtitle && (
            <p className="text-xl md:text-2xl text-white/80 font-serif italic max-w-2xl mx-auto">{hero.Subtitle}</p>
          )}
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/30 to-white/0" />
        </div>
      </section>

      {/* Description */}
      {paragraphs.length > 0 && (
        <section className="py-24 md:py-32 border-t border-[#2a2520]/10">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="max-w-3xl mx-auto">
              <div className="text-[#2a2520]/70 leading-relaxed text-lg md:text-xl space-y-6">
                {paragraphs.map((p: any, i: number) => (
                  <p key={i}>{p.Content}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* What Comes from The Farm */}
      <section className="py-24 md:py-32 bg-[#ebe5db]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] text-[#2a2520]/40 mb-4">FROM THE FARM</p>
            <h2 className="font-serif text-2xl md:text-3xl text-[#2a2520]/90 italic">What reaches your table</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
            {produce.map((item: any) => (
              <div key={item.Produce_ID} className="py-4">
                <p className="font-serif text-xl mb-2 italic">{item.Name}</p>
                <p className="text-[#2a2520]/50 text-sm">{item.Description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BeyondTheWallsNav />
    </div>
  );
}
