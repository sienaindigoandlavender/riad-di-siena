"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import BookingModal from "./BookingModal";
import { useCurrency } from "./CurrencyContext";

// The Slow Way South - Syndication Component
// Pulls journey data from Slow Morocco API - FULLY DYNAMIC

interface Journey {
  slug: string;
  title: string;
  duration: string;
  durationDays: number;
  description: string;
  arcDescription: string;
  heroImage: string;
  price: string;
  startCity: string;
  focus: string;
}

interface ItineraryDay {
  dayNumber: number;
  cityName: string;
  fromCity: string;
  toCity: string;
  description: string;
  imageUrl: string;
  travelTime: string;
  activities: string;
  meals: string;
}

interface SlowWaySouthProps {
  journeySlug?: string;
  ctaText?: string;
}

export default function SlowWaySouth({ 
  journeySlug = "3-Day-Sahara-Circle",
  ctaText = "The Full Journey"
}: SlowWaySouthProps) {
  const { formatPrice } = useCurrency();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [journey, setJourney] = useState<Journey | null>(null);
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [bannerTitle, setBannerTitle] = useState("The Slow Journey South");
  const [journeyPrice, setJourneyPrice] = useState(1200);
  const [loading, setLoading] = useState(true);

  // Fetch settings for banner title and price
  useEffect(() => {
    fetch("/api/sheets/settings")
      .then((res) => res.json())
      .then((settings) => {
        if (settings.journey_banner_title) {
          setBannerTitle(settings.journey_banner_title);
        }
        if (settings.journey_price) {
          setJourneyPrice(parseFloat(settings.journey_price) || 1200);
        }
      })
      .catch((err) => console.error("Error fetching settings:", err));
  }, []);

  useEffect(() => {
    fetch(`https://www.slowmorocco.com/api/journeys/${journeySlug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setJourney(data.journey);
          setItinerary(data.itinerary || []);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching Slow Morocco journey:", err);
        setLoading(false);
      });
  }, [journeySlug]);

  if (loading) {
    return (
      <section className="bg-sand py-20">
        <div className="flex justify-center">
          <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (!journey) {
    return null;
  }

  // Build focus tags from journey data
  const focusTags = [
    journey.durationDays ? `${journey.durationDays} Days` : "",
    journey.focus || "",
  ].filter(Boolean).join(" · ");

  return (
    <section id="the-journey" className="bg-sand">
      {/* Hero with CTA */}
      <div className="relative h-[50vh] min-h-[400px] bg-[#e8e0d4]">
        {journey.heroImage && (
          <Image
            src={journey.heroImage}
            alt={journey.title}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/60" />

        {/* Overlay — title, price, CTA all visible on the image */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 pb-10 text-white">
            {focusTags && (
              <p style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '10px', opacity: 0.7 }}>
                {focusTags}
              </p>
            )}
            <h2 style={{ fontSize: '22px', fontFamily: 'var(--font-display)', lineHeight: 1.2, marginBottom: '6px' }}>
              {bannerTitle}
            </h2>
            <p style={{ fontSize: '13px', marginBottom: '16px', opacity: 0.7 }}>
              From {formatPrice(journeyPrice)} for 2 guests · all meals included
            </p>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => setIsBookingOpen(true)}
                style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '10px 28px', backgroundColor: 'white', color: '#1a1a1a', border: 'none', cursor: 'pointer' }}
              >
                Begin
              </button>
              <Link
                href={`https://www.slowmorocco.com/journeys/${journeySlug}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '10px 28px', border: '1px solid rgba(255,255,255,0.5)', color: 'white', textDecoration: 'none' }}
              >
                {ctaText}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Itinerary + attribution below */}
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          {itinerary.length > 0 && (
            <div className={`grid gap-8 mb-10 ${
              itinerary.length === 2 ? "md:grid-cols-2" :
              itinerary.length === 3 ? "md:grid-cols-3" :
              itinerary.length >= 4 ? "md:grid-cols-4" : ""
            }`}>
              {itinerary.map((day) => (
                <div key={day.dayNumber} className="text-center">
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', margin: '0 auto 10px' }}>
                    {day.dayNumber}
                  </div>
                  <h3 style={{ fontSize: '14px', fontFamily: 'var(--font-display)', marginBottom: '4px' }}>
                    {day.fromCity && day.toCity && day.fromCity !== day.toCity
                      ? `${day.fromCity} → ${day.toCity}`
                      : day.cityName || `Day ${day.dayNumber}`
                    }
                  </h3>
                  <p style={{ fontSize: '12px', color: 'hsl(var(--muted-foreground))', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: 0 }}>
                    {day.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Attribution */}
          <div className="text-center">
            <p style={{ fontSize: '10px', color: 'hsl(var(--muted-foreground))', marginBottom: '4px' }}>
              A journey by{" "}
              <a
                href="https://www.slowmorocco.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'underline' }}
              >
                Slow Morocco
              </a>
            </p>
            <a
              href="https://www.slowmorocco.com/day-trips"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))' }}
            >
              Day Adventures →
            </a>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        item={{
          id: journey.slug || journeySlug,
          name: bannerTitle,
          priceEUR: String(journeyPrice),
        }}
        config={{
          maxNights: 1,
          maxUnits: 1,
          maxGuestsPerUnit: 1,
          baseGuestsPerUnit: 1,
          selectCheckout: false,
          propertyName: "Slow Morocco",
          paypalContainerId: `paypal-${journey.slug || journeySlug}`,
        }}
        formatPrice={formatPrice}
        paypalClientId="AWVf28iPmlVmaEyibiwkOtdXAl5UPqL9i8ee9yStaG6qb7hCwNRB2G95SYwbcikLnBox6CGyO-boyAvu"
      />
    </section>
  );
}
