"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const sections = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const handleScroll = useCallback(() => {
    const offsets = sections
      .map(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return null;
        return { id, top: el.getBoundingClientRect().top };
      })
      .filter(Boolean) as { id: string; top: number }[];

    // Find the section closest to the top of the viewport (with offset for nav)
    const current = offsets.reduce<{ id: string; top: number } | null>(
      (best, item) => {
        if (item.top <= 100 && (!best || item.top > best.top)) return item;
        return best;
      },
      null
    );

    setActiveSection(current?.id ?? "");
  }, []);

  useEffect(() => {
    if (!isHome) return;
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome, handleScroll]);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-heading text-lg font-semibold tracking-tight transition-colors hover:text-muted-foreground"
        >
          leonardo.
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {sections.map(({ id, label }) => {
            const isActive = isHome && activeSection === id;
            if (isHome) {
              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-x-1 -bottom-[1.1rem] h-px bg-primary"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            }
            return (
              <Link
                key={id}
                href={`/#${id}`}
                className="relative rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border/50 md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {sections.map(({ id, label }) => {
                const isActive = isHome && activeSection === id;
                if (isHome) {
                  return (
                    <button
                      key={id}
                      onClick={() => scrollTo(id)}
                      className={`rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {label}
                    </button>
                  );
                }
                return (
                  <Link
                    key={id}
                    href={`/#${id}`}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
