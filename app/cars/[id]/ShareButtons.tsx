"use client";

import { useEffect, useState } from "react";

type LanguageCode = "cs" | "en" | "uk" | "ru";

const translations = {
  cs: {
    title: "Sdílet inzerát",
    copied: "✓ Zkopírováno",
    copyLink: "📋 Kopírovat odkaz",
    shareText: "Podívejte se na tento inzerát",
  },
  en: {
    title: "Share listing",
    copied: "✓ Copied",
    copyLink: "📋 Copy link",
    shareText: "Check out this listing",
  },
  uk: {
    title: "Поділитися оголошенням",
    copied: "✓ Скопійовано",
    copyLink: "📋 Скопіювати посилання",
    shareText: "Подивіться це оголошення",
  },
  ru: {
    title: "Поделиться объявлением",
    copied: "✓ Скопировано",
    copyLink: "📋 Скопировать ссылку",
    shareText: "Посмотрите это объявление",
  },
};

function isLanguageCode(value: string | null): value is LanguageCode {
  return value === "cs" || value === "en" || value === "uk" || value === "ru";
}

export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [language, setLanguage] = useState<LanguageCode>("cs");

  useEffect(() => {
    setCurrentUrl(window.location.href);

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

  async function copyLink() {
    if (!currentUrl) return;

    await navigator.clipboard.writeText(currentUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  function getShareText() {
    return `${t.shareText}: ${title}\n${currentUrl}`;
  }

  return (
    <div className="mt-6 rounded-2xl border bg-gray-50 p-5">
      <h3 className="mb-4 text-xl font-bold">{t.title}</h3>

      <div className="grid gap-3 md:grid-cols-3">
        <button
          type="button"
          onClick={copyLink}
          className="rounded-xl border bg-white py-3 font-semibold hover:bg-gray-100"
        >
          {copied ? t.copied : t.copyLink}
        </button>

        <a
          href={`https://wa.me/?text=${encodeURIComponent(getShareText())}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-green-600 py-3 text-center font-semibold text-white hover:bg-green-700"
        >
          WhatsApp
        </a>

        <a
          href={`https://t.me/share/url?url=${encodeURIComponent(
            currentUrl,
          )}&text=${encodeURIComponent(`${t.shareText}: ${title}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-sky-500 py-3 text-center font-semibold text-white hover:bg-sky-600"
        >
          Telegram
        </a>
      </div>
    </div>
  );
}
