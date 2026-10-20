import { certificates, certificatesIntro } from "@/content/certificates";
import { CertificateMarquee } from "./CertificateMarquee";
import { SectionHead, shell } from "./SectionHead";

export function Certificates() {
  return (
    <section id="certificates" aria-labelledby="certificates-title" className="dark overflow-hidden bg-navy py-20 text-ivory md:py-28">
      <div className={shell}>
        <SectionHead
          id="certificates"
          index="06"
          label={`${certificatesIntro.label} · ${String(certificates.length).padStart(2, "0")}`}
          title={certificatesIntro.title}
          dark
          aside={<p className="text-lg text-on-dark-muted">{certificatesIntro.hint}</p>}
        />
      </div>
      <div className="mt-12 md:mt-16">
        <CertificateMarquee />
      </div>
    </section>
  );
}
