import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Rooms — Riad di Siena | Marrakech Medina",
  description: "Six rooms across two 18th-century houses in the Laksour quarter, two minutes from Jemaa el-Fna. Original zellige, carved plaster, rooftop terrace with Atlas views. Breakfast included.",
  alternates: { canonical: "https://www.riaddisiena.com/rooms" },
  openGraph: {
    title: "Rooms — Riad di Siena",
    description: "Six rooms across two historic Marrakech houses. Zellige tilework, rooftop terrace, daily Moroccan breakfast. Two minutes from Jemaa el-Fna.",
    url: "https://www.riaddisiena.com/rooms",
    type: "website",
    siteName: "Riad di Siena",
    images: [{ url: "https://www.riaddisiena.com/og-image.jpg", width: 1200, height: 630, alt: "Rooms at Riad di Siena Marrakech" }],
  },
};

const roomsSchema = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "@id": "https://www.riaddisiena.com/#lodgingbusiness",
  "name": "Riad di Siena",
  "url": "https://www.riaddisiena.com/rooms",
  "containsPlace": [
    {
      "@type": "HotelRoom",
      "name": "Jewel Box",
      "description": "A room at the main riad. Queen bed, en-suite bathroom, zellige details.",
      "bed": { "@type": "BedDetails", "typeOfBed": "Queen", "numberOfBeds": 1 },
      "occupancy": { "@type": "QuantitativeValue", "value": 2 },
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "En-suite bathroom", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Air conditioning", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Free WiFi", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Breakfast included", "value": true },
      ],
    },
    {
      "@type": "HotelRoom",
      "name": "Trésor Caché",
      "description": "A room at the main riad with courtyard views. Queen bed, en-suite bathroom, original carved plaster archway.",
      "bed": { "@type": "BedDetails", "typeOfBed": "Queen", "numberOfBeds": 1 },
      "occupancy": { "@type": "QuantitativeValue", "value": 2 },
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "En-suite bathroom", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Air conditioning", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Free WiFi", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Breakfast included", "value": true },
      ],
    },
    {
      "@type": "HotelRoom",
      "name": "Hidden Gem",
      "description": "A room at the main riad. Queen bed, en-suite bathroom, original zouak ceiling.",
      "bed": { "@type": "BedDetails", "typeOfBed": "Queen", "numberOfBeds": 1 },
      "occupancy": { "@type": "QuantitativeValue", "value": 2 },
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "En-suite bathroom", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Air conditioning", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Free WiFi", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Breakfast included", "value": true },
      ],
    },
    {
      "@type": "HotelRoom",
      "name": "Love",
      "description": "A room at The Douaria annex, steps from the main riad. Queen bed, en-suite bathroom.",
      "bed": { "@type": "BedDetails", "typeOfBed": "Queen", "numberOfBeds": 1 },
      "occupancy": { "@type": "QuantitativeValue", "value": 2 },
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "En-suite bathroom", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Air conditioning", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Free WiFi", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Breakfast included", "value": true },
      ],
    },
    {
      "@type": "HotelRoom",
      "name": "Bliss",
      "description": "A room at The Douaria annex, steps from the main riad. Queen bed, en-suite bathroom.",
      "bed": { "@type": "BedDetails", "typeOfBed": "Queen", "numberOfBeds": 1 },
      "occupancy": { "@type": "QuantitativeValue", "value": 2 },
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "En-suite bathroom", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Air conditioning", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Free WiFi", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Breakfast included", "value": true },
      ],
    },
    {
      "@type": "HotelRoom",
      "name": "Joy",
      "description": "A room at The Douaria annex, steps from the main riad. Queen bed, en-suite bathroom.",
      "bed": { "@type": "BedDetails", "typeOfBed": "Queen", "numberOfBeds": 1 },
      "occupancy": { "@type": "QuantitativeValue", "value": 2 },
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "En-suite bathroom", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Air conditioning", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Free WiFi", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Breakfast included", "value": true },
      ],
    },
  ],
};

export default function RoomsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script id="rooms-schema" type="application/ld+json">
        {JSON.stringify(roomsSchema)}
      </Script>
      {children}
    </>
  );
}
