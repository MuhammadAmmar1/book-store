import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Books",
  description:
    "Browse our carefully curated collection of literary masterpieces, from timeless classics to contemporary bestsellers. Search by genre, author, or price to find your next great read.",
  openGraph: {
    title: "Shop Books | Leaf & Lantern",
    description:
      "Browse our carefully curated collection of literary masterpieces. Find fiction, non-fiction, self-growth, programming, poetry, and more.",
    url: "https://leafandlantern.com/shop",
  },
  twitter: {
    title: "Shop Books | Leaf & Lantern",
    description:
      "Browse the Leaf & Lantern curated collection — fiction, non-fiction, and more.",
  },
  alternates: {
    canonical: "https://leafandlantern.com/shop",
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
