import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Learn about Leaf & Lantern — a premium independent bookstore born from a love of literature and a belief that books deserve a beautiful home.",
  openGraph: {
    title: "Our Story | Leaf & Lantern",
    description:
      "A premium independent bookstore born from a love of literature and a belief that books deserve a beautiful home.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
