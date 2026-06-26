"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  Cookie,
  Mail,
  FileText,
  ArrowRight,
  Database,
  Trash2,
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

const sections = [
  {
    icon: Database,
    title: "Information We Collect",
    items: [
      {
        heading: "Personal Information",
        content:
          "When you place an order, create an account, or contact us, we collect the information you provide: your name, email address, shipping address, phone number, and payment details. Payment data is processed by our secure payment partners and is never stored in full on our systems.",
      },
      {
        heading: "Usage Information",
        content:
          "We automatically collect certain information about how you interact with our site, including pages visited, books viewed, search queries, and referring website. This helps us improve your experience and recommend titles you might love.",
      },
      {
        heading: "Cookies & Similar Technologies",
        content:
          "We use essential cookies to keep your cart and session secure. With your consent, we also use analytics cookies to understand reading patterns and improve our recommendations. You can manage your preferences at any time.",
      },
    ],
  },
  {
    icon: Eye,
    title: "How We Use Your Information",
    items: [
      {
        heading: "Order Fulfillment",
        content:
          "Your information is used to process and ship your orders, send order confirmations and tracking updates, and provide customer support when you need it.",
      },
      {
        heading: "Recommendations & Communications",
        content:
          "If you subscribe to our newsletter, we use your preferences and purchase history to send thoughtful book recommendations. You can unsubscribe at any time with a single click.",
      },
      {
        heading: "Site Improvement",
        content:
          "Aggregated, anonymized data helps us understand which sections of our store are most helpful and how readers discover books, so we can keep improving the experience.",
      },
    ],
  },
  {
    icon: Lock,
    title: "Data Sharing & Security",
    items: [
      {
        heading: "Third-Party Services",
        content:
          "We share your information only with trusted service providers who help us operate our store: payment processors, shipping carriers, and our email delivery partner. These providers are contractually bound to protect your data and use it only for the services they provide.",
      },
      {
        heading: "No Data Selling",
        content:
          "We never sell, rent, or trade your personal information to third parties for their marketing purposes. Your trust is essential to us, and we protect it carefully.",
      },
      {
        heading: "Security Measures",
        content:
          "We implement industry-standard encryption (SSL/TLS), secure server infrastructure, and access controls to protect your data. Our systems are regularly reviewed and updated to maintain a high security standard.",
      },
    ],
  },
  {
    icon: Cookie,
    title: "Your Rights & Choices",
    items: [
      {
        heading: "Access & Correction",
        content:
          "You may request a copy of the personal data we hold about you and ask us to correct any inaccuracies. Contact us and we will respond within 30 days.",
      },
      {
        heading: "Data Deletion",
        content:
          "You can request deletion of your personal data at any time. We will honor your request within 14 days, though certain order information may be retained in anonymized form for legal and accounting purposes.",
      },
      {
        heading: "Marketing Preferences",
        content:
          "You can opt out of marketing emails at any time by clicking the unsubscribe link in any email or by updating your account preferences. We will respect your choice promptly.",
      },
    ],
  },
];

const lastUpdated = "June 15, 2026";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-hidden">
      <Navbar />

      <main>
        <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
          <PrivacyAtmosphere />
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl mx-auto text-center">
              <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.28em] text-primary/80 mb-6">
                Privacy
              </motion.p>
              <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
                Privacy Policy
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg md:text-xl text-foreground/70 font-light leading-relaxed max-w-2xl mx-auto mb-4">
                Your privacy matters to us. We collect only what we need, share only what is necessary, and never sell your data.
              </motion.p>
              <motion.p variants={fadeUp} className="text-sm text-foreground/50">
                Last updated: {lastUpdated}
              </motion.p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-6 md:px-12 max-w-4xl">
            <div className="space-y-24">
              {sections.map((section) => (
                <motion.section
                  key={section.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-90px" }}
                  variants={staggerContainer}
                >
                  <motion.div variants={fadeUp} className="flex items-center gap-4 mb-10">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <section.icon className="w-7 h-7" aria-hidden="true" />
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight">{section.title}</h2>
                  </motion.div>
                  <div className="grid md:grid-cols-3 gap-6">
                    {section.items.map((item) => (
                      <motion.article
                        key={item.heading}
                        variants={fadeUp}
                        className="bg-card/50 border border-border/40 rounded-[1.8rem] p-7 hover:shadow-md transition-shadow"
                      >
                        <h3 className="font-serif text-2xl font-bold mb-4">{item.heading}</h3>
                        <p className="text-foreground/64 leading-relaxed font-light">{item.content}</p>
                      </motion.article>
                    ))}
                  </div>
                </motion.section>
              ))}
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={staggerContainer}
              className="mt-24 bg-card/40 border border-border/40 rounded-[2rem] p-8 md:p-12"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6" aria-hidden="true" />
                </div>
                <h2 className="font-serif text-3xl font-bold">Contact Us About Privacy</h2>
              </motion.div>
              <motion.p variants={fadeUp} className="text-foreground/64 leading-relaxed font-light mb-8 max-w-2xl">
                If you have questions about this policy, wish to access or delete your data, or want to report a concern, please reach out to our privacy team.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                <a href="mailto:privacy@leaflantern.com">
                  <Button size="lg" className="rounded-full shadow-lg group">
                    <Mail aria-hidden="true" className="mr-3 w-5 h-5" />
                    privacy@leaflantern.com
                  </Button>
                </a>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="rounded-full">
                    Contact Form
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-card/20 border-y border-border/50">
          <div className="container mx-auto px-6 md:px-12 max-w-4xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-6"
            >
              <motion.div variants={fadeUp} className="rounded-[1.8rem] border border-border/40 bg-card/50 p-7">
                <Trash2 className="w-8 h-8 text-foreground/40 mb-5" aria-hidden="true" />
                <h3 className="font-serif text-xl font-bold mb-3">Data Deletion Request</h3>
                <p className="text-foreground/60 text-sm leading-relaxed mb-4">
                  To request deletion of your personal data, email us from the address associated with your account. We will confirm receipt within 48 hours and complete the request within 14 days.
                </p>
                <a href="mailto:privacy@leaflantern.com?subject=Data%20Deletion%20Request" className="text-primary text-sm font-semibold hover:underline">
                  Request Deletion &rarr;
                </a>
              </motion.div>
              <motion.div variants={fadeUp} className="rounded-[1.8rem] border border-border/40 bg-card/50 p-7">
                <FileText className="w-8 h-8 text-foreground/40 mb-5" aria-hidden="true" />
                <h3 className="font-serif text-xl font-bold mb-3">Data Access Request</h3>
                <p className="text-foreground/60 text-sm leading-relaxed mb-4">
                  You have the right to know what personal data we hold about you. Email us with the subject line &ldquo;Data Access Request&rdquo; and we will provide a copy within 30 days.
                </p>
                <a href="mailto:privacy@leaflantern.com?subject=Data%20Access%20Request" className="text-primary text-sm font-semibold hover:underline">
                  Request Data &rarr;
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function PrivacyAtmosphere() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(30,58,95,0.15),transparent_34%),radial-gradient(circle_at_75%_20%,rgba(212,163,115,0.12),transparent_32%),radial-gradient(circle_at_50%_80%,rgba(107,142,110,0.10),transparent_36%)]" />
      <div className="absolute inset-0 opacity-[0.035] dark:opacity-[0.018] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      {Array.from({ length: 10 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary/45"
          style={{ left: `${10 + ((index * 23) % 82)}%`, top: `${12 + ((index * 29) % 72)}%` }}
          animate={{ y: [0, -16, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ repeat: Infinity, duration: 4 + (index % 4), delay: index * 0.2, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
