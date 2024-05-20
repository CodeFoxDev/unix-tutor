import { h } from "../element.js";
import { navigate } from "../router.js";

const _listeners = [];
const update = (name, cb) => {
  _listeners.push({
    name,
    cb,
  });
  cb();
};
const callUpdate = (name) =>
  _listeners.forEach((e) => e.name === name && e.cb());

/** @param {Courses.Course} course */
export function Course(course) {
  let active;

  return {
    ...course,
    insertSidebar() {
      const sections = document.querySelector("#viewer-sidebar-sections");
      if (!sections) return false;

      for (const sec of course.sections) {
        sections.appendChild(h("p", { class: "section-header" }, sec.name));

        for (const page of sec.pages) {
          const button = h(
            "div",
            {
              class: "section-page",
              id: `btn${course.sections.indexOf(sec)}-${sec.pages.indexOf(
                page
              )}`,
            },
            h("p", {}, page.title)
          );
          update("pageDone", () => {
            if (page.done === true) button.classList.add("done");
          });
          sections.appendChild(button);
          button.addEventListener("click", () => {
            const ci = course.sections.indexOf(sec);
            const pi = sec.pages.indexOf(page);
            this.render(ci, pi, course.sections.length, sec.pages.length);
          });
        }
      }
    },
    render(section, page, sections, parts) {
      let lastInPart = page === parts - 1;
      let lastInCourse = section === sections - 1 && lastInPart;

      const rendered = course.sections[section]?.pages[page]?.render?.(
        section,
        page,
        lastInCourse,
        lastInPart,
        (ci, pi) => {
          if (pi === parts) {
            ci++;
            pi = 0;
          }
          this.render(ci, pi, sections, parts);
        }
      );
      if (!rendered) return;
      const outlet = document.querySelector("#viewer-outlet");
      if (!outlet) return;
      outlet.innerHTML = "";
      outlet.append(rendered);

      if (active) active.classList.remove("active");
      active = document
        .querySelector("#viewer-sidebar-sections")
        .querySelector(`#btn${section}-${page}`);
      active.classList.add("active");

      const url = new URL(location);
      url.searchParams.set("page", `${section}-${page}`);
      history.pushState({ path: url.pathname }, "", url);
    },
  };
}

/**
 * @param {string} title
 * @param {(CourseContent.Content | string)[]} content
 * @returns {Courses.Page}
 */
export function Page(title, ...content) {
  return {
    title,
    content,
    done: false,
    render(section, page, lastInCourse, lastInPart, courseRender) {
      const root = document.createElement("div");
      root.className = "page";
      const header = h(
        "div",
        { class: "title" },
        h("h1", {}, title),
        h("p", { class: "info" }, `Part ${section + 1} - Lesson ${page + 1}`)
      );
      root.appendChild(header);
      for (const c of content) {
        if (typeof c === "string") root.appendChild(Paragraph(c).render());
        else root.appendChild(c.render());
      }

      // check if all questions have been answered
      const doneBtn = h(
        "div",
        { role: "button", class: "button disabled" },
        "Mark as done"
      );
      const nextBtn = h(
        "div",
        { role: "button", class: "button disabled" },
        lastInCourse
          ? "Finish course"
          : `Next ${lastInPart === true ? "part" : "lesson"}`
      );
      const wrapper = h("div", { class: "next-wrapper" }, doneBtn, nextBtn);
      root.appendChild(wrapper);
      if (this.done === true) {
        nextBtn.classList.remove("disabled");
      }
      let answered = true;

      update("fieldset", () => {
        if (this.done) return;
        answered = true;
        for (const item of content) {
          if (typeof item === "string") continue;
          if (item.type !== "fieldset") continue;
          if (item.answered === false) answered = false;
        }

        if (!answered) return;
        doneBtn.classList.remove("disabled");
      });

      doneBtn.addEventListener("click", () => {
        if (answered === false) return;
        this.done = true;
        callUpdate("pageDone");
        doneBtn.classList.add("disabled");
        nextBtn.classList.remove("disabled");
      });

      nextBtn.addEventListener("click", () => {
        if (nextBtn.classList.contains("disabled")) return;
        if (lastInCourse) {
          return;
        } // return to overview
        courseRender(section, page + 1);
      });

      return root;
    },
  };
}

/**
 * @param {string} name
 * @param {Courses.Page[]} pages
 * @returns {Courses.Section}
 */
export function Section(name, ...pages) {
  return {
    name,
    pages,
  };
}

/**
 * @param {string} text
 * @returns {CourseContent.Header}
 */
export function Header(text) {
  return {
    type: "header",
    text,
    render() {
      const ele = document.createElement("h3");
      ele.innerHTML = text;
      return ele;
    },
  };
}

