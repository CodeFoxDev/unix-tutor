import { h } from "../element.js";

/** @param {Courses.Course} course */
export function Course(course) {
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
            { class: "section-page" },
            h("p", {}, page.title)
          );
          sections.appendChild(button);
          button.addEventListener("click", () => {
            this.render(course.sections.indexOf(sec), sec.pages.indexOf(page));
          });
        }
      }
    },
    render(section, page) {
      const rendered = course.sections[section]?.pages[page]?.render?.(
        section,
        page
      );
      if (!rendered) return;
      const outlet = document.querySelector("#viewer-outlet");
      if (!outlet) return;
      outlet.innerHTML = "";
      outlet.append(rendered);

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
    render(section, page) {
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

      function showCorrect() {
        for (const item of items) {
          item.ref.firstChild.setAttribute("disabled", true);
          if (item.correct === true) item.ref.classList.add("correct");
        }

        feedbackEle.classList.remove("hidden");
        button.lastChild.classList.add("done");
      }

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
