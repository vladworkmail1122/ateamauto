"use client";

import { useEffect, useState } from "react";

type LanguageCode = "cs" | "en" | "uk" | "ru";

const languages: { code: LanguageCode; short: string; label: string }[] = [
  { code: "cs", short: "CZ", label: "Čeština" },
  { code: "en", short: "EN", label: "English" },
  { code: "uk", short: "UA", label: "Українська" },
  { code: "ru", short: "RU", label: "Русский" },
];

function isLanguageCode(value: string | null): value is LanguageCode {
  return value === "cs" || value === "en" || value === "uk" || value === "ru";
}

export default function LanguageSwitcher() {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>("cs");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("site-language");

    if (isLanguageCode(savedLanguage)) {
      setSelectedLanguage(savedLanguage);
      document.documentElement.lang = savedLanguage;
    }
  }, []);

  function changeLanguage(languageCode: LanguageCode) {
    setSelectedLanguage(languageCode);
    localStorage.setItem("site-language", languageCode);
    document.documentElement.lang = languageCode;

    window.dispatchEvent(
      new CustomEvent<LanguageCode>("languagechange", {
        detail: languageCode,
      }),
    );
  }

  return (
    <div className="flex items-center rounded-2xl border border-gray-200 bg-white px-3 py-2 shadow-sm">
      <label
        className="mr-2 flex h-5 w-5 items-center justify-center text-gray-600"
        htmlFor="language-switcher"
        aria-label="Vybrat jazyk"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18Z" />
          <path d="M3.6 9h16.8" />
          <path d="M3.6 15h16.8" />
          <path d="M12 3c2.1 2.2 3.2 5.2 3.2 9s-1.1 6.8-3.2 9" />
          <path d="M12 3c-2.1 2.2-3.2 5.2-3.2 9s1.1 6.8 3.2 9" />
        </svg>
      </label>

      <select
        id="language-switcher"
        value={selectedLanguage}
        onChange={(event) => changeLanguage(event.target.value as LanguageCode)}
        className="cursor-pointer bg-transparent text-sm font-black text-gray-900 outline-none"
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.short}
          </option>
        ))}
      </select>
    </div>
  );
}
