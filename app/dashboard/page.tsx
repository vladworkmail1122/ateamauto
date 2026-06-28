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
  status: string | null;
  is_featured: boolean | null;
  views: number | null;
};

const translations = {
  cs: {
    title: "Můj účet",
    loggedAs: "Přihlášen jako",
    loading: "Načítání...",
    logout: "Odhlásit se",
    addListing: "Přidat inzerát",
    addShort: "+ Přidat",
    newVehicle: "Nové vozidlo",
    listings: "Nabídka",
    allCars: "Všechna vozidla",
    favorites: "❤️ Oblíbené",
    savedListings: "Uložené inzeráty",
    views: "Zobrazení",
    adverts: "Inzeráty",
    active: "Aktivní",
    sold: "Prodáno",
    average: "Průměr",
    myListings: "Moje inzeráty",
    noListings: "Zatím nemáte žádné inzeráty",
    noListingsText: "Přidejte své první vozidlo do nabídky.",
    carPhoto: "🚗 Foto vozidla",
    unknown: "Neuvedeno",
    priceNegotiable: "Cena dohodou",
    detail: "Detail",
    edit: "Upravit",
    delete: "Smazat",
    deleteConfirm: "Opravdu chcete smazat tento inzerát?",
    statusActive: "Aktivní",
    statusReserved: "Rezervováno",
    statusSold: "Prodáno",
  },
  en: {
    title: "My account",
    loggedAs: "Logged in as",
    loading: "Loading...",
    logout: "Log out",
    addListing: "Add listing",
    addShort: "+ Add",
    newVehicle: "New vehicle",
    listings: "Listings",
    allCars: "All vehicles",
    favorites: "❤️ Favorites",
    savedListings: "Saved listings",
    views: "Views",
    adverts: "Listings",
    active: "Active",
    sold: "Sold",
    average: "Average",
    myListings: "My listings",
    noListings: "You don't have any listings yet",
    noListingsText: "Add your first vehicle to the marketplace.",
    carPhoto: "🚗 Vehicle photo",
    unknown: "Not specified",
    priceNegotiable: "Price negotiable",
    detail: "Details",
    edit: "Edit",
    delete: "Delete",
    deleteConfirm: "Do you really want to delete this listing?",
    statusActive: "Active",
    statusReserved: "Reserved",
    statusSold: "Sold",
  },
  uk: {
    title: "Мій кабінет",
    loggedAs: "Ви увійшли як",
    loading: "Завантаження...",
    logout: "Вийти",
    addListing: "Додати оголошення",
    addShort: "+ Додати",
    newVehicle: "Нове авто",
    listings: "Каталог",
    allCars: "Усі авто",
    favorites: "❤️ Обране",
    savedListings: "Збережені оголошення",
    views: "Перегляди",
    adverts: "Оголошення",
    active: "Активні",
    sold: "Продано",
    average: "Середнє",
    myListings: "Мої оголошення",
    noListings: "У вас поки немає оголошень",
    noListingsText: "Додайте своє перше авто в каталог.",
    carPhoto: "🚗 Фото авто",
    unknown: "Не вказано",
    priceNegotiable: "Ціна договірна",
    detail: "Деталі",
    edit: "Редагувати",
    delete: "Видалити",
    deleteConfirm: "Ви дійсно хочете видалити це оголошення?",
    statusActive: "Активне",
    statusReserved: "Зарезервовано",
    statusSold: "Продано",
  },
  ru: {
    title: "Мой кабинет",
    loggedAs: "Вы вошли как",
    loading: "Загрузка...",
    logout: "Выйти",
    addListing: "Добавить объявление",
    addShort: "+ Добавить",
    newVehicle: "Новое авто",
    listings: "Каталог",
    allCars: "Все авто",
    favorites: "❤️ Избранное",
    savedListings: "Сохранённые объявления",
    views: "Просмотры",
    adverts: "Объявления",
    active: "Активные",
    sold: "Продано",
    average: "Среднее",
    myListings: "Мои объявления",
    noListings: "У вас пока нет объявлений",
    noListingsText: "Добавьте свой первый автомобиль в каталог.",
    carPhoto: "🚗 Фото авто",
    unknown: "Не указано",
    priceNegotiable: "Цена договорная",
    detail: "Подробнее",
    edit: "Редактировать",
    delete: "Удалить",
    deleteConfirm: "Вы действительно хотите удалить это объявление?",
    statusActive: "Активно",
    statusReserved: "Зарезервировано",
    statusSold: "Продано",
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

function getStatusClass(status: string | null) {
  if (status === "Prodáno") return "bg-red-100 text-red-700";
  if (status === "Rezervováno") return "bg-yellow-100 text-yellow-800";
  return "bg-green-100 text-green-700";
}

function translateStatus(status: string | null, language: LanguageCode) {
  const t = translations[language];

  if (status === "Prodáno") return t.statusSold;
  if (status === "Rezervováno") return t.statusReserved;

  return t.statusActive;
}

function formatPrice(price: number | null, language: LanguageCode) {
  if (!price) return translations[language].priceNegotiable;

  return `${price.toLocaleString(getLocale(language))} Kč`;
}

function formatMileage(mileage: number | null, language: LanguageCode) {
  if (mileage === null || mileage === undefined) return "0";

  return mileage.toLocaleString(getLocale(language));
}

export default function DashboardPage() {
  const [language, setLanguage] = useState<LanguageCode>("cs");
  const [email, setEmail] = useState<string | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  const t = translations[language];
  const locale = getLocale(language);

  const totalCars = cars.length;
  const activeCars = cars.filter((car) => car.status === "Aktivní").length;
  const soldCars = cars.filter((car) => car.status === "Prodáno").length;
  const topCars = cars.filter((car) => car.is_featured).length;
  const totalViews = cars.reduce((sum, car) => sum + (car.views || 0), 0);

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
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      window.location.href = "/login";
      return;
    }

    setEmail(userData.user.email ?? null);

    const { data: carsData, error } = await supabase
      .from("cars")
      .select(
        "id, slug, brand, model, year, mileage, price, image_url, status, is_featured, views",
      )
      .eq("user_id", userData.user.id)
      .order("id", { ascending: false });

    if (error) {
      console.log("Cars loading error:", error.message);
    }

    setCars(carsData || []);
    setLoading(false);
  }

  async function deleteCar(id: number) {
    const confirmDelete = window.confirm(t.deleteConfirm);

    if (!confirmDelete) return;

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      window.location.href = "/login";
      return;
    }

    const { error } = await supabase
      .from("cars")
      .delete()
      .eq("id", id)
      .eq("user_id", userData.user.id);

    if (error) {
      alert(error.message);
      return;
    }

    setCars((currentCars) => currentCars.filter((car) => car.id !== id));
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">{t.title}</h1>

            <p className="mt-2 break-all text-sm text-gray-600 sm:text-base">
              {t.loggedAs}: {email || t.loading}
            </p>
          </div>

          <button
            onClick={logout}
            className="w-full rounded-xl border bg-white px-4 py-3 font-semibold hover:bg-gray-100 sm:w-fit"
          >
            {t.logout}
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Link
            href="/sell"
            className="rounded-2xl bg-orange-600 p-4 text-white shadow hover:bg-orange-700 sm:p-5"
          >
            <h2 className="text-base font-bold sm:text-xl">{t.addListing}</h2>
            <p className="mt-1 text-xs text-orange-100 sm:text-sm">
              {t.newVehicle}
            </p>
          </Link>

          <Link
            href="/cars"
            className="rounded-2xl bg-white p-4 shadow hover:shadow-md sm:p-5"
          >
            <h2 className="text-base font-bold sm:text-xl">{t.listings}</h2>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              {t.allCars}
            </p>
          </Link>

          <Link
            href="/dashboard/favorites"
            className="rounded-2xl bg-white p-4 shadow hover:shadow-md sm:p-5"
          >
            <h2 className="text-base font-bold sm:text-xl">{t.favorites}</h2>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              {t.savedListings}
            </p>
          </Link>

          <div className="rounded-2xl bg-white p-4 shadow sm:p-5">
            <h2 className="text-base font-bold sm:text-xl">{t.views}</h2>
            <p className="mt-1 text-2xl font-bold text-orange-600">
              {totalViews.toLocaleString(locale)}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
          <div className="rounded-2xl bg-white p-4 shadow">
            <p className="text-xs text-gray-500 sm:text-sm">{t.adverts}</p>
            <p className="mt-1 text-2xl font-bold">{totalCars}</p>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow">
            <p className="text-xs text-gray-500 sm:text-sm">{t.active}</p>
            <p className="mt-1 text-2xl font-bold text-green-600">
              {activeCars}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow">
            <p className="text-xs text-gray-500 sm:text-sm">{t.sold}</p>
            <p className="mt-1 text-2xl font-bold text-red-600">{soldCars}</p>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow">
            <p className="text-xs text-gray-500 sm:text-sm">TOP</p>
            <p className="mt-1 text-2xl font-bold text-yellow-600">
              {topCars}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow">
            <p className="text-xs text-gray-500 sm:text-sm">{t.average}</p>
            <p className="mt-1 text-2xl font-bold">
              {totalCars > 0 ? Math.round(totalViews / totalCars) : 0}
            </p>
          </div>
        </div>

        <section className="mt-8 sm:mt-12">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold sm:text-3xl">{t.myListings}</h2>

            <Link
              href="/sell"
              className="rounded-xl bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700"
            >
              {t.addShort}
            </Link>
          </div>

          {loading ? (
            <p className="mt-6 text-gray-500">{t.loading}</p>
          ) : cars.length === 0 ? (
            <div className="mt-6 rounded-2xl bg-white p-6 text-center shadow sm:p-8">
              <h3 className="text-xl font-bold sm:text-2xl">
                {t.noListings}
              </h3>

              <p className="mt-2 text-gray-500">{t.noListingsText}</p>

              <Link
                href="/sell"
                className="mt-6 inline-block rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
              >
                {t.addListing}
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {cars.map((car) => (
                <div
                  key={car.id}
                  className="overflow-hidden rounded-2xl bg-white shadow"
                >
                  <div className="relative">
                    {car.is_featured && (
                      <div className="absolute left-3 top-3 z-10 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-black shadow">
                        TOP
                      </div>
                    )}

                    {car.image_url ? (
                      <img
                        src={car.image_url}
                        alt={`${car.brand} ${car.model}`}
                        className="h-44 w-full object-cover sm:h-48"
                      />
                    ) : (
                      <div className="flex h-44 items-center justify-center bg-gray-200 sm:h-48">
                        {t.carPhoto}
                      </div>
                    )}
                  </div>

                  <div className="p-4 sm:p-5">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                          car.status,
                        )}`}
                      >
                        {translateStatus(car.status, language)}
                      </span>

                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                        👁 {(car.views || 0).toLocaleString(locale)}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold sm:text-xl">
                      {car.brand} {car.model}
                    </h3>

                    <p className="mt-1 text-sm text-gray-600">
                      {car.year || t.unknown} • {formatMileage(car.mileage, language)} km
                    </p>

                    <div className="mt-2 text-2xl font-bold text-orange-600">
                      {formatPrice(car.price, language)}
                    </div>

                    <div className="mt-4 grid gap-2">
                      <Link
                        href={`/cars/${car.slug || car.id}`}
                        className="rounded-xl bg-gray-900 py-3 text-center text-sm font-semibold text-white"
                      >
                        {t.detail}
                      </Link>

                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/cars/edit/${car.id}`}
                          className="rounded-xl border py-3 text-center text-sm font-semibold hover:bg-gray-50"
                        >
                          {t.edit}
                        </Link>

                        <button
                          onClick={() => deleteCar(car.id)}
                          className="rounded-xl border border-red-300 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
                        >
                          {t.delete}
                        </button>
                      </div>
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
