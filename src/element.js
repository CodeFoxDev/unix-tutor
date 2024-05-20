/**
 * @returns {HTMLElement}
 */
export function h(type, attributes, ...children) {
  const el = document.createElement(type);

  for (const key in attributes) {
    el.setAttribute(key, attributes[key]);
  }

  children.forEach((child) => {
    if (typeof child === "string") {
      const ele = document.createElement("div");
      ele.innerHTML = child;
      el.append(...ele.childNodes);
    } else {
      el.appendChild(child);
    }
  });

  return el;
}
