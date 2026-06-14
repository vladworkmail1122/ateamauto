import { supabase } from "@/lib/supabase";
import Link from "next/link";
import FavoriteHeartButton from "./FavoriteHeartButton";

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
  "Infiniti",
  "Ford",
  "Chevrolet",
  "Jeep",
  "Dodge",
  "Cadillac",
  "Tesla",
  "Hyundai",
  "Kia",
  "Peugeot",
  "Renault",
  "Citroën",
  "DS",
  "Opel",
  "Fiat",
  "Alfa Romeo",
  "Lancia",
  "Volvo",
  "Saab",
  "Polestar",
  "Land Rover",
  "Range Rover",
  "Jaguar",
  "Mini",
  "Smart",
  "Bentley",
  "Rolls-Royce",
  "Ferrari",
  "Lamborghini",
  "Maserati",
  "Aston Martin",
  "McLaren",
  "Dacia",
  "MG",
  "BYD",
  "Jiné",
];

const fuels = [
  "Benzín",
  "Nafta",
  "Hybrid",
  "Plug-in hybrid",
  "Elektro",
  "LPG",
  "CNG",
];

const transmissions = ["Manuální", "Automatická", "DSG", "CVT"];

const years = Array.from({ length: 2026 - 1990 + 1 }, (_, index) =>
  String(2026 - index)
);

