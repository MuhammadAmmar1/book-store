import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Wishlist",
  description:
    "View and manage your saved books at Leaf & Lantern. Move items to your cart or remove them from your wishlist.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "Your Wishlist | Leaf & Lantern",
    description:
      "Books you've saved for later at Leaf & Lantern.",
    url: "https://leafandlantern.com/wishlist",
  },
  alternates: { canonical: "https://leafandlantern.com/wishlist" },
};

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
