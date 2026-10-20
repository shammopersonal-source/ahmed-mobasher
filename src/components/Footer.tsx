import { site } from "@/content/site";
import { navLinks } from "@/content/nav";
import { ArrowUpRightIcon, FacebookIcon, FiverrIcon, LinkedInIcon, MailIcon, UpworkIcon } from "./icons";

export function Footer() {
  const socials = [
    { label: "LinkedIn", href: site.links.linkedin, icon: <LinkedInIcon width={20} height={20} /> },
    { label: "Facebook", href: site.links.facebook, icon: <FacebookIcon width={20} height={20} /> },
    { label: "Upwork", href: site.links.upwork, icon: <UpworkIcon width={20} height={20} /> },
    { label: "Fiverr", href: site.links.fiverr, icon: <FiverrIcon width={38} height={14} /> },
    { label: "Email", href: `mailto:${site.contact.email}`, icon: <MailIcon width={20} height={20} /> },
  ];

  return (
    <footer className="dark bg-navy text-ivory">
      <div className="mx-auto max-w-[90rem] px-5 pt-16 pb-10 md:px-10 md:pt-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          <div className="sm:col-span-2 lg:col-span-6">
            <p className="h-display text-[clamp(3rem,8vw,6.5rem)]">
              Let&apos;s build
              <br />
              <span className="text-gold-light">something.</span>
            </p>
            <a href="#contact" className="btn btn-gold notch mt-8">
              Start a project <ArrowUpRightIcon width={14} height={14} />
            </a>
          </div>
          <nav aria-label="Footer" className="lg:col-span-3 lg:col-start-8">
            <p className="mono text-gold">Sections</p>
            <ul className="mt-4 space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-lg text-on-dark-muted hover:text-ivory">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-2">
            <p className="mono text-gold">Elsewhere</p>
            <ul className="mt-4 flex flex-wrap gap-2">
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
          </div>
        </div>

        <div className="mono mt-16 flex flex-col justify-between gap-4 border-t border-line pt-6 text-on-dark-faint md:flex-row">
          <span>{site.copyright}</span>
          <a href={site.agency.url} target="_blank" rel="noopener" className="flex items-center gap-1.5 text-gold hover:text-gold-light">
            Founder of {site.agency.name} — Digital Agency <ArrowUpRightIcon width={12} height={12} />
          </a>
        </div>
      </div>
    </footer>
  );
}
