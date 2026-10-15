import { site } from "@/content/site";
import { ContactForm } from "./ContactForm";
import { ClockIcon, FiverrIcon, MailIcon, PhoneIcon, PinIcon, UpworkIcon } from "./icons";
import { SectionHead, shell } from "./SectionHead";

const { contact } = site;

export function Contact() {
  const details = [
    { icon: MailIcon, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: PhoneIcon, label: "Phone", value: contact.phone, href: contact.phoneHref },
    { icon: PinIcon, label: "Location", value: contact.location },
    { icon: ClockIcon, label: "Response time", value: contact.responseTime },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t-2 border-navy py-20 md:py-28">
      <div className={shell}>
        <SectionHead id="contact" index="08" label="Contact" title="Get in touch" />
        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-5">
          <div className="md:col-span-5">
            <p className="text-xl leading-snug text-on-light-muted md:text-2xl">{site.form.intro}</p>
            <dl className="mt-8 border-t-2 border-navy">
              {details.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4 border-b border-line-on-light py-4">
                  <Icon width={20} height={20} className="shrink-0 text-gold-ink" />
                  <dt className="sr-only">{label}</dt>
                  <dd className="text-lg font-bold break-all sm:break-normal">
                    {href ? (
                      <a href={href} className="hover:underline hover:underline-offset-4">
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
              <span className="mono w-full text-on-light-faint">Or hire me on</span>
              <a href={site.links.upwork} target="_blank" rel="noopener noreferrer" className="btn btn-market">
                <UpworkIcon width={20} height={20} /> Upwork
              </a>
              <a href={site.links.fiverr} target="_blank" rel="noopener noreferrer" aria-label="Fiverr" className="btn btn-market">
                <FiverrIcon />
              </a>
            </div>
          </div>
          <div className="border-2 border-navy bg-ivory-warm md:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
