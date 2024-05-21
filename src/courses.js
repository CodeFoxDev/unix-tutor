import { courses } from "./data/courses.js";
import { on, navigate } from "./router.js";

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

on("load", (e) => {
  if (e.path.startsWith("/courses/viewer")) {
    const params = new URLSearchParams(e.search);
    if (e.search === "" || !params.has("course")) return navigate("/courses");
    const split = params.get("page")?.split("-") ?? ["0", "0"];

    const course = courses.find((e) => e.id === params.get("course"));
    if (course) load(course, parseInt(split[0]), parseInt(split[1]));
    else navigate("/courses");
  }
});
