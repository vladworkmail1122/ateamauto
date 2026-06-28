import HomePageClient, { type HomeCar } from "@/app/components/HomePageClient";
import { supabase } from "@/lib/supabase";

export const revalidate = 0;

const carSelect =
  "id, slug, brand, model, year, mileage, price, fuel, transmission, engine_volume, city, image_url, is_featured, is_verified_by_ateam, vin";

export default async function Home() {
  const { data: featuredCars } = await supabase
    .from("cars")
    .select(carSelect)
    .eq("is_featured", true)
    .order("id", { ascending: false })
    .limit(3);

  const { data: verifiedCars } = await supabase
    .from("cars")
    .select(carSelect)
    .eq("is_verified_by_ateam", true)
    .order("id", { ascending: false })
    .limit(3);

  const { data: latestCars } = await supabase
    .from("cars")
    .select(carSelect)
    .order("id", { ascending: false })
    .limit(6);

  const { count: verifiedCount } = await supabase
    .from("cars")
    .select("*", { count: "exact", head: true })
    .eq("is_verified_by_ateam", true);

  return (
    <HomePageClient
      featuredCars={(featuredCars || []) as HomeCar[]}
      verifiedCars={(verifiedCars || []) as HomeCar[]}
      latestCars={(latestCars || []) as HomeCar[]}
      verifiedCount={verifiedCount || 0}
    />
  );
}
