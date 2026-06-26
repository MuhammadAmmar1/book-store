"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Trash2, ShoppingBag, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useStore } from "@/store/StoreContext";

const luxuryEase = [0.22, 1, 0.36, 1];

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 container mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between border-b border-border/60 pb-6 mb-12">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2">Your Wishlist</h1>
            <p className="text-foreground/60 text-lg">
              {wishlist.length} {wishlist.length === 1 ? "book" : "books"} saved for later
            </p>
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          {wishlist.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              className="py-24 flex flex-col items-center justify-center text-center max-w-lg mx-auto"
            >
              <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-8 relative">
                <Heart className="w-10 h-10 text-primary/40" />
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute -top-1 -right-1">
                  <Star className="w-6 h-6 text-secondary" />
                </motion.div>
              </div>
              <h2 className="font-serif text-3xl font-bold mb-4">Your Wishlist is Waiting</h2>
              <p className="text-foreground/60 text-lg mb-8 leading-relaxed">
                You haven't saved any books yet. Explore our curated collections to find your next great read and save them here.
              </p>
              <Link href="/shop">
                <Button size="lg" className="rounded-full px-8 text-lg h-14 shadow-lg hover:-translate-y-1 transition-transform">
                  Discover Books
                </Button>
              </Link>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            >
              <AnimatePresence>
                {wishlist.map((book) => (
                  <motion.div 
                    key={book.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: luxuryEase }}
                    className="group flex flex-col bg-card/40 p-6 rounded-3xl border border-border/40 hover:border-border/80 transition-colors shadow-sm hover:shadow-xl"
                  >
                    <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-6 border border-border/50">
                      <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        <Link href={`/shop/${book.id}`}>
                           <Button variant="secondary" size="icon" className="rounded-full bg-white text-black hover:bg-gray-200"><Eye className="w-5 h-5"/></Button>
                        </Link>
                      </div>
                      <button 
                        onClick={() => toggleWishlist(book)}
                        className="absolute top-4 right-4 z-10 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:bg-background transition-colors hover:scale-110"
                      >
                        <Heart className="w-5 h-5 fill-current" />
                      </button>
                    </div>

                    <div className="flex flex-col flex-1">
                      <h3 className="font-serif text-lg font-bold line-clamp-1 mb-1">{book.title}</h3>
                      <p className="text-sm text-foreground/60 mb-4">{book.author}</p>
                      
                      <div className="mt-auto flex items-center justify-between">
                        <span className="font-sans font-bold text-lg">${book.price.toFixed(2)}</span>
                        <Button 
                          size="sm" 
                          onClick={() => { addToCart(book); toggleWishlist(book); }}
                          className="rounded-full px-4 bg-primary text-primary-foreground shadow hover:-translate-y-0.5 transition-transform"
                        >
                          Move to Cart
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

// Inline Star icon for empty state
function Star({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>;
}
