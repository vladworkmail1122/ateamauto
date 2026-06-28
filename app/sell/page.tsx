"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { supabase } from "@/lib/supabase";

type LanguageCode = "cs" | "en" | "uk" | "ru";

const translations = {
  cs: {
    heroLabel: "ATEAM AUTO",
    title: "Přidat inzerát",
    subtitle:
      "Vyplňte údaje o vozidle, kontakt a fotografie. TOP nabídka a označení Ověřeno ATEAM SERVICE může nastavit pouze správce.",
    basicTitle: "Základní údaje",
    basicDescription: "Hlavní informace, podle kterých lidé auto najdou.",
    brand: "Značka",
    selectBrand: "Vyberte značku",
    model: "Model",
    modelPlaceholder: "Např. A6, Octavia, X5...",
    productionYear: "Rok výroby",
    selectYear: "Vyberte rok",
    mileageKm: "Najeto km",
    mileagePlaceholder: "Např. 185000",
    priceCzk: "Cena Kč",
    pricePlaceholder: "Např. 249000",
    city: "Město",
    cityPlaceholder: "Např. Jihlava, Brno, Praha",
    technicalTitle: "Technické údaje",
    technicalDescription: "Motor, převodovka, karoserie a další parametry.",
    fuel: "Palivo",
    selectFuel: "Vyberte palivo",
    transmission: "Převodovka",
    selectTransmission: "Vyberte převodovku",
    bodyType: "Karoserie",
    selectBodyType: "Vyberte karoserii",
    color: "Barva",
    selectColor: "Vyberte barvu",
    powerKw: "Výkon kW",
    powerPlaceholder: "Např. 140",
    engineVolume: "Objem motoru",
    enginePlaceholder: "Např. 2.0",
    driveType: "Pohon",
    selectDriveType: "Vyberte pohon",
    documentsTitle: "Stav a dokumenty",
    documentsDescription: "Status inzerátu, VIN, STK a další údaje.",
    status: "Status",
    vinPlaceholder: "17 znaků",
    vinCharacters: "znaků",
    ownerCount: "Počet majitelů",
    ownerPlaceholder: "Např. 2",
    euroNorm: "Euro norma",
    selectEuroNorm: "Vyberte normu",
    stkUntil: "STK do",
    contactTitle: "Kontakt na prodejce",
    contactDescription: "Tyto údaje se zobrazí u inzerátu.",
    sellerName: "Jméno prodejce",
    sellerNamePlaceholder: "Jméno nebo firma",
    phone: "Telefon",
    email: "E-mail",
    photosTitle: "Fotografie",
    photosDescription: "Nahrajte více fotek vozidla. První fotka bude hlavní.",
    vehiclePhotos: "Fotografie vozidla",
    photosTip:
      "Doporučení: nahrajte exteriér, interiér, tachometr, motor a případné vady. Maximum je 20 fotek.",
    selectedPhotos: "Vybráno fotografií",
    clearPhotos: "Vymazat fotky",
    mainPhoto: "Hlavní",
    descriptionTitle: "Popis vozidla",
    descriptionPlaceholder: "Popis vozidla, servisní historie, výbava, stav...",
    uploading: "Nahrávání...",
    submit: "Přidat inzerát",
    moreThan20Photos:
      "Vybrali jste více než 20 fotek. Nahraje se prvních 20.",
    requiredFields:
      "Vyplňte prosím povinná pole: značka, model, rok, nájezd, cena a palivo.",
    requiredTransmissionCity: "Vyplňte prosím převodovku a město.",
    vinLength:
      "VIN musí mít přesně 17 znaků. Pokud ho nechcete uvádět, nechte pole prázdné.",
    invalidNumbers: "Cena a nájezd musí být platné číslo.",
    uploadingListing: "Nahrávám inzerát...",
    createError: "Chyba při vytváření inzerátu.",
    success: "Inzerát byl úspěšně přidán.",
  },
  en: {
    heroLabel: "ATEAM AUTO",
    title: "Add listing",
    subtitle:
      "Fill in vehicle details, contact information and photos. TOP offer and Verified by ATEAM SERVICE can only be set by an administrator.",
    basicTitle: "Basic information",
    basicDescription: "Main information people use to find the car.",
    brand: "Brand",
    selectBrand: "Select brand",
    model: "Model",
    modelPlaceholder: "E.g. A6, Octavia, X5...",
    productionYear: "Year of manufacture",
    selectYear: "Select year",
    mileageKm: "Mileage km",
    mileagePlaceholder: "E.g. 185000",
    priceCzk: "Price CZK",
    pricePlaceholder: "E.g. 249000",
    city: "City",
    cityPlaceholder: "E.g. Jihlava, Brno, Prague",
    technicalTitle: "Technical data",
    technicalDescription: "Engine, transmission, body type and other parameters.",
    fuel: "Fuel",
    selectFuel: "Select fuel",
    transmission: "Transmission",
    selectTransmission: "Select transmission",
    bodyType: "Body type",
    selectBodyType: "Select body type",
    color: "Color",
    selectColor: "Select color",
    powerKw: "Power kW",
    powerPlaceholder: "E.g. 140",
    engineVolume: "Engine volume",
    enginePlaceholder: "E.g. 2.0",
    driveType: "Drive",
    selectDriveType: "Select drive",
    documentsTitle: "Condition and documents",
    documentsDescription: "Listing status, VIN, inspection and other details.",
    status: "Status",
    vinPlaceholder: "17 characters",
    vinCharacters: "characters",
    ownerCount: "Number of owners",
    ownerPlaceholder: "E.g. 2",
    euroNorm: "Euro norm",
    selectEuroNorm: "Select norm",
    stkUntil: "Inspection valid until",
    contactTitle: "Seller contact",
    contactDescription: "These details will be shown in the listing.",
    sellerName: "Seller name",
    sellerNamePlaceholder: "Name or company",
    phone: "Phone",
    email: "E-mail",
    photosTitle: "Photos",
    photosDescription: "Upload multiple vehicle photos. The first photo will be the main one.",
    vehiclePhotos: "Vehicle photos",
    photosTip:
      "Recommendation: upload exterior, interior, odometer, engine and possible defects. Maximum is 20 photos.",
    selectedPhotos: "Selected photos",
    clearPhotos: "Clear photos",
    mainPhoto: "Main",
    descriptionTitle: "Vehicle description",
    descriptionPlaceholder: "Vehicle description, service history, equipment, condition...",
    uploading: "Uploading...",
    submit: "Add listing",
    moreThan20Photos:
      "You selected more than 20 photos. The first 20 will be uploaded.",
    requiredFields:
      "Please fill in required fields: brand, model, year, mileage, price and fuel.",
    requiredTransmissionCity: "Please fill in transmission and city.",
    vinLength:
      "VIN must have exactly 17 characters. If you do not want to enter it, leave the field empty.",
    invalidNumbers: "Price and mileage must be valid numbers.",
    uploadingListing: "Uploading listing...",
    createError: "Error while creating the listing.",
    success: "Listing has been added successfully.",
  },
  uk: {
    heroLabel: "ATEAM AUTO",
    title: "Додати оголошення",
    subtitle:
      "Заповніть дані авто, контакти та фотографії. TOP пропозицію і позначку Перевірено ATEAM SERVICE може встановити тільки адміністратор.",
    basicTitle: "Основні дані",
    basicDescription: "Головна інформація, за якою люди знайдуть авто.",
    brand: "Марка",
    selectBrand: "Виберіть марку",
    model: "Модель",
    modelPlaceholder: "Напр. A6, Octavia, X5...",
    productionYear: "Рік випуску",
    selectYear: "Виберіть рік",
    mileageKm: "Пробіг км",
    mileagePlaceholder: "Напр. 185000",
    priceCzk: "Ціна Kč",
    pricePlaceholder: "Напр. 249000",
    city: "Місто",
    cityPlaceholder: "Напр. Jihlava, Brno, Praha",
    technicalTitle: "Технічні дані",
    technicalDescription: "Двигун, коробка, кузов та інші параметри.",
    fuel: "Паливо",
    selectFuel: "Виберіть паливо",
    transmission: "Коробка",
    selectTransmission: "Виберіть коробку",
    bodyType: "Кузов",
    selectBodyType: "Виберіть кузов",
    color: "Колір",
    selectColor: "Виберіть колір",
    powerKw: "Потужність kW",
    powerPlaceholder: "Напр. 140",
    engineVolume: "Обʼєм двигуна",
    enginePlaceholder: "Напр. 2.0",
    driveType: "Привід",
    selectDriveType: "Виберіть привід",
    documentsTitle: "Стан і документи",
    documentsDescription: "Статус оголошення, VIN, STK та інші дані.",
    status: "Статус",
    vinPlaceholder: "17 символів",
    vinCharacters: "символів",
    ownerCount: "Кількість власників",
    ownerPlaceholder: "Напр. 2",
    euroNorm: "Євро норма",
    selectEuroNorm: "Виберіть норму",
    stkUntil: "STK до",
    contactTitle: "Контакт продавця",
    contactDescription: "Ці дані будуть показані в оголошенні.",
    sellerName: "Імʼя продавця",
    sellerNamePlaceholder: "Імʼя або компанія",
    phone: "Телефон",
    email: "E-mail",
    photosTitle: "Фотографії",
    photosDescription: "Завантажте кілька фото авто. Перше фото буде головним.",
    vehiclePhotos: "Фотографії авто",
    photosTip:
      "Рекомендація: завантажте екстерʼєр, інтерʼєр, одометр, двигун і можливі дефекти. Максимум 20 фото.",
    selectedPhotos: "Вибрано фото",
    clearPhotos: "Очистити фото",
    mainPhoto: "Головне",
    descriptionTitle: "Опис авто",
    descriptionPlaceholder: "Опис авто, сервісна історія, комплектація, стан...",
    uploading: "Завантаження...",
    submit: "Додати оголошення",
    moreThan20Photos:
      "Ви вибрали більше ніж 20 фото. Буде завантажено перші 20.",
    requiredFields:
      "Заповніть обовʼязкові поля: марка, модель, рік, пробіг, ціна і паливо.",
    requiredTransmissionCity: "Заповніть коробку передач і місто.",
    vinLength:
      "VIN має містити рівно 17 символів. Якщо не хочете його вказувати, залиште поле порожнім.",
    invalidNumbers: "Ціна і пробіг мають бути коректними числами.",
    uploadingListing: "Завантажую оголошення...",
    createError: "Помилка при створенні оголошення.",
    success: "Оголошення успішно додано.",
  },
  ru: {
    heroLabel: "ATEAM AUTO",
    title: "Добавить объявление",
    subtitle:
      "Заполните данные авто, контакты и фотографии. TOP предложение и отметку Проверено ATEAM SERVICE может установить только администратор.",
    basicTitle: "Основные данные",
    basicDescription: "Главная информация, по которой люди найдут авто.",
    brand: "Марка",
    selectBrand: "Выберите марку",
    model: "Модель",
    modelPlaceholder: "Напр. A6, Octavia, X5...",
    productionYear: "Год выпуска",
    selectYear: "Выберите год",
    mileageKm: "Пробег км",
    mileagePlaceholder: "Напр. 185000",
    priceCzk: "Цена Kč",
    pricePlaceholder: "Напр. 249000",
    city: "Город",
    cityPlaceholder: "Напр. Jihlava, Brno, Praha",
    technicalTitle: "Технические данные",
    technicalDescription: "Двигатель, коробка, кузов и другие параметры.",
    fuel: "Топливо",
    selectFuel: "Выберите топливо",
    transmission: "Коробка",
    selectTransmission: "Выберите коробку",
    bodyType: "Кузов",
    selectBodyType: "Выберите кузов",
    color: "Цвет",
    selectColor: "Выберите цвет",
    powerKw: "Мощность kW",
    powerPlaceholder: "Напр. 140",
    engineVolume: "Объём двигателя",
    enginePlaceholder: "Напр. 2.0",
    driveType: "Привод",
    selectDriveType: "Выберите привод",
    documentsTitle: "Состояние и документы",
    documentsDescription: "Статус объявления, VIN, STK и другие данные.",
    status: "Статус",
    vinPlaceholder: "17 символов",
    vinCharacters: "символов",
    ownerCount: "Количество владельцев",
    ownerPlaceholder: "Напр. 2",
    euroNorm: "Евро норма",
    selectEuroNorm: "Выберите норму",
    stkUntil: "STK до",
    contactTitle: "Контакт продавца",
    contactDescription: "Эти данные будут показаны в объявлении.",
    sellerName: "Имя продавца",
    sellerNamePlaceholder: "Имя или компания",
    phone: "Телефон",
    email: "E-mail",
    photosTitle: "Фотографии",
    photosDescription: "Загрузите несколько фото авто. Первое фото будет главным.",
    vehiclePhotos: "Фотографии авто",
    photosTip:
      "Рекомендация: загрузите экстерьер, интерьер, одометр, двигатель и возможные дефекты. Максимум 20 фото.",
    selectedPhotos: "Выбрано фото",
    clearPhotos: "Очистить фото",
    mainPhoto: "Главное",
    descriptionTitle: "Описание авто",
    descriptionPlaceholder: "Описание авто, сервисная история, комплектация, состояние...",
    uploading: "Загрузка...",
    submit: "Добавить объявление",
    moreThan20Photos:
      "Вы выбрали больше 20 фото. Будут загружены первые 20.",
    requiredFields:
      "Заполните обязательные поля: марка, модель, год, пробег, цена и топливо.",
    requiredTransmissionCity: "Заполните коробку передач и город.",
    vinLength:
      "VIN должен содержать ровно 17 символов. Если не хотите указывать VIN, оставьте поле пустым.",
    invalidNumbers: "Цена и пробег должны быть корректными числами.",
    uploadingListing: "Загружаю объявление...",
    createError: "Ошибка при создании объявления.",
    success: "Объявление успешно добавлено.",
  },
};

