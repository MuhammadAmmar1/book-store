"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
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

const contactInfo = [
  { icon: Mail, title: "Email", detail: "hello@leaflantern.com", note: "Thoughtful replies within one business day." },
  { icon: Phone, title: "Phone", detail: "+1 (555) 014-8821", note: "Monday to Friday, 9 AM to 6 PM." },
  { icon: MapPin, title: "Address", detail: "42 Wren Street, Portland, OR", note: "Pickup desk and reading room by appointment." },
  { icon: Clock, title: "Business Hours", detail: "Mon-Fri, 9 AM-6 PM", note: "Weekend support for urgent order questions." },
  { icon: MessageCircle, title: "Live Chat", detail: "Available 10 AM-4 PM", note: "Fast help for orders, gifts, and recommendations." },
];


const faqs = [
  {
    question: "What is the fastest way to get order help?",
    answer: "Use the subject field for Order Support and include your order number in the message. We prioritize active delivery and payment questions first.",
  },
  {
    question: "Can you recommend books as gifts?",
    answer: "Absolutely. Tell us the reader's age range, recent favorites, and the mood you want the gift to carry. We will suggest a focused shortlist.",
  },
  {
    question: "Do you handle bulk or event orders?",
    answer: "Yes. We support book clubs, classrooms, team reads, and event bundles. Send the title, quantity, date, and any packaging needs.",
  },
  {
    question: "Can I visit the store location?",
    answer: "Our pickup desk and reading room are available by appointment. Contact us first so we can make sure the right books and people are ready.",
  },
];

