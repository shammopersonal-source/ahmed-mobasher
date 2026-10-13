import type { TrackId } from "./sections";

// "Rough Cut": Ahmed's About text as six scenes. Sentences are his, trimmed; nothing added.
export type Scene = {
  id: string;
  number: string;
  title: string;
  /** Shown on the slate. Only set where the original text gives a year. */
  years?: string;
  /** Year the running timecode shows while this scene plays. */
  timecodeYear: number;
  track: TrackId;
  body: string[];
  quote?: string;
  after?: string;
};

export const story = {
  slate: "Rough cut",
  opener: ["Your vision.", "My craft."],
  subtitle: "A mind that loves code and an eye that refuses to settle for anything ordinary.",
  take: "TK 1",
};

export const scenes: Scene[] = [
  {
    id: "story-sc-01",
    number: "01",
    title: "A camera and a timeline",
    years: "2016",
    timecodeYear: 2016,
    track: "V1",
    body: [
      "My story did not start in a classroom. It started in 2016, when I fell in love with making videos. No plan. No business. Just a camera, a timeline, and an obsession with telling stories through footage.",
      "I filmed and edited for my brother's and friends' YouTube channels. I was not getting paid. I did not care. The work itself was the reward.",
    ],
  },
  {
    id: "story-sc-02",
    number: "02",
    title: "Something shifted",
    years: "2019–2020",
    timecodeYear: 2019,
    track: "V1",
    body: [
      "For years I quietly built a craft I did not yet have a name for. Then I discovered freelancing, and realized the skill I had been giving away for free was something the world was willing to pay for. That did not make me greedy. It made me serious.",
      "In 2020, my journey as a freelancer officially began. Every frame justified, every cut deliberate.",
    ],
  },
  {
    id: "story-sc-03",
    number: "03",
    title: "Color, type, composition",
    timecodeYear: 2020,
    track: "V2",
    body: [
      "What started with video editing slowly grew into graphics design, where every pixel became a decision and every layout a statement. I learned to think in color, type, and composition.",
    ],
  },
  {
    id: "story-sc-04",
    number: "04",
    title: "Building the digital",
    timecodeYear: 2021,
    track: "A1",
    body: [
      "As the years passed, that visual instinct found its way into web design and app development, building digital experiences that do not just function but actually feel like something.",
    ],
  },
  {
    id: "story-sc-05",
    number: "05",
    title: "Away from the screen",
    timecodeYear: 2022,
    track: "R1",
    body: [
      "When I step away from screens entirely, I am deep into robotics. Sometimes you need to build the future with your hands first, before you code it into existence.",
    ],
  },
  {
    id: "story-sc-06",
    number: "06",
    title: "The Bigger Story",
    timecodeYear: 2023,
    track: "V1",
    body: [
      "When I decided to launch my own business, I ran into a wall nobody had warned me about. Not the lack of talent. Not the lack of ideas. The lack of infrastructure. Every step that should have taken a day took a week.",
      "I got through it, but I never forgot how it felt. So I asked:",
    ],
    quote: "What if the next person did not have to go through this alone?",
    after: "That question became Startup Solution.",
  },
];
