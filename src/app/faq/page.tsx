"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ChevronDown, HelpCircle, Mail, Package, CreditCard, RotateCcw, User, Shield, Truck, Search } from "lucide-react";
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

const categories = [
  {
    icon: Package,
    label: "Orders",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: CreditCard,
    label: "Payment",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Truck,
    label: "Shipping",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: RotateCcw,
    label: "Returns",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: User,
    label: "Account",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Shield,
    label: "Privacy",
    color: "text-accent",
    bg: "bg-accent/10",
  },
];

const faqGroups = [
  {
    category: "Orders",
    icon: Package,
    questions: [
      {
        q: "How do I place an order?",
        a: "Browse our collection, add items to your cart, and proceed to checkout. You will be guided through shipping details, payment, and order confirmation in a few simple steps. No account is required, though creating one makes future orders faster.",
      },
      {
        q: "Can I modify or cancel my order after placing it?",
        a: "We process orders quickly, but if you need to make a change, reach out within one hour of placing the order. Contact our support team with your order number and the change you need, and we will do our best to accommodate.",
      },
      {
        q: "How will I know my order was confirmed?",
        a: "After placing your order, you will receive a confirmation email with your order number and a summary of your purchase. If you do not see it within a few minutes, check your spam folder or contact us to verify.",
      },
      {
        q: "Do you offer gift wrapping or personalized notes?",
        a: "Yes. During checkout, you can add a gift note and select gift wrapping for an additional care fee. We will hand-wrap each book and include your message on a card tucked inside the ribbon.",
      },
    ],
  },
  {
    category: "Payment",
    icon: CreditCard,
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept Visa, Mastercard, American Express, Discover, and PayPal. Depending on your region, you may also use Apple Pay or Shop Pay at checkout.",
      },
      {
        q: "Is my payment information secure?",
        a: "Absolutely. All transactions are processed through encrypted, PCI-compliant payment gateways. We never store your full card details on our servers.",
      },
      {
        q: "Do you offer payment plans or buy now, pay later?",
        a: "We are exploring options like Afterpay and Klarna. For now, full payment is collected at the time of purchase. We keep our prices fair so that every order feels straightforward.",
      },
      {
        q: "Will I be charged sales tax?",
        a: "Sales tax is applied based on your shipping address and local regulations. The exact amount will be calculated and displayed during checkout before you confirm your order.",
      },
    ],
  },
  {
    category: "Shipping",
    icon: Truck,
    questions: [
      {
        q: "How long does shipping take?",
        a: "Standard shipping takes 5-8 business days within the continental US. Expedited shipping (2-3 business days) and next-day delivery are available at checkout. International orders typically arrive in 10-18 business days.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes. We ship to most countries worldwide. International shipping rates and delivery times vary by destination and are calculated at checkout. Customs duties and taxes may apply and are the responsibility of the recipient.",
      },
      {
        q: "What are your shipping costs?",
        a: "Standard shipping is free for orders over $40 within the US. For orders under $40, a flat rate of $5.99 applies. Expedited and international rates are calculated based on weight and destination at checkout.",
      },
      {
        q: "Can I change my shipping address after placing an order?",
        a: "If your order has not yet shipped, we can update the address. Contact us immediately with your order number and corrected address. Once shipped, we are unable to reroute packages.",
      },
    ],
  },
  {
    category: "Returns",
    icon: RotateCcw,
    questions: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 30 days of delivery for books in their original condition. Simply contact us with your order number and the items you wish to return, and we will provide a prepaid return label.",
      },
      {
        q: "How do I initiate a return?",
        a: "Send us a message through our contact page or email hello@leaflantern.com with your order number and the reason for return. We will respond within 24 hours with instructions and a prepaid shipping label.",
      },
      {
        q: "Will I be refunded for the full amount?",
        a: "Once we receive the returned item in original condition, we process a full refund to your original payment method within 5-7 business days. Shipping costs are non-refundable unless the return is due to our error.",
      },
      {
        q: "What if my book arrives damaged?",
        a: "We take great care in packaging, but if a book arrives damaged, please send photos of the damage and the packaging within 48 hours of delivery. We will send a replacement immediately at no additional cost.",
      },
    ],
  },
  {
    category: "Account",
    icon: User,
    questions: [
      {
        q: "Do I need an account to place an order?",
        a: "No. You can check out as a guest. Creating an account allows you to save your shipping details, view order history, track multiple orders, and build a wishlist for future purchases.",
      },
      {
        q: "How do I reset my password?",
        a: "Click the 'Forgot Password' link on the login page. Enter the email address associated with your account, and we will send you a secure link to create a new password.",
      },
      {
        q: "Can I delete my account?",
        a: "Yes. Contact us with your account email and we will delete your personal data from our systems within 14 days. Please note that order history required for tax and legal purposes may be retained in anonymized form.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    icon: Shield,
    questions: [
      {
        q: "How do you use my personal information?",
        a: "We use your information solely to process orders, provide customer support, and send optional recommendations if you subscribe. We never sell or share your data with third parties for marketing purposes. See our Privacy Policy for full details.",
      },
      {
        q: "What cookies do you use?",
        a: "We use essential cookies for cart and authentication functionality, and optional analytics cookies to understand how readers use our site. You can manage your cookie preferences at any time.",
      },
      {
        q: "Is my data safe on your site?",
        a: "We use industry-standard SSL encryption, secure payment gateways, and follow data protection best practices. Your personal information is stored securely and access is limited to essential staff only.",
      },
    ],
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null);
  const [openItems, setOpenItems] = React.useState<Set<string>>(new Set());

  const filtered = faqGroups
    .filter((group) => !activeCategory || group.category === activeCategory)
    .map((group) => ({
      ...group,
      questions: group.questions.filter(
        (item) =>
          !searchQuery ||
          item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.a.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((group) => group.questions.length > 0);

  function toggleItem(key: string) {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-background font-sans overflow-hidden">
      <Navbar />

      <main>
        <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
          <FaqAtmosphere />
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl mx-auto text-center">
              <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.28em] text-primary/80 mb-6">
                Help Center
              </motion.p>
              <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
                Questions & Answers
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg md:text-xl text-foreground/70 font-light leading-relaxed max-w-2xl mx-auto mb-10">
                Everything you need to know about ordering from Leaf & Lantern. If you cannot find what you are looking for, we are just a message away.
              </motion.p>

              <motion.div variants={fadeUp} className="max-w-xl mx-auto relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" aria-hidden="true" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions..."
                  className="w-full h-14 pl-12 pr-4 rounded-full bg-card/70 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow text-lg"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="pb-8">
          <div className="container mx-auto px-6 md:px-12">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex flex-wrap justify-center gap-3"
            >
              <motion.button
                variants={fadeUp}
                onClick={() => setActiveCategory(null)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-semibold border transition-all",
                  !activeCategory
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "border-border/60 hover:border-primary/40 hover:text-primary"
                )}
              >
                All Topics
              </motion.button>
              {categories.map(({ icon: Icon, label, color, bg }) => (
                <motion.button
                  key={label}
                  variants={fadeUp}
                  onClick={() => setActiveCategory(activeCategory === label ? null : label)}
                  className={cn(
                    "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all",
                    activeCategory === label
                      ? "bg-primary text-primary-foreground border-primary shadow-md"
                      : "border-border/60 hover:border-primary/40 hover:text-primary"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-6 md:px-12 max-w-4xl">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <HelpCircle className="w-12 h-12 mx-auto mb-6 text-foreground/30" aria-hidden="true" />
                <h2 className="font-serif text-2xl font-bold mb-3">No results found</h2>
                <p className="text-foreground/60 mb-8 max-w-md mx-auto">
                  Try a different search term, or browse by category above.
                </p>
                <Button
                  variant="outline"
                  onClick={() => { setSearchQuery(""); setActiveCategory(null); }}
                  className="rounded-full"
                >
                  Clear Filters
                </Button>
              </motion.div>
            ) : (
              <div className="space-y-16">
                {filtered.map((group) => (
                  <motion.div
                    key={group.category}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    variants={staggerContainer}
                  >
                    <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                        <group.icon className="w-6 h-6" aria-hidden="true" />
                      </div>
                      <h2 className="font-serif text-3xl font-bold">{group.category}</h2>
                    </motion.div>
                    <div className="space-y-3">
                      {group.questions.map((item) => {
                        const key = `${group.category}-${item.q}`;
                        const isOpen = openItems.has(key);
                        return (
                          <motion.div
                            key={key}
                            variants={fadeUp}
                            className="rounded-2xl bg-card/70 border border-border/50 overflow-hidden transition-shadow hover:shadow-md"
                          >
                            <button
                              type="button"
                              aria-expanded={isOpen}
                              onClick={() => toggleItem(key)}
                              className="w-full min-h-16 px-6 py-5 flex items-center justify-between gap-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            >
                              <span className="font-serif text-xl font-bold">{item.q}</span>
                              <ChevronDown
                                aria-hidden="true"
                                className={cn(
                                  "w-5 h-5 text-primary shrink-0 transition-transform duration-300",
                                  isOpen && "rotate-180"
                                )}
                              />
                            </button>
                            <motion.div
                              initial={false}
                              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <p className="px-6 pb-6 text-foreground/64 leading-relaxed font-light">
                                {item.a}
                              </p>
                            </motion.div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
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
              <motion.div variants={fadeUp} className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-8">
                <Mail className="w-7 h-7" aria-hidden="true" />
              </motion.div>
              <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Still have questions?
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg text-foreground/70 font-light leading-relaxed max-w-xl mx-auto mb-10">
                Our booksellers are close by and glad to help. Send us a message and we will reply within one business day.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/contact">
                  <Button size="lg" className="rounded-full shadow-lg group">
                    Contact Us
                    <Mail aria-hidden="true" className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <a href="mailto:hello@leaflantern.com">
                  <Button variant="outline" size="lg" className="rounded-full">
                    hello@leaflantern.com
                  </Button>
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

function FaqAtmosphere() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(212,163,115,0.18),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(30,58,95,0.12),transparent_32%),radial-gradient(circle_at_50%_85%,rgba(107,142,110,0.14),transparent_36%)]" />
      <div className="absolute inset-0 opacity-[0.035] dark:opacity-[0.018] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      {Array.from({ length: 12 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute w-1.5 h-1.5 rounded-full bg-secondary/45"
          style={{ left: `${10 + ((index * 23) % 82)}%`, top: `${12 + ((index * 29) % 72)}%` }}
          animate={{ y: [0, -16, 0], opacity: [0.25, 0.7, 0.25] }}
          transition={{ repeat: Infinity, duration: 4 + (index % 4), delay: index * 0.2, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
