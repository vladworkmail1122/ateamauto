"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type CarImage = {
  id: number;
  image_url: string;
};

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
  String(2026 - index)
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
  const [images, setImages] = useState<CarImage[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCar();
  }, [params.id]);

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

    const { data: imageData } = await supabase
      .from("car_images")
      .select("id, image_url")
      .eq("car_id", params.id)
      .order("id", { ascending: true });

    setImages(imageData || []);
  }

  async function deleteImage(imageId: number, imageUrl: string) {
    const confirmDelete = window.confirm("Opravdu chcete smazat tuto fotku?");

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("car_images")
      .delete()
      .eq("id", imageId)
      .eq("car_id", params.id);

    if (error) {
      setMessage(error.message);
      return;
    }

    const updatedImages = images.filter((image) => image.id !== imageId);
    setImages(updatedImages);

    const newMainImage = updatedImages[0]?.image_url || null;

    await supabase
      .from("cars")
      .update({ image_url: newMainImage })
      .eq("id", params.id);

    const fileName = imageUrl.split("/").pop();

    if (fileName) {
      await supabase.storage.from("cars").remove([fileName]);
    }
  }

  async function setMainImage(imageUrl: string) {
    const { error } = await supabase
      .from("cars")
      .update({ image_url: imageUrl })
      .eq("id", params.id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Hlavní fotka byla nastavena.");
  }

  async function uploadNewImages() {
    if (newFiles.length === 0) return;

    for (const file of newFiles) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("cars")
        .upload(fileName, file);

      if (uploadError) {
        setMessage(uploadError.message);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("cars")
        .getPublicUrl(fileName);

      const imageUrl = publicUrlData.publicUrl;

      const { error: imageError } = await supabase.from("car_images").insert({
        car_id: Number(params.id),
        image_url: imageUrl,
      });

      if (imageError) {
        setMessage(imageError.message);
        return;
      }
    }

    setNewFiles([]);
    await loadCar();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      window.location.href = "/login";
      return;
    }

    await uploadNewImages();

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

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Inzerát byl úspěšně upraven.");
    window.location.href = "/dashboard";
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow">
        <h1 className="text-4xl font-bold">Upravit inzerát</h1>

        {message && (
          <p className="mt-4 rounded-xl bg-gray-100 p-4 text-gray-700">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
          <select
            className="rounded-xl border px-4 py-3"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
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
          />

          <select
            className="rounded-xl border px-4 py-3"
            value={year}
            onChange={(e) => setYear(e.target.value)}
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
          />

          <input
            className="rounded-xl border px-4 py-3"
            placeholder="Cena Kč"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <select
            className="rounded-xl border px-4 py-3"
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
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
          >
            <option value="">Převodovka</option>
            {transmissions.map((item) => (
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

          <input
            className="rounded-xl border px-4 py-3"
            placeholder="Město"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

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

          <div className="mt-4 rounded-2xl border bg-gray-50 p-5">
            <h2 className="mb-4 text-xl font-bold">Fotografie</h2>

            {images.length === 0 ? (
              <p className="text-gray-500">Zatím nejsou nahrané žádné fotky.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-3">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="overflow-hidden rounded-xl bg-white shadow"
                  >
                    <img
                      src={image.image_url}
                      alt="Foto vozidla"
                      className="h-36 w-full object-cover"
                    />

                    <div className="grid gap-2 p-3">
                      <button
                        type="button"
                        onClick={() => setMainImage(image.image_url)}
                        className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-100"
                      >
                        Nastavit jako hlavní
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteImage(image.id, image.image_url)}
                        className="rounded-lg border border-red-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Smazat fotku
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-5">
              <label className="block font-semibold">Přidat nové fotky</label>

              <input
                type="file"
                accept="image/*"
                multiple
                className="mt-3"
                onChange={(e) => setNewFiles(Array.from(e.target.files || []))}
              />

              {newFiles.length > 0 && (
                <p className="mt-2 text-sm text-gray-500">
                  Vybráno nových fotek: {newFiles.length}
                </p>
              )}
            </div>
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
            {loading ? "Ukládání..." : "Uložit změny"}
          </button>
        </form>
      </div>
    </main>
  );
}