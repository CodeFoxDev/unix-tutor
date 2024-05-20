declare namespace Courses {
  interface Course {
    name: string;
    title: string;
    description: string;
    pages: Page[];
  }

  /**
   * A Page is a part of the course that represents one page in the course.
   * This page can contain multiple parts, information, questions, etc.
   */
  interface Page {
    title: string;
    content: CourseContent.Content[];
    render(): Element;
  }
}

declare namespace CourseContent {
  interface Content {
    type: string;
    render(): Element;
  }

  interface Header extends Content {
    type: "header";
    text: string;
  }
  interface Paragraph extends Content {
    type: "paragraph";
    text: string;
  }
  interface List extends Content {
    type: "paragraph";
    items: string[];
  }
  interface Code extends Content {
    type: "code";
    text: string;
  }
  interface Input extends Content {
    type: "input";
  }
  interface Dropdown extends Content {
    type: "dropdown";
    placeholder?: string;
    options: string[];
  }
  interface MultipleChoice extends Content {
    type: "multipleChoice";
    radio: boolean;
  }
}

declare namespace Router {
  type Event = "navigate" | "load";
  type Callback = (e: EventData) => void | boolean;

  interface EventData {
    path: string;
  }

  interface Listener {
    event: Event;
    cb: Callback;
  }

  interface Page {
    path: string;
    data: string;
  }
}
