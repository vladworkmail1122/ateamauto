"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import LanguageSwitcher from "./LanguageSwitcher";

type LanguageCode = "cs" | "en" | "uk" | "ru";

const translations = {
  cs: {
    home: "Hlavní",
    cars: "Vozidla",
    sell: "Prodat auto",
    contact: "Kontakt",
    loginOrRegister: "Přihlášení / registrace",
    account: "Můj účet",
    admin: "Admin",
    openMenu: "Otevřít menu",
  },
  en: {
    home: "Home",
    cars: "Cars",
    sell: "Sell car",
    contact: "Contact",
    loginOrRegister: "Login / Register",
    account: "My account",
    admin: "Admin",
    openMenu: "Open menu",
  },
  uk: {
    home: "Головна",
    cars: "Авто",
    sell: "Продати авто",
    contact: "Контакти",
    loginOrRegister: "Вхід / реєстрація",
    account: "Мій кабінет",
    admin: "Адмін",
    openMenu: "Відкрити меню",
  },
  ru: {
    home: "Главная",
    cars: "Авто",
    sell: "Продать авто",
    contact: "Контакты",
    loginOrRegister: "Вход / регистрация",
    account: "Мой кабинет",
    admin: "Админ",
    openMenu: "Открыть меню",
  },
};

const menuKeys = [
  { href: "/", key: "home" },
  { href: "/cars", key: "cars" },
  { href: "/sell", key: "sell" },
  { href: "/contact", key: "contact" },
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  useEffect(() => {
    async function checkUserAndAdmin() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        setIsLoggedIn(false);
        setIsAdmin(false);
        return;
      }

      setIsLoggedIn(true);

      const { data, error } = await supabase.rpc("is_admin");

      if (error) {
        setIsAdmin(false);
        return;
      }

      setIsAdmin(!!data);
    }

    checkUserAndAdmin();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      checkUserAndAdmin();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const t = translations[language];

  const accountHref = isLoggedIn ? "/dashboard" : "/login";
  const accountLabel = isLoggedIn ? t.account : t.loginOrRegister;

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

            {isAdmin && (
              <Link
                href="/admin"
                className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 font-semibold text-orange-700 transition hover:bg-orange-100"
              >
                {t.admin}
              </Link>
            )}

            <LanguageSwitcher />

            <Link
              href={accountHref}
              className="rounded-xl bg-orange-600 px-4 py-3 font-semibold text-white transition hover:bg-orange-700"
            >
              {accountLabel}
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

            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-center font-semibold text-orange-700 hover:bg-orange-100"
              >
                {t.admin}
              </Link>
            )}

            <Link
              href={accountHref}
              onClick={() => setIsOpen(false)}
              className="rounded-xl bg-orange-600 px-4 py-3 text-center font-semibold text-white hover:bg-orange-700"
            >
              {accountLabel}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
