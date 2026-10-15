import { reviews, reviewsIntro } from "@/content/reviews";
import { LockIcon } from "./icons";
import { SectionHead, shell } from "./SectionHead";

export function Reviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="dark bg-navy py-20 text-ivory md:py-28">
      <div className={shell}>
        <SectionHead id="reviews" index="07" label={reviewsIntro.label} title={reviewsIntro.title} dark />
        <ul className="mt-12 grid gap-5 md:mt-16 md:grid-cols-3">
          {reviews.map((r, i) => (
            <li key={r.id}>
              <figure className={`flex h-full flex-col p-6 md:p-8 ${i === 1 ? "bg-gold text-navy" : "border border-line bg-navy-mid"}`}>
                <svg aria-hidden width="36" height="28" viewBox="0 0 36 28" className={i === 1 ? "text-navy" : "text-gold"}>
                  <path fill="currentColor" d="M0 28V16.8C0 7.4 4.6 1.8 13.8 0l1.6 3.6C10.2 5.2 7.6 8.4 7.4 13.2H14V28H0zm20.6 0V16.8C20.6 7.4 25.2 1.8 34.4 0L36 3.6c-5.2 1.6-7.8 4.8-8 9.6h6.6V28h-14z" />
                </svg>
                <blockquote className="mt-6 text-lg leading-relaxed">{r.text}</blockquote>
                <figcaption className={`mt-auto flex flex-col gap-1 border-t pt-5 ${i === 1 ? "border-navy/20" : "border-line"} mt-8`}>
                  <span className="flex items-center gap-2 font-bold">
                    <LockIcon width={14} height={14} /> {r.author}
                  </span>
                  <span className={`mono ${i === 1 ? "text-navy/75" : "text-on-dark-muted"}`}>
                    {r.service} · {r.location}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
