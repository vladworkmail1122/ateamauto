"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type LanguageCode = "cs" | "en" | "uk" | "ru";

const phone = "+420 723 964 647";
const phoneHref = "tel:+420723964647";

function createWhatsAppLink(message: string) {
  return `https://wa.me/420723964647?text=${encodeURIComponent(message)}`;
}

const translations = {
  cs: {
    whatsappMessage:
      "Dobrý den, chci se objednat do ATEAM Service & Detailing.",
    eyebrow: "ATEAM SERVICE & DETAILING",
    titleTop: "Prémiový autoservis",
    titleBottom: "detailing a úpravy vozidel",
    subtitle:
      "Technický servis, diagnostika, odtah, chip tuning, kontrola před koupí a předprodejní příprava. Vedle toho detailing, leštění, čištění, lakování, fólie, světla, ambientní osvětlení a auto audio.",
    book: "Objednat se",
    call: "Zavolat",
    write: "Napsat na WhatsApp",
    cars: "Prohlédnout auta",
    locationLabel: "Lokalita",
    location: "Jihlava / Česká republika",
    phoneLabel: "Telefon",
    premiumBadge: "Service • Detailing • Tuning",
    heroCardTitle: "ATEAM studio",
    heroCardText:
      "Jedna dílna pro technický servis, kontrolu auta, vizuální péči a individuální úpravy.",
    serviceColumnTitle: "ATEAM Service",
    serviceColumnSubtitle:
      "Technika, diagnostika, odtah, chip tuning, kontrola a příprava vozidla.",
    detailingColumnTitle: "ATEAM Detailing",
    detailingColumnSubtitle:
      "Vzhled, lak, interiér, fólie, světla, ambient, ochrana a auto audio.",
    serviceItems: [
      {
        title: "Autoservis",
        text: "Údržba, mechanické opravy, brzdy, podvozek, motor a běžné servisní práce.",
      },
      {
        title: "Diagnostika",
        text: "Čtení závad, měření parametrů, hledání příčiny problému před výměnou dílů.",
      },
      {
        title: "Diagnostika před koupí auta",
        text: "Kontrola vozidla před nákupem, diagnostika, technický stav, rizika a doporučení.",
      },
      {
        title: "Předprodejní příprava",
        text: "Kontrola, základní servis, příprava auta na prodej a doporučení pro lepší prezentaci.",
      },
      {
        title: "Chip tuning",
        text: "Stage úpravy, diagnostika výkonu a EGR/DPF/AdBlue řešení dle technického stavu.",
      },
      {
        title: "Elektrika a kódování",
        text: "Řešení elektroniky, řídicích jednotek, retrofitů a základního kódování.",
      },
      {
        title: "Odtah vozidel",
        text: "Pomoc s nepojízdným autem, převoz vozidel a servisní logistika dle domluvy.",
      },
    ],
    detailingItems: [
      {
        title: "Detailing",
        text: "Kompletní péče o exteriér i interiér, dekontaminace, ochrana a finální úprava.",
      },
      {
        title: "Leštění laku",
        text: "Jednokrokové, dvoukrokové i vícekrokové leštění podle stavu laku.",
      },
      {
        title: "Čištění interiéru",
        text: "Hloubkové čištění, tepování, péče o plasty, kůži, textil a zápachy.",
      },
      {
        title: "Lakování a lokální opravy",
        text: "Lokální opravy, příprava dílů, lakýrnické práce a opravy poškození.",
      },
      {
        title: "Tónování a fólie",
        text: "Tónování oken, fólie na světla, ochranné fólie a změna vzhledu.",
      },
      {
        title: "Renovace světel a PPF",
        text: "Leštění světlometů, obnova průhlednosti a ochranná fólie na světla.",
      },
      {
        title: "Anti-rain ochrana",
        text: "Hydrofobní ochrana skel pro lepší odvod vody a komfort při jízdě v dešti.",
      },
      {
        title: "Ambientní osvětlení",
        text: "Montáž ambientního osvětlení interiéru a individuální světelné úpravy.",
      },
      {
        title: "Auto audio",
        text: "Multimédia, kamery, DSP, zesilovače, subwoofery a odhlučnění.",
      },
    ],
    whyTitle: "Proč vybrat ATEAM",
    whyItems: [
      "Servis, kontrola auta, detailing a úpravy v jednom místě",
      "Diagnostika před zbytečnou výměnou dílů",
      "Fotodokumentace práce a jasná domluva",
      "Možnost domluvit servis, odtah i následnou péči",
    ],
    processTitle: "Jak probíhá objednávka",
    process: [
      "Pošlete fotky auta nebo popis problému",
      "Doporučíme vhodný postup a orientační cenu",
      "Domluvíme termín a rozsah práce",
      "Auto předáme po kontrole výsledku",
    ],
    galleryTitle: "Dvě hlavní zóny",
    serviceZone: "Service zone",
    detailingZone: "Detailing studio",
    ctaTitle: "Chcete se objednat?",
    ctaText:
      "Pošlete nám fotky auta, požadovanou službu nebo popis závady. Odpovíme s možností termínu a orientační cenou.",
  },
  en: {
    whatsappMessage: "Hello, I want to book ATEAM Service & Detailing.",
    eyebrow: "ATEAM SERVICE & DETAILING",
    titleTop: "Premium car service",
    titleBottom: "detailing and vehicle upgrades",
    subtitle:
      "Technical service, diagnostics, towing, chip tuning, pre-purchase inspection and pre-sale preparation. Plus detailing, polishing, cleaning, paint work, films, headlights, ambient lighting and car audio.",
    book: "Book now",
    call: "Call",
    write: "Message on WhatsApp",
    cars: "View cars",
    locationLabel: "Location",
    location: "Jihlava / Czech Republic",
    phoneLabel: "Phone",
    premiumBadge: "Service • Detailing • Tuning",
    heroCardTitle: "ATEAM studio",
    heroCardText:
      "One workshop for technical service, vehicle inspection, visual care and individual upgrades.",
    serviceColumnTitle: "ATEAM Service",
    serviceColumnSubtitle:
      "Technical work, diagnostics, towing, chip tuning, inspection and vehicle preparation.",
    detailingColumnTitle: "ATEAM Detailing",
    detailingColumnSubtitle:
      "Appearance, paint, interior, films, headlights, ambient, protection and car audio.",
    serviceItems: [
      {
        title: "Car service",
        text: "Maintenance, mechanical repairs, brakes, suspension, engine and routine service work.",
      },
      {
        title: "Diagnostics",
        text: "Fault reading, live data checks and finding the real cause before replacing parts.",
      },
      {
        title: "Pre-purchase diagnostics",
        text: "Vehicle inspection before purchase, diagnostics, technical condition, risks and recommendations.",
      },
      {
        title: "Pre-sale preparation",
        text: "Inspection, basic service, preparation for sale and recommendations for better presentation.",
      },
      {
        title: "Chip tuning",
        text: "Stage tuning, performance diagnostics and EGR/DPF/AdBlue solutions based on technical condition.",
      },
      {
        title: "Electrics and coding",
        text: "Electronics, control units, retrofits and basic vehicle coding.",
      },
      {
        title: "Towing",
        text: "Help with non-running cars, vehicle transport and service logistics by arrangement.",
      },
    ],
    detailingItems: [
      {
        title: "Detailing",
        text: "Complete exterior and interior care, decontamination, protection and final finish.",
      },
      {
        title: "Paint polishing",
        text: "One-step, two-step and multi-step polishing based on paint condition.",
      },
      {
        title: "Interior deep cleaning",
        text: "Deep cleaning, wet vacuuming, plastics, leather, textile care and odour removal.",
      },
      {
        title: "Paint work and local repairs",
        text: "Local repairs, part preparation, paint work and damage repairs.",
      },
      {
        title: "Tinting and films",
        text: "Window tinting, headlight films, protective films and visual changes.",
      },
      {
        title: "Headlight restoration and PPF",
        text: "Headlight polishing, clarity restoration and protective film for headlights.",
      },
      {
        title: "Anti-rain protection",
        text: "Hydrophobic glass protection for better water runoff and comfort in rain.",
      },
      {
        title: "Ambient lighting",
        text: "Interior ambient lighting installation and individual lighting upgrades.",
      },
      {
        title: "Car audio",
        text: "Multimedia, cameras, DSP, amplifiers, subwoofers and sound insulation.",
      },
    ],
    whyTitle: "Why choose ATEAM",
    whyItems: [
      "Service, inspection, detailing and upgrades in one place",
      "Diagnostics before unnecessary part replacement",
      "Work photo documentation and clear communication",
      "Service, towing and aftercare can be arranged together",
    ],
    processTitle: "How booking works",
    process: [
      "Send photos of the car or describe the problem",
      "We recommend the right approach and estimated price",
      "We agree on date and scope of work",
      "The car is handed over after a final check",
    ],
    galleryTitle: "Two main zones",
    serviceZone: "Service zone",
    detailingZone: "Detailing studio",
    ctaTitle: "Want to book?",
    ctaText:
      "Send us photos of the car, the service you need or a fault description. We will reply with an available time and an estimated price.",
  },
  uk: {
    whatsappMessage:
      "Добрий день, хочу записатися в ATEAM Service & Detailing.",
    eyebrow: "ATEAM SERVICE & DETAILING",
    titleTop: "Преміальний автосервіс",
    titleBottom: "детейлінг і доопрацювання авто",
    subtitle:
      "Технічний сервіс, діагностика, евакуатор, chip tuning, перевірка перед купівлею і передпродажна підготовка. Плюс детейлінг, полірування, хімчистка, фарбування, плівки, фари, ambient-підсвітка та автозвук.",
    book: "Записатися",
    call: "Подзвонити",
    write: "Написати в WhatsApp",
    cars: "Дивитися авто",
    locationLabel: "Локація",
    location: "Їглава / Чеська Республіка",
    phoneLabel: "Телефон",
    premiumBadge: "Service • Detailing • Tuning",
    heroCardTitle: "ATEAM studio",
    heroCardText:
      "Одна майстерня для технічного сервісу, перевірки авто, візуального догляду та індивідуальних доопрацювань.",
    serviceColumnTitle: "ATEAM Service",
    serviceColumnSubtitle:
      "Техніка, діагностика, евакуатор, chip tuning, перевірка і підготовка автомобіля.",
    detailingColumnTitle: "ATEAM Detailing",
    detailingColumnSubtitle:
      "Зовнішній вигляд, лак, салон, плівки, фари, ambient, захист і автозвук.",
    serviceItems: [
      {
        title: "Автосервіс",
        text: "Обслуговування, механічні ремонти, гальма, підвіска, двигун і типові сервісні роботи.",
      },
      {
        title: "Діагностика",
        text: "Зчитування помилок, перевірка параметрів і пошук причини до заміни деталей.",
      },
      {
        title: "Діагностика перед купівлею авто",
        text: "Перевірка автомобіля перед купівлею, діагностика, технічний стан, ризики та рекомендації.",
      },
      {
        title: "Передпродажна підготовка",
        text: "Перевірка, базовий сервіс, підготовка авто до продажу і рекомендації для кращої презентації.",
      },
      {
        title: "Chip tuning",
        text: "Stage налаштування, діагностика потужності та рішення EGR/DPF/AdBlue за технічним станом.",
      },
      {
        title: "Електрика і кодування",
        text: "Електроніка, блоки керування, retrofit і базове кодування авто.",
      },
      {
        title: "Евакуатор",
        text: "Допомога з нерухомим авто, перевезення автомобілів і сервісна логістика.",
      },
    ],
    detailingItems: [
      {
        title: "Детейлінг",
        text: "Повний догляд за екстерʼєром та інтерʼєром, деконтамінація, захист і фінальний вигляд.",
      },
      {
        title: "Полірування лаку",
        text: "Однокрокове, двокрокове і багатокрокове полірування залежно від стану лаку.",
      },
      {
        title: "Хімчистка салону",
        text: "Глибоке очищення, хімчистка, догляд за пластиком, шкірою, тканиною і запахами.",
      },
      {
        title: "Фарбування і локальні ремонти",
        text: "Локальні ремонти, підготовка деталей, малярні роботи і ремонт пошкоджень.",
      },
      {
        title: "Тонування і плівки",
        text: "Тонування скла, плівки на фари, захисні плівки і зміна вигляду авто.",
      },
      {
        title: "Відновлення фар і PPF",
        text: "Полірування фар, відновлення прозорості та бронеплівка на фари.",
      },
      {
        title: "Антидощ",
        text: "Гідрофобний захист скла для кращого відведення води і комфорту під час дощу.",
      },
      {
        title: "Ambient-підсвітка",
        text: "Встановлення ambient-підсвітки салону та індивідуальні світлові доопрацювання.",
      },
      {
        title: "Автозвук",
        text: "Мультимедіа, камери, DSP, підсилювачі, сабвуфери і шумоізоляція.",
      },
    ],
    whyTitle: "Чому обирають ATEAM",
    whyItems: [
      "Сервіс, перевірка авто, детейлінг і доопрацювання в одному місці",
      "Діагностика перед зайвою заміною деталей",
      "Фотофіксація роботи і зрозуміла комунікація",
      "Можна домовитися про сервіс, евакуатор і подальший догляд",
    ],
    processTitle: "Як проходить запис",
    process: [
      "Надсилаєте фото авто або опис проблеми",
      "Ми рекомендуємо підхід і орієнтовну ціну",
      "Домовляємося про дату та обсяг роботи",
      "Видаємо авто після фінальної перевірки",
    ],
    galleryTitle: "Дві основні зони",
    serviceZone: "Service zone",
    detailingZone: "Detailing studio",
    ctaTitle: "Хочете записатися?",
    ctaText:
      "Надішліть фото авто, потрібну послугу або опис несправності. Ми відповімо з можливим терміном і орієнтовною ціною.",
  },
  ru: {
    whatsappMessage:
      "Здравствуйте, хочу записаться в ATEAM Service & Detailing.",
    eyebrow: "ATEAM SERVICE & DETAILING",
    titleTop: "Премиальный автосервис",
    titleBottom: "детейлинг и доработки авто",
    subtitle:
      "Технический сервис, диагностика, эвакуатор, chip tuning, проверка перед покупкой и предпродажная подготовка. Плюс детейлинг, полировка, химчистка, покраска, плёнки, фары, ambient-подсветка и автозвук.",
    book: "Записаться",
    call: "Позвонить",
    write: "Написать в WhatsApp",
    cars: "Смотреть авто",
    locationLabel: "Локация",
    location: "Йиглава / Чешская Республика",
    phoneLabel: "Телефон",
    premiumBadge: "Service • Detailing • Tuning",
    heroCardTitle: "ATEAM studio",
    heroCardText:
      "Одна мастерская для технического сервиса, проверки авто, визуального ухода и индивидуальных доработок.",
    serviceColumnTitle: "ATEAM Service",
    serviceColumnSubtitle:
      "Техника, диагностика, эвакуатор, chip tuning, проверка и подготовка автомобиля.",
    detailingColumnTitle: "ATEAM Detailing",
    detailingColumnSubtitle:
      "Внешний вид, лак, салон, плёнки, фары, ambient, защита и автозвук.",
    serviceItems: [
      {
        title: "Автосервис",
        text: "Обслуживание, механический ремонт, тормоза, подвеска, двигатель и типовые сервисные работы.",
      },
      {
        title: "Диагностика",
        text: "Чтение ошибок, проверка параметров и поиск причины до замены деталей.",
      },
      {
        title: "Диагностика перед покупкой авто",
        text: "Проверка автомобиля перед покупкой, диагностика, техническое состояние, риски и рекомендации.",
      },
      {
        title: "Предпродажная подготовка",
        text: "Проверка, базовый сервис, подготовка авто к продаже и рекомендации для лучшей презентации.",
      },
      {
        title: "Chip tuning",
        text: "Stage-настройки, диагностика мощности и решения EGR/DPF/AdBlue по техническому состоянию.",
      },
      {
        title: "Электрика и кодирование",
        text: "Электроника, блоки управления, retrofit и базовое кодирование автомобиля.",
      },
      {
        title: "Эвакуатор",
        text: "Помощь с неходовым авто, перевозка автомобилей и сервисная логистика.",
      },
    ],
    detailingItems: [
      {
        title: "Детейлинг",
        text: "Полный уход за экстерьером и интерьером, деконтаминация, защита и финальный внешний вид.",
      },
      {
        title: "Полировка лака",
        text: "Одноэтапная, двухэтапная и многоэтапная полировка по состоянию лака.",
      },
      {
        title: "Химчистка салона",
        text: "Глубокая чистка, химчистка, уход за пластиком, кожей, тканью и удаление запахов.",
      },
      {
        title: "Покраска и локальные ремонты",
        text: "Локальные ремонты, подготовка деталей, малярные работы и устранение повреждений.",
      },
      {
        title: "Тонировка и плёнки",
        text: "Тонировка стёкол, плёнки на фары, защитные плёнки и изменение внешнего вида.",
      },
      {
        title: "Восстановление фар и бронеплёнка",
        text: "Полировка фар, восстановление прозрачности и бронеплёнка на фары.",
      },
      {
        title: "Антидождь",
        text: "Гидрофобная защита стекла для лучшего отвода воды и комфорта во время дождя.",
      },
      {
        title: "Ambient-подсветка",
        text: "Установка ambient-подсветки салона и индивидуальные световые доработки.",
      },
      {
        title: "Автозвук",
        text: "Мультимедиа, камеры, DSP, усилители, сабвуферы и шумоизоляция.",
      },
    ],
    whyTitle: "Почему выбирают ATEAM",
    whyItems: [
      "Сервис, проверка авто, детейлинг и доработки в одном месте",
      "Диагностика перед лишней заменой деталей",
      "Фотофиксация работы и понятная коммуникация",
      "Можно договориться о сервисе, эвакуаторе и дальнейшем уходе",
    ],
    processTitle: "Как проходит запись",
    process: [
      "Вы отправляете фото авто или описание проблемы",
      "Мы предлагаем подход и ориентировочную цену",
      "Согласовываем дату и объём работ",
      "Выдаём авто после финальной проверки",
    ],
    galleryTitle: "Две основные зоны",
    serviceZone: "Service zone",
    detailingZone: "Detailing studio",
    ctaTitle: "Хотите записаться?",
    ctaText:
      "Отправьте фото автомобиля, нужную услугу или описание неисправности. Мы ответим с возможным сроком и ориентировочной ценой.",
  },
};

