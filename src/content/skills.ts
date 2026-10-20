// Skills — from the previous site's Skills and Services sections.
// `level` is the number the ring counts up to (set by the user on 2026-10-20). Leave it
// out and the ring fills without a number.
export type Skill = {
  id: string;
  name: string;
  tools: string[];
  /** What he does with them. Add rows freely. */
  items: string[];
  note: string;
  tag?: string;
  level?: number;
};

export const skillsIntro = { label: "Skills", title: "What I work with" };

export const skills: Skill[] = [
  {
    id: "video",
    level: 95,
    name: "Video",
    tools: ["Premiere Pro"],
    items: ["Editing, from raw footage to cinematic storytelling", "Motion graphics", "Color grading", "AI-driven editing"],
    note: "Brand films, YouTube content, documentary shorts, commercial and e-commerce ads.",
  },
  {
    id: "design",
    level: 97,
    name: "Design",
    tools: ["Illustrator", "Figma"],
    items: ["Logos and full brand systems", "Posters, social media kits, presentations", "UI for web and apps", "Photo manipulation"],
    note: "I do not just make things look good. I make sure they communicate something true about who you are.",
  },
  {
    id: "development",
    level: 100,
    name: "Development",
    tools: ["HTML / CSS / JS", "React / Next.js", "Flutter"],
    items: ["Clean, responsive websites built from scratch", "Cross-platform mobile apps"],
    note: "A great product deserves a great digital home, one that performs as beautifully as it looks.",
  },
  {
    id: "robotics",
    level: 72,
    name: "Robotics",
    tools: ["Python"],
    items: ["Robotics and automation"],
    note: "Sometimes you need to build the future with your hands first, before you code it into existence.",
    tag: "In the lab",
  },
];
