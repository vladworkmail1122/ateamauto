import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/cars`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/sell`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const { data: cars } = await supabase
    .from("cars")
    .select("id, slug")
    .order("id", { ascending: false });

  const carPages: MetadataRoute.Sitemap =
    cars?.map((car) => ({
      url: `${siteUrl}/cars/${car.slug || car.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })) || [];

  return [...staticPages, ...carPages];
}