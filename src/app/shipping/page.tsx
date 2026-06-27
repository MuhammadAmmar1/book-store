"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Package,
  Truck,
  RotateCcw,
  Globe2,
  Clock,
  ShieldCheck,
  ArrowRight,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

const luxuryEase = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: luxuryEase } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

const policies = [
  {
    icon: Truck,
    title: "Shipping Policy",
    sections: [
      {
        subtitle: "Delivery Timeframes",
        content:
          "Standard delivery within the continental United States takes 5-8 business days from the date of shipment. Expedited shipping (2-3 business days) and next-day delivery are available for an additional fee calculated at checkout. International orders typically arrive within 10-18 business days, though customs processing may occasionally extend this window.",
      },
      {
        subtitle: "Shipping Rates",
        content:
          "We offer free standard shipping on all domestic orders over $40. Orders under $40 are shipped for a flat rate of $5.99. Expedited shipping starts at $12.99 and next-day delivery at $24.99. International rates are calculated by weight, dimensions, and destination during checkout.",
      },
      {
        subtitle: "Order Processing",
        content:
          "Orders are processed within 1-2 business days after placement. During peak seasons or limited-edition releases, processing may take up to 3 business days. You will receive a confirmation email with tracking information as soon as your order ships.",
      },
      {
        subtitle: "Tracking Your Order",
        content:
          "Every shipment includes a tracking number sent to your email. You can also track your order at any time through our Track Order page using your order number and email address.",
      },
    ],
  },
  {
    icon: Globe2,
    title: "International Shipping",
    sections: [
      {
        subtitle: "Available Destinations",
        content:
          "We ship to over 60 countries worldwide. If your country is not listed at checkout, please contact us and we will do our best to accommodate your order.",
      },
      {
        subtitle: "Customs & Duties",
        content:
          "International orders may be subject to import duties, taxes, and customs fees imposed by the destination country. These charges are the responsibility of the recipient and are not included in the purchase price or shipping cost. We recommend checking with your local customs office before placing an order.",
      },
      {
        subtitle: "Delivery Times",
        content:
          "International deliveries typically arrive within 10-18 business days. Delivery to remote or rural areas may take longer. Please allow additional time during international holiday periods.",
      },
    ],
  },
  {
    icon: RotateCcw,
    title: "Returns & Exchanges",
    sections: [
      {
        subtitle: "Return Window",
        content:
          "We accept returns within 30 days of delivery. Books must be returned in their original condition — unmarked, uncreased, and free from damage. We reserve the right to refuse returns that show signs of use beyond normal browsing.",
      },
      {
        subtitle: "How to Return",
        content:
          "Contact us at hello@leaflantern.com with your order number and the items you wish to return. We will provide a prepaid return shipping label and detailed instructions. Pack the books securely in the original packaging if possible.",
      },
      {
        subtitle: "Refunds",
        content:
          "Refunds are processed within 5-7 business days after we receive and inspect the returned items. The full purchase price is refunded to your original payment method. Original shipping costs are non-refundable unless the return is due to our error or a defective item.",
      },
      {
        subtitle: "Exchanges",
        content:
          "If you received a damaged or incorrect item, we will send a replacement immediately at no additional cost. For other cases, we recommend returning the original item for a refund and placing a new order for the desired title.",
      },
    ],
  },
];

