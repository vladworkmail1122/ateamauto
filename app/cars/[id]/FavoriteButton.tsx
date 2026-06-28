"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type LanguageCode = "cs" | "en" | "uk" | "ru";

const translations = {
  cs: {
    add: "Přidat do oblíbených",
    remove: "Odebrat z oblíbených",
    saved: "Uloženo v oblíbených",
    login: "Pro přidání do oblíbených se prosím přihlaste.",
  },
  en: {
    add: "Add to favorites",
    remove: "Remove from favorites",
    saved: "Saved to favorites",
    login: "Please log in to add this car to favorites.",
  },
  uk: {
    add: "Додати в обране",
    remove: "Видалити з обраного",
    saved: "Збережено в обраному",
    login: "Увійдіть, щоб додати авто в обране.",
  },
  ru: {
    add: "Добавить в избранное",
    remove: "Убрать из избранного",
    saved: "Сохранено в избранном",
    login: "Войдите, чтобы добавить авто в избранное.",
  },
};

function isLanguageCode(value: string | null): value is LanguageCode {
  return value === "cs" || value === "en" || value === "uk" || value === "ru";
}

export default function FavoriteButton({ carId }: { carId: number }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [language, setLanguage] = useState<LanguageCode>("cs");
  const [loading, setLoading] = useState(false);

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
    async function loadFavorite() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) return;

      setUserId(userData.user.id);

      const { data } = await supabase
        .from("favorites")
        .select("id")
        .eq("user_id", userData.user.id)
        .eq("car_id", carId)
        .maybeSingle();

      setIsFavorite(!!data);
    }

    loadFavorite();
  }, [carId]);

  async function toggleFavorite() {
    if (loading) return;

    if (!userId) {
      window.location.href = "/login";
      return;
    }

    setLoading(true);

    if (isFavorite) {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", userId)
        .eq("car_id", carId);

      if (!error) {
        setIsFavorite(false);
      }

      setLoading(false);
      return;
    }

    const { error } = await supabase.from("favorites").insert({
      user_id: userId,
      car_id: carId,
    });

    if (!error) {
      setIsFavorite(true);
    }

    setLoading(false);
  }

  const t = translations[language];

  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={toggleFavorite}
        disabled={loading}
        aria-pressed={isFavorite}
        className={`group inline-flex w-full items-center justify-center gap-3 rounded-2xl px-5 py-4 text-sm font-black shadow-sm ring-1 transition sm:w-auto sm:text-base ${
          isFavorite
            ? "bg-red-600 text-white ring-red-600 hover:bg-red-700"
            : "bg-white text-gray-900 ring-gray-200 hover:-translate-y-0.5 hover:bg-red-50 hover:text-red-700 hover:ring-red-200"
        } disabled:cursor-not-allowed disabled:opacity-70`}
      >
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-full text-lg transition ${
            isFavorite
              ? "bg-white/20"
              : "bg-red-50 text-red-600 group-hover:bg-red-100"
          }`}
        >
          {isFavorite ? "♥" : "♡"}
        </span>

        <span className="flex flex-col items-start leading-tight">
          <span>{isFavorite ? t.remove : t.add}</span>

          {isFavorite && (
            <span className="mt-0.5 text-xs font-semibold opacity-80">
              {t.saved}
            </span>
          )}
        </span>
      </button>
    </div>
  );
}
