"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { cn } from "@/lib/cn";
import { practices } from "@/content/practices";

const PRIMARY = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/expertise", label: "Expertise", hasMega: true },
  { href: "/people", label: "People" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300",
        scrolled || megaOpen
          ? "bg-[color:var(--color-paper)]/85 backdrop-blur-md border-b border-[color:var(--color-ink)]/10"
          : "bg-transparent",
      )}
      onMouseLeave={() => setMegaOpen(false)}
    >
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          aria-label="Theotis Mutemi Legal Practitioners — Home"
          className="group flex items-baseline gap-3"
        >
          <span className="font-display text-2xl font-medium leading-none tracking-tight md:text-[1.65rem]">
            TMLP
          </span>
          <span className="hidden font-mono text-[0.625rem] uppercase tracking-[0.18em] text-[color:var(--color-mute)] md:inline">
            Theotis Mutemi Legal Practitioners
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {PRIMARY.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const isExpertise = "hasMega" in item && item.hasMega;
            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => isExpertise && setMegaOpen(true)}
              >
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  aria-haspopup={isExpertise ? "true" : undefined}
                  aria-expanded={isExpertise ? megaOpen : undefined}
                  className={cn(
                    "font-mono text-xs uppercase tracking-[0.18em] transition-colors",
                    "text-[color:var(--color-ink)]/80 hover:text-[color:var(--color-ink)]",
                    isActive && "text-[color:var(--color-ink)]",
                  )}
                >
                  <span className="gold-underline pb-1">{item.label}</span>
                </Link>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-ink)] lg:inline"
          >
            <span className="gold-underline pb-1">Engage counsel →</span>
          </Link>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center lg:hidden"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {megaOpen && (
          <motion.div
            key="mega"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="hidden border-t border-[color:var(--color-ink)]/10 bg-[color:var(--color-paper)] lg:block"
          >
            <Container className="grid grid-cols-12 gap-8 py-12">
              <div className="col-span-3">
                <p className="label-mono text-[color:var(--color-mute)]">
                  Expertise
                </p>
                <p className="mt-3 font-display text-2xl leading-tight">
                  Three departments,
                  <br />
                  thirteen specialised units.
                </p>
                <ArrowLink href="/expertise" className="mt-6">
                  All practice areas
                </ArrowLink>
              </div>
              {practices.map((p) => (
                <div key={p.slug} className="col-span-3">
                  <Link
                    href={`/expertise/${p.slug}`}
                    className="group block hairline-bottom pb-3"
                  >
                    <span className="font-mono text-xs text-[color:var(--color-gold)]">
                      {p.number}
                    </span>
                    <p className="mt-1 font-display text-lg leading-tight">
                      <span className="gold-underline pb-0.5">{p.title}</span>
                    </p>
                  </Link>
                  <ul className="mt-4 space-y-2">
                    {p.subAreas.slice(0, 6).map((s) => (
                      <li key={s.title}>
                        <Link
                          href={`/expertise/${p.slug}#${s.numeral.toLowerCase()}`}
                          className="text-sm text-[color:var(--color-mute)] hover:text-[color:var(--color-ink)]"
                        >
                          {s.title.replace(/ — .*/, "")}
                        </Link>
                      </li>
                    ))}
                    {p.subAreas.length > 6 && (
                      <li>
                        <Link
                          href={`/expertise/${p.slug}`}
                          className="text-sm font-mono uppercase tracking-[0.18em] text-[color:var(--color-gold-deep)]"
                        >
                          + {p.subAreas.length - 6} more
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-16 z-40 bg-[color:var(--color-paper)] lg:hidden"
          >
            <Container className="flex h-full flex-col gap-8 py-10">
              <nav aria-label="Mobile primary">
                <ul className="space-y-5">
                  {PRIMARY.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="font-display text-3xl leading-none"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="hairline pt-6">
                <p className="label-mono text-[color:var(--color-mute)]">
                  Practice areas
                </p>
                <ul className="mt-3 space-y-2">
                  {practices.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/expertise/${p.slug}`}
                        className="text-base text-[color:var(--color-ink)]"
                      >
                        <span className="font-mono text-xs text-[color:var(--color-gold)] mr-2">
                          {p.number}
                        </span>
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
