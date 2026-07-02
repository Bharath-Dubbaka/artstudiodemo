"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
  { href: "/#gallery", label: "Gallery" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu automatically whenever the route changes
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 sm:px-8 transition-all duration-500 ${
          scrolled ? "h-16 backdrop-blur-xs" : "h-20 bg-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-2 group">
          <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0">
            <circle
              cx="12"
              cy="12"
              r="9"
              fill="none"
              stroke="#B8763E"
              strokeWidth="1.4"
            />
          </svg>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-paper">
            Ouroboros
          </span>
        </Link>

        <nav className="hidden sm:flex items-center gap-8">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-mono text-xs uppercase tracking-[0.2em] transition-colors ${
                pathname === link.href
                  ? "text-bronze"
                  : "text-paper/80 hover:text-paper"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="sm:hidden flex flex-col gap-1.5 z-50"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
            className="h-px w-6 bg-paper"
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1 }}
            className="h-px w-6 bg-paper"
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
            className="h-px w-6 bg-paper"
          />
        </button>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-8 bg-wall sm:hidden"
          >
            {LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.15 + i * 0.08,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={link.href}
                  className="font-display text-4xl uppercase text-paper"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
