"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type LanguageCode = "cs" | "en" | "uk" | "ru";

const translations = {
  cs: {
    eyebrow: "ATEAM AUTO",
    title: "Kontaktujte nás",
    subtitle:
      "Máte zájem o vozidlo, chcete přidat inzerát nebo potřebujete poradit s autem? Ozvěte se nám telefonicky, přes WhatsApp nebo e-mailem.",
    phoneTitle: "Telefon",
    phoneText: "Pro rychlou domluvu volejte nebo pište.",
    whatsappTitle: "WhatsApp",
    whatsappButton: "Napsat na WhatsApp",
    whatsappText: "Nejrychlejší způsob kontaktu.",
    locationTitle: "Lokalita",
    locationText: "Česká republika. Vozidla a služby dle domluvy.",
    helpTitle: "S čím vám pomůžeme?",
    services: [
      "🚗 Prodej a nákup vozidel",
      "🔍 Kontrola auta před koupí",
      "🛠️ Autoservis a diagnostika",
      "📸 Přidání a správa inzerátu",
      "✅ Příprava a pomoc s absolvováním STK",
      "🛡️ Autopojištění",
      "📄 Vyřízení dokumentů",
      "⚡ Rychlý výkup vozidel",
      "📢 Reklama",
    ],
    quickTitle: "Rychlá akce",
    quickText:
      "Chcete rovnou prodat auto? Přidejte inzerát během pár minut nebo nám napište pro rychlou domluvu.",
    addListing: "Přidat inzerát",
    browseCars: "Prohlížet auta",
    call: "Zavolat",
  },
  en: {
    eyebrow: "ATEAM AUTO",
    title: "Contact us",
    subtitle:
      "Interested in a vehicle, want to add a listing or need advice with a car? Contact us by phone, WhatsApp or e-mail.",
    phoneTitle: "Phone",
    phoneText: "Call or message us for a quick arrangement.",
    whatsappTitle: "WhatsApp",
    whatsappButton: "Message on WhatsApp",
    whatsappText: "The fastest way to contact us.",
    locationTitle: "Location",
    locationText: "Czech Republic. Vehicles and services by arrangement.",
    helpTitle: "How can we help?",
    services: [
      "🚗 Vehicle sales and purchases",
      "🔍 Pre-purchase car inspection",
      "🛠️ Car service and diagnostics",
      "📸 Listing creation and management",
      "✅ STK preparation and assistance",
      "🛡️ Car insurance",
      "📄 Document handling",
      "⚡ Fast vehicle buyout",
      "📢 Advertising",
    ],
    quickTitle: "Quick action",
    quickText:
      "Want to sell your car right away? Add a listing in a few minutes or message us for a quick arrangement.",
    addListing: "Add listing",
    browseCars: "Browse cars",
    call: "Call",
  },
  uk: {
    eyebrow: "ATEAM AUTO",
    title: "Звʼяжіться з нами",
    subtitle:
      "Цікавить авто, хочете додати оголошення або потрібна порада щодо автомобіля? Напишіть або подзвоніть нам, також можна через WhatsApp чи e-mail.",
    phoneTitle: "Телефон",
    phoneText: "Для швидкої домовленості телефонуйте або пишіть.",
    whatsappTitle: "WhatsApp",
    whatsappButton: "Написати в WhatsApp",
    whatsappText: "Найшвидший спосіб звʼязку.",
    locationTitle: "Локація",
    locationText: "Чеська Республіка. Авто та послуги за домовленістю.",
    helpTitle: "З чим ми допоможемо?",
    services: [
      "🚗 Продаж і купівля авто",
      "🔍 Перевірка авто перед купівлею",
      "🛠️ Автосервіс і діагностика",
      "📸 Додавання та керування оголошенням",
      "✅ Підготовка і допомога з проходженням STK",
      "🛡️ Автострахування",
      "📄 Оформлення документів",
      "⚡ Швидкий викуп авто",
      "📢 Реклама",
    ],
    quickTitle: "Швидка дія",
    quickText:
      "Хочете одразу продати авто? Додайте оголошення за кілька хвилин або напишіть нам для швидкої домовленості.",
    addListing: "Додати оголошення",
    browseCars: "Дивитися авто",
    call: "Подзвонити",
  },
  ru: {
    eyebrow: "ATEAM AUTO",
    title: "Свяжитесь с нами",
    subtitle:
      "Интересует автомобиль, хотите добавить объявление или нужна помощь с авто? Напишите или позвоните нам, также можно через WhatsApp или e-mail.",
    phoneTitle: "Телефон",
    phoneText: "Для быстрой договорённости звоните или пишите.",
    whatsappTitle: "WhatsApp",
    whatsappButton: "Написать в WhatsApp",
    whatsappText: "Самый быстрый способ связи.",
    locationTitle: "Локация",
    locationText: "Чешская Республика. Авто и услуги по договорённости.",
    helpTitle: "С чем мы поможем?",
    services: [
      "🚗 Продажа и покупка авто",
      "🔍 Проверка авто перед покупкой",
      "🛠️ Автосервис и диагностика",
      "📸 Добавление и управление объявлением",
      "✅ Подготовка и помощь с прохождением STK",
      "🛡️ Автострахование",
      "📄 Оформление документов",
      "⚡ Быстрый выкуп авто",
      "📢 Реклама",
    ],
    quickTitle: "Быстрое действие",
    quickText:
      "Хотите сразу продать авто? Добавьте объявление за несколько минут или напишите нам для быстрой договорённости.",
    addListing: "Добавить объявление",
    browseCars: "Смотреть авто",
    call: "Позвонить",
  },
};

