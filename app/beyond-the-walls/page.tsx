export const dynamic = 'force-dynamic';

import { getHero, getList } from "@/lib/data";
import KinfolkTile from "@/components/KinfolkTile";

export default async function BeyondTheWallsPage() {
  const [hero, properties] = await Promise.all([
    getHero("beyond_the_walls_hero"),
    getList("beyond_the_walls"),
  ]);

  const heroImage = hero?.Image_URL || "";

  return (
    <div className="bg-[#f9f8f6] text-[#2a2520] min-h-screen">
      <section className="min-h-screen flex items-center justify-center relative">
        {heroImage && (
          <>
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${heroImage}')` }} />
            <img src={heroImage} alt="Beyond the Walls, Morocco experiences from Riad di Siena" className="sr-only" aria-hidden="true" />
            <div className="absolute inset-0 bg-[#2a2520]/40" />
          </>
        )}
        <div className="container mx-auto px-6 lg:px-16 text-center max-w-4xl relative z-10">
          <h1 className="font-display font-medium text-white text-[clamp(2rem,5vw,3.5rem)] uppercase tracking-[0.08em] leading-[1.08] mb-6">Beyond the Walls</h1>
          {hero?.Subtitle && (
            <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed max-w-2xl mx-auto">{hero.Subtitle}</p>
          )}
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/30 to-white/0" />
        </div>
      </section>

      {hero?.Intro && (
        <section className="py-24 md:py-32 border-t border-[#2a2520]/10">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="max-w-3xl mx-auto">
              <p className="text-[#2a2520]/85 leading-relaxed text-lg md:text-xl text-center">{hero.Intro}</p>
            </div>
          </div>
        </section>
      )}

      <section className="py-24 md:py-32 bg-[#efede7]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {properties.map((property: any) => (
              <KinfolkTile
                key={property.Property_ID}
                href={property.Link}
                image={property.Image_URL}
                title={property.Name}
                sub={property.Tagline}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
