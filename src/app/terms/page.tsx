"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Scale,
  Ban,
  ShieldCheck,
  Mail,
  ArrowRight,
  HelpCircle,
  BookOpen,
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
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const sections = [
  {
    icon: BookOpen,
    title: "Use of Our Store",
    content:
      "By accessing or purchasing from Leaf & Lantern, you agree to be bound by these terms. You may use our site for lawful purposes only and in a way that does not infringe the rights of others or restrict their use of the store. You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the service without express written permission.",
  },
  {
    icon: Scale,
    title: "Account Responsibilities",
    content:
      "If you create an account, you are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete information during the registration process and to update it as needed. Notify us immediately of any unauthorized use of your account.",
  },
  {
    icon: Ban,
    title: "Prohibited Activities",
    content:
      "You may not use our site for any fraudulent or unlawful purpose, including but not limited to: impersonating any person or entity, interfering with the security or functionality of the site, introducing malware or harmful code, scraping or harvesting data without consent, or engaging in any activity that places undue burden on our infrastructure.",
  },
  {
    icon: FileText,
    title: "Intellectual Property",
    content:
      "All content on Leaf & Lantern — including text, graphics, logos, images, book descriptions, and software — is the property of Leaf & Lantern or its content suppliers and is protected by applicable copyright and trademark laws. You may not use, reproduce, distribute, or modify any content without prior written consent.",
  },
  {
    icon: ShieldCheck,
    title: "Product Information & Pricing",
    content:
      "We strive to display accurate descriptions, prices, and availability for all products. However, errors may occur. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update information at any time without prior notice. If a product is listed at an incorrect price, we may cancel the order and refund the full amount.",
  },
  {
    icon: HelpCircle,
    title: "Limitation of Liability",
    content:
      "Leaf & Lantern shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the site or any products purchased. Our total liability for any claim arising from your purchase shall not exceed the amount paid for the product giving rise to the claim. Some jurisdictions do not allow certain limitations, so these may not apply to you.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-hidden">
      <Navbar />

      <main>
        <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
          <TermsAtmosphere />
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl mx-auto text-center">
              <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.28em] text-primary/80 mb-6">
                Legal
              </motion.p>
              <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
                Terms of Service
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg md:text-xl text-foreground/70 font-light leading-relaxed max-w-2xl mx-auto mb-4">
                These terms govern your use of Leaf & Lantern and your purchase of books from our store. Please read them carefully.
              </motion.p>
              <motion.p variants={fadeUp} className="text-sm text-foreground/50">
                Last updated: June 15, 2026
              </motion.p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-6 md:px-12 max-w-4xl">
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-foreground/60 leading-relaxed font-light mb-16 p-6 bg-card/30 border border-border/40 rounded-[1.8rem]"
            >
              Welcome to Leaf & Lantern. By accessing our website or placing an order, you agree to the following terms and conditions. If you do not agree with any part of these terms, please refrain from using our site or services.
            </motion.p>

            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.article
                  key={section.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={staggerContainer}
                  className={cn(
                    "rounded-[2rem] border p-7 md:p-9 transition-shadow hover:shadow-md",
                    index % 2 === 0 ? "bg-card/50 border-border/40" : "bg-card/30 border-border/30"
                  )}
                >
                  <motion.div variants={fadeUp} className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-1">
                      <section.icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">{section.title}</h2>
                      <p className="text-foreground/64 leading-relaxed font-light">{section.content}</p>
                    </div>
                  </motion.div>
                </motion.article>
              ))}
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={staggerContainer}
              className="mt-16 bg-card/40 border border-border/40 rounded-[2rem] p-8 md:p-12"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                  <Scale className="w-6 h-6" aria-hidden="true" />
                </div>
                <h2 className="font-serif text-3xl font-bold">Governing Law</h2>
              </motion.div>
              <motion.p variants={fadeUp} className="text-foreground/64 leading-relaxed font-light mb-8">
                These terms are governed by the laws of the State of Oregon, without regard to its conflict of law provisions. Any disputes arising from these terms or your use of the site shall be resolved in the courts of Multnomah County, Oregon.
              </motion.p>
              <motion.p variants={fadeUp} className="text-foreground/64 leading-relaxed font-light mb-8">
                If any provision of these terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that the remaining terms remain in full force and effect.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={staggerContainer}
              className="mt-12 bg-card/40 border border-border/40 rounded-[2rem] p-8 md:p-12"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" aria-hidden="true" />
                </div>
                <h2 className="font-serif text-3xl font-bold">Questions About These Terms</h2>
              </motion.div>
              <motion.p variants={fadeUp} className="text-foreground/64 leading-relaxed font-light mb-8 max-w-2xl">
                If you have any questions, concerns, or requests regarding these terms, please reach out to us.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button size="lg" className="rounded-full shadow-lg group">
                    Contact Us
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

function TermsAtmosphere() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,163,115,0.15),transparent_34%),radial-gradient(circle_at_80%_25%,rgba(30,58,95,0.12),transparent_32%),radial-gradient(circle_at_40%_80%,rgba(107,142,110,0.12),transparent_36%)]" />
      <div className="absolute inset-0 opacity-[0.035] dark:opacity-[0.018] bg-[url('/noise.svg')]" />
      {Array.from({ length: 12 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute w-1.5 h-1.5 rounded-full bg-secondary/40"
          style={{ left: `${10 + ((index * 23) % 82)}%`, top: `${12 + ((index * 29) % 72)}%` }}
          animate={{ y: [0, -16, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ repeat: Infinity, duration: 4 + (index % 4), delay: index * 0.2, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
