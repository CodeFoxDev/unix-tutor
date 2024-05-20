import { Course, Section, Page, Header, List, OrderedList, Image, Input, Dropdown, RadioBox, CheckBox, Fieldset, Conditional, Code } from "./func.js";

const code = (e) => `<code class="inline">${e}</code>`;
const link = (e, link) => `<a class="inline link" target="_blank" href="${link}">${e}</a>`;

export default Course({
  id: "git",
  title: "Code management with Git",
  description: `An introduction to version control with git`,
  authors: ["Robin de Vos", "Mark Dijkhuizen", "Casper van den Berg"],
  sections: [
    Section(
      "1. Basics",

      Page(
        "Introduction",
        // content
        `Git is a <b>distributed version control</b> system, tracking versions of files. It is most often used to control source code by programmers collaboratively developing software.
        Design goals of Git include speed, data integrity and support for distributed, non-linear workflows — thousands of parallel branches running on different computers.
        Git was created in 2005 for use in the development of the Linux kernel by <b>Linus Torvalds</b> and others developing the kernel.
        It was originally only used for the Linux kernel and Git itself, but was quickly adopted by other developers.
        Now it is used by almost 95% of developers around the world, and has resulted in the creation of multiple successful companies, like GitHub, GitLab and SourceForge.`,

        Header("Git and GitHub"),
        `Keep in mind that git and Github (and gitlab, etc.) are <b>NOT</b> the same thing. 
        Even though it's possible to use git without needing GitHub, you cannot use GitHub without git.`,

        Header("Terminology")

        // explain some basic terms
      ),
      Page(
        "Interacting with git",
        // content
        `In modern day use, Git is often referred to as a Command Line Interface (CLI). Git is primarily used through the terminal or via a GUI.
        In this course, you'll learn the ins and outs of navigating and utilizing the CLI to streamline your workflow. When you get proficient at the CLI, you will also understand how to use GUI's.`,

        Header("Test your knowledge"),
        `This question is quite tricky, but use your intuition and you might get it right!`,

        Fieldset(
          "page1_commit_question",
          `What is the purpose of the ${code("commit")} command?`,
          "Before committing files, you are adding all of the changed files. Once you commit, you basically tell git that these changes are final and that they should be saved as a snapshot of your project.",
          RadioBox(`${code("commit")} can be used to log your changes`, true),
          RadioBox(`${code("commit")} can be used to commit to someone`),
          RadioBox(`${code("commit")} can be used to synchronize your code with other people`)
        ),
        Conditional(
          "page1_commit_question",
          Header("Basic git commands"),
          "In the realm of Git, a handful of commands are utilized far more frequently than others.",
          `These commands include: ${code("add")}, ${code("commit")}, and ${code("status")}. <br>`,

          Header(`${code("add")}`),
          `The ${code("add")} command's use is to update the index of the current content found in the code tree that you are working in.
          Typically, you'll use it to add all changed files, which you can do as follows;`,
          Code(`git add <files>`),
          `${code("&lt;files&gt;")} should be a ${link("glob", "https://en.wikipedia.org/wiki/Glob_(programming)")} pattern, normally you would use ${code(".")}, which will add all the files in the directory.`,

          Header(`${code("commit")}`),
          `The ${code("commit")} command creates a new commit in your repository. A commit acts as a snapshot of your project, which git stores. Later, if your code stopped working, you can revert back to this snapshot and revert changes made after this commit.
          To be able to distingiush commits from each other, every commit includes a message, in this message you should ideally briefly describe the changes you've made. The command looks like this;`,
          Code(`git commit -m <message>`),
          `Where ${code("&lt;message&gt;")} is a string that describes the changes you've made.`
        )
      ),

      Page(
        "Your first git repository",
        // content
        Header("Time to git started."),
        "In this lesson you'll create your very first git repository, we'll walk you through the setup steps. And you can follow along in your own terminal."
      )
    ),
    Section(
      "2. Collaboration",
      Page(
        "Remote editing",
        Header("Creating an account on github"),
        OrderedList(
          `Head over to ${link("github.com", "https://github.com/signup")} and follow the steps to create your own github account`,
          "Once you've finised the setup, go ahead and press <q>Create Repository</q> in the dropdown of the '+' sign in the top-right corner.",
          Image("/assets/courses/git/create_repo.png"),
          "Fill out the form to create your very first repository.",
          "Follow the steps described at the quick setup section below.",
          Image("/assets/courses/git/quick_setup.png"),
          "In your prefered IDE, open your terminal and type the commands in one by one."
        ),

        // explain push, pull (and fetch?)
        Header("Pushing and pulling")
      )
    ),
  ],
});
