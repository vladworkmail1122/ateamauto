"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

type LanguageCode = "cs" | "en" | "uk" | "ru";

const translations = {
  cs: {
    home: "Hlavní",
    cars: "Vozidla",
    sell: "Prodat auto",
    contact: "Kontakt",
    login: "Přihlášení",
    register: "Registrace",
    account: "Můj účet",
    openMenu: "Otevřít menu",
  },
  en: {
    home: "Home",
    cars: "Cars",
    sell: "Sell car",
    contact: "Contact",
    login: "Login",
    register: "Register",
    account: "My account",
    openMenu: "Open menu",
  },
  uk: {
    home: "Головна",
    cars: "Авто",
    sell: "Продати авто",
    contact: "Контакти",
    login: "Вхід",
    register: "Реєстрація",
    account: "Мій кабінет",
    openMenu: "Відкрити меню",
  },
  ru: {
    home: "Главная",
    cars: "Авто",
    sell: "Продать авто",
    contact: "Контакты",
    login: "Вход",
    register: "Регистрация",
    account: "Мой кабинет",
    openMenu: "Открыть меню",
  },
};

const menuKeys = [
  { href: "/", key: "home" },
  { href: "/cars", key: "cars" },
  { href: "/sell", key: "sell" },
  { href: "/contact", key: "contact" },
  { href: "/login", key: "login" },
  { href: "/register", key: "register" },
] as const;

function getSavedLanguage(): LanguageCode {
  if (typeof window === "undefined") return "cs";

  const savedLanguage = localStorage.getItem("site-language");

  if (
    savedLanguage === "cs" ||
    savedLanguage === "en" ||
    savedLanguage === "uk" ||
    savedLanguage === "ru"
  ) {
    return savedLanguage;
  }

  return "cs";
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<LanguageCode>("cs");

  useEffect(() => {
    setLanguage(getSavedLanguage());

    function handleLanguageChange(event: Event) {
      const customEvent = event as CustomEvent<LanguageCode>;

      if (
        customEvent.detail === "cs" ||
        customEvent.detail === "en" ||
        customEvent.detail === "uk" ||
        customEvent.detail === "ru"
      ) {
        setLanguage(customEvent.detail);
      }
    }

    window.addEventListener("languagechange", handleLanguageChange);

    return () => {
      window.removeEventListener("languagechange", handleLanguageChange);
    };
  }, []);

  const t = translations[language];

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="ATEAM AUTO"
              width={500}
              height={140}
              className="h-14 w-auto object-contain sm:h-20"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-semibold lg:flex">
            {menuKeys.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-orange-600"
              >
                {t[link.key]}
              </Link>
            ))}

            <LanguageSwitcher />

            <Link
              href="/dashboard"
              className="rounded-xl bg-orange-600 px-4 py-3 font-semibold text-white transition hover:bg-orange-700"
            >
              {t.account}
            </Link>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher />

            <button
              type="button"
              onClick={() => setIsOpen((current) => !current)}
              className="rounded-xl border px-4 py-2 text-2xl font-bold"
              aria-label={t.openMenu}
            >
              {isOpen ? "×" : "☰"}
            </button>
          </div>
        </div>

        {isOpen && (
          <nav className="grid gap-2 border-t py-4 text-base font-semibold lg:hidden">
            {menuKeys.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-4 py-3 hover:bg-gray-100"
              >
                {t[link.key]}
              </Link>
            ))}

            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="rounded-xl bg-orange-600 px-4 py-3 text-center font-semibold text-white hover:bg-orange-700"
            >
              {t.account}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
