"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CarGallery from "./CarGallery";
import FavoriteButton from "./FavoriteButton";
import ShareButtons from "./ShareButtons";

type LanguageCode = "cs" | "en" | "uk" | "ru";

export type CarDetailCar = {
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
  power: number | null;
  city: string | null;
  image_url: string | null;
  is_featured: boolean | null;
  is_verified_by_ateam: boolean | null;
  vin: string | null;
  status: string | null;
  body_type: string | null;
  color: string | null;
  drive_type: string | null;
  euro_norm: string | null;
  views: number | null;
  owner_count: number | null;
  stk_until: string | null;
  description: string | null;
  seller_name: string | null;
  seller_phone: string | null;
  seller_email: string | null;
};

export type SimilarCar = {
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
  status: string | null;
  body_type: string | null;
  views: number | null;
};

const translations = {
  cs: {
    back: "← Zpět na nabídku",
    topOffer: "TOP nabídka",
    verifiedBadge: "✓ Ověřeno ATEAM SERVICE",
    views: "zobrazení",
    priceNegotiable: "Cena dohodou",
    unknown: "Neuvedeno",
    year: "Rok",
    mileage: "Najeto",
    fuel: "Palivo",
    transmission: "Převodovka",
    callSeller: "Zavolat prodejci",
    historyCheck: "Kontrola historie",
    vinVerification: "Ověření podle VIN",
    vinText:
      "Rychlé otevření kontroly přes carVertical nebo Cebia. VIN se na stránce kontroly automaticky předvyplní.",
    vinMissing: "VIN není u tohoto inzerátu uveden.",
    checkVin: "Prověřit VIN",
    statsViews: "Zobrazení",
    favorites: "Oblíbené",
    technicalData: "Technické údaje",
    productionYear: "Rok výroby",
    bodyType: "Karoserie",
    color: "Barva",
    engineVolume: "Objem motoru",
    power: "Výkon",
    drive: "Pohon",
    ownerCount: "Počet majitelů",
    euroNorm: "Euro norma",
    stkUntil: "STK do",
    city: "Město",
    description: "Popis vozidla",
    noDescription: "Popis vozidla není k dispozici.",
    sellerContact: "Kontakt na prodejce",
    name: "Jméno",
    phone: "Telefon",
    noContact: "Kontaktní údaje nejsou k dispozici.",
    similarCars: "Podobná vozidla",
    detail: "Detail",
    carPhoto: "🚗 Foto vozidla",
    fuelUnknown: "Palivo neuvedeno",
  },
  en: {
    back: "← Back to listings",
    topOffer: "TOP offer",
    verifiedBadge: "✓ Verified by ATEAM SERVICE",
    views: "views",
    priceNegotiable: "Price negotiable",
    unknown: "Not specified",
    year: "Year",
    mileage: "Mileage",
    fuel: "Fuel",
    transmission: "Transmission",
    callSeller: "Call seller",
    historyCheck: "History check",
    vinVerification: "VIN verification",
    vinText:
      "Quickly open a history check through carVertical or Cebia. The VIN will be automatically prefilled on the check page.",
    vinMissing: "VIN is not listed for this advert.",
    checkVin: "Check VIN",
    statsViews: "Views",
    favorites: "Favorites",
    technicalData: "Technical data",
    productionYear: "Year of manufacture",
    bodyType: "Body type",
    color: "Color",
    engineVolume: "Engine volume",
    power: "Power",
    drive: "Drive",
    ownerCount: "Number of owners",
    euroNorm: "Euro norm",
    stkUntil: "Inspection valid until",
    city: "City",
    description: "Vehicle description",
    noDescription: "Vehicle description is not available.",
    sellerContact: "Seller contact",
    name: "Name",
    phone: "Phone",
    noContact: "Contact details are not available.",
    similarCars: "Similar cars",
    detail: "Details",
    carPhoto: "🚗 Vehicle photo",
    fuelUnknown: "Fuel not specified",
  },
  uk: {
    back: "← Назад до каталогу",
    topOffer: "TOP пропозиція",
    verifiedBadge: "✓ Перевірено ATEAM SERVICE",
    views: "переглядів",
    priceNegotiable: "Ціна договірна",
    unknown: "Не вказано",
    year: "Рік",
    mileage: "Пробіг",
    fuel: "Паливо",
    transmission: "Коробка",
    callSeller: "Подзвонити продавцю",
    historyCheck: "Перевірка історії",
    vinVerification: "Перевірка за VIN",
    vinText:
      "Швидке відкриття перевірки історії через carVertical або Cebia. VIN автоматично підставиться на сторінці перевірки.",
    vinMissing: "VIN у цьому оголошенні не вказано.",
    checkVin: "Перевірити VIN",
    statsViews: "Перегляди",
    favorites: "Обране",
    technicalData: "Технічні дані",
    productionYear: "Рік випуску",
    bodyType: "Кузов",
    color: "Колір",
    engineVolume: "Обʼєм двигуна",
    power: "Потужність",
    drive: "Привід",
    ownerCount: "Кількість власників",
    euroNorm: "Євро норма",
    stkUntil: "STK до",
    city: "Місто",
    description: "Опис авто",
    noDescription: "Опис авто недоступний.",
    sellerContact: "Контакт продавця",
    name: "Імʼя",
    phone: "Телефон",
    noContact: "Контактні дані недоступні.",
    similarCars: "Схожі авто",
    detail: "Деталі",
    carPhoto: "🚗 Фото авто",
    fuelUnknown: "Паливо не вказано",
  },
  ru: {
    back: "← Назад в каталог",
    topOffer: "TOP предложение",
    verifiedBadge: "✓ Проверено ATEAM SERVICE",
    views: "просмотров",
    priceNegotiable: "Цена договорная",
    unknown: "Не указано",
    year: "Год",
    mileage: "Пробег",
    fuel: "Топливо",
    transmission: "Коробка",
    callSeller: "Позвонить продавцу",
    historyCheck: "Проверка истории",
    vinVerification: "Проверка по VIN",
    vinText:
      "Быстрое открытие проверки истории через carVertical или Cebia. VIN автоматически подставится на странице проверки.",
    vinMissing: "VIN в этом объявлении не указан.",
    checkVin: "Проверить VIN",
    statsViews: "Просмотры",
    favorites: "Избранное",
    technicalData: "Технические данные",
    productionYear: "Год выпуска",
    bodyType: "Кузов",
    color: "Цвет",
    engineVolume: "Объём двигателя",
    power: "Мощность",
    drive: "Привод",
    ownerCount: "Количество владельцев",
    euroNorm: "Евро норма",
    stkUntil: "STK до",
    city: "Город",
    description: "Описание авто",
    noDescription: "Описание авто недоступно.",
    sellerContact: "Контакт продавца",
    name: "Имя",
    phone: "Телефон",
    noContact: "Контактные данные недоступны.",
    similarCars: "Похожие авто",
    detail: "Подробнее",
    carPhoto: "🚗 Фото авто",
    fuelUnknown: "Топливо не указано",
  },
};

