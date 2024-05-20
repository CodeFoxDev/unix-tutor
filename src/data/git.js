import {
  Course,
  Page,
  Header,
  List,
  Paragraph,
  Input,
  Dropdown,
  MultipleChoice,
} from "./func.js";

export default Course({
  name: "git",
  title: "Code management with Git",
  description: `An introduction to version control with git`,
  pages: [
    Page({
      title: "Introduction",
      content: [
        Paragraph(`Git is a distributed version control system that tracks versions of files. It is often used to control source code by programmers collaboratively developing software.
          Design goals of Git include speed, data integrity, and support for distributed, non-linear workflows – thousands of parallel branches running on different computers.
          Git was created for use in the development of the Linux kernel by Linus Torvalds and others developing the kernel.
          It was originally only used for the linux kernel and git itself, but was quickly adopted by other developers.
          Now it is used by almost 95% of projects that use source control, and has resulted in the creation of multiple successful companies, like github, gitlab and sourceforge.`),
        Header("The basics"),
        Paragraph(
          `To get good with git you don't really have to have a lot of knowledge about it. 
          Most developers don't now that much about git, and if you now these commands, you should be fine in most projects.`
        ),
        List(
          "<code>init</code>",
          "<code>status</code>",
          "<code>add</code>",
          "<code>commit</code>",
          "<code>push</code>",
          "<code>pull</code>"
        ),
        Paragraph(`Everything else is mysterious, and harder to learn`),
      ],
    }),
  ],
});
