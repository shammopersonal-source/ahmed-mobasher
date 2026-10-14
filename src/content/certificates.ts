import type { AssetName } from "./assets.generated";

// End credits. Verbatim from the previous site's certificate modal data.
export type Certificate = {
  id: string;
  kind: string;
  year: string;
  title: string;
  issuer: string;
  story: string;
  meta: { label: string; value: string }[];
  /** Without an image the credit opens a typographic card instead. */
  image?: AssetName;
};

export const creditsIntro = { slate: "End credits", title: "Certificates" };

export const certificates: Certificate[] = [
  {
    id: "rangpur-divisional",
    kind: "Programming Contest",
    year: "2024",
    title: "Rangpur Divisional Collegiate Programming Contest",
    issuer: "Begum Rokeya University, Rangpur",
    story:
      "My second time stepping into a competitive programming arena, and it hit differently. Representing Team Baustian_Infinity from BAUST at Begum Rokeya University, Rangpur, competing against some of the sharpest minds in the division. The problems were tough, the pressure was real, and walking away with this was a proud moment. Every bug fixed under a timer is a lesson you never forget.",
    meta: [
      { label: "Venue", value: "Begum Rokeya University, Rangpur" },
      { label: "Date", value: "October 19, 2024" },
    ],
    image: "cert-rangpur-divisional-contest",
  },
  {
    id: "baust-intra",
    kind: "Programming Contest",
    year: "2024",
    title: "Intra University Programming Contest, BAUST",
    issuer: "CSE Society, BAUST",
    story:
      "Where it all began. My very first competitive programming contest, organized by the CSE Society at Bangladesh Army University of Science and Technology. The nerves, the focus, the satisfaction of solving a problem under pressure for the very first time — this certificate marks the moment I stopped being a spectator and became a competitor. A big thank you to every organizer and fellow participant who made it unforgettable.",
    meta: [
      { label: "Organizer", value: "CSE Society, BAUST" },
      { label: "Date", value: "August 2024" },
    ],
    image: "cert-baust-intra-university-contest",
  },
  {
    id: "ten-minute-school",
    kind: "Online Course",
    year: "2023",
    title: "Web Design",
    issuer: "10 Minute School",
    story:
      "A structured deep dive into the principles of web design, completed through 10 Minute School — one of Bangladesh's most respected online learning platforms. This course sharpened my understanding of layout, typography, color theory, and user-focused design thinking. It was the bridge between knowing how to build things and knowing how to make them beautiful.",
    meta: [
      { label: "Issuer", value: "10 Minute School" },
      { label: "Issued", value: "June 11, 2023" },
      { label: "Certificate ID", value: "6478dbae0ac13" },
    ],
    image: "cert-10-minute-school-web-design",
  },
  {
    id: "uy-lab",
    kind: "Professional Training",
    year: "2024",
    title: "Professional Online Video Editing",
    issuer: "UY LAB",
    story:
      "A comprehensive professional training program in video editing, completed through UY LAB under their motto \"We Make Professionals.\" The course ran for nearly three months, covering everything from foundational editing techniques to advanced post-production workflows. It was not just a certificate — it was a formal recognition of a craft I had been quietly building since 2016.",
    meta: [
      { label: "Issuer", value: "UY LAB" },
      { label: "Duration", value: "04 March 2024 to 30 May 2024" },
      { label: "Issued", value: "June 5, 2024" },
      { label: "Student ID", value: "02406038130" },
    ],
    image: "cert-uy-lab-video-editing",
  },
  {
    id: "cybertech",
    kind: "Professional Training",
    year: "2019",
    title: "Freelancing and Outsourcing",
    issuer: "CYBERTECH, Bogura",
    story:
      "This is the certificate that started everything. In 2019, before I had a single client, I enrolled in a three-month hands-on training program at CYBERTECH Bogura, dedicated entirely to freelancing and outsourcing. I learned the fundamentals of client communication, bidding, lead generation, account management, and the full mechanics of building an online career. I completed 100 hours of practical experience and passed the final assessment.",
    meta: [
      { label: "Issuer", value: "CYBERTECH, Bogura" },
      { label: "Date", value: "October 24, 2019" },
      { label: "Duration", value: "July to September 2019" },
      { label: "Registration No", value: "825846" },
    ],
    image: "cert-cybertech-freelancing",
  },
  {
    id: "space-leadership",
    kind: "Space Program",
    year: "2026",
    title: "Global Space Leadership Program — NASA Day",
    issuer: "East West University",
    story:
      "A hands-on space leadership program held at East West University, delivered in collaboration with the Himalayan Space Centre and built on a NASA-collaborated curriculum. The day dove into space exploration, satellite technology, and leadership in the context of the space industry. It was a reminder that curiosity about the universe never really goes away — it just finds new rooms to grow in.",
    meta: [
      { label: "Venue", value: "East West University" },
      { label: "Date", value: "11 July 2026" },
    ],
    image: "cert-global-space-leadership",
  },
];