const shippingTable = [
  { method: "Standard (Free over $40)", cost: "$0.00 — $5.99", time: "5-8 business days" },
  { method: "Expedited", cost: "$12.99", time: "2-3 business days" },
  { method: "Next-Day Delivery", cost: "$24.99", time: "1 business day" },
  { method: "International", cost: "Calculated at checkout", time: "10-18 business days" },
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-hidden">
      <Navbar />

      <main>
        <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
          <ShippingAtmosphere />
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl mx-auto text-center">
              <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.28em] text-primary/80 mb-6">
                Policies
              </motion.p>
              <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
                Shipping & Returns
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg md:text-xl text-foreground/70 font-light leading-relaxed max-w-2xl mx-auto">
                Every order is packed with care and shipped with transparency. Here is everything you need to know about delivery, costs, and returns.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-6 md:px-12 max-w-5xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={staggerContainer}
              className="mb-20"
            >
              <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-2">
                Shipping Rates & Delivery Times
              </motion.h2>
              <motion.p variants={fadeUp} className="text-foreground/65 font-light mb-10">
                Simple, transparent pricing for every delivery speed.
              </motion.p>
              <motion.div variants={fadeUp} className="overflow-hidden rounded-[2rem] border border-border/50 bg-card/60 shadow-sm">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border/50 bg-card/80">
                      <th className="px-6 py-5 font-serif text-lg font-bold">Method</th>
                      <th className="px-6 py-5 font-serif text-lg font-bold">Cost</th>
                      <th className="px-6 py-5 font-serif text-lg font-bold hidden sm:table-cell">Estimated Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shippingTable.map((row, index) => (
                      <tr
                        key={row.method}
                        className={cn(
                          "border-b border-border/30 transition-colors hover:bg-card/40",
                          index === shippingTable.length - 1 && "border-b-0"
                        )}
                      >
                        <td className="px-6 py-5 font-medium">{row.method}</td>
                        <td className="px-6 py-5 text-foreground/70">{row.cost}</td>
                        <td className="px-6 py-5 text-foreground/70 hidden sm:table-cell">{row.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </motion.div>

            <div className="space-y-24">
              {policies.map((policy, index) => (
                <motion.section
                  key={policy.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-90px" }}
                  variants={staggerContainer}
                >
                  <motion.div variants={fadeUp} className="flex items-center gap-4 mb-10">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <policy.icon className="w-7 h-7" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight">{policy.title}</h2>
                    </div>
                  </motion.div>
                  <div className={cn("grid gap-8", policy.sections.length > 2 ? "md:grid-cols-2" : "md:grid-cols-2")}>
                    {policy.sections.map((section) => (
                      <motion.article
                        key={section.subtitle}
                        variants={fadeUp}
                        className="bg-card/50 border border-border/40 rounded-[1.8rem] p-7 hover:shadow-md transition-shadow"
                      >
                        <h3 className="font-serif text-2xl font-bold mb-4">{section.subtitle}</h3>
                        <p className="text-foreground/64 leading-relaxed font-light">{section.content}</p>
                      </motion.article>
                    ))}
                  </div>
                </motion.section>
              ))}
            </div>
          </div>
        </section>

        <section className="py-28 bg-card/20 border-y border-border/50">
          <div className="container mx-auto px-6 md:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="max-w-3xl mx-auto text-center"
            >
              <motion.div variants={fadeUp} className="w-16 h-16 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mx-auto mb-8">
                <ShieldCheck className="w-7 h-7" aria-hidden="true" />
              </motion.div>
              <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Packed with care, backed by trust.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg text-foreground/70 font-light leading-relaxed max-w-xl mx-auto mb-10">
                Every book is wrapped in protective packaging and checked before it leaves our reading room. If anything feels wrong, we will make it right.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/contact">
                  <Button size="lg" className="rounded-full shadow-lg group">
                    Get Help with an Order
                    <ArrowRight aria-hidden="true" className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/faq">
                  <Button variant="outline" size="lg" className="rounded-full">
                    Visit FAQ
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ShippingAtmosphere() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(107,142,110,0.18),transparent_34%),radial-gradient(circle_at_80%_15%,rgba(212,163,115,0.13),transparent_32%),radial-gradient(circle_at_45%_85%,rgba(30,58,95,0.12),transparent_36%)]" />
      <div className="absolute inset-0 opacity-[0.035] dark:opacity-[0.018] bg-[url('/noise.svg')]" />
      {Array.from({ length: 14 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute w-1.5 h-1.5 rounded-full bg-accent/45"
          style={{ left: `${10 + ((index * 23) % 82)}%`, top: `${12 + ((index * 29) % 72)}%` }}
          animate={{ y: [0, -16, 0], opacity: [0.25, 0.65, 0.25] }}
          transition={{ repeat: Infinity, duration: 4 + (index % 4), delay: index * 0.2, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