const valueTranslations = {
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

function isLanguageCode(value: string | null): value is LanguageCode {
  return value === "cs" || value === "en" || value === "uk" || value === "ru";
}

function getLocale(language: LanguageCode) {
  if (language === "en") return "en-US";
  if (language === "uk") return "uk-UA";
  if (language === "ru") return "ru-RU";
  return "cs-CZ";
}

function translateOption(
  group: keyof typeof valueTranslations,
  value: string | null,
  language: LanguageCode,
) {
  if (!value) return translations[language].unknown;

  const translation = valueTranslations[group][
    value as keyof (typeof valueTranslations)[typeof group]
  ] as Record<LanguageCode, string> | undefined;

  return translation?.[language] || value;
}

function getStatusClass(status: string | null) {
  if (status === "Prodáno") {
    return "bg-red-100 text-red-700 border-red-200";
  }

  if (status === "Rezervováno") {
    return "bg-yellow-100 text-yellow-800 border-yellow-200";
  }

  return "bg-green-100 text-green-700 border-green-200";
}

function formatDate(date: string | null, language: LanguageCode) {
  if (!date) return translations[language].unknown;

  return new Date(date).toLocaleDateString(getLocale(language), {
    month: "2-digit",
    year: "numeric",
  });
}

function formatPrice(price: number | null, language: LanguageCode) {
  if (!price) return translations[language].priceNegotiable;
  return `${price.toLocaleString(getLocale(language))} Kč`;
}

function formatMileage(mileage: number | null, language: LanguageCode) {
  if (!mileage) return translations[language].unknown;
  return `${mileage.toLocaleString(getLocale(language))} km`;
}

function formatEngineVolume(engineVolume: number | null, language: LanguageCode) {
  if (!engineVolume) return translations[language].unknown;
  return `${engineVolume} l`;
}

function getVinCheckHref(vin: string | null) {
  return vin ? `/vin-check?vin=${encodeURIComponent(vin)}` : "/vin-check";
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string | number | null;
}) {
  return (
    <div className="min-w-0 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
      <p className="text-xs font-medium text-gray-500 sm:text-sm">{label}</p>
      <p className="mt-1 whitespace-normal break-normal text-sm font-bold text-gray-900 sm:text-base">
        {value}
      </p>
    </div>
  );
}

