import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import CarDetailClient, {
  type CarDetailCar,
  type SimilarCar,
} from "./CarDetailClient";

export const revalidate = 0;

const fallbackImages: Record<number, string> = {
  1: "https://tjlkzovdbiasoibygbei.supabase.co/storage/v1/object/public/cars/octavia.jpg",
  2: "https://tjlkzovdbiasoibygbei.supabase.co/storage/v1/object/public/cars/audi.jpg",
  3: "https://tjlkzovdbiasoibygbei.supabase.co/storage/v1/object/public/cars/bmw.jpg",
};

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const isNumericId = /^\d+$/.test(params.id);

  const { data: car } = isNumericId
    ? await supabase
        .from("cars")
        .select("*")
        .eq("id", Number(params.id))
        .single()
    : await supabase.from("cars").select("*").eq("slug", params.id).single();

  if (!car) {
    return {
      title: "Auto nebylo nalezeno | ATEAM AUTO",
      description: "Inzerát nebyl nalezen.",
    };
  }

  const title = `${car.brand} ${car.model} ${car.year || ""} | ATEAM AUTO`;

  const description = `${car.brand} ${car.model}, ${car.year || ""}, ${
    car.mileage ? `${car.mileage.toLocaleString()} km` : "nájezd neuveden"
  }, ${car.fuel || "palivo neuvedeno"}, ${
    car.transmission || "převodovka neuvedena"
  }. Cena ${car.price ? `${car.price.toLocaleString()} Kč` : "dohodou"}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: car.image_url ? [car.image_url] : [],
      type: "website",
    },
  };
}

export default async function CarDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const isNumericId = /^\d+$/.test(params.id);

  const { data: car, error } = isNumericId
    ? await supabase
        .from("cars")
        .select("*")
        .eq("id", Number(params.id))
        .single()
    : await supabase.from("cars").select("*").eq("slug", params.id).single();

  if (error || !car) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-bold sm:text-3xl">Auto nebylo nalezeno</h1>

        <Link href="/cars" className="mt-4 inline-block text-orange-600">
          Zpět na nabídku
        </Link>
      </main>
    );
  }

  await supabase
    .from("cars")
    .update({ views: (car.views || 0) + 1 })
    .eq("id", car.id);

  const { data: images } = await supabase
    .from("car_images")
    .select("image_url")
    .eq("car_id", car.id)
    .order("id", { ascending: true });

  const { count: favoriteCount } = await supabase
    .from("favorites")
    .select("*", { count: "exact", head: true })
    .eq("car_id", car.id);

  const { data: similarCars } = await supabase
    .from("cars")
    .select(
      "id, slug, brand, model, year, mileage, price, fuel, transmission, engine_volume, city, image_url, is_featured, is_verified_by_ateam, vin, status, body_type, views",
    )
    .eq("brand", car.brand)
    .neq("id", car.id)
    .order("is_featured", { ascending: false })
    .order("id", { ascending: false })
    .limit(3);

  const galleryImages =
    images && images.length > 0
      ? images.map((image) => image.image_url)
      : [car.image_url || fallbackImages[Number(car.id)]].filter(
          (image): image is string => Boolean(image),
        );

  return (
    <CarDetailClient
      car={car as CarDetailCar}
      galleryImages={galleryImages}
      favoriteCount={favoriteCount || 0}
      similarCars={(similarCars || []) as SimilarCar[]}
    />
  );
}
