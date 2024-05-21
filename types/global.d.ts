declare namespace Courses {
  interface Course {
    id: string;
    title: string;
    description: string;
    authors: string[];
    sections: Section[];

    insertSidebar(): void;
    render(section: number, page: number): HTMLElement;
  }

  interface Section {
    name: string;
    pages: Page[];
  }

  /**
   * A Page is a part of the course that represents one page in the course.
   * This page can contain multiple parts, information, questions, etc.
   */
  interface Page {
    title: string;
    content: (CourseContent.Content | string)[];
    done: boolean;
    render(): HTMLElement;
  }
}

declare namespace CourseContent {
  interface Content {
    type: string;
    render(): HTMLElement;
  }

  interface Header extends Content {
    type: "header";
    text: string;
  }
  interface Paragraph extends Content {
    type: "paragraph";
    text: string;
  }
  // Optional
  interface Input extends Content {
    type: "input";
  }
  interface Dropdown extends Content {
    type: "dropdown";
    placeholder?: string;
    options: string[];
  }
  interface Fieldset extends Content {
    type: "fieldset";
    question: string;
    items: Content[];
    answered: boolean;
    check(): void;
    render(): HTMLElement;
  }
  interface Conditional extends Content {
    type: "conditional";
    shown: boolean;
    render(): HTMLElement;
  }
  interface MultipleChoice extends Content {
    type: "multipleChoice";
    radio: boolean;
    text: string;
    correct: boolean;
    checked: boolean;
    mark(): void;
    render(group: string): HTMLElement;
  }
}

declare namespace Router {
  type Event = "navigate" | "load";
  type Callback = (e: EventData) => void | boolean;

  interface EventData {
    path: string;
    search: string;
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