const valueTranslations = {
  brand: {
    Jiné: { cs: "Jiné", en: "Other", uk: "Інше", ru: "Другое" },
  },
  fuel: {
    Benzín: { cs: "Benzín", en: "Petrol", uk: "Бензин", ru: "Бензин" },
    Nafta: { cs: "Nafta", en: "Diesel", uk: "Дизель", ru: "Дизель" },
    Hybrid: { cs: "Hybrid", en: "Hybrid", uk: "Гібрид", ru: "Гибрид" },
    "Plug-in hybrid": {
      cs: "Plug-in hybrid",
      en: "Plug-in hybrid",
      uk: "Plug-in гібрид",
      ru: "Plug-in гибрид",
    },
    Elektro: { cs: "Elektro", en: "Electric", uk: "Електро", ru: "Электро" },
    LPG: { cs: "LPG", en: "LPG", uk: "LPG", ru: "LPG" },
    CNG: { cs: "CNG", en: "CNG", uk: "CNG", ru: "CNG" },
  },
  transmission: {
    Manuální: { cs: "Manuální", en: "Manual", uk: "Механіка", ru: "Механика" },
    Automatická: {
      cs: "Automatická",
      en: "Automatic",
      uk: "Автомат",
      ru: "Автомат",
    },
    DSG: { cs: "DSG", en: "DSG", uk: "DSG", ru: "DSG" },
    CVT: { cs: "CVT", en: "CVT", uk: "CVT", ru: "CVT" },
  },
  bodyType: {
    Sedan: { cs: "Sedan", en: "Sedan", uk: "Седан", ru: "Седан" },
    Combi: { cs: "Combi", en: "Estate", uk: "Універсал", ru: "Универсал" },
    Hatchback: {
      cs: "Hatchback",
      en: "Hatchback",
      uk: "Хетчбек",
      ru: "Хэтчбек",
    },
    SUV: { cs: "SUV", en: "SUV", uk: "SUV", ru: "SUV" },
    Kupé: { cs: "Kupé", en: "Coupe", uk: "Купе", ru: "Купе" },
    Kabriolet: {
      cs: "Kabriolet",
      en: "Convertible",
      uk: "Кабріолет",
      ru: "Кабриолет",
    },
    MPV: { cs: "MPV", en: "MPV", uk: "MPV", ru: "MPV" },
    Pickup: { cs: "Pickup", en: "Pickup", uk: "Пікап", ru: "Пикап" },
    Dodávka: { cs: "Dodávka", en: "Van", uk: "Фургон", ru: "Фургон" },
  },
  color: {
    Bílá: { cs: "Bílá", en: "White", uk: "Білий", ru: "Белый" },
    Černá: { cs: "Černá", en: "Black", uk: "Чорний", ru: "Чёрный" },
    Šedá: { cs: "Šedá", en: "Grey", uk: "Сірий", ru: "Серый" },
    Stříbrná: {
      cs: "Stříbrná",
      en: "Silver",
      uk: "Срібний",
      ru: "Серебристый",
    },
    Modrá: { cs: "Modrá", en: "Blue", uk: "Синій", ru: "Синий" },
    Červená: { cs: "Červená", en: "Red", uk: "Червоний", ru: "Красный" },
    Zelená: { cs: "Zelená", en: "Green", uk: "Зелений", ru: "Зелёный" },
    Hnědá: { cs: "Hnědá", en: "Brown", uk: "Коричневий", ru: "Коричневый" },
    Béžová: { cs: "Béžová", en: "Beige", uk: "Бежевий", ru: "Бежевый" },
    Žlutá: { cs: "Žlutá", en: "Yellow", uk: "Жовтий", ru: "Жёлтый" },
    Oranžová: {
      cs: "Oranžová",
      en: "Orange",
      uk: "Помаранчевий",
      ru: "Оранжевый",
    },
    Zlatá: { cs: "Zlatá", en: "Gold", uk: "Золотий", ru: "Золотой" },
    Fialová: { cs: "Fialová", en: "Purple", uk: "Фіолетовий", ru: "Фиолетовый" },
    Jiná: { cs: "Jiná", en: "Other", uk: "Інший", ru: "Другой" },
  },
  status: {
    Aktivní: { cs: "Aktivní", en: "Active", uk: "Активне", ru: "Активно" },
    Rezervováno: {
      cs: "Rezervováno",
      en: "Reserved",
      uk: "Зарезервовано",
      ru: "Зарезервировано",
    },
    Prodáno: { cs: "Prodáno", en: "Sold", uk: "Продано", ru: "Продано" },
  },
  driveType: {
    "Přední náhon": {
      cs: "Přední náhon",
      en: "Front-wheel drive",
      uk: "Передній привід",
      ru: "Передний привод",
    },
    "Zadní náhon": {
      cs: "Zadní náhon",
      en: "Rear-wheel drive",
      uk: "Задній привід",
      ru: "Задний привод",
    },
    "4x4 / AWD": { cs: "4x4 / AWD", en: "4x4 / AWD", uk: "4x4 / AWD", ru: "4x4 / AWD" },
  },
};

