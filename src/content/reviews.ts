// Client testimonials, verbatim from the previous site. Clients asked to stay anonymous.
export type Review = {
  id: string;
  author: string;
  service: string;
  location: string;
  text: string;
};

export const reviewsIntro = { label: "Reviews", title: "What clients say" };

export const reviews: Review[] = [
  {
    id: "note-presentation",
    author: "Confidential Client",
    service: "Graphic Design",
    location: "United States",
    text: "My unstructured ideas were transformed into a clear and visually appealing outcome with great skill. The work was completed professionally and I am extremely satisfied with the result. I would definitely choose this service again for any future graphic design or official presentation needs.",
  },
  {
    id: "note-ecommerce",
    author: "Confidential Client",
    service: "Ecommerce Ads",
    location: "Jacksonville, US",
    text: "Exceptional work. He delivered high quality, engaging ecommerce ads that perfectly captured our brand's message. The AI-driven editing skills are impressive and the final results were top tier. I love the work and will definitely be rehiring for all my future projects.",
  },
  {
    id: "note-video",
    author: "Confidential Client",
    service: "Video Editing",
    location: "FL, United States",
    text: "Excellent seller, awesome with satisfaction, and efficient. This is my first time working with him, and the video editing task he completed really deserves appreciation. He provided the perfect editing — he is really amazing. I will definitely work with him again. High quality work. Thank you.",
  },
];
