"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function EditCarPage({
  params,
}: {
  params: { id: string };
}) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [price, setPrice] = useState("");
  const [fuel, setFuel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [power, setPower] = useState("");
  const [engineVolume, setEngineVolume] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerPhone, setSellerPhone] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadCar() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        window.location.href = "/login";
        return;
      }

      const { data: car, error } = await supabase
        .from("cars")
        .select("*")
        .eq("id", params.id)
        .eq("user_id", userData.user.id)
        .single();

      if (error || !car) {
        setMessage("Inzerát nebyl nalezen nebo k němu nemáte přístup.");
        return;
      }

      setBrand(car.brand || "");
      setModel(car.model || "");
      setYear(String(car.year || ""));
      setMileage(String(car.mileage || ""));
      setPrice(String(car.price || ""));
      setFuel(car.fuel || "");
      setTransmission(car.transmission || "");
      setPower(String(car.power || ""));
      setEngineVolume(String(car.engine_volume || ""));
      setCity(car.city || "");
      setDescription(car.description || "");
      setSellerName(car.seller_name || "");
      setSellerPhone(car.seller_phone || "");
      setSellerEmail(car.seller_email || "");
    }

    loadCar();
  }, [params.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      window.location.href = "/login";
      return;
    }

    const { error } = await supabase
      .from("cars")
      .update({
        brand,
        model,
        year: Number(year),
        mileage: Number(mileage),
        price: Number(price),
        fuel,
        transmission,
        power: Number(power),
        engine_volume: engineVolume ? Number(engineVolume) : null,
        city,
        description,
        seller_name: sellerName,
        seller_phone: sellerPhone,
        seller_email: sellerEmail,
      })
      .eq("id", params.id)
      .eq("user_id", userData.user.id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Inzerát byl úspěšně upraven.");
    window.location.href = "/dashboard";
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
        <h1 className="text-4xl font-bold">Upravit inzerát</h1>

        {message && (
          <p className="mt-4 rounded-xl bg-gray-100 p-4 text-gray-700">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
          <input className="rounded-xl border px-4 py-3" placeholder="Značka" value={brand} onChange={(e) => setBrand(e.target.value)} />
          <input className="rounded-xl border px-4 py-3" placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} />
          <input className="rounded-xl border px-4 py-3" placeholder="Rok výroby" value={year} onChange={(e) => setYear(e.target.value)} />
          <input className="rounded-xl border px-4 py-3" placeholder="Najeto km" value={mileage} onChange={(e) => setMileage(e.target.value)} />
          <input className="rounded-xl border px-4 py-3" placeholder="Cena Kč" value={price} onChange={(e) => setPrice(e.target.value)} />
          <input className="rounded-xl border px-4 py-3" placeholder="Palivo" value={fuel} onChange={(e) => setFuel(e.target.value)} />
          <input className="rounded-xl border px-4 py-3" placeholder="Převodovka" value={transmission} onChange={(e) => setTransmission(e.target.value)} />
          <input className="rounded-xl border px-4 py-3" placeholder="Výkon kW" value={power} onChange={(e) => setPower(e.target.value)} />

          <input
            className="rounded-xl border px-4 py-3"
            placeholder="Objem motoru l, např. 2.0"
            value={engineVolume}
            onChange={(e) => setEngineVolume(e.target.value)}
          />

          <input className="rounded-xl border px-4 py-3" placeholder="Město" value={city} onChange={(e) => setCity(e.target.value)} />

          <div className="mt-4 rounded-2xl border bg-gray-50 p-5">
            <h2 className="mb-4 text-xl font-bold">Kontakt na prodejce</h2>

            <div className="grid gap-4">
              <input
                className="rounded-xl border px-4 py-3"
                placeholder="Jméno prodejce"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
              />

              <input
                className="rounded-xl border px-4 py-3"
                placeholder="Telefon"
                value={sellerPhone}
                onChange={(e) => setSellerPhone(e.target.value)}
              />

              <input
                className="rounded-xl border px-4 py-3"
                placeholder="E-mail"
                value={sellerEmail}
                onChange={(e) => setSellerEmail(e.target.value)}
              />
            </div>
          </div>

          <textarea
            className="min-h-32 rounded-xl border px-4 py-3"
            placeholder="Popis vozidla"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button className="rounded-xl bg-orange-600 py-4 font-semibold text-white">
            Uložit změny
          </button>
        </form>
      </div>
    </main>
  );
}