import { getHero, getList, getRooms, getSettings } from "@/lib/data";
import TheDouariaClient from "./TheDouariaClient";

export default async function TheDouariaPage() {
  const [hero, paragraphs, rooms, gallery, settings] = await Promise.all([
    getHero("douaria_hero"),
    getList("douaria_content"),
    getRooms("douaria_rooms"),
    getList("douaria_gallery"),
    getSettings(),
  ]);

  const cityTaxPerNight = settings.city_tax_eur ? parseFloat(settings.city_tax_eur) : 2.5;

  return (
    <TheDouariaClient
      hero={hero}
      paragraphs={paragraphs}
      rooms={rooms}
      gallery={gallery}
      cityTaxPerNight={cityTaxPerNight}
    />
  );
}