function SmallBadge({
  children,
  className = "bg-gray-100 text-gray-700",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${className}`}
    >
      {children}
    </span>
  );
}

export default function CarDetailClient({
  car,
  galleryImages,
  favoriteCount,
  similarCars,
}: {
  car: CarDetailCar;
  galleryImages: string[];
  favoriteCount: number;
  similarCars: SimilarCar[];
}) {
  const [language, setLanguage] = useState<LanguageCode>("cs");

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

  const t = translations[language];
  const views = (car.views || 0) + 1;
  const status = car.status || "Aktivní";
  const vinCheckHref = getVinCheckHref(car.vin || null);
  const sellerPhoneDigits = car.seller_phone
    ? car.seller_phone.replace(/\D/g, "")
    : "";

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
        <Link
          href="/cars"
          className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-bold text-gray-700 shadow-sm ring-1 ring-gray-200 transition hover:text-orange-600 sm:text-base"
        >
          {t.back}
        </Link>

        <div className="mt-5 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <CarGallery
            images={galleryImages}
            title={`${car.brand || "Auto"} ${car.model || ""}`}
          />

          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-gray-200 sm:p-8">
            <div className="mb-4 flex flex-wrap gap-2 sm:gap-3">
              <span
                className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-bold sm:px-4 sm:py-2 sm:text-sm ${getStatusClass(
                  status,
                )}`}
              >
                {translateOption("status", status, language)}
              </span>

              {car.city && (
                <span className="inline-flex rounded-full border border-gray-200 bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-700 sm:px-4 sm:py-2 sm:text-sm">
                  📍 {car.city}
                </span>
              )}

              {car.is_featured && (
                <span className="inline-flex rounded-full border border-yellow-300 bg-yellow-100 px-3 py-1.5 text-xs font-bold text-yellow-800 sm:px-4 sm:py-2 sm:text-sm">
                  {t.topOffer}
                </span>
              )}

              {car.is_verified_by_ateam && (
                <span className="inline-flex rounded-full border border-green-300 bg-green-100 px-3 py-1.5 text-xs font-black text-green-800 sm:px-4 sm:py-2 sm:text-sm">
                  {t.verifiedBadge}
                </span>
              )}
            </div>

            <h1 className="text-3xl font-black leading-tight text-gray-900 sm:text-5xl">
              {car.brand} {car.model}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-medium text-gray-500 sm:gap-4 sm:text-sm">
              <span>
                👁 {views.toLocaleString(getLocale(language))} {t.views}
              </span>
              <span>ID: {car.id}</span>
              {car.vin && <span className="break-all">VIN: {car.vin}</span>}
            </div>

            <div className="mt-5 text-3xl font-black text-orange-600 sm:text-5xl">
              {formatPrice(car.price || null, language)}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <InfoItem label={t.year} value={car.year || t.unknown} />
              <InfoItem
                label={t.mileage}
                value={formatMileage(car.mileage, language)}
              />
              <InfoItem
                label={t.fuel}
                value={translateOption("fuel", car.fuel, language)}
              />
              <InfoItem
                label={t.transmission}
                value={translateOption(
                  "transmission",
                  car.transmission,
                  language,
                )}
              />
            </div>

            {(car.seller_phone || sellerPhoneDigits) && (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {car.seller_phone && (
                  <a
                    href={`tel:${car.seller_phone}`}
                    className="block rounded-2xl bg-gray-900 px-5 py-4 text-center font-black text-white transition hover:bg-gray-800"
                  >
                    {t.callSeller}
                  </a>
                )}

                {sellerPhoneDigits && (
                  <a
                    href={`https://wa.me/${sellerPhoneDigits}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-2xl bg-green-600 px-5 py-4 text-center font-black text-white transition hover:bg-green-700"
                  >
                    WhatsApp
                  </a>
                )}
              </div>
            )}

            <div className="mt-5">
              <FavoriteButton carId={car.id} />
            </div>

            <div className="mt-4">
              <ShareButtons
                title={`${car.brand} ${car.model} ${car.year || ""}`}
              />
            </div>

            <div className="mt-5 rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-5 shadow-sm sm:mt-6 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-600">
                    {t.historyCheck}
                  </p>

                  <h2 className="mt-2 text-2xl font-black text-gray-900">
                    {t.vinVerification}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {t.vinText}
                  </p>

                  <p className="mt-3 text-sm font-bold text-gray-900">
                    {car.vin ? (
                      <span className="break-all">VIN: {car.vin}</span>
                    ) : (
                      t.vinMissing
                    )}
                  </p>
                </div>

                <Link
                  href={vinCheckHref}
                  className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-orange-600 px-6 py-4 text-center text-sm font-black text-white shadow-sm transition hover:bg-orange-700"
                >
                  {t.checkVin}
                </Link>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 rounded-3xl border border-gray-200 bg-gray-50 p-4 sm:mt-6 sm:gap-4 sm:p-5">
              <div>
                <p className="text-xs text-gray-500 sm:text-sm">
                  {t.statsViews}
                </p>
                <p className="mt-1 text-lg font-black text-gray-900 sm:text-2xl">
                  👁 {views.toLocaleString(getLocale(language))}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 sm:text-sm">
                  {t.favorites}
                </p>
                <p className="mt-1 text-lg font-black text-gray-900 sm:text-2xl">
                  ❤️ {favoriteCount || 0}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 sm:text-sm">ID</p>
                <p className="mt-1 text-lg font-black text-gray-900 sm:text-2xl">
                  #{car.id}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-gray-200 bg-gray-50 p-4 sm:mt-8 sm:p-6">
              <h2 className="mb-4 text-xl font-black text-gray-900 sm:mb-5 sm:text-2xl">
                {t.technicalData}
              </h2>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <InfoItem label={t.productionYear} value={car.year || t.unknown} />
                <InfoItem
                  label={t.mileage}
                  value={formatMileage(car.mileage, language)}
                />
                <InfoItem
                  label={t.bodyType}
                  value={translateOption("bodyType", car.body_type, language)}
                />
                <InfoItem
                  label={t.color}
                  value={translateOption("color", car.color, language)}
                />
                <InfoItem
                  label={t.engineVolume}
                  value={formatEngineVolume(car.engine_volume, language)}
                />
                <InfoItem
                  label={t.fuel}
                  value={translateOption("fuel", car.fuel, language)}
                />
                <InfoItem
                  label={t.transmission}
                  value={translateOption(
                    "transmission",
                    car.transmission,
                    language,
                  )}
                />
                <InfoItem
                  label={t.power}
                  value={car.power ? `${car.power} kW` : t.unknown}
                />
                <InfoItem
                  label={t.drive}
                  value={translateOption("driveType", car.drive_type, language)}
                />
                <InfoItem
                  label={t.ownerCount}
                  value={car.owner_count || t.unknown}
                />
                <InfoItem
                  label={t.euroNorm}
                  value={car.euro_norm || t.unknown}
                />
                <InfoItem
                  label={t.stkUntil}
                  value={formatDate(car.stk_until || null, language)}
                />
                <InfoItem label={t.city} value={car.city || t.unknown} />
                <InfoItem label="VIN" value={car.vin || t.unknown} />
              </div>
            </div>

            <div className="mt-6 rounded-3xl bg-white sm:mt-10">
              <h2 className="mb-3 text-xl font-black text-gray-900">
                {t.description}
              </h2>

              <p className="whitespace-pre-line rounded-3xl border border-gray-200 bg-gray-50 p-5 text-sm leading-7 text-gray-700 sm:text-base">
                {car.description || t.noDescription}
              </p>
            </div>

            <div className="mt-6 rounded-3xl border border-gray-200 bg-gray-50 p-4 sm:mt-10 sm:p-6">
              <h2 className="mb-4 text-xl font-black text-gray-900 sm:text-2xl">
                {t.sellerContact}
              </h2>

              <div className="space-y-4">
                {car.seller_name && (
                  <div>
                    <p className="text-xs text-gray-500 sm:text-sm">{t.name}</p>
                    <p className="font-bold text-gray-900">{car.seller_name}</p>
                  </div>
                )}

                {car.seller_phone && (
                  <div>
                    <p className="text-xs text-gray-500 sm:text-sm">
                      {t.phone}
                    </p>
                    <a
                      href={`tel:${car.seller_phone}`}
                      className="text-lg font-black text-orange-600 hover:underline"
                    >
                      {car.seller_phone}
                    </a>
                  </div>
                )}

                {car.seller_email && (
                  <div>
                    <p className="text-xs text-gray-500 sm:text-sm">E-mail</p>
                    <a
                      href={`mailto:${car.seller_email}`}
                      className="break-all font-bold text-orange-600 hover:underline"
                    >
                      {car.seller_email}
                    </a>
                  </div>
                )}
              </div>

              {(car.seller_phone || sellerPhoneDigits) && (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {car.seller_phone && (
                    <a
                      href={`tel:${car.seller_phone}`}
                      className="block rounded-2xl bg-gray-900 px-5 py-4 text-center font-black text-white transition hover:bg-gray-800"
                    >
                      {t.callSeller}
                    </a>
                  )}

                  {sellerPhoneDigits && (
                    <a
                      href={`https://wa.me/${sellerPhoneDigits}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-2xl bg-green-600 px-5 py-4 text-center font-black text-white transition hover:bg-green-700"
                    >
                      WhatsApp
                    </a>
                  )}
                </div>
              )}

              {!car.seller_name && !car.seller_phone && !car.seller_email && (
                <p className="text-gray-500">{t.noContact}</p>
              )}
            </div>
          </div>
        </div>

        {similarCars.length > 0 && (
          <section className="mt-10 sm:mt-12">
            <h2 className="text-2xl font-black text-gray-900 sm:text-3xl">
              {t.similarCars}
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {similarCars.map((similarCar) => (
                <div
                  key={similarCar.id}
                  className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-200"
                >
                  <div className="relative">
                    {similarCar.is_featured && (
                      <div className="absolute left-3 top-3 z-10 rounded-full bg-yellow-400 px-3 py-1 text-xs font-black text-black shadow sm:text-sm">
                        TOP
                      </div>
                    )}

                    {similarCar.image_url ? (
                      <img
                        src={similarCar.image_url}
                        alt={`${similarCar.brand || "Auto"} ${
                          similarCar.model || ""
                        }`}
                        className="h-48 w-full object-cover sm:h-56"
                      />
                    ) : (
                      <div className="flex h-48 items-center justify-center bg-gray-200 sm:h-56">
                        {t.carPhoto}
                      </div>
                    )}
                  </div>

                  <div className="p-4 sm:p-5">
                    <div className="mb-2 flex flex-wrap gap-2">
                      {similarCar.is_verified_by_ateam && (
                        <SmallBadge className="bg-green-100 text-green-800">
                          {t.verifiedBadge}
                        </SmallBadge>
                      )}

                      {similarCar.status && (
                        <SmallBadge>
                          {translateOption(
                            "status",
                            similarCar.status,
                            language,
                          )}
                        </SmallBadge>
                      )}

                      {similarCar.city && (
                        <SmallBadge>📍 {similarCar.city}</SmallBadge>
                      )}

                      {similarCar.body_type && (
                        <SmallBadge>
                          {translateOption(
                            "bodyType",
                            similarCar.body_type,
                            language,
                          )}
                        </SmallBadge>
                      )}

                      <SmallBadge>
                        👁{" "}
                        {(similarCar.views || 0).toLocaleString(
                          getLocale(language),
                        )}
                      </SmallBadge>
                    </div>

                    <h3 className="text-lg font-black text-gray-900 sm:text-xl">
                      {similarCar.brand} {similarCar.model}
                    </h3>

                    <p className="mt-2 text-sm text-gray-600 sm:text-base">
                      {similarCar.year || t.unknown}
                      {similarCar.engine_volume
                        ? ` • ${similarCar.engine_volume} l`
                        : ""}
                      {similarCar.mileage
                        ? ` • ${formatMileage(similarCar.mileage, language)}`
                        : ""}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {similarCar.fuel
                        ? translateOption("fuel", similarCar.fuel, language)
                        : t.fuelUnknown}
                      {similarCar.transmission
                        ? ` • ${translateOption(
                            "transmission",
                            similarCar.transmission,
                            language,
                          )}`
                        : ""}
                    </p>

                    <div className="mt-3 text-2xl font-black text-orange-600 sm:mt-4">
                      {formatPrice(similarCar.price, language)}
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <Link
                        href={`/cars/${similarCar.slug || similarCar.id}`}
                        className="rounded-xl bg-gray-900 px-3 py-3 text-center text-sm font-bold text-white transition hover:bg-gray-800 sm:text-base"
                      >
                        {t.detail}
                      </Link>

                      <Link
                        href={getVinCheckHref(similarCar.vin || null)}
                        className="rounded-xl border border-gray-300 bg-white px-3 py-3 text-center text-sm font-bold text-gray-900 transition hover:bg-gray-50 sm:text-base"
                      >
                        VIN
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
