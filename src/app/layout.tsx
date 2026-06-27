import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Leaf & Lantern | Premium Online Bookstore",
    template: "%s | Leaf & Lantern",
  },
  description:
    "Discover curated collections of books that inspire imagination, creativity, and lifelong learning. Shop fiction, non-fiction, self-growth, and more at Leaf & Lantern — your premium independent online bookstore.",
  keywords: [
    "bookstore",
    "online bookstore",
    "buy books online",
    "independent bookstore",
    "curated books",
    "leaf and lantern",
    "fiction books",
    "non-fiction",
    "best sellers",
    "book recommendations",
    "Portland bookstore",
  ],
  authors: [{ name: "Leaf & Lantern" }],
  creator: "Leaf & Lantern",
  publisher: "Leaf & Lantern",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  manifest: "/site.webmanifest",
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
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Leaf & Lantern — Premium Online Bookstore",
      },
    ],
    countryName: "United States",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leaf & Lantern | Premium Online Bookstore",
    description: "Discover curated book collections that inspire and enlighten.",
    images: ["/og-image.svg"],
    site: "@leafandlantern",
    creator: "@leafandlantern",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL("https://leafandlantern.com"),
  alternates: {
    canonical: "https://leafandlantern.com",
    languages: {
      "en-US": "https://leafandlantern.com",
    },
  },
  appleWebApp: {
    capable: true,
    title: "Leaf & Lantern",
    statusBarStyle: "black-translucent",
  },
  category: "books",
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
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${playfair.variable} antialiased`} suppressHydrationWarning>
        {/* Accessibility: skip to main content */}
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>

        <OrganizationJsonLd />
        <WebsiteJsonLd />

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
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
