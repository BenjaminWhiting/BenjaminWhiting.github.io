/*
  The catalog. To add a project, copy an entry and put it at the TOP of the list.
  Keep the list newest-first: catalog numbers are assigned from the bottom up,
  so the oldest entry is always 001 and existing numbers never change.

  Fields
    id          Required. Short slug, unique. Becomes the shareable link:
                https://benjaminwhiting.github.io/#your-id
    title       Required.
    year        Required. When it was built.
    kind        Required. One or two words. Each distinct kind becomes a filter
                button, so reuse existing ones where they fit.
    summary     Required. One sentence, shown in the collapsed row.
    description Optional. A paragraph of context, shown when the row is opened.
    highlights  Optional. The talking points: what was hard, what was clever,
                what you would do differently.
    stack       Optional. Languages, frameworks, tools.
    links       Optional. Any number of { label, url }. For a project with its
                own GitHub Pages site, the url is
                https://benjaminwhiting.github.io/<repo-name>/
    featured    Optional. true pins the entry to the top of the page.
*/
window.PROJECTS = [
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
  },
  {
    id: "data-source-manager-mock",
    title: "Data Source Manager",
    year: 2026,
    kind: "Mockup",
    summary:
      "A UI mockup for a schema-driven data ingestion system: where a source lives, how to authenticate, and what shape the data takes.",
    description:
      "A thought experiment answering one question: what would the configuration surface for a generic ingestion engine look like? There is no backend. The Run button simulates a pipeline and randomly succeeds or fails so both states can be demonstrated.",
    highlights: [
      "Authentication is a first-class, named entity (Basic, mTLS, API key, Bearer, OAuth2, HMAC). Everything else refers to a rule by name, so no credential is entered anywhere else.",
      "The connection and data forms change per source type: REST, GraphQL, SFTP, S3, webhook, database.",
      "A working schema importer for each type: OpenAPI JSON, GraphQL SDL, CSV headers, sample JSON, and CREATE TABLE DDL.",
      "The README lists its own rough edges, including the 800-line single component that should have been split.",
    ],
    stack: ["React", "Vite"],
    links: [
      { label: "Source", url: "https://github.com/BenjaminWhiting/data-source-manager-mock" },
    ],
  },
];
