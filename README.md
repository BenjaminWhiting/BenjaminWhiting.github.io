# benjaminwhiting.github.io

My about page and project catalog, served by GitHub Pages at
<https://benjaminwhiting.github.io/>.

Plain HTML, CSS and JavaScript. There is no build step: what is in this repo is
what gets served. To preview locally, open `index.html` in a browser.

## Adding a project

Everything in the catalog comes from [`projects.js`](projects.js). Copy an
existing entry, paste it at the **top** of the list, and fill it in. The fields
are documented in the comment at the top of that file.

```js
{
  id: "my-project",
  title: "My Project",
  year: 2026,
  kind: "Tool",
  summary: "One sentence on what it is.",
  highlights: ["What was hard.", "What I would do differently."],
  stack: ["Python"],
  links: [{ label: "Source", url: "https://github.com/BenjaminWhiting/my-project" }],
  image: "assets/shots/my-project.webp",
},
```

The picture is optional. It sits to the left of the entry and links to the
entry's first link, so put the live site or demo first. Make it 720 × 480 (3:2)
and keep it small; WebP at around 30 KB is plenty.

Commit and push to `main`, and the page updates a minute or so later.

Each entry has a shareable link: `https://benjaminwhiting.github.io/#my-project`
opens the page with that entry expanded.

## Projects with their own page

Any other repo of mine with GitHub Pages turned on is served under this same
address, at `https://benjaminwhiting.github.io/<repo-name>/`. To show one in the
catalog, add that URL to the entry's `links`.

Avoid creating a folder in this repo with the same name as one of those repos.
The two would claim the same address.

## Tabs

The bar at the top has two kinds of tab, both plain links inside
`<nav class="tabs">` in `index.html`.

- **A tab that shows content on this site** links to `#name`, and its content
  is a `<section>` lower down with `id="name"` and the `data-view` attribute.
  To add one, add the link and a new section. Whichever section comes first in
  the file is the homepage; right now that is About.
- **A tab that goes somewhere else**, like GitHub or LinkedIn, is an ordinary
  link to that address.

Tabs have their own addresses, such as `https://benjaminwhiting.github.io/#about`.
A tab's name must not match a project `id`, since both live after the `#`.

## Layout

| Path | What it is |
| --- | --- |
| `index.html` | The page: the tabs, the About text, the catalog's frame |
| `projects.js` | The catalog entries |
| `assets/style.css` | All styling. Dark only, on purpose |
| `assets/site.js` | Draws the catalog and its search, and switches tabs |
| `assets/shots/` | One picture per catalog entry |
| `404.html` | Shown for any address that does not exist |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are |
