"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type LanguageCode = "cs" | "en" | "uk" | "ru";

const phone = "+420 723 964 647";
const phoneHref = "tel:+420723964647";

const whatsappText = encodeURIComponent(
  "Dobrý den, chci se objednat do ATEAM Service & Detailing.",
);

const whatsappHref = `https://wa.me/420723964647?text=${whatsappText}`;

const translations = {
  cs: {
    eyebrow: "ATEAM SERVICE & DETAILING",
    title: "Autoservis, detailing a úpravy vozidel",
    subtitle:
      "Kompletní péče o vaše auto: diagnostika, servis, detailing, leštění, lakování, fólie, chip tuning, audio a další služby.",
    book: "Objednat se",
    call: "Zavolat",
    whatsapp: "Napsat na WhatsApp",
    viewCars: "Zobrazit auta",
    locationLabel: "Lokalita",
    location: "Jihlava / Česká republika",
    phoneLabel: "Telefon",
    fastContact: "Rychlá domluva přes telefon nebo WhatsApp.",
    servicesTitle: "Naše služby",
    servicesSubtitle:
      "Vyberte službu, napište nám a domluvíme termín podle auta a rozsahu práce.",
    whyTitle: "Proč ATEAM?",
    whySubtitle:
      "Praktický servis, reálná diagnostika a individuální přístup ke každému autu.",
    processTitle: "Jak probíhá objednávka",
    galleryTitle: "Co umíme pro vaše auto",
    ctaTitle: "Chcete se objednat?",
    ctaText:
      "Pošlete nám fotky auta, popis problému nebo požadovanou službu. Ozveme se s možností termínu a orientační cenou.",
    services: [
      {
        title: "Autoservis a diagnostika",
        text: "Diagnostika závad, mechanické opravy, servisní údržba, brzdy, podvozek, motor a běžné opravy.",
      },
      {
        title: "Detailing interiéru a exteriéru",
        text: "Čištění interiéru, tepování, dekontaminace laku, ochrana povrchů a kompletní péče o vzhled auta.",
      },
      {
        title: "Leštění a renovace laku",
        text: "Jednokrokové, dvoukrokové a vícekrokové leštění podle stavu laku a požadovaného výsledku.",
      },
      {
        title: "Lakování a lokální opravy",
        text: "Opravy poškození, lokální opravy, příprava dílů a lakýrnické práce dle domluvy.",
      },
      {
        title: "Fólie, tónování a ochrana",
        text: "Tónování oken, fólie na světla, ochranné fólie PPF a změna vzhledu auta.",
      },
      {
        title: "Renovace světlometů",
        text: "Leštění světel, obnova průhlednosti a možnost ochrany fólií.",
      },
      {
        title: "Chip tuning a úpravy",
        text: "Stage úpravy, diagnostika výkonu, EGR/DPF/AdBlue řešení dle technického stavu a legislativních možností.",
      },
      {
        title: "Auto audio a doplňky",
        text: "Montáž multimédií, kamer, ambientního osvětlení, DSP, zesilovačů a odhlučnění.",
      },
      {
        title: "Odtah a pomoc s vozidlem",
        text: "Pomoc s nepojízdným autem, převoz vozidel a řešení servisní logistiky dle domluvy.",
      },
    ],
    whyItems: [
      "Vlastní dílna a technické zázemí",
      "Diagnostika před výměnou dílů",
      "Možnost kombinovat servis, detailing a úpravy",
      "Srozumitelná domluva a fotodokumentace práce",
    ],
    process: [
      "Napíšete nebo zavoláte",
      "Pošlete fotky / popis problému",
      "Domluvíme rozsah práce a termín",
      "Auto předáme po kontrole výsledku",
    ],
    highlights: [
      "Diagnostika",
      "Leštění",
      "Detailing",
      "Lakování",
      "Fólie",
      "Chip tuning",
      "Audio",
      "STK pomoc",
    ],
  },
  en: {
    eyebrow: "ATEAM SERVICE & DETAILING",
    title: "Car service, detailing and vehicle upgrades",
    subtitle:
      "Complete care for your car: diagnostics, service, detailing, polishing, paint work, wraps, chip tuning, audio and more.",
    book: "Book now",
    call: "Call",
    whatsapp: "Message on WhatsApp",
    viewCars: "View cars",
    locationLabel: "Location",
    location: "Jihlava / Czech Republic",
    phoneLabel: "Phone",
    fastContact: "Fast arrangement by phone or WhatsApp.",
    servicesTitle: "Our services",
    servicesSubtitle:
      "Choose a service, message us and we will arrange a time based on the vehicle and scope of work.",
    whyTitle: "Why ATEAM?",
    whySubtitle:
      "Practical service, real diagnostics and an individual approach to every car.",
    processTitle: "How booking works",
    galleryTitle: "What we can do for your car",
    ctaTitle: "Want to book?",
    ctaText:
      "Send us photos of the car, a problem description or the service you need. We will reply with an available time and an estimated price.",
    services: [
      {
        title: "Car service and diagnostics",
        text: "Fault diagnostics, mechanical repairs, maintenance, brakes, suspension, engine and common repairs.",
      },
      {
        title: "Interior and exterior detailing",
        text: "Interior cleaning, wet vacuuming, paint decontamination, surface protection and full visual care.",
      },
      {
        title: "Paint polishing and restoration",
        text: "One-step, two-step and multi-step polishing based on paint condition and desired result.",
      },
      {
        title: "Paint work and local repairs",
        text: "Damage repairs, local paint corrections, part preparation and paint work by arrangement.",
      },
      {
        title: "Wraps, tinting and protection",
        text: "Window tinting, headlight films, PPF protection and visual changes.",
      },
      {
        title: "Headlight restoration",
        text: "Headlight polishing, clarity restoration and optional film protection.",
      },
      {
        title: "Chip tuning and modifications",
        text: "Stage tuning, performance diagnostics and EGR/DPF/AdBlue solutions according to technical condition and legal possibilities.",
      },
      {
        title: "Car audio and accessories",
        text: "Multimedia, cameras, ambient lighting, DSP, amplifiers and sound insulation installation.",
      },
      {
        title: "Towing and vehicle help",
        text: "Help with non-running cars, vehicle transport and service logistics by arrangement.",
      },
    ],
    whyItems: [
      "Own workshop and technical equipment",
      "Diagnostics before replacing parts",
      "Service, detailing and upgrades in one place",
      "Clear communication and work photo documentation",
    ],
    process: [
      "You message or call us",
      "You send photos / problem description",
      "We agree on scope and date",
      "The car is handed over after final check",
    ],
    highlights: [
      "Diagnostics",
      "Polishing",
      "Detailing",
      "Paint work",
      "Wraps",
      "Chip tuning",
      "Audio",
      "STK help",
    ],
  },
  uk: {
    eyebrow: "ATEAM SERVICE & DETAILING",
    title: "Автосервіс, детейлінг та доопрацювання авто",
    subtitle:
      "Комплексний догляд за авто: діагностика, сервіс, детейлінг, полірування, фарбування, плівки, chip tuning, аудіо та інші послуги.",
    book: "Записатися",
    call: "Подзвонити",
    whatsapp: "Написати в WhatsApp",
    viewCars: "Дивитися авто",
    locationLabel: "Локація",
    location: "Їглава / Чеська Республіка",
    phoneLabel: "Телефон",
    fastContact: "Швидка домовленість телефоном або через WhatsApp.",
    servicesTitle: "Наші послуги",
    servicesSubtitle:
      "Оберіть послугу, напишіть нам — і ми домовимося про час залежно від авто та обсягу роботи.",
    whyTitle: "Чому ATEAM?",
    whySubtitle:
      "Практичний сервіс, реальна діагностика та індивідуальний підхід до кожного авто.",
    processTitle: "Як проходить запис",
    galleryTitle: "Що ми можемо зробити для вашого авто",
    ctaTitle: "Хочете записатися?",
    ctaText:
      "Надішліть фото авто, опис проблеми або потрібну послугу. Ми відповімо з можливим терміном і орієнтовною ціною.",
    services: [
      {
        title: "Автосервіс і діагностика",
        text: "Діагностика несправностей, механічні ремонти, обслуговування, гальма, підвіска, двигун та типові ремонти.",
      },
      {
        title: "Детейлінг інтерʼєру та екстерʼєру",
        text: "Чистка салону, хімчистка, деконтамінація лаку, захист поверхонь і повний догляд за виглядом авто.",
      },
      {
        title: "Полірування та відновлення лаку",
        text: "Однокрокове, двокрокове та багатокрокове полірування залежно від стану лаку й бажаного результату.",
      },
      {
        title: "Фарбування та локальні ремонти",
        text: "Ремонт пошкоджень, локальне відновлення, підготовка деталей і малярні роботи за домовленістю.",
      },
      {
        title: "Плівки, тонування та захист",
        text: "Тонування скла, плівки на фари, захисна PPF-плівка і зміна зовнішнього вигляду авто.",
      },
      {
        title: "Відновлення фар",
        text: "Полірування фар, відновлення прозорості та можливий захист плівкою.",
      },
      {
        title: "Chip tuning та модифікації",
        text: "Stage налаштування, діагностика потужності, рішення EGR/DPF/AdBlue відповідно до технічного стану та законодавчих можливостей.",
      },
      {
        title: "Автоаудіо та доповнення",
        text: "Встановлення мультимедіа, камер, ambient-підсвітки, DSP, підсилювачів і шумоізоляції.",
      },
      {
        title: "Евакуатор і допомога з авто",
        text: "Допомога з нерухомим авто, перевезення авто і сервісна логістика за домовленістю.",
      },
    ],
    whyItems: [
      "Власна майстерня та технічна база",
      "Діагностика перед заміною деталей",
      "Сервіс, детейлінг і доопрацювання в одному місці",
      "Зрозуміла комунікація та фотофіксація роботи",
    ],
    process: [
      "Ви пишете або телефонуєте",
      "Надсилаєте фото / опис проблеми",
      "Домовляємося про обсяг і дату",
      "Авто передається після перевірки результату",
    ],
    highlights: [
      "Діагностика",
      "Полірування",
      "Детейлінг",
      "Фарбування",
      "Плівки",
      "Chip tuning",
      "Аудіо",
      "STK допомога",
    ],
  },
  ru: {
    eyebrow: "ATEAM SERVICE & DETAILING",
    title: "Автосервис, детейлинг и доработки авто",
    subtitle:
      "Комплексный уход за автомобилем: диагностика, сервис, детейлинг, полировка, покраска, плёнки, chip tuning, аудио и другие услуги.",
    book: "Записаться",
    call: "Позвонить",
    whatsapp: "Написать в WhatsApp",
    viewCars: "Смотреть авто",
    locationLabel: "Локация",
    location: "Йиглава / Чешская Республика",
    phoneLabel: "Телефон",
    fastContact: "Быстрая договорённость по телефону или через WhatsApp.",
    servicesTitle: "Наши услуги",
    servicesSubtitle:
      "Выберите услугу, напишите нам — и мы договоримся о времени в зависимости от автомобиля и объёма работы.",
    whyTitle: "Почему ATEAM?",
    whySubtitle:
      "Практичный сервис, реальная диагностика и индивидуальный подход к каждому автомобилю.",
    processTitle: "Как проходит запись",
    galleryTitle: "Что мы можем сделать для вашего авто",
    ctaTitle: "Хотите записаться?",
    ctaText:
      "Отправьте нам фото автомобиля, описание проблемы или нужную услугу. Мы ответим с возможным временем и ориентировочной ценой.",
    services: [
      {
        title: "Автосервис и диагностика",
        text: "Диагностика неисправностей, механические ремонты, обслуживание, тормоза, подвеска, двигатель и типовые ремонты.",
      },
      {
        title: "Детейлинг интерьера и экстерьера",
        text: "Чистка салона, химчистка, деконтаминация лака, защита поверхностей и полный уход за внешним видом авто.",
      },
      {
        title: "Полировка и восстановление лака",
        text: "Одноэтапная, двухэтапная и многоэтапная полировка по состоянию лака и желаемому результату.",
      },
      {
        title: "Покраска и локальные ремонты",
        text: "Ремонт повреждений, локальное восстановление, подготовка деталей и малярные работы по договорённости.",
      },
      {
        title: "Плёнки, тонировка и защита",
        text: "Тонировка стёкол, плёнки на фары, защитная PPF-плёнка и изменение внешнего вида авто.",
      },
      {
        title: "Восстановление фар",
        text: "Полировка фар, восстановление прозрачности и возможная защита плёнкой.",
      },
      {
        title: "Chip tuning и модификации",
        text: "Stage-настройки, диагностика мощности, решения EGR/DPF/AdBlue с учётом технического состояния и законодательных возможностей.",
      },
      {
        title: "Автоаудио и дооснащение",
        text: "Установка мультимедиа, камер, ambient-подсветки, DSP, усилителей и шумоизоляции.",
      },
      {
        title: "Эвакуатор и помощь с авто",
        text: "Помощь с неходовым авто, перевозка автомобилей и сервисная логистика по договорённости.",
      },
    ],
    whyItems: [
      "Своя мастерская и техническая база",
      "Диагностика перед заменой деталей",
      "Сервис, детейлинг и доработки в одном месте",
      "Понятная коммуникация и фотофиксация работы",
    ],
    process: [
      "Вы пишете или звоните",
      "Отправляете фото / описание проблемы",
      "Согласовываем объём и дату",
      "Авто отдаётся после проверки результата",
    ],
    highlights: [
      "Диагностика",
      "Полировка",
      "Детейлинг",
      "Покраска",
      "Плёнки",
      "Chip tuning",
      "Аудио",
      "STK помощь",
    ],
  },
};

