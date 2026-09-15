import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Kasbah",
  description: "An ancient fortified house deep in the Moroccan south. Part of the Riad di Siena collection. Palm groves, earthen walls, the silence of the desert's edge.",
  openGraph: {
    title: "The Kasbah | Riad di Siena",
    description: "An ancient fortified house in the Moroccan south. Palm groves, earthen walls, silence.",
  },
  alternates: {
    canonical: "https://www.riaddisiena.com/the-kasbah",
  },
};

export default function TheKasbahLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
