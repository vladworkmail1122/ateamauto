"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type LanguageCode = "cs" | "en" | "uk" | "ru";

const translations = {
  cs: {
    back: "← Zpět na hlavní stránku",
    eyebrow: "Kontrola historie vozidla",
    title: "Prověření auta podle VIN",
    subtitle:
      "Zadejte VIN kód vozidla a rychle otevřete kontrolu přes carVertical nebo Cebia. VIN se zkopíruje do schránky, abyste ho mohli rovnou vložit.",
    vinLabel: "VIN kód vozidla",
    vinPlaceholder: "Např. WAUZZZ4F...",
    characters: "znaků",
    clear: "Vymazat",
    vinWarning:
      "VIN musí mít přesně 17 znaků. Nepoužívejte mezery ani pomlčky.",
    vinRequired: "VIN musí mít 17 znaků.",
    copied: "VIN {vin} byl zkopírován. Vložte ho na otevřené stránce.",
    copyManual: "Zkopírujte VIN ručně: {vin}",
    carvertical: "Zkontrolovat přes carVertical",
    cebia: "Zkontrolovat přes Cebia",
    disclaimer:
      "ATEAM AUTO není poskytovatelem placených reportů carVertical ani Cebia. Kontrola probíhá na stránkách vybraného poskytovatele.",
    whatCanShow: "Co může kontrola ukázat?",
    mileageTitle: "Kilometry",
    mileageText: "Možné nesrovnalosti v nájezdu.",
    damageTitle: "Poškození",
    damageText: "Historie škod, nehod a oprav.",
    theftTitle: "Krádež / původ",
    theftText: "Kontrola rizik a původu vozidla.",
    photosTitle: "Fotky a inzerce",
    photosText: "Starší záznamy z prodeje, pokud existují.",
  },
  en: {
    back: "← Back to home page",
    eyebrow: "Vehicle history check",
    title: "Check a car by VIN",
    subtitle:
      "Enter the vehicle VIN and quickly open a check through carVertical or Cebia. The VIN will be copied to the clipboard so you can paste it right away.",
    vinLabel: "Vehicle VIN code",
    vinPlaceholder: "E.g. WAUZZZ4F...",
    characters: "characters",
    clear: "Clear",
    vinWarning:
      "VIN must have exactly 17 characters. Do not use spaces or dashes.",
    vinRequired: "VIN must have 17 characters.",
    copied: "VIN {vin} has been copied. Paste it on the opened page.",
    copyManual: "Copy VIN manually: {vin}",
    carvertical: "Check through carVertical",
    cebia: "Check through Cebia",
    disclaimer:
      "ATEAM AUTO is not a provider of paid carVertical or Cebia reports. The check takes place on the selected provider's website.",
    whatCanShow: "What can the check show?",
    mileageTitle: "Mileage",
    mileageText: "Possible mileage inconsistencies.",
    damageTitle: "Damage",
    damageText: "History of damage, accidents and repairs.",
    theftTitle: "Theft / origin",
    theftText: "Risk and vehicle origin check.",
    photosTitle: "Photos and adverts",
    photosText: "Older sale records, if available.",
  },
  uk: {
    back: "← Назад на головну",
    eyebrow: "Перевірка історії авто",
    title: "Перевірка авто за VIN",
    subtitle:
      "Введіть VIN код авто і швидко відкрийте перевірку через carVertical або Cebia. VIN скопіюється в буфер, щоб ви могли одразу його вставити.",
    vinLabel: "VIN код авто",
    vinPlaceholder: "Напр. WAUZZZ4F...",
    characters: "символів",
    clear: "Очистити",
    vinWarning:
      "VIN має містити рівно 17 символів. Не використовуйте пробіли або дефіси.",
    vinRequired: "VIN має містити 17 символів.",
    copied: "VIN {vin} скопійовано. Вставте його на відкритій сторінці.",
    copyManual: "Скопіюйте VIN вручну: {vin}",
    carvertical: "Перевірити через carVertical",
    cebia: "Перевірити через Cebia",
    disclaimer:
      "ATEAM AUTO не є постачальником платних звітів carVertical або Cebia. Перевірка відбувається на сайті вибраного постачальника.",
    whatCanShow: "Що може показати перевірка?",
    mileageTitle: "Пробіг",
    mileageText: "Можливі невідповідності в пробігу.",
    damageTitle: "Пошкодження",
    damageText: "Історія пошкоджень, ДТП і ремонтів.",
    theftTitle: "Викрадення / походження",
    theftText: "Перевірка ризиків і походження авто.",
    photosTitle: "Фото та оголошення",
    photosText: "Старі записи з продажу, якщо вони існують.",
  },
  ru: {
    back: "← Назад на главную",
    eyebrow: "Проверка истории авто",
    title: "Проверка авто по VIN",
    subtitle:
      "Введите VIN код авто и быстро откройте проверку через carVertical или Cebia. VIN скопируется в буфер, чтобы вы могли сразу его вставить.",
    vinLabel: "VIN код авто",
    vinPlaceholder: "Напр. WAUZZZ4F...",
    characters: "символов",
    clear: "Очистить",
    vinWarning:
      "VIN должен содержать ровно 17 символов. Не используйте пробелы или дефисы.",
    vinRequired: "VIN должен содержать 17 символов.",
    copied: "VIN {vin} скопирован. Вставьте его на открытой странице.",
    copyManual: "Скопируйте VIN вручную: {vin}",
    carvertical: "Проверить через carVertical",
    cebia: "Проверить через Cebia",
    disclaimer:
      "ATEAM AUTO не является поставщиком платных отчётов carVertical или Cebia. Проверка проходит на сайте выбранного поставщика.",
    whatCanShow: "Что может показать проверка?",
    mileageTitle: "Пробег",
    mileageText: "Возможные несоответствия по пробегу.",
    damageTitle: "Повреждения",
    damageText: "История повреждений, ДТП и ремонтов.",
    theftTitle: "Угон / происхождение",
    theftText: "Проверка рисков и происхождения авто.",
    photosTitle: "Фото и объявления",
    photosText: "Старые записи о продаже, если они есть.",
  },
};

