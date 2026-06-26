import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Leaf & Lantern | Premium Online Bookstore",
    template: "%s | Leaf & Lantern",
  },
  description:
    "Discover curated collections of books that inspire imagination, creativity, and lifelong learning. Shop fiction, non-fiction, self-growth, and more.",
  keywords: ["bookstore", "books", "online bookstore", "buy books", "leaf and lantern"],
  authors: [{ name: "Leaf & Lantern" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://leafandlantern.com",
    siteName: "Leaf & Lantern",
    title: "Leaf & Lantern | Premium Online Bookstore",
    description:
      "Discover curated collections of books that inspire imagination, creativity, and lifelong learning.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Leaf & Lantern — Premium Online Bookstore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leaf & Lantern | Premium Online Bookstore",
    description: "Discover curated book collections that inspire and enlighten.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  metadataBase: new URL("https://leafandlantern.com"),
};

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { StoreProvider } from "@/store/StoreContext";
import { PageTransition } from "@/components/providers/PageTransition";
import { ReadingProgressBar } from "@/components/ui/ReadingProgressBar";
import { BackToTop } from "@/components/ui/BackToTop";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {/* Accessibility: skip to main content */}
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <StoreProvider>
            {/* Global reading progress bar */}
            <ReadingProgressBar />

            <PageTransition>
              <div id="main-content">{children}</div>
            </PageTransition>

            {/* Floating back to top */}
            <BackToTop />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