function isLanguageCode(value: string | null): value is LanguageCode {
  return value === "cs" || value === "en" || value === "uk" || value === "ru";
}

export default function ContactPageClient() {
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
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-3xl bg-white p-6 shadow sm:p-10">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange-600">
              {t.eyebrow}
            </p>

            <h1 className="text-3xl font-bold text-gray-900 sm:text-5xl">
              {t.title}
            </h1>

            <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg">
              {t.subtitle}
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border bg-gray-50 p-5">
              <h2 className="text-xl font-bold">{t.phoneTitle}</h2>

              <a
                href="tel:+420723964647"
                className="mt-3 block text-2xl font-bold text-orange-600 hover:underline"
              >
                +420 723 964 647
              </a>

              <p className="mt-2 text-sm text-gray-500">{t.phoneText}</p>
            </div>

            <div className="rounded-2xl border bg-gray-50 p-5">
              <h2 className="text-xl font-bold">{t.whatsappTitle}</h2>

              <a
                href="https://wa.me/420723964647"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block rounded-xl bg-green-600 px-4 py-3 text-center font-semibold text-white hover:bg-green-700"
              >
                {t.whatsappButton}
              </a>

              <p className="mt-2 text-sm text-gray-500">{t.whatsappText}</p>
            </div>

            <div className="rounded-2xl border bg-gray-50 p-5">
              <h2 className="text-xl font-bold">{t.locationTitle}</h2>

              <p className="mt-3 text-2xl font-bold text-gray-900">Jihlava</p>

              <p className="mt-2 text-sm text-gray-500">{t.locationText}</p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow sm:p-8">
            <h2 className="text-2xl font-bold">{t.helpTitle}</h2>

            <div className="mt-5 grid gap-3">
              {t.services.map((service) => (
                <div
                  key={service}
                  className="rounded-2xl border bg-gray-50 p-4"
                >
                  {service}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-gray-900 p-6 text-white shadow sm:p-8">
            <h2 className="text-2xl font-bold">{t.quickTitle}</h2>

            <p className="mt-3 text-gray-300">{t.quickText}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link
                href="/sell"
                className="rounded-xl bg-orange-600 px-5 py-3 text-center font-semibold text-white hover:bg-orange-700"
              >
                {t.addListing}
              </Link>

              <Link
                href="/cars"
                className="rounded-xl border border-white/20 px-5 py-3 text-center font-semibold text-white hover:bg-white hover:text-gray-900"
              >
                {t.browseCars}
              </Link>

              <a
                href="tel:+420723964647"
                className="rounded-xl border border-white/20 px-5 py-3 text-center font-semibold text-white hover:bg-white hover:text-gray-900"
              >
                {t.call}
              </a>

              <a
                href="https://wa.me/420723964647"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-green-600 px-5 py-3 text-center font-semibold text-white hover:bg-green-700"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
