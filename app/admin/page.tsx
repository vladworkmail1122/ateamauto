"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Car = {
  id: number;
  slug: string | null;
  brand: string;
  model: string;
  year: number | null;
  mileage: number | null;
  price: number | null;
  fuel: string | null;
  transmission: string | null;
  power: number | null;
  engine_volume: number | null;
  body_type: string | null;
  color: string | null;
  status: string | null;
  vin: string | null;
  drive_type: string | null;
  owner_count: number | null;
  euro_norm: string | null;
  stk_until: string | null;
  city: string | null;
  description: string | null;
  seller_name: string | null;
  seller_phone: string | null;
  seller_email: string | null;
  image_url: string | null;
  is_featured: boolean | null;
  is_verified_by_ateam: boolean | null;
  views: number | null;
  user_id?: string | null;
};

type CarImage = {
  id: number;
  image_url: string;
};

type AdminField = "is_featured" | "is_verified_by_ateam";
type StatusFilter = "all" | "Aktivní" | "Rezervováno" | "Prodáno";
type BooleanFilter = "all" | "yes" | "no";

type AdminForm = {
  brand: string;
  model: string;
  year: string;
  mileage: string;
  price: string;
  fuel: string;
  transmission: string;
  power: string;
  engineVolume: string;
  bodyType: string;
  color: string;
  status: string;
  vin: string;
  driveType: string;
  ownerCount: string;
  euroNorm: string;
  stkUntil: string;
  city: string;
  description: string;
  sellerName: string;
  sellerPhone: string;
  sellerEmail: string;
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

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

const labelClass = "mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500";

function createEmptyForm(): AdminForm {
  return {
    brand: "",
    model: "",
    year: "",
    mileage: "",
    price: "",
    fuel: "",
    transmission: "",
    power: "",
    engineVolume: "",
    bodyType: "",
    color: "",
    status: "Aktivní",
    vin: "",
    driveType: "",
    ownerCount: "",
    euroNorm: "",
    stkUntil: "",
    city: "",
    description: "",
    sellerName: "",
    sellerPhone: "",
    sellerEmail: "",
  };
}

function formFromCar(car: Car): AdminForm {
  return {
    brand: car.brand || "",
    model: car.model || "",
    year: String(car.year || ""),
    mileage: String(car.mileage || ""),
    price: String(car.price || ""),
    fuel: car.fuel || "",
    transmission: car.transmission || "",
    power: String(car.power || ""),
    engineVolume: String(car.engine_volume || ""),
    bodyType: car.body_type || "",
    color: car.color || "",
    status: car.status || "Aktivní",
    vin: car.vin || "",
    driveType: car.drive_type || "",
    ownerCount: String(car.owner_count || ""),
    euroNorm: car.euro_norm || "",
    stkUntil: car.stk_until || "",
    city: car.city || "",
    description: car.description || "",
    sellerName: car.seller_name || "",
    sellerPhone: car.seller_phone || "",
    sellerEmail: car.seller_email || "",
  };
}

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

function numberOrNull(value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) return null;

  const numberValue = Number(trimmedValue.replace(",", "."));

  return Number.isFinite(numberValue) ? numberValue : null;
}

function intOrNull(value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) return null;

  const numberValue = Number(trimmedValue.replace(/\s/g, ""));

  return Number.isFinite(numberValue) ? Math.round(numberValue) : null;
}

function formatPrice(price: number | null) {
  if (!price) return "Цена договорная";

  return `${price.toLocaleString("cs-CZ")} Kč`;
}

function getStatusLabel(status: string | null) {
  if (status === "Prodáno") return "Продано";
  if (status === "Rezervováno") return "Резерв";
  return "Активно";
}

function getStatusClass(status: string | null) {
  if (status === "Prodáno") return "bg-red-100 text-red-700";
  if (status === "Rezervováno") return "bg-yellow-100 text-yellow-800";
  return "bg-green-100 text-green-700";
}