function isLanguageCode(value: string | null): value is LanguageCode {
  return value === "cs" || value === "en" || value === "uk" || value === "ru";
}

export default function ServicePageClient() {
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
    <main className="min-h-screen bg-gray-50">
      <section className="relative overflow-hidden bg-gray-950 px-4 py-16 text-white sm:px-6 lg:py-24">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-orange-600 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-orange-500 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-orange-400">
              {t.eyebrow}
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">
              {t.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
              {t.subtitle}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-orange-600 px-6 py-4 text-center text-lg font-bold text-white shadow-lg shadow-orange-600/20 hover:bg-orange-700"
              >
                {t.book}
              </a>

              <a
                href={phoneHref}
                className="rounded-2xl border border-white/20 px-6 py-4 text-center text-lg font-bold text-white hover:bg-white hover:text-gray-950"
              >
                {t.call}
              </a>

              <Link
                href="/cars"
                className="rounded-2xl border border-white/20 px-6 py-4 text-center text-lg font-bold text-white hover:bg-white hover:text-gray-950"
              >
                {t.viewCars}
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
            <div className="grid gap-4">
              <div className="rounded-2xl bg-white p-5 text-gray-900">
                <p className="text-sm font-bold uppercase text-gray-500">
                  {t.phoneLabel}
                </p>
                <a
                  href={phoneHref}
                  className="mt-2 block text-2xl font-black text-orange-600 hover:underline"
                >
                  {phone}
                </a>
                <p className="mt-2 text-sm text-gray-500">{t.fastContact}</p>
              </div>

              <div className="rounded-2xl bg-white p-5 text-gray-900">
                <p className="text-sm font-bold uppercase text-gray-500">
                  {t.locationLabel}
                </p>
                <p className="mt-2 text-2xl font-black">{t.location}</p>
              </div>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-green-600 px-5 py-4 text-center text-lg font-bold text-white hover:bg-green-700"
              >
                {t.whatsapp}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black text-gray-900 sm:text-4xl">
              {t.servicesTitle}
            </h2>
            <p className="mt-3 text-lg leading-8 text-gray-600">
              {t.servicesSubtitle}
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {t.services.map((service) => (
              <div
                key={service.title}
                className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="text-xl font-black text-gray-900">
                  {service.title}
                </h3>
                <p className="mt-3 leading-7 text-gray-600">{service.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-gray-950 p-6 text-white sm:p-8">
            <h2 className="text-3xl font-black">{t.whyTitle}</h2>
            <p className="mt-3 leading-7 text-gray-300">{t.whySubtitle}</p>

            <div className="mt-6 grid gap-3">
              {t.whyItems.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/10 p-4 font-semibold"
                >
                  ✓ {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-gray-50 p-6 sm:p-8">
            <h2 className="text-3xl font-black text-gray-900">
              {t.processTitle}
            </h2>

            <div className="mt-6 grid gap-4">
              {t.process.map((item, index) => (
                <div key={item} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-600 font-black text-white">
                    {index + 1}
                  </div>
                  <div className="rounded-2xl bg-white p-4 font-semibold text-gray-800 shadow-sm ring-1 ring-gray-100">
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-black text-gray-900 sm:text-4xl">
            {t.galleryTitle}
          </h2>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {t.highlights.map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-white p-5 text-center font-black text-gray-900 shadow-sm ring-1 ring-gray-100"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:pb-24">
        <div className="mx-auto max-w-7xl rounded-3xl bg-orange-600 p-8 text-white shadow-xl sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div>
            <h2 className="text-3xl font-black sm:text-4xl">{t.ctaTitle}</h2>
            <p className="mt-3 max-w-3xl text-lg leading-8 text-orange-50">
              {t.ctaText}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-white px-6 py-4 text-center text-lg font-black text-orange-600 hover:bg-orange-50"
            >
              {t.whatsapp}
            </a>

            <a
              href={phoneHref}
              className="rounded-2xl border border-white/40 px-6 py-4 text-center text-lg font-black text-white hover:bg-white hover:text-orange-600"
            >
              {phone}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
