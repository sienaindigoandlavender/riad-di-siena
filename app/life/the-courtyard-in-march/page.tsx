import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "The Courtyard in March",
  description:
    "March is the best month. The cold has left the stone but the heat hasn't arrived. The orange tree is doing something extraordinary.",
  alternates: {
    canonical: "https://www.riaddisiena.com/life/the-courtyard-in-march",
  },
  openGraph: {
    title: "The Courtyard in March — Life at the Riad | Riad di Siena",
    description:
      "March is the best month. The cold has left the stone but the heat hasn't arrived. The orange tree is doing something extraordinary.",
    images: [
      {
        url: "https://res.cloudinary.com/riad-di-siena/image/upload/v1/life/courtyard-march.jpg",
        width: 1200,
        height: 800,
        alt: "Riad di Siena courtyard in March with orange blossom",
      },
    ],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The Courtyard in March",
  description:
    "Field notes on the best month at Riad di Siena — March in a 300-year-old Marrakech riad, when the orange tree blooms and the stone is finally warm.",
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
    "riad marrakech spring",
    "marrakech in march",
    "riad courtyard",
    "orange blossom marrakech",
    "best time to visit marrakech",
    "riad di siena",
  ],
  articleSection: "Architecture",
};

export default function CourtyardMarchPage() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#f8f5f0", color: "#2a2520" }}
    >
      <Script id="courtyard-schema" type="application/ld+json">
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
            color: "#7a6048",
            marginBottom: "16px",
          }}
        >
          Architecture
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
          The Courtyard in March
        </h1>

        <div
          style={{
            aspectRatio: "4/3",
            backgroundColor: "#b8a070",
            marginBottom: "56px",
            overflow: "hidden",
          }}
        >
          <img
            src="https://res.cloudinary.com/riad-di-siena/image/upload/v1/life/courtyard-march.jpg"
            alt="The courtyard at Riad di Siena in March with orange tree in bloom"
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
            March is the best month. I'll argue about this with anyone. The
            cold has left the stone but the heat hasn't arrived yet. The
            house sits at a temperature that no machine could reproduce —
            something the walls worked out over three hundred years of
            accommodation, a thermal intelligence baked into the mud and
            lime.
          </p>

          <p style={{ marginBottom: "28px" }}>
            The orange tree is doing something extraordinary. It blooms once
            a year, in March, for about two weeks. The smell comes through
            the whole house. Guests come down to breakfast and stop in the
            doorway. You can see the exact moment it lands on them.
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
            The zellige around the fountain was laid by someone who is long
            dead. The slightly uneven tile in the third row from the bottom
            is where his hand slipped. I find this enormously comforting.
          </blockquote>

          <p style={{ marginBottom: "28px" }}>
            A riad courtyard is not decorative. It is functional in a way
            that modern architecture has forgotten how to be. Open to the sky
            for light and rain and air. The fountain for cooling. The thick
            walls for everything else. In summer, the courtyard is ten
            degrees cooler than the medina street. In March, it is simply
            perfect.
          </p>

          <p style={{ marginBottom: "28px" }}>
            People ask about the best time to visit Marrakech. They mean:
            when is it not too hot, not too cold, not too crowded. The answer
            is March. The answer has always been March. Come in March and sit
            in the courtyard with your tea and the orange tree doing its
            annual thing above the fountain, and you'll understand why I've
            been here for eleven years and haven't left.
          </p>

          <p style={{ marginBottom: "28px" }}>
            The swallows come back in March too. They nest in the same
            spot above the courtyard door, year after year. I don't know
            if it's the same swallows or their children. It doesn't matter.
            They know the house.
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
