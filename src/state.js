/**
 * @param {string} course
 * @param {number} section
 * @param {number} page
 */
export function getPageData(course, section, page) {}

/**
 * @param {string} id
 * @returns {State.Question | null}
 */
export function getQuestionData(id) {
  const key = `question_${id}`;
  const val = localStorage.getItem(key);
  if (!val) return null;
  else return JSON.parse(val);
}

/**
 * @param {string} id
 * @param {State.Question} value
 */
export function setQuestionData(id, value) {
  const key = `question_${id}`;
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * @param {string} course
 * @param {number} section
 * @param {number} page
 * @returns {State.Page}
 */
export function getPageState(course, section, page) {
  const key = `page_${course}_${section}-${page}`;
  const val = localStorage.getItem(key);
  if (!val) return null;
  else return JSON.parse(val);
}

/**
 * @param {string} course
 * @param {number} section
 * @param {number} page
 * @param {State.Page} state
 */
export function setPageState(course, section, page, state) {
  const key = `page_${course}_${section}-${page}`;
  localStorage.setItem(key, JSON.stringify(state));
}
