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

  drawings: ["IMG_8104.jpeg", "IMG_8102.jpeg", "IMG_8103.jpeg"].map((src, i) => ({
    src: `images/drawings/${src}`,
    title: `Drawing ${i + 1}`,
    medium: "Charcoal on paper",
  })),

// ----------------- SKETCHNOTES -------------------------
   sketchNotes: [
           {
      title:     "Technical Debt",
      topic:     "Thech",
      desc:      "They are in the walls...",
      thumbnail: "images/sketchnotes/tech_debt.png",        // drop your image here
      youtube:   "https://youtu.be/nP2n61zexs4?si=BRvENFNudyoL9M6-",
      youtubeUa: "https://youtu.be/DCGh4TKvwdM?si=-o2xBCbYr0UEjsj4",
      medium:    "https://medium.com/code-like-a-girl/technical-debt-9c4092051bec",
    },    
    {
      title:     "Agile Babel Fish",
      topic:     "Methods",
      desc:      "The fears behind agile methodologies",
      thumbnail: "images/sketchnotes/agile-babelfish.jpeg",        // drop your image here
      youtube:   "https://youtu.be/RCCrWs2AJAM?si=EtKpIw-ExkBBn8eJ",
      youtubeUa: "",
      medium:    "https://medium.com/code-like-a-girl/what-nobody-tells-phds-about-agile-68c17c2c74d3",
    },
        {
      title:     "Definition of Done",
      topic:     "Tech",
      desc:      "A Million-Dollar Problem",
      thumbnail: "images/sketchnotes/DoD.png",        // drop your image here
      youtube:   "https://youtu.be/ixuZ-Vet3Rw?si=Mpotp42lYiFyxaeL",
      youtubeUa: "https://youtu.be/zB5cwpzrmx8?si=yyRle0MdBi6lAdG3",
      medium:    "https://medium.com/design-bootcamp/defining-good-enough-is-a-million-dollar-problem-2a2bc24c25b5",
    },
        {
      title:     "Disruptive innovation",
      topic:     "Business",
      desc:      "Why established companies keep missing the next big thing.",
      thumbnail: "images/sketchnotes/disruptive_innovation.jpeg",  // drop your image here
      youtube:   "https://youtu.be/DFUmg-OsmCU?si=oxZ7ieZerdnspNzU",
      youtubeUa: "https://youtu.be/Mz0eeeo2wtg?si=2t9GEounvFp1S3ds", 
      medium:    "https://medium.com/design-bootcamp/the-thing-that-isnt-a-threat-c07fbadac8eb",
    },
        {
      title:     "Why Scrum works",
      topic:     "Methods",
      desc:      "The Athlets approach to agile project management.",
      thumbnail: "images/sketchnotes/scrum.jpeg",  // drop your image here
      youtube:   "https://youtu.be/yfQ46hTQ_u0?si=eYWKj-IVDXWvIBuP",
      youtubeUa: "https://youtu.be/hUjY055TPk4?si=-fuZkOjOvSIlIs0L",  
      medium:    "https://medium.com/@MarginsExplained/why-scrum-works-842e5f9d4aba",
    },
    {
      title:     "How Machine Learning works",
      topic:     "Tech",
      desc:      "",
      thumbnail: "images/sketchnotes/ml.jpeg",  // drop your image here
      youtube:   "https://youtu.be/7Ga-PpEnVeg?si=cwDjsonTZdVv8ZcH",
      youtubeUa: "https://youtu.be/7RO07QAHC7w?si=ovaV2GpPDbZAHXr9",   
      medium:    "https://medium.com/@MarginsExplained/how-we-teach-machines-to-think-748d39981226",
    },
    {
      title:     "Why Your To-Do List Has Zombies (and How to Kill Them)",
      topic:     "Thinking",
      desc:      "",
      thumbnail: "images/sketchnotes/zombie_tasks.png",     
      youtube:   "https://youtu.be/W5Gk_X1OWbE?si=nA1iTjKYyd-e-HLl",
      youtubeUa: "https://youtu.be/0CWujjJWUx4?si=JW2KdJZt5JGUXCyd",
      medium:    "https://medium.com/no-time/why-your-todo-tasks-wont-die-and-how-to-kill-them-cd818ce0aa10",
    },
    {
      title:     "5 Whys",
      topic:     "Thinking",
      desc:      "A simple tool for getting to the root of a problem.",
      thumbnail: "images/sketchnotes/5why.jpg",        // drop your image here
      youtube:   "https://youtu.be/18zzv5mtoB0?si=RZdEV0Y5UDlbH3E_",
      youtubeUa: "https://youtu.be/LH-c3aUKgIU?si=Xm6ZSdxRJ03mVYR3",
      medium:    "",
    },
        {
      title:     "Design Sprint",
      topic:     "Methods",
      desc:      "How to get from problem to tested prototype in 5 days.",
      thumbnail: "images/sketchnotes/design_sprint.jpg",        // drop your image here
      youtube:   "https://youtu.be/6p7WWpJLc3M?si=mgoywbXBc8oMvD9h",
      youtubeUa: "https://youtu.be/1_guS7BtScY?si=onHhSQkMmJ0G-Cdj",
      medium:    "https://medium.com/design-bootcamp/major-tom-to-ground-control-stop-wasting-months-on-bad-ideas-a6f587907266",
    },
            {
      title:     "Jobs to Be Done",
      topic:     "Business",
      desc:     "Why people really buy things.",
      thumbnail: "images/sketchnotes/jtbd.jpg",        // drop your image here
      youtube:   "https://youtu.be/tuCOjql6cqM?si=x3r58LMOobTqOQkf",
      youtubeUa: "https://youtu.be/EJNpGujHBVE?si=Nc9y0Q8cfHWL4nDT",
      medium:    "",
    },
  ],
  
// ----------------- PROYAV -------------------------
      youtube:   "",
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