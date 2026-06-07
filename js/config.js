const SITE_CONFIG = {

  name:     "Hanna Kamyshanska",
  initials: "H.K.",
  tagline:  "Artist & data scientist. Complex → simple → hand-drawn.",
  location: "Frankfurt",

  about: `
    I'm a data scientist by day and an artist the rest of the time.
    I paint in oil and charcoal — landscapes, portraits, still life —
    anywhere from impressionistic to very realistic, depending on my mood.
    <br><br>
    The thread running through everything I do is the same: taking something
    complex and making it visible. In data, that's patterns in numbers.
    In painting, it's light on a face. In my sketch notes, it's a business
    concept reduced to its essential shape.
    <br><br>
    I built <strong>Proyav</strong> because I needed it. As an artist who
    also works in tech, I kept thinking there had to be a smarter way to
    train your eye — so I made one.
    <br><br>
    I hold a PhD and currently live in Frankfurt.
  `,

  tags: [
    "Oil Painting", "Charcoal", "Data Science",
    "Sketch Notes", "iOS Development", "Visual Thinking"
  ],

  links: {
    medium:   "https://medium.com/@MarginsExplained",
    youtube:  "https://www.youtube.com/channel/UCF-UgzeRQLUjiPuyUPYnCZQ",
    github:   "https://github.com/kamishiki",
    appstore: "https://apps.apple.com/app/proyav",
  },

  heroImages: [
    { src: "images/paintings/frogs.jpg",  caption: "Oil on canvas" },
    { src: "images/paintings/phlox.jpg",  caption: "Oil on canvas" },
    { src: "images/paintings/pond.jpeg",  caption: "Oil on canvas" },
  ],

  paintings: [
    { src: "images/paintings/frogs.jpg", title: "Frog & Paper Plane", medium: "Oil on canvas" },
    { src: "images/paintings/phlox.jpg", title: "Still Life with Red Vase", medium: "Oil on canvas" },
    { src: "images/paintings/pond.jpeg", title: "Lily Pond", medium: "Oil on canvas" },
  ],

  drawings: [],

  sketchNotes: [
    {
      title:     "Stop Wasting Months on Bad Ideas: Design Sprint Explained",
      topic:     "Strategy",
      desc:      "Google's method for turning a year of work into 5 days — hand-drawn.",
      thumbnail: "",
      youtube:   "https://www.youtube.com/@MarginsExplained",
      medium:    "",
    },
    {
      title:     "Blind to the New: Why Disruption Looks Like a Toy",
      topic:     "Innovation",
      desc:      "Why established companies keep missing the next big thing.",
      thumbnail: "",
      youtube:   "https://www.youtube.com/@MarginsExplained",
      medium:    "",
    },
    {
      title:     "Why Your To-Do List Has Zombies (and How to Kill Them)",
      topic:     "Productivity",
      desc:      "The tasks that never die — and the system to finally finish them.",
      thumbnail: "",
      youtube:   "",
      medium:    "https://medium.com/@MarginsExplained",
    },
  ],

  proyav: {
    tagline: "A drawing aid built by an artist, for artists.",
    pronunciation: "proh-yav · Прояв · revelation, manifestation, display, development",
    desc: `Your brain is a liar. It fills in what it expects to see — not what's actually there. That's why your teacher's eye catches what yours misses.

PROYAV gives you that second eye. Mid-session, on your own, whenever you need it. Point your camera at your reference or your artwork and see it differently.`,
    features: [
      { heading: "SEE",     text: "Flip horizontal, vertical, rotate. Your brain can't lie about a reversed image." },
      { heading: "MEASURE", text: "Overlay the golden ratio spiral, Loomis head, or figure canon directly onto your work." },
      { heading: "FEEL",    text: "Blur your drawing to see values. Push contrast or switch to grayscale to reveal structure." },
      { heading: "TRAIN",   text: "A daily prompt. A dot for every day you showed up. 500 prompts across 14 topics." },
      { heading: "OFFLINE BY DESIGN",   text: "No cloud. No accounts. No subscription. Your drawings stay on your phone. " }
    ],
    screens: [
      "images/proyav/Slice%201.png",
      "images/proyav/Slice%202.png",
      "images/proyav/Slice%203.png",
      "images/proyav/Slice%204.png",
      "images/proyav/Slice%205.png",
    ],
  },

  profilePhoto: "bio_foto.png",

  formspreeEndpoint: "",

};