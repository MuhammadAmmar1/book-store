import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description:
    "Review your selected books, apply promo codes, and proceed to checkout at Leaf & Lantern.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "Shopping Cart | Leaf & Lantern",
    description: "Review your cart and proceed to checkout at Leaf & Lantern.",
    url: "https://leafandlantern.com/cart",
  },
  alternates: { canonical: "https://leafandlantern.com/cart" },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
