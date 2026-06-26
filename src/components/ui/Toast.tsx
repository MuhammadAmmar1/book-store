"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info, X } from "lucide-react";
import { cn } from "@/utils/cn";

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="w-5 h-5 text-accent" />,
  error: <XCircle className="w-5 h-5 text-red-500" />,
  info: <Info className="w-5 h-5 text-primary" />,
};

const styles: Record<ToastType, string> = {
  success: "border-accent/30 bg-accent/5",
  error: "border-red-300/30 bg-red-50/80 dark:bg-red-950/30",
  info: "border-primary/30 bg-primary/5",
};

function Toast({ toast, onDismiss }: ToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.96 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      role="alert"
      aria-live="assertive"
      className={cn(
        "flex items-start gap-3 w-full max-w-sm px-4 py-3 rounded-2xl border shadow-lg backdrop-blur-md",
        "bg-card/90 dark:bg-card/95",
        styles[toast.type]
      )}
    >
      <span className="shrink-0 mt-0.5">{icons[toast.type]}</span>
      <p className="flex-1 text-sm font-medium text-foreground leading-snug">
        {toast.message}
      </p>
      <button
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="shrink-0 text-foreground/40 hover:text-foreground transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

/* ─── Toast Container ─────────────────────────── */

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div
      aria-label="Notifications"
      className="fixed top-20 right-4 z-[9999] flex flex-col gap-2 w-full max-w-sm pointer-events-none"
    >
      <AnimatePresence mode="sync">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <Toast toast={t} onDismiss={onDismiss} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ─── useToast hook ───────────────────────────── */

export function useToast() {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const addToast = React.useCallback((type: ToastType, message: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, type, message }]);
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, dismiss };
}
