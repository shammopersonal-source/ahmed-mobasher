import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { CutSection } from "./CutSection";
import { ExportForm } from "./ExportForm";
import { ClockIcon, FiverrIcon, MailIcon, PhoneIcon, PinIcon, UpworkIcon } from "./icons";
import { SmashCut } from "./SmashCut";

const { contact } = site;

/** Export Settings: the contact form as an export dialog, with direct details beside it. */
export function Contact() {
  const details = [
    { icon: MailIcon, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: PhoneIcon, label: "Phone", value: contact.phone, href: contact.phoneHref },
    { icon: PinIcon, label: "Location", value: contact.location },
    { icon: ClockIcon, label: "Response", value: contact.responseTime },
  ];

  return (
    <CutSection id="contact" transition="smash-cut" labelledBy="contact-title" className="bg-navy px-3 pt-16 pb-20 outline-none md:px-16 md:pt-28 md:pb-28">
      <SmashCut section="contact" />
      {/* Mobile order: heading, form, then direct details. Desktop: heading and details left, form right. */}
      <div data-visuals className="grid gap-10 md:grid-cols-12 md:gap-x-12 md:gap-y-0">
        <div className="px-2 md:col-span-5 md:row-start-1 md:px-0">
          <p className="label text-gold">Export settings · Contact</p>
          <h2 id="contact-title" className="display mt-5" style={{ "--display-size": "clamp(3rem, 7vw, 6rem)" } as CSSProperties}>
            Get in touch
          </h2>
          <p className="mt-6 max-w-[40ch] text-lg leading-snug text-on-dark-muted">{site.form.intro}</p>
        </div>

        <div className="md:col-span-7 md:col-start-6 md:row-span-2 md:row-start-1">
          <div className="border border-line-strong bg-navy-mid">
            <div className="label flex items-center justify-between gap-4 border-b border-line px-5 py-3 text-on-dark-muted md:px-8">
              <span className="text-on-dark">Export settings</span>
              <span className="hidden sm:inline">Output · message to Ahmed</span>
            </div>
            <ExportForm />
          </div>
        </div>

        <div className="px-2 md:col-span-5 md:row-start-2 md:px-0">
          <dl className="border-t border-line md:mt-8">
            {details.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-4 border-b border-line py-3.5">
                <Icon width={18} height={18} className="shrink-0 text-gold" />
                <dt className="sr-only">{label}</dt>
                <dd className="text-on-dark">
                  {href ? (
                    <a href={href} className="underline-offset-4 hover:text-gold-light hover:underline">
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="label w-full text-on-dark-faint sm:w-auto">Or hire through</span>
            <a href={site.links.upwork} target="_blank" rel="noopener noreferrer" className="btn btn-outline-gold min-h-11 px-4">
              <UpworkIcon width={18} height={18} />
              Upwork
            </a>
            <a href={site.links.fiverr} target="_blank" rel="noopener noreferrer" aria-label="Fiverr" className="btn btn-outline-gold min-h-11 px-4">
              <FiverrIcon />
            </a>
          </div>
        </div>
      </div>
    </CutSection>
  );
}
