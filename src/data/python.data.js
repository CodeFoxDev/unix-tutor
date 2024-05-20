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

        `Python is known for its simplicity and beginner-friendly <b>syntax</b> (grammar in programming languages), 
        which makes it an awesome language to learn for beginners.
        It's widely used in analytics and algorithms.
        
        Python has a large array of functions, that supports many of your programming needs.
        What's more, Python has a large community,
        which means you'll be able to find resources and help very easily`,
      
        Header('Quiz Time!'),

        Fieldset(
          `page1_what_question`,
          `What is Python?`,
          `While Python is indeed a snake species,
          in this context, we're referring to Python as the programming language`,
          RadioBox(`a snake species`),
          RadioBox(`a programming language`),
          RadioBox(`an IDE (integrated development environment)`)
        ),

        Fieldset(
          `page1_benefit_question`,
          `Why is Python a good programming language to learn? Choose all options.`,
          `Python is known to be straightforward and has easy-to-learn syntax.
          However, Python has a bad reputation on speed.
          For fast languages, C++, Java and Rust are all good options,
          though they're less intuitive than Python and each have different uses.`,
          CheckBox(`It's a basic language`),
          CheckBox(`It's a fast language`),
          CheckBox(`It has easy syntax.`)
        )
      ),
    ),
    Section(
      "Syntax",

      Page(
        "Numbers"
      ),
      Page(
        "Text"
      ),
      Page(
        "Lists"
      )
    )
  ],
});
