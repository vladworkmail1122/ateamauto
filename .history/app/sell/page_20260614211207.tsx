"use client";

import { useState, type ReactNode } from "react";
import { supabase } from "@/lib/supabase";

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

const years = Array.from({ length: 2026 - 1990 + 1 }, (_, index) =>
  String(2026 - index),
);

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

function createSlug(brand: string, model: string, year: string) {
  return `${brand}-${model}-${year}`
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>

        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
      </div>

      {children}
    </section>
  );
}

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
  const [bodyType, setBodyType] = useState("");
  const [color, setColor] = useState("");
  const [status, setStatus] = useState("Aktivní");
  const [vin, setVin] = useState("");
  const [driveType, setDriveType] = useState("");
  const [ownerCount, setOwnerCount] = useState("");
  const [euroNorm, setEuroNorm] = useState("");
  const [stkUntil, setStkUntil] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
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
        slug: createSlug(brand, model, year),
        year: Number(year),
        mileage: Number(mileage),
        price: Number(price),
        fuel,
        transmission,
        power: power ? Number(power) : null,
        engine_volume: engineVolume ? Number(engineVolume) : null,
        body_type: bodyType,
        color,
        status,
        vin,
        drive_type: driveType,
        owner_count: ownerCount ? Number(ownerCount) : null,
        euro_norm: euroNorm,
        stk_until: stkUntil || null,
        is_featured: isFeatured,
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
    window.location.href = `/cars/${carData.slug || carData.id}`;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Přidat inzerát</h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Vyplňte údaje o vozidle, kontakt a fotografie. Povinná pole jsou
            značka, model, rok, nájezd, cena, palivo, převodovka a město.
          </p>
        </div>

        {message && (
          <p className="mb-5 rounded-2xl bg-white p-4 text-gray-700 shadow-sm">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="grid gap-5">
          <FormSection
            title="Základní údaje"
            description="Hlavní informace, podle kterých lidé auto najdou."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <select
                className="rounded-xl border px-4 py-3"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              >
                <option value="">Značka</option>
                {carBrands.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <input
                className="rounded-xl border px-4 py-3"
                placeholder="Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
              />

              <select
                className="rounded-xl border px-4 py-3"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              >
                <option value="">Rok výroby</option>
                {years.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <input
                className="rounded-xl border px-4 py-3"
                placeholder="Najeto km"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                required
              />

              <input
                className="rounded-xl border px-4 py-3"
                placeholder="Cena Kč"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />

              <input
                className="rounded-xl border px-4 py-3"
                placeholder="Město"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
          </FormSection>

          <FormSection
            title="Technické údaje"
            description="Motor, převodovka, karoserie a další parametry."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <select
                className="rounded-xl border px-4 py-3"
                value={fuel}
                onChange={(e) => setFuel(e.target.value)}
                required
              >
                <option value="">Palivo</option>
                {fuels.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <select
                className="rounded-xl border px-4 py-3"
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                required
              >
                <option value="">Převodovka</option>
                {transmissions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <select
                className="rounded-xl border px-4 py-3"
                value={bodyType}
                onChange={(e) => setBodyType(e.target.value)}
              >
                <option value="">Karoserie</option>
                {bodyTypes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <select
                className="rounded-xl border px-4 py-3"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
                <option value="">Barva</option>
                {colors.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <input
                className="rounded-xl border px-4 py-3"
                placeholder="Výkon kW"
                value={power}
                onChange={(e) => setPower(e.target.value)}
              />

              <input
                className="rounded-xl border px-4 py-3"
                placeholder="Objem motoru l, např. 2.0"
                value={engineVolume}
                onChange={(e) => setEngineVolume(e.target.value)}
              />

              <select
                className="rounded-xl border px-4 py-3 md:col-span-2"
                value={driveType}
                onChange={(e) => setDriveType(e.target.value)}
              >
                <option value="">Pohon</option>
                {driveTypes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </FormSection>

          <FormSection
            title="Stav a dokumenty"
            description="Status inzerátu, VIN, STK a další údaje."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <select
                className="rounded-xl border px-4 py-3"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {statuses.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <input
                className="rounded-xl border px-4 py-3"
                placeholder="VIN"
                value={vin}
                onChange={(e) => setVin(e.target.value.toUpperCase())}
              />

              <input
                className="rounded-xl border px-4 py-3"
                placeholder="Počet majitelů"
                value={ownerCount}
                onChange={(e) => setOwnerCount(e.target.value)}
              />

              <select
                className="rounded-xl border px-4 py-3"
                value={euroNorm}
                onChange={(e) => setEuroNorm(e.target.value)}
              >
                <option value="">Euro norma</option>
                {euroNorms.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-600">
                  STK do
                </label>

                <input
                  type="date"
                  className="w-full rounded-xl border px-4 py-3"
                  value={stkUntil}
                  onChange={(e) => setStkUntil(e.target.value)}
                />
              </div>

              <label className="flex items-center gap-3 rounded-xl border bg-gray-50 px-4 py-3">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                />

                <span className="font-semibold">TOP nabídka</span>
              </label>
            </div>
          </FormSection>

          <FormSection
            title="Kontakt na prodejce"
            description="Tyto údaje se zobrazí u inzerátu."
          >
            <div className="grid gap-4 md:grid-cols-3">
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
          </FormSection>

          <FormSection
            title="Fotografie"
            description="Nahrajte více fotek vozidla. První fotka bude hlavní."
          >
            <div className="rounded-xl border bg-gray-50 p-4">
              <label className="block font-semibold">Fotografie vozidla</label>

              <input
                type="file"
                accept="image/*"
                multiple
                className="mt-3 w-full"
                onChange={(e) => setFiles(Array.from(e.target.files || []))}
              />

              {files.length > 0 && (
                <p className="mt-3 text-sm text-gray-500">
                  Vybráno fotografií: {files.length}
                </p>
              )}
            </div>
          </FormSection>

          <FormSection title="Popis vozidla">
            <textarea
              className="min-h-40 w-full rounded-xl border px-4 py-3"
              placeholder="Popis vozidla, servisní historie, výbava, stav..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormSection>

          <button
            disabled={loading}
            className="rounded-2xl bg-orange-600 py-4 text-lg font-semibold text-white shadow hover:bg-orange-700 disabled:bg-gray-400"
          >
            {loading ? "Nahrávání..." : "Přidat inzerát"}
          </button>
        </form>
      </div>
    </main>
  );
}