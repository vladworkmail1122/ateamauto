"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setSuccess(false);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      setSuccess(false);
      return;
    }

    setMessage("Registrace proběhla úspěšně. Zkontrolujte e-mail.");
    setSuccess(true);
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-md">
        <div className="rounded-3xl bg-white p-6 shadow sm:p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Registrace
            </h1>

            <p className="mt-3 text-sm text-gray-500 sm:text-base">
              Vytvořte si účet a začněte přidávat vlastní inzeráty.
            </p>
          </div>

          {message && (
            <div
              className={`mt-6 rounded-2xl border p-4 text-sm font-medium ${
                success
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleRegister} className="mt-8 grid gap-4">
            <input
              type="email"
              placeholder="E-mail"
              className="w-full rounded-xl border px-4 py-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Heslo"
              className="w-full rounded-xl border px-4 py-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />

            <button
              disabled={loading}
              className="w-full rounded-xl bg-orange-600 py-4 font-semibold text-white shadow hover:bg-orange-700 disabled:bg-gray-400"
            >
              {loading ? "Vytváření účtu..." : "Vytvořit účet"}
            </button>
          </form>

          <div className="mt-6 rounded-2xl bg-gray-50 p-4 text-center text-sm text-gray-600">
            Už máte účet?{" "}
            <Link href="/login" className="font-semibold text-orange-600">
              Přihlásit se
            </Link>
          </div>
        </div>

        <Link
          href="/"
          className="mt-6 block text-center text-sm font-semibold text-gray-500 hover:text-orange-600"
        >
          ← Zpět na hlavní stránku
        </Link>
      </div>
    </main>
  );
}