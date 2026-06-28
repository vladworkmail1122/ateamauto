"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { supabase } from "@/lib/supabase";

type LanguageCode = "cs" | "en" | "uk" | "ru";

type CarImage = {
  id: number;
  image_url: string;
};

const translations = {
  cs: {
    title: "Upravit inzerát",
    subtitle: "Upravte údaje o vozidle, fotografie, kontakt a stav inzerátu.",
    basicTitle: "Základní údaje",
    basicDescription: "Hlavní informace, podle kterých lidé auto najdou.",
    brand: "Značka",
    model: "Model",
    productionYear: "Rok výroby",
    mileageKm: "Najeto km",
    priceCzk: "Cena Kč",
    city: "Město",
    technicalTitle: "Technické údaje",
    technicalDescription: "Motor, převodovka, karoserie a další parametry.",
    fuel: "Palivo",
    transmission: "Převodovka",
    bodyType: "Karoserie",
    color: "Barva",
    powerKw: "Výkon kW",
    engineVolume: "Objem motoru l, např. 2.0",
    driveType: "Pohon",
    documentsTitle: "Stav a dokumenty",
    documentsDescription: "Status inzerátu, VIN, STK a další údaje.",
    ownerCount: "Počet majitelů",
    euroNorm: "Euro norma",
    stkUntil: "STK do",
    contactTitle: "Kontakt na prodejce",
    contactDescription: "Tyto údaje se zobrazí u inzerátu.",
    sellerName: "Jméno prodejce",
    phone: "Telefon",
    email: "E-mail",
    photosTitle: "Fotografie",
    photosDescription:
      "Můžete nastavit hlavní fotku, smazat staré fotky nebo přidat nové.",
    noPhotos: "Zatím nejsou nahrané žádné fotky.",
    carPhotoAlt: "Foto vozidla",
    setMainPhoto: "Nastavit jako hlavní",
    deletePhoto: "Smazat fotku",
    addNewPhotos: "Přidat nové fotky",
    selectedNewPhotos: "Vybráno nových fotek",
    descriptionTitle: "Popis vozidla",
    descriptionPlaceholder: "Popis vozidla, servisní historie, výbava, stav...",
    saving: "Ukládání...",
    save: "Uložit změny",
    notFound: "Inzerát nebyl nalezen nebo k němu nemáte přístup.",
    deletePhotoConfirm: "Opravdu chcete smazat tuto fotku?",
    mainPhotoSet: "Hlavní fotka byla nastavena.",
    success: "Inzerát byl úspěšně upraven.",
    selectBrand: "Značka",
    selectFuel: "Palivo",
    selectTransmission: "Převodovka",
    selectBodyType: "Karoserie",
    selectColor: "Barva",
    selectDriveType: "Pohon",
    selectEuroNorm: "Euro norma",
  },
  en: {
    title: "Edit listing",
    subtitle: "Edit vehicle details, photos, contact and listing status.",
    basicTitle: "Basic information",
    basicDescription: "Main information people use to find the car.",
    brand: "Brand",
    model: "Model",
    productionYear: "Year of manufacture",
    mileageKm: "Mileage km",
    priceCzk: "Price CZK",
    city: "City",
    technicalTitle: "Technical data",
    technicalDescription: "Engine, transmission, body type and other parameters.",
    fuel: "Fuel",
    transmission: "Transmission",
    bodyType: "Body type",
    color: "Color",
    powerKw: "Power kW",
    engineVolume: "Engine volume l, e.g. 2.0",
    driveType: "Drive",
    documentsTitle: "Condition and documents",
    documentsDescription: "Listing status, VIN, inspection and other details.",
    ownerCount: "Number of owners",
    euroNorm: "Euro norm",
    stkUntil: "Inspection valid until",
    contactTitle: "Seller contact",
    contactDescription: "These details will be shown in the listing.",
    sellerName: "Seller name",
    phone: "Phone",
    email: "E-mail",
    photosTitle: "Photos",
    photosDescription:
      "You can set the main photo, delete old photos or add new ones.",
    noPhotos: "No photos have been uploaded yet.",
    carPhotoAlt: "Vehicle photo",
    setMainPhoto: "Set as main",
    deletePhoto: "Delete photo",
    addNewPhotos: "Add new photos",
    selectedNewPhotos: "Selected new photos",
    descriptionTitle: "Vehicle description",
    descriptionPlaceholder: "Vehicle description, service history, equipment, condition...",
    saving: "Saving...",
    save: "Save changes",
    notFound: "The listing was not found or you do not have access to it.",
    deletePhotoConfirm: "Do you really want to delete this photo?",
    mainPhotoSet: "The main photo has been set.",
    success: "Listing has been updated successfully.",
    selectBrand: "Brand",
    selectFuel: "Fuel",
    selectTransmission: "Transmission",
    selectBodyType: "Body type",
    selectColor: "Color",
    selectDriveType: "Drive",
    selectEuroNorm: "Euro norm",
  },
  uk: {
    title: "Редагувати оголошення",
    subtitle: "Змініть дані авто, фотографії, контакт і статус оголошення.",
    basicTitle: "Основні дані",
    basicDescription: "Головна інформація, за якою люди знайдуть авто.",
    brand: "Марка",
    model: "Модель",
    productionYear: "Рік випуску",
    mileageKm: "Пробіг км",
    priceCzk: "Ціна CZK",
    city: "Місто",
    technicalTitle: "Технічні дані",
    technicalDescription: "Двигун, коробка, кузов та інші параметри.",
    fuel: "Паливо",
    transmission: "Коробка",
    bodyType: "Кузов",
    color: "Колір",
    powerKw: "Потужність kW",
    engineVolume: "Обʼєм двигуна л, напр. 2.0",
    driveType: "Привід",
    documentsTitle: "Стан і документи",
    documentsDescription: "Статус оголошення, VIN, STK та інші дані.",
    ownerCount: "Кількість власників",
    euroNorm: "Євро норма",
    stkUntil: "STK до",
    contactTitle: "Контакт продавця",
    contactDescription: "Ці дані будуть показані в оголошенні.",
    sellerName: "Імʼя продавця",
    phone: "Телефон",
    email: "E-mail",
    photosTitle: "Фотографії",
    photosDescription:
      "Можна встановити головне фото, видалити старі фото або додати нові.",
    noPhotos: "Поки немає завантажених фото.",
    carPhotoAlt: "Фото авто",
    setMainPhoto: "Зробити головним",
    deletePhoto: "Видалити фото",
    addNewPhotos: "Додати нові фото",
    selectedNewPhotos: "Вибрано нових фото",
    descriptionTitle: "Опис авто",
    descriptionPlaceholder: "Опис авто, сервісна історія, комплектація, стан...",
    saving: "Збереження...",
    save: "Зберегти зміни",
    notFound: "Оголошення не знайдено або у вас немає доступу до нього.",
    deletePhotoConfirm: "Ви дійсно хочете видалити це фото?",
    mainPhotoSet: "Головне фото встановлено.",
    success: "Оголошення успішно оновлено.",
    selectBrand: "Марка",
    selectFuel: "Паливо",
    selectTransmission: "Коробка",
    selectBodyType: "Кузов",
    selectColor: "Колір",
    selectDriveType: "Привід",
    selectEuroNorm: "Євро норма",
  },
  ru: {
    title: "Редактировать объявление",
    subtitle: "Измените данные авто, фотографии, контакт и статус объявления.",
    basicTitle: "Основные данные",
    basicDescription: "Главная информация, по которой люди найдут авто.",
    brand: "Марка",
    model: "Модель",
    productionYear: "Год выпуска",
    mileageKm: "Пробег км",
    priceCzk: "Цена CZK",
    city: "Город",
    technicalTitle: "Технические данные",
    technicalDescription: "Двигатель, коробка, кузов и другие параметры.",
    fuel: "Топливо",
    transmission: "Коробка",
    bodyType: "Кузов",
    color: "Цвет",
    powerKw: "Мощность kW",
    engineVolume: "Объём двигателя л, напр. 2.0",
    driveType: "Привод",
    documentsTitle: "Состояние и документы",
    documentsDescription: "Статус объявления, VIN, STK и другие данные.",
    ownerCount: "Количество владельцев",
    euroNorm: "Евро норма",
    stkUntil: "STK до",
    contactTitle: "Контакт продавца",
    contactDescription: "Эти данные будут показаны в объявлении.",
    sellerName: "Имя продавца",
    phone: "Телефон",
    email: "E-mail",
    photosTitle: "Фотографии",
    photosDescription:
      "Можно установить главное фото, удалить старые фото или добавить новые.",
    noPhotos: "Пока нет загруженных фотографий.",
    carPhotoAlt: "Фото авто",
    setMainPhoto: "Сделать главным",
    deletePhoto: "Удалить фото",
    addNewPhotos: "Добавить новые фото",
    selectedNewPhotos: "Выбрано новых фото",
    descriptionTitle: "Описание авто",
    descriptionPlaceholder: "Описание авто, сервисная история, комплектация, состояние...",
    saving: "Сохранение...",
    save: "Сохранить изменения",
    notFound: "Объявление не найдено или у вас нет доступа к нему.",
    deletePhotoConfirm: "Вы действительно хотите удалить это фото?",
    mainPhotoSet: "Главное фото установлено.",
    success: "Объявление успешно обновлено.",
    selectBrand: "Марка",
    selectFuel: "Топливо",
    selectTransmission: "Коробка",
    selectBodyType: "Кузов",
    selectColor: "Цвет",
    selectDriveType: "Привод",
    selectEuroNorm: "Евро норма",
  },
};

