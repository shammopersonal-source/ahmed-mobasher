"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { assets, type AssetName } from "@/content/assets.generated";
import { certificates, type Certificate } from "@/content/certificates";
import { CloseIcon } from "./icons";
import { Picture } from "./Picture";

function Card({ cert, onOpen, hidden }: { cert: Certificate; onOpen: (c: Certificate) => (e: MouseEvent) => void; hidden?: boolean }) {
  return (
    <li className="w-72 shrink-0 md:w-80" aria-hidden={hidden}>
      <a
        href={cert.image ? assets[cert.image].webp : `#cert-${cert.id}`}
        onClick={onOpen(cert)}
        tabIndex={hidden ? -1 : undefined}
        aria-haspopup="dialog"
        className="group flex h-full flex-col border-2 border-navy bg-ivory text-navy transition-transform hover:-translate-y-1"
      >
        <span className="block aspect-[1.41] overflow-hidden border-b-2 border-navy bg-ivory-deep">
          {cert.image ? (
            <Picture name={`${cert.image}-thumb` as AssetName} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full flex-col items-center justify-center gap-2 p-5 text-center">
              <span className="mono text-gold-ink">Certificate</span>
              <span className="font-bold">{cert.title}</span>
            </span>
          )}
        </span>
        <span className="flex flex-1 flex-col p-4">
          <span className="mono text-gold-ink">
            {cert.kind} · {cert.year}
          </span>
          <span className="mt-2 text-lg leading-tight font-bold tracking-[-0.01em]">{cert.title}</span>
          <span className="mt-1 text-on-light-muted">{cert.issuer}</span>
          <span className="mono mt-auto pt-4 text-on-light-faint group-hover:text-navy">Click to view details</span>
        </span>
      </a>
    </li>
  );
}

/**
 * Certificates as on the previous site: an endless auto-scrolling strip of cards
 * (paused on hover/focus), each opening a detail view. With reduced motion or no JS the
 * strip scrolls by hand instead.
 */
export function CertificateMarquee() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<Certificate | null>(null);

  useEffect(() => {
    const d = dialog.current!;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const onOpen = (cert: Certificate) => (e: MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    setOpen(cert);
  };

  return (
    <>
      <div className="marquee py-2">
        <ul className="marquee-track px-5 md:px-10">
          {certificates.map((c) => (
            <Card key={c.id} cert={c} onOpen={onOpen} />
          ))}
          {/* Second copy makes the loop seamless; hidden from assistive tech and keyboard. */}
          {certificates.map((c) => (
            <Card key={`${c.id}-loop`} cert={c} onOpen={onOpen} hidden />
          ))}
        </ul>
      </div>

      <dialog
        ref={dialog}
        aria-labelledby="cert-title"
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === dialog.current) setOpen(null);
        }}
        className="m-auto max-h-[calc(100svh-2rem)] w-[min(56rem,calc(100vw-1.5rem))] overflow-y-auto border-2 border-navy bg-ivory p-0 text-navy"
      >
        {open ? (
          <div>
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line-on-light bg-ivory px-5 py-2">
              <span className="mono text-gold-ink">
                {open.kind} · {open.year}
              </span>
              <button type="button" onClick={() => setOpen(null)} className="flex min-h-11 items-center gap-2 font-bold" aria-label="Close certificate">
                Close <CloseIcon width={16} height={16} />
              </button>
            </div>
            {open.image ? (
              <div className="bg-ivory-deep p-3 md:p-6">
                <Picture name={open.image} alt={`${open.title} certificate`} className="mx-auto h-auto max-h-[58svh] w-auto" />
              </div>
            ) : null}
            <div className="p-5 md:p-8">
              <h3 id="cert-title" className="text-3xl leading-[1] font-extrabold tracking-[-0.03em]">
                {open.title}
              </h3>
              <p className="mt-2 text-lg text-on-light-muted">{open.issuer}</p>
              <p className="mt-5 leading-relaxed text-on-light-muted">{open.story}</p>
              <dl className="mt-6 grid gap-x-8 gap-y-4 border-t-2 border-navy pt-5 sm:grid-cols-2">
                {open.meta.map((m) => (
                  <div key={m.label}>
                    <dt className="mono text-on-light-faint">{m.label}</dt>
                    <dd className="mt-1 font-bold">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
