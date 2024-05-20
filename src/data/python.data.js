import { Course, Section, Page, Header, List, OrderedList, Image, Input, Dropdown, RadioBox, CheckBox, Fieldset, Conditional, Code } from "./func.js";

const code = (e) => `<code class="inline">${e}</code>`;
const link = (e, link) => `<a class="inline link" target="_blank" href="${link}">${e}</a>`;

export default Course({
  id: "python",
  title: "Python Basics",
  description: `A beginner-friendly guide for learning python`,
  authors: ["Casper van den Berg"],
  sections: [
    Section(
      "1. Getting started",

      Page(
        "Introduction",

        Header("Welcome to Python!"),
        `Hello and welcome to <b>Python for Beginners!</b>
        This course is made for anyone interested in learning Python, a powerful and commonly used programming language.
        Whether you are a complete beginner to programming or looking to polish your skills, this course will guide you with the knowledge to get started in Python.`,

        "We'll start with the fundamentals, including what Python is and why it is important."
      ),
      Page(
        "Basics",

        Header("Basics"),

        `Python is known for its simplicity and beginner-friendly syntax, 
        which makes it an awesome language to learn for beginners.
        It's widely used in analytics and algorithms.
        
        Python has a large array of functions, to support all your programming needs.
        `
      )
    ),
  ],
});