type FormValues = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  method: "email" | "phone" | "either";
  newsletter: boolean;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  method: "email",
  newsletter: true,
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-hidden">
      <Navbar />

      <main>
        <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
          <ContactAtmosphere />
          <div className="container mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-[1fr_0.9fr] gap-14 items-center">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl">
              <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.28em] text-primary/80 mb-6">
                Contact Leaf & Lantern
              </motion.p>
              <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-8">
                We&apos;d Love to Hear From You
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg md:text-xl text-foreground/70 font-light leading-relaxed max-w-2xl mb-10">
                Whether you need help with an order, want a reading recommendation, or have a story to share, our booksellers are close by and glad to help.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                <a href="#contact-form" className="inline-flex">
                  <Button size="lg" className="group w-full sm:w-auto rounded-full shadow-[0_14px_40px_rgb(30,58,95,0.18)]">
                    Send a Message
                    <Send aria-hidden="true" className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <Link href="/shop" className="inline-flex">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full bg-card/50 backdrop-blur-sm">
                    Browse First
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: luxuryEase, delay: 0.2 }}
              className="relative hidden md:block"
              aria-hidden="true"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden border border-border/50 shadow-2xl">
                <img src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1400&auto=format&fit=crop" alt="" className="aspect-[4/4.2] w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/10 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-secondary mb-3">Reader care desk</p>
                  <p className="font-serif text-3xl font-bold leading-tight">Questions, recommendations, and thoughtful support in one place.</p>
                </div>
              </div>
              <motion.div animate={{ y: [0, -14, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="absolute -left-8 top-14 rounded-3xl bg-card border border-border/50 p-5 shadow-xl">
                <Mail className="w-6 h-6 text-primary mb-3" />
                <p className="font-serif text-xl font-bold">24h response</p>
              </motion.div>
              <motion.div animate={{ y: [0, 14, 0] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.6 }} className="absolute -right-6 bottom-16 rounded-3xl bg-primary text-primary-foreground p-5 shadow-xl">
                <Sparkles className="w-6 h-6 mb-3" />
                <p className="font-serif text-xl font-bold">Personal picks</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-card/25 border-y border-border/50">
          <div className="container mx-auto px-6 md:px-12">
            <SectionHeading eyebrow="Contact Information" title="Choose the doorway that suits the question." desc="Every channel leads to the same careful reader support team." />
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {contactInfo.map(({ icon: Icon, title, detail, note }) => (
                <InfoCard key={title} icon={<Icon />} title={title} detail={detail} note={note} />
              ))}
            </motion.div>
          </div>
        </section>

        <section id="contact-form" className="py-28 scroll-mt-28">
          <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-[0.8fr_1fr] gap-12 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary/80 mb-5">Contact Form</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-6">Tell us what you are looking for.</h2>
              <p className="text-lg text-foreground/66 leading-relaxed font-light mb-8">
                The more context you share, the better we can help. A recent favorite, order number, deadline, or gift note can turn a simple reply into the right reply.
              </p>
              <div className="rounded-3xl bg-card/55 border border-border/50 p-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold mb-2">Private and practical</h3>
                    <p className="text-foreground/62 leading-relaxed font-light">Your message is used only to respond to your request. No noisy follow-up, no mystery lists.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <ContactForm />
          </div>
        </section>

        <section className="py-28 bg-card/20 border-y border-border/50">
          <div className="container mx-auto px-6 md:px-12">
            <SectionHeading eyebrow="Store Location" title="A small room for pickup, events, and quiet browsing." desc="Our online shelves travel everywhere, but our reading room still keeps a lamp on for local readers." />
            <motion.div initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.75, ease: luxuryEase }} className="grid lg:grid-cols-[1fr_0.75fr] gap-7">
              <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-border/50 bg-card shadow-xl">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(30,58,95,0.08)_1px,transparent_1px),linear-gradient(rgba(30,58,95,0.08)_1px,transparent_1px)] bg-[size:42px_42px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_45%,rgba(212,163,115,0.35),transparent_10%),radial-gradient(circle_at_62%_30%,rgba(107,142,110,0.22),transparent_12%),radial-gradient(circle_at_24%_65%,rgba(30,58,95,0.18),transparent_14%)]" />
                <div className="absolute left-[18%] right-[18%] top-[52%] h-2 rounded-full bg-primary/35 rotate-[-13deg]" />
                <div className="absolute left-[38%] top-[16%] bottom-[12%] w-2 rounded-full bg-secondary/45 rotate-[9deg]" />
                <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }} className="absolute left-[52%] top-[43%] -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-2xl">
                    <MapPin className="w-7 h-7" aria-hidden="true" />
                  </div>
                </motion.div>
                <div className="absolute bottom-6 left-6 right-6 rounded-3xl bg-background/82 backdrop-blur-md border border-border/50 p-5">
                  <p className="font-serif text-2xl font-bold mb-1">Leaf & Lantern Reading Room</p>
                  <p className="text-foreground/62">Two blocks from Wren Street Station.</p>
                </div>
              </div>
              <div className="rounded-[2rem] bg-card/70 border border-border/50 p-8 flex flex-col justify-center">
                <h3 className="font-serif text-3xl font-bold mb-6">Visit Details</h3>
                <dl className="space-y-5 text-foreground/68">
                  <div>
                    <dt className="font-bold text-foreground mb-1">Address</dt>
                    <dd>42 Wren Street, Portland, OR 97205</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-foreground mb-1">Opening Hours</dt>
                    <dd>Monday-Friday, 9 AM-6 PM. Saturday pickup by appointment.</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-foreground mb-1">Nearby Landmark</dt>
                    <dd>Across from the old civic library garden.</dd>
                  </div>
                </dl>
                <Button className="mt-8 rounded-full group">
                  Directions
                  <ArrowRight aria-hidden="true" className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>


        <section className="py-28 bg-card/20 border-y border-border/50">
          <div className="container mx-auto px-6 md:px-12">
            <SectionHeading eyebrow="FAQ" title="A few answers before you write." desc="These are the questions readers most often ask before sending a note." />
            <FaqAccordion faqs={faqs} />
          </div>
        </section>


        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}

function ContactAtmosphere() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(212,163,115,0.22),transparent_33%),radial-gradient(circle_at_78%_18%,rgba(30,58,95,0.15),transparent_31%),radial-gradient(circle_at_58%_88%,rgba(107,142,110,0.16),transparent_35%)]" />
      <div className="absolute inset-0 opacity-[0.035] dark:opacity-[0.018] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      {Array.from({ length: 14 }).map((_, index) => (
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

function SectionHeading({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="max-w-3xl mb-16">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary/80 mb-5">{eyebrow}</p>
      <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-6">{title}</h2>
      <p className="text-lg text-foreground/65 leading-relaxed font-light">{desc}</p>
    </motion.div>
  );
}

