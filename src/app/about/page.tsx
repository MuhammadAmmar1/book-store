"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Globe2,
  Instagram,
  LibraryBig,
  Lightbulb,
  Linkedin,
  Quote,
  Recycle,
  Sparkles,
  Users,
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

const luxuryEase = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: luxuryEase } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
};

const storyChapters = [
  {
    kicker: "A quiet beginning",
    title: "Born from notes in the margins.",
    text: "Leaf & Lantern began as a weekly reading circle in a small back room, where friends traded marked-up paperbacks and stayed long after closing to argue about endings. The shop grew from that same impulse: books should be chosen with care, discussed with warmth, and delivered like a small ceremony.",
    quote: "We wanted an online bookstore that still felt like someone remembered your favorite shelf.",
    image: "https://images.unsplash.com/photo-1526243741027-444d633d7365?q=80&w=1200&auto=format&fit=crop",
  },
  // {
  //   kicker: "Independent by design",
  //   title: "Curated shelves, not endless aisles.",
  //   text: "Instead of chasing every title on earth, we built collections around mood, craft, usefulness, and wonder. Every recommendation is shaped by readers, editors, teachers, and lifelong wanderers who believe a good book can change the weather inside a day.",
  //   quote: "Discovery should feel generous, not overwhelming.",
  //   image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1200&auto=format&fit=crop",
  // },
];

const values = [
  { icon: Lightbulb, title: "Curiosity", desc: "We make room for questions, tangents, and the joy of following a footnote into a new life." },
  { icon: BookOpen, title: "Knowledge", desc: "Our collections favor depth, context, and books that keep speaking after the last page." },
  { icon: Users, title: "Community", desc: "Reading is private, but never lonely. We build spaces where readers can meet and return." },
  { icon: Globe2, title: "Accessibility", desc: "Great books should be easy to discover, fairly priced, and welcoming to every kind of reader." },
  { icon: Award, title: "Quality", desc: "From recommendations to packaging, every detail is edited with care and restraint." },
  { icon: Recycle, title: "Sustainability", desc: "We choose lighter packaging, responsible partners, and slower habits wherever we can." },
];



const team = [
  {
    name: "Mara Ellison",
    role: "Founder & Lead Curator",
    bio: "Builds collections around emotional weather, overlooked classics, and contemporary voices worth amplifying.",
    genre: "Literary Fiction",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Theo Grant",
    role: "Community Editor",
    bio: "Hosts reading salons, writes discussion guides, and keeps the newsletter sounding like a letter from a friend.",
    genre: "Essays",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Nina Hart",
    role: "Operations & Care",
    bio: "Makes sure every parcel arrives cleanly, every question is answered, and every reader feels looked after.",
    genre: "Mystery",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=900&auto=format&fit=crop",
  },
];



