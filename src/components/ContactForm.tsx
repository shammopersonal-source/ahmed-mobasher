"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { CheckIcon } from "./icons";

type Status = { state: "idle" } | { state: "sending" } | { state: "sent" } | { state: "error"; message: string };

const field = "mt-2 w-full border-2 border-navy/20 bg-ivory px-4 py-3.5 text-lg text-navy placeholder:text-on-light-faint focus:border-navy focus:outline-none";

/**
 * Posts to /api/contact. Without JS the browser submits the same form normally and the
 * route answers with a page. Links with data-format (the service buttons) preselect the
 * service.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const form = useRef<HTMLFormElement>(null);
  const started = useRef(0);

  useEffect(() => {
    started.current = Date.now();
    const pick = (e: globalThis.MouseEvent) => {
      const link = (e.target as Element).closest<HTMLElement>("[data-format]");
      const select = form.current?.elements.namedItem("format") as HTMLSelectElement | null;
      if (link && select) select.value = link.dataset.format!;
    };
    document.addEventListener("click", pick);
    return () => document.removeEventListener("click", pick);
  }, []);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, elapsed: Date.now() - started.current }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error ?? "Something went wrong while sending.");
      setStatus({ state: "sent" });
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : "Something went wrong while sending." });
    }
  };

  if (status.state === "sent") {
    return (
      <div className="flex min-h-[30rem] flex-col items-start justify-center gap-5 p-6 md:p-10" role="status">
        <span className="flex h-14 w-14 items-center justify-center bg-gold">
          <CheckIcon width={26} height={26} />
        </span>
        <h3 className="text-4xl font-extrabold tracking-[-0.035em]">Message received.</h3>
        <p className="max-w-[42ch] text-lg leading-relaxed text-on-light-muted">{site.form.delivered}</p>
        <p className="mono text-on-light-faint">{site.contact.responseTime}</p>
        <button
          type="button"
          onClick={() => {
            form.current?.reset();
            setStatus({ state: "idle" });
          }}
          className="btn btn-outline mt-2"
        >
          Send another
        </button>
      </div>
    );
  }

  const sending = status.state === "sending";

  return (
    <form ref={form} action="/api/contact" method="post" onSubmit={submit} className="p-6 md:p-10">
      <fieldset disabled={sending} className="grid gap-6 sm:grid-cols-2">
        <legend className="sr-only">Your message</legend>
        <label className="block">
          <span className="mono text-on-light-muted">Your name</span>
          <input name="name" required maxLength={100} autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className="mono text-on-light-muted">Email address</span>
          <input name="email" type="email" required maxLength={200} autoComplete="email" className={field} />
        </label>
        <label className="block sm:col-span-2">
          <span className="mono text-on-light-muted">Service needed</span>
          <select name="format" required defaultValue="" className={field}>
            <option value="" disabled>
              Select a service
            </option>
            {site.form.formats.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="mono text-on-light-muted">Message</span>
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

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="mono text-on-light-faint" aria-live="polite">
          {sending ? "Sending…" : site.contact.responseTime}
        </p>
        <button type="submit" className="btn btn-navy notch" disabled={sending}>
          {sending ? "Sending…" : "Send message"}
        </button>
      </div>
      {status.state === "error" ? (
        <p role="alert" className="mt-5 border-2 border-gold-dark bg-ivory px-4 py-3">
          {status.message} You can also email{" "}
          <a href={`mailto:${site.contact.email}`} className="font-bold underline underline-offset-4">
            {site.contact.email}
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
