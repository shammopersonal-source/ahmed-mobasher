// The sequence. Every page section is one clip on the master timeline; add or
// reorder sections here and the timeline, timecode and transition markers follow.
export type TrackId = "V1" | "V2" | "A1" | "R1";

export const tracks: { id: TrackId; label: string }[] = [
  { id: "V1", label: "Story" },
  { id: "V2", label: "Design" },
  { id: "A1", label: "Code" },
  { id: "R1", label: "Robotics" },
];

export type SectionId = "hero" | "story" | "craft" | "work" | "agency" | "reviews" | "credits" | "contact";

export type Section = {
  id: SectionId;
  /** Plain-language name shown on the clip and used as the nav label. */
  label: string;
  track: TrackId;
  /** Extra tracks the section also occupies, drawn as unlabelled linked clips. */
  linked?: TrackId[];
  /** Career year shown in the timecode when this section starts. */
  year: number;
  /** Name of the edit that brings this section in, shown as the editor's marker. */
  transition?: string;
};

export const sections: Section[] = [
  { id: "hero", label: "Intro", track: "V1", year: 2016 },
  { id: "story", label: "Story", track: "V1", year: 2016, transition: "Hard cut" },
  { id: "craft", label: "Craft", track: "V2", linked: ["V1", "A1", "R1"], year: 2020, transition: "J-cut" },
  { id: "work", label: "Work", track: "V1", linked: ["V2"], year: 2021, transition: "Match cut" },
  { id: "agency", label: "Agency", track: "A1", linked: ["V2"], year: 2023, transition: "Whip pan" },
  { id: "reviews", label: "Reviews", track: "V2", year: 2024, transition: "Cross dissolve" },
  { id: "credits", label: "Credits", track: "R1", linked: ["A1"], year: 2025, transition: "Roll credits" },
  { id: "contact", label: "Contact", track: "A1", year: 2026, transition: "Smash cut" },
];

export const FINAL_YEAR = 2026;
