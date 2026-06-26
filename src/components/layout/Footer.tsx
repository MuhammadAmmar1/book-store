import * as React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background pt-20 pb-10 mt-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="flex flex-col mb-6">
              <span className="font-serif text-3xl font-bold tracking-wide">
                Leaf & Lantern
              </span>
              <span className="text-xs uppercase tracking-widest text-background/60">
                Premium Bookstore
              </span>
            </Link>
            <p className="text-background/70 leading-relaxed max-w-sm mb-8">
              Discover carefully curated collections of stories that inspire
              imagination, creativity, and lifelong learning in a warm, welcoming space.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-background/70">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/shop" className="hover:text-primary transition-colors">Shop</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Journal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold mb-6">Categories</h4>
            <ul className="space-y-4 text-sm text-background/70">
              <li><Link href="/shop?category=fiction" className="hover:text-primary transition-colors">Fiction</Link></li>
              <li><Link href="/shop?category=non-fiction" className="hover:text-primary transition-colors">Non-Fiction</Link></li>
              <li><Link href="/shop?category=business" className="hover:text-primary transition-colors">Business</Link></li>
              <li><Link href="/shop?category=programming" className="hover:text-primary transition-colors">Programming</Link></li>
              <li><Link href="/shop?category=poetry" className="hover:text-primary transition-colors">Poetry</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-background/70">
              <li><Link href="/track" className="hover:text-primary transition-colors">Track Order</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center text-sm text-background/50">
          <p>&copy; {new Date().getFullYear()} Leaf & Lantern. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span>Crafted with care.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
