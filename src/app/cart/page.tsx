"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Heart, Plus, Minus, ArrowRight, ShieldCheck, CreditCard, Tag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useStore } from "@/store/StoreContext";
import { cn } from "@/utils/cn";

const luxuryEase = [0.22, 1, 0.36, 1];

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, toggleWishlist } = useStore();
  const [couponCode, setCouponCode] = React.useState("");
  const [discount, setDiscount] = React.useState(0);
  const [couponState, setCouponState] = React.useState<"idle" | "success" | "error">("idle");

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "READ10") {
      setDiscount(cartTotal * 0.1);
      setCouponState("success");
    } else {
      setDiscount(0);
      setCouponState("error");
    }
  };

  const tax = (cartTotal - discount) * 0.08;
  const shipping = cartTotal > 50 ? 0 : 12;
  const finalTotal = (cartTotal - discount) + tax + shipping;

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 container mx-auto px-6 md:px-12">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-12">Shopping Cart</h1>

        {cart.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="py-20 flex flex-col items-center justify-center text-center bg-card/20 rounded-[3rem] border border-border/50 max-w-4xl mx-auto"
          >
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-8">
              <ShoppingBagIcon className="w-10 h-10 text-primary/50" />
            </div>
            <h2 className="font-serif text-3xl font-bold mb-4">Your Cart is Empty</h2>
            <p className="text-foreground/60 text-lg mb-8 max-w-md">
              Discover your next favorite story in our collection of curated masterpieces.
            </p>
            <Link href="/shop">
              <Button size="lg" className="rounded-full px-10 text-lg h-14 shadow-lg hover:-translate-y-1 transition-transform">
                Start Shopping
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* LEFT: CART ITEMS */}
            <div className="lg:w-2/3">
              <div className="hidden md:grid grid-cols-12 text-sm font-bold uppercase tracking-widest text-foreground/50 border-b border-border/60 pb-4 mb-6">
                <div className="col-span-6">Product</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-3 text-right">Total</div>
              </div>

              <div className="space-y-8">
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.4, ease: luxuryEase }}
                      className="flex flex-col sm:flex-row gap-6 pb-8 border-b border-border/30 group"
                    >
                      {/* Image */}
                      <Link href={`/shop/${item.id}`} className="shrink-0 w-32 aspect-[2/3] rounded-xl overflow-hidden border border-border/50 shadow-sm relative group-hover:shadow-md transition-shadow">
                        <img src={item.coverImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={item.title} />
                      </Link>
                      
                      {/* Details */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <Link href={`/shop/${item.id}`} className="hover:text-primary transition-colors">
                            <h3 className="font-serif text-2xl font-bold line-clamp-1">{item.title}</h3>
                          </Link>
                          <span className="font-bold text-xl md:hidden">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <p className="text-foreground/60 font-medium mb-1">{item.author}</p>
                        <p className="text-sm font-bold text-primary uppercase tracking-widest mb-4">{item.genre}</p>
                        
                        <div className="mt-auto flex flex-wrap items-center gap-4 text-sm font-medium">
                          <button onClick={() => removeFromCart(item.id)} className="flex items-center gap-1.5 text-foreground/50 hover:text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4"/> Remove
                          </button>
                          <span className="w-1 h-1 rounded-full bg-border/80"></span>
                          <button 
                            onClick={() => { toggleWishlist(item); removeFromCart(item.id); }} 
                            className="flex items-center gap-1.5 text-foreground/50 hover:text-primary transition-colors"
                          >
                            <Heart className="w-4 h-4"/> Save for Later
                          </button>
                        </div>
                      </div>

                      {/* Quantity & Total (Desktop) */}
                      <div className="hidden md:flex shrink-0 items-center gap-12">
                        <div className="flex items-center border border-border/60 rounded-full bg-background px-3 py-1.5 shadow-sm">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-primary transition-colors"><Minus className="w-4 h-4"/></button>
                          <span className="w-8 text-center font-bold text-lg">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-primary transition-colors"><Plus className="w-4 h-4"/></button>
                        </div>
                        <div className="w-24 text-right font-bold text-xl">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>

                      {/* Quantity (Mobile) */}
                      <div className="md:hidden flex items-center border border-border/60 rounded-full bg-background px-3 py-1.5 w-fit shadow-sm">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-primary transition-colors"><Minus className="w-4 h-4"/></button>
                          <span className="w-8 text-center font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-primary transition-colors"><Plus className="w-4 h-4"/></button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* RIGHT: ORDER SUMMARY */}
            <div className="lg:w-1/3">
              <div className="bg-card/40 border border-border/60 rounded-[2rem] p-8 sticky top-32 shadow-xl">
                <h3 className="font-serif text-2xl font-bold mb-6">Order Summary</h3>
                
                {/* Coupon Code */}
                <div className="mb-8 relative">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                      <input 
                        type="text" 
                        placeholder="Promo Code (Try READ10)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className={cn(
                          "w-full h-12 pl-12 pr-4 bg-background border rounded-xl outline-none transition-colors uppercase",
                          couponState === "error" ? "border-red-500/50 focus:border-red-500" : "border-border/60 focus:border-primary"
                        )}
                      />
                    </div>
                    <Button onClick={handleApplyCoupon} variant="secondary" className="h-12 rounded-xl px-6">Apply</Button>
                  </div>
                  {couponState === "error" && <p className="text-red-500 text-xs mt-2 absolute">Invalid coupon code.</p>}
                  {couponState === "success" && <p className="text-green-500 text-xs mt-2 absolute">Coupon applied successfully!</p>}
                </div>

                <div className="space-y-4 text-sm border-b border-border/60 pb-6 mb-6">
                  <div className="flex justify-between items-center text-foreground/80">
                    <span>Subtotal</span>
                    <span className="font-bold text-base text-foreground">${cartTotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="flex justify-between items-center text-green-600">
                      <span>Discount (READ10)</span>
                      <span className="font-bold text-base">-${discount.toFixed(2)}</span>
                    </motion.div>
                  )}
                  <div className="flex justify-between items-center text-foreground/80">
                    <span>Estimated Shipping</span>
                    <span className="font-bold text-base text-foreground">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between items-center text-foreground/80">
                    <span>Estimated Tax</span>
                    <span className="font-bold text-base text-foreground">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-8">
                  <span className="font-serif text-xl font-bold text-foreground/60">Total</span>
                  <span className="font-sans text-4xl font-bold">${finalTotal.toFixed(2)}</span>
                </div>

                <Link href="/checkout">
                  <Button size="lg" className="w-full h-16 rounded-2xl text-lg shadow-lg hover:-translate-y-1 transition-all mb-4">
                    Proceed to Checkout <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>

                <div className="flex items-center justify-center gap-2 text-xs text-foreground/50 font-medium bg-background/50 py-3 rounded-xl border border-border/50">
                   <ShieldCheck className="w-4 h-4 text-green-500" />
                   Secure SSL Encrypted Checkout
                </div>

                <div className="flex justify-center gap-4 mt-6 text-foreground/30">
                  <CreditCard className="w-8 h-8" />
                  {/* Mock Icons for Payment Methods */}
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M12.001 2.005c-5.522 0-9.999 4.477-9.999 10 0 5.522 4.477 9.999 9.999 9.999 5.522 0 10-4.477 10-9.999 0-5.522-4.478-10-10-10zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zM14 9.005h-4v6h4v-6z"/></svg>
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M21 4H3c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h18c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 14H3V6h18v12zM5 13h4v2H5v-2zm6 0h4v2h-4v-2zm6 0h4v2h-4v-2zM5 9h4v2H5V9zm6 0h4v2h-4V9zm6 0h4v2h-4V9z"/></svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

// Inline Icon
function ShoppingBagIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>;
}
