"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type Car = {
  id: number;
  brand: string;
  model: string;
  year: number | null;
  mileage: number | null;
  price: number | null;
  image_url: string | null;
};

export default function FavoritesPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  async function loadFavorites() {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      window.location.href = "/login";
      return;
    }

    const { data: favorites, error: favoritesError } = await supabase
      .from("favorites")
      .select("car_id")
      .eq("user_id", userData.user.id);

    if (favoritesError) {
      console.error(favoritesError);
      setLoading(false);
      return;
    }

    if (!favorites || favorites.length === 0) {
      setCars([]);
      setLoading(false);
      return;
    }

    const ids = favorites.map((item) => item.car_id);

    const { data: carsData, error: carsError } = await supabase
      .from("cars")
      .select("*")
      .in("id", ids);

    if (carsError) {
      console.error(carsError);
      setLoading(false);
      return;
    }

    setCars(carsData || []);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">
            ❤️ Oblíbená vozidla
          </h1>

          <Link
            href="/dashboard"
            className="rounded-xl border bg-white px-4 py-2 font-medium hover:bg-gray-100"
          >
            Zpět do účtu
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-500">Načítání...</p>
        ) : cars.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            <h2 className="text-2xl font-bold">
              Nemáte žádná oblíbená vozidla
            </h2>

            <p className="mt-3 text-gray-500">
              Přidejte si vozidla do oblíbených pomocí ❤️ tlačítka.
            </p>

            <Link
              href="/cars"
              className="mt-6 inline-block rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
            >
              Prohlížet vozidla
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
              <div
                key={car.id}
                className="overflow-hidden rounded-2xl bg-white shadow"
              >
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

                <div className="p-5">
                  <h2 className="text-xl font-semibold">
                    {car.brand} {car.model}
                  </h2>

                  <p className="mt-2 text-gray-600">
                    {car.year} • {car.mileage?.toLocaleString()} km
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