function extractStoragePath(imageUrl: string) {
  try {
    const url = new URL(imageUrl);
    const marker = "/storage/v1/object/public/cars/";
    const index = url.pathname.indexOf(marker);

    if (index !== -1) {
      return decodeURIComponent(url.pathname.slice(index + marker.length));
    }
  } catch {
    // fallback below
  }

  return imageUrl.split("/").pop() || "";
}

function StatCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-black text-gray-900">{value}</p>

      {subtitle && <p className="mt-1 text-xs text-gray-500">{subtitle}</p>}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      {children}
    </label>
  );
}

export default function AdminPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [cars, setCars] = useState<Car[]>([]);
  const [images, setImages] = useState<CarImage[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [email, setEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [carsLoading, setCarsLoading] = useState(false);
  const [imagesLoading, setImagesLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [savingCarId, setSavingCarId] = useState<number | null>(null);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [topFilter, setTopFilter] = useState<BooleanFilter>("all");
  const [verifiedFilter, setVerifiedFilter] = useState<BooleanFilter>("all");
  const [form, setForm] = useState<AdminForm>(createEmptyForm);

  const selectedCar = useMemo(
    () => cars.find((car) => car.id === selectedCarId) || null,
    [cars, selectedCarId],
  );

  const filteredCars = useMemo(() => {
    const query = search.trim().toLowerCase();

    return cars.filter((car) => {
      const matchesSearch =
        !query ||
        `${car.brand} ${car.model} ${car.year || ""} ${car.status || ""} ${
          car.city || ""
        } ${car.vin || ""}`
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "all" || car.status === statusFilter;

      const matchesTop =
        topFilter === "all" ||
        (topFilter === "yes" ? !!car.is_featured : !car.is_featured);

      const matchesVerified =
        verifiedFilter === "all" ||
        (verifiedFilter === "yes"
          ? !!car.is_verified_by_ateam
          : !car.is_verified_by_ateam);

      return matchesSearch && matchesStatus && matchesTop && matchesVerified;
    });
  }, [cars, search, statusFilter, topFilter, verifiedFilter]);

  const totalViews = cars.reduce((sum, car) => sum + (car.views || 0), 0);
  const activeCars = cars.filter((car) => car.status === "Aktivní").length;
  const reservedCars = cars.filter((car) => car.status === "Rezervováno").length;
  const soldCars = cars.filter((car) => car.status === "Prodáno").length;
  const topCars = cars.filter((car) => car.is_featured).length;
  const verifiedCars = cars.filter((car) => car.is_verified_by_ateam).length;

  useEffect(() => {
    checkAdminAndLoadCars();
  }, []);

  useEffect(() => {
    if (!selectedCarId) {
      setImages([]);
      setNewFiles([]);
      return;
    }

    loadImages(selectedCarId);
  }, [selectedCarId]);

  function updateForm(field: keyof AdminForm, value: string) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function selectCar(car: Car) {
    setSelectedCarId(car.id);
    setForm(formFromCar(car));
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function checkAdminAndLoadCars() {
    setLoading(true);
    setMessage("");

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      window.location.href = "/login";
      return;
    }

    setEmail(userData.user.email ?? null);

    const { data: adminResult, error: adminError } =
      await supabase.rpc("is_admin");

    if (adminError) {
      setMessage(
        "Ошибка проверки администратора. Проверь SQL-функцию is_admin в Supabase.",
      );
      setLoading(false);
      return;
    }

    if (!adminResult) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    setIsAdmin(true);
    await loadCars();
    setLoading(false);
  }

  async function loadCars() {
    setCarsLoading(true);
    setMessage("");

    const { data, error } = await supabase
      .from("cars")
      .select("*")
      .order("id", { ascending: false });

    setCarsLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setCars(data || []);

    if (selectedCarId) {
      const updatedSelectedCar = (data || []).find(
        (car) => car.id === selectedCarId,
      );

      if (updatedSelectedCar) {
        setForm(formFromCar(updatedSelectedCar));
      }
    }
  }

  async function loadImages(carId: number) {
    setImagesLoading(true);

    const { data, error } = await supabase
      .from("car_images")
      .select("id, image_url")
      .eq("car_id", carId)
      .order("id", { ascending: true });

    setImagesLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setImages(data || []);
  }

  async function toggleCarField(car: Car, field: AdminField) {
    setSavingCarId(car.id);
    setMessage("");

    const nextValue = !car[field];

    const { error } = await supabase
      .from("cars")
      .update({ [field]: nextValue })
      .eq("id", car.id);

    setSavingCarId(null);

    if (error) {
      setMessage(error.message);
      return;
    }

    setCars((currentCars) =>
      currentCars.map((currentCar) =>
        currentCar.id === car.id
          ? {
              ...currentCar,
              [field]: nextValue,
            }
          : currentCar,
      ),
    );

    setMessage("Изменение сохранено.");
  }

  async function saveSelectedCar() {
    if (!selectedCar) return;

    setSaving(true);
    setMessage("");

    const payload = {
      brand: form.brand.trim(),
      model: form.model.trim(),
      slug: createSlug(form.brand, form.model, form.year),
      year: intOrNull(form.year),
      mileage: intOrNull(form.mileage),
      price: intOrNull(form.price),
      fuel: form.fuel,
      transmission: form.transmission,
      power: intOrNull(form.power),
      engine_volume: numberOrNull(form.engineVolume),
      body_type: form.bodyType,
      color: form.color,
      status: form.status,
      vin: form.vin.trim(),
      drive_type: form.driveType,
      owner_count: intOrNull(form.ownerCount),
      euro_norm: form.euroNorm,
      stk_until: form.stkUntil || null,
      city: form.city.trim(),
      description: form.description.trim(),
      seller_name: form.sellerName.trim(),
      seller_phone: form.sellerPhone.trim(),
      seller_email: form.sellerEmail.trim(),
    };

    const { error } = await supabase
      .from("cars")
      .update(payload)
      .eq("id", selectedCar.id);

    setSaving(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setCars((currentCars) =>
      currentCars.map((car) =>
        car.id === selectedCar.id
          ? {
              ...car,
              ...payload,
            }
          : car,
      ),
    );

    setMessage("Объявление сохранено.");
  }

  async function setMainImage(imageUrl: string) {
    if (!selectedCar) return;

    setMessage("");

    const { error } = await supabase
      .from("cars")
      .update({ image_url: imageUrl })
      .eq("id", selectedCar.id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setCars((currentCars) =>
      currentCars.map((car) =>
        car.id === selectedCar.id
          ? {
              ...car,
              image_url: imageUrl,
            }
          : car,
      ),
    );

    setMessage("Главное фото установлено.");
  }

  async function deleteImage(image: CarImage) {
    if (!selectedCar) return;

    const confirmDelete = window.confirm("Удалить это фото?");

    if (!confirmDelete) return;

    setMessage("");

    const { error } = await supabase
      .from("car_images")
      .delete()
      .eq("id", image.id)
      .eq("car_id", selectedCar.id);

    if (error) {
      setMessage(error.message);
      return;
    }

    const filePath = extractStoragePath(image.image_url);

    if (filePath) {
      await supabase.storage.from("cars").remove([filePath]);
    }

    const updatedImages = images.filter((item) => item.id !== image.id);
    setImages(updatedImages);

    if (selectedCar.image_url === image.image_url) {
      const newMainImage = updatedImages[0]?.image_url || null;

      await supabase
        .from("cars")
        .update({ image_url: newMainImage })
        .eq("id", selectedCar.id);

      setCars((currentCars) =>
        currentCars.map((car) =>
          car.id === selectedCar.id
            ? {
                ...car,
                image_url: newMainImage,
              }
            : car,
        ),
      );
    }

    setMessage("Фото удалено.");
  }

  async function uploadImages() {
    if (!selectedCar || newFiles.length === 0) return;

    setUploadingImages(true);
    setMessage("");

    let firstUploadedImageUrl: string | null = null;

    for (const file of newFiles) {
      const fileExt = file.name.split(".").pop() || "jpg";
      const fileName = `${selectedCar.id}/${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("cars")
        .upload(fileName, file);

      if (uploadError) {
        setMessage(uploadError.message);
        setUploadingImages(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("cars")
        .getPublicUrl(fileName);

      const imageUrl = publicUrlData.publicUrl;

      if (!firstUploadedImageUrl) {
        firstUploadedImageUrl = imageUrl;
      }

      const { error: imageError } = await supabase.from("car_images").insert({
        car_id: selectedCar.id,
        image_url: imageUrl,
      });

      if (imageError) {
        setMessage(imageError.message);
        setUploadingImages(false);
        return;
      }
    }

    if (!selectedCar.image_url && firstUploadedImageUrl) {
      await supabase
        .from("cars")
        .update({ image_url: firstUploadedImageUrl })
        .eq("id", selectedCar.id);

      setCars((currentCars) =>
        currentCars.map((car) =>
          car.id === selectedCar.id
            ? {
                ...car,
                image_url: firstUploadedImageUrl,
              }
            : car,
        ),
      );
    }

    setNewFiles([]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    await loadImages(selectedCar.id);

    setUploadingImages(false);
    setMessage("Фото загружены.");
  }

  async function deleteCar(car: Car) {
    const confirmText = `${car.brand} ${car.model}`;
    const confirmDelete = window.confirm(
      `Удалить объявление "${confirmText}"? Это действие нельзя отменить.`,
    );

    if (!confirmDelete) return;

    setSavingCarId(car.id);
    setMessage("");

    const { data: imageData } = await supabase
      .from("car_images")
      .select("id, image_url")
      .eq("car_id", car.id);

    const storagePaths =
      imageData
        ?.map((image) => extractStoragePath(image.image_url))
        .filter(Boolean) || [];

    if (storagePaths.length > 0) {
      await supabase.storage.from("cars").remove(storagePaths);
    }

    const { error: imagesError } = await supabase
      .from("car_images")
      .delete()
      .eq("car_id", car.id);

    if (imagesError) {
      setSavingCarId(null);
      setMessage(imagesError.message);
      return;
    }

    const { error: carError } = await supabase.from("cars").delete().eq("id", car.id);

    setSavingCarId(null);

    if (carError) {
      setMessage(carError.message);
      return;
    }

    setCars((currentCars) => currentCars.filter((item) => item.id !== car.id));

    if (selectedCarId === car.id) {
      setSelectedCarId(null);
      setForm(createEmptyForm());
      setImages([]);
    }

    setMessage("Объявление удалено.");
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl bg-white p-8 shadow">
            <p className="text-gray-600">Загрузка админки...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl bg-white p-8 text-center shadow">
            <h1 className="text-3xl font-bold text-gray-900">
              Доступ запрещён
            </h1>

            <p className="mt-3 text-gray-600">
              Этот аккаунт не имеет прав администратора.
            </p>

            {email && (
              <p className="mt-3 break-all rounded-xl bg-gray-50 p-3 text-sm text-gray-500">
                Аккаунт: {email}
              </p>
            )}

            <Link
              href="/"
              className="mt-6 inline-block rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
            >
              На главную
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">
              ATEAM AUTO
            </p>

            <h1 className="mt-2 text-3xl font-black text-gray-900 sm:text-5xl">
              Расширенная админка
            </h1>

            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Управление объявлениями, TOP, проверкой ATEAM, фотографиями,
              статусами и контактами.
            </p>

            {email && (
              <p className="mt-2 break-all text-xs text-gray-500">
                Admin: {email}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              href="/dashboard"
              className="rounded-xl border bg-white px-4 py-3 text-center font-semibold hover:bg-gray-100"
            >
              Мой кабинет
            </Link>

            <Link
              href="/sell"
              className="rounded-xl bg-orange-600 px-4 py-3 text-center font-semibold text-white hover:bg-orange-700"
            >
              Добавить объявление
            </Link>

            <button
              type="button"
              onClick={logout}
              className="rounded-xl border bg-white px-4 py-3 font-semibold hover:bg-gray-100"
            >
              Выйти
            </button>
          </div>
        </div>

        {message && (
          <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-4 text-sm font-medium text-orange-800">
            {message}
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-6">
          <StatCard title="Всего" value={cars.length} />
          <StatCard title="Активные" value={activeCars} />
          <StatCard title="Резерв" value={reservedCars} />
          <StatCard title="Продано" value={soldCars} />
          <StatCard title="TOP" value={topCars} />
          <StatCard title="ATEAM" value={verifiedCars} subtitle={`${totalViews.toLocaleString("cs-CZ")} просмотров`} />
        </div>

        {selectedCar && (
          <section className="mt-6 rounded-3xl bg-white p-5 shadow ring-1 ring-gray-100 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-orange-600">
                  Редактирование
                </p>

                <h2 className="mt-1 text-2xl font-black text-gray-900">
                  {selectedCar.brand} {selectedCar.model}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  ID: {selectedCar.id} • {formatPrice(selectedCar.price)} •{" "}
                  {getStatusLabel(selectedCar.status)}
                </p>
              </div>

              <div className="grid gap-2 sm:grid-cols-2 lg:w-[420px]">
                <button
                  type="button"
                  disabled={savingCarId === selectedCar.id}
                  onClick={() => toggleCarField(selectedCar, "is_featured")}
                  className={`rounded-xl px-4 py-3 text-sm font-bold transition disabled:opacity-50 ${
                    selectedCar.is_featured
                      ? "bg-yellow-400 text-black hover:bg-yellow-300"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {selectedCar.is_featured ? "TOP включён" : "Включить TOP"}
                </button>

                <button
                  type="button"
                  disabled={savingCarId === selectedCar.id}
                  onClick={() =>
                    toggleCarField(selectedCar, "is_verified_by_ateam")
                  }
                  className={`rounded-xl px-4 py-3 text-sm font-bold transition disabled:opacity-50 ${
                    selectedCar.is_verified_by_ateam
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {selectedCar.is_verified_by_ateam
                    ? "Проверка включена"
                    : "Включить проверку"}
                </button>

                <Link
                  href={`/cars/${selectedCar.slug || selectedCar.id}`}
                  className="rounded-xl bg-gray-900 px-4 py-3 text-center text-sm font-bold text-white hover:bg-black"
                >
                  Открыть объявление
                </Link>

                <button
                  type="button"
                  onClick={() => deleteCar(selectedCar)}
                  className="rounded-xl border border-red-300 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50"
                >
                  Удалить объявление
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_420px]">
              <div className="grid gap-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Марка">
                    <select
                      className={inputClass}
                      value={form.brand}
                      onChange={(event) => updateForm("brand", event.target.value)}
                    >
                      <option value="">Выбрать марку</option>
                      {carBrands.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Модель">
                    <input
                      className={inputClass}
                      value={form.model}
                      onChange={(event) => updateForm("model", event.target.value)}
                    />
                  </Field>

                  <Field label="Год">
                    <select
                      className={inputClass}
                      value={form.year}
                      onChange={(event) => updateForm("year", event.target.value)}
                    >
                      <option value="">Год</option>
                      {years.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Пробег, км">
                    <input
                      className={inputClass}
                      value={form.mileage}
                      onChange={(event) => updateForm("mileage", event.target.value)}
                    />
                  </Field>

                  <Field label="Цена, Kč">
                    <input
                      className={inputClass}
                      value={form.price}
                      onChange={(event) => updateForm("price", event.target.value)}
                    />
                  </Field>

                  <Field label="Город">
                    <input
                      className={inputClass}
                      value={form.city}
                      onChange={(event) => updateForm("city", event.target.value)}
                    />
                  </Field>

                  <Field label="Топливо">
                    <select
                      className={inputClass}
                      value={form.fuel}
                      onChange={(event) => updateForm("fuel", event.target.value)}
                    >
                      <option value="">Топливо</option>
                      {fuels.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Коробка">
                    <select
                      className={inputClass}
                      value={form.transmission}
                      onChange={(event) =>
                        updateForm("transmission", event.target.value)
                      }
                    >
                      <option value="">Коробка</option>
                      {transmissions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Кузов">
                    <select
                      className={inputClass}
                      value={form.bodyType}
                      onChange={(event) => updateForm("bodyType", event.target.value)}
                    >
                      <option value="">Кузов</option>
                      {bodyTypes.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Цвет">
                    <select
                      className={inputClass}
                      value={form.color}
                      onChange={(event) => updateForm("color", event.target.value)}
                    >
                      <option value="">Цвет</option>
                      {colors.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Мощность, kW">
                    <input
                      className={inputClass}
                      value={form.power}
                      onChange={(event) => updateForm("power", event.target.value)}
                    />
                  </Field>

                  <Field label="Объём двигателя, л">
                    <input
                      className={inputClass}
                      value={form.engineVolume}
                      onChange={(event) =>
                        updateForm("engineVolume", event.target.value)
                      }
                    />
                  </Field>

                  <Field label="Статус">
                    <select
                      className={inputClass}
                      value={form.status}
                      onChange={(event) => updateForm("status", event.target.value)}
                    >
                      {statuses.map((item) => (
                        <option key={item} value={item}>
                          {getStatusLabel(item)}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="VIN">
                    <input
                      className={inputClass}
                      value={form.vin}
                      maxLength={17}
                      onChange={(event) =>
                        updateForm("vin", normalizeVin(event.target.value))
                      }
                    />
                  </Field>

                  <Field label="Привод">
                    <select
                      className={inputClass}
                      value={form.driveType}
                      onChange={(event) => updateForm("driveType", event.target.value)}
                    >
                      <option value="">Привод</option>
                      {driveTypes.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Владельцев">
                    <input
                      className={inputClass}
                      value={form.ownerCount}
                      onChange={(event) =>
                        updateForm("ownerCount", event.target.value)
                      }
                    />
                  </Field>

                  <Field label="Euro норма">
                    <select
                      className={inputClass}
                      value={form.euroNorm}
                      onChange={(event) => updateForm("euroNorm", event.target.value)}
                    >
                      <option value="">Euro норма</option>
                      {euroNorms.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="STK до">
                    <input
                      type="date"
                      className={inputClass}
                      value={form.stkUntil}
                      onChange={(event) => updateForm("stkUntil", event.target.value)}
                    />
                  </Field>

                  <Field label="Имя продавца">
                    <input
                      className={inputClass}
                      value={form.sellerName}
                      onChange={(event) =>
                        updateForm("sellerName", event.target.value)
                      }
                    />
                  </Field>

                  <Field label="Телефон">
                    <input
                      className={inputClass}
                      value={form.sellerPhone}
                      onChange={(event) =>
                        updateForm("sellerPhone", event.target.value)
                      }
                    />
                  </Field>

                  <Field label="E-mail">
                    <input
                      className={inputClass}
                      value={form.sellerEmail}
                      onChange={(event) =>
                        updateForm("sellerEmail", event.target.value)
                      }
                    />
                  </Field>
                </div>

                <Field label="Описание">
                  <textarea
                    className={`${inputClass} min-h-40`}
                    value={form.description}
                    onChange={(event) =>
                      updateForm("description", event.target.value)
                    }
                  />
                </Field>

                <button
                  type="button"
                  disabled={saving}
                  onClick={saveSelectedCar}
                  className="rounded-2xl bg-orange-600 px-6 py-4 text-lg font-bold text-white shadow hover:bg-orange-700 disabled:bg-gray-400"
                >
                  {saving ? "Сохранение..." : "Сохранить изменения"}
                </button>
              </div>

              <aside className="rounded-2xl border bg-gray-50 p-4">
                <h3 className="text-xl font-black text-gray-900">Фотографии</h3>

                <p className="mt-1 text-sm text-gray-500">
                  Установка главного фото, удаление и добавление новых фото.
                </p>

                <div className="mt-4 rounded-xl border bg-white p-4">
                  <label className="block text-sm font-bold text-gray-700">
                    Добавить фото
                  </label>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="mt-3 w-full text-sm"
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setNewFiles(Array.from(event.target.files || []))
                    }
                  />

                  {newFiles.length > 0 && (
                    <p className="mt-2 text-sm text-gray-500">
                      Выбрано файлов: {newFiles.length}
                    </p>
                  )}

                  <button
                    type="button"
                    disabled={uploadingImages || newFiles.length === 0}
                    onClick={uploadImages}
                    className="mt-3 w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-bold text-white hover:bg-black disabled:bg-gray-400"
                  >
                    {uploadingImages ? "Загрузка..." : "Загрузить фото"}
                  </button>
                </div>

                {imagesLoading ? (
                  <p className="mt-4 text-sm text-gray-500">Загрузка фото...</p>
                ) : images.length === 0 ? (
                  <div className="mt-4 rounded-xl border bg-white p-6 text-center text-sm text-gray-500">
                    Фото пока нет.
                  </div>
                ) : (
                  <div className="mt-4 grid gap-3">
                    {images.map((image) => (
                      <div
                        key={image.id}
                        className="overflow-hidden rounded-xl border bg-white"
                      >
                        <img
                          src={image.image_url}
                          alt="Фото авто"
                          className="h-44 w-full object-cover"
                        />

                        <div className="grid gap-2 p-3">
                          {selectedCar.image_url === image.image_url && (
                            <div className="rounded-lg bg-orange-100 px-3 py-2 text-center text-xs font-bold text-orange-700">
                              Главное фото
                            </div>
                          )}

                          <button
                            type="button"
                            onClick={() => setMainImage(image.image_url)}
                            className="rounded-lg border px-3 py-2 text-sm font-bold hover:bg-gray-100"
                          >
                            Сделать главным
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteImage(image)}
                            className="rounded-lg border border-red-300 px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50"
                          >
                            Удалить фото
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </aside>
            </div>
          </section>
        )}

        <section className="mt-6 rounded-3xl bg-white p-5 shadow ring-1 ring-gray-100 sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="text-2xl font-black text-gray-900">
                Все объявления
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Найдено: {filteredCars.length} из {cars.length}
              </p>
            </div>

            <button
              type="button"
              onClick={loadCars}
              disabled={carsLoading}
              className="rounded-xl border bg-white px-4 py-3 font-bold hover:bg-gray-100 disabled:opacity-50"
            >
              {carsLoading ? "Обновление..." : "Обновить список"}
            </button>
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_180px_180px_180px]">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Поиск: марка, модель, год, город, VIN..."
              className={inputClass}
            />

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as StatusFilter)
              }
              className={inputClass}
            >
              <option value="all">Все статусы</option>
              <option value="Aktivní">Активные</option>
              <option value="Rezervováno">Резерв</option>
              <option value="Prodáno">Продано</option>
            </select>

            <select
              value={topFilter}
              onChange={(event) =>
                setTopFilter(event.target.value as BooleanFilter)
              }
              className={inputClass}
            >
              <option value="all">Все TOP</option>
              <option value="yes">Только TOP</option>
              <option value="no">Без TOP</option>
            </select>

            <select
              value={verifiedFilter}
              onChange={(event) =>
                setVerifiedFilter(event.target.value as BooleanFilter)
              }
              className={inputClass}
            >
              <option value="all">Все ATEAM</option>
              <option value="yes">Только проверенные</option>
              <option value="no">Без проверки</option>
            </select>
          </div>

          {filteredCars.length === 0 ? (
            <div className="mt-6 rounded-2xl bg-gray-50 p-8 text-center text-gray-500">
              Ничего не найдено.
            </div>
          ) : (
            <div className="mt-6 grid gap-4">
              {filteredCars.map((car) => (
                <div
                  key={car.id}
                  className={`grid gap-4 rounded-2xl border p-4 transition md:grid-cols-[140px_1fr] md:items-center ${
                    selectedCarId === car.id
                      ? "border-orange-400 bg-orange-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => selectCar(car)}
                    className="overflow-hidden rounded-xl bg-gray-200 text-left"
                  >
                    {car.image_url ? (
                      <img
                        src={car.image_url}
                        alt={`${car.brand} ${car.model}`}
                        className="h-32 w-full object-cover md:h-24"
                      />
                    ) : (
                      <div className="flex h-32 items-center justify-center text-3xl md:h-24">
                        🚗
                      </div>
                    )}
                  </button>

                  <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => selectCar(car)}
                          className="text-left text-lg font-black text-gray-900 hover:text-orange-600"
                        >
                          {car.brand} {car.model}
                        </button>

                        {car.year && (
                          <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-gray-700">
                            {car.year}
                          </span>
                        )}

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(
                            car.status,
                          )}`}
                        >
                          {getStatusLabel(car.status)}
                        </span>

                        {car.is_featured && (
                          <span className="rounded-full bg-yellow-400 px-3 py-1 text-xs font-black text-black">
                            TOP
                          </span>
                        )}

                        {car.is_verified_by_ateam && (
                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-black text-green-700">
                            ✓ ATEAM
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-xl font-black text-orange-600">
                        {formatPrice(car.price)}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        ID: {car.id} • {car.city || "Город не указан"} •{" "}
                        👁 {(car.views || 0).toLocaleString("cs-CZ")}
                      </p>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2 lg:w-[520px]">
                      <button
                        type="button"
                        onClick={() => selectCar(car)}
                        className="rounded-xl bg-gray-900 px-4 py-3 text-sm font-bold text-white hover:bg-black"
                      >
                        Редактировать
                      </button>

                      <Link
                        href={`/cars/${car.slug || car.id}`}
                        className="rounded-xl border bg-white px-4 py-3 text-center text-sm font-bold hover:bg-gray-100"
                      >
                        Открыть
                      </Link>

                      <button
                        type="button"
                        disabled={savingCarId === car.id}
                        onClick={() => toggleCarField(car, "is_featured")}
                        className={`rounded-xl px-4 py-3 text-sm font-bold transition disabled:opacity-50 ${
                          car.is_featured
                            ? "bg-yellow-400 text-black hover:bg-yellow-300"
                            : "bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        {car.is_featured ? "TOP включён" : "TOP выкл."}
                      </button>

                      <button
                        type="button"
                        disabled={savingCarId === car.id}
                        onClick={() =>
                          toggleCarField(car, "is_verified_by_ateam")
                        }
                        className={`rounded-xl px-4 py-3 text-sm font-bold transition disabled:opacity-50 ${
                          car.is_verified_by_ateam
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        {car.is_verified_by_ateam ? "ATEAM вкл." : "ATEAM выкл."}
                      </button>

                      <button
                        type="button"
                        disabled={savingCarId === car.id}
                        onClick={() => deleteCar(car)}
                        className="rounded-xl border border-red-300 bg-white px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 disabled:opacity-50 sm:col-span-2"
                      >
                        Удалить объявление
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
