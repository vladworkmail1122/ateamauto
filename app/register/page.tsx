"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type LanguageCode = "cs" | "en" | "uk" | "ru";

const translations = {
  cs: {
    title: "Registrace",
    subtitle: "Vytvořte si účet a začněte přidávat vlastní inzeráty.",
    email: "E-mail",
    password: "Heslo",
    loading: "Vytváření účtu...",
    submit: "Vytvořit účet",
    alreadyAccount: "Už máte účet?",
    login: "Přihlásit se",
    back: "← Zpět na hlavní stránku",
    success: "Registrace proběhla úspěšně. Zkontrolujte e-mail.",
    registerError: "Registrace se nepodařila. Zkontrolujte údaje a zkuste to znovu.",
  },
  en: {
    title: "Register",
    subtitle: "Create an account and start adding your own listings.",
    email: "E-mail",
    password: "Password",
    loading: "Creating account...",
    submit: "Create account",
    alreadyAccount: "Already have an account?",
    login: "Log in",
    back: "← Back to home page",
    success: "Registration was successful. Check your e-mail.",
    registerError: "Registration failed. Check your details and try again.",
  },
  uk: {
    title: "Реєстрація",
    subtitle: "Створіть акаунт і почніть додавати власні оголошення.",
    email: "E-mail",
    password: "Пароль",
    loading: "Створення акаунта...",
    submit: "Створити акаунт",
    alreadyAccount: "Вже маєте акаунт?",
    login: "Увійти",
    back: "← Назад на головну",
    success: "Реєстрація пройшла успішно. Перевірте e-mail.",
    registerError: "Не вдалося зареєструватися. Перевірте дані та спробуйте знову.",
  },
  ru: {
    title: "Регистрация",
    subtitle: "Создайте аккаунт и начните добавлять свои объявления.",
    email: "E-mail",
    password: "Пароль",
    loading: "Создание аккаунта...",
    submit: "Создать аккаунт",
    alreadyAccount: "Уже есть аккаунт?",
    login: "Войти",
    back: "← Назад на главную",
    success: "Регистрация прошла успешно. Проверьте e-mail.",
    registerError: "Не удалось зарегистрироваться. Проверьте данные и попробуйте снова.",
  },
};

function isLanguageCode(value: string | null): value is LanguageCode {
  return value === "cs" || value === "en" || value === "uk" || value === "ru";
}

export default function RegisterPage() {
  const [language, setLanguage] = useState<LanguageCode>("cs");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
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

  async function handleRegister(e: FormEvent) {
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
      setMessage(t.registerError);
      setSuccess(false);
      return;
    }

    setMessage(t.success);
    setSuccess(true);
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
              minLength={6}
            />

            <button
              disabled={loading}
              className="w-full rounded-xl bg-orange-600 py-4 font-semibold text-white shadow hover:bg-orange-700 disabled:bg-gray-400"
            >
              {loading ? t.loading : t.submit}
            </button>
          </form>

          <div className="mt-6 rounded-2xl bg-gray-50 p-4 text-center text-sm text-gray-600">
            {t.alreadyAccount}{" "}
            <Link href="/login" className="font-semibold text-orange-600">
              {t.login}
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
