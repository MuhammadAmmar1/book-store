import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Leaf & Lantern's terms and conditions. Read about account responsibilities, intellectual property, pricing, and limitations of liability.",
  openGraph: {
    title: "Terms of Service | Leaf & Lantern",
    description: "Legal terms governing your use of Leaf & Lantern and purchase of books.",
    url: "https://leafandlantern.com/terms",
  },
  alternates: { canonical: "https://leafandlantern.com/terms" },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
