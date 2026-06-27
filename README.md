# 📚 Leaf & Lantern — Premium Online Bookstore

> *"Combine the elegance of a modern bookstore with the warmth of an old library."*

A production-quality, full-featured online bookstore built as a frontend portfolio project. Leaf & Lantern blends editorial design, premium micro-interactions, and a seamless shopping experience — crafted to feel handmade, not AI-generated.

🔗 **Live Demo:** [leaf-lentern.vercel.app](https://leaf-lentern.vercel.app)

---

## ✨ Features

### 🛍️ Shopping Experience
- **Curated Catalog** — Browse 16+ books with advanced filtering by genre, search, and sort
- **Product Detail Pages** — Rich PDP with image zoom, ratings, format selector, stock status, and share functionality
- **Persistent Cart** — Add, remove, and update quantities; saved to `localStorage`
- **Wishlist** — Save books for later with an animated heart toggle
- **Coupon Codes** — Apply `READ10` for 10% off

### 📖 Free Online Reader
- **Reader Mode** — Immersive reading experience with customizable font size, dark mode toggle, and progress tracking
- **Sample Chapters** — Read selected book excerpts directly in the browser

### 🛒 Checkout & Orders
- **Multi-step Checkout** — Shipping → Payment → Confirmation flow with step persistence via `sessionStorage`
- **Shipping Methods** — Selectable delivery options with real-time price updates
- **Form Validation** — Native HTML5 + custom validation preventing invalid submissions
- **Order Tracking** — Track orders by ID via `/track` with animated timeline

### 🎨 Design & UX
- **Dark Mode** — Handcrafted dark palette (not just inverted colors), persisted via `localStorage`
- **Page Transitions** — Subtle fade+slide between all routes via Framer Motion
- **Reading Progress Bar** — Spring-animated progress indicator on scroll
- **Back to Top** — Floating button with smooth scroll, auto-shows on scroll
- **Micro-interactions** — Ripple buttons, card lifts, heart fill animations, hover glows
- **Skeleton Loaders** — Shimmer placeholders for loading states
- **Empty States** — Animated, illustrated states for Cart, Wishlist, Search, 404
- **Toast Notifications** — Slide-in alerts for cart, checkout, and errors

### ♿ Accessibility
- Skip to content link for keyboard users
- `aria-label` on all interactive elements
- `aria-live` regions for dynamic announcements
- Visible `focus-visible` states on all focusable elements
- `prefers-reduced-motion` media query respected
- Semantic HTML5 throughout

### 🔍 SEO
- Dynamic `<title>` templates per page
- Open Graph & Twitter Card metadata
- JSON-LD structured data (Bookstore + Product schemas)
- `sitemap.xml` auto-generated from routes + products
- `robots.txt` with proper crawl rules
- Canonical URLs

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** (App Router) | React framework with file-based routing |
| **TypeScript** | Type safety throughout |
| **Tailwind CSS v4** | Utility-first styling with CSS custom properties |
| **Framer Motion** | Page transitions, scroll reveals, micro-animations |
| **Lucide React** | Consistent, accessible icon set |
| **@teispace/next-themes** | System-aware dark mode |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/leaf-and-lantern.git
cd leaf-and-lantern

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Folder Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/              # About page
│   │   └── layout.tsx      # About page metadata layout
│   ├── cart/               # Shopping cart
│   ├── checkout/           # Multi-step checkout flow
│   ├── contact/            # Contact form
│   ├── faq/                # FAQ page
│   ├── privacy/            # Privacy policy
│   ├── read/               # Free online reader
│   │   └── [id]/           # Dynamic reader pages
│   ├── shipping/           # Shipping policy
│   ├── shop/               # Book catalog
│   │   └── [id]/           # Dynamic product detail pages
│   ├── terms/              # Terms of service
│   ├── track/              # Order tracking
│   ├── wishlist/           # Saved books
│   ├── favicon.ico         # Legacy favicon
│   ├── globals.css         # Tailwind v4 + design tokens
│   ├── icon.svg            # SVG favicon
│   ├── layout.tsx          # Root layout (SEO, global providers)
│   ├── not-found.tsx       # 404 page
│   ├── page.tsx            # Homepage
│   ├── sitemap.ts          # Dynamic sitemap
│   └── robots.ts           # robots.txt
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Site navigation with cart/wishlist/search
│   │   └── Footer.tsx      # Site footer with links
│   ├── providers/
│   │   ├── Hydration.tsx        # SSR-safe mount guard
│   │   ├── ThemeProvider.tsx    # @teispace/next-themes wrapper
│   │   └── PageTransition.tsx   # Framer Motion page transitions
│   └── ui/
│       ├── BackToTop.tsx        # Floating back-to-top button
│       ├── Button.tsx           # Custom button with ripple effect
│       ├── EmptyState.tsx       # Reusable animated empty state
│       ├── ReadingProgressBar.tsx  # Scroll progress bar
│       ├── SkeletonCard.tsx     # Shimmer loading placeholder
│       └── Toast.tsx            # Notification system + useToast hook
│
├── data/
│   └── mockProducts.ts     # 16 curated book entries
│
├── hooks/
│   ├── useLocalStorage.ts  # Type-safe localStorage hook
│   └── useScrollReveal.ts  # Framer Motion inView wrapper
│
├── store/
│   └── StoreContext.tsx    # Global cart/wishlist state (Context API)
│
└── utils/
    └── cn.ts               # Tailwind class merging utility
```

---

## 🔑 Coupon Codes

| Code | Discount |
|---|---|
| `READ10` | 10% off total |

---

## 🗺️ Pages

| Route | Description |
|---|---|
| `/` | Homepage — Hero, Best Sellers, Categories, Newsletter |
| `/shop` | Catalog with search, genre filters, grid/list toggle |
| `/shop/[id]` | Product detail — images, description, add to cart, wishlist |
| `/cart` | Cart with quantity controls, coupon, and order summary |
| `/wishlist` | Saved books |
| `/checkout` | 3-step checkout: Shipping → Payment → Confirmation |
| `/track` | Order tracking with animated timeline |
| `/about` | Brand story and team |
| `/contact` | Contact form |
| `/faq` | FAQ accordion with categorized questions |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/shipping` | Shipping policy, rates, and delivery times |
| `/read/[id]` | Free online reader with dark mode and font controls |

---

## 🔮 Future Enhancements

- [ ] User authentication (NextAuth.js)
- [ ] Real backend / database (Prisma + PostgreSQL)
- [ ] Stripe payment integration
- [ ] Book reviews & ratings system
- [ ] Recently Viewed (persisted to localStorage)
- [ ] Advanced search with Algolia
- [ ] Inventory management
- [ ] Email notifications on order confirmation

---

## 📜 License

MIT License — free to use for personal and commercial projects.

---

## 👤 Author

Built by **Muhammad Ammar** — Full Stack Developer.
[View Portfolio](https://ammar-portfolio5.vercel.app)

## 🌐 Live Site

The project is deployed on Vercel at **[leaf-lentern.vercel.app](https://leaf-lentern.vercel.app)**.
