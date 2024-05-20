import { Course, Section, Page, Header, List, Paragraph, Image, Input, Dropdown, RadioBox, CheckBox, Fieldset } from "./func.js";

const code = (e) => `<code class="inline">${e}</code>`;
const link = (e, link) => `<a class="inline link" target="_blank" href="${link}">${e}</a>`;

// prettier-override printWidth=1000
export default Course({
  id: "git",
  title: "Code management with Git",
  description: `An introduction to version control with git`,
  authors: ["Robin de Vos", "Mark Dijkhuizen"],
  sections: [
    Section(
      "1. Basics",

      Page(
        "Introduction",
        // content
        `Git is a distributed version control system that tracks versions of files. It is often used to control source code by programmers collaboratively developing software.
        Design goals of Git include speed, data integrity, and support for distributed, non-linear workflows – thousands of parallel branches running on different computers.
        Git was created in 2005 for use in the development of the Linux kernel by Linus Torvalds and others developing the kernel.
        It was originally only used for the linux kernel and git itself, but was quickly adopted by other developers.
        Now it is used by almost 95% of developers around the world, and has resulted in the creation of multiple successful companies, like GitHub, GitLab and SourceForge.`,

        Header("Git and GitHub"),
        `Keep in mind that git and Github (and gitlab, etc.) are <b>NOT</b> the same thing. 
        Even though you can use git without needing GitHub, you cannot use GitHub without git.`,

        Header("Terminology")

        // explain some basic terms
      ),
      Page(
        "Interacting with git",
        // content
        `Git is what's now as a CLI, a command line interface. Git is primarily used through the terminal or via a GUI.
        In this course we will explain how to interact with the CLI, because you can generally use the CLI more efficiently and if you now the CLI you will also now how to use GUI's.`,

        Header("Test your knowledge"),
        /* `Most of the interactions with git consist of two commands, 
        ${code("add")} and ${code("commit")}.`, */
        `I don't expect you to get this question right, but it should be pretty simple to guess the answer.`,

        // question about the commit function
        Fieldset(
          "What could commit be used for?",
          "Before you commit something, you add all of the changed files. And when you commit, you basically tell git that these changes are final and that they should be saved as a snapshot of your project.",
          RadioBox(`${code("commit")} can be used to log your changes`, true),
          RadioBox(`${code("commit")} can be used to commit to someone`),
          RadioBox(`${code("commit")} can be used to synchronize your code with other people`)
        )

        // implement a block that is only visible if previous question has been answered.
        // explain init, add, commit and status command
      ),
      Page("Basic commands"),

      Page(
        "Your first git repository",
        // content
        "It's time to git started.",
        "<br>",
        "In this lesson we will walk through the basic steps to creating your very first git repository."
      )
    ),
    Section(
      "2. Collaboration",
      Page(
        "Going remote",
        Header("Creating an account on github"),
        `1. Head to ${link("github.com", "https://github.com/signup")} and follow those steps to create your github account`,
        "2. Once you've finised the setup, go ahead and press <q>Create Repository</q> in the dropdown of the + sign in the top-right corner.",
        Image("/assets/courses/git/create_repo.png"),
        "3. Fill out the form to create  your very first repository.",
        "4. Follow the steps described at the quick setup section below.",
        Image("/assets/courses/git/quick_setup.png"),
        "5. In your prefered IDE, open your terminal and type the commands in one by one.",

        // explain push, pull (and fetch?)
        Header("Pushing and pulling")
      )
    ),
  ],
});
