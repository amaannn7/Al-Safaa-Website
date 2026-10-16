"use client";

import { useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Site-wide motion, declared with data attributes so pages stay server
 * components:
 *
 *   data-hero-item     hero copy: rises in on load, staggered
 *   data-hero-rise     hero copy that is never hidden (it's usually the LCP
 *                      element): moves into place only
 *   data-hero-media    hero image: settles from a slight zoom
 *   data-horizon       gold rule: draws left to right on scroll
 *   data-reveal        fades and rises once on scroll
 *   data-reveal-group  its direct children reveal in sequence
 *   data-reveal-image  image wrapper: unmasks upward, image settles
 *   data-parallax      image drifts gently while scrolling (desktop only)
 *
 * Scroll reveals animate opacity only (never visibility), so content that
 * hasn't been scrolled to yet stays in the accessibility tree.
 *
 * Motion personality: "Premium" (motion-design skill): one easing family,
 * no overshoot, 0.6 to 1.2s for reveals. Everything is skipped when the visitor
 * prefers reduced motion.
 */
const EASE = "power3.out";

export function ScrollEffects({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(scope);

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduce: "(prefers-reduced-motion: reduce)",
          desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const { motion, desktop } = ctx.conditions as Record<string, boolean>;

          if (!motion) {
            gsap.set(q("[data-hero-item]"), { autoAlpha: 1 });
            return;
          }

          // Hero entrance
          const heroItems = q("[data-hero-item]");
          if (heroItems.length) {
            const tl = gsap.timeline({ defaults: { ease: EASE } });
            tl.fromTo(
              q("[data-hero-media]"),
              { scale: 1.08 },
              { scale: 1, duration: 2.2, ease: "power2.out" },
              0,
            ).fromTo(heroItems, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.11 }, 0.15);
          }
          const rise = q("[data-hero-rise]");
          if (rise.length) gsap.fromTo(rise, { y: 18 }, { y: 0, duration: 1.2, ease: EASE, delay: 0.3 });

          // Horizon rules
          q("[data-horizon]").forEach((el) => {
            gsap.fromTo(
              el,
              { scaleX: 0 },
              { scaleX: 1, duration: 1.4, ease: "power2.inOut", scrollTrigger: { trigger: el, start: "top 92%", once: true } },
            );
          });

          // Single reveals
          q("[data-reveal]").forEach((el) => {
            gsap.from(el, {
              opacity: 0,
              y: 32,
              duration: 0.9,
              ease: EASE,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            });
          });

          // Grouped reveals
          q("[data-reveal-group]").forEach((group) => {
            gsap.from(group.children, {
              opacity: 0,
              y: 28,
              duration: 0.8,
              ease: EASE,
              stagger: 0.09,
              scrollTrigger: { trigger: group, start: "top 86%", once: true },
            });
          });

          // Image unmask
          q("[data-reveal-image]").forEach((el) => {
            const img = el.querySelector("img");
            const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } });
            tl.fromTo(el, { clipPath: "inset(14% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power3.inOut" });
            if (img) tl.fromTo(img, { scale: 1.14 }, { scale: 1, duration: 1.6, ease: "power2.out" }, 0);
          });

          // Gentle parallax
          if (desktop) {
            q("[data-parallax]").forEach((el) => {
              gsap.fromTo(
                el,
                { yPercent: -6 },
                {
                  yPercent: 6,
                  ease: "none",
                  scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: 0.6 },
                },
              );
            });
          }
        },
      );

      // Images and fonts shift layout after first paint.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      document.fonts?.ready.then(refresh);
      return () => {
        window.removeEventListener("load", refresh);
        mm.revert();
      };
    },
    { scope, dependencies: [pathname], revertOnUpdate: true },
  );

  return <div ref={scope}>{children}</div>;
}
