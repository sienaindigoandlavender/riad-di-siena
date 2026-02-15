"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import BookingModal from "@/components/BookingModal";
import { useCurrency } from "@/components/CurrencyContext";
import ElfsightWidget, { ElfsightScript } from "@/components/ElfsightWidget";
import {
  IconBed,
  IconShower,
  IconWifi,
  IconAC,
  IconRoom,
  IconBreakfast,
  IconTowel,
  IconShampoo,
} from "@/components/icons";

const ViewIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6z" />
  </svg>
);

const iconMap: Record<string, () => JSX.Element> = {
  "bathroom": () => <IconShower size={20} />,
  "ensuite": () => <IconShower size={20} />,
  "en-suite": () => <IconShower size={20} />,
  "private": () => <IconShower size={20} />,
  "wi-fi": () => <IconWifi size={20} />,
  "wifi": () => <IconWifi size={20} />,
  "air": () => <IconAC size={20} />,
  "conditioning": () => <IconAC size={20} />,
  "bed": () => <IconBed size={20} />,
  "queen": () => <IconBed size={20} />,
  "king": () => <IconBed size={20} />,
  "double": () => <IconBed size={20} />,
  "m²": () => <IconRoom size={20} />,
  "m2": () => <IconRoom size={20} />,
  "sqm": () => <IconRoom size={20} />,
  "30m": () => <IconRoom size={20} />,
  "25m": () => <IconRoom size={20} />,
  "20m": () => <IconRoom size={20} />,
  "35m": () => <IconRoom size={20} />,
  "40m": () => <IconRoom size={20} />,
  "view": () => <ViewIcon />,
  "courtyard": () => <ViewIcon />,
  "breakfast": () => <IconBreakfast size={20} />,
  "linens": () => <IconTowel size={20} />,
  "towels": () => <IconTowel size={20} />,
  "shower": () => <IconShower size={20} />,
  "shampoo": () => <IconShampoo size={20} />,
  "toiletries": () => <IconShampoo size={20} />,
};

interface BeyondProperty {
  name: string;
  tagline: string;
  description: string;
  image: string;
  href: string;
}

interface RoomsClientProps {
  rooms: any[];
  hero: any;
  gallery: any[];
  cityTaxPerNight: number;
  beyondProperties: BeyondProperty[];
}

