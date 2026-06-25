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

const carSelect =
  "id, slug, brand, model, year, mileage, price, fuel, transmission, engine_volume, city, image_url, is_featured, is_verified_by_ateam, vin";

type HomeCar = {
  id: number;
  slug: string | null;
  brand: string | null;
  model: string | null;
  year: number | null;
  mileage: number | null;
  price: number | null;
  fuel: string | null;
  transmission: string | null;
  engine_volume: number | null;
  city: string | null;
  image_url: string | null;
  is_featured: boolean | null;
  is_verified_by_ateam: boolean | null;
  vin: string | null;
};

function formatPrice(price: number | null) {
  if (!price) return "Cena dohodou";
  return `${price.toLocaleString()} Kč`;
}

function formatMileage(mileage: number | null) {
  if (!mileage) return "Nájezd neuveden";
  return `${mileage.toLocaleString()} km`;
}

function getCarHref(car: HomeCar) {
  return `/cars/${car.slug || car.id}`;
}

function getVinCheckHref(vin: string | null) {
  return vin ? `/vin-check?vin=${encodeURIComponent(vin)}` : "/vin-check";
}

function CarCard({ car }: { car: HomeCar }) {
  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-200 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative">
        {car.is_featured && (
          <div className="absolute left-3 top-3 z-10 rounded-full bg-yellow-400 px-3 py-1 text-xs font-black text-black shadow sm:text-sm">
            TOP
          </div>
        )}

        {car.image_url ? (
          <img
            src={car.image_url}
            alt={`${car.brand || "Auto"} ${car.model || ""}`}
            className="h-52 w-full object-cover sm:h-56"
          />
        ) : (
          <div className="flex h-52 items-center justify-center bg-gray-200 text-gray-500 sm:h-56">
            🚗 Foto vozidla
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5">
        <div className="mb-2 flex flex-wrap gap-2">
          {car.is_verified_by_ateam && (
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-black text-green-800">
              ✓ Ověřeno ATEAM SERVICE
            </span>
          )}

          {car.city && (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
              {car.city}
            </span>
          )}
        </div>

        <h3 className="text-lg font-black text-gray-900 sm:text-xl">
          {car.brand} {car.model}
        </h3>

        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          {car.year || "Rok neuveden"}
          {car.engine_volume ? ` • ${car.engine_volume} l` : ""}
          {car.mileage ? ` • ${formatMileage(car.mileage)}` : ""}
        </p>

        <p className="mt-1 text-sm text-gray-500">
          {car.fuel || "Palivo neuvedeno"}
          {car.transmission ? ` • ${car.transmission}` : ""}
        </p>

        <div className="mt-4 text-2xl font-black text-orange-600">
          {formatPrice(car.price)}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link
            href={getCarHref(car)}
            className="rounded-xl bg-gray-900 px-3 py-3 text-center text-sm font-bold text-white transition hover:bg-gray-800 sm:text-base"
          >
            Detail
          </Link>

          <Link
            href={getVinCheckHref(car.vin)}
            className="rounded-xl border border-gray-300 bg-white px-3 py-3 text-center text-sm font-bold text-gray-900 transition hover:bg-gray-50 sm:text-base"
          >
            VIN
          </Link>
        </div>
      </div>
    </article>
  );
}

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
    <main className="min-h-screen bg-gray-50">
      <section className="overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-orange-600">
                ATEAM AUTO MARKETPLACE CZECHIA
              </p>

              <h1 className="max-w-3xl text-4xl font-black tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                Kupujte a prodávejte auta v Česku
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
                Moderní marketplace pro ojetá auta. Rychlé vyhledávání,
                přehledné inzeráty, kontrola VIN a vybraná vozidla ověřená
                týmem ATEAM SERVICE.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/cars"
                  className="rounded-2xl bg-orange-600 px-7 py-4 text-center font-black text-white shadow-sm transition hover:bg-orange-700"
                >
                  Prohlížet auta
                </Link>

                <Link
                  href="/sell"
                  className="rounded-2xl border border-gray-300 bg-white px-7 py-4 text-center font-black text-gray-900 shadow-sm transition hover:border-orange-600 hover:text-orange-600"
                >
                  Prodat auto
                </Link>

                <Link
                  href="/vin-check"
                  className="rounded-2xl border border-green-300 bg-green-50 px-7 py-4 text-center font-black text-green-800 shadow-sm transition hover:bg-green-100"
                >
                  Kontrola VIN
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-5 shadow-sm sm:p-8">
              <img
                src="/logo.png"
                alt="ATEAM AUTO"
                className="mx-auto max-h-44 object-contain sm:max-h-52"
              />

              <div className="mt-7 grid grid-cols-3 gap-3 sm:gap-4">
                <div className="rounded-2xl bg-white p-3 text-center shadow-sm sm:p-4">
                  <p className="text-2xl font-black text-orange-600">
                    {latestCars?.length || 0}+
                  </p>
                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                    nových vozů
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-3 text-center shadow-sm sm:p-4">
                  <p className="text-2xl font-black text-orange-600">
                    {featuredCars?.length || 0}
                  </p>
                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                    TOP nabídek
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-3 text-center shadow-sm sm:p-4">
                  <p className="text-2xl font-black text-green-700">
                    {verifiedCount || 0}
                  </p>
                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                    ověřeno
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form
            action="/cars"
            className="mt-10 rounded-3xl bg-white p-4 shadow-xl ring-1 ring-gray-200 sm:mt-12 sm:p-5"
          >
            <div className="grid gap-4">
              <input
                name="search"
                placeholder="Hledat auto, VIN, město, palivo, převodovku, ID..."
                className="rounded-2xl border border-gray-300 px-4 py-4 text-base text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-600 focus:ring-4 focus:ring-orange-100 sm:text-lg"
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <select
                  name="brand"
                  className="rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-orange-600 focus:ring-4 focus:ring-orange-100"
                >
                  <option value="">Značka</option>

                  {carBrands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>

                <input
                  name="priceFrom"
                  placeholder="Cena od"
                  className="rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-600 focus:ring-4 focus:ring-orange-100"
                />

                <input
                  name="priceTo"
                  placeholder="Cena do"
                  className="rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-600 focus:ring-4 focus:ring-orange-100"
                />

                <button className="rounded-2xl bg-orange-600 px-4 py-3 font-black text-white transition hover:bg-orange-700">
                  Hledat
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <div className="text-3xl">✓</div>
            <h2 className="mt-3 text-xl font-black text-gray-900">
              Ověřeno ATEAM SERVICE
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Vybraná vozidla mohou mít punc kontroly od našeho týmu. Tuto
              značku nemůže nastavit běžný uživatel.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <div className="text-3xl">🔎</div>
            <h2 className="mt-3 text-xl font-black text-gray-900">
              Kontrola podle VIN
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              U inzerátů můžete rychle otevřít kontrolu historie přes
              carVertical nebo Cebia.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <div className="text-3xl">🚗</div>
            <h2 className="mt-3 text-xl font-black text-gray-900">
              Prodej i pomoc s autem
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Marketplace propojujeme se zkušenostmi autoservisu, STK,
              dokumenty a výkupem vozidel.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-black text-gray-900">
            Oblíbené značky
          </h2>

          <Link href="/cars" className="font-bold text-orange-600">
            Zobrazit všechna vozidla →
          </Link>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {popularBrands.map((brand) => (
            <Link
              key={brand}
              href={`/cars?brand=${encodeURIComponent(brand)}`}
              className="rounded-full border bg-white px-5 py-3 font-bold shadow-sm transition hover:border-orange-500 hover:text-orange-600"
            >
              {brand}
            </Link>
          ))}
        </div>
      </section>

      {verifiedCars && verifiedCars.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-green-700">
                ATEAM SERVICE
              </p>

              <h2 className="mt-2 text-3xl font-black text-gray-900">
                Ověřená vozidla
              </h2>
            </div>

            <Link href="/cars" className="font-bold text-orange-600">
              Zobrazit vše →
            </Link>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {verifiedCars.map((car) => (
              <CarCard key={car.id} car={car as HomeCar} />
            ))}
          </div>
        </section>
      )}

      {featuredCars && featuredCars.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-3xl font-black text-gray-900">TOP nabídky</h2>

            <Link href="/cars" className="font-bold text-orange-600">
              Zobrazit vše →
            </Link>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car as HomeCar} />
            ))}
          </div>
        </section>
      )}

      {latestCars && latestCars.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-3xl font-black text-gray-900">
              Nejnovější vozy
            </h2>

            <Link href="/cars" className="font-bold text-orange-600">
              Zobrazit vše →
            </Link>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {latestCars.map((car) => (
              <CarCard key={car.id} car={car as HomeCar} />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-6 rounded-3xl bg-gray-900 p-6 text-white md:grid-cols-[1.2fr_0.8fr] md:p-12">
          <div>
            <h2 className="text-3xl font-black">Chcete prodat auto?</h2>

            <p className="mt-3 max-w-2xl text-gray-300">
              Přidejte svůj inzerát během pár minut. Fotky, popis, technické
              údaje a kontakty na jednom místě.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <Link
              href="/sell"
              className="rounded-2xl bg-orange-600 px-6 py-4 text-center font-black text-white transition hover:bg-orange-700"
            >
              Přidat inzerát
            </Link>

            <Link
              href="/contact"
              className="rounded-2xl border border-white/20 px-6 py-4 text-center font-black text-white transition hover:bg-white/10"
            >
              Kontaktovat ATEAM
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
