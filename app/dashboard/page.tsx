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

export default function DashboardPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      window.location.href = "/login";
      return;
    }

    setEmail(userData.user.email ?? null);

    const { data: carsData, error } = await supabase
      .from("cars")
      .select("id, brand, model, year, mileage, price, image_url")
      .eq("user_id", userData.user.id)
      .order("id", { ascending: false });

    if (error) {
      console.log("Cars loading error:", error.message);
    }

    setCars(carsData || []);
    setLoading(false);
  }

  async function deleteCar(id: number) {
    const confirmDelete = window.confirm(
      "Opravdu chcete smazat tento inzerát?"
    );

    if (!confirmDelete) return;

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      window.location.href = "/login";
      return;
    }

    const { error } = await supabase
      .from("cars")
      .delete()
      .eq("id", id)
      .eq("user_id", userData.user.id);

    if (error) {
      alert(error.message);
      return;
    }

    setCars((currentCars) => currentCars.filter((car) => car.id !== id));
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Můj účet</h1>

            <p className="mt-3 text-gray-600">
              Přihlášen jako: {email || "Načítání..."}
            </p>
          </div>

          <button
            onClick={logout}
            className="rounded-xl border bg-white px-5 py-3 font-semibold hover:bg-gray-100"
          >
            Odhlásit se
          </button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-4">
          <Link
            href="/sell"
            className="rounded-2xl bg-orange-600 p-6 text-white shadow hover:bg-orange-700"
          >
            <h2 className="text-xl font-semibold">Přidat inzerát</h2>
            <p className="mt-2 text-orange-100">
              Vložte nové vozidlo do nabídky.
            </p>
          </Link>

          <Link
            href="/cars"
            className="rounded-2xl bg-white p-6 shadow hover:shadow-md"
          >
            <h2 className="text-xl font-semibold">Veřejná nabídka</h2>
            <p className="mt-2 text-gray-500">Zobrazit všechna vozidla.</p>
          </Link>

          <Link
            href="/dashboard/favorites"
            className="rounded-2xl bg-white p-6 shadow hover:shadow-md"
          >
            <h2 className="text-xl font-semibold">❤️ Oblíbená vozidla</h2>
            <p className="mt-2 text-gray-500">Uložené inzeráty.</p>
          </Link>

          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-xl font-semibold">Moje inzeráty</h2>
            <p className="mt-2 text-gray-500">
              Počet vašich inzerátů: {cars.length}
            </p>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-3xl font-bold">Moje inzeráty</h2>

          {loading ? (
            <p className="mt-6 text-gray-500">Načítání...</p>
          ) : cars.length === 0 ? (
            <div className="mt-6 rounded-2xl bg-white p-8 text-center shadow">
              <h3 className="text-2xl font-bold">
                Zatím nemáte žádné inzeráty
              </h3>
              <p className="mt-2 text-gray-500">
                Přidejte své první vozidlo do nabídky.
              </p>

              <Link
                href="/sell"
                className="mt-6 inline-block rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
              >
                Přidat inzerát
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cars.map((car) => (
                <div
                  key={car.id}
                  className="overflow-hidden rounded-2xl bg-white shadow"
                >
                  {car.image_url ? (
                    <img
                      src={car.image_url}
                      alt={`${car.brand} ${car.model}`}
                      className="h-48 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-48 items-center justify-center bg-gray-200">
                      🚗 Foto vozidla
                    </div>
                  )}

                  <div className="p-5">
                    <h3 className="text-xl font-semibold">
                      {car.brand} {car.model}
                    </h3>

                    <p className="mt-2 text-gray-600">
                      {car.year} • {car.mileage?.toLocaleString()} km
                    </p>

                    <div className="mt-3 text-2xl font-bold text-orange-600">
                      {car.price?.toLocaleString()} Kč
                    </div>

                    <div className="mt-5 flex gap-3">
                      <Link
                        href={`/cars/${car.id}`}
                        className="flex-1 rounded-xl bg-gray-900 py-3 text-center text-white"
                      >
                        Detail
                      </Link>

                      <Link
                        href={`/cars/edit/${car.id}`}
                        className="flex-1 rounded-xl border py-3 text-center hover:bg-gray-50"
                      >
                        Upravit
                      </Link>

                      <button
                        onClick={() => deleteCar(car.id)}
                        className="flex-1 rounded-xl border border-red-300 py-3 text-red-600 hover:bg-red-50"
                      >
                        Smazat
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}