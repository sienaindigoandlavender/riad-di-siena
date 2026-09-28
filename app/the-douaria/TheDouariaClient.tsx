"use client";

import { useState } from "react";
import { useCurrency } from "@/components/CurrencyContext";
import BookingModal from "@/components/BookingModal";
import GalleryCarousel from "@/components/GalleryCarousel";

interface Props {
  hero: any;
  paragraphs: any[];
  rooms: any[];
  gallery: any[];
  cityTaxPerNight: number;
}

const HOUSE_PRICE_EUR = "450"; // whole house, up to 6, breakfast included

const BEFORE_YOU_BOOK = [
  "You are renting the whole house, exclusively — three bedrooms, the courtyard and the rooftop. No other guests, no shared spaces. One group only.",
  "A home-cooked Moroccan breakfast is made fresh each morning and included in the price.",
  "This is a 300-year-old house. Some bedrooms have no exterior window — a traditional way of keeping cool — and there can be natural humidity in summer. Every room has air conditioning.",
  "Medina sounds are part of the setting: the call to prayer, neighbours, the life of the city.",
  "Steep stairs and an open rooftop terrace. Well suited to families with children around 8 and older; not safe for toddlers or infants.",
];

const REVIEWS = [
  { name: "Jing", text: "The location is super convenient. The room had everything we needed and it was quiet enough for us to rest. The breakfast is great and we enjoyed every meal. We will definitely stay here again." },
  { name: "David", text: "Very welcoming host, the room was really comfortable and right in the centre of Marrakech. Breakfast was fresh cooked and really amazing, and the check-in went very smooth." },
  { name: "Mengqi", text: "The woman who manages the riad was so kind and thoughtful. I got sick and had a fever while staying — she let me rest longer and made me ginger lemon water. It was heartwarming." },
  { name: "Tapani", text: "The place exceeded our expectations. A hidden gem in the old town — clean, stylish, a big room decorated with care. The staff was very friendly and the breakfast tastes amazing." },
  { name: "Carroll", text: "Rooms were perfect, with great air conditioning and everything we needed. The breakfast was amazing — a different variety of fruit, yoghurt and eggs every day. Our host was lovely." },
  { name: "Sofia", text: "Everything was perfect. It was my brother's birthday and they were waiting for us with pastries. We left before breakfast one morning and they packed it the night before. Truly sweet people." },
];

