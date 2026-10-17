"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import { WhatsAppIcon, socialIcons } from "@/components/icons";
import { mainNav, site } from "@/config/site";
import { generalEnquiry, telHref, whatsappHref } from "@/lib/contact";
import { cn } from "@/lib/cn";

const mobileNav = [{ href: "/", label: "Home" }, ...mainNav];

/** Two bars that morph into a cross. */
function MenuIcon({ open }: { open: boolean }) {
  const bar = "absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-[top,transform] duration-300 ease-(--ease-premium)";
  return (
    <span aria-hidden className="relative block h-[11px] w-[18px]">
      <span className={cn(bar, open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0")} />
      <span className={cn(bar, open ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-full -translate-y-full")} />
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
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

  // Close if the screen grows to the desktop layout.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Wait a beat: the panel is still invisible (unfocusable) on the very first frame of its fade-in.
    const focusTimer = window.setTimeout(() => panel.current?.querySelector<HTMLElement>("a")?.focus(), 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !header.current) return;
      // Keep keyboard focus inside the header + open menu.
      const items = [...header.current.querySelectorAll<HTMLElement>("a[href], button")].filter(
        (el) => el.getClientRects().length > 0 && !el.closest("[inert]"),
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled && !open;
  const isActive = (href: string) => pathname === href || pathname.startsWith(href) || (href === "/hajj-2027/" && pathname.startsWith("/hajj/"));

  return (
    <header
      ref={header}
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
      {/* Dimmed, blurred page behind the open mobile menu. Tapping it closes the menu. */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 -z-10 bg-ink-950/65 backdrop-blur-md transition-[opacity,visibility] duration-300 lg:hidden",
          // "invisible" (after the fade) means the blur layer isn't rendered at all while the menu is closed.
          open ? "visible opacity-100" : "invisible pointer-events-none opacity-0",
        )}
      />

      <div className={cn("shell relative flex items-center justify-between gap-3 transition-[height] duration-500 sm:gap-6", solid ? "h-[68px]" : "h-[84px]")}>
        <Link href="/" aria-label="Al-Safaa Travels & Tours home page" className="relative z-10 shrink-0">
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
          {/* WhatsApp: a round icon button on phones, a labelled pill from sm up */}
          <a
            href={whatsappHref(generalEnquiry)}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="whatsapp"
            aria-label="Enquire on WhatsApp"
            className="inline-flex h-11 w-11 items-center justify-center gap-2 rounded-full bg-gold-500 text-[0.85rem] font-bold text-ink-950 transition-colors hover:bg-gold-400 sm:w-auto sm:px-5"
          >
            <WhatsAppIcon size={18} />
            <span className="hidden sm:inline">Enquire</span>
          </a>
          <button
            ref={menuButton}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "inline-flex h-11 items-center justify-center gap-2.5 rounded-full px-3.5 text-[0.85rem] font-bold transition-colors duration-300 min-[380px]:min-w-[6.25rem] min-[380px]:gap-3 min-[380px]:px-4 lg:hidden",
              solid
                ? "bg-ink-900 text-white hover:bg-ink-800"
                : "border border-white/30 bg-white/12 text-white backdrop-blur-md hover:bg-white/20",
            )}
          >
            <MenuIcon open={open} />
            <span>{open ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu: a floating panel under the header */}
      <div
        id="mobile-menu"
        ref={panel}
        inert={!open}
        className={cn(
          "on-dark grain absolute inset-x-3 top-[calc(100%+4px)] max-h-[calc(100dvh-100px)] origin-top overflow-y-auto overscroll-contain rounded-[1.75rem] border border-white/12 bg-ink-900 text-white shadow-[0_40px_80px_-30px_rgba(0,0,0,.75)] transition-[opacity,transform,visibility] duration-[350ms] ease-(--ease-premium) lg:hidden",
          open ? "visible translate-y-0 scale-100 opacity-100" : "invisible -translate-y-2 scale-[0.98] opacity-0",
        )}
      >
        <nav aria-label="Mobile" className="p-5 pb-4 [@media(max-height:700px)]:py-3">
          <ul>
            {mobileNav.map((item, i) => {
              const current = pathname === item.href;
              return (
                <li
                  key={item.href}
                  style={{ transitionDelay: open ? `${110 + i * 45}ms` : "0ms" }}
                  className={cn(
                    "border-b border-white/10 transition-[opacity,transform] duration-500 ease-(--ease-premium)",
                    open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                  )}
                >
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className="group flex items-center justify-between py-3.5 text-[1.6rem] leading-none font-medium tracking-tight [@media(max-height:700px)]:py-2.5 transition-colors hover:text-gold-400 aria-[current=page]:text-gold-400"
                  >
                    {item.label}
                    {current ? (
                      <span aria-hidden className="h-2 w-2 rounded-full bg-gold-400" />
                    ) : (
                      <ArrowUpRight
                        size={18}
                        strokeWidth={1.6}
                        aria-hidden
                        className="text-white/30 transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold-400"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div
            style={{ transitionDelay: open ? `${110 + mobileNav.length * 45}ms` : "0ms" }}
            className={cn(
              "mt-5 transition-[opacity,transform] duration-500 ease-(--ease-premium)",
              open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
            )}
          >
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={whatsappHref(generalEnquiry)}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="whatsapp"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold-500 text-[0.9rem] font-bold text-ink-950 transition-colors hover:bg-gold-400"
              >
                <WhatsAppIcon size={17} /> WhatsApp
              </a>
              <a
                href={telHref(site.contact.phones[0].e164)}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/25 text-[0.9rem] font-semibold transition-colors hover:border-white/60"
              >
                <Phone size={16} strokeWidth={1.8} aria-hidden /> Call
              </a>
            </div>
            <p className="mt-3 text-center meta text-mist">{site.contact.phones[0].display}</p>

            <div className="mt-4 flex flex-col gap-3 border-t [@media(max-height:700px)]:mt-3 [@media(max-height:700px)]:pt-3 border-white/10 pt-4 min-[380px]:flex-row min-[380px]:items-center min-[380px]:justify-between min-[380px]:gap-4">
              <p className="meta leading-snug text-mist-dim">
                {site.address.street}, <span className="whitespace-nowrap">{site.address.locality}</span>
              </p>
              <ul className="flex gap-2" aria-label="Social media">
                {site.social.map((s) => {
                  const Icon = socialIcons[s.name];
                  return (
                    <li key={s.name}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Al-Safaa on ${s.name}`}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-gold-400 hover:text-gold-400"
                      >
                        <Icon size={16} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
