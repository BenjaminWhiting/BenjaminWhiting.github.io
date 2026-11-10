(function () {
  "use strict";

  const ALL = "All";
  const CATALOG_VIEW = "catalog";

  // Each [data-view] block is a tab's content; only one is shown at a time.
  // The first one in the page is the homepage.
  const views = [...document.querySelectorAll("[data-view]")];
  const tabs = [...document.querySelectorAll(".tabs a[href^='#']")];
  const HOME_VIEW = views[0].id;

  // projects.js is newest-first, so the oldest entry gets number 1.
  const projects = (window.PROJECTS || []).map((p, i, list) => ({
    ...p,
    number: list.length - i,
  }));
  const ordered = [...projects].sort(
    (a, b) => Boolean(b.featured) - Boolean(a.featured)
  );

  const state = { kind: ALL, query: "" };
  const openIds = new Set();

  const $ = (id) => document.getElementById(id);
  const entriesEl = $("entries");
  const chipsEl = $("chips");
  const searchEl = $("search");
  const countEl = $("count");
  const emptyEl = $("empty");

  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs || {})) {
      if (key === "class") node.className = value;
      else if (key === "text") node.textContent = value;
      else node.setAttribute(key, value);
    }
    for (const child of children || []) {
      if (child) node.append(child);
    }
    return node;
  }

  function matches(p) {
    if (state.kind !== ALL && p.kind !== state.kind) return false;
    const query = state.query.trim().toLowerCase();
    if (!query) return true;
    const haystack = [
      p.title,
      p.kind,
      p.year,
      p.summary,
      p.description,
      ...(p.stack || []),
      ...(p.highlights || []),
    ]
      .join(" ")
      .toLowerCase();
    return query.split(/\s+/).every((word) => haystack.includes(word));
  }

  function setOpen(id, open) {
    if (open) openIds.add(id);
    else openIds.delete(id);

    const entry = $(id);
    if (!entry) return;
    entry.classList.toggle("is-open", open);
    entry.querySelector(".entry-toggle").setAttribute("aria-expanded", String(open));
    entry.querySelector(".entry-panel").hidden = !open;
  }

  function renderEntry(p) {
    const open = openIds.has(p.id);
    const panelId = p.id + "-panel";

    const toggle = el("button", {
      class: "entry-toggle",
      type: "button",
      "aria-expanded": String(open),
      "aria-controls": panelId,
      text: p.title,
    });
    toggle.addEventListener("click", () => {
      const nowOpen = !openIds.has(p.id);
      setOpen(p.id, nowOpen);
      // Keep the address bar pointing at the open entry so it can be shared.
      if (nowOpen) {
        history.replaceState(null, "", "#" + p.id);
      } else if (location.hash === "#" + p.id) {
        history.replaceState(null, "", "#" + CATALOG_VIEW);
      }
    });

    const links = (p.links || []).map((link) =>
      el("a", { href: link.url }, [
        link.label + " ",
        el("span", { "aria-hidden": "true", text: "↗" }),
      ])
    );

    const head = el("div", { class: "entry-head" }, [
      el("span", { class: "entry-no", text: String(p.number).padStart(3, "0") }),
      el("div", { class: "entry-main" }, [
        el("h3", { class: "entry-title" }, [toggle]),
        el("p", { class: "entry-summary", text: p.summary }),
      ]),
      el("div", { class: "entry-meta" }, [
        el("span", { text: p.kind }),
        el("span", { class: "entry-year", text: String(p.year) }),
        p.featured && el("span", { class: "entry-pin", text: "Pinned" }),
      ]),
      links.length > 0 && el("div", { class: "entry-links" }, links),
    ]);

    const hasHighlights = p.highlights && p.highlights.length > 0;
    const hasStack = p.stack && p.stack.length > 0;
    const panel = el("div", { class: "entry-panel", id: panelId }, [
      p.description && el("p", { text: p.description }),
      hasHighlights &&
        el("div", {}, [
          el("h4", { text: "Highlights" }),
          el(
            "ul",
            { class: "entry-highlights" },
            p.highlights.map((text) => el("li", { text }))
          ),
        ]),
      hasStack &&
        el("div", {}, [
          el("h4", { text: "Stack" }),
          el("p", { class: "entry-stack", text: p.stack.join(" · ") }),
        ]),
    ]);
    panel.hidden = !open;

    return el("li", { class: open ? "entry is-open" : "entry", id: p.id }, [
      head,
      panel,
    ]);
  }

  function renderChips() {
    const kinds = [...new Set(projects.map((p) => p.kind))].sort();
    chipsEl.replaceChildren(
      ...[ALL, ...kinds].map((kind) => {
        const chip = el("button", {
          class: "chip",
          type: "button",
          "aria-pressed": String(kind === state.kind),
          text: kind,
        });
        chip.addEventListener("click", () => {
          state.kind = kind;
          renderChips();
          renderEntries();
        });
        return chip;
      })
    );
  }

  function renderEntries() {
    const visible = ordered.filter(matches);
    entriesEl.replaceChildren(...visible.map(renderEntry));
    entriesEl.hidden = visible.length === 0;
    emptyEl.hidden = visible.length > 0;
    countEl.textContent =
      visible.length === projects.length
        ? projects.length + (projects.length === 1 ? " entry" : " entries")
        : visible.length + " of " + projects.length + " entries";
  }

  function resetFilters() {
    state.kind = ALL;
    state.query = "";
    searchEl.value = "";
    renderChips();
    renderEntries();
  }

  function showView(id) {
    for (const view of views) view.hidden = view.id !== id;
    for (const tab of tabs) {
      if (tab.hash === "#" + id) tab.setAttribute("aria-current", "page");
      else tab.removeAttribute("aria-current");
    }
  }

  // The address picks what is shown: /#about is a tab, and /#scorched-dom
  // is a catalog entry, opened and scrolled to.
  function route() {
    let id;
    try {
      id = decodeURIComponent(location.hash.slice(1));
    } catch (e) {
      return;
    }
    if (id === "" || views.some((view) => view.id === id)) {
      showView(id || HOME_VIEW);
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const project = projects.find((p) => p.id === id);
    if (!project) return;
    showView(CATALOG_VIEW);
    if (!matches(project)) resetFilters();
    setOpen(id, true);
    $(id).scrollIntoView();
  }

  searchEl.addEventListener("input", () => {
    state.query = searchEl.value;
    renderEntries();
  });
  $("reset").addEventListener("click", resetFilters);
  window.addEventListener("hashchange", route);

  renderChips();
  renderEntries();
  $("controls").hidden = projects.length === 0;
  showView(HOME_VIEW);
  route();
})();
