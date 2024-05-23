import "./courses.js";
import "./effects/scroll.js";
import "./effects/typing.js";
import { on } from "./router.js";

on("load", (e) => {
  if (e.path === "/about" && e.hash === "#contact")
    history.pushState({ path: e.path }, "", `${e.path}${e.hash}`);
});
