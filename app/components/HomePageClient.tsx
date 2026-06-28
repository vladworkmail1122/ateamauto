"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type LanguageCode = "cs" | "en" | "uk" | "ru";

export type HomeCar = {
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
};

const translations = {
  cs: {
    meta: "ATEAM AUTO MARKETPLACE CZECHIA",
    title: "Kupujte a prodávejte auta v Česku",
    subtitle:
      "Moderní marketplace pro ojetá auta. Rychlé vyhledávání, přehledné inzeráty, kontrola VIN a vybraná vozidla ověřená týmem ATEAM SERVICE.",
    browseCars: "Prohlížet auta",
    sellCar: "Prodat auto",
    vinCheck: "Kontrola VIN",
    newCars: "nových vozů",
    topOffers: "TOP nabídek",
    verified: "ověřeno",
    searchPlaceholder:
      "Hledat auto, VIN, město, palivo, převodovku, ID...",
    brand: "Značka",
    priceFrom: "Cena od",
    priceTo: "Cena do",
    search: "Hledat",
    verifiedTitle: "Ověřeno ATEAM SERVICE",
    verifiedText:
      "Vybraná vozidla mohou mít punc kontroly od našeho týmu. Tuto značku nemůže nastavit běžný uživatel.",
    vinTitle: "Kontrola podle VIN",
    vinText:
      "U inzerátů můžete rychle otevřít kontrolu historie přes carVertical nebo Cebia.",
    helpTitle: "Prodej i pomoc s autem",
    helpText:
      "Marketplace propojujeme se zkušenostmi autoservisu, STK, dokumenty a výkupem vozidel.",
    popularBrands: "Oblíbené značky",
    showAllCars: "Zobrazit všechna vozidla →",
    showAll: "Zobrazit vše →",
    serviceLabel: "ATEAM SERVICE",
    verifiedCars: "Ověřená vozidla",
    topOffersTitle: "TOP nabídky",
    latestCars: "Nejnovější vozy",
    sellCtaTitle: "Chcete prodat auto?",
    sellCtaText:
      "Přidejte svůj inzerát během pár minut. Fotky, popis, technické údaje a kontakty na jednom místě.",
    addListing: "Přidat inzerát",
    contactAteam: "Kontaktovat ATEAM",
    detail: "Detail",
    priceNegotiable: "Cena dohodou",
    mileageUnknown: "Nájezd neuveden",
    yearUnknown: "Rok neuveden",
    fuelUnknown: "Palivo neuvedeno",
    carPhoto: "🚗 Foto vozidla",
    verifiedBadge: "✓ Ověřeno ATEAM SERVICE",
  },
  en: {
    meta: "ATEAM AUTO MARKETPLACE CZECHIA",
    title: "Buy and sell cars in Czechia",
    subtitle:
      "A modern marketplace for used cars. Fast search, clear listings, VIN checks and selected vehicles verified by the ATEAM SERVICE team.",
    browseCars: "Browse cars",
    sellCar: "Sell car",
    vinCheck: "VIN check",
    newCars: "new cars",
    topOffers: "TOP offers",
    verified: "verified",
    searchPlaceholder:
      "Search car, VIN, city, fuel, transmission, ID...",
    brand: "Brand",
    priceFrom: "Price from",
    priceTo: "Price to",
    search: "Search",
    verifiedTitle: "Verified by ATEAM SERVICE",
    verifiedText:
      "Selected vehicles can receive a verification badge from our team. A regular user cannot set this badge.",
    vinTitle: "Check by VIN",
    vinText:
      "From listings you can quickly open vehicle history checks through carVertical or Cebia.",
    helpTitle: "Selling and car support",
    helpText:
      "We connect the marketplace with auto service experience, inspections, documents and car buyout support.",
    popularBrands: "Popular brands",
    showAllCars: "Show all cars →",
    showAll: "Show all →",
    serviceLabel: "ATEAM SERVICE",
    verifiedCars: "Verified cars",
    topOffersTitle: "TOP offers",
    latestCars: "Latest cars",
    sellCtaTitle: "Want to sell a car?",
    sellCtaText:
      "Add your listing in a few minutes. Photos, description, technical data and contacts in one place.",
    addListing: "Add listing",
    contactAteam: "Contact ATEAM",
    detail: "Details",
    priceNegotiable: "Price negotiable",
    mileageUnknown: "Mileage not specified",
    yearUnknown: "Year not specified",
    fuelUnknown: "Fuel not specified",
    carPhoto: "🚗 Vehicle photo",
    verifiedBadge: "✓ Verified by ATEAM SERVICE",
  },
  uk: {
    meta: "ATEAM AUTO MARKETPLACE CZECHIA",
    title: "Купуйте та продавайте авто в Чехії",
    subtitle:
      "Сучасний маркетплейс для вживаних авто. Швидкий пошук, зрозумілі оголошення, перевірка VIN та вибрані авто, перевірені командою ATEAM SERVICE.",
    browseCars: "Дивитися авто",
    sellCar: "Продати авто",
    vinCheck: "Перевірка VIN",
    newCars: "нових авто",
    topOffers: "TOP пропозицій",
    verified: "перевірено",
    searchPlaceholder:
      "Шукати авто, VIN, місто, паливо, коробку, ID...",
    brand: "Марка",
    priceFrom: "Ціна від",
    priceTo: "Ціна до",
    search: "Шукати",
    verifiedTitle: "Перевірено ATEAM SERVICE",
    verifiedText:
      "Вибрані авто можуть отримати позначку перевірки від нашої команди. Звичайний користувач не може встановити цю позначку.",
    vinTitle: "Перевірка за VIN",
    vinText:
      "В оголошеннях можна швидко відкрити перевірку історії через carVertical або Cebia.",
    helpTitle: "Продаж і допомога з авто",
    helpText:
      "Ми поєднуємо маркетплейс із досвідом автосервісу, STK, документами та викупом авто.",
    popularBrands: "Популярні марки",
    showAllCars: "Показати всі авто →",
    showAll: "Показати все →",
    serviceLabel: "ATEAM SERVICE",
    verifiedCars: "Перевірені авто",
    topOffersTitle: "TOP пропозиції",
    latestCars: "Найновіші авто",
    sellCtaTitle: "Хочете продати авто?",
    sellCtaText:
      "Додайте оголошення за кілька хвилин. Фото, опис, технічні дані та контакти в одному місці.",
    addListing: "Додати оголошення",
    contactAteam: "Зв’язатися з ATEAM",
    detail: "Деталі",
    priceNegotiable: "Ціна договірна",
    mileageUnknown: "Пробіг не вказано",
    yearUnknown: "Рік не вказано",
    fuelUnknown: "Паливо не вказано",
    carPhoto: "🚗 Фото авто",
    verifiedBadge: "✓ Перевірено ATEAM SERVICE",
  },
  ru: {
    meta: "ATEAM AUTO MARKETPLACE CZECHIA",
    title: "Покупайте и продавайте авто в Чехии",
    subtitle:
      "Современный маркетплейс для подержанных авто. Быстрый поиск, понятные объявления, проверка VIN и выбранные автомобили, проверенные командой ATEAM SERVICE.",
    browseCars: "Смотреть авто",
    sellCar: "Продать авто",
    vinCheck: "Проверка VIN",
    newCars: "новых авто",
    topOffers: "TOP предложений",
    verified: "проверено",
    searchPlaceholder:
      "Искать авто, VIN, город, топливо, коробку, ID...",
    brand: "Марка",
    priceFrom: "Цена от",
    priceTo: "Цена до",
    search: "Искать",
    verifiedTitle: "Проверено ATEAM SERVICE",
    verifiedText:
      "Выбранные автомобили могут получить отметку проверки от нашей команды. Обычный пользователь не может поставить эту отметку.",
    vinTitle: "Проверка по VIN",
    vinText:
      "В объявлениях можно быстро открыть проверку истории через carVertical или Cebia.",
    helpTitle: "Продажа и помощь с авто",
    helpText:
      "Мы соединяем маркетплейс с опытом автосервиса, STK, документами и выкупом автомобилей.",
    popularBrands: "Популярные марки",
    showAllCars: "Показать все авто →",
    showAll: "Показать всё →",
    serviceLabel: "ATEAM SERVICE",
    verifiedCars: "Проверенные авто",
    topOffersTitle: "TOP предложения",
    latestCars: "Новые авто",
    sellCtaTitle: "Хотите продать авто?",
    sellCtaText:
      "Добавьте объявление за несколько минут. Фото, описание, технические данные и контакты в одном месте.",
    addListing: "Добавить объявление",
    contactAteam: "Связаться с ATEAM",
    detail: "Подробнее",
    priceNegotiable: "Цена договорная",
    mileageUnknown: "Пробег не указан",
    yearUnknown: "Год не указан",
    fuelUnknown: "Топливо не указано",
    carPhoto: "🚗 Фото авто",
    verifiedBadge: "✓ Проверено ATEAM SERVICE",
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
  "Ford",
  "Chevrolet",
  "Tesla",
  "Hyundai",
  "Kia",
  "Peugeot",
  "Renault",
  "Citroën",
  "Opel",
  "Fiat",
  "Volvo",
  "Land Rover",
  "Jaguar",
  "Mini",
  "Dacia",
  "Jiné",
];

const popularBrands = [
  "Audi",
  "BMW",
  "Mercedes-Benz",
  "Volkswagen",
  "Škoda",
  "Seat",
  "Toyota",
  "Ford",
];

function isLanguageCode(value: string | null): value is LanguageCode {
  return value === "cs" || value === "en" || value === "uk" || value === "ru";
}

function formatPrice(price: number | null, language: LanguageCode) {
  if (!price) return translations[language].priceNegotiable;
  return `${price.toLocaleString()} Kč`;
}

function formatMileage(mileage: number | null, language: LanguageCode) {
  if (!mileage) return translations[language].mileageUnknown;
  return `${mileage.toLocaleString()} km`;
}

function getCarHref(car: HomeCar) {
  return `/cars/${car.slug || car.id}`;
}

function getVinCheckHref(vin: string | null) {
  return vin ? `/vin-check?vin=${encodeURIComponent(vin)}` : "/vin-check";
}

function CarCard({ car, language }: { car: HomeCar; language: LanguageCode }) {
  const t = translations[language];

  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-200 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative">
        {car.is_featured && (
          <div className="absolute left-3 top-3 z-10 rounded-full bg-yellow-400 px-3 py-1 text-xs font-black text-black shadow sm:text-sm">
            TOP
          </div>
        )}

        {car.image_url ? (
          <img
            src={car.image_url}
            alt={`${car.brand || "Auto"} ${car.model || ""}`}
            className="h-52 w-full object-cover sm:h-56"
          />
        ) : (
          <div className="flex h-52 items-center justify-center bg-gray-200 text-gray-500 sm:h-56">
            {t.carPhoto}
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5">
        <div className="mb-2 flex flex-wrap gap-2">
          {car.is_verified_by_ateam && (
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-black text-green-800">
              {t.verifiedBadge}
            </span>
          )}

          {car.city && (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
              {car.city}
            </span>
          )}
        </div>

        <h3 className="text-lg font-black text-gray-900 sm:text-xl">
          {car.brand} {car.model}
        </h3>

        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          {car.year || t.yearUnknown}
          {car.engine_volume ? ` • ${car.engine_volume} l` : ""}
          {car.mileage ? ` • ${formatMileage(car.mileage, language)}` : ""}
        </p>

        <p className="mt-1 text-sm text-gray-500">
          {car.fuel || t.fuelUnknown}
          {car.transmission ? ` • ${car.transmission}` : ""}
        </p>

        <div className="mt-4 text-2xl font-black text-orange-600">
          {formatPrice(car.price, language)}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link
            href={getCarHref(car)}
            className="rounded-xl bg-gray-900 px-3 py-3 text-center text-sm font-bold text-white transition hover:bg-gray-800 sm:text-base"
          >
            {t.detail}
          </Link>

          <Link
            href={getVinCheckHref(car.vin)}
            className="rounded-xl border border-gray-300 bg-white px-3 py-3 text-center text-sm font-bold text-gray-900 transition hover:bg-gray-50 sm:text-base"
          >
            VIN
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function HomePageClient({
  featuredCars,
  verifiedCars,
  latestCars,
  verifiedCount,
}: {
  featuredCars: HomeCar[];
  verifiedCars: HomeCar[];
  latestCars: HomeCar[];
  verifiedCount: number;
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
      <section className="overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-orange-600">
                {t.meta}
              </p>

              <h1 className="max-w-3xl text-4xl font-black tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                {t.title}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
                {t.subtitle}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/cars"
                  className="rounded-2xl bg-orange-600 px-7 py-4 text-center font-black text-white shadow-sm transition hover:bg-orange-700"
                >
                  {t.browseCars}
                </Link>

                <Link
                  href="/sell"
                  className="rounded-2xl border border-gray-300 bg-white px-7 py-4 text-center font-black text-gray-900 shadow-sm transition hover:border-orange-600 hover:text-orange-600"
                >
                  {t.sellCar}
                </Link>

                <Link
                  href="/vin-check"
                  className="rounded-2xl border border-green-300 bg-green-50 px-7 py-4 text-center font-black text-green-800 shadow-sm transition hover:bg-green-100"
                >
                  {t.vinCheck}
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-5 shadow-sm sm:p-8">
              <img
                src="/logo.png"
                alt="ATEAM AUTO"
                className="mx-auto max-h-44 object-contain sm:max-h-52"
              />

              <div className="mt-7 grid grid-cols-3 gap-3 sm:gap-4">
                <div className="rounded-2xl bg-white p-3 text-center shadow-sm sm:p-4">
                  <p className="text-2xl font-black text-orange-600">
                    {latestCars.length || 0}+
                  </p>
                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                    {t.newCars}
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-3 text-center shadow-sm sm:p-4">
                  <p className="text-2xl font-black text-orange-600">
                    {featuredCars.length || 0}
                  </p>
                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                    {t.topOffers}
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-3 text-center shadow-sm sm:p-4">
                  <p className="text-2xl font-black text-green-700">
                    {verifiedCount || 0}
                  </p>
                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                    {t.verified}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form
            action="/cars"
            className="mt-10 rounded-3xl bg-white p-4 shadow-xl ring-1 ring-gray-200 sm:mt-12 sm:p-5"
          >
            <div className="grid gap-4">
              <input
                name="search"
                placeholder={t.searchPlaceholder}
                className="rounded-2xl border border-gray-300 px-4 py-4 text-base text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-600 focus:ring-4 focus:ring-orange-100 sm:text-lg"
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <select
                  name="brand"
                  className="rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-orange-600 focus:ring-4 focus:ring-orange-100"
                >
                  <option value="">{t.brand}</option>

                  {carBrands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>

                <input
                  name="priceFrom"
                  placeholder={t.priceFrom}
                  className="rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-600 focus:ring-4 focus:ring-orange-100"
                />

                <input
                  name="priceTo"
                  placeholder={t.priceTo}
                  className="rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-600 focus:ring-4 focus:ring-orange-100"
                />

                <button className="rounded-2xl bg-orange-600 px-4 py-3 font-black text-white transition hover:bg-orange-700">
                  {t.search}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <div className="text-3xl">✓</div>
            <h2 className="mt-3 text-xl font-black text-gray-900">
              {t.verifiedTitle}
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {t.verifiedText}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <div className="text-3xl">🔎</div>
            <h2 className="mt-3 text-xl font-black text-gray-900">
              {t.vinTitle}
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {t.vinText}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <div className="text-3xl">🚗</div>
            <h2 className="mt-3 text-xl font-black text-gray-900">
              {t.helpTitle}
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {t.helpText}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-black text-gray-900">
            {t.popularBrands}
          </h2>

          <Link href="/cars" className="font-bold text-orange-600">
            {t.showAllCars}
          </Link>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {popularBrands.map((brand) => (
            <Link
              key={brand}
              href={`/cars?brand=${encodeURIComponent(brand)}`}
              className="rounded-full border bg-white px-5 py-3 font-bold shadow-sm transition hover:border-orange-500 hover:text-orange-600"
            >
              {brand}
            </Link>
          ))}
        </div>
      </section>

      {verifiedCars.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-green-700">
                {t.serviceLabel}
              </p>

              <h2 className="mt-2 text-3xl font-black text-gray-900">
                {t.verifiedCars}
              </h2>
            </div>

            <Link href="/cars" className="font-bold text-orange-600">
              {t.showAll}
            </Link>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {verifiedCars.map((car) => (
              <CarCard key={car.id} car={car} language={language} />
            ))}
          </div>
        </section>
      )}

      {featuredCars.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-3xl font-black text-gray-900">
              {t.topOffersTitle}
            </h2>

            <Link href="/cars" className="font-bold text-orange-600">
              {t.showAll}
            </Link>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} language={language} />
            ))}
          </div>
        </section>
      )}

      {latestCars.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-3xl font-black text-gray-900">
              {t.latestCars}
            </h2>

            <Link href="/cars" className="font-bold text-orange-600">
              {t.showAll}
            </Link>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {latestCars.map((car) => (
              <CarCard key={car.id} car={car} language={language} />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-6 rounded-3xl bg-gray-900 p-6 text-white md:grid-cols-[1.2fr_0.8fr] md:p-12">
          <div>
            <h2 className="text-3xl font-black">{t.sellCtaTitle}</h2>

            <p className="mt-3 max-w-2xl text-gray-300">
              {t.sellCtaText}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <Link
              href="/sell"
              className="rounded-2xl bg-orange-600 px-6 py-4 text-center font-black text-white transition hover:bg-orange-700"
            >
              {t.addListing}
            </Link>

            <Link
              href="/contact"
              className="rounded-2xl border border-white/20 px-6 py-4 text-center font-black text-white transition hover:bg-white/10"
            >
              {t.contactAteam}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
