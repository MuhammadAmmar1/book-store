import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Your Order",
  description:
    "Track your Leaf & Lantern order in real time. Enter your order number and email to see shipping status and delivery updates.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Track Your Order | Leaf & Lantern",
    description:
      "Enter your order number and email to track your Leaf & Lantern shipment.",
    url: "https://leafandlantern.com/track",
  },
  alternates: { canonical: "https://leafandlantern.com/track" },
};

export default function TrackLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