export default async function CarsPage({
  searchParams,
}: {
  searchParams: {
    brand?: string;
    model?: string;
    priceFrom?: string;
    priceTo?: string;
    yearFrom?: string;
    yearTo?: string;
    engineFrom?: string;
    engineTo?: string;
    fuel?: string;
    transmission?: string;
    city?: string;
    sort?: string;
  };
}) {
  let query = supabase.from("cars").select("*");

  if (searchParams.brand) {
    query = query.eq("brand", searchParams.brand);
  }

  if (searchParams.model) {
    query = query.ilike("model", `%${searchParams.model}%`);
  }

  if (searchParams.priceFrom) {
    query = query.gte("price", Number(searchParams.priceFrom));
  }

  if (searchParams.priceTo) {
    query = query.lte("price", Number(searchParams.priceTo));
  }

  if (searchParams.yearFrom) {
    query = query.gte("year", Number(searchParams.yearFrom));
  }

  if (searchParams.yearTo) {
    query = query.lte("year", Number(searchParams.yearTo));
  }

  if (searchParams.engineFrom) {
    query = query.gte("engine_volume", Number(searchParams.engineFrom));
  }

  if (searchParams.engineTo) {
    query = query.lte("engine_volume", Number(searchParams.engineTo));
  }

  if (searchParams.fuel) {
    query = query.eq("fuel", searchParams.fuel);
  }

  if (searchParams.transmission) {
    query = query.eq("transmission", searchParams.transmission);
  }

  if (searchParams.city) {
    query = query.ilike("city", `%${searchParams.city}%`);
  }

  switch (searchParams.sort) {
    case "price_asc":
      query = query.order("price", { ascending: true });
      break;
    case "price_desc":
      query = query.order("price", { ascending: false });
      break;
    case "mileage_asc":
      query = query.order("mileage", { ascending: true });
      break;
    case "year_desc":
      query = query.order("year", { ascending: false });
      break;
    case "power_desc":
      query = query.order("power", { ascending: false });
      break;
    case "engine_asc":
      query = query.order("engine_volume", { ascending: true });
      break;
    case "engine_desc":
      query = query.order("engine_volume", { ascending: false });
      break;
    default:
      query = query.order("id", { ascending: false });
      break;
  }

  const { data: cars, error } = await query;

  if (error) {
    return <div className="p-10">Chyba načítání vozidel: {error.message}</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">Nabídka vozidel</h1>

          <Link
            href="/sell"
            className="rounded-xl bg-orange-600 px-4 py-2 font-medium text-white hover:bg-orange-700"
          >
            Přidat inzerát
          </Link>
        </div>

        <details className="mb-8 rounded-2xl bg-white shadow" open>
          <summary className="cursor-pointer px-6 py-4 text-lg font-semibold">
            Filtry a řazení
          </summary>

          <form className="grid gap-4 border-t p-6 md:grid-cols-4">
            <select
              name="brand"
              defaultValue={searchParams.brand || ""}
              className="rounded-xl border px-4 py-3"
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
              defaultValue={searchParams.model || ""}
              placeholder="Model"
              className="rounded-xl border px-4 py-3"
            />

            <input
              name="city"
              defaultValue={searchParams.city || ""}
              placeholder="Město"
              className="rounded-xl border px-4 py-3"
            />

            <select
              name="fuel"
              defaultValue={searchParams.fuel || ""}
              className="rounded-xl border px-4 py-3"
            >
              <option value="">Palivo</option>
              {fuels.map((fuel) => (
                <option key={fuel} value={fuel}>
                  {fuel}
                </option>
              ))}
            </select>

            <select
              name="transmission"
              defaultValue={searchParams.transmission || ""}
              className="rounded-xl border px-4 py-3"
            >
              <option value="">Převodovka</option>
              {transmissions.map((transmission) => (
                <option key={transmission} value={transmission}>
                  {transmission}
                </option>
              ))}
            </select>

            <input
              name="priceFrom"
              defaultValue={searchParams.priceFrom || ""}
              placeholder="Cena od"
              className="rounded-xl border px-4 py-3"
            />

            <input
              name="priceTo"
              defaultValue={searchParams.priceTo || ""}
              placeholder="Cena do"
              className="rounded-xl border px-4 py-3"
            />

            <select
              name="yearFrom"
              defaultValue={searchParams.yearFrom || ""}
              className="rounded-xl border px-4 py-3"
            >
              <option value="">Rok od</option>
              {years.map((year) => (
                <option key={`from-${year}`} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select
              name="yearTo"
              defaultValue={searchParams.yearTo || ""}
              className="rounded-xl border px-4 py-3"
            >
              <option value="">Rok do</option>
              {years.map((year) => (
                <option key={`to-${year}`} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <input
              name="engineFrom"
              defaultValue={searchParams.engineFrom || ""}
              placeholder="Objem od"
              className="rounded-xl border px-4 py-3"
            />

            <input
              name="engineTo"
              defaultValue={searchParams.engineTo || ""}
              placeholder="Objem do"
              className="rounded-xl border px-4 py-3"
            />

            <select
              name="sort"
              defaultValue={searchParams.sort || "newest"}
              className="rounded-xl border px-4 py-3"
            >
              <option value="newest">Nejnovější</option>
              <option value="price_asc">Nejlevnější</option>
              <option value="price_desc">Nejdražší</option>
              <option value="mileage_asc">Nejnižší nájezd</option>
              <option value="year_desc">Nejnovější rok výroby</option>
              <option value="power_desc">Nejvyšší výkon</option>
              <option value="engine_asc">Nejmenší objem motoru</option>
              <option value="engine_desc">Největší objem motoru</option>
            </select>

            <button className="rounded-xl bg-gray-900 px-4 py-3 font-semibold text-white md:col-span-2">
              Hledat
            </button>

            <Link
              href="/cars"
              className="rounded-xl border px-4 py-3 text-center font-semibold hover:bg-gray-100 md:col-span-2"
            >
              Vymazat filtry
            </Link>
          </form>
        </details>

        <div className="mb-6 text-sm text-gray-500">
          Nalezeno vozidel: {cars?.length || 0}
        </div>

        {!cars || cars.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            <h2 className="text-2xl font-bold">Nic nenalezeno</h2>
            <p className="mt-2 text-gray-500">
              Zkuste upravit filtry vyhledávání.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
              <div
                key={car.id}
                className="overflow-hidden rounded-2xl bg-white shadow"
              >
                <div className="relative">
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

                  <FavoriteHeartButton carId={car.id} />
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-semibold">
                    {car.brand} {car.model}
                  </h2>

                  <p className="mt-2 text-gray-600">
                    {car.year} •{" "}
                    {car.engine_volume ? `${car.engine_volume} l • ` : ""}
                    {car.mileage?.toLocaleString()} km
                  </p>

                  <p className="mt-1 text-gray-500">
                    {car.fuel} • {car.transmission} • {car.city}
                  </p>

                  <div className="mt-4 text-2xl font-bold text-orange-600">
                    {car.price?.toLocaleString()} Kč
                  </div>

                  <Link
                    href={`/cars/${car.id}`}
                    className="mt-4 block w-full rounded-xl bg-gray-900 py-3 text-center text-white"
                  >
                    Detail vozu
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}