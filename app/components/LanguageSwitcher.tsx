"use client";

import { useEffect, useState } from "react";

const languages = [
  {
    code: "cs",
    label: "Čeština",
    short: "CZ",
    flag: "🇨🇿",
  },
  {
    code: "en",
    label: "English",
    short: "EN",
    flag: "🇬🇧",
  },
  {
    code: "uk",
    label: "Українська",
    short: "UA",
    flag: "🇺🇦",
  },
  {
    code: "ru",
    label: "Русский",
    short: "RU",
    flag: "🇷🇺",
  },
];

export default function LanguageSwitcher() {
  const [selectedLanguage, setSelectedLanguage] = useState("cs");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("site-language");

    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  const currentLanguage =
    languages.find((language) => language.code === selectedLanguage) ||
    languages[0];

  function changeLanguage(languageCode: string) {
    setSelectedLanguage(languageCode);
    localStorage.setItem("site-language", languageCode);
  }

  return (
    <div className="relative">
      <label className="sr-only" htmlFor="language-switcher">
        Vybrat jazyk
      </label>

      <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 shadow-sm">
        <span className="text-lg">{currentLanguage.flag}</span>

        <select
          id="language-switcher"
          value={selectedLanguage}
          onChange={(event) => changeLanguage(event.target.value)}
          className="cursor-pointer bg-transparent text-sm font-black text-gray-900 outline-none"
        >
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.short}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}