const carBrands = [
  "Audi",
  "BMW",
  "Mercedes-Benz",
  "Volkswagen",
  "Škoda",
  "Seat",
  "Cupra",
  "Porsche",
  "Toyota",
  "Honda",
  "Mazda",
  "Nissan",
  "Mitsubishi",
  "Subaru",
  "Suzuki",
  "Lexus",
  "Infiniti",
  "Ford",
  "Chevrolet",
  "Jeep",
  "Dodge",
  "Cadillac",
  "Tesla",
  "Hyundai",
  "Kia",
  "Peugeot",
  "Renault",
  "Citroën",
  "DS",
  "Opel",
  "Fiat",
  "Alfa Romeo",
  "Lancia",
  "Volvo",
  "Saab",
  "Polestar",
  "Land Rover",
  "Range Rover",
  "Jaguar",
  "Mini",
  "Smart",
  "Bentley",
  "Rolls-Royce",
  "Ferrari",
  "Lamborghini",
  "Maserati",
  "Aston Martin",
  "McLaren",
  "Dacia",
  "MG",
  "BYD",
  "Jiné",
];

const years = Array.from({ length: 2026 - 1990 + 1 }, (_, index) =>
  String(2026 - index),
);

const fuels = [
  "Benzín",
  "Nafta",
  "Hybrid",
  "Plug-in hybrid",
  "Elektro",
  "LPG",
  "CNG",
];

