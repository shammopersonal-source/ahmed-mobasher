import type { TrackId } from "./sections";

// "Effects Inspector": each discipline is an effect. Content comes from the previous
// site's Skills and Services sections (percentages dropped) and the project write-ups.
// Rule: a parameter never just repeats something already listed under tools.
export type EffectId = "video" | "design" | "development" | "robotics";

export type Effect = {
  id: EffectId;
  number: string;
  name: string;
  track: TrackId;
  /** Flag shown beside the name, the way editors mark experimental effects. */
  tag?: string;
  /** What switching the effect on does to the preview frame. */
  preview: string;
  tools: string[];
  /** Add rows freely; the panel renders however many there are. */
  params: { name: string; value: string }[];
  intent: string;
};

export const craft = {
  slate: "Effects inspector",
  title: "Skills and craft",
  hint: "Switch an effect on or off to see what it does to the frame.",
};

export const effects: Effect[] = [
  {
    id: "video",
    number: "01",
    name: "Video",
    track: "V1",
    preview: "Color-grades the frame",
    tools: ["Premiere Pro"],
    params: [
      { name: "Editing", value: "Raw footage to cinematic storytelling" },
      { name: "Formats", value: "Brand films, YouTube content, documentary shorts, commercial and e-commerce ads" },
      { name: "Motion graphics", value: "On" },
      { name: "Color grading", value: "On" },
      { name: "AI-driven editing", value: "On" },
    ],
    intent: "Edits that hold attention and carry emotion.",
  },
  {
    id: "design",
    number: "02",
    name: "Design",
    track: "V2",
    preview: "Overlays a layout grid",
    tools: ["Illustrator", "Figma"],
    params: [
      { name: "Brand identity", value: "Logos and full brand systems" },
      { name: "Collateral", value: "Posters, social media kits, presentations" },
      { name: "Interface design", value: "UI for web and apps" },
      { name: "Photo manipulation", value: "On" },
    ],
    intent: "I do not just make things look good. I make sure they communicate something true about who you are.",
  },
  {
    id: "development",
    number: "03",
    name: "Development",
    track: "A1",
    preview: "Shows the markup",
    tools: ["HTML / CSS / JS", "React / Next.js", "Flutter"],
    params: [
      { name: "Websites", value: "Clean, responsive, built from scratch" },
      { name: "Mobile apps", value: "Cross-platform, built from scratch" },
    ],
    intent: "A great product deserves a great digital home, one that performs as beautifully as it looks.",
  },
  {
    id: "robotics",
    number: "04",
    name: "Robotics",
    track: "R1",
    tag: "Beta · In the lab",
    preview: "Draws a circuit trace",
    tools: ["Python"],
    params: [{ name: "Focus", value: "Robotics and automation" }],
    intent: "Sometimes you need to build the future with your hands first, before you code it into existence.",
  },
];
