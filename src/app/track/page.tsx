"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, Truck, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const luxuryEase = [0.22, 1, 0.36, 1];

const steps = [
  { id: 1, label: "Order Placed", icon: <Package className="w-6 h-6" />, date: "Oct 24, 2026 - 09:30 AM" },
  { id: 2, label: "Processing", icon: <Clock className="w-6 h-6" />, date: "Oct 25, 2026 - 11:15 AM" },
  { id: 3, label: "Shipped", icon: <Truck className="w-6 h-6" />, date: "Oct 26, 2026 - 02:40 PM" },
  { id: 4, label: "Delivered", icon: <CheckCircle className="w-6 h-6" />, date: "Estimated Oct 28, 2026" },
];

export default function TrackOrderPage() {
  const [orderId, setOrderId] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isTracking, setIsTracking] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [recentOrders, setRecentOrders] = React.useState<{id: string; date: string}[]>([]);

  // Hardcode current step to 3 (Shipped) for demonstration
  const currentStep = 3;

  // Load recent orders from localStorage on mount
  React.useEffect(() => {
    const stored = localStorage.getItem("ll_orders");
    if (stored) {
      const orders = JSON.parse(stored);
      setRecentOrders(orders);
      // Pre-fill with the most recent order ID
      if (orders.length > 0) {
        setOrderId(orders[0].id);
      }
    }
  }, []);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId || !email) return;
    
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      setIsTracking(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 container mx-auto px-6 md:px-12 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: luxuryEase }} className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Track Your Order</h1>
          <p className="text-foreground/60 text-lg max-w-xl mx-auto">
            Enter your order number and email address below to see the current status of your shipment.
          </p>
        </motion.div>

        {!isTracking ? (
          <motion.form 
            onSubmit={handleTrack}
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-card/40 border border-border/50 rounded-[2rem] p-8 md:p-12 shadow-xl max-w-2xl mx-auto backdrop-blur-sm"
          >
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-xs font-bold text-foreground/50 uppercase tracking-widest mb-2">Order Number</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
                  <input 
                    required
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    type="text" 
                    placeholder="e.g. LNL-1234" 
                    className="w-full h-14 pl-12 pr-4 bg-background border border-border/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow text-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground/50 uppercase tracking-widest mb-2">Email Address</label>
                <input 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email" 
                  placeholder="Enter the email used during checkout" 
                  className="w-full h-14 px-4 bg-background border border-border/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow text-lg"
                />
              </div>
            </div>
            
            <Button type="submit" size="lg" className="w-full h-14 rounded-xl text-lg font-bold shadow-lg hover:-translate-y-1 transition-transform disabled:opacity-70 disabled:hover:translate-y-0" disabled={isLoading}>
              {isLoading ? "Searching..." : "Track Order"}
            </Button>

            {recentOrders.length > 0 && (
              <div className="mt-6 pt-6 border-t border-border/40">
                <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-3 text-center">Recent Orders</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {recentOrders.map((order) => (
                    <button
                      key={order.id}
                      type="button"
                      onClick={() => setOrderId(order.id)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${orderId === order.id ? "bg-primary text-primary-foreground border-primary" : "border-border/60 hover:border-primary hover:text-primary"}`}
                    >
                      {order.id}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.form>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: luxuryEase }}
            className="bg-card/40 border border-border/50 rounded-[2rem] p-8 md:p-12 shadow-xl backdrop-blur-sm relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-12 border-b border-border/50 pb-8">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-1">Order {orderId.toUpperCase()}</h2>
                <p className="text-foreground/60">Sent to {email}</p>
              </div>
              <Button variant="outline" onClick={() => setIsTracking(false)} className="rounded-full">Track Another</Button>
            </div>

            <div className="relative pb-10">
              {/* Connecting Line Background */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-border/40 md:-translate-x-1/2 rounded-full" />
              
              {/* Connecting Line Foreground (Progress) */}
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 1.5, ease: luxuryEase, delay: 0.2 }}
                className="absolute left-8 md:left-1/2 top-0 w-1 bg-primary md:-translate-x-1/2 rounded-full origin-top"
              />

              <div className="space-y-12">
                {steps.map((step, index) => {
                  const isCompleted = step.id <= currentStep;
                  const isCurrent = step.id === currentStep;

                  return (
                    <motion.div 
                      key={step.id} 
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      className={`relative flex items-center gap-6 md:justify-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                    >
                      {/* Step Circle */}
                      <div className={`z-10 w-16 h-16 rounded-full border-4 flex items-center justify-center shrink-0 transition-colors duration-500 shadow-xl ${isCompleted ? "bg-primary border-primary text-primary-foreground" : "bg-card border-border/60 text-foreground/30"}`}>
                        {step.icon}
                      </div>

                      {/* Content Box */}
                      <div className={`flex-1 md:w-1/2 md:flex-none ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                        <div className={`bg-background/80 backdrop-blur-sm p-5 rounded-2xl border transition-colors ${isCurrent ? "border-primary shadow-lg" : "border-border/50"}`}>
                          <h3 className={`font-bold text-lg mb-1 ${isCompleted ? "text-foreground" : "text-foreground/40"}`}>{step.label}</h3>
                          <p className={`text-sm ${isCompleted ? "text-primary font-medium" : "text-foreground/40"}`}>{step.date}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}
