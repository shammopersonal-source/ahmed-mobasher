"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { CheckIcon } from "./icons";

type Status = { state: "idle" } | { state: "rendering" } | { state: "delivered" } | { state: "error"; message: string };

const field = "mt-2 w-full border border-line bg-navy px-3 py-3 text-on-dark placeholder:text-on-dark-faint focus:border-gold";

/**
 * The contact form as an export dialog. Posts to /api/contact; without JS the browser
 * submits the same form normally and the route answers with a page.
 */
export function ExportForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [progress, setProgress] = useState(0);
  const started = useRef(0);
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    started.current = Date.now();
  }, []);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setStatus({ state: "rendering" });
    setProgress(0);
    requestAnimationFrame(() => setProgress(85));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, elapsed: Date.now() - started.current }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error ?? "Something went wrong while sending.");
      setProgress(100);
      setTimeout(() => setStatus({ state: "delivered" }), 450);
    } catch (err) {
      setProgress(0);
      setStatus({ state: "error", message: err instanceof Error ? err.message : "Something went wrong while sending." });
    }
  };

  if (status.state === "delivered") {
    return (
      <div className="flex min-h-[28rem] flex-col items-start justify-center gap-5 p-6 md:p-10" role="status">
        <span className="flex h-12 w-12 items-center justify-center border border-gold text-gold">
          <CheckIcon width={22} height={22} />
        </span>
        <p className="label text-gold">Export complete · Delivered</p>
        <h3 className="heading text-3xl">Message delivered.</h3>
        <p className="max-w-[44ch] text-lg leading-snug text-on-dark-muted">{site.form.delivered}</p>
        <p className="label text-on-dark-faint">{site.contact.responseTime}</p>
        <button
          type="button"
          onClick={() => {
            form.current?.reset();
            setStatus({ state: "idle" });
          }}
          className="btn btn-ghost mt-2"
        >
          Send another
        </button>
      </div>
    );
  }

  const rendering = status.state === "rendering";

  return (
    <form ref={form} action="/api/contact" method="post" onSubmit={submit} className="p-5 md:p-8" noValidate={false}>
      <fieldset disabled={rendering} className="grid gap-5 sm:grid-cols-2">
        <legend className="sr-only">Your message</legend>
        <label className="block">
          <span className="label text-on-dark-muted">Name</span>
          <input name="name" required maxLength={100} autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className="label text-on-dark-muted">Email</span>
          <input name="email" type="email" required maxLength={200} autoComplete="email" className={field} />
        </label>
        <label className="block sm:col-span-2">
          <span className="label text-on-dark-muted">Format · service needed</span>
          <select name="format" required defaultValue="" className={`${field} appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat`}>
            <option value="" disabled>
              Choose a format
            </option>
            {site.form.formats.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="label text-on-dark-muted">Notes · your message</span>
          <textarea name="message" required minLength={10} maxLength={5000} rows={6} className={`${field} resize-y`} />
        </label>
        {/* Honeypot: hidden from people, irresistible to bots. */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Company
            <input name="company" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
      </fieldset>

      <div className="mt-6">
        <div className="h-1.5 bg-navy-light" role="progressbar" aria-label="Export progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
          <div className="export-bar h-full origin-left bg-gold" style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="label text-on-dark-faint" aria-live="polite">
            {rendering ? "Rendering · sending your message" : status.state === "error" ? "" : site.contact.responseTime}
          </p>
          <button type="submit" className="btn btn-primary" disabled={rendering}>
            {rendering ? "Rendering…" : "Render & Send"}
          </button>
        </div>
        {status.state === "error" ? (
          <p role="alert" className="mt-4 border border-gold px-4 py-3 text-on-dark">
            {status.message} You can also email{" "}
            <a href={`mailto:${site.contact.email}`} className="text-gold-light underline underline-offset-4">
              {site.contact.email}
            </a>
            .
          </p>
        ) : null}
      </div>
    </form>
  );
}