function isLanguageCode(value: string | null): value is LanguageCode {
  return value === "cs" || value === "en" || value === "uk" || value === "ru";
}

const normalizeVin = (value: string) =>
  value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 17);

export default function VinCheckPage() {
  const [vin, setVin] = useState("");
  const [message, setMessage] = useState("");
  const [language, setLanguage] = useState<LanguageCode>("cs");

  const t = translations[language];
  const cleanVin = normalizeVin(vin);
  const isValidVin = cleanVin.length === 17;

  useEffect(() => {
    const savedLanguage = localStorage.getItem("site-language");

    if (isLanguageCode(savedLanguage)) {
      setLanguage(savedLanguage);
    }

    const params = new URLSearchParams(window.location.search);
    const vinFromUrl = params.get("vin");

    if (vinFromUrl) {
      setVin(normalizeVin(vinFromUrl));
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

  const openService = async (service: "carvertical" | "cebia") => {
    if (!isValidVin) {
      setMessage(t.vinRequired);
      return;
    }

    try {
      await navigator.clipboard.writeText(cleanVin);
      setMessage(t.copied.replace("{vin}", cleanVin));
    } catch {
      setMessage(t.copyManual.replace("{vin}", cleanVin));
    }

    const url =
      service === "carvertical"
        ? "https://www.carvertical.com/cz/provereni-vin"
        : "https://cz.cebia.com/";

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 text-gray-900 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-6 inline-flex text-sm font-semibold text-gray-600 hover:text-gray-900"
        >
          {t.back}
        </Link>

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="bg-gray-900 px-5 py-8 text-white sm:px-8 sm:py-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-300">
              {t.eyebrow}
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
              {t.title}
            </h1>

            <p className="mt-4 max-w-2xl text-base text-gray-300 sm:text-lg">
              {t.subtitle}
            </p>
          </div>

          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <label className="block text-sm font-bold text-gray-800">
                {t.vinLabel}
              </label>

              <input
                value={vin}
                onChange={(event) => setVin(normalizeVin(event.target.value))}
                placeholder={t.vinPlaceholder}
                maxLength={17}
                className="mt-2 w-full rounded-2xl border border-gray-300 bg-white px-4 py-4 text-lg font-bold uppercase tracking-wider text-gray-900 outline-none transition focus:border-gray-900 focus:ring-4 focus:ring-gray-100"
              />

              <div className="mt-2 flex items-center justify-between gap-3 text-sm">
                <span
                  className={
                    isValidVin ? "font-semibold text-green-700" : "text-gray-500"
                  }
                >
                  {cleanVin.length}/17 {t.characters}
                </span>

                {cleanVin && (
                  <button
                    type="button"
                    onClick={() => {
                      setVin("");
                      setMessage("");
                    }}
                    className="font-semibold text-gray-500 hover:text-gray-900"
                  >
                    {t.clear}
                  </button>
                )}
              </div>

              {!isValidVin && cleanVin.length > 0 && (
                <p className="mt-3 rounded-2xl bg-yellow-50 px-4 py-3 text-sm font-medium text-yellow-800">
                  {t.vinWarning}
                </p>
              )}

              {message && (
                <p className="mt-3 rounded-2xl bg-blue-50 px-4 py-3 text-sm font-medium text-blue-800">
                  {message}
                </p>
              )}

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => openService("carvertical")}
                  disabled={!isValidVin}
                  className="rounded-2xl bg-gray-900 px-5 py-4 text-center text-sm font-black text-white shadow-sm transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  {t.carvertical}
                </button>

                <button
                  type="button"
                  onClick={() => openService("cebia")}
                  disabled={!isValidVin}
                  className="rounded-2xl border border-gray-300 bg-white px-5 py-4 text-center text-sm font-black text-gray-900 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400"
                >
                  {t.cebia}
                </button>
              </div>

              <p className="mt-5 text-sm leading-6 text-gray-500">
                {t.disclaimer}
              </p>
            </div>

            <aside className="rounded-3xl bg-gray-50 p-5">
              <h2 className="text-lg font-black text-gray-900">
                {t.whatCanShow}
              </h2>

              <div className="mt-4 space-y-3 text-sm text-gray-700">
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="font-bold text-gray-900">{t.mileageTitle}</div>
                  <div className="mt-1">{t.mileageText}</div>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="font-bold text-gray-900">{t.damageTitle}</div>
                  <div className="mt-1">{t.damageText}</div>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="font-bold text-gray-900">{t.theftTitle}</div>
                  <div className="mt-1">{t.theftText}</div>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="font-bold text-gray-900">{t.photosTitle}</div>
                  <div className="mt-1">{t.photosText}</div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