const valueTranslations = {
  brand: {
    Jiné: { cs: "Jiné", en: "Other", uk: "Інше", ru: "Другое" },
  },
  fuel: {
    Benzín: { cs: "Benzín", en: "Petrol", uk: "Бензин", ru: "Бензин" },
    Nafta: { cs: "Nafta", en: "Diesel", uk: "Дизель", ru: "Дизель" },
    Hybrid: { cs: "Hybrid", en: "Hybrid", uk: "Гібрид", ru: "Гибрид" },
    "Plug-in hybrid": {
      cs: "Plug-in hybrid",
      en: "Plug-in hybrid",
      uk: "Plug-in гібрид",
      ru: "Plug-in гибрид",
    },
    Elektro: { cs: "Elektro", en: "Electric", uk: "Електро", ru: "Электро" },
    LPG: { cs: "LPG", en: "LPG", uk: "LPG", ru: "LPG" },
    CNG: { cs: "CNG", en: "CNG", uk: "CNG", ru: "CNG" },
  },
  transmission: {
    Manuální: { cs: "Manuální", en: "Manual", uk: "Механіка", ru: "Механика" },
    Automatická: {
      cs: "Automatická",
      en: "Automatic",
      uk: "Автомат",
      ru: "Автомат",
    },
    DSG: { cs: "DSG", en: "DSG", uk: "DSG", ru: "DSG" },
    CVT: { cs: "CVT", en: "CVT", uk: "CVT", ru: "CVT" },
  },
  bodyType: {
    Sedan: { cs: "Sedan", en: "Sedan", uk: "Седан", ru: "Седан" },
    Combi: { cs: "Combi", en: "Estate", uk: "Універсал", ru: "Универсал" },
    Hatchback: {
      cs: "Hatchback",
      en: "Hatchback",
      uk: "Хетчбек",
      ru: "Хэтчбек",
    },
    SUV: { cs: "SUV", en: "SUV", uk: "SUV", ru: "SUV" },
    Kupé: { cs: "Kupé", en: "Coupe", uk: "Купе", ru: "Купе" },
    Kabriolet: {
      cs: "Kabriolet",
      en: "Convertible",
      uk: "Кабріолет",
      ru: "Кабриолет",
    },
    MPV: { cs: "MPV", en: "MPV", uk: "MPV", ru: "MPV" },
    Pickup: { cs: "Pickup", en: "Pickup", uk: "Пікап", ru: "Пикап" },
    Dodávka: { cs: "Dodávka", en: "Van", uk: "Фургон", ru: "Фургон" },
  },
  color: {
    Bílá: { cs: "Bílá", en: "White", uk: "Білий", ru: "Белый" },
    Černá: { cs: "Černá", en: "Black", uk: "Чорний", ru: "Чёрный" },
    Šedá: { cs: "Šedá", en: "Grey", uk: "Сірий", ru: "Серый" },
    Stříbrná: {
      cs: "Stříbrná",
      en: "Silver",
      uk: "Срібний",
      ru: "Серебристый",
    },
    Modrá: { cs: "Modrá", en: "Blue", uk: "Синій", ru: "Синий" },
    Červená: { cs: "Červená", en: "Red", uk: "Червоний", ru: "Красный" },
    Zelená: { cs: "Zelená", en: "Green", uk: "Зелений", ru: "Зелёный" },
    Hnědá: { cs: "Hnědá", en: "Brown", uk: "Коричневий", ru: "Коричневый" },
    Béžová: { cs: "Béžová", en: "Beige", uk: "Бежевий", ru: "Бежевый" },
    Žlutá: { cs: "Žlutá", en: "Yellow", uk: "Жовтий", ru: "Жёлтый" },
    Oranžová: {
      cs: "Oranžová",
      en: "Orange",
      uk: "Помаранчевий",
      ru: "Оранжевый",
    },
    Zlatá: { cs: "Zlatá", en: "Gold", uk: "Золотий", ru: "Золотой" },
    Fialová: { cs: "Fialová", en: "Purple", uk: "Фіолетовий", ru: "Фиолетовый" },
    Jiná: { cs: "Jiná", en: "Other", uk: "Інший", ru: "Другой" },
  },
  status: {
    Aktivní: { cs: "Aktivní", en: "Active", uk: "Активне", ru: "Активно" },
    Rezervováno: {
      cs: "Rezervováno",
      en: "Reserved",
      uk: "Зарезервовано",
      ru: "Зарезервировано",
    },
    Prodáno: { cs: "Prodáno", en: "Sold", uk: "Продано", ru: "Продано" },
  },
  driveType: {
    "Přední náhon": {
      cs: "Přední náhon",
      en: "Front-wheel drive",
      uk: "Передній привід",
      ru: "Передний привод",
    },
    "Zadní náhon": {
      cs: "Zadní náhon",
      en: "Rear-wheel drive",
      uk: "Задній привід",
      ru: "Задний привод",
    },
    "4x4 / AWD": { cs: "4x4 / AWD", en: "4x4 / AWD", uk: "4x4 / AWD", ru: "4x4 / AWD" },
  },
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

function isLanguageCode(value: string | null): value is LanguageCode {
  return value === "cs" || value === "en" || value === "uk" || value === "ru";
}

function translateOption(
  group: keyof typeof valueTranslations,
  value: string,
  language: LanguageCode,
) {
  const translation = valueTranslations[group][
    value as keyof (typeof valueTranslations)[typeof group]
  ] as Record<LanguageCode, string> | undefined;

  return translation?.[language] || value;
}

function createSlug(brand: string, model: string, year: string) {
  return `${brand}-${model}-${year}`
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
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

const inputClass = "rounded-xl border px-4 py-3";
const selectClass = "rounded-xl border px-4 py-3";

export default function EditCarPage({ params }: { params: { id: string } }) {
  const [language, setLanguage] = useState<LanguageCode>("cs");
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
  const [images, setImages] = useState<CarImage[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const t = translations[language];

  useEffect(() => {
    const savedLanguage = localStorage.getItem("site-language");

    if (isLanguageCode(savedLanguage)) {
      setLanguage(savedLanguage);
    }

    function handleLanguageChange(event: Event) {
      const customEvent = event as CustomEvent<LanguageCode>;

      if (isLanguageCode(customEvent.detail)) {
        setLanguage(customEvent.detail);
      }
    }

    window.addEventListener("languagechange", handleLanguageChange);

    return () => {
      window.removeEventListener("languagechange", handleLanguageChange);
    };
  }, []);

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
      setMessage(t.notFound);
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
    setBodyType(car.body_type || "");
    setColor(car.color || "");
    setStatus(car.status || "Aktivní");
    setVin(car.vin || "");
    setDriveType(car.drive_type || "");
    setOwnerCount(String(car.owner_count || ""));
    setEuroNorm(car.euro_norm || "");
    setStkUntil(car.stk_until || "");
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
    const confirmDelete = window.confirm(t.deletePhotoConfirm);

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

    setMessage(t.mainPhotoSet);
  }

  async function uploadNewImages() {
    if (newFiles.length === 0) return true;

    let firstUploadedImageUrl: string | null = null;

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
        return false;
      }

      const { data: publicUrlData } = supabase.storage
        .from("cars")
        .getPublicUrl(fileName);

      const imageUrl = publicUrlData.publicUrl;

      if (!firstUploadedImageUrl) {
        firstUploadedImageUrl = imageUrl;
      }

      const { error: imageError } = await supabase.from("car_images").insert({
        car_id: Number(params.id),
        image_url: imageUrl,
      });

      if (imageError) {
        setMessage(imageError.message);
        return false;
      }
    }

    if (images.length === 0 && firstUploadedImageUrl) {
      await supabase
        .from("cars")
        .update({ image_url: firstUploadedImageUrl })
        .eq("id", params.id);
    }

    setNewFiles([]);
    await loadCar();

    return true;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      window.location.href = "/login";
      return;
    }

    const imagesUploaded = await uploadNewImages();

    if (!imagesUploaded) {
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("cars")
      .update({
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

    setMessage(t.success);
    window.location.href = "/dashboard";
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl font-bold sm:text-4xl">{t.title}</h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            {t.subtitle}
          </p>
        </div>

        {message && (
          <p className="mb-5 rounded-2xl bg-white p-4 text-gray-700 shadow-sm">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="grid gap-5">
          <FormSection title={t.basicTitle} description={t.basicDescription}>
            <div className="grid gap-4 md:grid-cols-2">
              <select
                className={selectClass}
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                <option value="">{t.selectBrand}</option>
                {carBrands.map((item) => (
                  <option key={item} value={item}>
                    {translateOption("brand", item, language)}
                  </option>
                ))}
              </select>

              <input
                className={inputClass}
                placeholder={t.model}
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />

              <select
                className={selectClass}
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="">{t.productionYear}</option>
                {years.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <input
                className={inputClass}
                placeholder={t.mileageKm}
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
              />

              <input
                className={inputClass}
                placeholder={t.priceCzk}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <input
                className={inputClass}
                placeholder={t.city}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </FormSection>

          <FormSection
            title={t.technicalTitle}
            description={t.technicalDescription}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <select
                className={selectClass}
                value={fuel}
                onChange={(e) => setFuel(e.target.value)}
              >
                <option value="">{t.selectFuel}</option>
                {fuels.map((item) => (
                  <option key={item} value={item}>
                    {translateOption("fuel", item, language)}
                  </option>
                ))}
              </select>

              <select
                className={selectClass}
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
              >
                <option value="">{t.selectTransmission}</option>
                {transmissions.map((item) => (
                  <option key={item} value={item}>
                    {translateOption("transmission", item, language)}
                  </option>
                ))}
              </select>

              <select
                className={selectClass}
                value={bodyType}
                onChange={(e) => setBodyType(e.target.value)}
              >
                <option value="">{t.selectBodyType}</option>
                {bodyTypes.map((item) => (
                  <option key={item} value={item}>
                    {translateOption("bodyType", item, language)}
                  </option>
                ))}
              </select>

              <select
                className={selectClass}
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
                <option value="">{t.selectColor}</option>
                {colors.map((item) => (
                  <option key={item} value={item}>
                    {translateOption("color", item, language)}
                  </option>
                ))}
              </select>

              <input
                className={inputClass}
                placeholder={t.powerKw}
                value={power}
                onChange={(e) => setPower(e.target.value)}
              />

              <input
                className={inputClass}
                placeholder={t.engineVolume}
                value={engineVolume}
                onChange={(e) => setEngineVolume(e.target.value)}
              />

              <select
                className="rounded-xl border px-4 py-3 md:col-span-2"
                value={driveType}
                onChange={(e) => setDriveType(e.target.value)}
              >
                <option value="">{t.selectDriveType}</option>
                {driveTypes.map((item) => (
                  <option key={item} value={item}>
                    {translateOption("driveType", item, language)}
                  </option>
                ))}
              </select>
            </div>
          </FormSection>

          <FormSection
            title={t.documentsTitle}
            description={t.documentsDescription}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <select
                className={selectClass}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {statuses.map((item) => (
                  <option key={item} value={item}>
                    {translateOption("status", item, language)}
                  </option>
                ))}
              </select>

              <input
                className={inputClass}
                placeholder="VIN"
                value={vin}
                maxLength={17}
                onChange={(e) => setVin(normalizeVin(e.target.value))}
              />

              <input
                className={inputClass}
                placeholder={t.ownerCount}
                value={ownerCount}
                onChange={(e) => setOwnerCount(e.target.value)}
              />

              <select
                className={selectClass}
                value={euroNorm}
                onChange={(e) => setEuroNorm(e.target.value)}
              >
                <option value="">{t.selectEuroNorm}</option>
                {euroNorms.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-600">
                  {t.stkUntil}
                </label>

                <input
                  type="date"
                  className="w-full rounded-xl border px-4 py-3"
                  value={stkUntil}
                  onChange={(e) => setStkUntil(e.target.value)}
                />
              </div>
            </div>
          </FormSection>

          <FormSection title={t.contactTitle} description={t.contactDescription}>
            <div className="grid gap-4 md:grid-cols-3">
              <input
                className={inputClass}
                placeholder={t.sellerName}
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
              />

              <input
                className={inputClass}
                placeholder={t.phone}
                value={sellerPhone}
                onChange={(e) => setSellerPhone(e.target.value)}
              />

              <input
                className={inputClass}
                placeholder={t.email}
                value={sellerEmail}
                onChange={(e) => setSellerEmail(e.target.value)}
              />
            </div>
          </FormSection>

          <FormSection title={t.photosTitle} description={t.photosDescription}>
            {images.length === 0 ? (
              <div className="rounded-xl border bg-gray-50 p-4 text-gray-500">
                {t.noPhotos}
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="overflow-hidden rounded-xl bg-white shadow"
                  >
                    <img
                      src={image.image_url}
                      alt={t.carPhotoAlt}
                      className="h-40 w-full object-cover"
                    />

                    <div className="grid gap-2 p-3">
                      <button
                        type="button"
                        onClick={() => setMainImage(image.image_url)}
                        className="rounded-lg border px-3 py-2 text-sm font-semibold hover:bg-gray-100"
                      >
                        {t.setMainPhoto}
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteImage(image.id, image.image_url)}
                        className="rounded-lg border border-red-300 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                      >
                        {t.deletePhoto}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-5 rounded-xl border bg-gray-50 p-4">
              <label className="block font-semibold">{t.addNewPhotos}</label>

              <input
                type="file"
                accept="image/*"
                multiple
                className="mt-3 w-full"
                onChange={(e) => setNewFiles(Array.from(e.target.files || []))}
              />

              {newFiles.length > 0 && (
                <p className="mt-3 text-sm text-gray-500">
                  {t.selectedNewPhotos}: {newFiles.length}
                </p>
              )}
            </div>
          </FormSection>

          <FormSection title={t.descriptionTitle}>
            <textarea
              className="min-h-40 w-full rounded-xl border px-4 py-3"
              placeholder={t.descriptionPlaceholder}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormSection>

          <button
            disabled={loading}
            className="rounded-2xl bg-orange-600 py-4 text-lg font-semibold text-white shadow hover:bg-orange-700 disabled:bg-gray-400"
          >
            {loading ? t.saving : t.save}
          </button>
        </form>
      </div>
    </main>
  );
}
