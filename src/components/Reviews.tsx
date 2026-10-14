import type { CSSProperties } from "react";
import { reviews, reviewsIntro } from "@/content/reviews";
import { ClientNotes } from "./ClientNotes";
import { CutSection } from "./CutSection";

/** Client Notes: testimonials pinned at timecodes, Frame.io style. */
export function Reviews() {
  return (
    <CutSection id="reviews" transition="cross-dissolve" labelledBy="reviews-title" className="relative bg-navy px-3 pt-16 pb-20 outline-none md:px-16 md:pt-28 md:pb-32">
      <header className="px-2 md:px-0">
        <p className="label text-gold">
          {reviewsIntro.slate} · {reviews.length} notes
        </p>
        <h2 id="reviews-title" className="display mt-5" style={{ "--display-size": "clamp(3rem, 8vw, 7rem)" } as CSSProperties}>
          {reviewsIntro.title}
        </h2>
      </header>
      <div data-visuals className="mt-10 md:mt-14">
        <ClientNotes />
      </div>
    </CutSection>
  );
}
