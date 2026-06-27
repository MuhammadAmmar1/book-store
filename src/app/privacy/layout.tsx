import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Leaf & Lantern's privacy policy. Learn how we collect, use, and protect your personal information. We never sell your data.",
  openGraph: {
    title: "Privacy Policy | Leaf & Lantern",
    description:
      "Your privacy matters to us. Read about how Leaf & Lantern collects, uses, and protects your data.",
    url: "https://leafandlantern.com/privacy",
  },
  alternates: { canonical: "https://leafandlantern.com/privacy" },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
