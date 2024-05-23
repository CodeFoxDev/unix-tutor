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
      link.hostname !== location.hostname
    )
      continue;

    const page =
      pages.find((e) => e.path === link.pathname) ?? prefetch(link.pathname);

    link.setAttribute("data-hot", true);

    link.addEventListener("click", (e) => {
      if (
        e.target.tagName === "A" ||
        e.target.getAttribute("data-cold") !== null
      )
        return;
      e.preventDefault();

      if (
        link.pathname === location.pathname &&
        link.search === location.search
      )
        return;
      const shouldNavigate = emit("navigate", {
        path: link.pathname,
        search: link.search,
      });
      if (shouldNavigate === false) return;

      (async () => {
        let _page = await page;
        if (!_page) return;
        render(_page);
        emit("load", { path: link.pathname, search: link.search });
      })();
    });
  }
}

/**
 * @param {Router.Page} page
 */
export function render(page, updateUrl) {
  const doc = parser.parseFromString(page.data, "text/html");
  updateMeta(page, doc.title, updateUrl);

  try {
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
  } catch {
    console.log(
      `Failed to render page: ${page.path}, falling back to replace full body`
    );
    document.body = doc.body;
  }
}

/**
 * @param {string} _path
 */
export async function navigate(_path, updateUrl) {
  let [path, search] = _path.split("?");
  if (search && search.length > 0) search = `?${search}`;
  const shouldNavigate = emit("navigate", { path });
  if (shouldNavigate === false) return;
  const page = pages.find((e) => e.path === path) ?? (await prefetch(path));
  if (!page) return;

  render(page, updateUrl);
  emit("load", { path, search });
}

window.navigate = navigate;

/**
 * @param {Router.Page} page
 * @param {string} title
 */
function updateMeta(page, title, updateUrl) {
  updateUrl ??= true;
  document.title = title;
  if (updateUrl === true) history.pushState({ path: page.path }, "", page.path);
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
  if (data.path.endsWith("/")) data.path = data.path.slice(0, -1);

  for (const listener of listeners) {
    if (listener.event !== event) continue;
    const res = listener.cb(data);
    if (res === false) return false;
  }
  return true;
}

initListeners();
on("load", () => initListeners());
setTimeout(
  () => emit("load", { path: location.pathname, search: location.search }),
  0
);
// emit load on page load

window.addEventListener("popstate", ({ state }) => {
  if (state.path) navigate(state.path, false);
});
