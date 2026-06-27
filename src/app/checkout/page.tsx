"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  CreditCard,
  Truck,
  ShieldCheck,
  ChevronRight,
  CheckCircle,
  ArrowLeft,
  Package,
  Gift
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useStore } from "@/store/StoreContext";
import { mockProducts } from "@/data/mockProducts";



const luxuryEase = [0.22, 1, 0.36, 1];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: luxuryEase } },
};

export default function CheckoutPage() {
  const { cart, cartTotal, lastPurchased, clearCart } = useStore();
  const [mounted, setMounted] = React.useState(false);
  const [orderTotals, setOrderTotals] = React.useState<{ subtotal: number; tax: number; shipping: number; total: number } | null>(null);
  const tax = cartTotal * 0.08;

  const [toastMessage, setToastMessage] = React.useState<{ type: "error" | "success", text: string } | null>(null);
  const [currentStep, setCurrentStepState] = React.useState<number>(1);
  const [orderId, setOrderIdState] = React.useState<string>("");
  
  // Shipping method selection state persisted in sessionStorage
  const [selectedShipping, setSelectedShipping] = React.useState<string>("Standard Delivery");

  // Form state persisted in sessionStorage across step transitions
  const [shippingForm, setShippingForm] = React.useState<Record<string, string>>({});
  const [paymentForm, setPaymentForm] = React.useState<Record<string, string>>({});

  // Restore sessionStorage state after mount to avoid hydration mismatches
  React.useEffect(() => {
    setMounted(true);
    const step = Number(sessionStorage.getItem("checkoutStep") || 1);
    if (step !== 1) setCurrentStepState(step);
    const id = sessionStorage.getItem("checkoutOrderId") || "";
    if (id) setOrderIdState(id);
    const shipping = sessionStorage.getItem("checkoutShipping");
    if (shipping) setSelectedShipping(shipping);
    const savedShipping = sessionStorage.getItem("checkoutShippingForm");
    if (savedShipping) setShippingForm(JSON.parse(savedShipping));
    const savedPayment = sessionStorage.getItem("checkoutPaymentForm");
    if (savedPayment) setPaymentForm(JSON.parse(savedPayment));
  }, []);

  const updateShippingField = (label: string, value: string) => {
    setShippingForm(prev => {
      const next = { ...prev, [label]: value };
      sessionStorage.setItem("checkoutShippingForm", JSON.stringify(next));
      return next;
    });
  };

  const updatePaymentField = (label: string, value: string) => {
    setPaymentForm(prev => {
      const next = { ...prev, [label]: value };
      sessionStorage.setItem("checkoutPaymentForm", JSON.stringify(next));
      return next;
    });
  };

  // Compute shipping cost based on selected method
  const shippingCostMap: Record<string, number> = {
    "Standard Delivery": 0,
    "Express Delivery": 12,
    "Priority Overnight": 24,
  };
  const shipping = shippingCostMap[selectedShipping] ?? 0;
  const finalTotal = cartTotal + tax + shipping;

  const setCurrentStep = (step: number) => {
    setCurrentStepState(step);
    sessionStorage.setItem("checkoutStep", String(step));
  };

  const setOrderId = (id: string) => {
    setOrderIdState(id);
    sessionStorage.setItem("checkoutOrderId", id);
    // Also persist to localStorage for /track page
    const orders = JSON.parse(localStorage.getItem("ll_orders") || "[]");
    orders.unshift({ id, date: new Date().toISOString() });
    localStorage.setItem("ll_orders", JSON.stringify(orders.slice(0, 10)));
  };

  const giftBooks = React.useMemo(() =>
    mockProducts.filter(b => b.id === "book-001" || b.id === "book-008").map(b => ({ ...b, quantity: 1 })),
  []);

  const showToast = (type: "error" | "success", text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast("error", "Your cart is empty. Please add some books first.");
      return;
    }

    if (currentStep === 1) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === 2) {
      const newOrderId = "LNL-" + Math.floor(1000 + Math.random() * 9000);
      setOrderId(newOrderId);
      setOrderTotals({ subtotal: cartTotal, tax, shipping, total: finalTotal });
      localStorage.setItem("checkoutGiftBooks_" + newOrderId, JSON.stringify(giftBooks));
      clearCart();
      setCurrentStep(3);
      showToast("success", "Order placed successfully! Thank you for your purchase.");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 container mx-auto px-6 md:px-12 max-w-6xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <Link href="/cart" className="inline-flex items-center gap-2 text-sm font-medium text-foreground/60 hover:text-primary transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Cart
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2">Checkout</h1>
          <p className="text-foreground/60">Review your order before completing your purchase.</p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center gap-0 mb-14 overflow-x-auto">
          {["Cart", "Checkout", "Payment", "Confirmation"].map((step, i) => (
            <React.Fragment key={step}>
              <div
                className={`flex items-center gap-2 shrink-0 ${i <= currentStep ? (i < currentStep ? "text-primary cursor-pointer hover:opacity-80" : "text-primary") : "text-foreground/40"}`}
                onClick={() => {
                  if (i > 0 && i < currentStep && currentStep < 3) setCurrentStep(i);
                }}
              >
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-colors ${i < currentStep ? "bg-primary border-primary text-primary-foreground" : i === currentStep ? "border-primary text-primary" : "border-border/40 text-foreground/30"}`}>
                  {i < currentStep ? <CheckCircle className="w-5 h-5" /> : i + 1}
                </div>
                <span className={`text-sm font-semibold whitespace-nowrap ${i <= currentStep ? "text-primary" : "text-foreground/40"}`}>{step}</span>
              </div>
              {i < 3 && <div className={`flex-1 min-w-8 h-[2px] mx-3 rounded-full ${i < currentStep ? "bg-primary" : "bg-border/40"}`} />}
            </React.Fragment>
          ))}
        </div>

        <form
          onSubmit={handleCheckout}
          className="grid grid-cols-1 lg:grid-cols-3 gap-10"
        >
          {/* LEFT: Checkout Form UI - all steps kept in DOM to preserve input state */}
          <div className="lg:col-span-2 space-y-8 relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={currentStep === 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -20, pointerEvents: "none" }}
              transition={{ duration: 0.3 }}
              className={currentStep === 1 ? "" : "invisible absolute inset-0"}
            >
              {/* Shipping Address */}
              <motion.section variants={fadeUp} className="bg-card/40 border border-border/50 rounded-3xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="font-serif text-xl font-bold">Shipping Address</h2>
                  </div>
                  <button className="text-sm font-medium text-primary hover:underline">Edit</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "First Name", placeholder: "John", width: 1 },
                    { label: "Last Name", placeholder: "Doe", width: 1 },
                    { label: "Email Address", placeholder: "john@example.com", width: 2 },
                    { label: "Phone Number", placeholder: "+1 (555) 000-0000", width: 1 },
                    { label: "Country", placeholder: "United States", width: 1 },
                    { label: "Street Address", placeholder: "123 Library Lane", width: 2 },
                    { label: "City", placeholder: "New York", width: 1 },
                    { label: "Zip Code", placeholder: "10001", width: 1 },
                  ].map((field) => (
                    <div key={field.label} className={field.width === 2 ? "sm:col-span-2" : ""}>
                      <label className="block text-xs font-bold text-foreground/50 uppercase tracking-widest mb-2">{field.label}</label>
                      <input
                        required
                        type="text"
                        value={shippingForm[field.label] || ""}
                        onChange={(e) => updateShippingField(field.label, e.target.value)}
                        disabled={currentStep !== 1}
                        placeholder={field.placeholder}
                        className="w-full h-12 px-4 bg-background border border-border/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow placeholder:text-foreground/30 disabled:opacity-50"
                      />
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Delivery Method */}
              <motion.section variants={fadeUp} className="bg-card/40 border border-border/50 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-serif text-xl font-bold">Delivery Method</h2>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "Standard Delivery", time: "3–5 business days", price: "Free", selected: selectedShipping === "Standard Delivery" },
                    { name: "Express Delivery", time: "1–2 business days", price: "$12.00", selected: selectedShipping === "Express Delivery" },
                    { name: "Priority Overnight", time: "Next business day", price: "$24.00", selected: selectedShipping === "Priority Overnight" },
                  ].map((method) => (
                    <label 
                      key={method.name} 
                      onClick={() => {
                        setSelectedShipping(method.name);
                        sessionStorage.setItem("checkoutShipping", method.name);
                      }}
                      className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${method.selected ? "border-primary bg-primary/5" : "border-border/50 hover:border-border"}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method.selected ? "border-primary" : "border-border"}`}>
                          {method.selected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                        </div>
                        <div>
                          <p className="font-semibold">{method.name}</p>
                          <p className="text-sm text-foreground/60">{method.time}</p>
                        </div>
                      </div>
                      <span className={`font-bold ${method.price === "Free" ? "text-primary" : ""}`}>{method.price}</span>
                    </label>
                  ))}
                </div>
              </motion.section>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={currentStep === 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: 20, pointerEvents: "none" }}
              transition={{ duration: 0.3 }}
              className={currentStep === 2 ? "" : "invisible absolute inset-0"}
            >
              {/* Payment Method */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-card/40 border border-border/50 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-serif text-xl font-bold">Payment Method</h2>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-foreground/50 uppercase tracking-widest mb-2">Card Number</label>
                      <input required type="text" value={paymentForm["Card Number"] || ""} onChange={(e) => updatePaymentField("Card Number", e.target.value)} disabled={currentStep !== 2} placeholder="•••• •••• •••• ••••" className="w-full h-12 px-4 bg-background border border-border/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow placeholder:text-foreground/30 disabled:opacity-50" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-foreground/50 uppercase tracking-widest mb-2">Expiry Date</label>
                      <input required type="text" value={paymentForm["Expiry Date"] || ""} onChange={(e) => updatePaymentField("Expiry Date", e.target.value)} disabled={currentStep !== 2} placeholder="MM / YY" className="w-full h-12 px-4 bg-background border border-border/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow placeholder:text-foreground/30 disabled:opacity-50" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-foreground/50 uppercase tracking-widest mb-2">CVV</label>
                      <input required type="text" value={paymentForm["CVV"] || ""} onChange={(e) => updatePaymentField("CVV", e.target.value)} disabled={currentStep !== 2} placeholder="•••" className="w-full h-12 px-4 bg-background border border-border/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow placeholder:text-foreground/30 disabled:opacity-50" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 p-3 bg-primary/5 rounded-xl border border-primary/20">
                    <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                    <p className="text-xs text-foreground/70">Your payment information is encrypted with 256-bit SSL security. We never store card details.</p>
                  </div>
                </div>
              </motion.section>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={currentStep === 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95, pointerEvents: "none" }}
              transition={{ duration: 0.3 }}
              className={currentStep === 3 ? "" : "invisible absolute inset-0"}
            >
              <section className="bg-card/40 border border-border/50 rounded-3xl p-12 text-center flex flex-col items-center">
                <CheckCircle className="w-16 h-16 text-primary mb-6" />
                <h2 className="font-serif text-3xl font-bold mb-4">Order Confirmed!</h2>
                <p className="text-foreground/60 mb-8 max-w-md">Thank you for your purchase. Your order <span className="font-bold text-foreground">{orderId}</span> has been placed and is being processed.</p>
                <Link href="/track">
                  <Button size="lg" className="rounded-2xl h-14 shadow-lg hover:-translate-y-1 transition-transform px-8">Track Your Order</Button>
                </Link>
              </section>
            </motion.div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card/40 border border-border/50 rounded-3xl p-8 sticky top-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-secondary" />
                </div>
                <h2 className="font-serif text-xl font-bold">Order Summary</h2>
              </div>

              {/* Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-1">
                {!mounted ? (
                  <p className="text-foreground/50 text-sm text-center py-4">No items in cart.</p>
                ) : (currentStep === 3 ? lastPurchased : cart).length === 0 ? (
                  <p className="text-foreground/50 text-sm text-center py-4">No items in cart.</p>
                ) : (currentStep === 3 ? lastPurchased : cart).map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-12 aspect-[2/3] rounded-lg overflow-hidden shadow-sm border border-border/50 shrink-0">
                      <img src={item.coverImage} className="w-full h-full object-cover" alt={item.title} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm line-clamp-1">{item.title}</p>
                      <p className="text-xs text-foreground/50">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-sm shrink-0">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Free Gift */}
              {mounted && (
                <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                  <div className="flex items-center gap-2 mb-3">
                    <Gift className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">Free Gift</span>
                  </div>
                  <p className="text-xs text-foreground/70 mb-3">Enjoy two free books with your purchase!</p>
                  <div className="space-y-2">
                    {giftBooks.map((book) => (
                      <div key={book.id} className="flex gap-2 items-center">
                        <div className="w-8 aspect-[2/3] rounded overflow-hidden border border-border/50 shrink-0">
                          <img src={book.coverImage} className="w-full h-full object-cover" alt={book.title} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold line-clamp-1">{book.title}</p>
                          <p className="text-[10px] text-foreground/50">{book.author}</p>
                        </div>
                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">FREE</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3 border-y border-border/50 py-5 mb-5 text-sm">
                <div className="flex justify-between"><span className="text-foreground/60">Subtotal</span><span className="font-medium">${!mounted ? "0.00" : (orderTotals ? orderTotals.subtotal : cartTotal).toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-foreground/60">Shipping</span><span className="font-medium">{!mounted ? "Free" : (orderTotals ? (orderTotals.shipping === 0 ? "Free" : `$${orderTotals.shipping.toFixed(2)}`) : (shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`))}</span></div>
                <div className="flex justify-between"><span className="text-foreground/60">Tax (8%)</span><span className="font-medium">${!mounted ? "0.00" : (orderTotals ? orderTotals.tax : tax).toFixed(2)}</span></div>
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="font-serif text-lg font-bold text-foreground/60">Total</span>
                <span className="font-sans text-3xl font-bold">${!mounted ? "0.00" : (orderTotals ? orderTotals.total : finalTotal).toFixed(2)}</span>
              </div>

              {currentStep < 3 && (
                <>
                  <Button type="submit" size="lg" className="w-full h-16 rounded-2xl text-lg shadow-xl hover:-translate-y-1 transition-all">
                    {currentStep === 1 ? "Continue to Payment" : "Complete Purchase"}
                  </Button>
                  <p className="text-center text-xs text-foreground/40 mt-4">
                    By {currentStep === 1 ? "continuing" : "completing your purchase"}, you agree to our <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
                  </p>
                </>
              )}
            </div>
          </div>
        </form>
      </main>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`fixed bottom-8 right-8 z-50 px-6 py-4 rounded-2xl shadow-2xl font-medium flex items-center gap-3 ${toastMessage.type === "error" ? "bg-red-500 text-white" : "bg-primary text-primary-foreground"}`}
          >
            {toastMessage.type === "error" ? <ShieldCheck className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
            {toastMessage.text}
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
