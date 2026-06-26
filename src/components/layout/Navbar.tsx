"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Heart, Menu, X, Moon, Sun, Plus, Minus, Trash2 } from "lucide-react";
import { useTheme } from "@teispace/next-themes";
import { cn } from "@/utils/cn";
import { useStore } from "@/store/StoreContext";
import { mockProducts } from "@/data/mockProducts";
import { Button } from "@/components/ui/Button";
import Hydration from "@/components/providers/Hydration";

const luxuryEase = [0.22, 1, 0.36, 1];

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const { cart, wishlist, isCartOpen, setIsCartOpen, isSearchOpen, setIsSearchOpen } = useStore();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Track Order", href: "/track" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: luxuryEase }}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border py-4 shadow-sm" : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex flex-col group">
            <span className="font-serif text-2xl font-bold text-foreground tracking-wide group-hover:text-primary transition-colors">
              Leaf & Lantern
            </span>
            <span className="text-[10px] uppercase tracking-widest text-foreground/60">Bookstore & Library</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group">
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button onClick={() => setIsSearchOpen(true)} className="text-foreground/80 hover:text-primary transition-colors hover:scale-110 active:scale-95">
              <Search className="w-5 h-5" />
            </button>
            <Link href="/wishlist" className="text-foreground/80 hover:text-primary transition-colors relative hover:scale-110 active:scale-95">
              <Heart className="w-5 h-5" />

              <Hydration>
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Hydration>
            </Link>
            <button onClick={() => setIsCartOpen(true)} className="text-foreground/80 hover:text-primary transition-colors relative hover:scale-110 active:scale-95">
              <ShoppingBag className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="text-foreground/80 hover:text-primary transition-colors hover:scale-110 active:scale-95">
              {mounted ? (theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />) : null}
            </button>
          </div>

          <button className="md:hidden text-foreground" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.header>

      {/* Mini Cart Drawer */}
      <MiniCart />

      {/* Global Search Modal */}
      <SearchModal />
    </>
  );
}

// MiniCart Component inline for simplicity
function MiniCart() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-background/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-card h-full shadow-2xl flex flex-col border-l border-border/50"
          >
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <h2 className="font-serif text-2xl font-bold">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="w-8 h-8 rounded-full bg-background flex items-center justify-center hover:scale-110 transition-transform">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-10 h-10 text-primary/30" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-2">Your Shelf is Empty</h3>
                  <p className="text-foreground/60 mb-8">Looks like you haven't added any books to your cart yet.</p>
                  <Button onClick={() => setIsCartOpen(false)} className="rounded-full">Explore Books</Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <img src={item.coverImage} className="w-20 aspect-[2/3] object-cover rounded-lg shadow-sm border border-border/50" alt={item.title} />
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between">
                          <h4 className="font-serif font-bold text-base leading-tight line-clamp-1">{item.title}</h4>
                          <button onClick={() => removeFromCart(item.id)} className="text-foreground/40 hover:text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-foreground/50 mb-auto">{item.author}</p>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-border/60 rounded-full bg-background px-2 py-1">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-primary"><Minus className="w-3 h-3" /></button>
                            <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-primary"><Plus className="w-3 h-3" /></button>
                          </div>
                          <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-border/50 bg-background/50">
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between"><span className="text-foreground/60">Subtotal</span><span className="font-medium">${cartTotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-foreground/60">Shipping</span><span className="font-medium text-primary">Calculated at checkout</span></div>
                </div>
                <div className="flex justify-between items-center mb-6 text-xl">
                  <span className="font-serif font-bold">Total</span>
                  <span className="font-bold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="space-y-3">
                  <Link href="/cart" onClick={() => setIsCartOpen(false)}>
                    <Button className="w-full rounded-xl h-14 text-base shadow-lg hover:-translate-y-1 transition-all">Proceed to Checkout</Button>
                  </Link>
                  <Button variant="ghost" className="w-full rounded-xl h-12" onClick={() => setIsCartOpen(false)}>Continue Shopping</Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Search Modal Inline
function SearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useStore();
  const [query, setQuery] = React.useState("");

  const results = React.useMemo(() => {
    if (!query.trim()) return [];
    return mockProducts.filter(b =>
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.author.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 4);
  }, [query]);

  // Handle ESC
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setIsSearchOpen(false); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setIsSearchOpen]);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex justify-center pt-[10vh] px-4">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: luxuryEase }}
            className="relative w-full max-w-3xl bg-card rounded-3xl shadow-[0_30px_60px_rgb(0,0,0,0.15)] border border-border/50 overflow-hidden flex flex-col max-h-[80vh]"
          >
            <div className="p-2 border-b border-border/50 flex items-center relative">
              <Search className="absolute left-6 w-6 h-6 text-foreground/40" />
              <input
                autoFocus
                type="text"
                placeholder="Search by title, author, or genre..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-16 pl-16 pr-14 bg-transparent border-none focus:ring-0 text-xl font-serif placeholder:text-foreground/30 outline-none"
              />
              <button onClick={() => setIsSearchOpen(false)} className="absolute right-6 w-8 h-8 rounded-full bg-background/50 flex items-center justify-center hover:bg-background transition-colors text-foreground/50 hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              {!query ? (
                <div className="grid grid-cols-2 gap-8 text-sm">
                  <div>
                    <h4 className="font-serif font-bold text-foreground/50 mb-4 uppercase tracking-widest text-xs">Trending Books</h4>
                    <ul className="space-y-3">
                      {mockProducts.slice(0, 3).map(b => (
                        <li key={b.id}>
                          <Link href={`/shop/${b.id}`} onClick={() => setIsSearchOpen(false)} className="flex items-center gap-3 group">
                            <img src={b.coverImage} className="w-10 aspect-[2/3] object-cover rounded shadow-sm border border-border/50" />
                            <span className="font-medium group-hover:text-primary transition-colors line-clamp-1">{b.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-foreground/50 mb-4 uppercase tracking-widest text-xs">Popular Authors</h4>
                    <ul className="space-y-3">
                      <li><span className="font-medium hover:text-primary cursor-pointer transition-colors">Matt Haig</span></li>
                      <li><span className="font-medium hover:text-primary cursor-pointer transition-colors">Yuval Noah Harari</span></li>
                      <li><span className="font-medium hover:text-primary cursor-pointer transition-colors">James Clear</span></li>
                    </ul>
                  </div>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-6">
                  <h4 className="font-serif font-bold text-foreground/50 mb-4 uppercase tracking-widest text-xs">Search Results</h4>
                  {results.map((book) => (
                    <Link key={book.id} href={`/shop/${book.id}`} onClick={() => setIsSearchOpen(false)} className="flex items-start gap-4 group p-3 -mx-3 rounded-xl hover:bg-primary/5 transition-colors">
                      <img src={book.coverImage} className="w-16 aspect-[2/3] object-cover rounded shadow-sm border border-border/50 group-hover:shadow-md transition-shadow" />
                      <div>
                        <h5 className="font-serif font-bold text-lg group-hover:text-primary transition-colors line-clamp-1">{book.title}</h5>
                        <p className="text-sm text-foreground/60">{book.author} • {book.genre}</p>
                        <p className="font-bold mt-1">${book.price.toFixed(2)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-card border border-border/50 rounded-full flex items-center justify-center mb-4 text-foreground/30"><Search className="w-8 h-8" /></div>
                  <p className="text-lg font-serif font-bold mb-2">No results found for "{query}"</p>
                  <p className="text-foreground/50">Try checking your spelling or using more general terms.</p>
                </div>
              )}
            </div>

            <div className="bg-card/50 border-t border-border/50 p-4 text-center text-xs text-foreground/40 font-medium">
              Press <kbd className="px-2 py-1 bg-background rounded border border-border/50 shadow-sm mx-1 font-sans">ESC</kbd> to close
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
