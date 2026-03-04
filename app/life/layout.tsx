import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Life at the Riad — Riad di Siena",
    template: "%s — Life at the Riad | Riad di Siena",
  },
  description:
    "Field notes from inside a 300-year-old house in Marrakech medina. The kitchen, the courtyard, the neighbours, the seasons.",
  alternates: {
    canonical: "https://www.riaddisiena.com/life",
  },
  openGraph: {
    type: "website",
    siteName: "Riad di Siena",
  },
};

export default function LifeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
