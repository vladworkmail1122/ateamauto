"use client";

import { useEffect, useState } from "react";
import type { TouchEvent } from "react";

type LanguageCode = "cs" | "en" | "uk" | "ru";

const translations = {
  cs: {
    carPhoto: "🚗 Foto vozidla",
    photo: "foto",
  },
  en: {
    carPhoto: "🚗 Vehicle photo",
    photo: "photo",
  },
  uk: {
    carPhoto: "🚗 Фото авто",
    photo: "фото",
  },
  ru: {
    carPhoto: "🚗 Фото авто",
    photo: "фото",
  },
};

function isLanguageCode(value: string | null): value is LanguageCode {
  return value === "cs" || value === "en" || value === "uk" || value === "ru";
}

export default function CarGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [language, setLanguage] = useState<LanguageCode>("cs");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const activeImage = images[activeIndex];
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

  function prevImage() {
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  }

  function nextImage() {
    setActiveIndex((current) =>
      current === images.length - 1 ? 0 : current + 1,
    );
  }

  function handleTouchStart(e: TouchEvent<HTMLDivElement>) {
    setTouchStartX(e.touches[0].clientX);
  }

  function handleTouchEnd(e: TouchEvent<HTMLDivElement>) {
    if (touchStartX === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const difference = touchStartX - touchEndX;

    if (difference > 50) {
      nextImage();
    }

    if (difference < -50) {
      prevImage();
    }

    setTouchStartX(null);
  }

  if (!activeImage) {
    return (
      <div className="flex h-72 items-center justify-center rounded-2xl bg-gray-200 text-3xl shadow sm:h-[500px]">
        {t.carPhoto}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-2xl bg-white shadow">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="block w-full bg-gray-100"
        >
          <img
            src={activeImage}
            alt={title}
            className="h-72 w-full object-contain sm:h-[500px]"
          />
        </button>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-xl text-white backdrop-blur-sm hover:bg-black/70 sm:h-12 sm:w-12 sm:text-2xl"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={nextImage}
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-xl text-white backdrop-blur-sm hover:bg-black/70 sm:h-12 sm:w-12 sm:text-2xl"
            >
              ›
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white sm:text-sm">
              {activeIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`min-w-24 overflow-hidden rounded-xl border-2 bg-white shadow-sm sm:min-w-32 ${
                activeIndex === index
                  ? "border-orange-600"
                  : "border-transparent"
              }`}
            >
              <img
                src={image}
                alt={`${title} ${t.photo} ${index + 1}`}
                className="h-20 w-24 object-cover sm:h-24 sm:w-32"
              />
            </button>
          ))}
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black">
          <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between bg-black/70 px-4 py-3 text-white backdrop-blur-sm">
            <div className="text-sm font-semibold">
              {activeIndex + 1} / {images.length}
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-3xl hover:bg-white/25"
            >
              ×
            </button>
          </div>

          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="flex h-full w-full items-center justify-center px-3 py-16"
          >
            <img
              src={activeImage}
              alt={title}
              className="max-h-full max-w-full select-none object-contain"
              draggable={false}
            />
          </div>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-4xl text-white hover:bg-white/25"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={nextImage}
                className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-4xl text-white hover:bg-white/25"
              >
                ›
              </button>

              <div className="absolute bottom-0 left-0 right-0 z-20 flex gap-2 overflow-x-auto bg-black/70 px-4 py-3 backdrop-blur-sm">
                {images.map((image, index) => (
                  <button
                    key={`fullscreen-${image}-${index}`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`min-w-20 overflow-hidden rounded-lg border-2 ${
                      activeIndex === index
                        ? "border-orange-500"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${title} ${t.photo} ${index + 1}`}
                      className="h-14 w-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
