declare namespace Courses {
  interface Course {
    id: string;
    title: string;
    description: string;
    tags: string[];
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
    questions: number;
    totalScore: number;
    render(): HTMLElement;
    load(): void;
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
  interface Fieldset extends Content {
    type: "fieldset";
    question: string;
    items: Content[];
    answered: boolean;
    score: number;
    check(): void;
    render(): HTMLElement;
    load(): void;
  }
  interface Conditional extends Content {
    type: "conditional";
    shown: boolean;
    render(): HTMLElement;
    load(): void;
  }
  interface Dropdown extends Content {
    type: "dropdown";
    options: string[];
    selected: string;
    correct: string;
    score: number;
    answered: boolean;
    render(): HTMLElement;
    load(data: string): void;
  }
  interface MultipleChoice extends Content {
    type: "radiobox" | "checkbox";
    radio: boolean;
    text: string;
    correct: boolean;
    checked: boolean;
    answered: boolean;
    mark(answered = false): void;
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

declare namespace State {
  interface Question {
    score: number;
    answered: boolean;
    answers: [];
  }

  interface Page {
    score: number;
    questions: Question[];
    done: boolean;
  }
}
