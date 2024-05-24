import "./courses.js";
import "./effects/scroll.js";
import "./effects/typing.js";
import { on } from "./router.js";

on("load", (e) => {
  if (e.path === "/about" && e.hash === "#contact") {
    history.pushState({ path: e.path }, "", `${e.path}${e.hash}`);
    document.querySelector("#contact")?.scrollIntoView?.();
  } else if (e.hash === "") {
    document.querySelector(".about")?.scrollIntoView?.();
  }

  if (e.path === "/about") {
    const form = document.querySelector(".contact-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const firstName = document.querySelector("#first_name")?.value ?? "";
      const lastName = document.querySelector("#last_name")?.value ?? "";
      const subject = document.querySelector("#subject")?.value ?? "";
      const body = document.querySelector("#body")?.value ?? "";

      const bodyContent = `(${firstName} ${lastName}) ${body}`;

      const url = `mailto:118589@minkemacollege.nl?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(bodyContent)}`;
      location.href = url;
    });
  }
});
