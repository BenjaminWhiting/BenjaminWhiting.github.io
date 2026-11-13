/*
  The catalog. To add a project, copy an entry and put it at the TOP of the list.
  Entries appear on the page in the order they are listed here.

  Fields
    id          Required. Short slug, unique. Becomes the shareable link:
                https://benjaminwhiting.github.io/#your-id
    title       Required.
    year        Required. When it was built.
    kind        Required. One or two words, shown beside the entry.
    summary     Required. One sentence, shown in the collapsed row.
    description Optional. A paragraph of context, shown when the row is opened.
    highlights  Optional. The talking points: what was hard, what was clever,
                what you would do differently.
    stack       Optional. Languages, frameworks, tools.
    links       Optional. Any number of { label, url }. For a project with its
                own GitHub Pages site, the url is
                https://benjaminwhiting.github.io/<repo-name>/
    image       Optional. A picture shown beside the entry, which links to the
                first of its links. 720 x 480 (3:2), in assets/shots/.
    featured    Optional. true pins the entry to the top of the page.
*/
window.PROJECTS = [
  {
    id: "fun-with-fishtanks",
    title: "Fun with Fishtanks",
    year: 2026,
    kind: "3D printing",
    summary:
      "An experiment in pairing a 3D printer with an AI, using a 36-inch aquarium as the test bench.",
    description:
      "I wanted to know what an AI coding assistant could do once the result had to exist in the real world, where a part either fits the glass or it doesn't. I described each part in plain words. The AI wrote it as code, checked it, sliced it and sent it to the printer. Then I held the result against the tank and said what was wrong. Two weeks of that made a riser for the light, a 1:48 Japanese boardwalk with a crooked bathhouse on its corner, and a floating ring for the plants.",
    highlights: [
      "Every part is an OpenSCAD file with its sizes as settings at the top, so changing a part means changing a number.",
      "A preflight script follows every move in a print file, arcs included, to make sure it stays inside what the printer can reach. It exists because one file carried another printer's start-up moves.",
      "An overhang check slices each model every 0.2 mm and reports anything that would start in mid-air, so nothing needs supports.",
      "The AI can upload a file and start it over the local network, but only after I have said go for that exact file.",
      "The bathhouse went through thirteen versions in three days, then was cut into seven parts that plug together without glue.",
      "A ring that looked fine in a render was far too chunky in the hand. Small fit tests now come before big prints.",
    ],
    stack: ["OpenSCAD", "Python", "Bambu Studio", "Bambu Lab A1 mini", "Claude Code"],
    links: [
      { label: "Website", url: "https://benjaminwhiting.github.io/fun-with-fishtanks/" },
      { label: "Source", url: "https://github.com/BenjaminWhiting/fun-with-fishtanks" },
    ],
    image: "assets/shots/fun-with-fishtanks.webp",
  },
  {
    id: "ramen-nights",
    title: "Ramen Nights",
    year: 2026,
    kind: "Game",
    summary:
      "A first-person ramen shop on a rainy, neon city block full of yokai.",
    description:
      "You are a ramen chef who sleeps in a cardboard box behind your own shop. Each night you walk the block to buy ingredients, prep the kitchen, flip the sign to OPEN, and cook every bowl by hand for the oni, kappa, kitsune and tanuki who take a stool. What you earn goes back into the shop. It is a solo project, still in development, with no public download yet.",
    highlights: [
      "Everything in it is original and generated from code: the city, the figures, the textures and the sound.",
      "A full night loop from dusk to 3am: shop the block, prep, service, close up, then the ledger and the reviews.",
      "Cooking is first-person and by hand, one bowl at a time. There are no batch buttons, so cooking faster means buying another stove.",
      "A build mode where every stool, stove and lamp is bought, carried in and placed, and a dish only goes on the menu once its equipment is standing in the kitchen.",
      "Thirteen kinds of yokai, twenty-two dishes, staff with shifts and wages, and three districts joined by one tram line.",
      "Plays with keyboard and mouse or a controller.",
    ],
    stack: ["Unity", "C#", "Windows"],
    links: [
      { label: "Website", url: "https://benjaminwhiting.github.io/ramen-nights-site/" },
    ],
    image: "assets/shots/ramen-nights.webp",
  },
  {
    id: "scorched-dom",
    title: "Scorched DOM",
    year: 2026,
    kind: "Browser extension",
    summary:
      "A Chrome extension where a viking occasionally wanders onto your page, torches a random element, laughs, and leaves.",
    description:
      "Cartoon vikings turn up uninvited on whatever page you are browsing, pick an element, and destroy it. The wrecked element keeps its exact shape and position but becomes a black husk with no working functionality. Reloading the page repairs everything.",
    highlights: [
      "Manifest V3 with plain JavaScript and CSS. There is no build step, so the repo folder is the extension.",
      "Three attack styles (torch, bow, longship), one picked per raid by weighted random.",
      "Nothing is written to storage and nothing leaves the browser. No uninvited raids run under prefers-reduced-motion.",
      "The demo page runs the real content script in an ordinary tab, so it can be watched without installing anything.",
    ],
    stack: ["JavaScript", "CSS", "Chrome Manifest V3"],
    links: [
      { label: "Live demo", url: "https://benjaminwhiting.github.io/scorched-dom/" },
      { label: "Source", url: "https://github.com/BenjaminWhiting/scorched-dom" },
    ],
    image: "assets/shots/scorched-dom.webp",
  },
  {
    id: "orbital-command",
    title: "Orbital Command",
    year: 2026,
    kind: "Web app",
    summary:
      "A self-service hub for registering and launching a team's internal web services from one grid of cards.",
    description:
      "A single entry point for a team's web services. Services are registered in the app through a form, so adding one needs no redeployment. One container serves both the API and the compiled frontend.",
    highlights: [
      "FastAPI serves the REST API and the React single-page app from the same container, with request bodies validated by Pydantic.",
      "Persists to one JSON file on a mounted volume. No database and no external dependencies.",
      "Three themes. Two have an animated scene drawn procedurally on a canvas, with no image assets, that stops when the browser asks for reduced motion.",
      "Multi-stage Dockerfile, Kustomize base with dev and prod overlays for EKS, and pipelines for both GitHub Actions and GitLab CI.",
      "The live demo is the same frontend with the server swapped for a stand-in that runs in the browser, since GitHub Pages cannot run a backend. It answers the same four API routes from localStorage.",
    ],
    stack: ["Python", "FastAPI", "React", "Vite", "Docker", "Kustomize"],
    links: [
      { label: "Live demo", url: "https://benjaminwhiting.github.io/orbital-command/" },
      { label: "Source", url: "https://github.com/BenjaminWhiting/orbital-command" },
    ],
    image: "assets/shots/orbital-command.webp",
  },
];
