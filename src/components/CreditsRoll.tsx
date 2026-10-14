"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { assets } from "@/content/assets.generated";
import { certificates, type Certificate } from "@/content/certificates";
import { CloseIcon } from "./icons";
import { Picture } from "./Picture";

/**
 * Certificates as end credits. Each credit links to its certificate image, so it still
 * works without JS; with JS it opens in a viewer instead.
 */
export function CreditsRoll() {
  const [open, setOpen] = useState<Certificate | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const select = (cert: Certificate) => (e: MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    setOpen(cert);
  };

  return (
    <>
      <ol className="mx-auto max-w-5xl">
        {certificates.map((cert, i) => (
          <li key={cert.id} className="credit" style={{ "--i": i } as React.CSSProperties}>
            <a
              href={cert.image ? assets[cert.image].webp : `#credit-${cert.id}`}
              onClick={select(cert)}
              aria-haspopup="dialog"
              className="group grid gap-1 py-5 text-center md:grid-cols-[1fr_auto_1fr] md:items-baseline md:gap-8 md:text-left"
            >
              <span className="label text-on-dark-faint md:text-right">
                {cert.kind} · {cert.year}
              </span>
              <span className="hidden h-px w-10 self-center bg-line-strong md:block" aria-hidden />
              <span>
                <span className="heading block text-lg text-on-dark group-hover:text-gold-light md:text-xl">{cert.title}</span>
                <span className="mt-1 block text-on-dark-muted">{cert.issuer}</span>
              </span>
            </a>
          </li>
        ))}
      </ol>

      <dialog
        ref={dialog}
        aria-labelledby="cert-title"
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === dialog.current) setOpen(null);
        }}
        className="m-auto max-h-[calc(100svh-2rem)] w-[min(60rem,calc(100vw-1.5rem))] overflow-y-auto border border-line-strong bg-navy p-0 text-on-dark backdrop:bg-navy/85"
      >
        {open ? (
          <div>
            <div className="label sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-navy px-4 py-3 md:px-6">
              <span className="text-gold">
                {open.kind} · {open.year}
              </span>
              <button type="button" onClick={() => setOpen(null)} className="flex min-h-10 items-center gap-2 px-2 text-on-dark-muted hover:text-ivory" aria-label="Close certificate">
                Close <CloseIcon width={14} height={14} />
              </button>
            </div>
            {open.image ? (
              <div className="border-b border-line bg-navy-mid p-3 md:p-6">
                <Picture name={open.image} alt={`${open.title} certificate`} className="mx-auto h-auto max-h-[60svh] w-auto" />
              </div>
            ) : (
              // No image: a clean typographic card instead of a placeholder.
              <div className="flex aspect-[1.414] flex-col items-center justify-center gap-4 border-b border-line bg-ivory p-8 text-center text-on-light">
                <span className="label text-gold-ink">Certificate</span>
                <span className="heading max-w-[24ch] text-2xl">{open.title}</span>
                <span className="text-on-light-muted">{open.issuer}</span>
              </div>
            )}
            <div className="p-5 md:p-8">
              <h3 id="cert-title" className="heading text-2xl">
                {open.title}
              </h3>
              <p className="mt-1 text-on-dark-muted">{open.issuer}</p>
              <p className="mt-5 leading-relaxed text-on-dark-muted">{open.story}</p>
              <dl className="mt-6 grid gap-x-8 gap-y-3 border-t border-line pt-5 sm:grid-cols-2">
                {open.meta.map((m) => (
                  <div key={m.label}>
                    <dt className="label text-on-dark-faint">{m.label}</dt>
                    <dd className="mt-1">{m.value}</dd>
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
