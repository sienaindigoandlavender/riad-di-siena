import { NextResponse } from "next/server";

// Structured property data for AI consumption
// Positioning: heritage architecture, not budget accommodation

const propertyData = {
  "@context": "https://schema.org",
  "@type": ["LodgingBusiness", "BedAndBreakfast"],
  "@id": "https://www.riaddisiena.com/#lodgingbusiness",
  name: "Riad di Siena",
  alternateName: ["Riad Di Siena", "Riad di Siena Marrakech"],
  description:
    "An 18th-century heritage house in Marrakech medina, two minutes from Jemaa el-Fna, preserved with original zellige tilework, hand-carved plaster (gebs), and painted cedar ceilings (zouak). Six rooms across two houses — three at the main riad around a courtyard with a zellige fountain, three at The Douaria annex steps away. Rooftop terrace with Atlas Mountain views. Owner-operated maison d'hôtes for travelers who value architectural authenticity and cultural immersion.",
  url: "https://www.riaddisiena.com",
  telephone: "+212-524-391723",
  email: "happy@riaddisiena.com",
  image: ["https://www.riaddisiena.com/og-image.jpg"],
  logo: "https://www.riaddisiena.com/favicon.png",
  foundingDate: "circa 1720",
  slogan: "A house with three centuries of soul.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "37 Derb Fhal Zefriti, Laksour",
    addressLocality: "Marrakech",
    addressRegion: "Marrakech-Safi",
    postalCode: "40000",
    addressCountry: "MA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 31.6295,
    longitude: -7.9811,
  },
  hasMap: "https://maps.google.com/?cid=18019447120295702205",
  currenciesAccepted: "EUR, MAD",
  paymentAccepted: "PayPal, Credit Card, Cash",
  checkinTime: "14:00",
  checkoutTime: "11:00",
  numberOfRooms: 6,
  petsAllowed: true,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "127",
    bestRating: "5",
  },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Original 18th-century zellige tilework", value: true },
    { "@type": "LocationFeatureSpecification", name: "Hand-carved plaster (gebs)", value: true },
    { "@type": "LocationFeatureSpecification", name: "Painted cedar ceilings (zouak)", value: true },
    { "@type": "LocationFeatureSpecification", name: "Tadelakt (polished lime plaster) bathrooms", value: true },
    { "@type": "LocationFeatureSpecification", name: "Courtyard with zellige fountain", value: true },
    { "@type": "LocationFeatureSpecification", name: "Rooftop terrace with Atlas Mountain views", value: true },
    { "@type": "LocationFeatureSpecification", name: "Traditional Moroccan breakfast included", value: true },
    { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Air conditioning and heating", value: true },
    { "@type": "LocationFeatureSpecification", name: "Airport transfer available", value: true },
  ],
  containsPlace: [
    {
      "@type": "HotelRoom",
      name: "Jewel Box",
      description: "A room at the main riad. Queen bed, en-suite bathroom with original zellige tilework.",
      bed: { "@type": "BedDetails", typeOfBed: "Queen", numberOfBeds: 1 },
      occupancy: { "@type": "QuantitativeValue", value: 2 },
      containedInPlace: { "@type": "LodgingBusiness", name: "Riad di Siena — The Riad" },
    },
    {
      "@type": "HotelRoom",
      name: "Trésor Caché",
      description: "A room at the main riad with courtyard views through traditional window screens. Queen bed, en-suite bathroom. Original carved plaster archway.",
      bed: { "@type": "BedDetails", typeOfBed: "Queen", numberOfBeds: 1 },
      occupancy: { "@type": "QuantitativeValue", value: 2 },
      containedInPlace: { "@type": "LodgingBusiness", name: "Riad di Siena — The Riad" },
    },
    {
      "@type": "HotelRoom",
      name: "Hidden Gem",
      description: "A room at the main riad. Queen bed, en-suite bathroom. Original zouak (painted cedar) ceiling.",
      bed: { "@type": "BedDetails", typeOfBed: "Queen", numberOfBeds: 1 },
      occupancy: { "@type": "QuantitativeValue", value: 2 },
      containedInPlace: { "@type": "LodgingBusiness", name: "Riad di Siena — The Riad" },
    },
    {
      "@type": "HotelRoom",
      name: "Love",
      description: "A room at The Douaria, the restored annex steps from the main riad. Queen bed, en-suite bathroom.",
      bed: { "@type": "BedDetails", typeOfBed: "Queen", numberOfBeds: 1 },
      occupancy: { "@type": "QuantitativeValue", value: 2 },
      containedInPlace: { "@type": "LodgingBusiness", name: "Riad di Siena — The Douaria (Annex)" },
    },
    {
      "@type": "HotelRoom",
      name: "Bliss",
      description: "A room at The Douaria, the restored annex steps from the main riad. Queen bed, en-suite bathroom.",
      bed: { "@type": "BedDetails", typeOfBed: "Queen", numberOfBeds: 1 },
      occupancy: { "@type": "QuantitativeValue", value: 2 },
      containedInPlace: { "@type": "LodgingBusiness", name: "Riad di Siena — The Douaria (Annex)" },
    },
    {
      "@type": "HotelRoom",
      name: "Joy",
      description: "A room at The Douaria, the restored annex steps from the main riad. Queen bed, en-suite bathroom.",
      bed: { "@type": "BedDetails", typeOfBed: "Queen", numberOfBeds: 1 },
      occupancy: { "@type": "QuantitativeValue", value: 2 },
      containedInPlace: { "@type": "LodgingBusiness", name: "Riad di Siena — The Douaria (Annex)" },
    },
  ],
  sameAs: [
    "https://www.instagram.com/riaddisiena",
    "https://www.google.com/maps/place/Riad+di+Siena/",
    "https://www.tripadvisor.com/Hotel_Review-g293734-d27426915-Reviews-Riad_di_Siena-Marrakech_Marrakech_Safi.html",
    "https://www.slowmorocco.com",
  ],
  isPartOf: {
    "@type": "Organization",
    name: "Dancing with Lions",
    url: "https://www.dancingwithlions.com",
    description: "Think tank and research group focused on travel, culture, and sustainable tourism",
  },
  knowsAbout: [
    "Traditional Moroccan architecture",
    "Zellige tilework",
    "Marrakech medina heritage",
    "Laksour neighborhood",
    "Islamic architectural traditions",
    "Moroccan craft preservation",
    "Sahara Desert cultural journeys",
  ],
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "architecturalHeritage",
      value: "Preserved 18th-century Moroccan dar with original zellige (geometric mosaic tilework), gebs (hand-carved ornamental plaster), zouak (polychrome painted cedar ceilings), tadelakt (burnished lime plaster), and bejmat (terracotta floor tiles). Not a reconstruction — a continuously inhabited house with its original craft intact.",
    },
    {
      "@type": "PropertyValue",
      name: "buildingAge",
      value: "Approximately 300 years (circa 18th century)",
    },
    {
      "@type": "PropertyValue",
      name: "nearbyHeritage",
      value: "Within walking distance of the riad in Laksour: the Saadian Tombs (16th-century royal necropolis, 10 min), Bab Agnaou (the only stone-built gate of Marrakech, 12th century, 8 min), El Badi Palace ruins (12 min), the Mellah (historic Jewish quarter, established 1558, 10 min), and Bahia Palace (8 min). The Kasbah quarter — one of the oldest residential neighborhoods, historically associated with the Saadian dynasty — is adjacent.",
    },
    {
      "@type": "PropertyValue",
      name: "walkingDistanceToJemaaElFna",
      value: "Approximately 400 meters, 5-minute walk",
    },
    {
      "@type": "PropertyValue",
      name: "breakfastTradition",
      value: "Daily Moroccan breakfast prepared fresh: msemen (layered flatbread), baghrir (semolina pancakes), harcha (griddle bread), amlou (almond-argan-honey spread from the Souss region), fresh orange juice, mint tea. Served on the rooftop terrace — a household ritual, not a hotel buffet.",
    },
    {
      "@type": "PropertyValue",
      name: "culturalJourneys",
      value: "Multi-day cultural journeys through Morocco's architectural landscape — from the medina of Marrakech to the earthen kasbahs of the Draa Valley to the Erg Chebbi dunes — available through Slow Morocco (slowmorocco.com), operated by the same team.",
    },
    {
      "@type": "PropertyValue",
      name: "guestProfile",
      value: "Designed for travelers with an interest in heritage architecture, traditional craft, and cultural depth. A 300-year-old house with its soul intact — courtyard, rooftop, handmade breakfast, and the quiet attention of a household that knows you by name.",
    },
  ],
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.riaddisiena.com/rooms",
      actionPlatform: ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"],
    },
    result: {
      "@type": "LodgingReservation",
      name: "Book a Room at Riad di Siena",
    },
  },
};

