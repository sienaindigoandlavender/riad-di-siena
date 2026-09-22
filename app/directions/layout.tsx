import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Directions",
  description: "How to find Riad di Siena in Marrakech medina.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DirectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
