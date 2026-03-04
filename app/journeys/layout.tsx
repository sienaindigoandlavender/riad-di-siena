import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Morocco Journeys — Marrakech to Sahara",
  description: "Curated Morocco journeys from Riad di Siena. The Slow Way South: Marrakech to Sahara through the Atlas Mountains, Draa Valley, and Erg Chebbi dunes.",
  openGraph: {
    title: "Morocco Journeys | Riad di Siena",
    description: "Curated Morocco journeys. Marrakech to Sahara through Atlas Mountains and Draa Valley.",
  },
  alternates: {
    canonical: "https://www.riaddisiena.com/journeys",
  },
};

export default function JourneysLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
