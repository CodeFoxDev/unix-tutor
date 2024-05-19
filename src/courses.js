import { git } from "./data/courses.js";

function load() {
  document.querySelector("main")?.append(git.pages[0].render());
}

load();
