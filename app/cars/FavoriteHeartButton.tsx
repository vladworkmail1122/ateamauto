"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { supabase } from "@/lib/supabase";

type LanguageCode = "cs" | "en" | "uk" | "ru";

const translations = {
  cs: {
    add: "Přidat do oblíbených",
    remove: "Odebrat z oblíbených",
  },
  en: {
    add: "Add to favorites",
    remove: "Remove from favorites",
  },
  uk: {
    add: "Додати в обране",
    remove: "Видалити з обраного",
  },
  ru: {
    add: "Добавить в избранное",
    remove: "Удалить из избранного",
  },
};

function isLanguageCode(value: string | null): value is LanguageCode {
  return value === "cs" || value === "en" || value === "uk" || value === "ru";
}

export default function FavoriteHeartButton({ carId }: { carId: number }) {
  const [language, setLanguage] = useState<LanguageCode>("cs");
  const [isFavorite, setIsFavorite] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

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

  async function toggleFavorite(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (!userId) {
      window.location.href = "/login";
      return;
    }

    if (isFavorite) {
      await supabase
        .from("favorites")
        .delete()
        .eq("user_id", userId)
        .eq("car_id", carId);

      setIsFavorite(false);
      return;
    }

    await supabase.from("favorites").insert({
      user_id: userId,
      car_id: carId,
    });

    setIsFavorite(true);
  }

  return (
    <button
      onClick={toggleFavorite}
      title={isFavorite ? t.remove : t.add}
      aria-label={isFavorite ? t.remove : t.add}
      className="
        absolute
        right-2
        top-2
        z-10
        flex
        h-8
        w-8
        items-center
        justify-center
        rounded-full
        bg-white/95
        text-sm
        shadow-md
        backdrop-blur-sm
        transition-all
        hover:scale-110
        hover:bg-white
      "
    >
      {isFavorite ? "❤️" : "🤍"}
    </button>
  );
}
