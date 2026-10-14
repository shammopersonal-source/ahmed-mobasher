import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { ArrowUpRightIcon, FacebookIcon, FiverrIcon, LinkedInIcon, MailIcon, UpworkIcon } from "./icons";

/** Final frame. */
export function Footer() {
  const socials = [
    { label: "LinkedIn", href: site.links.linkedin, icon: <LinkedInIcon width={18} height={18} /> },
    { label: "Facebook", href: site.links.facebook, icon: <FacebookIcon width={18} height={18} /> },
    { label: "Upwork", href: site.links.upwork, icon: <UpworkIcon width={18} height={18} /> },
    { label: "Fiverr", href: site.links.fiverr, icon: <FiverrIcon width={36} height={14} /> },
    { label: "Email", href: `mailto:${site.contact.email}`, icon: <MailIcon width={18} height={18} /> },
  ];

  return (
    <footer className="border-t border-line bg-navy px-5 pt-20 pb-10 pr-[calc(var(--rail-w)+1.25rem)] md:px-16 md:pt-28">
      <p className="display text-center text-gold-light" style={{ "--display-size": "clamp(5rem, 18vw, 15rem)", lineHeight: 0.85 } as CSSProperties} aria-label="Fin">
        FIN
      </p>
      <p className="label mt-6 text-center text-on-dark-faint">
        {site.role} · Freelancing since 2020
      </p>

      <ul className="mt-10 flex flex-wrap justify-center gap-3">
        {socials.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target={s.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-11 min-w-11 items-center justify-center border border-line px-3 text-on-dark-muted hover:border-gold hover:text-ivory"
            >
              {s.icon}
            </a>
          </li>
        ))}
      </ul>

      <div className="label mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-on-dark-faint md:flex-row">
        <span>{site.copyright}</span>
        <a href={site.agency.url} target="_blank" rel="noopener" className="flex items-center gap-1.5 text-gold hover:text-gold-light">
          Founder of {site.agency.name} — Digital Agency
          <ArrowUpRightIcon width={12} height={12} />
        </a>
      </div>
    </footer>
  );
}
