"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Sun,
  Moon,
  Type,
  ChevronLeft,
  ChevronRight,
  Star,
  Gift
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { mockProducts } from "@/data/mockProducts";

const luxuryEase = [0.22, 1, 0.36, 1];

const readingModes = {
  light: { bg: "bg-amber-50", text: "text-gray-800", accent: "text-amber-800", prose: "prose-amber" },
  sepia: { bg: "bg-[#f5e6c8]", text: "text-[#5c3d2e]", accent: "text-[#8b5e3c]", prose: "prose-amber" },
  dark: { bg: "bg-gray-900", text: "text-gray-200", accent: "text-amber-400", prose: "prose-invert" },
};

const fontSizes = [
  { label: "Sm", value: "text-sm" },
  { label: "Md", value: "text-base" },
  { label: "Lg", value: "text-lg" },
  { label: "XL", value: "text-xl" },
  { label: "2X", value: "text-2xl" },
];

const chapters = [
  { title: "Chapter One", emoji: "" },
  { title: "Chapter Two", emoji: "" },
  { title: "Chapter Three", emoji: "" },
];

export default function ReadPage() {
  const params = useParams();
  const router = useRouter();
  const book = mockProducts.find((b) => b.id === params?.id);
  const [readingMode, setReadingMode] = React.useState<"light" | "sepia" | "dark">("sepia");
  const [fontSize, setFontSize] = React.useState(2);
  const [progress, setProgress] = React.useState(0);
  const contentRef = React.useRef<HTMLDivElement>(null);

  if (!book) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold mb-4">Book Not Found</h1>
          <Link href="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const mode = readingModes[readingMode];

  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const p = scrollHeight - clientHeight > 0 ? scrollTop / (scrollHeight - clientHeight) : 0;
      setProgress(Math.min(Math.round(p * 100), 100));
    }
  };

  return (
    <div className={`min-h-screen ${mode.bg} ${mode.text} font-sans transition-colors duration-500`}>
      {/* Top Bar */}
      <header className={`sticky top-0 z-40 border-b ${readingMode === "dark" ? "border-gray-700/50" : "border-amber-200/50"} backdrop-blur-md ${readingMode === "dark" ? "bg-gray-900/80" : "bg-amber-50/80"}`}>
        <div className="max-w-4xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${mode.accent}`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="hidden sm:block">
              <h1 className="font-serif font-bold text-sm leading-tight line-clamp-1">{book.title}</h1>
              <p className={`text-[11px] ${mode.accent} opacity-70`}>{book.author}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Font Size Controls */}
            <div className={`hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full ${readingMode === "dark" ? "bg-gray-800" : "bg-amber-100/50"}`}>
              <Type className="w-3.5 h-3.5 opacity-50" />
              {fontSizes.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => setFontSize(i)}
                  className={`w-7 h-7 rounded-full text-[10px] font-bold transition-all ${
                    fontSize === i
                      ? `${readingMode === "dark" ? "bg-amber-500 text-white" : "bg-amber-700 text-white"}`
                      : "opacity-50 hover:opacity-100"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Reading Mode Toggle */}
            <div className={`flex items-center gap-1 px-2 py-1.5 rounded-full ${readingMode === "dark" ? "bg-gray-800" : "bg-amber-100/50"}`}>
              {(["light", "sepia", "dark"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setReadingMode(m)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    readingMode === m
                      ? `${m === "dark" ? "bg-amber-500 text-white" : m === "sepia" ? "bg-amber-700 text-white" : "bg-amber-200 text-amber-900"}`
                      : "opacity-40 hover:opacity-80"
                  }`}
                >
                  {m === "light" ? <Sun className="w-4 h-4" /> : m === "sepia" ? <BookOpen className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Reading Progress Bar */}
      <div className="sticky top-16 z-30 h-1 bg-black/5 dark:bg-white/5">
        <motion.div
          className="h-full bg-amber-600 dark:bg-amber-400"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Reading Content */}
      <main
        ref={contentRef}
        onScroll={handleScroll}
        className="max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-20 overflow-y-auto"
        style={{ height: "calc(100vh - 68px)" }}
      >
        {/* Book Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-28 md:w-36 aspect-[2/3] mx-auto rounded-xl overflow-hidden shadow-2xl mb-8 border-2 border-white/20 dark:border-gray-700/50">
            <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Gift className="w-3.5 h-3.5" /> Free Read
          </div>
          <h1 className={`font-serif text-3xl md:text-5xl font-bold mb-3 ${mode.accent}`}>{book.title}</h1>
          <p className={`text-lg md:text-xl opacity-70 mb-4`}>by {book.author}</p>
          <div className="flex items-center justify-center gap-2 text-amber-600">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-semibold">{book.rating}</span>
            <span className="opacity-50">•</span>
            <span className="text-sm opacity-60">{book.genre}</span>
          </div>
        </motion.div>

        {/* Book Content */}
        <div className={`leading-relaxed ${fontSizes[fontSize].value} space-y-6`}>
          <p className="opacity-80 leading-relaxed first-letter:text-3xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:mt-1">
            {book.fullDescription}
          </p>

          {chapters.map((chapter, i) => (
            <motion.div
              key={chapter.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pt-8"
            >
              <h2 className={`font-serif text-xl md:text-2xl font-bold mb-4 ${mode.accent}`}>
                {chapter.title}
              </h2>
              <div className="space-y-4 opacity-80">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p>
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
                </p>
              </div>
            </motion.div>
          ))}

          {/* End of Book */}
          <div className="text-center pt-16 pb-8">
            <div className="w-16 h-px bg-amber-300 dark:bg-amber-700 mx-auto mb-6" />
            <p className={`text-sm ${mode.accent} opacity-60 italic`}>— The End —</p>
          </div>
        </div>

        {/* Back to Shop */}
        <div className="text-center pb-12">
          <Link href="/shop">
            <Button variant="outline" className={`rounded-full border-amber-300 dark:border-amber-700 ${mode.accent}`}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
