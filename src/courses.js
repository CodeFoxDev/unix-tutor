import { courses, authors } from "./data/index.js";
import { on, navigate, initListeners } from "./router.js";
import { h } from "./element.js";

const link = (e, link) =>
  `<a class="inline link" target="_blank" href="${link}">${e}</a>`;

/**
 * @param {Courses.Course} course
 */
function load(course, section = 0, page = 0) {
  if (section >= course.sections.length - 1)
    section = course.sections.length - 1;
  if (page >= course.sections[section].pages.length - 1)
    page = course.sections[section].pages.length - 1;

  course.insertSidebar();
  course.render(
    section,
    page,
    course.sections.length,
    course.sections[section].pages.length
  );

  // TODO: update document title
}

function loadCoursesView() {
  const root = document.querySelector(".courses-overview");
  if (!root) return;

  for (const course of courses) {
    let lessons = 0;
    for (const l of course.sections) lessons += l.pages.length;

    let tags = h("div", { class: "tags" });

    for (const t of course.tags)
      tags.appendChild(h("span", { class: "chip" }, t));

    let authorNames = h("p", {});
    let authorPictures = h("div", { class: "pictures" });

    for (const a of course.authors) {
      const i = course.authors.indexOf(a);
      const author = authors.find((e) => e.name === a);
      // names
      authorNames.appendChild(
        h(
          "a",
          {
            class: "link inline",
            target: "_blank",
            href: `https://github.com/${author.username}`,
            "data-cold": true,
          },
          author.name
        )
      );
      if (i < course.authors.length - 2) authorNames.innerHTML += ", ";
      else if (i < course.authors.length - 1) authorNames.innerHTML += " & ";

      // pictures
      const div = h("a", {
        class: "picture",
        target: "_blank",
        href: `https://github.com/${author.username}`,
        "data-cold": true,
      });
      if (author.picture !== undefined)
        div.appendChild(h("img", { src: author.picture, "data-cold": true }));

      authorPictures.appendChild(div);
    }

    const courseRoot = h(
      "a",
      {
        class: "course",
        href: `/courses/viewer/?course=${course.id}`,
        draggable: false,
      },
      h(
        "div",
        { class: "content" },
        h(
          "div",
          { class: "info" },
          h("h1", { class: "title" }, course.title),
          tags
        ),
        h("p", { class: "description" }, course.description),
        h("div", { class: "spacer" }),
        h("div", { class: "authors" }, authorPictures, authorNames)
      )
    );

    root.appendChild(courseRoot);
  }
  initListeners();
}

on("load", (e) => {
  if (e.path.startsWith("/courses/viewer")) {
    const params = new URLSearchParams(e.search);
    if (e.search === "" || !params.has("course")) return navigate("/courses");
    const split = params.get("page")?.split("-") ?? ["0", "0"];

    const course = courses.find((e) => e.id === params.get("course"));
    if (course) load(course, parseInt(split[0]), parseInt(split[1]));
    else navigate("/courses");
  } else if (e.path === "/courses") loadCoursesView();
});
