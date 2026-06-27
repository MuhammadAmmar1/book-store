"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Globe,
  ShieldCheck,
  Star,
  Heart,
  Eye,
  TrendingUp,
  Award,
  Users,
  Gift
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useStore } from "@/store/StoreContext";
import { mockProducts } from "@/data/mockProducts";
import { cn } from "@/utils/cn";

const bestSellers = mockProducts.slice(0, 8);

const categories = [
  { name: "Programming", icon: <BookOpen aria-hidden="true" className="w-6 h-6" />, count: 1240 },
  { name: "Business", icon: <TrendingUp aria-hidden="true" className="w-6 h-6" />, count: 850 },
  { name: "Fantasy", icon: <Star aria-hidden="true" className="w-6 h-6" />, count: 3200 },
  { name: "Science Fiction", icon: <Globe aria-hidden="true" className="w-6 h-6" />, count: 2100 },
  { name: "Mystery", icon: <Eye aria-hidden="true" className="w-6 h-6" />, count: 1540 },
  { name: "History", icon: <Award aria-hidden="true" className="w-6 h-6" />, count: 980 },
  { name: "Self Growth", icon: <Users aria-hidden="true" className="w-6 h-6" />, count: 1120 },
  { name: "Poetry", icon: <Heart aria-hidden="true" className="w-6 h-6" />, count: 650 },
];

// Reusable animation variants with custom bezier curves
const luxuryEase = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: luxuryEase } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

