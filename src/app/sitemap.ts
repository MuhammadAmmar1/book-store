import { MetadataRoute } from "next";
import { mockProducts } from "@/data/mockProducts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://leafandlantern.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/shop`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/shipping`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/cart`, lastModified: new Date(), changeFrequency: "never", priority: 0.2 },
    { url: `${base}/wishlist`, lastModified: new Date(), changeFrequency: "never", priority: 0.2 },
    { url: `${base}/checkout`, lastModified: new Date(), changeFrequency: "never", priority: 0.1 },
    { url: `${base}/track`, lastModified: new Date(), changeFrequency: "never", priority: 0.2 },
  ];

  const productRoutes: MetadataRoute.Sitemap = mockProducts.map((book) => ({
    url: `${base}/shop/${book.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const readRoutes: MetadataRoute.Sitemap = mockProducts
    .filter((b) => b.id === "book-010" || b.id === "book-005")
    .map((book) => ({
      url: `${base}/read/${book.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...staticRoutes, ...productRoutes, ...readRoutes];
}
