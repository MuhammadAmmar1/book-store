"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  Heart, 
  Share2, 
  Star, 
  Truck, 
  ShieldCheck, 
  RefreshCw, 
  Award,
  BookOpen,
  Leaf,
  ThumbsUp,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/utils/cn";
import { mockProducts } from "@/data/mockProducts";
import { useStore } from "@/store/StoreContext";

const luxuryEase = [0.22, 1, 0.36, 1];

export default function ProductDetailsPage() {
  const params = useParams();
  const bookId = params?.id as string;
  const book = mockProducts.find((b) => b.id === bookId) || mockProducts[0];
  
  const relatedBooks = mockProducts.filter(b => b.id !== bookId && b.genre === book.genre).slice(0, 4);
  if (relatedBooks.length < 4) {
    const extra = mockProducts.filter(b => b.id !== bookId && !relatedBooks.includes(b)).slice(0, 4 - relatedBooks.length);
    relatedBooks.push(...extra);
  }

  const [activeTab, setActiveTab] = React.useState("Overview");
  const [isStickyVisible, setIsStickyVisible] = React.useState(false);
  const purchasePanelRef = React.useRef<HTMLDivElement>(null);
  const { cart, addToCart, toggleWishlist, wishlist } = useStore();
  const isWishlisted = wishlist.some(w => w.id === book.id);
  const cartItem = cart.find(item => item.id === book.id);
  const isInCart = !!cartItem;
  const cartQuantity = cartItem?.quantity || 0;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: book.title,
          text: `Check out ${book.title} by ${book.author} at Leaf & Lantern!`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  // Mouse tilt tracking
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };
  const handleMouseLeave = () => setMousePosition({ x: 0, y: 0 });

  // Scroll tracking for sticky CTA
  const { scrollY } = useScroll();
  React.useEffect(() => {
    return scrollY.on("change", (latest) => {
      if (purchasePanelRef.current) {
        const rect = purchasePanelRef.current.getBoundingClientRect();
        setIsStickyVisible(latest > rect.bottom + window.scrollY);
      }
    });
  }, [scrollY]);

  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />

      <main className="pt-24 pb-32">
        {/* 1. BREADCRUMB */}
        <div className="container mx-auto px-6 md:px-12 py-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex items-center space-x-2 text-sm text-foreground/60 font-medium"
          >
            <span className="hover:text-primary cursor-pointer transition-colors">Home</span>
            <ChevronRight className="w-4 h-4" />
            <span className="hover:text-primary cursor-pointer transition-colors">Shop</span>
            <ChevronRight className="w-4 h-4" />
            <span className="hover:text-primary cursor-pointer transition-colors">{book.genre}</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground truncate max-w-[200px]">{book.title}</span>
          </motion.div>
        </div>

        {/* 2. PRODUCT SHOWCASE */}
        <section className="container mx-auto px-6 md:px-12 mb-24">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* LEFT: 3D Cover Image */}
            <div className="lg:w-1/2 shrink-0">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: luxuryEase }}
                className="sticky top-32 perspective-1000"
              >
                <motion.div 
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  animate={{ 
                    rotateY: mousePosition.x * 15, 
                    rotateX: -mousePosition.y * 15 
                  }}
                  transition={{ type: "spring", stiffness: 150, damping: 20 }}
                  className="relative w-full max-w-[500px] mx-auto aspect-[2/3] rounded-2xl shadow-[0_30px_60px_rgb(0,0,0,0.15)] dark:shadow-[0_30px_60px_rgb(0,0,0,0.4)] overflow-hidden cursor-crosshair group"
                >
                  <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  {/* Glare effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 pointer-events-none mix-blend-overlay"
                    animate={{ x: mousePosition.x * 100 + "%", y: mousePosition.y * 100 + "%" }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  />
                  {book.badges && book.badges[0] && (
                    <span className="absolute top-6 left-6 z-20 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                      {book.badges[0]}
                    </span>
                  )}
                </motion.div>
                
                {/* Thumbnails */}
                <div className="flex justify-center gap-4 mt-8">
                  {[1, 2, 3].map((i) => (
                    <button key={i} className={cn("w-20 aspect-[2/3] rounded-lg overflow-hidden border-2 transition-all", i === 1 ? "border-primary shadow-md" : "border-border/50 opacity-60 hover:opacity-100")}>
                       <img src={book.coverImage} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* RIGHT: Product Details */}
            <div className="lg:w-1/2 flex flex-col justify-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">{book.genre} • {book.format}</p>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-[1.1]">{book.title}</h1>
                <p className="text-xl text-foreground/60 font-medium mb-6">By {book.author}</p>
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center text-secondary">
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current opacity-50" />
                  </div>
                  <span className="text-lg font-bold">{book.rating}</span>
                  <span className="text-foreground/50">({book.reviewsCount.toLocaleString()} reviews)</span>
                </div>

                <div className="text-4xl font-sans font-bold mb-8">${book.price.toFixed(2)}</div>
                
                <p className="text-lg text-foreground/80 leading-relaxed mb-10 font-light">
                  {book.shortDescription}
                </p>

                {/* Purchase Panel */}
                <div ref={purchasePanelRef} className="space-y-4 mb-10">
                  <div className="flex gap-4">
                    <Button onClick={() => addToCart(book)} size="lg" className={cn("flex-1 h-16 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1", isInCart && "bg-secondary hover:bg-secondary/90 text-secondary-foreground")}>
                      {isInCart ? `Added to Cart (${cartQuantity})` : "Add to Cart"}
                    </Button>
                    <Button onClick={() => toggleWishlist(book)} variant="outline" size="icon" className={cn("h-16 w-16 rounded-2xl border-border/80 hover:bg-primary/5 transition-colors", isWishlisted ? "text-red-500 border-red-200" : "")}>
                      <Heart className={cn("w-6 h-6", isWishlisted && "fill-current")} />
                    </Button>
                    <Button onClick={handleShare} variant="outline" size="icon" className="h-16 w-16 rounded-2xl border-border/80 hover:bg-primary/5">
                      <Share2 className="w-6 h-6" />
                    </Button>
                  </div>
                  <Button onClick={() => addToCart(book)} variant="secondary" className="w-full h-14 rounded-2xl text-base font-bold bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors">
                    Buy Now
                  </Button>
                </div>

                {/* Highlights / Guarantees */}
                <div className="grid grid-cols-2 gap-y-4 text-sm font-medium text-foreground/70 bg-card/50 p-6 rounded-2xl border border-border/50">
                  <div className="flex items-center gap-3"><Truck className="w-5 h-5 text-primary" /> Free Shipping over $50</div>
                  <div className="flex items-center gap-3"><RefreshCw className="w-5 h-5 text-primary" /> 30-Day Returns</div>
                  <div className="flex items-center gap-3"><ShieldCheck className="w-5 h-5 text-primary" /> Secure Checkout</div>
                  <div className="flex items-center gap-3"><BookOpen className="w-5 h-5 text-primary" /> Excellent Condition</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. BOOK HIGHLIGHTS (Editorial Cards) */}
        <section className="bg-card/30 border-y border-border py-16 mb-24">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
               {[
                 { icon: <Award/>, title: "Award Winning", desc: "Winner of the Goodreads Choice Award" },
                 { icon: <Star/>, title: "Editor's Choice", desc: "Selected by our senior literary critics" },
                 { icon: <Leaf/>, title: "Eco-Friendly", desc: "Printed on 100% recycled paper" },
                 { icon: <Heart/>, title: "Reader Favorite", desc: "Over 15,000 5-star reviews globally" }
               ].map((item, idx) => (
                 <motion.div 
                   key={idx}
                   initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                   className="flex items-start gap-4"
                 >
                   <div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                     {React.cloneElement(item.icon, { className: "w-5 h-5" })}
                   </div>
                   <div>
                     <h4 className="font-serif font-bold text-lg mb-1">{item.title}</h4>
                     <p className="text-sm text-foreground/60 leading-relaxed">{item.desc}</p>
                   </div>
                 </motion.div>
               ))}
            </div>
          </div>
        </section>

        {/* 4 & 5. EDITORIAL DESCRIPTION & TABS */}
        <section className="container mx-auto px-6 md:px-12 mb-32">
          <div className="max-w-4xl mx-auto">
            {/* Tab Headers */}
            <div className="flex overflow-x-auto scrollbar-hide border-b border-border/50 mb-12">
              {["Overview", "Specifications", "Reviews", "Shipping"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "relative px-8 py-4 text-lg font-serif font-bold transition-colors whitespace-nowrap",
                    activeTab === tab ? "text-primary" : "text-foreground/50 hover:text-foreground/80"
                  )}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                {activeTab === "Overview" && (
                  <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
                    <div className="prose prose-lg dark:prose-invert max-w-none prose-p:font-light prose-p:leading-loose">
                      <p className="first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left">
                        {book.fullDescription}
                      </p>
                      <p>
                        This deeply moving narrative explores the philosophical questions of regret, choice, and what makes a life truly meaningful. 
                        It is a perfect read for those who enjoy speculative fiction blended with profound human emotion.
                      </p>
                      <div className="flex gap-8 mt-12 pt-8 border-t border-border/50">
                        <div><strong className="block text-xs uppercase tracking-widest text-primary mb-1">Reading Level</strong>Adult Fiction</div>
                        <div><strong className="block text-xs uppercase tracking-widest text-primary mb-1">Est. Reading Time</strong>7 hours</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "Specifications" && (
                  <motion.div key="specs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                      {[
                        { label: "Author", value: book.author },
                        { label: "Publisher", value: book.publisher },
                        { label: "Format", value: book.format },
                        { label: "Pages", value: book.pages },
                        { label: "Language", value: book.language },
                        { label: "Publication Year", value: book.publicationYear },
                        { label: "ISBN", value: book.isbn },
                        { label: "Dimensions", value: "6.1 x 1.1 x 9.2 inches" },
                      ].map((spec, idx) => (
                        <div key={idx} className="flex justify-between py-4 border-b border-border/30">
                          <span className="text-foreground/50 font-medium">{spec.label}</span>
                          <span className="font-bold text-right">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "Reviews" && (
                  <motion.div key="reviews" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
                    <div className="flex flex-col md:flex-row gap-12 mb-12">
                      <div className="md:w-1/3 text-center md:text-left">
                        <div className="text-6xl font-serif font-bold text-primary mb-2">{book.rating}</div>
                        <div className="flex justify-center md:justify-start text-secondary mb-2">
                           <Star className="fill-current w-5 h-5"/>
                           <Star className="fill-current w-5 h-5"/>
                           <Star className="fill-current w-5 h-5"/>
                           <Star className="fill-current w-5 h-5"/>
                           <Star className="fill-current w-5 h-5 opacity-50"/>
                        </div>
                        <p className="text-sm text-foreground/50">Based on {book.reviewsCount.toLocaleString()} reviews</p>
                      </div>
                      <div className="md:w-2/3 space-y-3">
                        {[5,4,3,2,1].map((rating) => (
                          <div key={rating} className="flex items-center gap-4 text-sm">
                            <span className="w-12 text-foreground/60">{rating} Stars</span>
                            <div className="flex-1 h-2 bg-border/50 rounded-full overflow-hidden">
                              <div className="h-full bg-secondary rounded-full" style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : 5}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Sample Review */}
                    <div className="space-y-8">
                      <div className="p-6 bg-card rounded-2xl border border-border/50">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-serif font-bold text-primary">JD</div>
                            <div>
                              <h5 className="font-bold">Jane Doe</h5>
                              <span className="text-xs text-secondary font-medium bg-secondary/10 px-2 py-1 rounded">Verified Purchase</span>
                            </div>
                          </div>
                          <span className="text-sm text-foreground/40">Oct 12, 2025</span>
                        </div>
                        <div className="flex text-secondary mb-3"><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/></div>
                        <p className="text-foreground/80 leading-relaxed mb-4">Absolutely phenomenal. The writing is profound and deeply moving. I couldn't put it down and it left me thinking for days after finishing the last page.</p>
                        <div className="flex gap-4 text-sm font-medium">
                           <button className="flex items-center gap-2 text-foreground/50 hover:text-primary transition-colors"><ThumbsUp className="w-4 h-4"/> Helpful (24)</button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {activeTab === "Shipping" && (
                   <motion.div key="shipping" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
                     <div className="prose prose-lg dark:prose-invert">
                       <h3 className="font-serif">Fast, Premium Shipping</h3>
                       <p>Orders are carefully packaged in eco-friendly protective materials to ensure your books arrive in pristine condition.</p>
                       <ul>
                         <li><strong>Standard Delivery:</strong> 3-5 business days (Free over $50)</li>
                         <li><strong>Express Delivery:</strong> 1-2 business days ($12.00)</li>
                         <li><strong>International:</strong> 7-14 business days (Calculated at checkout)</li>
                       </ul>
                     </div>
                   </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* 6. AUTHOR SPOTLIGHT */}
        <section className="py-24 bg-card/40 border-y border-border mb-32 relative overflow-hidden">
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
              <div className="md:w-1/3 shrink-0">
                <div className="relative aspect-square rounded-full overflow-hidden border-8 border-background shadow-xl mx-auto group">
                   <img src="https://images.unsplash.com/photo-1544717302-de2939b7ef71?q=80&w=800&auto=format&fit=crop" alt="Author" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
              </div>
              <div className="md:w-2/3 text-center md:text-left">
                <span className="text-sm font-bold text-primary uppercase tracking-widest mb-2 block">About The Author</span>
                <h2 className="font-serif text-4xl font-bold mb-4">{book.author}</h2>
                <p className="text-lg text-foreground/70 leading-relaxed mb-8 font-light">
                  An acclaimed British novelist and journalist. He has written both fiction and non-fiction for children and adults, often exploring themes of mental health, existence, and the human condition with profound empathy and wit.
                </p>
                <Button variant="outline" className="rounded-full">Explore Author Collection</Button>
              </div>
            </div>
          </div>
        </section>

        {/* 7. FREQUENTLY BOUGHT TOGETHER */}
        <section className="container mx-auto px-6 md:px-12 mb-32">
          <h2 className="font-serif text-3xl font-bold mb-10 text-center">Frequently Bought Together</h2>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 bg-card/20 p-8 rounded-[2rem] border border-border/50 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
               <img src={book.coverImage} className="w-24 aspect-[2/3] object-cover rounded-md shadow-md border border-border/50" />
               <span className="text-4xl text-foreground/30 font-light">+</span>
               <img src={relatedBooks[0].coverImage} className="w-24 aspect-[2/3] object-cover rounded-md shadow-md border border-border/50" />
            </div>
            <div className="text-center lg:text-left flex-1">
               <div className="text-3xl font-bold font-sans mb-2">${(book.price + relatedBooks[0].price).toFixed(2)}</div>
               <p className="text-sm text-foreground/60 mb-4">Add both to cart for an exclusive 10% discount on your order.</p>
               <Button className="rounded-full w-full lg:w-auto px-8">Add Both to Cart</Button>
            </div>
          </div>
        </section>

        {/* 8. YOU MAY ALSO LIKE */}
        <section className="container mx-auto px-6 md:px-12 mb-32">
          <h2 className="font-serif text-3xl font-bold mb-10">You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedBooks.slice(0, 4).map((relatedBook, idx) => (
              <motion.div 
                key={relatedBook.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-4 shadow-sm border border-border/40 group-hover:shadow-xl transition-all duration-500">
                  <img src={relatedBook.coverImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <h4 className="font-serif font-bold text-lg line-clamp-1">{relatedBook.title}</h4>
                <p className="text-sm text-foreground/50 mb-2">{relatedBook.author}</p>
                <p className="font-bold">${relatedBook.price.toFixed(2)}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {/* STICKY ADD TO CART (Mobile/Desktop Scroll) */}
      <AnimatePresence>
        {isStickyVisible && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border shadow-[0_-10px_40px_rgb(0,0,0,0.1)] py-4 px-6 md:px-12"
          >
            <div className="container mx-auto flex items-center justify-between">
               <div className="hidden md:flex items-center gap-4">
                 <img src={book.coverImage} className="w-12 aspect-[2/3] object-cover rounded shadow-sm" />
                 <div>
                   <h4 className="font-serif font-bold">{book.title}</h4>
                   <p className="text-xs text-foreground/60">{book.author}</p>
                 </div>
               </div>
               <div className="flex items-center justify-between w-full md:w-auto gap-6">
                 <div className="text-2xl font-bold font-sans">${book.price.toFixed(2)}</div>
                 <Button onClick={() => addToCart(book)} size="lg" className={cn("rounded-xl px-8 md:px-12 shadow-lg", isInCart && "bg-secondary hover:bg-secondary/90 text-secondary-foreground")}>
                   {isInCart ? `Added to Cart (${cartQuantity})` : "Add to Cart"}
                 </Button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
