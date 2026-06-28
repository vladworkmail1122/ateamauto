import { supabase } from "@/lib/supabase";
import CarsPageClient, {
  type CatalogCar,
  type CarsSearchParams,
} from "./CarsPageClient";

export const revalidate = 0;

const carsPerPage = 24;

export default async function CarsPage({
  searchParams,
}: {
  searchParams: CarsSearchParams;
}) {
  const currentPage = Math.max(Number(searchParams.page || "1"), 1);

  let query = supabase.from("cars").select("*");

  if (searchParams.search) {
    const search = searchParams.search.trim();

    query = query.or(
      [
        `brand.ilike.%${search}%`,
        `model.ilike.%${search}%`,
        `vin.ilike.%${search}%`,
        `city.ilike.%${search}%`,
        `fuel.ilike.%${search}%`,
        `transmission.ilike.%${search}%`,
        `body_type.ilike.%${search}%`,
        `color.ilike.%${search}%`,
        `drive_type.ilike.%${search}%`,
        `euro_norm.ilike.%${search}%`,
        `status.ilike.%${search}%`,
        /^\d+$/.test(search) ? `id.eq.${search}` : "",
      ]
        .filter(Boolean)
        .join(","),
    );
  }

  if (searchParams.brand) query = query.eq("brand", searchParams.brand);
  if (searchParams.model) {
    query = query.ilike("model", `%${searchParams.model}%`);
  }
  if (searchParams.priceFrom) {
    query = query.gte("price", Number(searchParams.priceFrom));
  }
  if (searchParams.priceTo) {
    query = query.lte("price", Number(searchParams.priceTo));
  }
  if (searchParams.yearFrom) {
    query = query.gte("year", Number(searchParams.yearFrom));
  }
  if (searchParams.yearTo) {
    query = query.lte("year", Number(searchParams.yearTo));
  }
  if (searchParams.engineFrom) {
    query = query.gte("engine_volume", Number(searchParams.engineFrom));
  }
  if (searchParams.engineTo) {
    query = query.lte("engine_volume", Number(searchParams.engineTo));
  }
  if (searchParams.fuel) query = query.eq("fuel", searchParams.fuel);
  if (searchParams.transmission) {
    query = query.eq("transmission", searchParams.transmission);
  }
  if (searchParams.bodyType) {
    query = query.eq("body_type", searchParams.bodyType);
  }
  if (searchParams.color) query = query.eq("color", searchParams.color);
  if (searchParams.status) query = query.eq("status", searchParams.status);
  if (searchParams.driveType) {
    query = query.eq("drive_type", searchParams.driveType);
  }
  if (searchParams.euroNorm) {
    query = query.eq("euro_norm", searchParams.euroNorm);
  }
  if (searchParams.city) {
    query = query.ilike("city", `%${searchParams.city}%`);
  }

  switch (searchParams.sort) {
    case "price_asc":
      query = query.order("price", { ascending: true });
      break;
    case "price_desc":
      query = query.order("price", { ascending: false });
      break;
    case "mileage_asc":
      query = query.order("mileage", { ascending: true });
      break;
    case "year_desc":
      query = query.order("year", { ascending: false });
      break;
    case "power_desc":
      query = query.order("power", { ascending: false });
      break;
    case "engine_asc":
      query = query.order("engine_volume", { ascending: true });
      break;
    case "engine_desc":
      query = query.order("engine_volume", { ascending: false });
      break;
    case "views_desc":
      query = query.order("views", { ascending: false });
      break;
    case "oldest":
      query = query.order("id", { ascending: true });
      break;
    default:
      query = query.order("id", { ascending: false });
      break;
  }

  const { data: cars, error } = await query;

  if (error) {
    return (
      <div className="p-10">
        Chyba načítání vozidel: {error.message}
      </div>
    );
  }

  const sortedCars =
    cars?.sort((a, b) => {
      if (a.is_featured && !b.is_featured) return -1;
      if (!a.is_featured && b.is_featured) return 1;
      return 0;
    }) || [];

  const totalCars = sortedCars.length;
  const totalPages = Math.max(Math.ceil(totalCars / carsPerPage), 1);
  const startIndex = (currentPage - 1) * carsPerPage;
  const paginatedCars = sortedCars.slice(startIndex, startIndex + carsPerPage);

  return (
    <CarsPageClient
      cars={paginatedCars as CatalogCar[]}
      searchParams={searchParams}
      currentPage={currentPage}
      totalCars={totalCars}
      totalPages={totalPages}
    />
  );
}
