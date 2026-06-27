import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Reader",
  description:
    "Read books online for free at Leaf & Lantern. Enjoy a customizable reading experience with light, sepia, and dark modes.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://leafandlantern.com/read" },
};

export default function ReadLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
