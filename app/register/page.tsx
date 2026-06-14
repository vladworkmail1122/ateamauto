"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Registrace proběhla úspěšně. Zkontrolujte e-mail.");
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold">Registrace</h1>

        <form onSubmit={handleRegister} className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="E-mail"
            className="w-full rounded-xl border px-4 py-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Heslo"
            className="w-full rounded-xl border px-4 py-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full rounded-xl bg-orange-600 py-3 font-semibold text-white">
            Vytvořit účet
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-gray-600">{message}</p>
        )}

        <p className="mt-6 text-sm text-gray-600">
          Už máte účet?{" "}
          <Link href="/login" className="text-orange-600">
            Přihlásit se
          </Link>
        </p>
      </div>
    </main>
  );
}