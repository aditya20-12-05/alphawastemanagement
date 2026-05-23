"use client";

import { motion, AnimatePresence } from "motion/react";
import { ReactNode, useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Tailwind class applied to the outer wrapper.
   *  Use this to gate the modal to specific viewport sizes
   *  (e.g. `lg:hidden` so the modal only renders on mobile). */
  wrapperClassName?: string;
  ariaLabel?: string;
}

/**
 * Bottom-sheet style modal for mobile. Slides up from the bottom, fills the
 * width, scrolls internally. ESC + backdrop tap + close button all dismiss.
 * Body scroll is locked while the modal is open.
 */
export default function Modal({
  open,
  onClose,
  children,
  wrapperClassName,
  ariaLabel,
}: ModalProps) {
  // Lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Escape key closes.
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <div className={wrapperClassName}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-forest/45 backdrop-blur-sm flex items-end justify-center"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative w-full max-h-[92vh] bg-paper rounded-t-3xl overflow-y-auto shadow-deep"
              onClick={(e) => e.stopPropagation()}
            >
              {/* drag handle (visual only) */}
              <div className="sticky top-0 z-10 bg-paper/95 backdrop-blur-sm border-b border-line/60">
                <div className="relative py-3 flex items-center justify-center">
                  <span className="block w-12 h-1 rounded-full bg-line" aria-hidden />
                  <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-line bg-paper text-forest grid place-items-center"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M1 1L11 11M11 1L1 11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div>{children}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
