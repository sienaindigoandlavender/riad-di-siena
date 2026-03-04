import type { Metadata } from 'next'
import Script from 'next/script'
import { CurrencyProvider } from '@/components/CurrencyContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL("https://www.riaddisiena.com"),
  title: {
    default: "Riad di Siena | 18th-Century Riad in Marrakech Medina",
    template: "%s | Riad di Siena",
  },
  description: "An 18th-century riad two minutes from Jemaa el-Fna. Step through the door and the medina falls quiet. Soul food, genuine care, and clarity of spirit come first.",
  keywords: ["heritage riad marrakech", "historic riad medina", "traditional moroccan house", "zellige architecture marrakech", "laksour marrakech medina", "best reviewed riad marrakech", "authentic riad medina marrakech"],
  authors: [{ name: "Riad di Siena" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.riaddisiena.com",
    siteName: "Riad di Siena",
    title: "Riad di Siena | 18th-Century Riad in Marrakech Medina",
    description: "An 18th-century riad two minutes from Jemaa el-Fna. Step through the door and the medina falls quiet. Soul food, genuine care, and clarity of spirit come first.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Riad di Siena courtyard with traditional zellige fountain",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Riad di Siena | 18th-Century Riad in Marrakech Medina",
    description: "An 18th-century riad two minutes from Jemaa el-Fna. Step through the door and the medina falls quiet. Soul food, genuine care, and clarity of spirit come first.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: "https://www.riaddisiena.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "@id": "https://www.riaddisiena.com/#lodgingbusiness",
  "name": "Riad di Siena",
  "description": "An 18th-century heritage house in the Laksour quarter of Marrakech medina, preserved with original zellige tilework, hand-carved plaster (gebs), and painted cedar ceilings (zouak). Six rooms across two houses — three at the main riad around a courtyard with a zellige fountain, three at The Douaria annex steps away. Rooftop terrace with Atlas Mountain views. Owner-operated maison d'hôtes for travelers who value architectural authenticity and cultural depth.",
  "url": "https://www.riaddisiena.com",
  "telephone": "+212-524-391723",
  "email": "happy@riaddisiena.com",
  "image": [
    "https://www.riaddisiena.com/og-image.jpg"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "37 Derb Fhal Zefriti, Laksour",
    "addressLocality": "Marrakech",
    "addressRegion": "Marrakech-Safi",
    "postalCode": "40000",
    "addressCountry": "MA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 31.6295,
    "longitude": -7.9811
  },
  "priceRange": "€80-€150",
  "currenciesAccepted": "EUR, MAD",
  "paymentAccepted": "PayPal, Credit Card, Cash",
  "checkinTime": "14:00",
  "checkoutTime": "11:00",
  "numberOfRooms": 6,
  "petsAllowed": true,
  "starRating": {
    "@type": "Rating",
    "ratingValue": "9.0",
    "bestRating": "10"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "9.0",
    "reviewCount": "584",
    "bestRating": "10"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "10", "bestRating": "10" },
      "author": { "@type": "Person", "name": "Eduardo" },
      "reviewBody": "This place was magical! For being my first time in Marrakesh I couldn't have asked for a better experience. The women maintaining the riad were so lovely making me breakfast every morning and Zahra was always helpful. Will be back again!",
      "datePublished": "2024-11-15"
    },
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "10", "bestRating": "10" },
      "author": { "@type": "Person", "name": "Giovanni" },
      "reviewBody": "We stayed for 5 days and left with many beautiful memories. We were very well received and felt at home. Everything was appreciated — the room, the breakfasts, the excellent dinner prepared by Zahra, and the terrace on top of the riad. The description of the accommodation is well done and true to reality.",
      "datePublished": "2024-09-20"
    },
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "10", "bestRating": "10" },
      "author": { "@type": "Person", "name": "Chloe" },
      "reviewBody": "A real little haven of peace in the Medina: typical, charming, peaceful and perfectly located. The house is impeccably clean, tastefully decorated in the traditional Moroccan style. Special mention for the rooftop, perfect for enjoying the sun after a day in the city. The breakfast was delicious, generous, and authentically Moroccan.",
      "datePublished": "2025-03-10"
    },
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "10", "bestRating": "10" },
      "author": { "@type": "Person", "name": "Belen" },
      "reviewBody": "A beautiful riad. The room was spacious, beautifully decorated and spotlessly clean. The bathroom was like a hammam, spectacular. The breakfasts were varied and delicious, and the personal attention was exceptional.",
      "datePublished": "2025-01-22",
      "inLanguage": "es"
    },
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "10", "bestRating": "10" },
      "author": { "@type": "Person", "name": "Juan Andres" },
      "reviewBody": "I regret not spending enough days in this place. The building was so beautiful and clean. Jacqueline was very helpful and sweet. Best breakfast I had in a riad in Marrakech.",
      "datePublished": "2024-12-05"
    },
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "10", "bestRating": "10" },
      "author": { "@type": "Person", "name": "Celine" },
      "reviewBody": "Beautiful place, a real haven of peace close to the main square, a lovely host and an exquisite breakfast. What more could you ask for!",
      "datePublished": "2025-02-14"
    }
  ],
  "parentOrganization": {
    "@type": "Organization",
    "name": "Slow Morocco",
    "url": "https://www.slowmorocco.com"
  },
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Free WiFi", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Air Conditioning", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Rooftop Terrace", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Traditional Breakfast Included", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Courtyard", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Airport Transfer Available", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Concierge Service", "value": true }
  ],
  "sameAs": [
    "https://www.instagram.com/riaddisiena",
    "https://www.google.com/maps/place/Riad+di+Siena/",
    "https://www.tripadvisor.com/Hotel_Review-g293734-d27426915-Reviews-Riad_di_Siena-Marrakech_Marrakech_Safi.html",
    "https://www.slowmorocco.com"
  ],
  "additionalType": "https://schema.org/BedAndBreakfast",
  "knowsAbout": [
    "Marrakech medina",
    "Traditional Moroccan architecture",
    "Laksour quarter, near Jemaa el-Fna",
    "Moroccan hospitality",
    "Sahara Desert journeys"
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="author" href="/llms.txt" type="text/plain" title="AI Knowledge Base" />
        <link rel="alternate" href="/api/knowledge/property" type="application/ld+json" title="Property Data" />
        <link rel="alternate" href="/api/knowledge/faq" type="application/ld+json" title="FAQ Data" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-V48C7J04GJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-V48C7J04GJ');
          `}
        </Script>
        <Script id="structured-data" type="application/ld+json">
          {JSON.stringify(structuredData)}
        </Script>
      </head>
      <body suppressHydrationWarning>
        <CurrencyProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <Chatbot />
        </CurrencyProvider>
      </body>
    </html>
  )
}
