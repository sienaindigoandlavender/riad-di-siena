import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "The Breakfast Hour",
  description:
    "Zahra sets the courtyard table before anyone is awake. The bread arrives warm from the communal oven. The light comes down through the open sky above the fountain.",
  alternates: {
    canonical: "https://www.riaddisiena.com/life/the-breakfast-hour",
  },
  openGraph: {
    title: "The Breakfast Hour — Life at the Riad | Riad di Siena",
    description:
      "Zahra sets the courtyard table before anyone is awake. The bread arrives warm from the communal oven. The light comes down through the open sky above the fountain.",
    images: [
      {
        url: "https://res.cloudinary.com/riad-di-siena/image/upload/v1/life/breakfast-courtyard.jpg",
        width: 1200,
        height: 800,
        alt: "Breakfast in the courtyard at Riad di Siena",
      },
    ],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The Breakfast Hour",
  description:
    "Field notes on the morning ritual at Riad di Siena — rooftop breakfast, fresh bread from the communal oven, and the Atlas Mountains at dawn.",
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
    "riad breakfast marrakech",
    "breakfast in riad courtyard",
    "riad di siena",
    "moroccan breakfast",
    "medina marrakech",
  ],
  articleSection: "Food",
};

export default function BreakfastPage() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#f8f5f0", color: "#2a2520" }}
    >
      <Script id="breakfast-schema" type="application/ld+json">
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

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "10px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#6b5240",
            marginBottom: "16px",
          }}
        >
          Food
        </p>

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
          The Breakfast Hour
        </h1>

        <div
          style={{
            aspectRatio: "4/3",
            backgroundColor: "#d4b896",
            marginBottom: "56px",
            overflow: "hidden",
          }}
        >
          <img
            src="https://res.cloudinary.com/riad-di-siena/image/upload/v1/life/breakfast-courtyard.jpg"
            alt="Breakfast table in the courtyard at Riad di Siena"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "18px",
            lineHeight: 1.8,
            color: "#2a2520",
          }}
        >
          <p style={{ marginBottom: "28px" }}>
            Zahra sets the courtyard table before anyone is awake. I don't know
            exactly when she does it — I've never managed to be up early
            enough to catch her at it. By the time guests come down, the table
            is already there: the bread warm in its cloth, the argan oil in
            its small ceramic bowl, the amlou in another, the eggs done the
            way she's decided they should be done.
          </p>

          <p style={{ marginBottom: "28px" }}>
            The bread comes from the communal oven at the end of the derb.
            It has been there longer than the house has been a guesthouse,
            longer than anyone can reliably remember. The baker knows our
            bread by its shape. We don't have a mark — Zahra just uses the
            round one with the slight thickness in the middle that means she
            pressed it herself that morning.
          </p>

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
            The light comes down through the open sky above the fountain at
            a particular angle in the morning. The courtyard was designed for
            exactly this — three hundred years ago someone understood where
            the sun would be.
          </blockquote>

          <p style={{ marginBottom: "28px" }}>
            Guests ask what time breakfast is. We say eight, which is
            technically true. But the better answer is: whenever you come down.
            The table holds. The fountain runs. The medina does its morning
            thing on the other side of the door and you sit in the courtyard
            with your tea and the bread and the light doing its slow arc
            through the open sky above you.
          </p>

          <p style={{ marginBottom: "28px" }}>
            Amlou is the thing people ask about most. It's a paste — almond,
            argan, honey, made in the Souss. You eat it with the bread. It is
            indescribably good. We get ours from a woman in the souk whose
            family has been making it for three generations. I have tried to
            recreate it at home and failed completely.
          </p>

          <p style={{ marginBottom: "28px" }}>
            Some mornings guests don't come up for a long time. They sit in
            the courtyard first, in the chairs by the fountain, and just
            exist. This is correct behaviour. The house encourages it. The
            rooftop will still be there. The bread — well, Zahra will make
            more.
          </p>
        </div>

        <div
          style={{
            height: "1px",
            backgroundColor: "#e0d5c8",
            margin: "64px 0",
          }}
        />

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