function InfoCard({ icon, title, detail, note }: { icon: React.ReactNode; title: string; detail: string; note: string }) {
  return (
    <motion.article variants={fadeUp} className="group bg-card/70 border border-border/50 rounded-3xl p-6 hover:-translate-y-2 hover:shadow-xl transition-all duration-500">
      <div className="w-[52px] h-[52px] rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
        {React.cloneElement(icon as React.ReactElement<{ className?: string; "aria-hidden"?: string }>, { className: "w-6 h-6", "aria-hidden": "true" })}
      </div>
      <h3 className="font-serif text-2xl font-bold mb-2">{title}</h3>
      <p className="font-medium text-foreground mb-3 break-words">{detail}</p>
      <p className="text-sm text-foreground/58 leading-relaxed">{note}</p>
    </motion.article>
  );
}

function ContactForm() {
  const [values, setValues] = React.useState<FormValues>(initialValues);
  const [touched, setTouched] = React.useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [submitted, setSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [serverError, setServerError] = React.useState("");

  const errors = React.useMemo(() => validate(values), [values]);
  const hasErrors = Object.keys(errors).length > 0;

  function updateValue<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setServerError("");
  }

  function markTouched(key: keyof FormValues) {
    setTouched((current) => ({ ...current, [key]: true }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(false);
    setTouched({ name: true, email: true, phone: true, subject: true, message: true, method: true, newsletter: true });

    if (hasErrors) {
      setServerError("Please fix the highlighted fields before sending.");
      return;
    }

    setIsLoading(true);
    window.setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      setValues(initialValues);
      setTouched({});
    }, 850);
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, ease: luxuryEase }}
      onSubmit={handleSubmit}
      noValidate
      className="relative overflow-hidden rounded-[2.2rem] bg-card/82 border border-border/50 p-6 md:p-8 shadow-[0_28px_80px_rgb(0,0,0,0.08)]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-secondary/5 dark:from-white/5 pointer-events-none" />
      <div className="relative z-10 space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <TextField label="Full Name" value={values.name} error={touched.name ? errors.name : ""} onChange={(value) => updateValue("name", value)} onBlur={() => markTouched("name")} autoComplete="name" />
          <TextField label="Email" type="email" value={values.email} error={touched.email ? errors.email : ""} onChange={(value) => updateValue("email", value)} onBlur={() => markTouched("email")} autoComplete="email" />
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <TextField label="Phone" type="tel" value={values.phone} error={touched.phone ? errors.phone : ""} onChange={(value) => updateValue("phone", value)} onBlur={() => markTouched("phone")} autoComplete="tel" />
          <TextField label="Subject" value={values.subject} error={touched.subject ? errors.subject : ""} onChange={(value) => updateValue("subject", value)} onBlur={() => markTouched("subject")} />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-bold mb-2">Message</label>
          <textarea
            id="message"
            value={values.message}
            onChange={(event) => updateValue("message", event.target.value)}
            onBlur={() => markTouched("message")}
            rows={6}
            aria-invalid={Boolean(touched.message && errors.message)}
            aria-describedby={touched.message && errors.message ? "message-error" : undefined}
            className={cn("w-full rounded-3xl border bg-background/55 px-5 py-4 outline-none transition-all focus:ring-2 focus:ring-primary resize-none", touched.message && errors.message ? "border-red-400" : "border-border/60")}
            placeholder="Tell us about your order, question, reading mood, or event."
          />
          {touched.message && errors.message && <p id="message-error" className="mt-2 text-sm text-red-500">{errors.message}</p>}
        </div>

        <fieldset className="rounded-3xl border border-border/60 bg-background/35 p-4">
          <legend className="px-2 text-sm font-bold">Preferred Contact Method</legend>
          <div className="grid sm:grid-cols-3 gap-3 pt-2">
            {(["email", "phone", "either"] as const).map((method) => (
              <label key={method} className={cn("flex min-h-12 items-center justify-center rounded-2xl border px-4 text-sm font-medium cursor-pointer transition-all", values.method === method ? "border-primary bg-primary text-primary-foreground shadow-md" : "border-border/60 hover:bg-primary/5")}>
                <input type="radio" name="method" value={method} checked={values.method === method} onChange={() => updateValue("method", method)} className="sr-only" />
                {method === "email" ? "Email" : method === "phone" ? "Phone" : "Either"}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="flex items-start gap-3 rounded-3xl border border-border/60 bg-background/35 p-4 cursor-pointer">
          <input type="checkbox" checked={values.newsletter} onChange={(event) => updateValue("newsletter", event.target.checked)} className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary" />
          <span>
            <span className="block font-bold">Send me the Leaf & Lantern newsletter</span>
            <span className="text-sm text-foreground/58">Monthly recommendations, author notes, and event invitations.</span>
          </span>
        </label>

        <AnimatePresence mode="wait">
          {submitted && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex items-start gap-3 rounded-3xl bg-accent/10 border border-accent/25 p-4 text-accent">
              <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" aria-hidden="true" />
              <p className="font-medium">Message sent. We will reply with care soon.</p>
            </motion.div>
          )}
          {serverError && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex items-start gap-3 rounded-3xl bg-red-500/10 border border-red-500/25 p-4 text-red-500">
              <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" aria-hidden="true" />
              <p className="font-medium">{serverError}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <Button type="submit" size="lg" disabled={isLoading} className="w-full rounded-full group relative overflow-hidden">
          <span className="absolute inset-0 -translate-x-full bg-white/15 group-active:translate-x-0 transition-transform duration-300" />
          <span className="relative z-10 flex items-center">
            {isLoading ? "Sending..." : "Send Message"}
            {!isLoading && <Send aria-hidden="true" className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
          </span>
        </Button>
      </div>
    </motion.form>
  );
}

function TextField({
  label,
  value,
  error,
  onChange,
  onBlur,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  type?: string;
  autoComplete?: string;
}) {
  const id = React.useId();
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-bold mb-2">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn("w-full h-14 rounded-2xl border bg-background/55 px-5 outline-none transition-all focus:ring-2 focus:ring-primary", error ? "border-red-400" : "border-border/60")}
      />
      {error && <p id={errorId} className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "Please enter a valid email address.";
  if (values.phone && !/^[+()\-\s0-9]{7,}$/.test(values.phone)) errors.phone = "Please enter a valid phone number.";
  if (values.subject.trim().length < 3) errors.subject = "Please add a short subject.";
  if (values.message.trim().length < 20) errors.message = "Please write at least 20 characters.";
  return errors;
}


function FaqAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = React.useState(0);

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <motion.div key={faq.question} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, ease: luxuryEase, delay: index * 0.04 }} className="rounded-2xl bg-card/70 border border-border/50 overflow-hidden">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="w-full min-h-16 px-6 py-5 flex items-center justify-between gap-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="font-serif text-xl font-bold">{faq.question}</span>
              <ChevronDown aria-hidden="true" className={cn("w-5 h-5 text-primary shrink-0 transition-transform duration-300", isOpen && "rotate-180")} />
            </button>
            <motion.div initial={false} animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
              <p className="px-6 pb-6 text-foreground/64 leading-relaxed font-light">{faq.answer}</p>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

function Newsletter() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-background">
        <div className="absolute top-0 right-0 w-[560px] h-[560px] bg-secondary/15 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[520px] h-[520px] bg-primary/10 rounded-full blur-[120px] translate-y-1/4 -translate-x-1/4" />
      </div>
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 42 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.85, ease: luxuryEase }} className="glass-panel relative max-w-4xl mx-auto rounded-[2.5rem] p-10 md:p-20 text-center shadow-[0_20px_60px_rgb(0,0,0,0.05)] overflow-hidden">
          <div className="relative z-10">
            <CheckCircle2 className="w-10 h-10 mx-auto mb-7 text-accent" aria-hidden="true" />
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-7 tracking-tight">Join Our Community of Readers</h2>
            <p className="text-foreground/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Get reading recommendations, author notes, and event invitations delivered with restraint.
            </p>
            <form className="flex flex-col sm:flex-row max-w-lg mx-auto gap-3">
              <input type="email" placeholder="Your email address" aria-label="Email address for newsletter" className="flex-1 h-14 px-6 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all" required />
              <Button type="submit" size="lg" className="h-14 px-8 shrink-0 rounded-full">Subscribe</Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
