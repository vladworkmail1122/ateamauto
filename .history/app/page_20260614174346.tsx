import { supabase } from "@/lib/supabase";
import Link from "next/link";

export const revalidate = 0;

const carBrands = [
  "Audi",
  "BMW",
  "Mercedes-Benz",
  "Volkswagen",
  "Škoda",
  "Seat",
  "Cupra",
  "Porsche",
  "Toyota",
  "Honda",
  "Mazda",
  "Nissan",
  "Mitsubishi",
  "Subaru",
  "Suzuki",
  "Lexus",
  "Ford",
  "Chevrolet",
  "Tesla",
  "Hyundai",
  "Kia",
  "Peugeot",
  "Renault",
  "Citroën",
  "Opel",
  "Fiat",
  "Volvo",
  "Land Rover",
  "Jaguar",
  "Mini",
  "Dacia",
  "Jiné",
];

const popularBrands = [
  "Audi",
  "BMW",
  "Mercedes-Benz",
  "Volkswagen",
  "Škoda",
  "Seat",
  "Toyota",
  "Ford",
];

export default async function Home() {
  const { data: featuredCars } = await supabase
    .from("cars")
    .select(
      "id, slug, brand, model, year, mileage, price, fuel, transmission, engine_volume, city, image_url, is_featured",
    )
    .eq("is_featured", true)
    .order("id", { ascending: false })
    .limit(3);

  const { data: latestCars } = await supabase
    .from("cars")
    .select(
      "id, slug, brand, model, year, mileage, price, fuel, transmission, engine_volume, city, image_url, is_featured",
    )
    .order("id", { ascending: false })
    .limit(6);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-orange-600">
                ATEAM AUTO MARKETPLACE CZECHIA
              </p>

              <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-gray-900 md:text-6xl">
                Kupujte a prodávejte auta v Česku
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                Moderní marketplace pro ojetá auta. Rychlé vyhledávání,
                přehledné inzeráty a jednoduché přidání vozidla.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/cars"
                  className="rounded-full bg-orange-600 px-7 py-3 font-semibold text-white hover:bg-orange-700"
                >
                  Prohlížet auta
                </Link>

                <Link
                  href="/sell"
                  className="rounded-full border border-gray-300 bg-white px-7 py-3 font-semibold text-gray-900 hover:border-orange-600 hover:text-orange-600"
                >
                  Prodat auto
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border bg-gray-50 p-8 shadow-sm">
              <img
                src="/logo.png"
                alt="ATEAM AUTO"
                className="mx-auto max-h-52 object-contain"
              />

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                  <p className="text-2xl font-bold text-orange-600">
                    {latestCars?.length || 0}+
                  </p>
                  <p className="mt-1 text-sm text-gray-500">nových vozů</p>
                </div>

                <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                  <p className="text-2xl font-bold text-orange-600">
                    {featuredCars?.length || 0}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">TOP nabídek</p>
                </div>

                <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                  <p className="text-2xl font-bold text-orange-600">CZ</p>
                  <p className="mt-1 text-sm text-gray-500">marketplace</p>
                </div>
              </div>
            </div>
          </div>

          <form
            action="/cars"
            className="mt-12 rounded-3xl bg-white p-5 shadow-xl ring-1 ring-gray-200"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
              <select
                name="brand"
                className="rounded-xl border px-4 py-3 text-gray-900"
              >
                <option value="">Značka</option>
                {carBrands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>

              <input
                name="model"
                className="rounded-xl border px-4 py-3 text-gray-900"
                placeholder="Model"
              />

              <input
                name="priceFrom"
                className="rounded-xl border px-4 py-3 text-gray-900"
                placeholder="Cena od"
              />

              <input
                name="priceTo"
                className="rounded-xl border px-4 py-3 text-gray-900"
                placeholder="Cena do"
              />

              <button className="rounded-xl bg-orange-600 px-4 py-3 font-semibold text-white hover:bg-orange-700">
                Hledat
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="text-2xl font-bold">Oblíbené značky</h2>

        <div className="mt-5 flex flex-wrap gap-3">
          {popularBrands.map((brand) => (
            <Link
              key={brand}
              href={`/cars?brand=${encodeURIComponent(brand)}`}
              className="rounded-full border bg-white px-5 py-3 font-semibold shadow-sm hover:border-orange-500 hover:text-orange-600"
            >
              {brand}
            </Link>
          ))}
        </div>
      </section>

      {featuredCars && featuredCars.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-3xl font-bold">TOP nabídky</h2>

            <Link href="/cars" className="font-semibold text-orange-600">
              Zobrazit vše →
            </Link>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredCars.map((car) => (
              <div
                key={car.id}
                className="overflow-hidden rounded-2xl bg-white shadow"
              >
                <div className="relative">
                  <div className="absolute left-3 top-3 z-10 rounded-full bg-yellow-400 px-3 py-1 text-sm font-bold text-black shadow">
                    TOP
                  </div>

                  {car.image_url ? (
                    <img
                      src={car.image_url}
                      alt={`${car.brand} ${car.model}`}
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
                    {car.brand} {car.model}
                  </h3>

                  <p className="mt-2 text-gray-600">
                    {car.year} •{" "}
                    {car.engine_volume ? `${car.engine_volume} l • ` : ""}
                    {car.mileage?.toLocaleString()} km
                  </p>

                  <p className="mt-1 text-gray-500">
                    {car.fuel}
                    {car.transmission ? ` • ${car.transmission}` : ""}
                    {car.city ? ` • ${car.city}` : ""}
                  </p>

                  <div className="mt-4 text-2xl font-bold text-orange-600">
                    {car.price?.toLocaleString()} Kč
                  </div>

                  <Link
                    href={`/cars/${car.slug || car.id}`}
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

      {latestCars && latestCars.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-3xl font-bold">Nejnovější vozy</h2>

            <Link href="/cars" className="font-semibold text-orange-600">
              Zobrazit vše →
            </Link>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestCars.map((car) => (
              <div
                key={car.id}
                className="overflow-hidden rounded-2xl bg-white shadow"
              >
                <div className="relative">
                  {car.is_featured && (
                    <div className="absolute left-3 top-3 z-10 rounded-full bg-yellow-400 px-3 py-1 text-sm font-bold text-black shadow">
                      TOP
                    </div>
                  )}

                  {car.image_url ? (
                    <img
                      src={car.image_url}
                      alt={`${car.brand} ${car.model}`}
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
                    {car.brand} {car.model}
                  </h3>

                  <p className="mt-2 text-gray-600">
                    {car.year} •{" "}
                    {car.engine_volume ? `${car.engine_volume} l • ` : ""}
                    {car.mileage?.toLocaleString()} km
                  </p>

                  <p className="mt-1 text-gray-500">
                    {car.fuel}
                    {car.transmission ? ` • ${car.transmission}` : ""}
                    {car.city ? ` • ${car.city}` : ""}
                  </p>

                  <div className="mt-4 text-2xl font-bold text-orange-600">
                    {car.price?.toLocaleString()} Kč
                  </div>

                  <Link
                    href={`/cars/${car.slug || car.id}`}
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

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="rounded-3xl bg-gray-900 p-8 text-white md:p-12">
          <h2 className="text-3xl font-bold">Chcete prodat auto?</h2>

          <p className="mt-3 max-w-2xl text-gray-300">
            Přidejte svůj inzerát během pár minut. Fotky, popis, technické údaje
            a kontakty na jednom místě.
          </p>

          <Link
            href="/sell"
            className="mt-6 inline-block rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
          >
            Přidat inzerát
          </Link>
        </div>
      </section>
    </main>
  );
}