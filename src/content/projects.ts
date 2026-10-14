import type { AssetName } from "./assets.generated";
import { reviews } from "./reviews";

// The media bin. Add a project by appending to this array; the bin, the source monitor
// and the no-JS fallback all read from it. Copy comes from the previous site.
export type Project = {
  id: string;
  /** Clip number shown in the bin. */
  number: string;
  title: string;
  status: "Completed" | "In progress";
  /** The brief, as a short paragraph. */
  brief: string;
  /** What Ahmed did, one line each. */
  did: string[];
  tags: string[];
  client?: { name: string; location?: string; service?: string };
  /** Outcome, in the client's or his own words. */
  result?: string;
  /** Id of a testimonial in reviews.ts, if the client left one. */
  quoteId?: string;
  /** Video for the source monitor. Loaded only when the monitor opens. */
  video?: { src: string; poster?: AssetName };
  /** Stills for the bin's hover scrub and the monitor. Without any, the clip gets a typographic slate. */
  images?: { name: AssetName; alt: string }[];
  /** Shown large at the head of the bin. Defaults to the first project. */
  featured?: boolean;
};

export const workIntro = {
  slate: "Media bin",
  title: "Selected work",
  more: "And more in the pipeline. Enquire to view the full portfolio.",
};

export const projects: Project[] = [
  {
    id: "slide-deck",
    number: "001",
    title: "Slide Deck That Speaks for Itself",
    status: "Completed",
    brief:
      "Transformed a client's raw, unstructured ideas into a polished, visually compelling presentation. Every slide was crafted with purpose — clean layout, consistent visual language, and a narrative flow that made the content impossible to ignore.",
    did: ["Turned unstructured ideas into a narrative flow", "Clean layout on every slide", "One consistent visual language throughout"],
    tags: ["Presentation Design", "PowerPoint", "Visual Storytelling"],
    client: { name: "Confidential Client", location: "United States", service: "Graphic Design" },
    result: "Delivered to full client satisfaction, with a result they described as professional and impactful.",
    quoteId: "note-presentation",
    featured: true,
  },
  {
    id: "ecommerce-ads",
    number: "002",
    title: "AI-Powered E-Commerce Ad Campaign",
    status: "Completed",
    brief:
      "Produced a series of high-converting e-commerce video ads using AI-driven editing techniques. Each ad was engineered to capture attention in the first three seconds, communicate the brand's message with precision, and drive action.",
    did: ["A series of e-commerce video ads", "AI-driven editing", "Built to hold attention in the first three seconds"],
    tags: ["AI Video Editing", "E-Commerce Ads", "Motion Design"],
    client: { name: "Confidential Client", location: "Jacksonville, US", service: "Ecommerce Ads" },
    result: "The client called the results top tier and immediately committed to future collaborations.",
    quoteId: "note-ecommerce",
  },
  {
    id: "florida-commercial",
    number: "003",
    title: "Commercial Ad Edit — Florida Client",
    status: "Completed",
    brief:
      "Delivered a professionally edited commercial video for a client based in Florida. The brief was clear, the execution was precise, and the final cut was everything the client envisioned and more.",
    did: ["Commercial edit from brief to final cut", "Clean transitions and a polished finish", "Fast turnaround"],
    tags: ["Commercial Video", "Video Editing", "Color Grading"],
    client: { name: "Confidential Client", location: "Florida, US", service: "Video Editing" },
    result: "Earned a five-star review and an open invitation to collaborate again.",
    quoteId: "note-video",
  },
];

export const quoteFor = (project: Project) => reviews.find((r) => r.id === project.quoteId);