const transmissions = ["Manuální", "Automatická", "DSG", "CVT"];

const bodyTypes = [
  "Sedan",
  "Combi",
  "Hatchback",
  "SUV",
  "Kupé",
  "Kabriolet",
  "MPV",
  "Pickup",
  "Dodávka",
];

const colors = [
  "Bílá",
  "Černá",
  "Šedá",
  "Stříbrná",
  "Modrá",
  "Červená",
  "Zelená",
  "Hnědá",
  "Béžová",
  "Žlutá",
  "Oranžová",
  "Zlatá",
  "Fialová",
  "Jiná",
];

const statuses = ["Aktivní", "Rezervováno", "Prodáno"];

const driveTypes = ["Přední náhon", "Zadní náhon", "4x4 / AWD"];

const euroNorms = ["Euro 3", "Euro 4", "Euro 5", "Euro 6", "Euro 6d"];

function isLanguageCode(value: string | null): value is LanguageCode {
  return value === "cs" || value === "en" || value === "uk" || value === "ru";
}

function translateOption(
  group: keyof typeof valueTranslations,
  value: string,
  language: LanguageCode,
) {
  const translation = valueTranslations[group][
    value as keyof (typeof valueTranslations)[typeof group]
  ] as Record<LanguageCode, string> | undefined;

  return translation?.[language] || value;
}

