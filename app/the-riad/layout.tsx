import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The House — 18th-Century Riad in Marrakech Medina",
  description: "A 300-year-old traditional Moroccan house in the heart of Marrakech medina. Tadelakt walls, bejmat floors, a central courtyard, and a rooftop terrace with Atlas views.",
  openGraph: {
    title: "The House | Riad di Siena",
    description: "A 300-year-old house in Marrakech medina. Tadelakt and bejmat, and a courtyard with three centuries of history.",
  },
  alternates: {
    canonical: "https://www.riaddisiena.com/the-riad",
  },
};

export default function TheRiadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
