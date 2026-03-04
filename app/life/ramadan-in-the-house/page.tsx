import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ramadan in the House",
  description:
    "The harira starts at four. By five, the whole derb smells of it. Field notes from Ramadan inside a 300-year-old riad in Marrakech medina.",
  alternates: {
    canonical: "https://www.riaddisiena.com/life/ramadan-in-the-house",
  },
  openGraph: {
    title: "Ramadan in the House — Life at the Riad | Riad di Siena",
    description:
      "The harira starts at four. By five, the whole derb smells of it. Field notes from Ramadan inside a 300-year-old riad in Marrakech medina.",
    images: [
      {
        url: "https://res.cloudinary.com/riad-di-siena/image/upload/v1/life/ramadan-courtyard.jpg",
        width: 1200,
        height: 800,
        alt: "Riad di Siena courtyard during Ramadan",
      },
    ],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Ramadan in the House",
  description:
    "Field notes from Ramadan inside a 300-year-old riad in Marrakech medina.",
  author: {
    "@type": "Organization",
    name: "Riad di Siena",
    url: "https://www.riaddisiena.com",
  },
  publisher: {
    "@type": "Organization",
    name: "Riad di Siena",
    url: "https://www.riaddisiena.com",
  },
  about: {
    "@type": "LodgingBusiness",
    "@id": "https://www.riaddisiena.com/#lodgingbusiness",
    name: "Riad di Siena",
  },
  keywords: [
    "Ramadan Marrakech",
    "medina life",
    "riad marrakech",
    "iftar",
    "harira",
    "laksour marrakech",
  ],
  articleSection: "Culture",
};

export default function RamadanPage() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#f8f5f0", color: "#2a2520" }}
    >
      <Script id="ramadan-schema" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>

      <Header />

      <main
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          padding: "140px clamp(24px, 6vw, 48px) 120px",
        }}
      >
        {/* Back */}
        <Link
          href="/life"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "11px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#9c8060",
            textDecoration: "none",
            display: "inline-block",
            marginBottom: "56px",
          }}
        >
          ← Field Notes
        </Link>

        {/* Pillar */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "10px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#8b7355",
            marginBottom: "16px",
          }}
        >
          Culture
        </p>

        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 6vw, 56px)",
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: "-0.01em",
            marginBottom: "48px",
          }}
        >
          Ramadan in the House
        </h1>

        {/* Hero image */}
        <div
          style={{
            aspectRatio: "4/3",
            backgroundColor: "#c4a882",
            marginBottom: "56px",
            overflow: "hidden",
          }}
        >
          <img
            src="https://res.cloudinary.com/riad-di-siena/image/upload/v1/life/ramadan-courtyard.jpg"
            alt="The courtyard at Riad di Siena during Ramadan"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        {/* Body */}
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "18px",
            lineHeight: 1.8,
            color: "#2a2520",
          }}
        >
          <p style={{ marginBottom: "28px" }}>
            The harira starts at four. By five, the whole derb smells of it —
            tomato and celery and something spiced underneath that I still
            can't name after eleven years. The neighbour downstairs makes the
            best harira in the street. She knows it. She's never offered to
            share the recipe.
          </p>

          <p style={{ marginBottom: "28px" }}>
            The medina is strange during Ramadan. By midday it has gone
            somewhere else entirely — not quiet exactly, but interior. The
            usual commerce of the streets pulls back. The men in the café near
            Bab Laksour sit without their coffee. The whole city is waiting
            for something.
          </p>

          <p style={{ marginBottom: "28px" }}>
            The courtyard changes too. The walls seem thicker. The fountain
            sounds louder when there's less noise to compete with. Guests who
            arrive during Ramadan often remark on it — not the fasting, which
            they expected, but the particular quality of the silence inside
            the house.
          </p>

          {/* Pull quote */}
          <blockquote
            style={{
              borderLeft: "2px solid #c4a882",
              paddingLeft: "28px",
              margin: "48px 0",
              fontStyle: "italic",
              fontSize: "20px",
              lineHeight: 1.6,
              color: "#6b5c4e",
            }}
          >
            The cannon fires from the Kasbah at exactly the right moment.
            It always surprises me, even after eleven Ramadans. Then the
            whole medina exhales at once.
          </blockquote>

          <p style={{ marginBottom: "28px" }}>
            Zahra breaks her fast with us when guests are here. She brings
            the dates and the harira up to the rooftop and we eat together
            with the Atlas going pink in the distance. It is one of the
            better things about running a guesthouse — these accidental
            communal tables that nobody planned.
          </p>

          <p style={{ marginBottom: "28px" }}>
            After iftar, the medina does something remarkable. It reverses.
            Everything that was absent floods back in. The street food
            stalls appear from nowhere. Children run. Music comes from
            somewhere above the rooftops. The city that went interior for
            fourteen hours suddenly has nowhere to put all its energy.
          </p>

          <p style={{ marginBottom: "28px" }}>
            If you're visiting during Ramadan, the only thing you need to
            know is this: the second half of the night is the good half.
            Stay up for it. The city will find you.
          </p>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            backgroundColor: "#e0d5c8",
            margin: "64px 0",
          }}
        />

        {/* Back to grid */}
        <Link
          href="/life"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "11px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#2a2520",
            textDecoration: "none",
            borderBottom: "1px solid #2a2520",
            paddingBottom: "2px",
          }}
        >
          All Field Notes
        </Link>
      </main>

      <Footer />
    </div>
  );
}
