import { getRooms, getHero, getList, getSettings } from "@/lib/data";
import RoomsClient from "./RoomsClient";

export default async function RoomsPage() {
  const [rooms, hero, gallery, settings] = await Promise.all([
    getRooms("rooms"),
    getHero("rooms_hero"),
    getList("rooms_gallery"),
    getSettings(),
  ]);

  const cityTaxPerNight = settings.city_tax_eur ? parseFloat(settings.city_tax_eur) : 2.5;

  return (
    <RoomsClient
      rooms={rooms}
      hero={hero}
      gallery={gallery}
      cityTaxPerNight={cityTaxPerNight}
    />
  );
}
