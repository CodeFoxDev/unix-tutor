/** @param {Courses.Course} course */
export function Course(course) {
  return course;
}

/**
 * @param {Courses.Page} page
 * @returns {Courses.Page}
 */
export function Page(page) {
  return {
    ...page,
    render() {
      const root = document.createElement("div");
      root.className = "page";
      const title = document.createElement("h1");
      title.className = "title";
      title.innerHTML = page.title;
      root.appendChild(title);
      for (const content of page.content) root.appendChild(content.render());
      return root;
    },
  };
}

/**
 * @param {string} section
 * @returns {CourseContent.Header}
 */
export function Header(section) {
  return {
    type: "header",
    text: section,
    render() {
      const ele = document.createElement("h3");
      ele.innerHTML = section;
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
    type: "paragraph",
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
    type: "paragraph",
  };
}

/**
 * @param {Omit<CourseContent.MultipleChoice, 'type' | 'render'>} section
 * @returns {CourseContent.MultipleChoice}
 */
export function MultipleChoice(section) {
  return {
    ...section,
    type: "paragraph",
  };
}
