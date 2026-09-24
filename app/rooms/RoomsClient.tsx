"use client";

import { useState } from "react";
import BookingModal from "@/components/BookingModal";
import KinfolkTile from "@/components/KinfolkTile";
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

interface RoomsClientProps {
  rooms: any[];
  hero: any;
  gallery: any[];
  cityTaxPerNight: number;
  beyondTheWalls: any[];
}

export default function RoomsClient({ rooms, hero, gallery, cityTaxPerNight, beyondTheWalls }: RoomsClientProps) {
  const [selectedRoom, setSelectedRoom] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { formatPrice } = useCurrency();

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
    <div className="bg-[#f9f8f6] text-[#2a2520] min-h-screen">
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
          <h1 className="font-display font-medium text-white text-[clamp(2.6rem,7vw,5rem)] tracking-[-0.02em] leading-[0.95] mb-6">Rooms</h1>
          {hero?.Subtitle && (
            <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-2xl mx-auto">{hero.Subtitle}</p>
          )}
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/30 to-white/0" />
        </div>
      </section>

      {/* Room lookbook — alternating white / light-gray bands */}
      <section>
        {rooms.map((room, index) => {
          const num = String(index + 1).padStart(2, "0");
          const bandBg = index % 2 === 0 ? "bg-[#f9f8f6]" : "bg-[#efede7]";
          return (
            <div key={room.Room_ID} className={`${bandBg} py-20 md:py-28`}>
              <article className="max-w-5xl mx-auto px-6 lg:px-8">
                {/* Contained image */}
                <div className="aspect-[3/2] overflow-hidden bg-[#efede7] group">
                  {room.Image_URL ? (
                    <img
                      src={room.Image_URL}
                      alt={room.Name}
                      className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#2a2520]/15">
                      <IconBed size={56} />
                    </div>
                  )}
                </div>

                {/* Editorial caption bar */}
                <div className="mt-9 md:mt-11">
                  <div className="grid md:grid-cols-12 gap-8 md:gap-12">
                    {/* Left: number + name */}
                    <div className="md:col-span-5">
                      <span className="block text-[12px] tracking-[0.34em] text-[#C2410C] mb-4">
                        NO. {num}
                      </span>
                      <h2 className="font-display font-medium text-[clamp(2rem,4vw,3.2rem)] leading-[1.03] tracking-[-0.02em] text-[#2a2520]">
                        {room.Name}
                      </h2>
                    </div>

                    {/* Right: description + essentials + reserve */}
                    <div className="md:col-span-7 md:pt-2">
                      <p className="text-[#2a2520]/80 leading-relaxed text-lg">
                        {room.Description}
                      </p>

                      {room.features && room.features.length > 0 && (
                        <div className="grid grid-cols-2 gap-x-8 gap-y-3 mt-8">
                          {room.features.map((feature: string) => {
                            const icon = getIconForFeature(feature);
                            return (
                              <div key={feature} className="flex items-center gap-3 text-[#2a2520]/70">
                                <span className="text-[#2a2520]/35">
                                  {icon || <span className="w-1.5 h-1.5 rounded-full bg-[#2a2520]/30 block" />}
                                </span>
                                <span className="text-sm">{feature}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <div className="flex items-baseline gap-6 mt-10 pt-6 border-t border-[#2a2520]/10">
                        <div>
                          <span className="block text-[12px] tracking-[0.22em] uppercase text-[#2a2520]/55 mb-1.5">From</span>
                          <span className="font-display text-3xl md:text-4xl text-[#2a2520] leading-none">
                            {formatPrice(parseFloat(room.Price_EUR))}
                            <span className="text-base text-[#2a2520]/60 font-sans"> / night</span>
                          </span>
                        </div>
                        <div className="ml-auto">
                          {room.Bookable?.toLowerCase() === "no" ? (
                            <span className="text-[12px] tracking-widest uppercase text-[#2a2520]/55 italic">On request</span>
                          ) : (
                            <button
                              onClick={() => openBookingModal(room)}
                              className="text-[12px] tracking-[0.2em] uppercase border-b border-[#2a2520]/40 pb-1 hover:border-[#C2410C] hover:text-[#C2410C] transition-colors"
                            >
                              Reserve
                            </button>
                          )}
                        </div>
                      </div>

                      {room.Widget_ID && (
                        <div className="mt-10 pt-8 border-t border-[#2a2520]/10">
                          <p className="text-[12px] tracking-[0.22em] uppercase text-[#2a2520]/55 mb-6">Guest reviews</p>
                          <ElfsightWidget widgetId={room.Widget_ID} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </div>
          );
        })}
      </section>

      {/* Policy links — know the terms before booking */}
      <div className="px-6 pb-4 pt-16">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12px] tracking-widest uppercase text-[#2a2520]/55">
          <a href="/disclaimer" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-[#2a2520] transition-colors">Before You Book</a>
          <span aria-hidden="true" className="text-[#2a2520]/20">|</span>
          <a href="/booking-conditions" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-[#2a2520] transition-colors">Booking Conditions</a>
          <span aria-hidden="true" className="text-[#2a2520]/20">|</span>
          <a href="/house-rules" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-[#2a2520] transition-colors">House Rules</a>
        </div>
      </div>

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

      {/* Beyond the Walls — delicate grid, matching the home */}
      {beyondTheWalls.length > 0 && (
        <section className="py-20 md:py-28 px-6 md:px-10 lg:px-14 border-t border-[#2a2520]/10">
          <div className="max-w-7xl mx-auto">
            <a href="/beyond-the-walls" className="group block mb-10 md:mb-12">
              <p className="text-[12px] tracking-[0.28em] uppercase text-[#C2410C] mb-3">Beyond the Walls</p>
              <h2 className="font-display text-xl md:text-2xl font-medium tracking-[-0.01em] text-[#2a2520]/85 group-hover:text-[#C2410C] transition-colors">
                Where the sanctuary continues.{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </h2>
            </a>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {beyondTheWalls.map((p: any) => (
                <KinfolkTile
                  key={p.Property_ID || p.Name}
                  href={p.Link || "#"}
                  image={p.Image_URL}
                  title={p.Name}
                  sub={p.Tagline || undefined}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
