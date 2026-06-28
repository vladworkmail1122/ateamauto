"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type LanguageCode = "cs" | "en" | "uk" | "ru";

const translations = {
  cs: {
    title: "Přihlášení",
    subtitle: "Přihlaste se ke svému účtu a spravujte své inzeráty.",
    email: "E-mail",
    password: "Heslo",
    loading: "Přihlašování...",
    submit: "Přihlásit se",
    noAccount: "Nemáte účet?",
    register: "Registrace",
    back: "← Zpět na hlavní stránku",
    loginError: "Přihlášení se nepodařilo. Zkontrolujte e-mail a heslo.",
  },
  en: {
    title: "Login",
    subtitle: "Log in to your account and manage your listings.",
    email: "E-mail",
    password: "Password",
    loading: "Logging in...",
    submit: "Log in",
    noAccount: "Don't have an account?",
    register: "Register",
    back: "← Back to home page",
    loginError: "Login failed. Please check your e-mail and password.",
  },
  uk: {
    title: "Вхід",
    subtitle: "Увійдіть у свій акаунт і керуйте своїми оголошеннями.",
    email: "E-mail",
    password: "Пароль",
    loading: "Вхід...",
    submit: "Увійти",
    noAccount: "Немає акаунта?",
    register: "Реєстрація",
    back: "← Назад на головну",
    loginError: "Не вдалося увійти. Перевірте e-mail і пароль.",
  },
  ru: {
    title: "Вход",
    subtitle: "Войдите в свой аккаунт и управляйте своими объявлениями.",
    email: "E-mail",
    password: "Пароль",
    loading: "Вход...",
    submit: "Войти",
    noAccount: "Нет аккаунта?",
    register: "Регистрация",
    back: "← Назад на главную",
    loginError: "Не удалось войти. Проверьте e-mail и пароль.",
  },
};

function isLanguageCode(value: string | null): value is LanguageCode {
  return value === "cs" || value === "en" || value === "uk" || value === "ru";
}

export default function LoginPage() {
  const [language, setLanguage] = useState<LanguageCode>("cs");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const t = translations[language];

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

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(t.loginError);
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-md">
        <div className="rounded-3xl bg-white p-6 shadow sm:p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {t.title}
            </h1>

            <p className="mt-3 text-sm text-gray-500 sm:text-base">
              {t.subtitle}
            </p>
          </div>

          {message && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
              {message}
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-8 grid gap-4">
            <input
              type="email"
              placeholder={t.email}
              className="w-full rounded-xl border px-4 py-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder={t.password}
              className="w-full rounded-xl border px-4 py-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              disabled={loading}
              className="w-full rounded-xl bg-orange-600 py-4 font-semibold text-white shadow hover:bg-orange-700 disabled:bg-gray-400"
            >
              {loading ? t.loading : t.submit}
            </button>
          </form>

          <div className="mt-6 rounded-2xl bg-gray-50 p-4 text-center text-sm text-gray-600">
            {t.noAccount}{" "}
            <Link href="/register" className="font-semibold text-orange-600">
              {t.register}
            </Link>
          </div>
        </div>

        <Link
          href="/"
          className="mt-6 block text-center text-sm font-semibold text-gray-500 hover:text-orange-600"
        >
          {t.back}
        </Link>
      </div>
    </main>
  );
}
