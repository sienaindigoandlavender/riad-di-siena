"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const entries = [
  {
    slug: "ramadan-in-the-house",
    title: "Ramadan in the House",
    excerpt:
      "The harira starts at four. By five, the whole derb smells of it. The medina empties out, then fills again all at once.",
    pillar: "Culture",
    image:
      "https://res.cloudinary.com/riad-di-siena/image/upload/v1/life/ramadan-courtyard.jpg",
    fallback: "#c4a882",
  },
  {
    slug: "the-breakfast-hour",
    title: "The Breakfast Hour",
    excerpt:
      "Zahra sets the courtyard table before anyone is awake. The bread arrives warm from the communal oven. The light comes down through the open sky above the fountain.",
    pillar: "Food",
    image:
      "https://res.cloudinary.com/riad-di-siena/image/upload/v1/life/breakfast-courtyard.jpg",
    fallback: "#d4b896",
  },
  {
    slug: "the-courtyard-in-march",
    title: "The Courtyard in March",
    excerpt:
      "March is the best month. The cold has left the stone but the heat hasn't arrived. The orange tree is doing something extraordinary.",
    pillar: "Architecture",
    image:
      "https://res.cloudinary.com/riad-di-siena/image/upload/v1/life/courtyard-march.jpg",
    fallback: "#b8a070",
  },
];

const pillarColors: Record<string, string> = {
  Culture: "#8b7355",
  Food: "#6b5240",
  Architecture: "#7a6048",
  Community: "#5c4a35",
  Lifestyle: "#9c8060",
};

export default function LifePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f5f0", color: "#2a2520" }}>
      <Header />

      <main>
        {/* Header */}
        <section
          style={{
            paddingTop: "140px",
            paddingBottom: "60px",
            paddingLeft: "clamp(24px, 6vw, 96px)",
            paddingRight: "clamp(24px, 6vw, 96px)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "11px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#9c8060",
              marginBottom: "20px",
            }}
          >
            Field Notes
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              maxWidth: "640px",
            }}
          >
            Life at the Riad
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "17px",
              lineHeight: 1.7,
              color: "#6b5c4e",
              maxWidth: "480px",
              marginTop: "24px",
            }}
          >
            Notes from inside the house. The kitchen, the courtyard,
            the neighbours, the seasons.
          </p>
        </section>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            backgroundColor: "#e0d5c8",
            marginLeft: "clamp(24px, 6vw, 96px)",
            marginRight: "clamp(24px, 6vw, 96px)",
          }}
        />

        {/* Grid */}
        <section
          style={{
            padding: "72px clamp(24px, 6vw, 96px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "48px 40px",
          }}
        >
          {entries.map((entry, i) => (
            <Link
              key={entry.slug}
              href={`/life/${entry.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <article
                style={{
                  cursor: "pointer",
                }}
                className="life-card"
              >
                {/* Image */}
                <div
                  style={{
                    aspectRatio: i === 0 ? "4/3" : "3/2",
                    backgroundColor: entry.fallback,
                    marginBottom: "24px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <img
                    src={entry.image}
                    alt={entry.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.6s ease",
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>

                {/* Pillar tag */}
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "10px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: pillarColors[entry.pillar] || "#9c8060",
                    marginBottom: "10px",
                  }}
                >
                  {entry.pillar}
                </p>

                {/* Title */}
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(22px, 2.5vw, 28px)",
                    fontWeight: 400,
                    lineHeight: 1.2,
                    marginBottom: "14px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {entry.title}
                </h2>

                {/* Excerpt */}
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "15px",
                    lineHeight: 1.7,
                    color: "#6b5c4e",
                  }}
                >
                  {entry.excerpt}
                </p>

                {/* Read link */}
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "11px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "#2a2520",
                    marginTop: "20px",
                    borderBottom: "1px solid #2a2520",
                    display: "inline-block",
                    paddingBottom: "2px",
                  }}
                >
                  Read
                </p>
              </article>
            </Link>
          ))}
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        .life-card:hover img {
          transform: scale(1.03);
        }
      `}</style>
    </div>
  );
}
