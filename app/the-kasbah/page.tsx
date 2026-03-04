import { getHero, getList } from "@/lib/data";
import TheKasbahClient from "./TheKasbahClient";

export default async function TheKasbahPage() {
  const [hero, paragraphs, experiences, gallery] = await Promise.all([
    getHero("kasbah_hero"),
    getList("kasbah_content"),
    getList("kasbah_experience"),
    getList("kasbah_gallery"),
  ]);

  // Split includes string into array for experience
  const experience = experiences.length > 0 ? {
    ...experiences[0],
    includes: experiences[0].Includes
      ? experiences[0].Includes.split(",").map((s: string) => s.trim())
      : [],
  } : null;

  return (
    <TheKasbahClient
      hero={hero}
      paragraphs={paragraphs}
      experience={experience}
      gallery={gallery}
    />
  );
}
