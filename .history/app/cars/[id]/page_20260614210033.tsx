import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import CarGallery from "./CarGallery";
import FavoriteButton from "./FavoriteButton";
import ShareButtons from "./ShareButtons";

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
        <h1 className="text-2xl font-bold sm:text-3xl">
          Auto nebylo nalezeno
        </h1>

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
      "id, slug, brand, model, year, mileage, price, fuel, transmission, engine_volume, city, image_url, is_featured",
    )
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
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
        <Link
          href="/cars"
          className="inline-block text-sm font-semibold text-orange-600 hover:underline sm:text-base"
        >
          ← Zpět na nabídku
        </Link>

        <div className="mt-5 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <CarGallery
            images={galleryImages}
            title={`${car.brand} ${car.model}`}
          />

          <div className="rounded-2xl bg-white p-5 shadow sm:p-8">
            <div className="mb-4 flex flex-wrap gap-2 sm:gap-3">
              <span
                className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold sm:px-4 sm:py-2 sm:text-sm ${getStatusClass(
                  status,
                )}`}
              >
                {status}
              </span>

              {car.is_featured && (
                <span className="inline-flex rounded-full border border-yellow-300 bg-yellow-100 px-3 py-1.5 text-xs font-semibold text-yellow-800 sm:px-4 sm:py-2 sm:text-sm">
                  TOP nabídka
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
              {car.brand} {car.model}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500 sm:gap-4 sm:text-sm">
              <span>👁 {views.toLocaleString()} zobrazení</span>
              <span>ID: {car.id}</span>
              {car.vin && <span className="break-all">VIN: {car.vin}</span>}
            </div>

            <div className="mt-4 text-3xl font-bold text-orange-600 sm:text-4xl">
              {car.price?.toLocaleString()} Kč
            </div>

            <div className="mt-4">
              <FavoriteButton carId={car.id} />
            </div>

            <ShareButtons
              title={`${car.brand} ${car.model} ${car.year || ""}`}
            />

            <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl border bg-gray-50 p-4 sm:mt-6 sm:gap-4 sm:p-5">
              <div>
                <p className="text-xs text-gray-500 sm:text-sm">Zobrazení</p>
                <p className="mt-1 text-lg font-bold sm:text-2xl">
                  👁 {views.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 sm:text-sm">Oblíbené</p>
                <p className="mt-1 text-lg font-bold sm:text-2xl">
                  ❤️ {favoriteCount || 0}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 sm:text-sm">ID</p>
                <p className="mt-1 text-lg font-bold sm:text-2xl">#{car.id}</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border bg-gray-50 p-4 sm:mt-8 sm:p-6">
              <h2 className="mb-4 text-xl font-bold sm:mb-5 sm:text-2xl">
                Technické údaje
              </h2>

              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <p className="text-xs text-gray-500 sm:text-sm">
                    Rok výroby
                  </p>
                  <p className="font-semibold">{car.year || "Neuvedeno"}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 sm:text-sm">Najeto</p>
                  <p className="font-semibold">
                    {car.mileage
                      ? `${car.mileage.toLocaleString()} km`
                      : "Neuvedeno"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 sm:text-sm">Karoserie</p>
                  <p className="font-semibold">
                    {car.body_type || "Neuvedeno"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 sm:text-sm">Barva</p>
                  <p className="font-semibold">{car.color || "Neuvedeno"}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 sm:text-sm">
                    Objem motoru
                  </p>
                  <p className="font-semibold">
                    {car.engine_volume ? `${car.engine_volume} l` : "Neuvedeno"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 sm:text-sm">Palivo</p>
                  <p className="font-semibold">{car.fuel || "Neuvedeno"}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 sm:text-sm">
                    Převodovka
                  </p>
                  <p className="font-semibold">
                    {car.transmission || "Neuvedeno"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 sm:text-sm">Výkon</p>
                  <p className="font-semibold">
                    {car.power ? `${car.power} kW` : "Neuvedeno"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 sm:text-sm">Pohon</p>
                  <p className="font-semibold">
                    {car.drive_type || "Neuvedeno"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 sm:text-sm">
                    Počet majitelů
                  </p>
                  <p className="font-semibold">
                    {car.owner_count || "Neuvedeno"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 sm:text-sm">
                    Euro norma
                  </p>
                  <p className="font-semibold">
                    {car.euro_norm || "Neuvedeno"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 sm:text-sm">STK do</p>
                  <p className="font-semibold">
                    {formatDate(car.stk_until || null)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 sm:text-sm">Město</p>
                  <p className="font-semibold">{car.city || "Neuvedeno"}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 sm:text-sm">VIN</p>
                  <p className="break-all font-semibold">
                    {car.vin || "Neuvedeno"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-10">
              <h2 className="mb-3 text-xl font-bold">Popis vozidla</h2>
              <p className="whitespace-pre-line text-sm leading-7 text-gray-600 sm:text-base">
                {car.description || "Popis vozidla není k dispozici."}
              </p>
            </div>

            <div className="mt-6 rounded-2xl border bg-gray-50 p-4 sm:mt-10 sm:p-6">
              <h2 className="mb-4 text-xl font-bold sm:text-2xl">
                Kontakt na prodejce
              </h2>

              {car.seller_name && (
                <div className="mb-3">
                  <p className="text-xs text-gray-500 sm:text-sm">Jméno</p>
                  <p className="font-semibold">{car.seller_name}</p>
                </div>
              )}

              {car.seller_phone && (
                <div className="mb-4">
                  <p className="text-xs text-gray-500 sm:text-sm">Telefon</p>
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
                  <p className="text-xs text-gray-500 sm:text-sm">E-mail</p>
                  <a
                    href={`mailto:${car.seller_email}`}
                    className="break-all font-semibold text-orange-600 hover:underline"
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
                  className="mt-4 block w-full rounded-xl bg-green-600 py-3 text-center font-semibold text-white hover:bg-green-700 sm:py-4 sm:text-lg"
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
          <section className="mt-10 sm:mt-12">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Podobná vozidla
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {similarCars.map((similarCar) => (
                <div
                  key={similarCar.id}
                  className="overflow-hidden rounded-2xl bg-white shadow"
                >
                  <div className="relative">
                    {similarCar.is_featured && (
                      <div className="absolute left-3 top-3 z-10 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-black shadow sm:text-sm">
                        TOP
                      </div>
                    )}

                    {similarCar.image_url ? (
                      <img
                        src={similarCar.image_url}
                        alt={`${similarCar.brand} ${similarCar.model}`}
                        className="h-48 w-full object-cover sm:h-56"
                      />
                    ) : (
                      <div className="flex h-48 items-center justify-center bg-gray-200 sm:h-56">
                        🚗 Foto vozidla
                      </div>
                    )}
                  </div>

                  <div className="p-4 sm:p-5">
                    <h3 className="text-lg font-bold sm:text-xl">
                      {similarCar.brand} {similarCar.model}
                    </h3>

                    <p className="mt-2 text-sm text-gray-600 sm:text-base">
                      {similarCar.year} •{" "}
                      {similarCar.engine_volume
                        ? `${similarCar.engine_volume} l • `
                        : ""}
                      {similarCar.mileage?.toLocaleString()} km
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {similarCar.fuel}
                      {similarCar.transmission
                        ? ` • ${similarCar.transmission}`
                        : ""}
                      {similarCar.city ? ` • ${similarCar.city}` : ""}
                    </p>

                    <div className="mt-3 text-2xl font-bold text-orange-600 sm:mt-4">
                      {similarCar.price?.toLocaleString()} Kč
                    </div>

                    <Link
                      href={`/cars/${similarCar.slug || similarCar.id}`}
                      className="mt-4 block w-full rounded-xl bg-gray-900 py-3 text-center text-sm font-semibold text-white sm:text-base"
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