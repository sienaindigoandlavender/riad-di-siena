import { getHero, getList } from "@/lib/data";
import TheDesertCampClient from "./TheDesertCampClient";

export default async function TheDesertCampPage() {
  const [hero, paragraphs, rawTents, gallery] = await Promise.all([
    getHero("desert_hero"),
    getList("desert_content"),
    getList("desert_tents"),
    getList("desert_gallery"),
  ]);

  // Split features string into array if needed
  const tents = rawTents.map((tent: any) => ({
    ...tent,
    features: typeof tent.Features === "string"
      ? tent.Features.split(",").map((f: string) => f.trim())
      : tent.features || [],
  }));

  return (
    <TheDesertCampClient
      hero={hero}
      paragraphs={paragraphs}
      tents={tents}
      gallery={gallery}
    />
  );
}
