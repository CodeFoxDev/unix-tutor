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
