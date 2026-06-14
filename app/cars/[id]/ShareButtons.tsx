"use client";

import { useState } from "react";

export default function ShareButtons({
  title,
}: {
  title: string;
}) {
  const [copied, setCopied] = useState(false);

  function getCurrentUrl() {
    return window.location.href;
  }

  async function copyLink() {
    await navigator.clipboard.writeText(getCurrentUrl());
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  function getShareText() {
    return `Podívejte se na tento inzerát: ${title}\n${getCurrentUrl()}`;
  }

  return (
    <div className="mt-6 rounded-2xl border bg-gray-50 p-5">
      <h3 className="mb-4 text-xl font-bold">Sdílet inzerát</h3>

      <div className="grid gap-3 md:grid-cols-3">
        <button
          type="button"
          onClick={copyLink}
          className="rounded-xl border bg-white py-3 font-semibold hover:bg-gray-100"
        >
          {copied ? "✓ Zkopírováno" : "📋 Kopírovat odkaz"}
        </button>

        <a
          href={`https://wa.me/?text=${encodeURIComponent(getShareText())}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-green-600 py-3 text-center font-semibold text-white hover:bg-green-700"
        >
          WhatsApp
        </a>

        <a
          href={`https://t.me/share/url?url=${encodeURIComponent(
            getCurrentUrl()
          )}&text=${encodeURIComponent(`Podívejte se na tento inzerát: ${title}`)}`}
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