import { getHero, getList, getSettings } from "@/lib/data";
import TheDouariaClient from "./TheDouariaClient";

export default async function TheDouariaPage() {
  // The Douaria is rented as the whole house only — no room-by-room data pulled.
  const [hero, gallery, settings] = await Promise.all([
    getHero("douaria_hero"),
    getList("douaria_gallery"),
    getSettings(),
  ]);

  const cityTaxPerNight = settings.city_tax_eur ? parseFloat(settings.city_tax_eur) : 2.5;

  return (
    <TheDouariaClient
      hero={hero}
      gallery={gallery}
      cityTaxPerNight={cityTaxPerNight}
    />
  );
}
