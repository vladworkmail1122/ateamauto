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
        icon: "🔧",
        text: "Údržba, mechanické opravy, brzdy, podvozek, motor a běžné servisní práce.",
      },
      {
        title: "Diagnostika",
        icon: "🖥️",
        text: "Čtení závad, měření parametrů, hledání příčiny problému před výměnou dílů.",
      },
      {
        title: "Diagnostika před koupí auta",
        icon: "🔍",
        text: "Kontrola vozidla před nákupem, diagnostika, technický stav, rizika a doporučení.",
      },
      {
        title: "Předprodejní příprava",
        icon: "🚗",
        text: "Kontrola, základní servis, příprava auta na prodej a doporučení pro lepší prezentaci.",
      },
      {
        title: "Chip tuning",
        icon: "⚡",
        text: "Stage úpravy, diagnostika výkonu a EGR/DPF/AdBlue řešení dle technického stavu.",
      },
      {
        title: "Elektrika a kódování",
        icon: "🔌",
        text: "Řešení elektroniky, řídicích jednotek, retrofitů a základního kódování.",
      },
      {
        title: "Odtah vozidel",
        icon: "🚚",
        text: "Pomoc s nepojízdným autem, převoz vozidel a servisní logistika dle domluvy.",
      },
    ],
    detailingItems: [
      {
        title: "Detailing",
        icon: "✨",
        text: "Kompletní péče o exteriér i interiér, dekontaminace, ochrana a finální úprava.",
      },
      {
        title: "Leštění laku",
        icon: "🧽",
        text: "Jednokrokové, dvoukrokové i vícekrokové leštění podle stavu laku.",
      },
      {
        title: "Čištění interiéru",
        icon: "🛋️",
        text: "Hloubkové čištění, tepování, péče o plasty, kůži, textil a zápachy.",
      },
      {
        title: "Lakování a lokální opravy",
        icon: "🎨",
        text: "Lokální opravy, příprava dílů, lakýrnické práce a opravy poškození.",
      },
      {
        title: "Tónování a fólie",
        icon: "🪟",
        text: "Tónování oken, fólie na světla, ochranné fólie a změna vzhledu.",
      },
      {
        title: "Renovace světel a PPF",
        icon: "💡",
        text: "Leštění světlometů, obnova průhlednosti a ochranná fólie na světla.",
      },
      {
        title: "Anti-rain ochrana",
        icon: "🌧️",
        text: "Hydrofobní ochrana skel pro lepší odvod vody a komfort při jízdě v dešti.",
      },
      {
        title: "Ambientní osvětlení",
        icon: "🌈",
        text: "Montáž ambientního osvětlení interiéru a individuální světelné úpravy.",
      },
      {
        title: "Auto audio",
        icon: "🔊",
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
        icon: "🔧",
        text: "Maintenance, mechanical repairs, brakes, suspension, engine and routine service work.",
      },
      {
        title: "Diagnostics",
        icon: "🖥️",
        text: "Fault reading, live data checks and finding the real cause before replacing parts.",
      },
      {
        title: "Pre-purchase diagnostics",
        icon: "🔍",
        text: "Vehicle inspection before purchase, diagnostics, technical condition, risks and recommendations.",
      },
      {
        title: "Pre-sale preparation",
        icon: "🚗",
        text: "Inspection, basic service, preparation for sale and recommendations for better presentation.",
      },
      {
        title: "Chip tuning",
        icon: "⚡",
        text: "Stage tuning, performance diagnostics and EGR/DPF/AdBlue solutions based on technical condition.",
      },
      {
        title: "Electrics and coding",
        icon: "🔌",
        text: "Electronics, control units, retrofits and basic vehicle coding.",
      },
      {
        title: "Towing",
        icon: "🚚",
        text: "Help with non-running cars, vehicle transport and service logistics by arrangement.",
      },
    ],
    detailingItems: [
      {
        title: "Detailing",
        icon: "✨",
        text: "Complete exterior and interior care, decontamination, protection and final finish.",
      },
      {
        title: "Paint polishing",
        icon: "🧽",
        text: "One-step, two-step and multi-step polishing based on paint condition.",
      },
      {
        title: "Interior deep cleaning",
        icon: "🛋️",
        text: "Deep cleaning, wet vacuuming, plastics, leather, textile care and odour removal.",
      },
      {
        title: "Paint work and local repairs",
        icon: "🎨",
        text: "Local repairs, part preparation, paint work and damage repairs.",
      },
      {
        title: "Tinting and films",
        icon: "🪟",
        text: "Window tinting, headlight films, protective films and visual changes.",
      },
      {
        title: "Headlight restoration and PPF",
        icon: "💡",
        text: "Headlight polishing, clarity restoration and protective film for headlights.",
      },
      {
        title: "Anti-rain protection",
        icon: "🌧️",
        text: "Hydrophobic glass protection for better water runoff and comfort in rain.",
      },
      {
        title: "Ambient lighting",
        icon: "🌈",
        text: "Interior ambient lighting installation and individual lighting upgrades.",
      },
      {
        title: "Car audio",
        icon: "🔊",
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
        icon: "🔧",
        text: "Обслуговування, механічні ремонти, гальма, підвіска, двигун і типові сервісні роботи.",
      },
      {
        title: "Діагностика",
        icon: "🖥️",
        text: "Зчитування помилок, перевірка параметрів і пошук причини до заміни деталей.",
      },
      {
        title: "Діагностика перед купівлею авто",
        icon: "🔍",
        text: "Перевірка автомобіля перед купівлею, діагностика, технічний стан, ризики та рекомендації.",
      },
      {
        title: "Передпродажна підготовка",
        icon: "🚗",
        text: "Перевірка, базовий сервіс, підготовка авто до продажу і рекомендації для кращої презентації.",
      },
      {
        title: "Chip tuning",
        icon: "⚡",
        text: "Stage налаштування, діагностика потужності та рішення EGR/DPF/AdBlue за технічним станом.",
      },
      {
        title: "Електрика і кодування",
        icon: "🔌",
        text: "Електроніка, блоки керування, retrofit і базове кодування авто.",
      },
      {
        title: "Евакуатор",
        icon: "🚚",
        text: "Допомога з нерухомим авто, перевезення автомобілів і сервісна логістика.",
      },
    ],
    detailingItems: [
      {
        title: "Детейлінг",
        icon: "✨",
        text: "Повний догляд за екстерʼєром та інтерʼєром, деконтамінація, захист і фінальний вигляд.",
      },
      {
        title: "Полірування лаку",
        icon: "🧽",
        text: "Однокрокове, двокрокове і багатокрокове полірування залежно від стану лаку.",
      },
      {
        title: "Хімчистка салону",
        icon: "🛋️",
        text: "Глибоке очищення, хімчистка, догляд за пластиком, шкірою, тканиною і запахами.",
      },
      {
        title: "Фарбування і локальні ремонти",
        icon: "🎨",
        text: "Локальні ремонти, підготовка деталей, малярні роботи і ремонт пошкоджень.",
      },
      {
        title: "Тонування і плівки",
        icon: "🪟",
        text: "Тонування скла, плівки на фари, захисні плівки і зміна вигляду авто.",
      },
      {
        title: "Відновлення фар і PPF",
        icon: "💡",
        text: "Полірування фар, відновлення прозорості та бронеплівка на фари.",
      },
      {
        title: "Антидощ",
        icon: "🌧️",
        text: "Гідрофобний захист скла для кращого відведення води і комфорту під час дощу.",
      },
      {
        title: "Ambient-підсвітка",
        icon: "🌈",
        text: "Встановлення ambient-підсвітки салону та індивідуальні світлові доопрацювання.",
      },
      {
        title: "Автозвук",
        icon: "🔊",
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
        icon: "🔧",
        text: "Обслуживание, механический ремонт, тормоза, подвеска, двигатель и типовые сервисные работы.",
      },
      {
        title: "Диагностика",
        icon: "🖥️",
        text: "Чтение ошибок, проверка параметров и поиск причины до замены деталей.",
      },
      {
        title: "Диагностика перед покупкой авто",
        icon: "🔍",
        text: "Проверка автомобиля перед покупкой, диагностика, техническое состояние, риски и рекомендации.",
      },
      {
        title: "Предпродажная подготовка",
        icon: "🚗",
        text: "Проверка, базовый сервис, подготовка авто к продаже и рекомендации для лучшей презентации.",
      },
      {
        title: "Chip tuning",
        icon: "⚡",
        text: "Stage-настройки, диагностика мощности и решения EGR/DPF/AdBlue по техническому состоянию.",
      },
      {
        title: "Электрика и кодирование",
        icon: "🔌",
        text: "Электроника, блоки управления, retrofit и базовое кодирование автомобиля.",
      },
      {
        title: "Эвакуатор",
        icon: "🚚",
        text: "Помощь с неходовым авто, перевозка автомобилей и сервисная логистика.",
      },
    ],
    detailingItems: [
      {
        title: "Детейлинг",
        icon: "✨",
        text: "Полный уход за экстерьером и интерьером, деконтаминация, защита и финальный внешний вид.",
      },
      {
        title: "Полировка лака",
        icon: "🧽",
        text: "Одноэтапная, двухэтапная и многоэтапная полировка по состоянию лака.",
      },
      {
        title: "Химчистка салона",
        icon: "🛋️",
        text: "Глубокая чистка, химчистка, уход за пластиком, кожей, тканью и удаление запахов.",
      },
      {
        title: "Покраска и локальные ремонты",
        icon: "🎨",
        text: "Локальные ремонты, подготовка деталей, малярные работы и устранение повреждений.",
      },
      {
        title: "Тонировка и плёнки",
        icon: "🪟",
        text: "Тонировка стёкол, плёнки на фары, защитные плёнки и изменение внешнего вида.",
      },
      {
        title: "Восстановление фар и бронеплёнка",
        icon: "💡",
        text: "Полировка фар, восстановление прозрачности и бронеплёнка на фары.",
      },
      {
        title: "Антидождь",
        icon: "🌧️",
        text: "Гидрофобная защита стекла для лучшего отвода воды и комфорта во время дождя.",
      },
      {
        title: "Ambient-подсветка",
        icon: "🌈",
        text: "Установка ambient-подсветки салона и индивидуальные световые доработки.",
      },
      {
        title: "Автозвук",
        icon: "🔊",
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
  title,
  text,
}: {
  title: string;
  text?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
        {title}
      </h2>

      {text && <p className="mt-4 text-lg leading-8 text-gray-400">{text}</p>}
    </div>
  );
}

