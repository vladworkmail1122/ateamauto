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
    serviceTitle: "ATEAM Service & Detailing",
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
    serviceTitle: "ATEAM Service & Detailing",
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
    serviceTitle: "ATEAM Service & Detailing",
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
    serviceTitle: "ATEAM Service & Detailing",
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

function ServiceFrame() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      viewBox="0 0 340 78"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M 36 2 L 318 2 Q 336 2 332 18 L 320 60 Q 316 76 298 76 L 22 76 Q 4 76 8 60 L 20 18 Q 24 2 36 2 Z"
        fill="white"
        stroke="#f97316"
        strokeWidth="2.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function ServiceButton({
  label,
  onClick,
  mobile = false,
}: {
  label: string;
  onClick?: () => void;
  mobile?: boolean;
}) {
  return (
    <Link
      href="/service"
      onClick={onClick}
      aria-label={label}
      className={`group relative shrink-0 transition hover:-translate-y-0.5 ${
        mobile ? "block w-full" : "hidden xl:block"
      }`}
    >
      <div
        className={`relative overflow-visible drop-shadow-[0_10px_14px_rgba(249,115,22,0.18)] transition group-hover:drop-shadow-[0_12px_18px_rgba(249,115,22,0.28)] ${
          mobile ? "h-[112px] w-full" : "h-[78px] w-[340px]"
        }`}
      >
        <ServiceFrame />

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`relative flex h-full w-full items-center justify-center overflow-hidden ${
              mobile ? "px-8 py-3" : "px-7 py-1.5"
            }`}
            style={{
              clipPath:
                "polygon(11% 6%, 93% 6%, 89% 94%, 6% 94%)",
            }}
          >
            <Image
              src="/service-button.png"
              alt={label}
              width={660}
              height={140}
              className="h-full w-full object-contain object-center"
              priority={false}
            />
          </div>
        </div>
      </div>
    </Link>
  );
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
    <header className="sticky top-0 z-50 border-b bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4 py-3">
          <div className="flex min-w-0 items-center gap-3 lg:gap-5">
            <Link href="/" className="flex shrink-0 items-center">
              <Image
                src="/logo.png"
                alt="ATEAM AUTO"
                width={500}
                height={140}
                className="h-14 w-auto object-contain sm:h-20"
                priority
              />
            </Link>

            <ServiceButton label={t.serviceTitle} />
          </div>

          <nav className="hidden items-center gap-5 text-sm font-semibold lg:flex">
            {menuKeys.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap transition hover:text-orange-600"
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
              className="whitespace-nowrap rounded-xl bg-orange-600 px-4 py-3 font-semibold text-white transition hover:bg-orange-700"
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
            <ServiceButton
              label={t.serviceTitle}
              mobile
              onClick={() => setIsOpen(false)}
            />

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