function isLanguageCode(value: string | null): value is LanguageCode {
  return value === "cs" || value === "en" || value === "uk" || value === "ru";
}

function SectionTitle({
  eyebrow,
  title,
  text,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <p className="text-sm font-black uppercase tracking-[0.35em] text-orange-500">
          {eyebrow}
        </p>
      )}

      <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-5xl">
        {title}
      </h2>

      {text && <p className="mt-4 text-lg leading-8 text-gray-400">{text}</p>}
    </div>
  );
}

function ServiceCard({
  title,
  text,
  index,
  variant,
}: {
  title: string;
  text: string;
  index: number;
  variant: "service" | "detailing";
}) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:border-orange-500/60 hover:bg-white/[0.07]">
      <div className="flex items-start gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-black ${
            variant === "service"
              ? "bg-orange-500 text-white"
              : "bg-white text-gray-950"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        <div>
          <h3 className="text-xl font-black text-white">{title}</h3>
          <p className="mt-2 leading-7 text-gray-400">{text}</p>
        </div>
      </div>
    </div>
  );
}

function VisualPanel({
  title,
  subtitle,
  align = "left",
}: {
  title: string;
  subtitle: string;
  align?: "left" | "right";
}) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.03] p-6 shadow-2xl shadow-black/30">
      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-orange-500/30 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

      <div
        className={`relative min-h-[230px] rounded-[1.5rem] border border-white/10 bg-gray-950/80 p-6 ${
          align === "right" ? "text-right" : "text-left"
        }`}
      >
        <div className="absolute inset-0 rounded-[1.5rem] bg-[linear-gradient(135deg,rgba(249,115,22,0.22),transparent_42%,rgba(255,255,255,0.08))]" />
        <div className="absolute bottom-5 left-5 right-5 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

        <div className="relative">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-orange-400">
            {subtitle}
          </p>
          <h3 className="mt-4 text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
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
  const whatsappHref = createWhatsAppLink(t.whatsappMessage);

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.24),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_28%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(3,7,18,0.35),#030712)]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <div className="inline-flex rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-orange-300">
              {t.eyebrow}
            </div>

            <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl">
              <span className="block">{t.titleTop}</span>
              <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-white bg-clip-text text-transparent">
                {t.titleBottom}
              </span>
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-gray-300 sm:text-xl">
              {t.subtitle}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-orange-600 px-7 py-4 text-center text-lg font-black text-white shadow-lg shadow-orange-600/25 transition hover:bg-orange-700"
              >
                {t.book}
              </a>

              <a
                href={phoneHref}
                className="rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-center text-lg font-black text-white transition hover:bg-white hover:text-gray-950"
              >
                {t.call}
              </a>

              <Link
                href="/cars"
                className="rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-center text-lg font-black text-white transition hover:bg-white hover:text-gray-950"
              >
                {t.cars}
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  {t.phoneLabel}
                </p>
                <a
                  href={phoneHref}
                  className="mt-2 block text-lg font-black text-white hover:text-orange-400"
                >
                  {phone}
                </a>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:col-span-2">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  {t.locationLabel}
                </p>
                <p className="mt-2 text-lg font-black text-white">
                  {t.location}
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[3rem] bg-orange-500/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/40 backdrop-blur">
              <div className="rounded-[2rem] bg-white p-5">
                <Image
                  src="/service-button.png"
                  alt="ATEAM Service & Detailing"
                  width={900}
                  height={360}
                  className="h-auto w-full object-contain"
                  priority
                />
              </div>

              <div className="mt-5 rounded-[2rem] border border-white/10 bg-gray-950 p-6">
                <p className="text-sm font-black uppercase tracking-[0.3em] text-orange-400">
                  {t.premiumBadge}
                </p>
                <h2 className="mt-4 text-3xl font-black">{t.heroCardTitle}</h2>
                <p className="mt-3 leading-7 text-gray-400">{t.heroCardText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2.2rem] border border-orange-500/30 bg-gradient-to-br from-orange-500/15 to-white/[0.03] p-5 shadow-2xl shadow-black/30 sm:p-7">
              <div className="rounded-[1.7rem] border border-white/10 bg-gray-950/80 p-6">
                <p className="text-sm font-black uppercase tracking-[0.32em] text-orange-400">
                  Service
                </p>
                <h2 className="mt-3 text-4xl font-black text-white">
                  {t.serviceColumnTitle}
                </h2>
                <p className="mt-3 leading-7 text-gray-400">
                  {t.serviceColumnSubtitle}
                </p>
              </div>

              <div className="mt-5 grid gap-4">
                {t.serviceItems.map((item, index) => (
                  <ServiceCard
                    key={item.title}
                    title={item.title}
                    text={item.text}
                    index={index}
                    variant="service"
                  />
                ))}
              </div>
            </div>

            <div className="rounded-[2.2rem] border border-white/15 bg-gradient-to-br from-white/12 to-orange-500/[0.06] p-5 shadow-2xl shadow-black/30 sm:p-7">
              <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.06] p-6">
                <p className="text-sm font-black uppercase tracking-[0.32em] text-gray-300">
                  Detailing
                </p>
                <h2 className="mt-3 text-4xl font-black text-white">
                  {t.detailingColumnTitle}
                </h2>
                <p className="mt-3 leading-7 text-gray-400">
                  {t.detailingColumnSubtitle}
                </p>
              </div>

              <div className="mt-5 grid gap-4">
                {t.detailingItems.map((item, index) => (
                  <ServiceCard
                    key={item.title}
                    title={item.title}
                    text={item.text}
                    index={index}
                    variant="detailing"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle title={t.galleryTitle} />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <VisualPanel title="SERVICE" subtitle={t.serviceZone} />
            <VisualPanel
              title="DETAILING"
              subtitle={t.detailingZone}
              align="right"
            />
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:pb-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-3xl font-black text-white">{t.whyTitle}</h2>

            <div className="mt-6 grid gap-3">
              {t.whyItems.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-gray-950 p-4 font-semibold text-gray-200"
                >
                  <span className="text-orange-400">✓</span> {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-orange-500/30 bg-orange-500/10 p-7">
            <h2 className="text-3xl font-black text-white">
              {t.processTitle}
            </h2>

            <div className="mt-6 grid gap-4">
              {t.process.map((item, index) => (
                <div key={item} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-600 font-black text-white">
                    {index + 1}
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-gray-950 p-4 font-semibold text-gray-200">
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:pb-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-orange-600 via-orange-500 to-orange-700 p-8 shadow-2xl shadow-orange-600/20 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div>
            <h2 className="text-4xl font-black text-white">{t.ctaTitle}</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-orange-50">
              {t.ctaText}
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-0">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-white px-7 py-4 text-center text-lg font-black text-orange-600 transition hover:bg-orange-50"
            >
              {t.write}
            </a>

            <a
              href={phoneHref}
              className="rounded-2xl border border-white/40 px-7 py-4 text-center text-lg font-black text-white transition hover:bg-white hover:text-orange-600"
            >
              {phone}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
