"use client";

import { useEffect, useState, type ChangeEvent, type ReactNode } from "react";
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

function normalizeVin(value: string) {
  return value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 17);
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
    <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-xl font-black text-gray-900 sm:text-2xl">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm leading-6 text-gray-500">
            {description}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}

function FieldLabel({
  children,
  required,
}: {
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label className="mb-2 block text-sm font-bold text-gray-700">
      {children}
      {required && <span className="text-orange-600"> *</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100";

const selectClass =
  "w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100";

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
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerPhone, setSellerPhone] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<
    { name: string; url: string }[]
  >([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">(
    "info",
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      filePreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [filePreviews]);

  function handleFilesChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files || []).filter((file) =>
      file.type.startsWith("image/"),
    );

    const limitedFiles = selectedFiles.slice(0, 20);

    filePreviews.forEach((preview) => URL.revokeObjectURL(preview.url));

    setFiles(limitedFiles);
    setFilePreviews(
      limitedFiles.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      })),
    );

    if (selectedFiles.length > 20) {
      setMessageType("info");
      setMessage("Vybrali jste více než 20 fotek. Nahraje se prvních 20.");
    } else {
      setMessage("");
    }
  }

  function validateForm() {
    if (!brand || !model || !year || !mileage || !price || !fuel) {
      return "Vyplňte prosím povinná pole: značka, model, rok, nájezd, cena a palivo.";
    }

    if (!transmission || !city) {
      return "Vyplňte prosím převodovku a město.";
    }

    if (vin && vin.length !== 17) {
      return "VIN musí mít přesně 17 znaků. Pokud ho nechcete uvádět, nechte pole prázdné.";
    }

    if (Number(price) <= 0 || Number(mileage) < 0) {
      return "Cena a nájezd musí být platné číslo.";
    }

    return "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setMessageType("error");
      setMessage(validationError);
      return;
    }

    setLoading(true);
    setMessageType("info");
    setMessage("Nahrávám inzerát...");

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
        vin: vin || null,
        drive_type: driveType,
        owner_count: ownerCount ? Number(ownerCount) : null,
        euro_norm: euroNorm,
        stk_until: stkUntil || null,
        is_featured: false,
        is_verified_by_ateam: false,
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
      setMessageType("error");
      setMessage(carError?.message || "Chyba při vytváření inzerátu.");
      return;
    }

    let firstImageUrl: string | null = null;

    for (const file of files) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${userData.user.id}/${carData.id}/${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("cars")
        .upload(fileName, file);

      if (uploadError) {
        setLoading(false);
        setMessageType("error");
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
        setMessageType("error");
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

    setMessageType("success");
    setMessage("Inzerát byl úspěšně přidán.");
    window.location.href = `/cars/${carData.slug || carData.id}`;
  }

  const messageClass =
    messageType === "error"
      ? "border-red-200 bg-red-50 text-red-700"
      : messageType === "success"
        ? "border-green-200 bg-green-50 text-green-700"
        : "border-blue-200 bg-blue-50 text-blue-700";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 text-gray-900 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 overflow-hidden rounded-3xl bg-gray-900 p-6 text-white shadow-sm sm:mb-8 sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-400">
            ATEAM AUTO
          </p>

          <h1 className="mt-3 text-3xl font-black sm:text-5xl">
            Přidat inzerát
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-300 sm:text-base">
            Vyplňte údaje o vozidle, kontakt a fotografie. TOP nabídka a
            označení Ověřeno ATEAM SERVICE může nastavit pouze správce.
          </p>
        </div>

        {message && (
          <p className={`mb-5 rounded-2xl border p-4 font-semibold ${messageClass}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="grid gap-5">
          <FormSection
            title="Základní údaje"
            description="Hlavní informace, podle kterých lidé auto najdou."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <FieldLabel required>Značka</FieldLabel>
                <select
                  className={selectClass}
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                >
                  <option value="">Vyberte značku</option>
                  {carBrands.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <FieldLabel required>Model</FieldLabel>
                <input
                  className={inputClass}
                  placeholder="Např. A6, Octavia, X5..."
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  required
                />
              </div>

              <div>
                <FieldLabel required>Rok výroby</FieldLabel>
                <select
                  className={selectClass}
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                >
                  <option value="">Vyberte rok</option>
                  {years.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <FieldLabel required>Najeto km</FieldLabel>
                <input
                  className={inputClass}
                  inputMode="numeric"
                  placeholder="Např. 185000"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                  required
                />
              </div>

              <div>
                <FieldLabel required>Cena Kč</FieldLabel>
                <input
                  className={inputClass}
                  inputMode="numeric"
                  placeholder="Např. 249000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div>
                <FieldLabel required>Město</FieldLabel>
                <input
                  className={inputClass}
                  placeholder="Např. Jihlava, Brno, Praha"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
            </div>
          </FormSection>

          <FormSection
            title="Technické údaje"
            description="Motor, převodovka, karoserie a další parametry."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <FieldLabel required>Palivo</FieldLabel>
                <select
                  className={selectClass}
                  value={fuel}
                  onChange={(e) => setFuel(e.target.value)}
                  required
                >
                  <option value="">Vyberte palivo</option>
                  {fuels.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <FieldLabel required>Převodovka</FieldLabel>
                <select
                  className={selectClass}
                  value={transmission}
                  onChange={(e) => setTransmission(e.target.value)}
                  required
                >
                  <option value="">Vyberte převodovku</option>
                  {transmissions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <FieldLabel>Karoserie</FieldLabel>
                <select
                  className={selectClass}
                  value={bodyType}
                  onChange={(e) => setBodyType(e.target.value)}
                >
                  <option value="">Vyberte karoserii</option>
                  {bodyTypes.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <FieldLabel>Barva</FieldLabel>
                <select
                  className={selectClass}
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                >
                  <option value="">Vyberte barvu</option>
                  {colors.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <FieldLabel>Výkon kW</FieldLabel>
                <input
                  className={inputClass}
                  inputMode="numeric"
                  placeholder="Např. 140"
                  value={power}
                  onChange={(e) => setPower(e.target.value)}
                />
              </div>

              <div>
                <FieldLabel>Objem motoru</FieldLabel>
                <input
                  className={inputClass}
                  inputMode="decimal"
                  placeholder="Např. 2.0"
                  value={engineVolume}
                  onChange={(e) => setEngineVolume(e.target.value)}
                />
              </div>

              <div className="md:col-span-2">
                <FieldLabel>Pohon</FieldLabel>
                <select
                  className={selectClass}
                  value={driveType}
                  onChange={(e) => setDriveType(e.target.value)}
                >
                  <option value="">Vyberte pohon</option>
                  {driveTypes.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </FormSection>

          <FormSection
            title="Stav a dokumenty"
            description="Status inzerátu, VIN, STK a další údaje."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <FieldLabel>Status</FieldLabel>
                <select
                  className={selectClass}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {statuses.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <FieldLabel>VIN</FieldLabel>
                <input
                  className={inputClass}
                  placeholder="17 znaků"
                  value={vin}
                  maxLength={17}
                  onChange={(e) => setVin(normalizeVin(e.target.value))}
                />
                <p
                  className={`mt-2 text-xs font-semibold ${
                    vin.length === 0 || vin.length === 17
                      ? "text-gray-500"
                      : "text-orange-600"
                  }`}
                >
                  {vin.length}/17 znaků
                </p>
              </div>

              <div>
                <FieldLabel>Počet majitelů</FieldLabel>
                <input
                  className={inputClass}
                  inputMode="numeric"
                  placeholder="Např. 2"
                  value={ownerCount}
                  onChange={(e) => setOwnerCount(e.target.value)}
                />
              </div>

              <div>
                <FieldLabel>Euro norma</FieldLabel>
                <select
                  className={selectClass}
                  value={euroNorm}
                  onChange={(e) => setEuroNorm(e.target.value)}
                >
                  <option value="">Vyberte normu</option>
                  {euroNorms.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <FieldLabel>STK do</FieldLabel>
                <input
                  type="date"
                  className={inputClass}
                  value={stkUntil}
                  onChange={(e) => setStkUntil(e.target.value)}
                />
              </div>
            </div>
          </FormSection>

          <FormSection
            title="Kontakt na prodejce"
            description="Tyto údaje se zobrazí u inzerátu."
          >
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <FieldLabel>Jméno prodejce</FieldLabel>
                <input
                  className={inputClass}
                  placeholder="Jméno nebo firma"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                />
              </div>

              <div>
                <FieldLabel>Telefon</FieldLabel>
                <input
                  className={inputClass}
                  placeholder="+420..."
                  value={sellerPhone}
                  onChange={(e) => setSellerPhone(e.target.value)}
                />
              </div>

              <div>
                <FieldLabel>E-mail</FieldLabel>
                <input
                  className={inputClass}
                  type="email"
                  placeholder="email@example.com"
                  value={sellerEmail}
                  onChange={(e) => setSellerEmail(e.target.value)}
                />
              </div>
            </div>
          </FormSection>

          <FormSection
            title="Fotografie"
            description="Nahrajte více fotek vozidla. První fotka bude hlavní."
          >
            <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-5">
              <label className="block font-black text-gray-900">
                Fotografie vozidla
              </label>

              <p className="mt-1 text-sm text-gray-500">
                Doporučení: nahrajte exteriér, interiér, tachometr, motor a
                případné vady. Maximum je 20 fotek.
              </p>

              <input
                type="file"
                accept="image/*"
                multiple
                className="mt-4 w-full rounded-xl bg-white p-3"
                onChange={handleFilesChange}
              />

              {filePreviews.length > 0 && (
                <div className="mt-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-sm font-bold text-gray-700">
                      Vybráno fotografií: {filePreviews.length}
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        filePreviews.forEach((preview) =>
                          URL.revokeObjectURL(preview.url),
                        );
                        setFiles([]);
                        setFilePreviews([]);
                      }}
                      className="text-sm font-bold text-red-600 hover:underline"
                    >
                      Vymazat fotky
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {filePreviews.map((preview, index) => (
                      <div
                        key={`${preview.name}-${index}`}
                        className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200"
                      >
                        <div className="relative">
                          {index === 0 && (
                            <span className="absolute left-2 top-2 rounded-full bg-orange-600 px-2 py-1 text-[10px] font-black text-white">
                              Hlavní
                            </span>
                          )}

                          <img
                            src={preview.url}
                            alt={preview.name}
                            className="h-32 w-full object-cover"
                          />
                        </div>

                        <p className="truncate px-3 py-2 text-xs text-gray-500">
                          {preview.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </FormSection>

          <FormSection title="Popis vozidla">
            <textarea
              className="min-h-40 w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              placeholder="Popis vozidla, servisní historie, výbava, stav..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormSection>

          <button
            disabled={loading}
            className="rounded-3xl bg-orange-600 py-4 text-lg font-black text-white shadow-sm transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {loading ? "Nahrávání..." : "Přidat inzerát"}
          </button>
        </form>
      </div>
    </main>
  );
}
