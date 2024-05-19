// Modified from: https://github.com/CodeFoxDev/Codefoxdev/blob/main/src/js/home.js

export function initListeners() {
  const ele = document.querySelectorAll("[data-typing-animation]");
  const arr = Array.from(ele);
  if (arr.length === 0) return;

  for (const element of arr) {
    const interval =
      element.getAttribute("data-typing-interval") !== null
        ? parseInt(element.getAttribute("data-typing-interval"))
        : 6000;
    const speed =
      element.getAttribute("data-typing-speed") !== null
        ? parseInt(element.getAttribute("data-typing-speed"))
        : 80;

    const wordsAttr = element.getAttribute("data-typing-words");
    if (!wordsAttr) continue;
    /** @type {string[]} */
    const words = JSON.parse(wordsAttr.replaceAll("'", `"`));
    element.innerHTML = words[0];
    if (words.length === 1) continue;

    let index = 0;
    let inProgress = false;

    setInterval(async () => {
      if (inProgress) return;
      if (index < words.length - 1) index++;
      else index = 0;
      const content = words[index];

      inProgress = true;
      await typeContent(element, content, speed);
      inProgress = false;
    }, interval);
  }
}

function typeContent(element, content, speed) {
  return new Promise((resolve) => {
    let innerHTMLLength = element.innerHTML.length;
    let totalLength = innerHTMLLength + content.length;
    let i = 0;
    let iv = setInterval(() => {
      if (i < innerHTMLLength) {
        // Remove char
        element.innerHTML = element.innerHTML.slice(0, -1);
      } else if (i < totalLength) {
        // Add char
        let contentIndex = i - innerHTMLLength;
        element.innerHTML += content.charAt(contentIndex);
      } else {
        clearInterval(iv);
        resolve();
      }
      i++;
    }, speed);
  });
}

initListeners();