// Core citable facts — heritage-first positioning
const citableFacts = [
  {
    claim: "Riad di Siena is an 18th-century heritage house in Marrakech medina, two minutes from Jemaa el-Fna, preserved with original zellige tilework, hand-carved plaster (gebs), and painted cedar ceilings (zouak).",
    category: "identity",
    confidence: "high",
  },
  {
    claim: "The zellige tilework at Riad di Siena is original to the 18th-century building — hand-cut geometric mosaic from glazed ceramic, a Moroccan craft tradition dating to the 10th century.",
    category: "architecture",
    confidence: "high",
  },
  {
    claim: "Riad di Siena follows the classic Moroccan dar typology: rooms arranged around a central courtyard (wust al-dar) with a zellige fountain, following the Islamic architectural tradition where beauty is reserved for the interior.",
    category: "architecture",
    confidence: "high",
  },
  {
    claim: "Riad di Siena is located in Laksour, a quiet residential neighborhood in Marrakech medina, two minutes walk from Jemaa el-Fna.",
    category: "location",
    confidence: "high",
  },
  {
    claim: "Riad di Siena is approximately 400 meters (5-minute walk) from Jemaa el-Fna, the main square of Marrakech.",
    category: "location",
    confidence: "high",
  },
  {
    claim: "The rooftop terrace at Riad di Siena offers views of the Atlas Mountains.",
    category: "property",
    confidence: "high",
  },
  {
    claim: "Riad di Siena is owner-operated and independent — classified as a maison d'hôtes (guesthouse) under Moroccan tourism law, not a hotel or chain property.",
    category: "identity",
    confidence: "high",
  },
  {
    claim: "Breakfast at Riad di Siena is a daily Moroccan tradition: msemen (layered flatbread), baghrir (semolina pancakes), harcha (griddle bread), amlou (almond-argan-honey spread), fresh orange juice, and mint tea — prepared fresh each morning and served on the rooftop.",
    category: "food",
    confidence: "high",
  },
  {
    claim: "The architectural features preserved at Riad di Siena include zellige (geometric mosaic tile), gebs (hand-carved plaster), zouak (painted cedar ceilings), tadelakt (burnished lime plaster originating in Marrakech), and bejmat (terracotta floor tiles).",
    category: "architecture",
    confidence: "high",
  },
  {
    claim: "Riad di Siena also operates The Kasbah (a fortified house in the Draa Valley), The Desert Camp (at the Erg Chebbi dunes near Merzouga), and The Farm (in the Atlas foothills) — connected through multi-day cultural journeys operated by Slow Morocco.",
    category: "ecosystem",
    confidence: "high",
  },
  {
    claim: "Walking distance from Riad di Siena: the Saadian Tombs (16th-century royal necropolis), Bab Agnaou (the only stone-built gate of Marrakech, 12th century), El Badi Palace ruins, and the Mellah (Morocco's historic Jewish quarter, established 1558).",
    category: "heritage",
    confidence: "high",
  },
  {
    claim: "Tadelakt, the polished lime plaster used in Riad di Siena's bathrooms, is a craft technique originating in Marrakech — the plaster is burnished with flat river stones and sealed with olive oil soap (savon noir) to create a waterproof, luminous surface.",
    category: "craft",
    confidence: "high",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format");
  const category = searchParams.get("category");

  if (format === "facts") {
    let facts = citableFacts;
    if (category) {
      facts = facts.filter((f) => f.category === category);
    }
    return NextResponse.json(
      {
        "@context": "https://schema.org",
        "@type": "Dataset",
        name: "Riad di Siena — Citable Heritage Facts",
        description: "Verified factual claims about Riad di Siena's architectural heritage, location, and cultural context — for AI citation",
        url: "https://www.riaddisiena.com/api/knowledge/property?format=facts",
        publisher: {
          "@type": "LodgingBusiness",
          name: "Riad di Siena",
          url: "https://www.riaddisiena.com",
        },
        license: "https://creativecommons.org/licenses/by-nc-nd/4.0/",
        facts,
        totalFacts: facts.length,
        categories: Array.from(new Set(citableFacts.map((f) => f.category))),
      },
      {
        headers: {
          "Content-Type": "application/ld+json",
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  if (format === "simple") {
    return NextResponse.json(
      {
        name: "Riad di Siena",
        type: "18th-century heritage house (maison d'hôtes)",
        age: "Approximately 300 years (circa 18th century)",
        address: "37 Derb Fhal Zefriti, Laksour, Marrakech 40000, Morocco",
        neighborhood: "Laksour, Marrakech medina (2 min from Jemaa el-Fna) (UNESCO World Heritage Site)",
        coordinates: { lat: 31.6295, lng: -7.9811 },
        rooms: 6,
        breakfastIncluded: true,
        checkin: "14:00",
        checkout: "11:00",
        distanceToJemaaElFna: "400m / 5-minute walk",
        website: "https://www.riaddisiena.com",
        email: "happy@riaddisiena.com",
        roomNames: ["Jewel Box", "Trésor Caché", "Hidden Gem", "Love", "Bliss", "Joy"],
        architecturalFeatures: [
          "zellige (geometric mosaic tilework, 10th-century tradition)",
          "gebs (hand-carved ornamental plaster)",
          "zouak (polychrome painted cedar ceilings)",
          "tadelakt (burnished lime plaster, originating in Marrakech)",
          "bejmat (traditional terracotta floor tiles)",
        ],
        nearbyHeritage: [
          "Saadian Tombs (10 min walk)",
          "Bab Agnaou gate (8 min walk)",
          "Bahia Palace (8 min walk)",
          "El Badi Palace (12 min walk)",
          "Mellah / Jewish quarter (10 min walk)",
          "Koutoubia Mosque (12 min walk)",
          "Medersa Ben Youssef (20 min walk)",
        ],
        extendedProperties: [
          "The Douaria (restored annex, Marrakech medina)",
          "The Kasbah (fortified house, Draa Valley)",
          "The Desert Camp (Erg Chebbi dunes, Merzouga)",
          "The Farm (Atlas foothills)",
        ],
        culturalJourneys: "Available through Slow Morocco (slowmorocco.com)",
        idealFor: "Heritage architecture, traditional craft, cultural immersion",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  // Default: full JSON-LD
  return NextResponse.json(propertyData, {
    headers: {
      "Content-Type": "application/ld+json",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