export default function TheDouariaClient({ hero, gallery, cityTaxPerNight }: Props) {
  const { formatPrice } = useCurrency();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const heroImage = hero?.Image_URL || "";

  return (
    <div className="bg-[#f9f8f6] text-[#2a2520] min-h-screen">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center relative">
        {heroImage && (
          <>
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${heroImage}')` }} />
            <img src={heroImage} alt="The Douaria — a private riad to yourself in the Marrakech medina" className="sr-only" aria-hidden="true" />
            <div className="absolute inset-0 bg-[#2a2520]/40" />
          </>
        )}
        <div className="container mx-auto px-6 lg:px-16 text-center max-w-4xl relative z-10">
          <h1 className="font-display font-medium text-white text-[clamp(2rem,5vw,3.5rem)] uppercase tracking-[0.08em] leading-[1.08] mb-6">
            The Douaria
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed max-w-2xl mx-auto">
            A private riad, entirely yours — with breakfast made fresh each morning. Two minutes from Jemaa el-Fna.
          </p>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/30 to-white/0" />
        </div>
      </section>

      {/* Intro — location-led, whole house, breakfast */}
      <section className="py-24 md:py-32 border-t border-[#2a2520]/10">
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
          <div className="text-[#2a2520]/85 leading-relaxed text-lg md:text-xl space-y-6">
            <p>
              The Douaria is the house next door to the main riad — a private riad of its own, a few steps across a
              quiet alley from Riad di Siena. The whole of it is yours: three bedrooms, a small central courtyard
              and a rooftop terrace, with no other guests and no shared spaces. A 300-year-old Moroccan house in the
              heart of the medina, two minutes on foot from Jemaa el-Fna and quiet behind its walls.
            </p>
            <p>
              Everything is close: walk to the souks, the restaurants and the monuments; ten minutes by taxi to
              Guéliz; day trips to the Atlas, Ourika or the desert easy to arrange. And each morning, a home-cooked
              Moroccan breakfast, made fresh in the house — the thing our guests remember longest.
            </p>
          </div>
        </div>
      </section>

      {/* The bedrooms — presented as one house, no per-room booking */}
      {gallery && gallery.length > 0 && (
        <section className="py-8 md:py-12">
          <GalleryCarousel images={gallery} />
        </section>
      )}

      {/* Honest character */}
      <section className="py-24 md:py-32 bg-[#efede7]">
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
          <p className="text-[12px] tracking-[0.3em] uppercase text-[#C2410C] mb-6">An honest note</p>
          <div className="text-[#2a2520]/85 leading-relaxed text-lg md:text-xl space-y-6">
            <p>
              This is a real, lived-in old house. Some bedrooms have no exterior window — the traditional way these
              houses stay cool — and summer brings natural humidity; every room has air conditioning. The stairs are
              steep and the rooftop is open, so the house suits families with children around eight and older, and
              isn&apos;t safe for toddlers.
            </p>
            <p>
              None of this is a flaw to apologise for. It&apos;s what a three-hundred-year-old medina house is. Come
              understanding that, and it becomes the best kind of stay.
            </p>
          </div>
        </div>
      </section>

      {/* Reviews — real, from eight years of guests */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-[12px] tracking-[0.3em] uppercase text-[#C2410C] mb-4">From our guests</p>
            <h2 className="font-display font-medium text-[clamp(1.8rem,3.5vw,2.6rem)] tracking-[-0.02em] text-[#2a2520]">
              Eight years of welcomes
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {REVIEWS.map((r) => (
              <figure key={r.name} className="border border-[#2a2520]/10 p-8 bg-[#f9f8f6] flex flex-col">
                <blockquote className="text-[#2a2520]/85 leading-relaxed text-[15px] flex-grow">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-[12px] tracking-[0.2em] uppercase text-[#2a2520]/50">
                  {r.name} · Guest
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Booking — before-you-book gate + direct CTA */}
      <section className="py-24 md:py-32 bg-[#efede7] border-t border-[#2a2520]/10">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-[12px] tracking-[0.3em] uppercase text-[#C2410C] mb-4">Book direct</p>
          <h2 className="font-display font-medium text-[clamp(1.9rem,4vw,2.8rem)] tracking-[-0.02em] text-[#2a2520] mb-4">
            The whole house, from {formatPrice(parseFloat(HOUSE_PRICE_EUR))}
          </h2>
          <p className="text-[#2a2520]/70 text-lg mb-10">
            Up to 6 guests · breakfast included · booked directly with us.
          </p>

          {/* Before you book */}
          <div className="text-left bg-[#f9f8f6] border border-[#2a2520]/10 p-7 md:p-8 mb-8">
            <p className="text-[12px] tracking-[0.25em] uppercase text-[#2a2520]/50 mb-5">Before you book</p>
            <ul className="space-y-4">
              {BEFORE_YOU_BOOK.map((point, i) => (
                <li key={i} className="flex gap-3 text-[#2a2520]/80 leading-relaxed text-[15px]">
                  <span className="text-[#C2410C] mt-1 flex-shrink-0">◈</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <label className="flex items-start gap-3 mt-7 pt-6 border-t border-[#2a2520]/10 cursor-pointer select-none">
              <input
                type="checkbox"
                id="douaria-acknowledge"
                checked={acknowledged}
                onChange={(e) => setAcknowledged(e.target.checked)}
                className="mt-1 h-5 w-5 flex-shrink-0 accent-[#C2410C]"
              />
              <span className="text-[#2a2520] text-[15px] leading-relaxed">
                I&apos;ve read and understood the above.
              </span>
            </label>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            disabled={!acknowledged}
            className={`inline-block px-12 py-4 text-xs tracking-[0.2em] uppercase transition-colors ${
              acknowledged
                ? "bg-[#2a2520] text-[#f9f8f6] hover:bg-[#C2410C] cursor-pointer"
                : "bg-[#2a2520]/20 text-[#f9f8f6]/70 cursor-not-allowed"
            }`}
          >
            Check availability
          </button>
          {!acknowledged && (
            <p className="text-[#2a2520]/45 text-xs mt-3">Please confirm you&apos;ve read the note above to continue.</p>
          )}

          <p className="text-[#2a2520]/50 text-sm mt-8">
            Also listed on Airbnb — but booking direct here is the same house, without the platform fees.
          </p>

          {/* Policy links */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12px] tracking-widest uppercase text-[#2a2520]/55">
            <a href="/disclaimer" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-[#2a2520] transition-colors">Before You Book</a>
            <span aria-hidden="true" className="text-[#2a2520]/20">|</span>
            <a href="/booking-conditions" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-[#2a2520] transition-colors">Booking Conditions</a>
            <span aria-hidden="true" className="text-[#2a2520]/20">|</span>
            <a href="/house-rules" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-[#2a2520] transition-colors">House Rules</a>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={{ id: "douaria-house", name: "The Douaria — whole house", priceEUR: HOUSE_PRICE_EUR }}
        config={{
          maxGuestsPerUnit: 6,
          baseGuestsPerUnit: 6,
          hasCityTax: true,
          cityTaxPerNight,
          selectCheckout: true,
          paypalContainerId: "paypal-douaria-house",
        }}
        formatPrice={formatPrice}
        paypalClientId="AWVf28iPmlVmaEyibiwkOtdXAl5UPqL9i8ee9yStaG6qb7hCwNRB2G95SYwbcikLnBox6CGyO-boyAvu"
      />
    </div>
  );
}
