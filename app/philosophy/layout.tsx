import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Philosophy — Slow Hospitality in Marrakech",
  description: "The Riad di Siena philosophy: slow hospitality, the art of Moroccan welcome, and a home in the heart of the medina.",
  openGraph: {
    title: "Our Philosophy | Riad di Siena",
    description: "Slow hospitality, authentic experiences, and the art of Moroccan welcome.",
  },
  alternates: {
    canonical: "https://www.riaddisiena.com/philosophy",
  },
};

export default function PhilosophyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