/**
 * @param {string} section
 * @returns {CourseContent.Paragraph}
 */
export function Paragraph(section) {
  return {
    type: "paragraph",
    text: section,
    render() {
      const ele = document.createElement("p");
      ele.innerHTML = section;
      return ele;
    },
  };
}

// TODO: Allow to use code as item
/**
 * @param {string[]} items
 * @returns {CourseContent.Paragraph}
 */
export function List(...items) {
  return {
    type: "paragraph",
    items: items,
    render() {
      const ele = document.createElement("ul");
      for (const i of items) {
        const e = document.createElement("li");
        e.innerHTML = i;
        ele.appendChild(e);
      }
      return ele;
    },
  };
}

/**
 * @param {string[]} items
 * @returns {CourseContent.Paragraph}
 */
export function OrderedList(...items) {
  return {
    type: "paragraph",
    items: items,
    render() {
      const ele = document.createElement("ol");
      for (const i of items) {
        if (typeof i === "string") {
          const e = document.createElement("li");
          e.innerHTML = i;
          ele.appendChild(e);
        } else {
          ele.appendChild(i.render?.());
        }
      }
      return ele;
    },
  };
}

/**
 * @param {Omit<CourseContent.Input, 'type' | 'render'>} section
 * @returns {CourseContent.Input}
 */
export function Input(section) {
  return {
    ...section,
    type: "input",
  };
}

/**
 * @param {Omit<CourseContent.Dropdown, 'type' | 'render'>} section
 * @returns {CourseContent.Dropdown}
 */
export function Dropdown(section) {
  return {
    ...section,
    placeholder: section.placeholder ?? section.options[0],
    type: "dropdown",
  };
}

/**
 * @param {string} question
 * @param {string} feedback
 * @param {CourseContent.Content[]} items
 * @returns {CourseContent.Fieldset}
 */
export function Fieldset(question, feedback, ...items) {
  let tries = 0;
  const feedbackEle = h(
    "p",
    { class: "feedback hidden" },
    `Explaination: ${feedback}`
  );
  const button = h(
    "div",
    { class: "btn-wrapper" },
    feedbackEle,
    h("div", { role: "button", class: "button" }, "Check answer")
  );

  return {
    type: "fieldset",
    question,
    items,
    answered: false,
    render() {
      const root = h("fieldset", {}, h("legend", {}, question));
      const name = Math.random().toString(36).slice(2);
      for (const item of items) root.appendChild(item.render(name));
      button.addEventListener("click", () => this.check());
      root.appendChild(button);
      return root;
    },
    check() {
      let checked = -1;
      for (const [item, i] of iter(items)) {
        if (!item.ref?.firstChild?.checked === true) continue;
        checked = i;
        break;
      }
      if (checked === -1) return;

      const showCorrect = () => {
        for (const item of items) {
          item.ref.firstChild.setAttribute("disabled", true);
          if (item.correct === true) item.ref.classList.add("correct");
        }

        feedbackEle.classList.remove("hidden");
        button.lastChild.classList.add("disabled");
        this.answered = true;
        callUpdate("fieldset");
      };

      if (items[checked].correct === true) showCorrect();
      else {
        items[checked].ref.classList.add("incorrect");
        items[checked].ref.checked = false;
        items[checked].ref.firstChild.setAttribute("disabled", true);
      }

      tries++;
      if (tries === 2) showCorrect();
    },
  };
}

export function Image(url) {
  return {
    render() {
      return h("img", { src: url });
    },
  };
}

/**
 * @param {string} text
 * @param {boolean | undefined} correct
 * @returns {CourseContent.MultipleChoice}
 */
export function RadioBox(text, correct) {
  correct ??= false;
  return {
    type: "multipleChoice",
    radio: true,
    text,
    correct,
    render(name) {
      const id = Math.random().toString(36).slice(2);
      this.ref = h(
        "div",
        { class: "input" },
        h("input", { type: "radio", value: text, id, name }),
        h("label", { for: id }, text)
      );
      return this.ref;
    },
  };
}

/**
 * @param {string} text
 * @param {boolean | undefined} correct
 * @returns {CourseContent.MultipleChoice}
 */
export function CheckBox(text, correct) {
  correct ??= false;
  return {
    type: "multipleChoice",
    radio: false,
    text,
    correct,
    render() {
      this.ref = h(
        "div",
        {},
        h("input", { type: "checkbox" }),
        h("label", {}, text)
      );
      return this.ref;
    },
  };
}

/**
 * @template T
 * @param {T[]} val
 * @returns {Generator<[T, number], void, unknown>}
 */
function* iter(val) {
  for (let i = 0; i < val.length; i++) {
    yield [val[i], i];
  }
}
