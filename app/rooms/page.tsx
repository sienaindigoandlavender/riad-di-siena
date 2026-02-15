import { getRooms, getHero, getList, getSettings } from "@/lib/data";
import RoomsClient from "./RoomsClient";

export default async function RoomsPage() {
  const [rooms, hero, gallery, settings, douariaHero, kasbahHero, desertHero] = await Promise.all([
    getRooms("rooms"),
    getHero("rooms_hero"),
    getList("rooms_gallery"),
    getSettings(),
    getHero("douaria_hero"),
    getHero("kasbah_hero"),
    getHero("desert_hero"),
  ]);

  const cityTaxPerNight = settings.city_tax_eur ? parseFloat(settings.city_tax_eur) : 2.5;

  const beyondProperties = [
    {
      name: "The Douaria",
      tagline: "Steps from the riad",
      description: "A modern annex with three contemporary rooms and a private rooftop terrace.",
      image: douariaHero?.Image_URL || "",
      href: "/the-douaria",
    },
    {
      name: "The Kasbah",
      tagline: "Draa Valley",
      description: "A 500-year-old fortified house among the palm groves of Morocco's deep south.",
      image: kasbahHero?.Image_URL || "",
      href: "/the-kasbah",
    },
    {
      name: "The Desert Camp",
      tagline: "Erg Chebbi, Sahara",
      description: "Traditional nomad tents beneath the dunes. Camel treks, stargazing, silence.",
      image: desertHero?.Image_URL || "",
      href: "/the-desert-camp",
    },
  ];

  return (
    <RoomsClient
      rooms={rooms}
      hero={hero}
      gallery={gallery}
      cityTaxPerNight={cityTaxPerNight}
      beyondProperties={beyondProperties}
    />
  );
}
