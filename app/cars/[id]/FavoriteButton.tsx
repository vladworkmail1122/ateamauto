"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function FavoriteButton({ carId }: { carId: number }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

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
      className={`mt-4 inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold transition ${
        isFavorite
          ? "bg-red-600 text-white hover:bg-red-700"
          : "border border-red-300 bg-white text-red-600 hover:bg-red-50"
      }`}
    >
      {isFavorite
        ? "💔 Odebrat z oblíbených"
        : "❤️ Přidat do oblíbených"}
    </button>
  );
}