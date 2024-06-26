import { Course, Section, Page, Header, List, OrderedList, Image, Input, Dropdown, RadioBox, CheckBox, Fieldset, Conditional, Code } from "../func.js";

const code = (e) => `<code class="inline">${e}</code>`;
const link = (e, link) => `<a class="inline link" target="_blank" href="${link}">${e}</a>`;
const color = (e, color) => `<span style="color: ${color};">${e}</span>`;

export default Course({
  id: "git",
  title: "Code management with Git",
  description: `A short but powerfull introduction to Git, while learning some other essential commands.`,
  tags: ["Git", "Source control", "Collaboration"],
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
        Even though it's possible to use git without needing GitHub, you cannot use GitHub without git.`

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
          "git_page_commit_question",
          `What is the purpose of the ${code("commit")} command?`,
          "Before committing files, you are adding all of the changed files. Once you commit, you basically tell git that these changes are final and that they should be saved as a snapshot of your project.",
          RadioBox(`${code("commit")} can be used to log your changes`, true),
          RadioBox(`${code("commit")} can be used to commit to someone`),
          RadioBox(`${code("commit")} can be used to synchronize your code with other people`)
        ),
        Conditional(
          "git_page_commit_question",
          Header("Basic git commands"),
          "In the realm of Git, a handful of commands are utilized far more frequently than others.",
          `These commands include: ${code("add")}, ${code("commit")}, and ${code("status")}. <br>`,

          Header(`${code("add")}`),
          `The ${code("add")} command's use is to update the index of the current content found in the code tree that you are working in.
          Typically, you'll use it to add all changed files, which you can do as follows;`,
          Code(`git add &lt;files&gt;`),
          `${code("&lt;files&gt;")} should be a ${link("glob", "https://en.wikipedia.org/wiki/Glob_(programming)")} pattern, normally you would use ${code(
            "."
          )}, which will add all the files in the directory.`,

          Header(`${code("commit")}`),
          `The ${code("commit")} command creates a new commit in your repository. A commit acts as a snapshot of your project, which git stores.
          Later, if your code stopped working, you can revert back to this snapshot and revert changes made after this commit.
          To be able to distingiush commits from each other, every commit includes a message, in this message you should ideally briefly describe the changes you've made. The command looks like this;`,
          Code(`git commit -m &lt;message&gt;`),
          `In this example, ${code("&lt;message&gt;")} is a string that describes the changes you've made. <br>`,
          `For example;`,
          Code(`git commit -m "Changed speed settings and added background."`),

          Header(`${code("status")}`),
          `The ${code("status")} command displays paths that are different from the index file and the current most recent commit.
          It also displays paths that have differences between the working tree and the index file, and paths in the working tree that are note tracked by git.`,
          `The use of the ${code("status")} is very simple; <br>`,
          Code(`git status`),
          "Example output:",
          Code(`On branch main<br>
                Your branch is up to date with 'origin/main'.<br>
                <br>
                Changes not staged for commit:<br>
                &ensp;  (use "git add &lt;file&gt;..." to update what will be committed)<br>
                &ensp;  (use "git restore &lt;file&gt;..." to discard changes in working directory)<br>
                &ensp;  &ensp;  ${color("modified:   src/data/func.js", "var(--incorrect)")}<br>
                &ensp;  &ensp;  ${color("modified:   src/data/git.data.js", "var(--incorrect)")}<br>
                &ensp;  &ensp;  ${color("modified:   src/data/python.data.js", "var(--incorrect)")}<br>
                &ensp;  &ensp;  ${color("modified:   styles.css", "var(--incorrect)")}
          `)
        )
      ),

      Page(
        "Your first git repository",
        // content
        Header("Time to git started."),
        "In this lesson you'll create your very first git repository, we'll walk you through the setup steps. And you can follow along in your own terminal.",
        Header("Creating the folder"),
        `Creating a folder can be done easily in the file explorer of your OS, but because you are already in the terminal, you might as well learn some commands that you might find usefull later.
        Start off by opening a new terminal, you might notice that it will open up in a location, like your home directory on linux, or your use folder on windows.
        You probably don't want all of your projects in that folder, but in a ${code("project")} folder, or something similar.
        <br><br>`,
        `To create a folder from the terminal you need to use the ${code("mkdir")} command, this commands makes a directory (which you could probably already guess from the command). For example;`,
        Code("mkdir projects"),
        `This creates a new sub-directory (or folder) called ${code("projects")}, however you are still in the same directory as before.
        Another command used often is ${code("cd")}, this commands changes the current directory (see, terminal commands aren't that hard ;) ). So to change into your newly created folder call;`,
        Code("cd projects"),
        `Now that you are in the new folder, you should create another folder to hold your first project. Another thing commonly used in the terminal is the ${code("&&")}.
        You can put this between two commands, and ensures that the second command is run if the first command returns succesfully.
        If you ever forget how a command is used, or what arguments to use, you can call ${code("&lt;command&gt; --help")}, or ${code("man &lt;command&gt;")} if you're on Linux.
        This will almost always explain how to use the command, or what arguments you can use.
        <br><br>`,
        `So knowing that, how would you create the new folder for you project?`,

        Fieldset(
          "git_create_new_folder",
          //
          `How would you create the new folder for you project?`,
          `You can't use commas in this command, so the second one is wrong. 
          But the third one is a bit sneaky, ${code("$_")} is a special parameter that holds the last argument of the previous command.
          However, I never explained that, but remember, you can only learn from mistakes.`,
          //
          CheckBox(`${code("mkdir my_project && cd my_project")}`, true),
          CheckBox(`${code("mkdir my_project, cd my_project")}`),
          CheckBox(`${code(`mkdir my_project && cd "$_"`)}`, true)
        ),

        // dropdown that asks what command to use to create a new git repo
        // they should know to call git --help to find a command that fits

        Fieldset(
          "git_initialize_new_repo",
          //
          "Which command would you use to create a new git repository",
          `${code("git init")} is used to initialize a new git repository, by calling ${code(
            "git --help"
          )} you could see all the available commands, and by searching for a bit you should've seen the init command`,
          //
          Dropdown(3, "git create", "git new", "git clone", "git init")
        ),

        Conditional(
          "git_initialize_new_repo",
          Header("Initializing the git repository"),
          `To initialize the git repository, call the following command:`,
          Code("git init"),
          `This creates a git repository on the branch ${code("master")}, you might find a hint that looks something like the this:`,
          Code(`${color(
            `hint: Using 'master' as the name for the initial branch. This default branch name <br>
        hint: is subject to change. To configure the initial branch name to use in all <br>
        hint: of your new repositories, which will suppress this warning, call: <br>
        hint:  <br>
        hint: 	git config --global init.defaultBranch <name> <br>
        hint:  <br>
        hint: Names commonly chosen instead of 'master' are 'main', 'trunk' and <br>
        hint: 'development'. The just-created branch can be renamed via this command: <br>
        hint:  <br>
        hint: 	git branch -m <name> <br>`,
            "yellow"
          )}
        Initialized empty Git repository in /home/robin/dev/informatica/test/.git/
        `),
          `I will explain later what you should do with this, but for now just keep it as is.`,
          `Now that you've created your repository, git will track changes to files in this directory, as long as the ${code(".git")} folder is not deleted.`
        )
      ),
      Page(
        "Adding your changed files",

        `As explained earlier, adding files to a commit is done by calling the following command;`,
        Code(`git add &lt;files&gt;`),
        Header("Creating a few files"),
        `To create a file in the terminal you need to use the command ${code("touch &lt;files&gt;")}.
        We'll be creating a ${link("markdown", "https://www.markdownguide.org/getting-started/")} file first using the following command.`,
        Code(`touch index.md`),
        `Now that we've created a file, we need some content in it.
        You can add the content using your favorite text editor, or use some terminal tricks to add some content to a file.
        To do this, we will use the ${code("echo")} command and the ${code(">>")} operator. The command will look like this;`,
        Code(`echo "# Hello, world" >> index.md`),
        `This operator will concatenate the output of the first command into the file called ${code("index.md")}.
        And the echo command simply outputs the value of the arguments after it.`,
        `To verify that you added the content succesfully, you can use the ${code("cat")} command, this outputs the contents of a file in to the terminal output.`,
        Code(`cat index.md`),
        `This should output the same content we added earlier.`,
        Header("Checking the status"),
        `Now that we've added a file, we should check if git is tracking it, by calling ${code("git status")}. This should output the following;`,
        Code(`On branch master<br>
        <br>
        No commits yet<br>
        <br>
        Untracked files:<br>
        &ensp;  (use "git add <file>..." to include in what will be committed)<br>
        &ensp;  &ensp;  ${color("index.md", "red")}<br>
          <br>
        nothing added to commit but untracked files present (use "git add" to track)`),

        Header("Adding directories"),
        `Next we're going to add some folders. Add an empty directory called ${code("empty")}, I'll explain later why I've kept this directory empty.`,
        `Also create a directory called ${code("src")}, move into it with ${code("cd")} and create a file called ${code("main.js")}.
        Now you need to move back to the project root, but how would you do that? I've only explained how to go into a subdirectory, but not how to get out of it.`,
        `To do this you need to now a bit more about the ${code("cd")} command, or more specifically, about paths.
        However this is very simple, ${code(".")} in a path represents the current directory, so ${code("..")}, is the previous directory`,

        Fieldset(
          "cd_path_directory_up_syntax",
          "Which command would you use to move up to the project directory",
          `All of the pahts are actually valid, and the result for all of them is the same.`,
          CheckBox(code(".."), true),
          CheckBox(code("../"), true),
          CheckBox(code("./.."), true)
        ),

        Header("Checking the status again"),
        `If you call ${code("git status")} again you can see that ${code("src/main.js")} is added, but our ${code("empty")} directory is not.`,

        Fieldset(
          "git_empty_dir_not_added",
          `Why is the ${code("empty")} directory not added?`,
          `Git doesn't track empty directories, and the name doesn't matter.
          If you wish to add an empty directory, you can add an empty ${code(".gitkeep")} dummy file.`,
          RadioBox(`Git doesn't track directories called empty`),
          RadioBox(`You need to call ${code("git add")} first`),
          RadioBox(`Git doesn't track empty directories`, true)
        ),

        `Finally you can add the the files to commit, by calling the following;`,
        Code("git add ."),
        `This adds all files that follow the glob pattern ${code(".")}, which in this case is every file in this directory and its subdirectories.`
      ),
      Page(
        "Creating your first commit",
        `Creating a commit in git is very simple; after calling ${code("git add")}, you simply call the following command;`,
        Code(`git commit -m "First commit"`),
        `Where the part after ${code("-m")} is the commit message, which is ${code("First commit")} in this case.
        This message is a very common message for the first commit, as you haven't really changed anything but only added some basic files.`
      )
      /* Page(
        "Branches"
        // explain to use main branch by default
        // explain checkout and branch commands
        // explain how to set defualt branch to main
      ) */
    ),
    Section(
      "2. Collaboration",
      Page(
        "Remote editing",
        `For this example we'll be using Github, but other services like, Gitlab and BitBucket, are functionally the same.`,
        Header("Creating an account on github"),
        OrderedList(
          `Head over to ${link("github.com", "https://github.com/signup")} and follow the steps to create your own github account`,
          "Once you've finised the setup, go ahead and press <q>Create Repository</q> in the dropdown of the '+' sign in the top-right corner.",
          Image("/assets/courses/git/create_repo.png"),
          "Fill out the form to create your very first repository.",
          `Copy the ${code(".git")} link found under quick setup, we'll needs this later`,
          Image("/assets/courses/git/quick_setup.png")
        ),

        Header("Adding a remote"),
        `Github is a remote in git's terms, a remote is a place where you can sync your code with and collaborate with other people.
        Open up the terminal in your previously created repository and call the following command`,
        Code("git remote add origin &lt;git url&gt;"),
        `Replace the git url part with the previously copied url, this adds the remote called origin to the repository.`,

        // explain push, pull (and fetch?)
        Header("Preparing to push"),
        `Before pushing our code to github, we should first change our working branch to ${code("main")}, this is related to the warning you were given, when you first called ${code("git init")}
        You can change your branch by calling the following;`,
        Code("git branch -m main"),
        `This changes your working branch to main, in the future when creating a new repository you can actually call;`,
        Code("git init -b main"),
        `To avoid having to switch manually every time.
        But you may we wondering why do I have to do this? Simply put they are conceptually the same thing. 
        The convention just changed; previously the primary branch was called master and for newer repository that defaults to main.`,

        Header("Pushing and pulling"),
        "Pushing your local code to github, or any other remote, is actually very simple, you only need to call the following command",
        Code("git push origin main"),
        `This pushes the latest commit to the remote called origin, and on the branch main.
        After calling this you should almost immediately see the changes on github by refreshing the website.`,

        Fieldset(
          ``,
          `What do you think pulling your code looks like?`,
          `The syntax of the pull command is the same as pushing, it just calls a different action.`,
          RadioBox(code(`git pull -b main`)),
          RadioBox(code(`git pull origin main`), true),
          RadioBox(code(`git get main from origin`))
        )
      )
    ),
  ],
});
