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
  keywords: ["heritage riad marrakech", "historic riad medina", "traditional moroccan house", "tadelakt bejmat riad marrakech", "laksour marrakech medina", "best reviewed riad marrakech", "authentic riad medina marrakech",
    // Spanish
    "riad marrakech cerca jemaa el fna", "riad medina marrakech", "alojamiento marrakech medina", "riad auténtico marrakech", "casa tradicional marroquí",
    // Italian
    "riad marrakech vicino jemaa el fna", "riad medina marrakech", "alloggio marrakech medina", "riad autentico marrakech", "casa tradizionale marocchina"
  ],
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
        alt: "Riad di Siena, a central courtyard open to the sky",
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
  "description": "An 18th-century house in the Laksour quarter of Marrakech medina, finished in tadelakt (burnished lime plaster) and bejmat (terracotta floor tiles) and kept as a living home rather than a renovation. Six rooms across two houses — three at the main riad around a central courtyard, three at The Douaria annex steps away. Rooftop terrace with Atlas Mountain views. Owner-operated maison d'hôtes for travelers who value genuine care over polish.",
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
        {/* Spanish meta description — for es_ES Google results */}
        <meta name="description:es" content="Riad del siglo XVIII a dos minutos de la Plaza Jemaa el-Fna. Cruza la puerta y la medina enmudece. Una casa de verdad, cuidada, con desayuno en la terraza y vistas al Atlas." />
        {/* Italian meta description — for it_IT Google results */}
        <meta name="description:it" content="Riad del XVIII secolo a due minuti da Piazza Jemaa el-Fna. Varca la soglia e la medina si fa silenziosa. Una casa vera, curata, con colazione in terrazza e vista sull'Atlante." />
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
