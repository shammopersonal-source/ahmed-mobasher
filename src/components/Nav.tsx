"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/content/nav";
import { site } from "@/content/site";
import { ArrowUpRightIcon, CloseIcon, MenuIcon } from "./icons";


export function Nav() {
  const menu = useRef<HTMLDetailsElement>(null);
  const close = () => menu.current?.removeAttribute("open");
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    // Past the hero: the header turns translucent and tightens (CSS: .site-header).
    const hero = document.getElementById("top");
    const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) * 16 || 72;
    const heroIO = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting), { rootMargin: `-${navH}px 0px 0px 0px` });
    if (hero) heroIO.observe(hero);

    // Active section: whichever one crosses the band just above the middle of the screen.
    const sections = navLinks.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
    const visible = new Set<string>();
    const sectionIO = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id);
        const current = navLinks.find((l) => visible.has(l.href.slice(1)));
        setActive(current ? current.href : null);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => sectionIO.observe(s));
    return () => {
      heroIO.disconnect();
      sectionIO.disconnect();
    };
  }, []);

  return (
    <header className="site-header sticky top-0 z-50" data-scrolled={scrolled || undefined}>
      <nav aria-label="Main" className="mx-auto flex h-[var(--nav-h)] max-w-[90rem] items-center justify-between gap-6 px-5 md:px-10">
        <a href="#top" className="text-lg font-extrabold tracking-[-0.02em] sm:text-xl">
          ahmed<span className="text-gold-ink">/</span>mobasher
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                aria-current={active === l.href ? "true" : undefined}
                className="u-draw block px-3 py-2 text-[0.9375rem] [--u-bottom:4px] [--u-inset:0.75rem]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#contact" className="btn btn-navy notch min-h-11 px-4 text-base whitespace-nowrap md:px-5">
            Hire me <ArrowUpRightIcon width={14} height={14} />
          </a>
          {/* Mobile menu: <details> so it also works without JS. */}
          <details ref={menu} className="group lg:hidden">
            <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center border-2 border-navy [&::-webkit-details-marker]:hidden" aria-label="Menu">
              <MenuIcon width={20} height={20} className="group-open:hidden" />
              <CloseIcon width={20} height={20} className="hidden group-open:block" />
            </summary>
            <ul className="absolute inset-x-0 top-[var(--nav-h)] h-[calc(100svh-var(--nav-h))] overflow-y-auto bg-ivory-warm px-5 pb-6">
              {navLinks.map((l) => (
                <li key={l.href} className="border-b border-line-on-light">
                  <a
                    href={l.href}
                    onClick={close}
                    aria-current={active === l.href ? "true" : undefined}
                    className="flex items-center justify-between py-4 text-2xl font-bold tracking-[-0.02em] aria-[current]:text-gold-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="flex gap-3 pt-5">
                <a href={site.links.upwork} target="_blank" rel="noopener noreferrer" className="btn btn-market flex-1">
                  Upwork
                </a>
                <a href={site.links.fiverr} target="_blank" rel="noopener noreferrer" className="btn btn-market flex-1">
                  Fiverr
                </a>
              </li>
            </ul>
          </details>
        </div>
      </nav>
    </header>
  );
}
