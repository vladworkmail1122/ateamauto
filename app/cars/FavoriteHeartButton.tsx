"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function FavoriteHeartButton({
  carId,
}: {
  carId: number;
}) {
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

  async function toggleFavorite(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
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
      title={
        isFavorite
          ? "Odebrat z oblíbených"
          : "Přidat do oblíbených"
      }
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