"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  ChevronDown, 
  X, 
  Heart,
  Grid,
  List,
  Star,
  Eye,
  ChevronLeft,
  ChevronRight,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { mockProducts, Book } from "@/data/mockProducts";
import { cn } from "@/utils/cn";
import { useStore } from "@/store/StoreContext";
import { EmptyState } from "@/components/ui/EmptyState";


const luxuryEase = [0.22, 1, 0.36, 1];

const categories = Array.from(new Set(mockProducts.map((book) => book.genre)));

const toCategoryKey = (category: string) =>
  category.trim().toLowerCase().replace(/[\s_]+/g, "-");

const getCategoryFromParam = (categoryParam: string | null) => {
  if (!categoryParam) return null;

  const categoryKey = toCategoryKey(categoryParam);
  return categories.find((category) => toCategoryKey(category) === categoryKey) ?? null;
};

export default function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [view, setView] = React.useState<"grid" | "list">("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = React.useState(false);
  const [selectedBook, setSelectedBook] = React.useState<Book | null>(null);
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const selectedCategory = getCategoryFromParam(searchParams.get("category"));

  const setSelectedCategory = (cat: string | null) => {
    if (cat) {
      router.replace(`/shop?category=${encodeURIComponent(cat)}`, { scroll: false });
    } else {
      router.replace(`/shop`, { scroll: false });
    }
  };

  // Filter Logic
  const filteredProducts = React.useMemo(() => {
    return mockProducts.filter((book) => {
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? book.genre === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background font-sans overflow-hidden">
      <Navbar />

      <main className="pt-24">
        {/* 1. PAGE HEADER */}
        <section className="relative py-20 lg:py-28 overflow-hidden bg-card/40 dark:bg-card/10 border-b border-border">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-[0.015]" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: luxuryEase }}
            >
              <div className="flex items-center justify-center space-x-2 text-sm text-foreground/60 mb-6 font-medium">
                <span className="hover:text-primary cursor-pointer transition-colors">Home</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-foreground">Shop</span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-tight mb-6">
                Discover Your Next <span className="text-primary italic">Favorite Book</span>
              </h1>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto font-light">
                Explore our carefully curated collection of literary masterpieces, 
                from timeless classics to contemporary bestsellers.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SHOP CONTENT */}
        <section className="py-12 relative">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col lg:flex-row gap-12">
              
              {/* LEFT SIDEBAR (Desktop) */}
              <aside className="hidden lg:block w-72 shrink-0 space-y-10">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                  <input 
                    type="text" 
                    placeholder="Search titles, authors..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 rounded-2xl bg-card border border-border/60 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                  />
                </div>

                {/* Categories Filter */}
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-bold flex items-center justify-between">
                    Categories
                    <ChevronDown className="w-5 h-5 text-foreground/50" />
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="category"
                        checked={selectedCategory === null}
                        onChange={() => setSelectedCategory(null)}
                        className="w-5 h-5 rounded-full border-border/60 text-primary focus:ring-primary/50 bg-background"
                      />
                      <span className="text-foreground/80 group-hover:text-primary transition-colors font-medium">All Books</span>
                    </label>
                    {categories.map(category => (
                      <label key={category} className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                          type="radio" 
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="w-5 h-5 rounded-full border-border/60 text-primary focus:ring-primary/50 bg-background"
                        />
                        <span className="text-foreground/80 group-hover:text-primary transition-colors font-medium">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Filter Placeholder */}
                <div className="space-y-4 border-t border-border/50 pt-8">
                  <h3 className="font-serif text-xl font-bold">Price Range</h3>
                  <div className="h-2 bg-border/50 rounded-full w-full relative">
                    <div className="absolute left-[20%] right-[30%] h-full bg-primary rounded-full" />
                    <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-md" />
                    <div className="absolute right-[30%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-md" />
                  </div>
                  <div className="flex justify-between text-sm font-medium text-foreground/60">
                    <span>$10</span>
                    <span>$50</span>
                  </div>
                </div>
              </aside>

              {/* MAIN CONTENT AREA */}
              <div className="flex-1 min-w-0">
                {/* Product Toolbar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <p className="font-serif text-xl font-bold">
                    Showing <span className="text-primary">{filteredProducts.length}</span> results
                  </p>
                  
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <button 
                      className="lg:hidden flex items-center gap-2 px-4 h-12 bg-card border border-border/60 rounded-xl font-medium"
                      onClick={() => setIsMobileFilterOpen(true)}
                    >
                      <Filter className="w-4 h-4" /> Filters
                    </button>
                    
                    <div className="relative flex-1 sm:w-48">
                      <select className="w-full h-12 pl-4 pr-10 appearance-none bg-card border border-border/60 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary/50">
                        <option>Newest Arrivals</option>
                        <option>Best Selling</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50 pointer-events-none" />
                    </div>

                    <div className="hidden sm:flex items-center p-1 bg-card border border-border/60 rounded-xl">
                      <button 
                        onClick={() => setView("grid")}
                        className={cn("p-2 rounded-lg transition-colors", view === "grid" ? "bg-background shadow-sm text-primary" : "text-foreground/50")}
                      >
                        <Grid className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => setView("list")}
                        className={cn("p-2 rounded-lg transition-colors", view === "list" ? "bg-background shadow-sm text-primary" : "text-foreground/50")}
                      >
                        <List className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Active Filters */}
                {(selectedCategory || searchQuery) && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {searchQuery && (
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        Search: {searchQuery}
                        <button onClick={() => setSearchQuery("")}><X className="w-4 h-4 hover:text-black transition-colors"/></button>
                      </span>
                    )}
                    {selectedCategory && (
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        {selectedCategory}
                        <button onClick={() => setSelectedCategory(null)}><X className="w-4 h-4 hover:text-black transition-colors"/></button>
                      </span>
                    )}
                    <button 
                      onClick={() => { setSearchQuery(""); setSelectedCategory(null); }}
                      className="text-sm font-medium text-foreground/50 hover:text-foreground underline underline-offset-4 ml-2"
                    >
                      Clear All
                    </button>
                  </div>
                )}

                {/* Product Grid */}
                {filteredProducts.length > 0 ? (
                  <div className={cn(
                    "grid gap-x-8 gap-y-12",
                    view === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                  )}>
                    {filteredProducts.map((book) => (
                      <motion.div 
                        key={book.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: luxuryEase }}
                        className={cn("group flex", view === "grid" ? "flex-col" : "flex-row gap-8 items-center bg-card/40 p-6 rounded-3xl border border-border/30 hover:border-border/80 transition-colors")}
                      >
                        <div className={cn(
                          "relative rounded-2xl overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-700 border border-border/40 shrink-0",
                          view === "grid" ? "aspect-[2/3] mb-6" : "w-48 aspect-[2/3]"
                        )}>
                          {book.badges && book.badges[0] && (
                            <span className="absolute top-4 left-4 z-20 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
                              {book.badges[0]}
                            </span>
                          )}
                          <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 ease-out" />
                          
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 z-10">
                            <div className="transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex gap-2">
                              <Button onClick={() => addToCart(book)} className="flex-1 bg-white text-black hover:bg-gray-100 h-11 text-sm rounded-xl">Add to Cart</Button>
                              <Button 
                                size="icon" 
                                variant="outline" 
                                onClick={() => setSelectedBook(book)}
                                className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white hover:text-black rounded-xl h-11 w-11 shrink-0"
                              >
                                <Eye aria-hidden="true" className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col flex-1 px-1">
                          <div className="flex justify-between items-start mb-2">
                            <p className="text-[11px] font-bold text-primary/80 uppercase tracking-widest">{book.genre}</p>
                            <div className="flex items-center text-secondary">
                              <Star aria-hidden="true" className="w-3.5 h-3.5 fill-current" />
                              <span className="text-xs ml-1.5 text-foreground/80 font-semibold">{book.rating}</span>
                            </div>
                          </div>
                          <h3 className="font-serif text-xl font-bold mb-1 line-clamp-2">{book.title}</h3>
                          <p className="text-foreground/50 text-sm mb-4 font-medium">{book.author}</p>
                          {view === "list" && (
                            <p className="text-foreground/70 mb-6 line-clamp-3 leading-relaxed">{book.shortDescription}</p>
                          )}
                          <div className={cn("mt-auto flex items-center justify-between", view === "list" && "pt-4 border-t border-border/50")}>
                            <p className="font-sans font-semibold text-lg">${book.price.toFixed(2)}</p>
                            {view === "list" && (
                              <div className="flex gap-2">
                                <Button onClick={() => toggleWishlist(book)} variant="outline" size="icon" className={cn("rounded-full transition-colors", wishlist.find(w => w.id === book.id) ? "text-red-500 border-red-200" : "")}><Heart className={cn("w-4 h-4", wishlist.find(w => w.id === book.id) && "fill-current")}/></Button>
                                <Button onClick={() => addToCart(book)} className="rounded-full px-8">Add to Cart</Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    Icon={Search}
                    title="No Books Found"
                    description="We couldn't find any books matching your current filters. Try adjusting your search or clearing the filters."
                    ctaLabel="Reset Filters"
                    onCta={() => { setSearchQuery(""); setSelectedCategory(null); }}
                  />

                )}

                {/* Pagination Placeholder */}
                {filteredProducts.length > 0 && (
                  <div className="mt-20 flex justify-center items-center space-x-2">
                    <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-border/60"><ChevronLeft className="w-5 h-5"/></Button>
                    <Button variant="primary" className="rounded-full w-12 h-12 bg-foreground text-background">1</Button>
                    <Button variant="outline" className="rounded-full w-12 h-12 border-border/60">2</Button>
                    <Button variant="outline" className="rounded-full w-12 h-12 border-border/60">3</Button>
                    <span className="px-2 text-foreground/50">...</span>
                    <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-border/60"><ChevronRight className="w-5 h-5"/></Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* RECENTLY VIEWED (Placeholder for Carousel) */}
        <section className="py-24 bg-card/20 border-t border-border">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="font-serif text-3xl font-bold mb-12">Recently Viewed</h2>
            <div className="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide">
              {mockProducts.slice(4, 8).map((book) => (
                <div key={book.id} className="w-48 shrink-0 snap-start">
                  <img src={book.coverImage} alt={book.title} className="w-full aspect-[2/3] object-cover rounded-xl shadow-sm mb-4 border border-border/40" />
                  <h4 className="font-serif font-bold text-sm line-clamp-1">{book.title}</h4>
                  <p className="text-xs text-foreground/50">${book.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* QUICK VIEW MODAL */}
      <AnimatePresence>
        {selectedBook && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setSelectedBook(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: luxuryEase }}
              className="relative w-full max-w-4xl bg-card rounded-[2rem] shadow-2xl overflow-hidden border border-border/50 flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedBook(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-background/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-background transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="md:w-2/5 shrink-0 bg-secondary/5 p-8 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
                <img src={selectedBook.coverImage} alt={selectedBook.title} className="w-full max-w-[240px] aspect-[2/3] object-cover rounded-xl shadow-2xl relative z-10" />
              </div>
              
              <div className="p-8 md:p-12 flex-1 overflow-y-auto">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">{selectedBook.genre}</span>
                  <div className="flex items-center text-secondary">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm ml-1.5 text-foreground/80 font-bold">{selectedBook.rating} <span className="font-normal opacity-50">({selectedBook.reviewsCount})</span></span>
                  </div>
                </div>
                
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">{selectedBook.title}</h2>
                <p className="text-lg text-foreground/60 font-medium mb-6">By {selectedBook.author}</p>
                
                <div className="text-3xl font-sans font-bold mb-8">${selectedBook.price.toFixed(2)}</div>
                
                <p className="text-foreground/70 leading-relaxed mb-8">
                  {selectedBook.fullDescription}
                </p>
                
                <div className="grid grid-cols-2 gap-y-4 text-sm mb-10 border-y border-border/50 py-6">
                  <div><span className="text-foreground/50">Publisher:</span> <span className="font-medium">{selectedBook.publisher}</span></div>
                  <div><span className="text-foreground/50">Format:</span> <span className="font-medium">{selectedBook.format}</span></div>
                  <div><span className="text-foreground/50">Language:</span> <span className="font-medium">{selectedBook.language}</span></div>
                  <div><span className="text-foreground/50">Pages:</span> <span className="font-medium">{selectedBook.pages}</span></div>
                </div>
                
                <div className="flex gap-4">
                  <Link href={`/shop/${selectedBook?.id}`} onClick={() => setSelectedBook(null)} className="flex-1">
                    <Button size="lg" className="w-full rounded-xl h-14 text-base">View Details</Button>
                  </Link>
                  <Button size="lg" variant="outline" onClick={() => { if(selectedBook) addToCart(selectedBook); setSelectedBook(null); }} className="flex-1 rounded-xl h-14 text-base border-border/80">Add to Cart</Button>
                  <Button variant="outline" size="icon" onClick={() => { if(selectedBook) toggleWishlist(selectedBook); }} className={cn("h-14 w-14 rounded-xl border-border/60 shrink-0", selectedBook && wishlist.find(w => w.id === selectedBook.id) ? "text-red-500" : "")}><Heart className={cn("w-5 h-5", selectedBook && wishlist.find(w => w.id === selectedBook.id) && "fill-current")}/></Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MOBILE FILTER DRAWER */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <motion.div 
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-4/5 max-w-sm bg-card h-full shadow-2xl p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-border/50">
                <span className="font-serif text-2xl font-bold">Filters</span>
                <button onClick={() => setIsMobileFilterOpen(false)}><X className="w-6 h-6" /></button>
              </div>
              
              {/* Reuse Filters */}
              <div className="space-y-8">
                 <div className="space-y-4">
                  <h3 className="font-serif text-xl font-bold">Categories</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="mobile-category"
                        checked={selectedCategory === null}
                        onChange={() => { setSelectedCategory(null); setIsMobileFilterOpen(false); }}
                        className="w-5 h-5 rounded-full border-border/60 text-primary focus:ring-primary/50"
                      />
                      <span className="text-foreground/80 font-medium">All Books</span>
                    </label>
                    {categories.map(category => (
                      <label key={category} className="flex items-center space-x-3 cursor-pointer">
                        <input 
                          type="radio" 
                          name="mobile-category"
                          checked={selectedCategory === category}
                          onChange={() => { setSelectedCategory(category); setIsMobileFilterOpen(false); }}
                          className="w-5 h-5 rounded-full border-border/60 text-primary focus:ring-primary/50"
                        />
                        <span className="text-foreground/80 font-medium">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <Button className="w-full" onClick={() => setIsMobileFilterOpen(false)}>Apply Filters</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
