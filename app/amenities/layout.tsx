import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amenities",
  description:
    "Amenities at Riad di Siena: rooftop terrace, courtyard garden, traditional hammam, and thoughtful details throughout this 300-year-old Marrakech riad.",
  openGraph: {
    title: "Amenities | Riad di Siena",
    description:
      "Discover the amenities at Riad di Siena — rooftop terrace, courtyard, hammam, and every detail designed for your comfort in Marrakech.",
  },
  alternates: {
    canonical: "https://www.riaddisiena.com/amenities",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AmenitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