export default function RoomsClient({ rooms, hero, gallery, cityTaxPerNight, beyondProperties }: RoomsClientProps) {
  const [selectedRoom, setSelectedRoom] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { formatPrice } = useCurrency();
  const scrollRef = useRef<HTMLDivElement>(null);

  const openBookingModal = (room: any) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const getIconForFeature = (feature: string): JSX.Element | null => {
    const lowerFeature = feature.toLowerCase();
    const matchedKey = Object.keys(iconMap).find(key => lowerFeature.includes(key));
    if (matchedKey) {
      const Icon = iconMap[matchedKey];
      return <Icon />;
    }
    return null;
  };

  const heroImage = hero?.Image_URL || "";

  return (
    <div className="bg-[#f5f0e8] text-[#2a2520] min-h-screen">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center relative">
        {heroImage && (
          <>
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${heroImage}')` }} />
            <img src={heroImage} alt="Rooms at Riad di Siena, traditional riad in Marrakech medina" className="sr-only" aria-hidden="true" />
            <div className="absolute inset-0 bg-[#2a2520]/40" />
          </>
        )}
        <div className="container mx-auto px-6 lg:px-16 text-center max-w-4xl relative z-10">
          <p className="text-xs tracking-[0.4em] uppercase text-white/60 mb-8">Riad di Siena</p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl tracking-[0.15em] font-light mb-8 text-white">R O O M S</h1>
          {hero?.Subtitle && (
            <p className="text-xl md:text-2xl text-white/80 font-serif italic max-w-2xl mx-auto">{hero.Subtitle}</p>
          )}
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/30 to-white/0" />
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-32">
            {rooms.map((room, index) => (
              <article key={room.Room_ID} className="grid md:grid-cols-2 gap-12 items-start">
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <div className="aspect-[3/4] overflow-hidden">
                    {room.Image_URL ? (
                      <img src={room.Image_URL} alt={room.Name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-[#2a2520]/5 flex items-center justify-center text-[#2a2520]/20">
                        <IconBed size={48} />
                      </div>
                    )}
                  </div>
                </div>
                <div className={`pt-4 md:pt-8 ${index % 2 === 1 ? "md:order-1" : ""}`}>
                  <p className="text-xs tracking-widest text-[#2a2520]/40 mb-3">
                    FROM {formatPrice(parseFloat(room.Price_EUR))} / NIGHT
                  </p>
                  <h2 className="font-serif text-2xl md:text-3xl text-[#2a2520]/90 mb-4 italic">{room.Name}</h2>
                  <p className="text-[#2a2520]/60 leading-relaxed mb-8 text-lg">{room.Description}</p>
                  
                  {room.features && room.features.length > 0 && (
                    <div className="mb-8">
                      <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                        {room.features.map((feature: string) => {
                          const icon = getIconForFeature(feature);
                          return (
                            <div key={feature} className="flex items-center gap-3 text-[#2a2520]/50">
                              <span className="text-[#2a2520]/30">
                                {icon || <span className="w-1.5 h-1.5 rounded-full bg-[#2a2520]/30 block" />}
                              </span>
                              <span className="text-sm">{feature}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {room.Bookable?.toLowerCase() === "no" ? (
                    <p className="text-xs tracking-widest text-[#2a2520]/40 italic">Not available for direct booking</p>
                  ) : (
                    <button
                      onClick={() => openBookingModal(room)}
                      className="text-xs tracking-widest border-b border-[#2a2520]/30 pb-1 hover:border-[#2a2520] transition-colors"
                    >
                      BOOK THIS ROOM
                    </button>
                  )}

                  {room.Widget_ID && (
                    <div className="mt-12 pt-8 border-t border-[#2a2520]/10">
                      <p className="text-xs tracking-widest text-[#2a2520]/40 mb-6">GUEST REVIEWS</p>
                      <ElfsightWidget widgetId={room.Widget_ID} />
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={isModalOpen && selectedRoom !== null}
        onClose={() => {
          setIsModalOpen(false);
          setTimeout(() => setSelectedRoom(null), 300);
        }}
        item={selectedRoom ? {
          id: selectedRoom.Room_ID,
          name: selectedRoom.Name,
          priceEUR: selectedRoom.Price_EUR,
          iCalURL: selectedRoom.iCal_URL,
        } : { id: "", name: "", priceEUR: "0" }}
        config={{
          maxGuestsPerUnit: 2,
          baseGuestsPerUnit: 2,
          hasCityTax: true,
          cityTaxPerNight,
          selectCheckout: true,
          paypalContainerId: `paypal-room-${selectedRoom?.Room_ID || "default"}`,
        }}
        formatPrice={formatPrice}
        paypalClientId="AWVf28iPmlVmaEyibiwkOtdXAl5UPqL9i8ee9yStaG6qb7hCwNRB2G95SYwbcikLnBox6CGyO-boyAvu"
      />
      <ElfsightScript />

      {/* Beyond the Riad — upsell, separate from rooms booking flow */}
      {beyondProperties.length > 0 && (
        <section className="py-24 md:py-32 bg-[#ebe5db]">
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-xs tracking-[0.4em] uppercase text-[#2a2520]/40 mb-4 text-center">Beyond the Riad</p>
            <h2 className="font-serif text-2xl md:text-3xl text-[#2a2520]/90 italic text-center mb-16">
              The collection
            </h2>

            <div className="relative">
              {/* Left Arrow */}
              <button
                onClick={() => scrollRef.current?.scrollBy({ left: -380, behavior: "smooth" })}
                className="absolute left-0 top-[40%] -translate-y-1/2 z-10 w-10 h-10 bg-[#ebe5db] border border-[#2a2520]/20 rounded-full flex items-center justify-center hover:border-[#2a2520]/50 transition-colors -ml-5 max-md:hidden"
                aria-label="Scroll left"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M10 12L6 8l4-4" />
                </svg>
              </button>

              {/* Cards */}
              <div
                ref={scrollRef}
                className="flex gap-8 overflow-x-auto scroll-smooth"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {beyondProperties.map((property) => (
                  <Link
                    key={property.href}
                    href={property.href}
                    className="flex-shrink-0 w-[320px] md:w-[340px] group"
                  >
                    <div className="aspect-[3/4] mb-5 overflow-hidden">
                      {property.image ? (
                        <img
                          src={property.image}
                          alt={property.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#2a2520]/5" />
                      )}
                    </div>
                    <p className="text-xs tracking-widest text-[#2a2520]/40 mb-2 uppercase">
                      {property.tagline}
                    </p>
                    <h3 className="font-serif text-xl text-[#2a2520]/90 italic mb-2 group-hover:text-[#2a2520]/60 transition-colors">
                      {property.name}
                    </h3>
                    <p className="text-sm text-[#2a2520]/50 leading-relaxed">
                      {property.description}
                    </p>
                  </Link>
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={() => scrollRef.current?.scrollBy({ left: 380, behavior: "smooth" })}
                className="absolute right-0 top-[40%] -translate-y-1/2 z-10 w-10 h-10 bg-[#ebe5db] border border-[#2a2520]/20 rounded-full flex items-center justify-center hover:border-[#2a2520]/50 transition-colors -mr-5 max-md:hidden"
                aria-label="Scroll right"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 12l4-4-4-4" />
                </svg>
              </button>

              {/* Hide scrollbar */}
              <style jsx>{`
                div::-webkit-scrollbar { display: none; }
              `}</style>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
