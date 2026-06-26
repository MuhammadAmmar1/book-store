"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Book } from "@/data/mockProducts";

export interface CartItem extends Book {
  quantity: number;
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: Book[];
  isCartOpen: boolean;
  isSearchOpen: boolean;
  addToCart: (book: Book, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (book: Book) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  setIsSearchOpen: (isOpen: boolean) => void;
  cartTotal: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const getSavedItems = <T,>(key: string): T[] => {
  if (typeof window === "undefined") return [];

  try {
    const savedItems = localStorage.getItem(key);
    return savedItems ? JSON.parse(savedItems) : [];
  } catch (e) {
    console.error(`Failed to load ${key}`, e);
    return [];
  }
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => getSavedItems<CartItem>("leafAndLanternCart"));
  const [wishlist, setWishlist] = useState<Book[]>(() => getSavedItems<Book>("leafAndLanternWishlist"));
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem("leafAndLanternCart", JSON.stringify(cart));
    localStorage.setItem("leafAndLanternWishlist", JSON.stringify(wishlist));
  }, [cart, wishlist]);

  const addToCart = (book: Book, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...book, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return removeFromCart(id);
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setIsCartOpen(false);
  };

  const toggleWishlist = (book: Book) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === book.id);
      if (exists) return prev.filter((item) => item.id !== book.id);
      return [...prev, book];
    });
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        isSearchOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        setIsCartOpen,
        setIsSearchOpen,
        cartTotal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
