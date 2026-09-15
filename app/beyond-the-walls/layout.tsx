import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beyond the Walls",
  description: "Explore Morocco beyond Marrakech with Riad di Siena. The Kasbah in the Moroccan south, desert camps at the dunes, Atlas Mountain retreats, and coastal escapes.",
  openGraph: {
    title: "Beyond the Walls | Riad di Siena",
    description: "Explore Morocco beyond Marrakech. Kasbah, desert camps, Atlas retreats.",
  },
  alternates: {
    canonical: "https://www.riaddisiena.com/beyond-the-walls",
  },
};

export default function BeyondTheWallsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