export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-hidden">
      <Navbar />

      <main>
        <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
          <EditorialAtmosphere />
          <div className="container mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-[1fr_0.86fr] gap-14 items-center">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl">
              <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.28em] text-primary/80 mb-6">
                The Leaf & Lantern story
              </motion.p>
              <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-7xl lg:text-[5.8rem] font-bold leading-[1.05] tracking-tight mb-8">
                Every Great Story Begins with a Single Page.
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg md:text-xl text-foreground/70 font-light leading-relaxed max-w-2xl mb-10">
                Leaf & Lantern is a warm corner of the internet where readers discover stories, ideas, and inspiration selected with the care of an independent bookstore and the reach of a modern library.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                <Link href="/shop" className="inline-flex">
                  <Button size="lg" className="group w-full sm:w-auto rounded-full shadow-[0_14px_40px_rgb(30,58,95,0.18)]">
                    Explore Collection
                    <ArrowRight aria-hidden="true" className="ml-3 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-500" />
                  </Button>
                </Link>
                <Link href="/contact" className="inline-flex">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full bg-card/50 backdrop-blur-sm">
                    Contact Us
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 36, rotate: 2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.9, ease: luxuryEase, delay: 0.22 }}
              className="relative min-h-[420px] hidden md:block"
              aria-hidden="true"
            >
              <div className="absolute inset-x-8 bottom-0 h-[82%] rounded-[2rem] bg-card/70 border border-border/50 shadow-[0_30px_80px_rgb(0,0,0,0.08)] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1400&auto=format&fit=crop" alt="" className="w-full h-full object-cover opacity-90" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
              </div>
              {[
                "rotate-[-10deg] left-0 top-16 bg-primary",
                "rotate-[8deg] right-2 top-4 bg-secondary",
                "rotate-[14deg] left-20 bottom-16 bg-accent",
              ].map((classes, index) => (
                <motion.div
                  key={classes}
                  animate={{ y: [0, index % 2 ? 18 : -18, 0] }}
                  transition={{ repeat: Infinity, duration: 7 + index, ease: "easeInOut", delay: index * 0.7 }}
                  className={cn("absolute w-28 h-40 rounded-xl shadow-2xl border border-white/30", classes)}
                >
                  <div className="absolute inset-x-5 top-6 h-px bg-white/40" />
                  <div className="absolute inset-x-5 top-12 h-px bg-white/30" />
                  <div className="absolute bottom-5 left-5 right-8 h-8 rounded bg-white/15" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-28">
          <div className="container mx-auto px-6 md:px-12">
            <SectionHeading eyebrow="Our Story" title="A bookstore built like a long conversation." desc="We started small, listened closely, and learned that the best bookstore is not the loudest one. It is the one that knows how to place the right book in the right hands." />
            <div className="space-y-24">
              {storyChapters.map((chapter, index) => (
                <motion.article
                  key={chapter.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-90px" }}
                  variants={staggerContainer}
                  className={cn("grid lg:grid-cols-2 gap-12 items-center", index % 2 && "lg:[&>div:first-child]:order-2")}
                >
                  <motion.div variants={fadeUp} className="relative group overflow-hidden rounded-[2rem] border border-border/50 shadow-xl">
                    <img src={chapter.image} alt={`${chapter.title} at Leaf & Lantern`} className="aspect-[4/3] w-full object-cover transition-transform duration-[1.4s] group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  </motion.div>
                  <motion.div variants={fadeUp} className="lg:px-8">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary/80 mb-4">{chapter.kicker}</p>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-6">{chapter.title}</h2>
                    <p className="text-lg text-foreground/68 leading-relaxed font-light mb-8">{chapter.text}</p>
                    <blockquote className="relative border-l-2 border-secondary pl-6 text-xl font-serif italic text-foreground/80">
                      <Quote aria-hidden="true" className="absolute -left-4 -top-4 w-8 h-8 text-secondary/40 fill-background" />
                      {chapter.quote}
                    </blockquote>
                  </motion.div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* <section className="py-28 bg-card/25 border-y border-border/50">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-6">
              <MissionCard icon={<Sparkles />} title="Mission" text="To help readers find books that sharpen the mind, steady the spirit, and make ordinary days feel more illuminated." />
              <MissionCard icon={<LibraryBig />} title="Vision" text="To become the most trusted independent reading companion for people who want discovery to feel personal, beautiful, and human." />
            </div>
          </div>
        </section> */}

        <section className="py-28">
          <div className="container mx-auto px-6 md:px-12">
            <SectionHeading eyebrow="Core Values" title="The principles tucked inside every parcel." desc="Six quiet standards guide how we choose, recommend, pack, and show up for readers." />
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map(({ icon: Icon, title, desc }) => (
                <ValueCard key={title} icon={<Icon />} title={title} desc={desc} />
              ))}
            </motion.div>
          </div>
        </section>


        <section className="py-28 bg-card/20 border-y border-border/50">
          <div className="container mx-auto px-6 md:px-12">
            <SectionHeading eyebrow="Meet Our Team" title="People who read the fine print." desc="A small team of booksellers, editors, and care specialists keeps the experience personal." />
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-3 gap-7">
              {team.map((member) => (
                <TeamCard key={member.name} {...member} />
              ))}
            </motion.div>
          </div>
        </section>


        {/* <Newsletter /> */}
      </main>

      <Footer />
    </div>
  );
}

function EditorialAtmosphere() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(212,163,115,0.22),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(30,58,95,0.14),transparent_32%),radial-gradient(circle_at_50%_85%,rgba(107,142,110,0.16),transparent_36%)]" />
      <div className="absolute inset-0 opacity-[0.035] dark:opacity-[0.018] bg-[url('/noise.svg')]" />
      {Array.from({ length: 18 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute w-1.5 h-1.5 rounded-full bg-secondary/45"
          style={{ left: `${8 + ((index * 19) % 84)}%`, top: `${10 + ((index * 31) % 76)}%` }}
          animate={{ y: [0, -18, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ repeat: Infinity, duration: 4 + (index % 5), delay: index * 0.16, ease: "easeInOut" }}
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

function MissionCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, ease: luxuryEase }}
      className="group relative overflow-hidden rounded-[2rem] glass-panel p-8 md:p-10 shadow-[0_20px_60px_rgb(0,0,0,0.05)] hover:-translate-y-2 transition-all duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/35 via-transparent to-primary/5 dark:from-white/5" />
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
          {React.cloneElement(icon as React.ReactElement<{ className?: string; "aria-hidden"?: string }>, { className: "w-6 h-6", "aria-hidden": "true" })}
        </div>
        <h3 className="font-serif text-3xl font-bold mb-4">{title}</h3>
        <p className="text-foreground/68 leading-relaxed text-lg font-light">{text}</p>
      </div>
    </motion.article>
  );
}

function ValueCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <motion.article variants={fadeUp} className="group relative overflow-hidden bg-card/65 border border-border/50 rounded-3xl p-7 hover:-translate-y-2 hover:shadow-xl transition-all duration-500">
      <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-primary via-secondary to-accent group-hover:w-full transition-all duration-700" />
      <div className="w-[52px] h-[52px] rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-7 group-hover:scale-110 transition-transform duration-500">
        {React.cloneElement(icon as React.ReactElement<{ className?: string; "aria-hidden"?: string }>, { className: "w-6 h-6", "aria-hidden": "true" })}
      </div>
      <h3 className="font-serif text-2xl font-bold mb-3">{title}</h3>
      <p className="text-foreground/62 leading-relaxed font-light">{desc}</p>
    </motion.article>
  );
}


