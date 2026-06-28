"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type LanguageCode = "cs" | "en" | "uk" | "ru";

type Car = {
  id: number;
  slug: string | null;
  brand: string;
  model: string;
  year: number | null;
  mileage: number | null;
  price: number | null;
  image_url: string | null;
};

const translations = {
  cs: {
    title: "❤️ Oblíbená vozidla",
    back: "Zpět do účtu",
    loading: "Načítání...",
    emptyTitle: "Nemáte žádná oblíbená vozidla",
    emptyText: "Přidejte si vozidla do oblíbených pomocí ❤️ tlačítka.",
    browseCars: "Prohlížet vozidla",
    carPhoto: "🚗 Foto vozidla",
    unknown: "Neuvedeno",
    mileageUnknown: "Nájezd neuveden",
    priceNegotiable: "Cena dohodou",
    detail: "Detail vozu",
  },
  en: {
    title: "❤️ Favorite vehicles",
    back: "Back to account",
    loading: "Loading...",
    emptyTitle: "You don't have any favorite vehicles",
    emptyText: "Add vehicles to favorites using the ❤️ button.",
    browseCars: "Browse vehicles",
    carPhoto: "🚗 Vehicle photo",
    unknown: "Not specified",
    mileageUnknown: "Mileage not specified",
    priceNegotiable: "Price negotiable",
    detail: "Vehicle details",
  },
  uk: {
    title: "❤️ Обрані авто",
    back: "Назад до кабінету",
    loading: "Завантаження...",
    emptyTitle: "У вас немає обраних авто",
    emptyText: "Додайте авто в обране за допомогою кнопки ❤️.",
    browseCars: "Дивитися авто",
    carPhoto: "🚗 Фото авто",
    unknown: "Не вказано",
    mileageUnknown: "Пробіг не вказано",
    priceNegotiable: "Ціна договірна",
    detail: "Деталі авто",
  },
  ru: {
    title: "❤️ Избранные авто",
    back: "Назад в кабинет",
    loading: "Загрузка...",
    emptyTitle: "У вас нет избранных авто",
    emptyText: "Добавьте авто в избранное с помощью кнопки ❤️.",
    browseCars: "Смотреть авто",
    carPhoto: "🚗 Фото авто",
    unknown: "Не указано",
    mileageUnknown: "Пробег не указан",
    priceNegotiable: "Цена договорная",
    detail: "Подробнее",
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

function formatMileage(mileage: number | null, language: LanguageCode) {
  if (mileage === null || mileage === undefined) {
    return translations[language].mileageUnknown;
  }

  return `${mileage.toLocaleString(getLocale(language))} km`;
}

function formatPrice(price: number | null, language: LanguageCode) {
  if (!price) return translations[language].priceNegotiable;

  return `${price.toLocaleString(getLocale(language))} Kč`;
}

export default function FavoritesPage() {
  const [language, setLanguage] = useState<LanguageCode>("cs");
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

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
    loadFavorites();
  }, []);

  async function loadFavorites() {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      window.location.href = "/login";
      return;
    }

    const { data: favorites, error: favoritesError } = await supabase
      .from("favorites")
      .select("car_id")
      .eq("user_id", userData.user.id);

    if (favoritesError) {
      console.error(favoritesError);
      setLoading(false);
      return;
    }

    if (!favorites || favorites.length === 0) {
      setCars([]);
      setLoading(false);
      return;
    }

    const ids = favorites.map((item) => item.car_id);

    const { data: carsData, error: carsError } = await supabase
      .from("cars")
      .select("id, slug, brand, model, year, mileage, price, image_url")
      .in("id", ids);

    if (carsError) {
      console.error(carsError);
      setLoading(false);
      return;
    }

    setCars(carsData || []);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold sm:text-4xl">{t.title}</h1>

          <Link
            href="/dashboard"
            className="rounded-xl border bg-white px-4 py-2 text-center font-medium hover:bg-gray-100"
          >
            {t.back}
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-500">{t.loading}</p>
        ) : cars.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            <h2 className="text-2xl font-bold">{t.emptyTitle}</h2>

            <p className="mt-3 text-gray-500">{t.emptyText}</p>

            <Link
              href="/cars"
              className="mt-6 inline-block rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
            >
              {t.browseCars}
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
              <div
                key={car.id}
                className="overflow-hidden rounded-2xl bg-white shadow"
              >
                {car.image_url ? (
                  <img
                    src={car.image_url}
                    alt={`${car.brand} ${car.model}`}
                    className="h-56 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-56 items-center justify-center bg-gray-200">
                    {t.carPhoto}
                  </div>
                )}

                <div className="p-5">
                  <h2 className="text-xl font-semibold">
                    {car.brand} {car.model}
                  </h2>

                  <p className="mt-2 text-gray-600">
                    {car.year || t.unknown} • {formatMileage(car.mileage, language)}
                  </p>

                  <div className="mt-4 text-2xl font-bold text-orange-600">
                    {formatPrice(car.price, language)}
                  </div>

                  <Link
                    href={`/cars/${car.slug || car.id}`}
                    className="mt-4 block w-full rounded-xl bg-gray-900 py-3 text-center text-white"
                  >
                    {t.detail}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
