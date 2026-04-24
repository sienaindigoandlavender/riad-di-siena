import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rooms — Riad di Siena | Marrakech Medina",
  description: "Six rooms across two 18th-century houses in the Laksour quarter, two minutes from Jemaa el-Fna. Original zellige, carved plaster, rooftop terrace with Atlas views. Breakfast included.",
  alternates: { canonical: "https://www.riaddisiena.com/rooms" },
  openGraph: {
    title: "Rooms — Riad di Siena",
    description: "Six rooms across two historic Marrakech houses. Zellige tilework, rooftop terrace, daily Moroccan breakfast. Two minutes from Jemaa el-Fna.",
    url: "https://www.riaddisiena.com/rooms",
    type: "website",
    siteName: "Riad di Siena",
    images: [{ url: "https://www.riaddisiena.com/og-image.jpg", width: 1200, height: 630, alt: "Rooms at Riad di Siena Marrakech" }],
  },
};
export default function RoomsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