function createSlug(brand: string, model: string, year: string) {
  return `${brand}-${model}-${year}`
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeVin(value: string) {
  return value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 17);
}

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-xl font-black text-gray-900 sm:text-2xl">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm leading-6 text-gray-500">
            {description}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}

function FieldLabel({
  children,
  required,
}: {
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label className="mb-2 block text-sm font-bold text-gray-700">
      {children}
      {required && <span className="text-orange-600"> *</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100";

const selectClass =
  "w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100";

export default function SellPage() {
  const [language, setLanguage] = useState<LanguageCode>("cs");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [price, setPrice] = useState("");
  const [fuel, setFuel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [power, setPower] = useState("");
  const [engineVolume, setEngineVolume] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [color, setColor] = useState("");
  const [status, setStatus] = useState("Aktivní");
  const [vin, setVin] = useState("");
  const [driveType, setDriveType] = useState("");
  const [ownerCount, setOwnerCount] = useState("");
  const [euroNorm, setEuroNorm] = useState("");
  const [stkUntil, setStkUntil] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerPhone, setSellerPhone] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<
    { name: string; url: string }[]
  >([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">(
    "info",
  );
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

  useEffect(() => {
    return () => {
      filePreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [filePreviews]);

  function handleFilesChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files || []).filter((file) =>
      file.type.startsWith("image/"),
    );

    const limitedFiles = selectedFiles.slice(0, 20);

    filePreviews.forEach((preview) => URL.revokeObjectURL(preview.url));

    setFiles(limitedFiles);
    setFilePreviews(
      limitedFiles.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      })),
    );

    if (selectedFiles.length > 20) {
      setMessageType("info");
      setMessage(t.moreThan20Photos);
    } else {
      setMessage("");
    }
  }

  function validateForm() {
    if (!brand || !model || !year || !mileage || !price || !fuel) {
      return t.requiredFields;
    }

    if (!transmission || !city) {
      return t.requiredTransmissionCity;
    }

    if (vin && vin.length !== 17) {
      return t.vinLength;
    }

    if (Number(price) <= 0 || Number(mileage) < 0) {
      return t.invalidNumbers;
    }

    return "";
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setMessageType("error");
      setMessage(validationError);
      return;
    }

    setLoading(true);
    setMessageType("info");
    setMessage(t.uploadingListing);

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      window.location.href = "/login";
      return;
    }

    const { data: carData, error: carError } = await supabase
      .from("cars")
      .insert({
        user_id: userData.user.id,
        brand,
        model,
        slug: createSlug(brand, model, year),
        year: Number(year),
        mileage: Number(mileage),
        price: Number(price),
        fuel,
        transmission,
        power: power ? Number(power) : null,
        engine_volume: engineVolume ? Number(engineVolume) : null,
        body_type: bodyType,
        color,
        status,
        vin: vin || null,
        drive_type: driveType,
        owner_count: ownerCount ? Number(ownerCount) : null,
        euro_norm: euroNorm,
        stk_until: stkUntil || null,
        is_featured: false,
        is_verified_by_ateam: false,
        city,
        description,
        seller_name: sellerName,
        seller_phone: sellerPhone,
        seller_email: sellerEmail,
        image_url: null,
      })
      .select()
      .single();

    if (carError || !carData) {
      setLoading(false);
      setMessageType("error");
      setMessage(carError?.message || t.createError);
      return;
    }

    let firstImageUrl: string | null = null;

    for (const file of files) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${userData.user.id}/${carData.id}/${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("cars")
        .upload(fileName, file);

      if (uploadError) {
        setLoading(false);
        setMessageType("error");
        setMessage(uploadError.message);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("cars")
        .getPublicUrl(fileName);

      const imageUrl = publicUrlData.publicUrl;

      if (!firstImageUrl) {
        firstImageUrl = imageUrl;
      }

      const { error: imageError } = await supabase.from("car_images").insert({
        car_id: carData.id,
        image_url: imageUrl,
      });

      if (imageError) {
        setLoading(false);
        setMessageType("error");
        setMessage(imageError.message);
        return;
      }
    }

    if (firstImageUrl) {
      await supabase
        .from("cars")
        .update({ image_url: firstImageUrl })
        .eq("id", carData.id);
    }

    setMessageType("success");
    setMessage(t.success);
    window.location.href = `/cars/${carData.slug || carData.id}`;
  }

  const messageClass =
    messageType === "error"
      ? "border-red-200 bg-red-50 text-red-700"
      : messageType === "success"
        ? "border-green-200 bg-green-50 text-green-700"
        : "border-blue-200 bg-blue-50 text-blue-700";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 text-gray-900 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 overflow-hidden rounded-3xl bg-gray-900 p-6 text-white shadow-sm sm:mb-8 sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-400">
            {t.heroLabel}
          </p>

          <h1 className="mt-3 text-3xl font-black sm:text-5xl">
            {t.title}
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-300 sm:text-base">
            {t.subtitle}
          </p>
        </div>

        {message && (
          <p className={`mb-5 rounded-2xl border p-4 font-semibold ${messageClass}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="grid gap-5">
          <FormSection title={t.basicTitle} description={t.basicDescription}>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <FieldLabel required>{t.brand}</FieldLabel>
                <select
                  className={selectClass}
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                >
                  <option value="">{t.selectBrand}</option>
                  {carBrands.map((item) => (
                    <option key={item} value={item}>
                      {translateOption("brand", item, language)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <FieldLabel required>{t.model}</FieldLabel>
                <input
                  className={inputClass}
                  placeholder={t.modelPlaceholder}
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  required
                />
              </div>

              <div>
                <FieldLabel required>{t.productionYear}</FieldLabel>
                <select
                  className={selectClass}
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                >
                  <option value="">{t.selectYear}</option>
                  {years.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <FieldLabel required>{t.mileageKm}</FieldLabel>
                <input
                  className={inputClass}
                  inputMode="numeric"
                  placeholder={t.mileagePlaceholder}
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                  required
                />
              </div>

              <div>
                <FieldLabel required>{t.priceCzk}</FieldLabel>
                <input
                  className={inputClass}
                  inputMode="numeric"
                  placeholder={t.pricePlaceholder}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div>
                <FieldLabel required>{t.city}</FieldLabel>
                <input
                  className={inputClass}
                  placeholder={t.cityPlaceholder}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
            </div>
          </FormSection>

          <FormSection
            title={t.technicalTitle}
            description={t.technicalDescription}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <FieldLabel required>{t.fuel}</FieldLabel>
                <select
                  className={selectClass}
                  value={fuel}
                  onChange={(e) => setFuel(e.target.value)}
                  required
                >
                  <option value="">{t.selectFuel}</option>
                  {fuels.map((item) => (
                    <option key={item} value={item}>
                      {translateOption("fuel", item, language)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <FieldLabel required>{t.transmission}</FieldLabel>
                <select
                  className={selectClass}
                  value={transmission}
                  onChange={(e) => setTransmission(e.target.value)}
                  required
                >
                  <option value="">{t.selectTransmission}</option>
                  {transmissions.map((item) => (
                    <option key={item} value={item}>
                      {translateOption("transmission", item, language)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <FieldLabel>{t.bodyType}</FieldLabel>
                <select
                  className={selectClass}
                  value={bodyType}
                  onChange={(e) => setBodyType(e.target.value)}
                >
                  <option value="">{t.selectBodyType}</option>
                  {bodyTypes.map((item) => (
                    <option key={item} value={item}>
                      {translateOption("bodyType", item, language)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <FieldLabel>{t.color}</FieldLabel>
                <select
                  className={selectClass}
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                >
                  <option value="">{t.selectColor}</option>
                  {colors.map((item) => (
                    <option key={item} value={item}>
                      {translateOption("color", item, language)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <FieldLabel>{t.powerKw}</FieldLabel>
                <input
                  className={inputClass}
                  inputMode="numeric"
                  placeholder={t.powerPlaceholder}
                  value={power}
                  onChange={(e) => setPower(e.target.value)}
                />
              </div>

              <div>
                <FieldLabel>{t.engineVolume}</FieldLabel>
                <input
                  className={inputClass}
                  inputMode="decimal"
                  placeholder={t.enginePlaceholder}
                  value={engineVolume}
                  onChange={(e) => setEngineVolume(e.target.value)}
                />
              </div>

              <div className="md:col-span-2">
                <FieldLabel>{t.driveType}</FieldLabel>
                <select
                  className={selectClass}
                  value={driveType}
                  onChange={(e) => setDriveType(e.target.value)}
                >
                  <option value="">{t.selectDriveType}</option>
                  {driveTypes.map((item) => (
                    <option key={item} value={item}>
                      {translateOption("driveType", item, language)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </FormSection>

          <FormSection
            title={t.documentsTitle}
            description={t.documentsDescription}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <FieldLabel>{t.status}</FieldLabel>
                <select
                  className={selectClass}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {statuses.map((item) => (
                    <option key={item} value={item}>
                      {translateOption("status", item, language)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <FieldLabel>VIN</FieldLabel>
                <input
                  className={inputClass}
                  placeholder={t.vinPlaceholder}
                  value={vin}
                  maxLength={17}
                  onChange={(e) => setVin(normalizeVin(e.target.value))}
                />
                <p
                  className={`mt-2 text-xs font-semibold ${
                    vin.length === 0 || vin.length === 17
                      ? "text-gray-500"
                      : "text-orange-600"
                  }`}
                >
                  {vin.length}/17 {t.vinCharacters}
                </p>
              </div>

              <div>
                <FieldLabel>{t.ownerCount}</FieldLabel>
                <input
                  className={inputClass}
                  inputMode="numeric"
                  placeholder={t.ownerPlaceholder}
                  value={ownerCount}
                  onChange={(e) => setOwnerCount(e.target.value)}
                />
              </div>

              <div>
                <FieldLabel>{t.euroNorm}</FieldLabel>
                <select
                  className={selectClass}
                  value={euroNorm}
                  onChange={(e) => setEuroNorm(e.target.value)}
                >
                  <option value="">{t.selectEuroNorm}</option>
                  {euroNorms.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <FieldLabel>{t.stkUntil}</FieldLabel>
                <input
                  type="date"
                  className={inputClass}
                  value={stkUntil}
                  onChange={(e) => setStkUntil(e.target.value)}
                />
              </div>
            </div>
          </FormSection>

          <FormSection title={t.contactTitle} description={t.contactDescription}>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <FieldLabel>{t.sellerName}</FieldLabel>
                <input
                  className={inputClass}
                  placeholder={t.sellerNamePlaceholder}
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                />
              </div>

              <div>
                <FieldLabel>{t.phone}</FieldLabel>
                <input
                  className={inputClass}
                  placeholder="+420..."
                  value={sellerPhone}
                  onChange={(e) => setSellerPhone(e.target.value)}
                />
              </div>

              <div>
                <FieldLabel>{t.email}</FieldLabel>
                <input
                  className={inputClass}
                  type="email"
                  placeholder="email@example.com"
                  value={sellerEmail}
                  onChange={(e) => setSellerEmail(e.target.value)}
                />
              </div>
            </div>
          </FormSection>

          <FormSection title={t.photosTitle} description={t.photosDescription}>
            <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-5">
              <label className="block font-black text-gray-900">
                {t.vehiclePhotos}
              </label>

              <p className="mt-1 text-sm text-gray-500">{t.photosTip}</p>

              <input
                type="file"
                accept="image/*"
                multiple
                className="mt-4 w-full rounded-xl bg-white p-3"
                onChange={handleFilesChange}
              />

              {filePreviews.length > 0 && (
                <div className="mt-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-sm font-bold text-gray-700">
                      {t.selectedPhotos}: {filePreviews.length}
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        filePreviews.forEach((preview) =>
                          URL.revokeObjectURL(preview.url),
                        );
                        setFiles([]);
                        setFilePreviews([]);
                      }}
                      className="text-sm font-bold text-red-600 hover:underline"
                    >
                      {t.clearPhotos}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {filePreviews.map((preview, index) => (
                      <div
                        key={`${preview.name}-${index}`}
                        className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200"
                      >
                        <div className="relative">
                          {index === 0 && (
                            <span className="absolute left-2 top-2 rounded-full bg-orange-600 px-2 py-1 text-[10px] font-black text-white">
                              {t.mainPhoto}
                            </span>
                          )}

                          <img
                            src={preview.url}
                            alt={preview.name}
                            className="h-32 w-full object-cover"
                          />
                        </div>

                        <p className="truncate px-3 py-2 text-xs text-gray-500">
                          {preview.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </FormSection>

          <FormSection title={t.descriptionTitle}>
            <textarea
              className="min-h-40 w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              placeholder={t.descriptionPlaceholder}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormSection>

          <button
            disabled={loading}
            className="rounded-3xl bg-orange-600 py-4 text-lg font-black text-white shadow-sm transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {loading ? t.uploading : t.submit}
          </button>
        </form>
      </div>
    </main>
  );
}
