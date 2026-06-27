import type { Book } from "@/data/mockProducts";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BookStore",
        name: "Leaf & Lantern",
        url: "https://leafandlantern.com",
        description:
          "Premium online bookstore offering curated collections of books that inspire imagination, creativity, and lifelong learning.",
        founder: { "@type": "Person", name: "Mara Ellison" },
        sameAs: [
          "https://instagram.com/leafandlantern",
          "https://linkedin.com/company/leafandlantern",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          email: "hello@leaflantern.com",
          telephone: "+1-555-014-8821",
          contactType: "customer service",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "42 Wren Street",
          addressLocality: "Portland",
          addressRegion: "OR",
          postalCode: "97205",
          addressCountry: "US",
        },
      }}
    />
  );
}

export function WebsiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Leaf & Lantern",
        url: "https://leafandlantern.com",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://leafandlantern.com/shop?search={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

export function ProductJsonLd({ book }: { book: Book }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: book.title,
        description: book.shortDescription,
        sku: book.isbn,
        mpn: book.id,
        isbn: book.isbn,
        brand: {
          "@type": "Brand",
          name: book.publisher,
        },
        category: book.genre,
        image: book.coverImage,
        offers: {
          "@type": "Offer",
          url: `https://leafandlantern.com/shop/${book.id}`,
          priceCurrency: "USD",
          price: book.price,
          availability:
            book.availability === "In Stock"
              ? "https://schema.org/InStock"
              : book.availability === "Out of Stock"
                ? "https://schema.org/OutOfStock"
                : "https://schema.org/PreOrder",
          itemCondition: "https://schema.org/NewCondition",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: book.rating,
          reviewCount: book.reviewsCount,
          bestRating: 5,
        },
        author: {
          "@type": "Person",
          name: book.author,
        },
        publisher: {
          "@type": "Organization",
          name: book.publisher,
        },
        numberOfPages: book.pages,
        inLanguage: book.language,
        bookFormat:
          book.format === "eBook"
            ? "https://schema.org/EBook"
            : book.format === "Audiobook"
              ? "https://schema.org/Audiobook"
              : "https://schema.org/Book",
      }}
    />
  );
}

export function FaqJsonLd({
  questions,
}: {
  questions: { q: string; a: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: questions.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: {
            "@type": "Answer",
            text: a,
          },
        })),
      }}
    />
  );
}
