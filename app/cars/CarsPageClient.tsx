"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import FavoriteHeartButton from "./FavoriteHeartButton";

type LanguageCode = "cs" | "en" | "uk" | "ru";

export type CarsSearchParams = {
  search?: string;
  brand?: string;
  model?: string;
  priceFrom?: string;
  priceTo?: string;
  yearFrom?: string;
  yearTo?: string;
  engineFrom?: string;
  engineTo?: string;
  fuel?: string;
  transmission?: string;
  bodyType?: string;
  color?: string;
  status?: string;
  driveType?: string;
  euroNorm?: string;
  city?: string;
  sort?: string;
  page?: string;
};

export type CatalogCar = {
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
};

const translations = {
  cs: {
    title: "Nabídka vozidel",
    found: "Nalezeno vozidel",
    page: "Stránka",
    of: "z",
    addListing: "Přidat inzerát",
    filtersTitle: "Filtry a řazení",
    searchPlaceholder: "Hledat: značka, model, VIN, město, ID...",
    brand: "Značka",
    model: "Model",
    city: "Město",
    fuel: "Palivo",
    transmission: "Převodovka",
    bodyType: "Karoserie",
    color: "Barva",
    status: "Status",
    driveType: "Pohon",
    euroNorm: "Euro norma",
    priceFrom: "Cena od",
    priceTo: "Cena do",
    yearFrom: "Rok od",
    yearTo: "Rok do",
    engineFrom: "Objem od",
    engineTo: "Objem do",
    search: "Hledat",
    clearFilters: "Vymazat filtry",
    newest: "Nejnovější",
    oldest: "Nejstarší",
    cheapest: "Nejlevnější",
    mostExpensive: "Nejdražší",
    lowestMileage: "Nejnižší nájezd",
    newestYear: "Nejnovější rok výroby",
    highestPower: "Nejvyšší výkon",
    smallestEngine: "Nejmenší objem motoru",
    biggestEngine: "Největší objem motoru",
    mostViews: "Nejvíce zobrazení",
    nothingFound: "Nic nenalezeno",
    adjustFilters: "Zkuste upravit filtry vyhledávání.",
    carPhoto: "🚗 Foto vozidla",
    verifiedBadge: "✓ Ověřeno ATEAM SERVICE",
    yearUnknown: "Rok neuveden",
    mileageUnknown: "Nájezd neuveden",
    priceNegotiable: "Cena dohodou",
    fuelUnknown: "Palivo neuvedeno",
    detailCar: "Detail vozu",
    checkVin: "Prověřit VIN",
    previous: "← Předchozí",
    next: "Další →",
  },
  en: {
    title: "Vehicle listings",
    found: "Vehicles found",
    page: "Page",
    of: "of",
    addListing: "Add listing",
    filtersTitle: "Filters and sorting",
    searchPlaceholder: "Search: brand, model, VIN, city, ID...",
    brand: "Brand",
    model: "Model",
    city: "City",
    fuel: "Fuel",
    transmission: "Transmission",
    bodyType: "Body type",
    color: "Color",
    status: "Status",
    driveType: "Drive",
    euroNorm: "Euro norm",
    priceFrom: "Price from",
    priceTo: "Price to",
    yearFrom: "Year from",
    yearTo: "Year to",
    engineFrom: "Engine from",
    engineTo: "Engine to",
    search: "Search",
    clearFilters: "Clear filters",
    newest: "Newest",
    oldest: "Oldest",
    cheapest: "Cheapest",
    mostExpensive: "Most expensive",
    lowestMileage: "Lowest mileage",
    newestYear: "Newest year",
    highestPower: "Highest power",
    smallestEngine: "Smallest engine",
    biggestEngine: "Biggest engine",
    mostViews: "Most views",
    nothingFound: "Nothing found",
    adjustFilters: "Try changing the search filters.",
    carPhoto: "🚗 Vehicle photo",
    verifiedBadge: "✓ Verified by ATEAM SERVICE",
    yearUnknown: "Year not specified",
    mileageUnknown: "Mileage not specified",
    priceNegotiable: "Price negotiable",
    fuelUnknown: "Fuel not specified",
    detailCar: "Details",
    checkVin: "Check VIN",
    previous: "← Previous",
    next: "Next →",
  },
  uk: {
    title: "Каталог авто",
    found: "Знайдено авто",
    page: "Сторінка",
    of: "з",
    addListing: "Додати оголошення",
    filtersTitle: "Фільтри та сортування",
    searchPlaceholder: "Шукати: марка, модель, VIN, місто, ID...",
    brand: "Марка",
    model: "Модель",
    city: "Місто",
    fuel: "Паливо",
    transmission: "Коробка",
    bodyType: "Кузов",
    color: "Колір",
    status: "Статус",
    driveType: "Привід",
    euroNorm: "Євро норма",
    priceFrom: "Ціна від",
    priceTo: "Ціна до",
    yearFrom: "Рік від",
    yearTo: "Рік до",
    engineFrom: "Обʼєм від",
    engineTo: "Обʼєм до",
    search: "Шукати",
    clearFilters: "Очистити фільтри",
    newest: "Найновіші",
    oldest: "Найстаріші",
    cheapest: "Найдешевші",
    mostExpensive: "Найдорожчі",
    lowestMileage: "Найменший пробіг",
    newestYear: "Найновіший рік",
    highestPower: "Найбільша потужність",
    smallestEngine: "Найменший обʼєм двигуна",
    biggestEngine: "Найбільший обʼєм двигуна",
    mostViews: "Найбільше переглядів",
    nothingFound: "Нічого не знайдено",
    adjustFilters: "Спробуйте змінити фільтри пошуку.",
    carPhoto: "🚗 Фото авто",
    verifiedBadge: "✓ Перевірено ATEAM SERVICE",
    yearUnknown: "Рік не вказано",
    mileageUnknown: "Пробіг не вказано",
    priceNegotiable: "Ціна договірна",
    fuelUnknown: "Паливо не вказано",
    detailCar: "Деталі",
    checkVin: "Перевірити VIN",
    previous: "← Попередня",
    next: "Наступна →",
  },
  ru: {
    title: "Каталог авто",
    found: "Найдено авто",
    page: "Страница",
    of: "из",
    addListing: "Добавить объявление",
    filtersTitle: "Фильтры и сортировка",
    searchPlaceholder: "Искать: марка, модель, VIN, город, ID...",
    brand: "Марка",
    model: "Модель",
    city: "Город",
    fuel: "Топливо",
    transmission: "Коробка",
    bodyType: "Кузов",
    color: "Цвет",
    status: "Статус",
    driveType: "Привод",
    euroNorm: "Евро норма",
    priceFrom: "Цена от",
    priceTo: "Цена до",
    yearFrom: "Год от",
    yearTo: "Год до",
    engineFrom: "Объём от",
    engineTo: "Объём до",
    search: "Искать",
    clearFilters: "Сбросить фильтры",
    newest: "Сначала новые",
    oldest: "Сначала старые",
    cheapest: "Сначала дешёвые",
    mostExpensive: "Сначала дорогие",
    lowestMileage: "Минимальный пробег",
    newestYear: "Самый новый год",
    highestPower: "Самая высокая мощность",
    smallestEngine: "Меньший объём двигателя",
    biggestEngine: "Больший объём двигателя",
    mostViews: "Больше просмотров",
    nothingFound: "Ничего не найдено",
    adjustFilters: "Попробуйте изменить фильтры поиска.",
    carPhoto: "🚗 Фото авто",
    verifiedBadge: "✓ Проверено ATEAM SERVICE",
    yearUnknown: "Год не указан",
    mileageUnknown: "Пробег не указан",
    priceNegotiable: "Цена договорная",
    fuelUnknown: "Топливо не указано",
    detailCar: "Подробнее",
    checkVin: "Проверить VIN",
    previous: "← Назад",
    next: "Дальше →",
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

const years = Array.from({ length: 2026 - 1990 + 1 }, (_, index) =>
  String(2026 - index),
);

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
  value: string,
  language: LanguageCode,
) {
  const translation = valueTranslations[group][
    value as keyof (typeof valueTranslations)[typeof group]
  ] as Record<LanguageCode, string> | undefined;

  return translation?.[language] || value;
}

function formatPrice(price: number | null, language: LanguageCode) {
  if (!price) return translations[language].priceNegotiable;
  return `${price.toLocaleString(getLocale(language))} Kč`;
}

function formatMileage(mileage: number | null, language: LanguageCode) {
  if (mileage === null || mileage === undefined) {
    return translations[language].mileageUnknown;
  }

  return `${mileage.toLocaleString(getLocale(language))} km`;
}

function createPageUrl(searchParams: CarsSearchParams, page: number) {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value && key !== "page") {
      params.set(key, value);
    }
  });

  params.set("page", String(page));

  return `/cars?${params.toString()}`;
}