export default function Home() {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, 15]);

  const { addToCart, toggleWishlist, wishlist } = useStore();

  return (
    <div className="min-h-screen bg-background font-sans overflow-hidden">
      <Navbar />

      <main>
        {/* 1. HERO SECTION */}
        <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
          {/* Enhanced Background Elements */}
          <div className="absolute inset-0 z-0 opacity-50 dark:opacity-30 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/20 blur-[140px]" />
            <div className="absolute bottom-[-10%] right-[-20%] w-[60%] h-[60%] rounded-full bg-secondary/15 blur-[140px]" />
          </div>

          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-xl"
            >
              <motion.h1
                variants={fadeUp}
                className="font-serif text-5xl md:text-[5.5rem] font-bold leading-[1.1] tracking-tight mb-8 text-foreground"
              >
                Stories That <br />
                Stay With You <br />
                <span className="text-primary italic tracking-normal">Forever.</span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-lg md:text-xl text-foreground/70 mb-12 leading-relaxed font-light"
              >
                Discover carefully curated collections of books that inspire imagination,
                creativity, and lifelong learning in a warm, welcoming space.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-5">
                <Link href="/shop" className="inline-flex">
                  <Button className="group rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgb(30,58,95,0.3)] transition-all duration-500" size="lg">
                    Browse Collection
                    <ArrowRight aria-hidden="true" className="ml-3 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-500" />
                  </Button>
                </Link>
                <Link href="#best-sellers" className="inline-flex">
                  <Button variant="ghost" size="lg" className="rounded-full hover:bg-primary/5 transition-colors duration-500">
                    Today&apos;s Picks
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Content - Drift Parallax Books */}
            <motion.div
              style={{ y: heroY }}
              className="relative h-[650px] hidden lg:block perspective-1000"
            >
              <motion.div
                style={{ rotate: rotate1 }}
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                className="absolute top-[5%] right-[15%] w-[280px] aspect-[2/3] rounded-2xl shadow-2xl overflow-hidden z-30 border border-white/20 dark:border-white/10"
              >
                <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&h=1200&fit=crop&crop=center&auto=format" alt="The Midnight Library Book Cover" className="object-cover w-full h-full" />
              </motion.div>

              <motion.div
                style={{ rotate: rotate2 }}
                animate={{ y: [0, 25, 0] }}
                transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
                className="absolute top-[35%] left-[5%] w-[240px] aspect-[2/3] rounded-2xl shadow-xl overflow-hidden z-20 border border-white/20 dark:border-white/10"
              >
                <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&h=1200&fit=crop&crop=center&auto=format" alt="Atomic Habits Book Cover" className="object-cover w-full h-full" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-[5%] right-[5%] w-[220px] aspect-[2/3] rounded-2xl shadow-lg overflow-hidden z-10 border border-white/20 dark:border-white/10"
              >
                <img src="https://images.unsplash.com/photo-1614544048536-0d28caf77f41?q=80&w=800&h=1200&fit=crop&crop=center&auto=format" alt="Dune Book Cover" className="object-cover w-full h-full" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 2. FEATURED CATEGORIES (Increased Spacing) */}
        <section className="py-32 bg-card/40 dark:bg-card/10 relative">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
          <div className="container mx-auto px-6 md:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="mb-20 text-center md:text-left"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 tracking-tight">Explore by Category</h2>
              <p className="text-foreground/60 text-lg md:text-xl font-light">Find your next great read from our diverse collections.</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {categories.map((category, idx) => (
                <Link href={`/shop?category=${encodeURIComponent(category.name)}`} key={idx} className="block group relative bg-card/80 backdrop-blur-sm border border-border/50 p-8 rounded-3xl cursor-pointer overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-2">
                  <motion.div
                    variants={fadeUp}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-background border border-border/50 text-primary flex items-center justify-center mb-8 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-500 shadow-sm">
                        {category.icon}
                      </div>
                      <h3 className="font-serif text-2xl font-bold mb-3">{category.name}</h3>
                      <p className="text-foreground/50 text-sm flex items-center font-medium">
                        {category.count.toLocaleString()} Books
                        <ArrowRight aria-hidden="true" className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 3. BEST SELLERS */}
        <section id="best-sellers" className="py-32 relative">
          <div className="container mx-auto px-6 md:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6"
            >
              <div>
                <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 tracking-tight">Best Sellers</h2>
                <p className="text-foreground/60 text-lg md:text-xl font-light">Our most loved books this month.</p>
              </div>
              <Link href="/shop" className="hidden md:flex">
                <Button variant="ghost" className="rounded-full group">
                  View All Collection <ArrowRight aria-hidden="true" className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
              {bestSellers.map((book, idx) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: luxuryEase }}
                  className="group flex flex-col"
                >
                  <div className="relative aspect-[2/3] mb-8 rounded-2xl overflow-hidden shadow-md group-hover:shadow-2xl transition-all duration-700 border border-border/40">
                    <img src={book.coverImage} alt={`Cover of ${book.title}`} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 ease-out" />

                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 md:p-6">
                      <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 flex gap-2 md:gap-3">
                        <Button onClick={() => addToCart(book)} className="flex-1 bg-white text-black hover:bg-gray-100 h-10 md:h-12 rounded-xl text-sm md:text-base font-medium">Add to Cart</Button>
                        <Button onClick={() => toggleWishlist(book)} size="icon" variant="outline" className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white hover:text-black rounded-xl h-10 w-10 md:h-12 md:w-12 shrink-0">
                          <Heart aria-hidden="true" className={cn("w-4 h-4 md:w-5 md:h-5", wishlist.some(item => item.id === book.id) && "fill-current")} />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 px-1">
                    <div className="flex justify-between items-start mb-3">
                      <p className="text-[11px] font-bold text-primary/80 uppercase tracking-widest">{book.genre}</p>
                      <div className="flex items-center text-secondary">
                        <Star aria-hidden="true" className="w-3.5 h-3.5 fill-current" />
                        <span className="text-xs ml-1.5 text-foreground/80 font-semibold">{book.rating}</span>
                      </div>
                    </div>
                    <Link href={`/shop/${book.id}`} className="font-serif text-xl font-bold mb-1.5 line-clamp-1 hover:text-primary transition-colors">{book.title}</Link>
                    <p className="text-foreground/50 text-sm mb-4 font-medium">{book.author}</p>
                    <p className="font-sans font-medium text-lg mt-auto">${book.price.toFixed(2)}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 text-center md:hidden">
              <Button variant="outline" className="w-full rounded-full h-14">
                View All Best Sellers
              </Button>
            </div>
          </div>
        </section>

        {/* 4. FREE READS - Gift for All Users */}
        <section className="py-32 relative overflow-hidden bg-gradient-to-b from-background via-primary/[0.02] to-background">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
          </div>
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-widest mb-6">
                <Gift className="w-4 h-4" />
                Free for Everyone
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 tracking-tight">Free Reads</h2>
              <p className="text-foreground/60 text-lg md:text-xl max-w-2xl mx-auto font-light">
                As a gift from us, enjoy two hand-picked books completely free. No purchase necessary.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                mockProducts.find(b => b.id === "book-010")!,
                mockProducts.find(b => b.id === "book-005")!
              ].map((book, idx) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.2, ease: luxuryEase }}
                  className="group relative bg-card/60 backdrop-blur-sm border border-border/40 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row gap-6 hover:shadow-xl hover:border-primary/30 transition-all duration-500"
                >
                  <div className="relative w-full sm:w-40 aspect-[2/3] rounded-xl overflow-hidden shadow-md shrink-0">
                    <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                    <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                      FREE
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-primary/80 uppercase tracking-widest mb-2">{book.genre}</p>
                    <h3 className="font-serif text-xl font-bold mb-1.5 truncate">{book.title}</h3>
                    <p className="text-foreground/60 text-sm font-medium mb-3">{book.author}</p>
                    <p className="text-foreground/70 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">{book.shortDescription}</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button onClick={() => router.push(`/read/${book.id}`)} className="rounded-full shadow-md hover:shadow-lg transition-all whitespace-nowrap">
                        Read Free <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.round(book.rating) ? "fill-current" : "fill-current opacity-20"}`} />
                        ))}
                        <span className="text-sm ml-1.5 text-foreground/80 font-semibold">{book.rating}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. WHY READ WITH US (Asymmetric Layout) */}
        <section className="py-32 bg-card/20 border-y border-border overflow-hidden relative">
          <div className="container mx-auto px-6 md:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center max-w-2xl mx-auto mb-24"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8 tracking-tight">The Leaf & Lantern Experience</h2>
              <p className="text-foreground/60 text-lg md:text-xl leading-relaxed font-light">
                We believe a bookstore should be more than a place to buy books.
                It should be a sanctuary for the mind and soul.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="space-y-8 lg:space-y-12">
                <FeatureCard
                  icon={<BookOpen />}
                  title="Curated Collections"
                  desc="Hand-picked stories selected by our expert bibliophiles, ensuring every book on our shelves is worth your time."
                />
                <FeatureCard
                  icon={<Globe />}
                  title="Worldwide Delivery"
                  desc="Carefully packaged books shipped anywhere in the world in eco-friendly, premium materials."
                />
              </div>
              <div className="lg:mt-16 space-y-8 lg:space-y-12">
                <FeatureCard
                  icon={<Users />}
                  title="Reader Community"
                  desc="Join thousands of active readers in our monthly book clubs, author Q&As, and literary events."
                />
                <FeatureCard
                  icon={<ShieldCheck />}
                  title="Secure Checkout"
                  desc="Safe, encrypted payments with premium buyer protection so you can shop with absolute peace of mind."
                />
              </div>
              <div className="hidden lg:flex items-center justify-center">
                <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop" alt="Library interior" className="object-cover w-full h-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>



      </main>

      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactElement<{ className?: string; "aria-hidden"?: string }>, title: string, desc: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: luxuryEase }}
      className="relative group p-8 rounded-3xl bg-card/50 border border-border/30 hover:bg-card transition-colors duration-500"
    >
      <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-8 group-hover:-translate-y-2 transition-transform duration-500">
        {React.cloneElement(icon, { className: "w-6 h-6", "aria-hidden": "true" })}
      </div>
      <h3 className="font-serif text-2xl font-bold mb-4">{title}</h3>
      <p className="text-foreground/60 leading-relaxed font-light">{desc}</p>
    </motion.div>
  );
}
