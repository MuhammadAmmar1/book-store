import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description:
    "Learn about Leaf & Lantern's shipping policy, rates, delivery times, international shipping, and 30-day return policy. Free shipping on orders over $40.",
  openGraph: {
    title: "Shipping & Returns | Leaf & Lantern",
    description:
      "Free shipping on domestic orders over $40. Easy 30-day returns. Learn about delivery times and international shipping.",
    url: "https://leafandlantern.com/shipping",
  },
  alternates: { canonical: "https://leafandlantern.com/shipping" },
};

export default function ShippingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
