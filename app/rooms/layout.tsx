import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Rooms in Marrakech Medina",
  description:
    "Six individually designed rooms at Riad di Siena, a 300-year-old riad in Marrakech medina. Three at the main riad, three at The Douaria annex. Queen beds, en-suite bathrooms, air conditioning, zellige details, rooftop breakfast included. From €80/night.",
  keywords: [
    "riad rooms marrakech",
    "marrakech medina accommodation",
    "traditional riad rooms",
    "boutique hotel marrakech",
    "riad with breakfast marrakech",
  ],
  openGraph: {
    title: "Rooms at Riad di Siena | Marrakech Medina",
    description:
      "Three rooms around a courtyard fountain in a 300-year-old Marrakech riad, plus three at The Douaria annex. Queen beds, en-suite bathrooms, rooftop breakfast included. From €80/night.",
  },
  alternates: {
    canonical: "https://www.riaddisiena.com/rooms",
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

export default function RoomsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script id="rooms-schema" type="application/ld+json">
        {JSON.stringify(roomsSchema)}
      </Script>
      {children}
    </>
  );
}