function TeamCard({ name, role, bio, genre, image }: { name: string; role: string; bio: string; genre: string; image: string }) {
  return (
    <motion.article variants={fadeUp} className="group relative overflow-hidden rounded-[2rem] bg-card/70 border border-border/50 p-4 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">
      <div className="absolute inset-0 rounded-[2rem] border border-transparent group-hover:border-secondary/45 transition-colors duration-500 pointer-events-none" />
      <div className="overflow-hidden rounded-[1.4rem] mb-6">
        <img src={image} alt={`Portrait of ${name}`} className="aspect-[4/5] w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" loading="lazy" />
      </div>
      <div className="px-3 pb-3">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary/75 mb-2">{role}</p>
        <h3 className="font-serif text-2xl font-bold mb-3">{name}</h3>
        <p className="text-foreground/62 leading-relaxed font-light mb-5">{bio}</p>
        <div className="flex items-center justify-between gap-4 border-t border-border/50 pt-5">
          <span className="text-sm text-foreground/60">Favorite: <span className="font-medium text-foreground">{genre}</span></span>
          <div className="flex gap-2">
            <a href="#" aria-label={`${name} on LinkedIn`} className="w-9 h-9 rounded-full border border-border/60 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
              <Linkedin className="w-4 h-4" aria-hidden="true" />
            </a>
            <a href="#" aria-label={`${name} on Instagram`} className="w-9 h-9 rounded-full border border-border/60 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors">
              <Instagram className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}


// function Newsletter() {
//   return (
//     <section className="py-32 relative overflow-hidden">
//       <div className="absolute inset-0 bg-background">
//         <div className="absolute top-0 right-0 w-[560px] h-[560px] bg-secondary/15 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4" />
//         <div className="absolute bottom-0 left-0 w-[520px] h-[520px] bg-primary/10 rounded-full blur-[120px] translate-y-1/4 -translate-x-1/4" />
//       </div>
//       <div className="container mx-auto px-6 md:px-12 relative z-10">
//         <motion.div initial={{ opacity: 0, y: 42 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.85, ease: luxuryEase }} className="glass-panel relative max-w-4xl mx-auto rounded-[2.5rem] p-10 md:p-20 text-center shadow-[0_20px_60px_rgb(0,0,0,0.05)] overflow-hidden">
//           <div className="relative z-10">
//             <CheckCircle2 className="w-10 h-10 mx-auto mb-7 text-accent" aria-hidden="true" />
//             <h2 className="font-serif text-4xl md:text-5xl font-bold mb-7 tracking-tight">Join Our Community of Readers</h2>
//             <p className="text-foreground/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
//               Receive thoughtful recommendations, author notes, and small rituals for making more room to read.
//             </p>
//             <form className="flex flex-col sm:flex-row max-w-lg mx-auto gap-3">
//               <input type="email" placeholder="Your email address" aria-label="Email address for newsletter" className="flex-1 h-14 px-6 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all" required />
//               <Button type="submit" size="lg" className="h-14 px-8 shrink-0 rounded-full">Subscribe</Button>
//             </form>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
