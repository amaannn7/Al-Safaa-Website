"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { WhatsAppIcon } from "@/components/icons";
import { mainNav, site } from "@/config/site";
import { generalEnquiry, telHref, whatsappHref } from "@/lib/contact";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on navigation (adjusting state during render, per React docs).
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled && !open;
  const isActive = (href: string) => pathname === href || pathname.startsWith(href) || (href === "/hajj/" && pathname === "/hajj-2027/");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,height] duration-500 ease-(--ease-premium)",
        solid ? "bg-sand-50 shadow-[0_1px_0_rgba(8,40,38,.08),0_12px_32px_-24px_rgba(8,40,38,.45)]" : "bg-transparent",
      )}
    >
      {/* Legibility scrim behind the transparent header */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink-950/55 to-transparent transition-opacity duration-500",
          solid || open ? "opacity-0" : "opacity-100",
        )}
      />
      <div className={cn("shell relative flex items-center justify-between gap-6 transition-[height] duration-500", solid ? "h-[68px]" : "h-[84px]")}>
        <Link href="/" aria-label="Al-Safaa Travels & Tours — home" className="relative z-10 shrink-0">
          <span className={cn("block transition-opacity duration-300", solid ? "opacity-0" : "opacity-100")}>
            <Logo reversed priority />
          </span>
          <span className={cn("absolute inset-0 block transition-opacity duration-300", solid ? "opacity-100" : "opacity-0")}>
            <Logo />
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[0.875rem] font-semibold transition-colors duration-300",
                    solid ? "text-ink-900 hover:text-gold-700" : "text-white/90 hover:text-white",
                    "after:absolute after:inset-x-3.5 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-gold-500 after:transition-transform after:duration-500 hover:after:scale-x-100 aria-[current=page]:after:scale-x-100",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative z-10 flex items-center gap-2">
          <a
            href={telHref(site.contact.phones[0].e164)}
            className={cn(
              "hidden h-11 items-center gap-2 rounded-full px-3 text-[0.85rem] font-semibold transition-colors md:inline-flex",
              solid ? "text-ink-900 hover:text-gold-700" : "text-white/90 hover:text-white",
            )}
          >
            <Phone size={15} strokeWidth={1.8} aria-hidden />
            <span className="hidden xl:inline">{site.contact.phones[0].display}</span>
            <span className="xl:hidden">Call</span>
          </a>
          <a
            href={whatsappHref(generalEnquiry)}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="whatsapp"
            className="hidden h-11 items-center gap-2 rounded-full bg-gold-500 px-5 text-[0.85rem] font-bold text-ink-950 transition-colors hover:bg-gold-400 sm:inline-flex"
          >
            <WhatsAppIcon size={16} />
            Enquire
          </a>
          <button
            ref={menuButton}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:hidden",
              solid ? "border-ink-900/15 text-ink-900" : "border-white/30 text-white",
            )}
          >
            {open ? <X size={20} strokeWidth={1.6} /> : <Menu size={20} strokeWidth={1.6} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={panel}
        hidden={!open}
        className="on-dark grain fixed inset-0 -z-0 overflow-y-auto bg-ink-950 pt-[84px] text-white lg:hidden"
      >
        <nav aria-label="Mobile" className="shell flex min-h-full flex-col pb-10">
          <ul className="mt-6 border-t border-white/10">
            {[{ href: "/", label: "Home" }, ...mainNav, { href: "/resources/", label: "Resources" }].map((item, i) => (
              <li key={item.href} className="border-b border-white/10">
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="flex items-baseline justify-between py-4 font-display text-[2rem] leading-none transition-colors hover:text-gold-400 aria-[current=page]:text-gold-400"
                >
                  {item.label}
                  <span className="font-sans text-xs tracking-[0.2em] text-white/40">{String(i + 1).padStart(2, "0")}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto grid gap-3 pt-10">
            <a
              href={whatsappHref(generalEnquiry)}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="whatsapp"
              className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-gold-500 font-bold text-ink-950"
            >
              <WhatsAppIcon size={18} /> WhatsApp {site.contact.whatsapp.display}
            </a>
            <a
              href={telHref(site.contact.phones[0].e164)}
              className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full border border-white/25 font-semibold"
            >
              <Phone size={17} strokeWidth={1.8} aria-hidden /> Call {site.contact.phones[0].display}
            </a>
            <p className="mt-4 text-center text-sm text-mist-dim">
              {site.address.street}, {site.address.locality}
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
}
