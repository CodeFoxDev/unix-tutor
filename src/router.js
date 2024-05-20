/** @type {Router.Listener[]} */
const listeners = [];
/** @type {Router.Page[]} */
const pages = [];

const parser = new DOMParser();

export function initListeners() {
  const links = document.querySelectorAll("a");

  for (const _link of links) {
    /** @type {HTMLAnchorElement} */
    const link = _link;
    if (
      link.getAttribute("data-cold") !== null ||
      link.getAttribute("data-hot") !== null || // already listening
      link.pathname.startsWith("http://") ||
      link.pathname.startsWith("https://")
    )
      continue;
    const page =
      pages.find((e) => e.path === link.pathname) ?? prefetch(link.pathname);

    link.setAttribute("data-hot", true);

    link.addEventListener("click", (e) => {
      e.preventDefault();

      const shouldNavigate = emit("navigate", { path: link.pathname });
      if (shouldNavigate === false) return;

      (async () => {
        let _page = await page;
        if (!_page) return;
        render(_page);
        emit("load", { path: link.pathname });
      })();
    });
  }
}

/**
 * @param {Router.Page} page
 */
export function render(page) {
  const doc = parser.parseFromString(page.data, "text/html");
  updateMeta(page, doc.title);

  const nav = document.body.querySelector("nav");
  const newNav = doc.body.querySelector("nav");
  if (newNav !== undefined && !newNav.classList.contains("hidden"))
    nav.classList.remove("hidden");
  else nav.classList.add("hidden");

  const main = document.body.querySelector("main");
  const newMain = doc.body.querySelector("main");
  document.body.removeChild(main);
  document.body.appendChild(newMain);

  console.log("Rendered page:", page.path);
}

/**
 * @param {string} path
 */
export async function navigate(path) {
  const shouldNavigate = emit("navigate", { path });
  if (shouldNavigate === false) return;
  const page =
    pages.find((e) => e.path === link.pathname) ??
    (await prefetch(link.pathname));
  if (!page) return;

  render(page);
  emit("load", { path });
}

/**
 * @param {Router.Page} page
 * @param {string} title
 */
function updateMeta(page, title) {
  document.title = title;
  history.pushState({}, "", page.path);
}

/**
 * @param {string} path
 */
async function prefetch(path) {
  if (!path || pages.find((e) => e.path === path) !== undefined) return;

  const res = await fetch(path);
  if (!res) return;
  const html = await res.text();

  console.log("Preloaded page:", path);
  pages.push({
    path,
    data: html,
  });

  return pages[pages.length - 1];
}

/**
 * @param {Router.Event} event
 * @param {Router.Callback} cb
 */
export function on(event, cb) {
  listeners.push({
    event,
    cb,
  });
}

/**
 * @param {Router.Event} event
 * @param {Router.EventData} data
 */
function emit(event, data) {
  for (const listener of listeners) {
    if (listener.event !== event) continue;
    const res = listener.cb(data);
    if (res === false) return false;
  }
  return true;
}

initListeners();
on("load", () => initListeners());
