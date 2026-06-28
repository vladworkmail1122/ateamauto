"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type LanguageCode = "cs" | "en" | "uk" | "ru";

const translations = {
  cs: {
    description:
      "ATEAM AUTO MARKETPLACE CZECHIA — prodej, nákup a prezentace vozidel v České republice.",
    quickLinks: "Rychlé odkazy",
    home: "Hlavní",
    cars: "Vozidla",
    vinCheck: "Kontrola VIN",
    sellCar: "Prodat auto",
    myAccount: "Můj účet",
    services: "Služby",
    serviceSale: "Prodej a nákup vozidel",
    serviceCheck: "Kontrola auta před koupí",
    serviceRepair: "Autoservis a diagnostika",
    serviceStk: "Příprava na STK",
    serviceDocs: "Vyřízení dokumentů",
    serviceBuyout: "Rychlý výkup vozidel",
    contact: "Kontakt",
    location: "Jihlava, Česká republika",
    rights: "Všechna práva vyhrazena.",
    marketplace: "Auto marketplace Czechia",
  },
  en: {
    description:
      "ATEAM AUTO MARKETPLACE CZECHIA — vehicle sales, purchases and presentation in the Czech Republic.",
    quickLinks: "Quick links",
    home: "Home",
    cars: "Vehicles",
    vinCheck: "VIN check",
    sellCar: "Sell car",
    myAccount: "My account",
    services: "Services",
    serviceSale: "Vehicle sales and purchases",
    serviceCheck: "Pre-purchase car inspection",
    serviceRepair: "Car service and diagnostics",
    serviceStk: "STK preparation",
    serviceDocs: "Document handling",
    serviceBuyout: "Fast vehicle buyout",
    contact: "Contact",
    location: "Jihlava, Czech Republic",
    rights: "All rights reserved.",
    marketplace: "Auto marketplace Czechia",
  },
  uk: {
    description:
      "ATEAM AUTO MARKETPLACE CZECHIA — продаж, купівля та презентація авто в Чеській Республіці.",
    quickLinks: "Швидкі посилання",
    home: "Головна",
    cars: "Авто",
    vinCheck: "Перевірка VIN",
    sellCar: "Продати авто",
    myAccount: "Мій кабінет",
    services: "Послуги",
    serviceSale: "Продаж і купівля авто",
    serviceCheck: "Перевірка авто перед купівлею",
    serviceRepair: "Автосервіс і діагностика",
    serviceStk: "Підготовка до STK",
    serviceDocs: "Оформлення документів",
    serviceBuyout: "Швидкий викуп авто",
    contact: "Контакт",
    location: "Їглава, Чеська Республіка",
    rights: "Усі права захищені.",
    marketplace: "Автомаркетплейс Чехія",
  },
  ru: {
    description:
      "ATEAM AUTO MARKETPLACE CZECHIA — продажа, покупка и презентация авто в Чешской Республике.",
    quickLinks: "Быстрые ссылки",
    home: "Главная",
    cars: "Авто",
    vinCheck: "Проверка VIN",
    sellCar: "Продать авто",
    myAccount: "Мой кабинет",
    services: "Услуги",
    serviceSale: "Продажа и покупка авто",
    serviceCheck: "Проверка авто перед покупкой",
    serviceRepair: "Автосервис и диагностика",
    serviceStk: "Подготовка к STK",
    serviceDocs: "Оформление документов",
    serviceBuyout: "Быстрый выкуп авто",
    contact: "Контакт",
    location: "Йиглава, Чешская Республика",
    rights: "Все права защищены.",
    marketplace: "Автомаркетплейс Чехия",
  },
};

function isLanguageCode(value: string | null): value is LanguageCode {
  return value === "cs" || value === "en" || value === "uk" || value === "ru";
}

export default function Footer() {
  const [language, setLanguage] = useState<LanguageCode>("cs");

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

  const t = translations[language];

  return (
    <footer className="border-t bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/logo.png"
                alt="ATEAM AUTO"
                width={300}
                height={90}
                className="h-16 w-auto rounded bg-white object-contain p-2"
              />
            </Link>

            <p className="mt-4 text-sm leading-6 text-gray-300">
              {t.description}
            </p>
          </div>

          <div>
            <h3 className="font-bold">{t.quickLinks}</h3>

            <div className="mt-4 grid gap-3 text-sm text-gray-300">
              <Link href="/" className="hover:text-orange-500">
                {t.home}
              </Link>

              <Link href="/cars" className="hover:text-orange-500">
                {t.cars}
              </Link>

              <Link
                href="/vin-check"
                className="text-gray-400 transition hover:text-white"
              >
                {t.vinCheck}
              </Link>

              <Link href="/sell" className="hover:text-orange-500">
                {t.sellCar}
              </Link>

              <Link href="/dashboard" className="hover:text-orange-500">
                {t.myAccount}
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold">{t.services}</h3>

            <div className="mt-4 grid gap-3 text-sm text-gray-300">
              <p>{t.serviceSale}</p>
              <p>{t.serviceCheck}</p>
              <p>{t.serviceRepair}</p>
              <p>{t.serviceStk}</p>
              <p>{t.serviceDocs}</p>
              <p>{t.serviceBuyout}</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold">{t.contact}</h3>

            <div className="mt-4 grid gap-3 text-sm text-gray-300">
              <a href="tel:+420723964647" className="hover:text-orange-500">
                +420 723 964 647
              </a>

              <a
                href="https://wa.me/420723964647"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-green-600 px-4 py-3 text-center font-semibold text-white hover:bg-green-700"
              >
                WhatsApp
              </a>

              <Link
                href="/contact"
                className="rounded-xl border border-white/20 px-4 py-3 text-center font-semibold text-white hover:bg-white hover:text-gray-900"
              >
                {t.contact}
              </Link>

              <p>{t.location}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-gray-400">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} ATEAM AUTO. {t.rights}
            </p>

            <p>{t.marketplace}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
