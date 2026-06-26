"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const luxuryEase = [0.22, 1, 0.36, 1];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 pt-24 pb-16">
        <div className="text-center max-w-2xl mx-auto">
          {/* Floating book icon */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center justify-center mb-10"
          >
            <div className="relative">
              {/* Glow ring */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
              />
              <div className="relative w-28 h-28 rounded-full bg-muted flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-primary" strokeWidth={1.5} />
              </div>
            </div>
          </motion.div>

          {/* 404 Heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: luxuryEase }}
          >
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary/70 mb-4">
              Error 404
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Page Not Found
            </h1>
            <p className="text-foreground/60 text-lg md:text-xl leading-relaxed mb-10 max-w-md mx-auto">
              Looks like this page wandered off the shelf. Let&apos;s get you back to
              the good reads.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: luxuryEase }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/">
              <Button size="lg" className="gap-2">
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <Link href="/shop">
              <Button variant="outline" size="lg" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Browse Books
              </Button>
            </Link>
          </motion.div>

          {/* Decorative dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-2 mt-16"
            aria-hidden="true"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.4, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
                className="w-2 h-2 rounded-full bg-border"
              />
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
