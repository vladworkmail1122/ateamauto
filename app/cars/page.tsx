import { supabase } from "@/lib/supabase";
import Link from "next/link";
import FavoriteHeartButton from "./FavoriteHeartButton";

export const revalidate = 0;

const carsPerPage = 24;

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

const bodyTypes = [
  "Sedan",
  "Combi",
  "Hatchback",
  "SUV",
  "Kupé",
  "Kabriolet",
  "MPV",
  "Pickup",
  "Dodávka",
];

const colors = [
  "Bílá",
  "Černá",
  "Šedá",
  "Stříbrná",
  "Modrá",
  "Červená",
  "Zelená",
  "Hnědá",
  "Béžová",
  "Žlutá",
  "Oranžová",
  "Zlatá",
  "Fialová",
  "Jiná",
];

const statuses = ["Aktivní", "Rezervováno", "Prodáno"];

const driveTypes = ["Přední náhon", "Zadní náhon", "4x4 / AWD"];

const euroNorms = ["Euro 3", "Euro 4", "Euro 5", "Euro 6", "Euro 6d"];

const years = Array.from({ length: 2026 - 1990 + 1 }, (_, index) =>
  String(2026 - index),
);

export default async function CarsPage({
  searchParams,
}: {
  searchParams: {
    search?: string;
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
    bodyType?: string;
    color?: string;
    status?: string;
    driveType?: string;
    euroNorm?: string;
    city?: string;
    sort?: string;
    page?: string;
  };
}) {
  const currentPage = Math.max(Number(searchParams.page || "1"), 1);

  let query = supabase.from("cars").select("*");

  if (searchParams.search) {
    const search = searchParams.search.trim();

    query = query.or(
      [
        `brand.ilike.%${search}%`,
        `model.ilike.%${search}%`,
        `vin.ilike.%${search}%`,
        `city.ilike.%${search}%`,
        `fuel.ilike.%${search}%`,
        `transmission.ilike.%${search}%`,
        `body_type.ilike.%${search}%`,
        `color.ilike.%${search}%`,
        `drive_type.ilike.%${search}%`,
        `euro_norm.ilike.%${search}%`,
        `status.ilike.%${search}%`,
        /^\d+$/.test(search) ? `id.eq.${search}` : "",
      ]
        .filter(Boolean)
        .join(","),
    );
  }

  if (searchParams.brand) query = query.eq("brand", searchParams.brand);
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
  if (searchParams.fuel) query = query.eq("fuel", searchParams.fuel);
  if (searchParams.transmission) {
    query = query.eq("transmission", searchParams.transmission);
  }
  if (searchParams.bodyType) {
    query = query.eq("body_type", searchParams.bodyType);
  }
  if (searchParams.color) query = query.eq("color", searchParams.color);
  if (searchParams.status) query = query.eq("status", searchParams.status);
  if (searchParams.driveType) {
    query = query.eq("drive_type", searchParams.driveType);
  }
  if (searchParams.euroNorm) {
    query = query.eq("euro_norm", searchParams.euroNorm);
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
    case "views_desc":
      query = query.order("views", { ascending: false });
      break;
    case "oldest":
      query = query.order("id", { ascending: true });
      break;
    default:
      query = query.order("id", { ascending: false });
      break;
  }

  const { data: cars, error } = await query;

  if (error) {
    return <div className="p-10">Chyba načítání vozidel: {error.message}</div>;
  }

  const sortedCars =
    cars?.sort((a, b) => {
      if (a.is_featured && !b.is_featured) return -1;
      if (!a.is_featured && b.is_featured) return 1;
      return 0;
    }) || [];

  const totalCars = sortedCars.length;
  const totalPages = Math.max(Math.ceil(totalCars / carsPerPage), 1);
  const startIndex = (currentPage - 1) * carsPerPage;
  const paginatedCars = sortedCars.slice(startIndex, startIndex + carsPerPage);

  function createPageUrl(page: number) {
    const params = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== "page") {
        params.set(key, value);
      }
    });

    params.set("page", String(page));

    return `/cars?${params.toString()}`;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">Nabídka vozidel</h1>

            <p className="mt-2 text-sm text-gray-500">
              Nalezeno vozidel: {totalCars} • Stránka {currentPage} z{" "}
              {totalPages}
            </p>
          </div>

          <Link
            href="/sell"
            className="rounded-xl bg-orange-600 px-4 py-3 text-center font-semibold text-white hover:bg-orange-700 sm:w-fit"
          >
            Přidat inzerát
          </Link>
        </div>

        <details className="mb-6 rounded-2xl bg-white shadow sm:mb-8">
          <summary className="cursor-pointer px-5 py-4 text-base font-bold sm:px-6 sm:text-lg">
            Filtry a řazení
          </summary>

          <form className="grid gap-3 border-t p-4 sm:gap-4 sm:p-6 md:grid-cols-4">
            <input
              name="search"
              defaultValue={searchParams.search || ""}
              placeholder="Hledat: značka, model, VIN, město, ID..."
              className="rounded-xl border px-4 py-3 md:col-span-4"
            />

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

            <select
              name="bodyType"
              defaultValue={searchParams.bodyType || ""}
              className="rounded-xl border px-4 py-3"
            >
              <option value="">Karoserie</option>
              {bodyTypes.map((bodyType) => (
                <option key={bodyType} value={bodyType}>
                  {bodyType}
                </option>
              ))}
            </select>

            <select
              name="color"
              defaultValue={searchParams.color || ""}
              className="rounded-xl border px-4 py-3"
            >
              <option value="">Barva</option>
              {colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>

            <select
              name="status"
              defaultValue={searchParams.status || ""}
              className="rounded-xl border px-4 py-3"
            >
              <option value="">Status</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <select
              name="driveType"
              defaultValue={searchParams.driveType || ""}
              className="rounded-xl border px-4 py-3"
            >
              <option value="">Pohon</option>
              {driveTypes.map((driveType) => (
                <option key={driveType} value={driveType}>
                  {driveType}
                </option>
              ))}
            </select>

            <select
              name="euroNorm"
              defaultValue={searchParams.euroNorm || ""}
              className="rounded-xl border px-4 py-3"
            >
              <option value="">Euro norma</option>
              {euroNorms.map((euroNorm) => (
                <option key={euroNorm} value={euroNorm}>
                  {euroNorm}
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
              <option value="oldest">Nejstarší</option>
              <option value="price_asc">Nejlevnější</option>
              <option value="price_desc">Nejdražší</option>
              <option value="mileage_asc">Nejnižší nájezd</option>
              <option value="year_desc">Nejnovější rok výroby</option>
              <option value="power_desc">Nejvyšší výkon</option>
              <option value="engine_asc">Nejmenší objem motoru</option>
              <option value="engine_desc">Největší objem motoru</option>
              <option value="views_desc">Nejvíce zobrazení</option>
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

        {paginatedCars.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow sm:p-10">
            <h2 className="text-2xl font-bold">Nic nenalezeno</h2>
            <p className="mt-2 text-gray-500">
              Zkuste upravit filtry vyhledávání.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {paginatedCars.map((car) => (
                <div
                  key={car.id}
                  className="overflow-hidden rounded-2xl bg-white shadow"
                >
                  <div className="relative">
                    {car.is_featured && (
                      <div className="absolute left-3 top-3 z-10 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-black shadow sm:text-sm">
                        TOP
                      </div>
                    )}

                    {car.is_verified_by_ateam && (
                      <div className="absolute right-3 top-3 z-10 max-w-[70%] rounded-full border border-green-300 bg-green-100 px-3 py-1 text-[10px] font-black text-green-800 shadow sm:text-xs">
                        ✓ Ověřeno ATEAM SERVICE
                      </div>
                    )}

                    {car.image_url ? (
                      <img
                        src={car.image_url}
                        alt={`${car.brand} ${car.model}`}
                        className="h-48 w-full object-cover sm:h-56"
                      />
                    ) : (
                      <div className="flex h-48 items-center justify-center bg-gray-200 sm:h-56">
                        🚗 Foto vozidla
                      </div>
                    )}

                    <FavoriteHeartButton carId={car.id} />
                  </div>

                  <div className="p-4 sm:p-5">
                    <div className="mb-2 flex flex-wrap gap-2">
                      {car.status && (
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                          {car.status}
                        </span>
                      )}

                      {car.body_type && (
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                          {car.body_type}
                        </span>
                      )}

                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                        👁 {(car.views || 0).toLocaleString()}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold sm:text-xl">
                      {car.brand} {car.model}
                    </h2>

                    <p className="mt-2 text-sm text-gray-600 sm:text-base">
                      {car.year} •{" "}
                      {car.engine_volume ? `${car.engine_volume} l • ` : ""}
                      {car.mileage?.toLocaleString()} km
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {car.fuel}
                      {car.drive_type ? ` • ${car.drive_type}` : ""}
                      {car.transmission ? ` • ${car.transmission}` : ""}
                      {car.city ? ` • ${car.city}` : ""}
                    </p>

                    <div className="mt-3 text-2xl font-bold text-orange-600 sm:mt-4">
                      {car.price?.toLocaleString()} Kč
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <Link
                        href={`/cars/${car.slug || car.id}`}
                        className="rounded-xl bg-gray-900 px-3 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-800 sm:text-base"
                      >
                        Detail vozu
                      </Link>

                      <Link
                        href={
                          car.vin
                            ? `/vin-check?vin=${encodeURIComponent(car.vin)}`
                            : "/vin-check"
                        }
                        className="rounded-xl border border-gray-300 bg-white px-3 py-3 text-center text-sm font-semibold text-gray-900 transition hover:bg-gray-50 sm:text-base"
                      >
                        Prověřit VIN
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-center gap-3 sm:mt-10 sm:gap-4">
              {currentPage > 1 ? (
                <Link
                  href={createPageUrl(currentPage - 1)}
                  className="rounded-xl border bg-white px-4 py-3 text-sm font-semibold hover:bg-gray-100 sm:px-5 sm:text-base"
                >
                  ← Předchozí
                </Link>
              ) : (
                <span className="rounded-xl border bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-400 sm:px-5 sm:text-base">
                  ← Předchozí
                </span>
              )}

              <span className="rounded-xl bg-white px-4 py-3 text-sm font-semibold shadow sm:px-5 sm:text-base">
                {currentPage} / {totalPages}
              </span>

              {currentPage < totalPages ? (
                <Link
                  href={createPageUrl(currentPage + 1)}
                  className="rounded-xl border bg-white px-4 py-3 text-sm font-semibold hover:bg-gray-100 sm:px-5 sm:text-base"
                >
                  Další →
                </Link>
              ) : (
                <span className="rounded-xl border bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-400 sm:px-5 sm:text-base">
                  Další →
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
