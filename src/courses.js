import { courses } from "./data/courses.js";
import { on, navigate } from "./router.js";

/* function load() {
  document.querySelector("main")?.append(git.sections[0].pages[0].render());
} */

/**
 * @param {Courses.Course} course
 */
function load(course, section = 0, page = 0) {
  course.insertSidebar();
  course.render(section, page);
}

on("load", (e) => {
  if (e.path === "/courses/viewer") {
    const params = new URLSearchParams(e.search);
    if (e.search === "" || !params.has("course")) return navigate("/courses");
    const split = params.get("page")?.split("-") ?? ["0", "0"];

    const course = courses.find((e) => e.id === params.get("course"));
    if (course) load(course, parseInt(split[0]), parseInt(split[1]));
    else navigate("/courses");
  }
});