function ServiceCard({
  title,
  text,
  icon,
  variant,
}: {
  title: string;
  text: string;
  icon: string;
  variant: "service" | "detailing";
}) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/10 transition hover:-translate-y-1 hover:border-orange-500/60 hover:bg-white/[0.07]">
      <div className="flex items-start gap-4">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl shadow-lg ${
            variant === "service"
              ? "bg-orange-500/15 text-orange-400 ring-1 ring-orange-500/30"
              : "bg-white/10 text-white ring-1 ring-white/15"
          }`}
        >
          {icon}
        </div>

        <div className="min-w-0">
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
        className={`relative min-h-[210px] rounded-[1.5rem] border border-white/10 bg-gray-950/80 p-6 ${
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
      <section className="relative overflow-hidden px-4 py-12 sm:px-6 lg:py-16">
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

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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

            <div className="mt-8 grid gap-3 sm:grid-cols-[0.85fr_1.15fr]">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  {t.phoneLabel}
                </p>
                <a
                  href={phoneHref}
                  className="mt-2 block whitespace-nowrap text-xl font-black leading-none tracking-tight text-white hover:text-orange-400"
                >
                  {phone}
                </a>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
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

      <section className="px-4 py-10 sm:px-6 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2.2rem] border border-orange-500/30 bg-gradient-to-br from-orange-500/15 to-white/[0.03] p-4 shadow-2xl shadow-black/30 sm:p-6">
              <div className="rounded-[1.7rem] border border-white/10 bg-gray-950/80 p-5">
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
                {t.serviceItems.map((item) => (
                  <ServiceCard
                    key={item.title}
                    title={item.title}
                    text={item.text}
                    icon={item.icon}
                    variant="service"
                  />
                ))}
              </div>
            </div>

            <div className="rounded-[2.2rem] border border-white/15 bg-gradient-to-br from-white/12 to-orange-500/[0.06] p-4 shadow-2xl shadow-black/30 sm:p-6">
              <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.06] p-5">
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
                {t.detailingItems.map((item) => (
                  <ServiceCard
                    key={item.title}
                    title={item.title}
                    text={item.text}
                    icon={item.icon}
                    variant="detailing"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <SectionTitle title={t.galleryTitle} />

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <VisualPanel title="SERVICE" subtitle={t.serviceZone} />
            <VisualPanel
              title="DETAILING"
              subtitle={t.detailingZone}
              align="right"
            />
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 lg:pb-14">
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

      <section className="px-4 pb-12 sm:px-6 lg:pb-16">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-orange-600 via-orange-500 to-orange-700 p-8 shadow-2xl shadow-orange-600/20 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div>
            <h2 className="text-4xl font-black text-white">{t.ctaTitle}</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-orange-50">
              {t.ctaText}
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:mt-0 lg:justify-end">
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
              className="whitespace-nowrap rounded-2xl border border-white/40 px-7 py-4 text-center text-xl font-black text-white transition hover:bg-white hover:text-orange-600"
            >
              {phone}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
