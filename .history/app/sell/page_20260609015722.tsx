"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SellPage() {
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
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      window.location.href = "/login";
      return;
    }

    const { data: carData, error: carError } = await supabase
      .from("cars")
      .insert({
        user_id: userData.user.id,
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
        image_url: null,
      })
      .select()
      .single();

    if (carError || !carData) {
      setLoading(false);
      setMessage(carError?.message || "Chyba při vytváření inzerátu.");
      return;
    }

    let firstImageUrl: string | null = null;

    for (const file of files) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("cars")
        .upload(fileName, file);

      if (uploadError) {
        setLoading(false);
        setMessage(uploadError.message);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("cars")
        .getPublicUrl(fileName);

      const imageUrl = publicUrlData.publicUrl;

      if (!firstImageUrl) {
        firstImageUrl = imageUrl;
      }

      const { error: imageError } = await supabase.from("car_images").insert({
        car_id: carData.id,
        image_url: imageUrl,
      });

      if (imageError) {
        setLoading(false);
        setMessage(imageError.message);
        return;
      }
    }

    if (firstImageUrl) {
      await supabase
        .from("cars")
        .update({ image_url: firstImageUrl })
        .eq("id", carData.id);
    }

    setMessage("Inzerát byl úspěšně přidán.");
    window.location.href = "/cars";
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
        <h1 className="text-4xl font-bold">Přidat inzerát</h1>

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

          <div className="rounded-xl border p-4">
            <label className="block font-semibold">Fotografie vozidla</label>

            <input
              type="file"
              accept="image/*"
              multiple
              className="mt-3"
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
            />

            {files.length > 0 && (
              <p className="mt-2 text-sm text-gray-500">
                Vybráno fotografií: {files.length}
              </p>
            )}
          </div>

          <textarea
            className="min-h-32 rounded-xl border px-4 py-3"
            placeholder="Popis vozidla"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            disabled={loading}
            className="rounded-xl bg-orange-600 py-4 font-semibold text-white disabled:bg-gray-400"
          >
            {loading ? "Nahrávání..." : "Přidat inzerát"}
          </button>
        </form>

        {message && <p className="mt-4 text-gray-600">{message}</p>}
      </div>
    </main>
  );
}