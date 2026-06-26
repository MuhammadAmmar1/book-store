import { MetadataRoute } from "next";
import { mockProducts } from "@/data/mockProducts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://leafandlantern.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/shop`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/cart`, lastModified: new Date(), changeFrequency: "never", priority: 0.3 },
    { url: `${base}/wishlist`, lastModified: new Date(), changeFrequency: "never", priority: 0.3 },
    { url: `${base}/checkout`, lastModified: new Date(), changeFrequency: "never", priority: 0.2 },
    { url: `${base}/track`, lastModified: new Date(), changeFrequency: "never", priority: 0.2 },
  ];

  const productRoutes: MetadataRoute.Sitemap = mockProducts.map((book) => ({
    url: `${base}/shop/${book.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
