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

function getStatusClass(status: string | null) {
  if (status === "Prodáno") {
    return "bg-red-100 text-red-700 border-red-200";
  }

  if (status === "Rezervováno") {
    return "bg-yellow-100 text-yellow-800 border-yellow-200";
  }

  return "bg-green-100 text-green-700 border-green-200";
}

function formatDate(date: string | null) {
  if (!date) return "Neuvedeno";

  return new Date(date).toLocaleDateString("cs-CZ", {
    month: "2-digit",
    year: "numeric",
  });
}

export default async function CarDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: car, error } = await supabase
    .from("cars")
    .select("*")
    .or(`id.eq.${params.id},slug.eq.${params.id}`)
    .single();
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

  if (car) {
    await supabase
      .from("cars")
      .update({ views: (car.views || 0) + 1 })
      .eq("id", car.id);
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

  const { data: similarCars } = await supabase
    .from("cars")
    .select("id, brand, model, year, mileage, price, fuel, transmission, engine_volume, city, image_url, is_featured")
    .eq("brand", car.brand)
    .neq("id", car.id)
    .order("is_featured", { ascending: false })
    .order("id", { ascending: false })
    .limit(3);

  const views = (car.views || 0) + 1;
  const status = car.status || "Aktivní";

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
            <div className="mb-4 flex flex-wrap gap-3">
              <span
                className={`inline-flex rounded-full border px-4 py-2 text-sm font-semibold ${getStatusClass(
                  status
                )}`}
              >
                {status}
              </span>

              {car.is_featured && (
                <span className="inline-flex rounded-full border border-yellow-300 bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-800">
                  TOP nabídka
                </span>
              )}
            </div>

            <h1 className="text-4xl font-bold">
              {car.brand} {car.model}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span>👁 {views.toLocaleString()} zobrazení</span>
              <span>ID inzerátu: {car.id}</span>
              {car.vin && <span>VIN: {car.vin}</span>}
            </div>

            <div className="mt-4 text-4xl font-bold text-orange-600">
              {car.price?.toLocaleString()} Kč
            </div>

            <FavoriteButton carId={car.id} />

            <div className="mt-8 rounded-2xl border bg-gray-50 p-6">
              <h2 className="mb-5 text-2xl font-bold">Technické údaje</h2>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Rok výroby</p>
                  <p className="font-semibold">{car.year || "Neuvedeno"}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Najeto</p>
                  <p className="font-semibold">
                    {car.mileage
                      ? `${car.mileage.toLocaleString()} km`
                      : "Neuvedeno"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Karoserie</p>
                  <p className="font-semibold">
                    {car.body_type || "Neuvedeno"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Barva</p>
                  <p className="font-semibold">{car.color || "Neuvedeno"}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Objem motoru</p>
                  <p className="font-semibold">
                    {car.engine_volume
                      ? `${car.engine_volume} l`
                      : "Neuvedeno"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Palivo</p>
                  <p className="font-semibold">{car.fuel || "Neuvedeno"}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Převodovka</p>
                  <p className="font-semibold">
                    {car.transmission || "Neuvedeno"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Výkon</p>
                  <p className="font-semibold">
                    {car.power ? `${car.power} kW` : "Neuvedeno"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Pohon</p>
                  <p className="font-semibold">
                    {car.drive_type || "Neuvedeno"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Počet majitelů</p>
                  <p className="font-semibold">
                    {car.owner_count || "Neuvedeno"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Euro norma</p>
                  <p className="font-semibold">
                    {car.euro_norm || "Neuvedeno"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">STK do</p>
                  <p className="font-semibold">
                    {formatDate(car.stk_until || null)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Město</p>
                  <p className="font-semibold">{car.city || "Neuvedeno"}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">VIN</p>
                  <p className="break-all font-semibold">
                    {car.vin || "Neuvedeno"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="mb-3 text-xl font-bold">Popis vozidla</h2>
              <p className="whitespace-pre-line text-gray-600">
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

        {similarCars && similarCars.length > 0 && (
          <section className="mt-12">
            <h2 className="text-3xl font-bold">Podobná vozidla</h2>

            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {similarCars.map((similarCar) => (
                <div
                  key={similarCar.id}
                  className="overflow-hidden rounded-2xl bg-white shadow"
                >
                  <div className="relative">
                    {similarCar.is_featured && (
                      <div className="absolute left-3 top-3 z-10 rounded-full bg-yellow-400 px-3 py-1 text-sm font-bold text-black shadow">
                        TOP
                      </div>
                    )}

                    {similarCar.image_url ? (
                      <img
                        src={similarCar.image_url}
                        alt={`${similarCar.brand} ${similarCar.model}`}
                        className="h-56 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-56 items-center justify-center bg-gray-200">
                        🚗 Foto vozidla
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-semibold">
                      {similarCar.brand} {similarCar.model}
                    </h3>

                    <p className="mt-2 text-gray-600">
                      {similarCar.year} •{" "}
                      {similarCar.engine_volume
                        ? `${similarCar.engine_volume} l • `
                        : ""}
                      {similarCar.mileage?.toLocaleString()} km
                    </p>

                    <p className="mt-1 text-gray-500">
                      {similarCar.fuel}
                      {similarCar.transmission
                        ? ` • ${similarCar.transmission}`
                        : ""}
                      {similarCar.city ? ` • ${similarCar.city}` : ""}
                    </p>

                    <div className="mt-4 text-2xl font-bold text-orange-600">
                      {similarCar.price?.toLocaleString()} Kč
                    </div>

                    <Link
                      href={`/cars/${similarCar.id}`}
                      className="mt-4 block w-full rounded-xl bg-gray-900 py-3 text-center text-white"
                    >
                      Detail vozu
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}