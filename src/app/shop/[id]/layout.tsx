import type { Metadata } from "next";
import { mockProducts } from "@/data/mockProducts";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const book = mockProducts.find((b) => b.id === id);

  if (!book) {
    return { title: "Book Not Found" };
  }

  const url = `https://leafandlantern.com/shop/${book.id}`;

  return {
    title: book.title,
    description: `${book.shortDescription} — $${book.price.toFixed(2)}. By ${book.author}. ${book.format}, ${book.pages} pages. ISBN: ${book.isbn}.`,
    keywords: [
      book.title,
      book.author,
      book.genre,
      `${book.title} book`,
      `buy ${book.title}`,
      book.publisher,
      ...book.tags,
    ],
    openGraph: {
      title: `${book.title} by ${book.author} | Leaf & Lantern`,
      description: book.shortDescription,
      url,
      type: "book",
      images: [
        {
          url: book.coverImage,
          width: 800,
          height: 1200,
          alt: `Cover of ${book.title} by ${book.author}`,
        },
      ],
    },
    twitter: {
      title: `${book.title} by ${book.author}`,
      description: book.shortDescription,
      images: [book.coverImage],
    },
    alternates: { canonical: url },
    robots: { index: true, follow: true },
  };
}

export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
