import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions",
  description:
    "Find answers to common questions about ordering, shipping, returns, payments, accounts, and privacy at Leaf & Lantern. Fast help for every reader.",
  openGraph: {
    title: "FAQ | Leaf & Lantern",
    description:
      "Everything you need to know about ordering, shipping, returns, and more at Leaf & Lantern.",
    url: "https://leafandlantern.com/faq",
  },
  alternates: { canonical: "https://leafandlantern.com/faq" },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
