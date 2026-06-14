import { supabase } from "@/lib/supabase";
import Link from "next/link";
import CarGallery from "./CarGallery";
import FavoriteButton from "./FavoriteButton";

export const revalidate = 0;

const fallbackImages: Record<number, string> = {
  1: "https://tjlkzovdbiasoibygbei.supabase.co/storage/v1/object/public/cars/octavia.jpg",
  2: "https://tjlkzovdbiasoibygbei.supabase.co/storage/v1/object/public/cars/audi.jpg",
  3: "https://tjlkzovdbiasoibygbei.supabase.co/storage/v1/object/public/cars/bmw.jpg",
};

export default async function CarDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: car, error } = await supabase
    .from("cars")
    .select("*")
    .eq("id", params.id)
    .single();

  if (car) {
    await supabase
      .from("cars")
      .update({ views: (car.views || 0) + 1 })
      .eq("id", params.id);
  }

  const { data: images } = await supabase
    .from("car_images")
    .select("image_url")
    .eq("car_id", params.id)
    .order("id", { ascending: true });

  if (error || !car) {
    return (
      <main className="p-10">
        <h1 className="text-3xl font-bold">Auto nebylo nalezeno</h1>
        <Link href="/cars" className="mt-4 inline-block text-orange-600">
          Zpět na nabídku
        </Link>
      </main>
    );
  }

  const views = (car.views || 0) + 1;

  const galleryImages =
    images && images.length > 0
      ? images.map((image) => image.image_url)
      : [car.image_url || fallbackImages[Number(car.id)]].filter(Boolean);

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Link href="/cars" className="text-orange-600 hover:underline">
          ← Zpět na nabídku
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <CarGallery
            images={galleryImages}
            title={`${car.brand} ${car.model}`}
          />

          <div className="rounded-2xl bg-white p-8 shadow">
            <h1 className="text-4xl font-bold">
              {car.brand} {car.model}
            </h1>

            <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
              <span>👁 {views.toLocaleString()} zobrazení</span>
              <span>ID inzerátu: {car.id}</span>
            </div>

            <div className="mt-4 text-4xl font-bold text-orange-600">
              {car.price?.toLocaleString()} Kč
            </div>

            <FavoriteButton carId={car.id} />

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Rok výroby</p>
                <p className="font-semibold">{car.year}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Najeto</p>
                <p className="font-semibold">
                  {car.mileage?.toLocaleString()} km
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Objem motoru</p>
                <p className="font-semibold">
                  {car.engine_volume ? `${car.engine_volume} l` : "Neuvedeno"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Palivo</p>
                <p className="font-semibold">{car.fuel}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Převodovka</p>
                <p className="font-semibold">{car.transmission}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Výkon</p>
                <p className="font-semibold">{car.power} kW</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Město</p>
                <p className="font-semibold">{car.city}</p>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="mb-3 text-xl font-bold">Popis vozidla</h2>
              <p className="text-gray-600">
                {car.description || "Popis vozidla není k dispozici."}
              </p>
            </div>

            <div className="mt-10 rounded-2xl border bg-gray-50 p-6">
              <h2 className="mb-4 text-2xl font-bold">
                Kontakt na prodejce
              </h2>

              {car.seller_name && (
                <div className="mb-3">
                  <p className="text-sm text-gray-500">Jméno</p>
                  <p className="font-semibold">{car.seller_name}</p>
                </div>
              )}

              {car.seller_phone && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Telefon</p>
                  <a
                    href={`tel:${car.seller_phone}`}
                    className="text-lg font-semibold text-orange-600 hover:underline"
                  >
                    {car.seller_phone}
                  </a>
                </div>
              )}

              {car.seller_email && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500">E-mail</p>
                  <a
                    href={`mailto:${car.seller_email}`}
                    className="font-semibold text-orange-600 hover:underline"
                  >
                    {car.seller_email}
                  </a>
                </div>
              )}

              {car.seller_phone && (
                <a
                  href={`https://wa.me/${car.seller_phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block w-full rounded-xl bg-green-600 py-4 text-center text-lg font-semibold text-white hover:bg-green-700"
                >
                  WhatsApp
                </a>
              )}

              {!car.seller_name && !car.seller_phone && !car.seller_email && (
                <p className="text-gray-500">
                  Kontaktní údaje nejsou k dispozici.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}