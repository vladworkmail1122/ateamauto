"use client";

import { useState } from "react";

export default function ShareButtons() {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  const currentUrl =
    typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="mt-6">
      <h3 className="mb-3 font-semibold">Sdílet inzerát</h3>

      <div className="grid gap-3 md:grid-cols-3">
        <button
          onClick={copyLink}
          className="rounded-xl border py-3 font-semibold hover:bg-gray-50"
        >
          {copied ? "✓ Zkopírováno" : "📋 Kopírovat odkaz"}
        </button>

        <a
          href={`https://wa.me/?text=${encodeURIComponent(currentUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-green-600 py-3 text-center font-semibold text-white hover:bg-green-700"
        >
          WhatsApp
        </a>

        <a
          href={`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-sky-500 py-3 text-center font-semibold text-white hover:bg-sky-600"
        >
          Telegram
        </a>
      </div>
    </div>
  );
}