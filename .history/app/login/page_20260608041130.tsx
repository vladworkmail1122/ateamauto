"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold">
          Přihlášení
        </h1>

        <form onSubmit={handleLogin} className="mt-8 space-y-4">
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
            Přihlásit se
          </button>
        </form>

        {message && (
          <p className="mt-4 text-red-500">{message}</p>
        )}

        <p className="mt-6 text-sm text-gray-600">
          Nemáte účet?{" "}
          <Link
            href="/register"
            className="text-orange-600"
          >
            Registrace
          </Link>
        </p>
      </div>
    </main>
  );
}