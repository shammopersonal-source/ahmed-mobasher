// The sequence. Every page section is one or more clips on the master timeline; add or
// reorder sections here and the timeline, timecode and transition markers follow.
import { scenes } from "./story";

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
  { id: "craft", label: "Craft", track: "V2", linked: ["V1", "A1", "R1"], year: 2024, transition: "J-cut" },
  { id: "work", label: "Work", track: "V1", linked: ["V2"], year: 2024, transition: "Match cut" },
  { id: "agency", label: "Agency", track: "A1", linked: ["V2"], year: 2025, transition: "Whip pan" },
  { id: "reviews", label: "Reviews", track: "V2", year: 2025, transition: "Cross dissolve" },
  { id: "credits", label: "Credits", track: "R1", linked: ["A1"], year: 2026, transition: "Roll credits" },
  { id: "contact", label: "Contact", track: "A1", year: 2026, transition: "Smash cut" },
];

export const FINAL_YEAR = 2026;

/** One block on the timeline. Most sections are a single clip; Story is one clip per scene. */
export type TimelineClip = {
  id: string;
  section: SectionId;
  /** Element id the clip starts at and jumps to. */
  target: string;
  /** Short text drawn on the clip. */
  label: string;
  /** Full name for assistive tech and tooltips. */
  name: string;
  track: TrackId;
  linked?: TrackId[];
  year: number;
};

export const clips: TimelineClip[] = sections.flatMap((s): TimelineClip[] =>
  s.id === "story"
    ? scenes.map((scene, i) => ({
        id: scene.id,
        section: s.id,
        // The first scene's clip starts at the section heading, so the opener belongs to it.
        target: i === 0 ? s.id : scene.id,
        // Scene clips can be narrow: the first carries the section name, the rest just their number.
        label: i === 0 ? `${s.label} ${scene.number}` : scene.number,
        name: `${s.label}, scene ${i + 1}: ${scene.title}`,
        track: scene.track,
        year: scene.timecodeYear,
      }))
    : [{ id: s.id, section: s.id, target: s.id, label: s.label, name: s.label, track: s.track, linked: s.linked, year: s.year }],
);
