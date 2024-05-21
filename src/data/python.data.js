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
        "Python basics",

        Header("Basics"),

        `Python is known for its simplicity and beginner-friendly <b>syntax</b> (grammar in programming languages), 
        which makes it an awesome language to learn for beginners.
        It's widely used in analytics and algorithms.
        
        Python has a large array of functions, that supports many of your programming needs.
        What's more, Python has a large community,
        which means you'll be able to find resources and help very easily`,

        Header("Quiz Time!"),

        Fieldset(
          `page1_what_question`,
          `What is Python?`,
          `While Python is indeed a snake species,
          in this context, we're referring to Python as the programming language`,
          RadioBox(`a snake species`),
          RadioBox(`a programming language`, true),
          RadioBox(`an IDE (integrated development environment)`)
        ),

        Fieldset(
          `page1_benefit_question`,
          `Why is Python a good programming language to learn? Choose all options that apply.`,
          `Python is known to be straightforward and has easy-to-learn syntax.
          However, Python has a bad reputation on speed.
          For fast languages, C++, Java and Rust are all good options,
          though they're more difficult than Python and each have different uses.`,
          CheckBox(`It's a basic language`, true),
          CheckBox(`It's a fast language`),
          CheckBox(`It has easy syntax`, true)
        )
      )
    ),
    Section(
      "2. A Quick Guide To Syntax",

      Page(
        "Numbers",

        Header("Syntax: The Building Blocks of Python"),

        `As we continue our guide to Python, we encounter syntax &mdash;
        the grammar that makes up all code languages.
        It's through syntax that we structure our programming.`,

        Fieldset(
          "syntax_question",
          `What is syntax in programming?`,
          `This includes rules about how to declare variables, how to call functions,
          and how to structure control flow statements, among other things.
          It’s what allows us to write programs that the computer can understand`,
          RadioBox(`The color scheme of the text editor used for coding`),
          RadioBox(`The set of rules that specifiy how programs in a programming language must be structured`, true),
          RadioBox(`The process of finding and fixing bugs in a program`),
          RadioBox(`The runtime at which the program runs`)
        ),

        Header("Basic Math in Python"),

        `Calculations in Python are very comparable to most other programming languages.
        When we input ${code("2 + 4 - 1")} into the shell, we get ${code("5")} as expected.
        Similarly we can do multiplication using an asterisk like ${code("2 * 3")} getting ${code("6")},
        as well as division using a slash: ${code("6 / 2")}.`,

        Header("Exponents, parentheses and PEMDAS"),

        `Exponents are done with double asteriks putting the exponent after, ${code("2 ** 4")}
        we get the same as ${code("2*2*2*2")} outputting ${code("16")}.
        You can also use parentheses to prioritize certain operations.
        The result of ${code("2 + 1 * 3")} is the same as ${code("2 + 3")}, however,
        ${code("(2 + 1) * 2")} gets calculated like ${code("3 * 2")}.
        All math operations are ordered following PEMDAS:`,
        OrderedList(`<b>Parentheses</b>`, `<b>Exponents</b>`, `<b>Multiplication & Division</b> (left to right)`, `<b>Addition and Subtraction</b> (left to right)`),
        `This behaviour and syntax is mostly similar between programming languages.`, //danku robin

        Header("Practice your knowledge!"),

        Fieldset(
          `math_order_1`,
          `What is the output of ${code("4 - 2 / 2 * 3")}?`,
          `Since there are no parentheses/exponents,
          we perform multiplication from left to right.
          First we have ${code("2 / 2")} which equals ${code("1")}.
          Then we multiply this result by ${code("3")},
          so we end up with ${code("1 * 3 = 3")}
          So the expression becomes ${code("4 - 3")}, ending up with ${code("1")}.`,
          RadioBox(`3`),
          RadioBox(`4.6666...`),
          RadioBox(`0.3333...`),
          RadioBox(`1`, true)
        ),
        Fieldset(`math_order_1`, `What is the output of ${code("3 - (3 - 0.5 ** 2) * 2")}?`, ``, RadioBox(`3`), RadioBox(`4.6666...`), RadioBox(`0.3333...`), RadioBox(`1`, true)) // add answers and commentary
      ),
      Page("Texts"),
      Page("Lists")
    ),
  ],
});
