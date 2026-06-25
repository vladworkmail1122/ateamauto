import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
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

function formatPrice(price: number | null) {
  if (!price) return "Cena dohodou";
  return `${price.toLocaleString()} Kč`;
}

function formatMileage(mileage: number | null) {
  if (!mileage) return "Neuvedeno";
  return `${mileage.toLocaleString()} km`;
}

function formatEngineVolume(engineVolume: number | null) {
  if (!engineVolume) return "Neuvedeno";
  return `${engineVolume} l`;
}

function getVinCheckHref(vin: string | null) {
  return vin ? `/vin-check?vin=${encodeURIComponent(vin)}` : "/vin-check";
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string | number | null;
}) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
      <p className="text-xs font-medium text-gray-500 sm:text-sm">{label}</p>
      <p className="mt-1 break-words font-bold text-gray-900">
        {value || "Neuvedeno"}
      </p>
    </div>
  );
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
      "id, slug, brand, model, year, mileage, price, fuel, transmission, engine_volume, city, image_url, is_featured, is_verified_by_ateam, vin",
    )
    .eq("brand", car.brand)
    .neq("id", car.id)
    .order("is_featured", { ascending: false })
    .order("id", { ascending: false })
    .limit(3);

  const views = (car.views || 0) + 1;
  const status = car.status || "Aktivní";
  const vinCheckHref = getVinCheckHref(car.vin || null);
  const sellerPhoneDigits = car.seller_phone
    ? car.seller_phone.replace(/\D/g, "")
    : "";

  const galleryImages =
    images && images.length > 0
      ? images.map((image) => image.image_url)
      : [car.image_url || fallbackImages[Number(car.id)]].filter(
          (image): image is string => Boolean(image),
        );

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
        <Link
          href="/cars"
          className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-bold text-gray-700 shadow-sm ring-1 ring-gray-200 transition hover:text-orange-600 sm:text-base"
        >
          ← Zpět na nabídku
        </Link>

        <div className="mt-5 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <CarGallery
            images={galleryImages}
            title={`${car.brand} ${car.model}`}
          />

          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-gray-200 sm:p-8">
            <div className="mb-4 flex flex-wrap gap-2 sm:gap-3">
              <span
                className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-bold sm:px-4 sm:py-2 sm:text-sm ${getStatusClass(
                  status,
                )}`}
              >
                {status}
              </span>

              {car.is_featured && (
                <span className="inline-flex rounded-full border border-yellow-300 bg-yellow-100 px-3 py-1.5 text-xs font-bold text-yellow-800 sm:px-4 sm:py-2 sm:text-sm">
                  TOP nabídka
                </span>
              )}

              {car.is_verified_by_ateam && (
                <span className="inline-flex rounded-full border border-green-300 bg-green-100 px-3 py-1.5 text-xs font-black text-green-800 sm:px-4 sm:py-2 sm:text-sm">
                  ✓ Ověřeno ATEAM SERVICE
                </span>
              )}
            </div>

            <h1 className="text-3xl font-black leading-tight text-gray-900 sm:text-5xl">
              {car.brand} {car.model}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-medium text-gray-500 sm:gap-4 sm:text-sm">
              <span>👁 {views.toLocaleString()} zobrazení</span>
              <span>ID: {car.id}</span>
              {car.vin && <span className="break-all">VIN: {car.vin}</span>}
            </div>

            <div className="mt-5 text-3xl font-black text-orange-600 sm:text-5xl">
              {formatPrice(car.price || null)}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <InfoItem label="Rok" value={car.year || "Neuvedeno"} />
              <InfoItem label="Najeto" value={formatMileage(car.mileage)} />
              <InfoItem label="Palivo" value={car.fuel || "Neuvedeno"} />
              <InfoItem
                label="Převodovka"
                value={car.transmission || "Neuvedeno"}
              />
            </div>

            <div className="mt-5">
              <FavoriteButton carId={car.id} />
            </div>

            <div className="mt-4">
              <ShareButtons
                title={`${car.brand} ${car.model} ${car.year || ""}`}
              />
            </div>

            <div className="mt-5 rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-5 shadow-sm sm:mt-6 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-600">
                    Kontrola historie
                  </p>

                  <h2 className="mt-2 text-2xl font-black text-gray-900">
                    Ověření podle VIN
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Rychlé otevření kontroly přes carVertical nebo Cebia. VIN se
                    na stránce kontroly automaticky předvyplní.
                  </p>

                  <p className="mt-3 text-sm font-bold text-gray-900">
                    {car.vin ? (
                      <span className="break-all">VIN: {car.vin}</span>
                    ) : (
                      "VIN není u tohoto inzerátu uveden."
                    )}
                  </p>
                </div>

                <Link
                  href={vinCheckHref}
                  className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-orange-600 px-6 py-4 text-center text-sm font-black text-white shadow-sm transition hover:bg-orange-700"
                >
                  Prověřit VIN
                </Link>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 rounded-3xl border border-gray-200 bg-gray-50 p-4 sm:mt-6 sm:gap-4 sm:p-5">
              <div>
                <p className="text-xs text-gray-500 sm:text-sm">Zobrazení</p>
                <p className="mt-1 text-lg font-black text-gray-900 sm:text-2xl">
                  👁 {views.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 sm:text-sm">Oblíbené</p>
                <p className="mt-1 text-lg font-black text-gray-900 sm:text-2xl">
                  ❤️ {favoriteCount || 0}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 sm:text-sm">ID</p>
                <p className="mt-1 text-lg font-black text-gray-900 sm:text-2xl">
                  #{car.id}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-gray-200 bg-gray-50 p-4 sm:mt-8 sm:p-6">
              <h2 className="mb-4 text-xl font-black text-gray-900 sm:mb-5 sm:text-2xl">
                Technické údaje
              </h2>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <InfoItem label="Rok výroby" value={car.year || "Neuvedeno"} />
                <InfoItem label="Najeto" value={formatMileage(car.mileage)} />
                <InfoItem
                  label="Karoserie"
                  value={car.body_type || "Neuvedeno"}
                />
                <InfoItem label="Barva" value={car.color || "Neuvedeno"} />
                <InfoItem
                  label="Objem motoru"
                  value={formatEngineVolume(car.engine_volume)}
                />
                <InfoItem label="Palivo" value={car.fuel || "Neuvedeno"} />
                <InfoItem
                  label="Převodovka"
                  value={car.transmission || "Neuvedeno"}
                />
                <InfoItem
                  label="Výkon"
                  value={car.power ? `${car.power} kW` : "Neuvedeno"}
                />
                <InfoItem label="Pohon" value={car.drive_type || "Neuvedeno"} />
                <InfoItem
                  label="Počet majitelů"
                  value={car.owner_count || "Neuvedeno"}
                />
                <InfoItem
                  label="Euro norma"
                  value={car.euro_norm || "Neuvedeno"}
                />
                <InfoItem
                  label="STK do"
                  value={formatDate(car.stk_until || null)}
                />
                <InfoItem label="Město" value={car.city || "Neuvedeno"} />
                <InfoItem label="VIN" value={car.vin || "Neuvedeno"} />
              </div>
            </div>

            <div className="mt-6 rounded-3xl bg-white sm:mt-10">
              <h2 className="mb-3 text-xl font-black text-gray-900">
                Popis vozidla
              </h2>

              <p className="whitespace-pre-line rounded-3xl border border-gray-200 bg-gray-50 p-5 text-sm leading-7 text-gray-700 sm:text-base">
                {car.description || "Popis vozidla není k dispozici."}
              </p>
            </div>

            <div className="mt-6 rounded-3xl border border-gray-200 bg-gray-50 p-4 sm:mt-10 sm:p-6">
              <h2 className="mb-4 text-xl font-black text-gray-900 sm:text-2xl">
                Kontakt na prodejce
              </h2>

              <div className="space-y-4">
                {car.seller_name && (
                  <div>
                    <p className="text-xs text-gray-500 sm:text-sm">Jméno</p>
                    <p className="font-bold text-gray-900">{car.seller_name}</p>
                  </div>
                )}

                {car.seller_phone && (
                  <div>
                    <p className="text-xs text-gray-500 sm:text-sm">Telefon</p>
                    <a
                      href={`tel:${car.seller_phone}`}
                      className="text-lg font-black text-orange-600 hover:underline"
                    >
                      {car.seller_phone}
                    </a>
                  </div>
                )}

                {car.seller_email && (
                  <div>
                    <p className="text-xs text-gray-500 sm:text-sm">E-mail</p>
                    <a
                      href={`mailto:${car.seller_email}`}
                      className="break-all font-bold text-orange-600 hover:underline"
                    >
                      {car.seller_email}
                    </a>
                  </div>
                )}
              </div>

              {(car.seller_phone || sellerPhoneDigits) && (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {car.seller_phone && (
                    <a
                      href={`tel:${car.seller_phone}`}
                      className="block rounded-2xl bg-gray-900 px-5 py-4 text-center font-black text-white transition hover:bg-gray-800"
                    >
                      Zavolat
                    </a>
                  )}

                  {sellerPhoneDigits && (
                    <a
                      href={`https://wa.me/${sellerPhoneDigits}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-2xl bg-green-600 px-5 py-4 text-center font-black text-white transition hover:bg-green-700"
                    >
                      WhatsApp
                    </a>
                  )}
                </div>
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
            <h2 className="text-2xl font-black text-gray-900 sm:text-3xl">
              Podobná vozidla
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {similarCars.map((similarCar) => (
                <div
                  key={similarCar.id}
                  className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-200"
                >
                  <div className="relative">
                    {similarCar.is_featured && (
                      <div className="absolute left-3 top-3 z-10 rounded-full bg-yellow-400 px-3 py-1 text-xs font-black text-black shadow sm:text-sm">
                        TOP
                      </div>
                    )}

                    {similarCar.is_verified_by_ateam && (
                      <div className="absolute right-3 top-3 z-10 max-w-[75%] rounded-full border border-green-300 bg-green-100 px-3 py-1 text-xs font-black text-green-800 shadow sm:text-sm">
                        ✓ Ověřeno
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
                    <h3 className="text-lg font-black text-gray-900 sm:text-xl">
                      {similarCar.brand} {similarCar.model}
                    </h3>

                    <p className="mt-2 text-sm text-gray-600 sm:text-base">
                      {similarCar.year || "Neuvedeno"} •{" "}
                      {similarCar.engine_volume
                        ? `${similarCar.engine_volume} l • `
                        : ""}
                      {formatMileage(similarCar.mileage)}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {similarCar.fuel || "Palivo neuvedeno"}
                      {similarCar.transmission
                        ? ` • ${similarCar.transmission}`
                        : ""}
                      {similarCar.city ? ` • ${similarCar.city}` : ""}
                    </p>

                    <div className="mt-3 text-2xl font-black text-orange-600 sm:mt-4">
                      {formatPrice(similarCar.price)}
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <Link
                        href={`/cars/${similarCar.slug || similarCar.id}`}
                        className="rounded-xl bg-gray-900 px-3 py-3 text-center text-sm font-bold text-white transition hover:bg-gray-800 sm:text-base"
                      >
                        Detail
                      </Link>

                      <Link
                        href={getVinCheckHref(similarCar.vin || null)}
                        className="rounded-xl border border-gray-300 bg-white px-3 py-3 text-center text-sm font-bold text-gray-900 transition hover:bg-gray-50 sm:text-base"
                      >
                        VIN
                      </Link>
                    </div>
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
