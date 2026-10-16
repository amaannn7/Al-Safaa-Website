"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { site } from "@/config/site";
import { generalEnquiry, whatsappHref } from "@/lib/contact";
import { cn } from "@/lib/cn";

/**
 * Persistent WhatsApp shortcut. It appears once the visitor has scrolled past
 * the hero (where the hero CTAs already do the job) and stays out of the way
 * of the footer's own contact links.
 */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    let pastHero = false;
    let footerInView = false;
    const update = () => setVisible(pastHero && !footerInView);

    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.6;
      update();
    };
    const io = new IntersectionObserver(([entry]) => {
      footerInView = entry.isIntersecting;
      update();
    });
    if (footer) io.observe(footer);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <a
      href={whatsappHref(generalEnquiry)}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="whatsapp-float"
      aria-label={`Chat with Al-Safaa on WhatsApp, ${site.contact.whatsapp.display}`}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cn(
        "group fixed right-4 bottom-4 z-40 flex h-14 items-center gap-0 overflow-hidden rounded-full bg-whatsapp pr-0 pl-4 text-white shadow-[0_16px_40px_-12px_rgba(6,31,29,.55)] transition-[opacity,transform,gap,padding] duration-500 ease-(--ease-premium) sm:right-6 sm:bottom-6",
        "hover:gap-2.5 hover:pr-5 focus-visible:gap-2.5 focus-visible:pr-5",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <WhatsAppIcon size={24} className="shrink-0" />
      <span className="max-w-0 overflow-hidden text-sm font-bold whitespace-nowrap transition-[max-width] duration-500 ease-(--ease-premium) group-hover:max-w-40 group-focus-visible:max-w-40">
        Chat with us
      </span>
      <span className="w-4 shrink-0 group-hover:w-0 group-focus-visible:w-0" aria-hidden />
    </a>
  );
}