function getVinCheckHref(vin: string | null) {
  return vin ? `/vin-check?vin=${encodeURIComponent(vin)}` : "/vin-check";
}

export default function CarsPageClient({
  cars,
  searchParams,
  currentPage,
  totalCars,
  totalPages,
}: {
  cars: CatalogCar[];
  searchParams: CarsSearchParams;
  currentPage: number;
  totalCars: number;
  totalPages: number;
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

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">{t.title}</h1>

            <p className="mt-2 text-sm text-gray-500">
              {t.found}: {totalCars} • {t.page} {currentPage} {t.of}{" "}
              {totalPages}
            </p>
          </div>

          <Link
            href="/sell"
            className="rounded-xl bg-orange-600 px-4 py-3 text-center font-semibold text-white hover:bg-orange-700 sm:w-fit"
          >
            {t.addListing}
          </Link>
        </div>

        <details className="mb-6 rounded-2xl bg-white shadow sm:mb-8">
          <summary className="cursor-pointer px-5 py-4 text-base font-bold sm:px-6 sm:text-lg">
            {t.filtersTitle}
          </summary>

          <form className="grid gap-3 border-t p-4 sm:gap-4 sm:p-6 md:grid-cols-4">
            <input
              name="search"
              defaultValue={searchParams.search || ""}
              placeholder={t.searchPlaceholder}
              className="rounded-xl border px-4 py-3 md:col-span-4"
            />

            <select
              name="brand"
              defaultValue={searchParams.brand || ""}
              className="rounded-xl border px-4 py-3"
            >
              <option value="">{t.brand}</option>
              {carBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>

            <input
              name="model"
              defaultValue={searchParams.model || ""}
              placeholder={t.model}
              className="rounded-xl border px-4 py-3"
            />

            <input
              name="city"
              defaultValue={searchParams.city || ""}
              placeholder={t.city}
              className="rounded-xl border px-4 py-3"
            />

            <select
              name="fuel"
              defaultValue={searchParams.fuel || ""}
              className="rounded-xl border px-4 py-3"
            >
              <option value="">{t.fuel}</option>
              {fuels.map((fuel) => (
                <option key={fuel} value={fuel}>
                  {translateOption("fuel", fuel, language)}
                </option>
              ))}
            </select>

            <select
              name="transmission"
              defaultValue={searchParams.transmission || ""}
              className="rounded-xl border px-4 py-3"
            >
              <option value="">{t.transmission}</option>
              {transmissions.map((transmission) => (
                <option key={transmission} value={transmission}>
                  {translateOption("transmission", transmission, language)}
                </option>
              ))}
            </select>

            <select
              name="bodyType"
              defaultValue={searchParams.bodyType || ""}
              className="rounded-xl border px-4 py-3"
            >
              <option value="">{t.bodyType}</option>
              {bodyTypes.map((bodyType) => (
                <option key={bodyType} value={bodyType}>
                  {translateOption("bodyType", bodyType, language)}
                </option>
              ))}
            </select>

            <select
              name="color"
              defaultValue={searchParams.color || ""}
              className="rounded-xl border px-4 py-3"
            >
              <option value="">{t.color}</option>
              {colors.map((color) => (
                <option key={color} value={color}>
                  {translateOption("color", color, language)}
                </option>
              ))}
            </select>

            <select
              name="status"
              defaultValue={searchParams.status || ""}
              className="rounded-xl border px-4 py-3"
            >
              <option value="">{t.status}</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {translateOption("status", status, language)}
                </option>
              ))}
            </select>

            <select
              name="driveType"
              defaultValue={searchParams.driveType || ""}
              className="rounded-xl border px-4 py-3"
            >
              <option value="">{t.driveType}</option>
              {driveTypes.map((driveType) => (
                <option key={driveType} value={driveType}>
                  {translateOption("driveType", driveType, language)}
                </option>
              ))}
            </select>

            <select
              name="euroNorm"
              defaultValue={searchParams.euroNorm || ""}
              className="rounded-xl border px-4 py-3"
            >
              <option value="">{t.euroNorm}</option>
              {euroNorms.map((euroNorm) => (
                <option key={euroNorm} value={euroNorm}>
                  {euroNorm}
                </option>
              ))}
            </select>

            <input
              name="priceFrom"
              defaultValue={searchParams.priceFrom || ""}
              placeholder={t.priceFrom}
              className="rounded-xl border px-4 py-3"
            />

            <input
              name="priceTo"
              defaultValue={searchParams.priceTo || ""}
              placeholder={t.priceTo}
              className="rounded-xl border px-4 py-3"
            />

            <select
              name="yearFrom"
              defaultValue={searchParams.yearFrom || ""}
              className="rounded-xl border px-4 py-3"
            >
              <option value="">{t.yearFrom}</option>
              {years.map((year) => (
                <option key={`from-${year}`} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select
              name="yearTo"
              defaultValue={searchParams.yearTo || ""}
              className="rounded-xl border px-4 py-3"
            >
              <option value="">{t.yearTo}</option>
              {years.map((year) => (
                <option key={`to-${year}`} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <input
              name="engineFrom"
              defaultValue={searchParams.engineFrom || ""}
              placeholder={t.engineFrom}
              className="rounded-xl border px-4 py-3"
            />

            <input
              name="engineTo"
              defaultValue={searchParams.engineTo || ""}
              placeholder={t.engineTo}
              className="rounded-xl border px-4 py-3"
            />

            <select
              name="sort"
              defaultValue={searchParams.sort || "newest"}
              className="rounded-xl border px-4 py-3"
            >
              <option value="newest">{t.newest}</option>
              <option value="oldest">{t.oldest}</option>
              <option value="price_asc">{t.cheapest}</option>
              <option value="price_desc">{t.mostExpensive}</option>
              <option value="mileage_asc">{t.lowestMileage}</option>
              <option value="year_desc">{t.newestYear}</option>
              <option value="power_desc">{t.highestPower}</option>
              <option value="engine_asc">{t.smallestEngine}</option>
              <option value="engine_desc">{t.biggestEngine}</option>
              <option value="views_desc">{t.mostViews}</option>
            </select>

            <button className="rounded-xl bg-gray-900 px-4 py-3 font-semibold text-white md:col-span-2">
              {t.search}
            </button>

            <Link
              href="/cars"
              className="rounded-xl border px-4 py-3 text-center font-semibold hover:bg-gray-100 md:col-span-2"
            >
              {t.clearFilters}
            </Link>
          </form>
        </details>

        {cars.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow sm:p-10">
            <h2 className="text-2xl font-bold">{t.nothingFound}</h2>
            <p className="mt-2 text-gray-500">{t.adjustFilters}</p>
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {cars.map((car) => (
                <div
                  key={car.id}
                  className="overflow-hidden rounded-2xl bg-white shadow"
                >
                  <div className="relative">
                    {car.is_featured && (
                      <div className="absolute left-3 top-3 z-10 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-black shadow sm:text-sm">
                        TOP
                      </div>
                    )}

                    {car.image_url ? (
                      <img
                        src={car.image_url}
                        alt={`${car.brand || "Auto"} ${car.model || ""}`}
                        className="h-48 w-full object-cover sm:h-56"
                      />
                    ) : (
                      <div className="flex h-48 items-center justify-center bg-gray-200 sm:h-56">
                        {t.carPhoto}
                      </div>
                    )}

                    <FavoriteHeartButton carId={car.id} />
                  </div>

                  <div className="p-4 sm:p-5">
                    <div className="mb-2 flex flex-wrap gap-2">
                      {car.is_verified_by_ateam && (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-black text-green-800">
                          {t.verifiedBadge}
                        </span>
                      )}

                      {car.status && (
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                          {translateOption("status", car.status, language)}
                        </span>
                      )}

                      {car.city && (
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                          📍 {car.city}
                        </span>
                      )}

                      {car.body_type && (
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                          {translateOption("bodyType", car.body_type, language)}
                        </span>
                      )}

                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                        👁 {(car.views || 0).toLocaleString(getLocale(language))}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold sm:text-xl">
                      {car.brand} {car.model}
                    </h2>

                    <p className="mt-2 text-sm text-gray-600 sm:text-base">
                      {car.year || t.yearUnknown}
                      {car.engine_volume ? ` • ${car.engine_volume} l` : ""}
                      {car.mileage !== null && car.mileage !== undefined
                        ? ` • ${formatMileage(car.mileage, language)}`
                        : ""}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {car.fuel
                        ? translateOption("fuel", car.fuel, language)
                        : t.fuelUnknown}
                      {car.drive_type
                        ? ` • ${translateOption(
                            "driveType",
                            car.drive_type,
                            language,
                          )}`
                        : ""}
                      {car.transmission
                        ? ` • ${translateOption(
                            "transmission",
                            car.transmission,
                            language,
                          )}`
                        : ""}
                    </p>

                    <div className="mt-3 text-2xl font-bold text-orange-600 sm:mt-4">
                      {formatPrice(car.price, language)}
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <Link
                        href={`/cars/${car.slug || car.id}`}
                        className="rounded-xl bg-gray-900 px-3 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-800 sm:text-base"
                      >
                        {t.detailCar}
                      </Link>

                      <Link
                        href={getVinCheckHref(car.vin)}
                        className="rounded-xl border border-gray-300 bg-white px-3 py-3 text-center text-sm font-semibold text-gray-900 transition hover:bg-gray-50 sm:text-base"
                      >
                        {t.checkVin}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-center gap-3 sm:mt-10 sm:gap-4">
              {currentPage > 1 ? (
                <Link
                  href={createPageUrl(searchParams, currentPage - 1)}
                  className="rounded-xl border bg-white px-4 py-3 text-sm font-semibold hover:bg-gray-100 sm:px-5 sm:text-base"
                >
                  {t.previous}
                </Link>
              ) : (
                <span className="rounded-xl border bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-400 sm:px-5 sm:text-base">
                  {t.previous}
                </span>
              )}

              <span className="rounded-xl bg-white px-4 py-3 text-sm font-semibold shadow sm:px-5 sm:text-base">
                {currentPage} / {totalPages}
              </span>

              {currentPage < totalPages ? (
                <Link
                  href={createPageUrl(searchParams, currentPage + 1)}
                  className="rounded-xl border bg-white px-4 py-3 text-sm font-semibold hover:bg-gray-100 sm:px-5 sm:text-base"
                >
                  {t.next}
                </Link>
              ) : (
                <span className="rounded-xl border bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-400 sm:px-5 sm:text-base">
                  {t.next}
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
