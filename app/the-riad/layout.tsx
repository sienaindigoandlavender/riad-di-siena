import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The House — 18th-Century Riad in Marrakech Medina",
  description: "A 300-year-old traditional Moroccan house in the heart of Marrakech medina. Original zellige tilework, carved cedar ceilings, a courtyard fountain, and rooftop terrace with Atlas views.",
  openGraph: {
    title: "The House | Riad di Siena",
    description: "A 300-year-old house in Marrakech medina. Original tilework, carved plaster, and a courtyard with three centuries of history.",
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
