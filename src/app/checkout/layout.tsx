import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Complete your purchase at Leaf & Lantern. Secure checkout with encrypted payment processing.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Checkout | Leaf & Lantern",
    description: "Secure checkout for your Leaf & Lantern book order.",
    url: "https://leafandlantern.com/checkout",
  },
  alternates: { canonical: "https://leafandlantern.com/checkout" },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
