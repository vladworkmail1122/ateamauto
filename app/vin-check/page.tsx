"use client";

import Link from "next/link";
import { useState } from "react";

const normalizeVin = (value: string) =>
  value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 17);

export default function VinCheckPage() {
  const [vin, setVin] = useState("");
  const [message, setMessage] = useState("");

  const cleanVin = normalizeVin(vin);
  const isValidVin = cleanVin.length === 17;

  const openService = async (service: "carvertical" | "cebia") => {
    if (!isValidVin) {
      setMessage("VIN musí mít 17 znaků.");
      return;
    }

    try {
      await navigator.clipboard.writeText(cleanVin);
      setMessage(`VIN ${cleanVin} byl zkopírován. Vložte ho na otevřené stránce.`);
    } catch {
      setMessage(`Zkopírujte VIN ručně: ${cleanVin}`);
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
          ← Zpět na hlavní stránku
        </Link>

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="bg-gray-900 px-5 py-8 text-white sm:px-8 sm:py-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-300">
              Kontrola historie vozidla
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
              Prověření auta podle VIN
            </h1>

            <p className="mt-4 max-w-2xl text-base text-gray-300 sm:text-lg">
              Zadejte VIN kód vozidla a rychle otevřete kontrolu přes carVertical
              nebo Cebia. VIN se zkopíruje do schránky, abyste ho mohli rovnou vložit.
            </p>
          </div>

          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <label className="block text-sm font-bold text-gray-800">
                VIN kód vozidla
              </label>

              <input
                value={vin}
                onChange={(event) => setVin(normalizeVin(event.target.value))}
                placeholder="Např. WAUZZZ4F..."
                maxLength={17}
                className="mt-2 w-full rounded-2xl border border-gray-300 bg-white px-4 py-4 text-lg font-bold uppercase tracking-wider text-gray-900 outline-none transition focus:border-gray-900 focus:ring-4 focus:ring-gray-100"
              />

              <div className="mt-2 flex items-center justify-between gap-3 text-sm">
                <span className={isValidVin ? "font-semibold text-green-700" : "text-gray-500"}>
                  {cleanVin.length}/17 znaků
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
                    Vymazat
                  </button>
                )}
              </div>

              {!isValidVin && cleanVin.length > 0 && (
                <p className="mt-3 rounded-2xl bg-yellow-50 px-4 py-3 text-sm font-medium text-yellow-800">
                  VIN musí mít přesně 17 znaků. Nepoužívejte mezery ani pomlčky.
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
                  Zkontrolovat přes carVertical
                </button>

                <button
                  type="button"
                  onClick={() => openService("cebia")}
                  disabled={!isValidVin}
                  className="rounded-2xl border border-gray-300 bg-white px-5 py-4 text-center text-sm font-black text-gray-900 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400"
                >
                  Zkontrolovat přes Cebia
                </button>
              </div>

              <p className="mt-5 text-sm leading-6 text-gray-500">
                ATEAM AUTO není poskytovatelem placených reportů carVertical ani Cebia.
                Kontrola probíhá na stránkách vybraného poskytovatele.
              </p>
            </div>

            <aside className="rounded-3xl bg-gray-50 p-5">
              <h2 className="text-lg font-black text-gray-900">
                Co může kontrola ukázat?
              </h2>

              <div className="mt-4 space-y-3 text-sm text-gray-700">
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="font-bold text-gray-900">Kilometry</div>
                  <div className="mt-1">Možné nesrovnalosti v nájezdu.</div>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="font-bold text-gray-900">Poškození</div>
                  <div className="mt-1">Historie škod, nehod a oprav.</div>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="font-bold text-gray-900">Krádež / původ</div>
                  <div className="mt-1">Kontrola rizik a původu vozidla.</div>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="font-bold text-gray-900">Fotky a inzerce</div>
                  <div className="mt-1">Starší záznamy z prodeje, pokud existují.</div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}