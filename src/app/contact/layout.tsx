import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Leaf & Lantern. Need help with an order, want a reading recommendation, or have a story to share? Our booksellers are glad to help. Email, phone, or live chat available.",
  openGraph: {
    title: "Contact Us | Leaf & Lantern",
    description:
      "Reach out to the Leaf & Lantern bookseller team. We reply within one business day.",
    url: "https://leafandlantern.com/contact",
  },
  alternates: { canonical: "https://leafandlantern.com/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
