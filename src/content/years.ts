// The only place career years live. The timecode readout and the timeline ruler show a
// year only when it is listed here, and hold the last known one in between, so nothing
// on screen implies a date the content doesn't give.
//
// Key: timeline clip id (a section id, or a Story scene id).
// `at` is how far through that clip the year takes over (0 = its start, 1 = its end).
// To add a real date later, add a line, e.g. "story-sc-03": [{ at: 0, year: 2021 }].
export type YearMark = { at: number; year: number };

export const yearMarks: Record<string, YearMark[]> = {
  hero: [{ at: 0, year: 2016 }],
  "story-sc-01": [{ at: 0, year: 2016 }], // "It started in 2016"
  "story-sc-02": [
    { at: 0, year: 2019 }, // discovered freelancing
    { at: 0.5, year: 2020 }, // "In 2020, my journey as a freelancer officially began"
  ],
  contact: [{ at: 0, year: 2026 }], // now
};
