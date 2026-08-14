export class Projects {
  #projects = [];

  addProject(proj) {
    this.#projects.push(proj);
  }

  deleteProject(proj) {
    const idToDelete = proj.id;
    this.#projects = this.#projects.filter((p) => p.id !== idToDelete);
  }

  getProjects() {
    return this.#projects;
  }

  getQuantity() {
    return this.#projects.length;
  }

  toJSON() {
    return {
      projects: this.#projects,
    };
  }
}

export class Project {
  #tasks = [];

  constructor(title, id = crypto.randomUUID()) {
    this.id = id;
    this.title = title;
  }

  setTitle(title) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }

  addTask(task) {
    this.#tasks.push(task);
  }

  deleteTask(task) {
    const idToDelete = task.id;
    this.#tasks = this.#tasks.filter((task) => task.id !== idToDelete);
  }

  getActive() {
    return this.#tasks.filter((task) => task.getStatus() === "active").length;
  }

  getCompleted() {
    return this.#tasks.filter((task) => task.getStatus() === "completed").length;
  }

  getTasks() {
    return this.#tasks;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      tasks: this.#tasks,
    };
  }
}

export class Task {
  #description = "";
  #priority = "";
  #notes = "";
  #date = "";

  constructor(title, date = "", priority = "", id = crypto.randomUUID(), status = "active") {
    this.id = id;
    this.title = title;
    this.#date = date;
    this.#priority = priority;
    this.status = status;
  }

  getTitle() {
    return this.title;
  }

  setTitle(title) {
    this.title = title;
  }

  getDate() {
    return this.#date;
  }

  setDate(date) {
    this.#date = date;
  }

  getDescription() {
    return this.#description;
  }

  setDescription(desk) {
    this.#description = desk;
  }

  getStatus() {
    return this.status;
  }

  setActive() {
    this.status = "active";
  }

  isCompleted() {
    return this.status === "completed";
  }

  setCompleted(isComplete) {
    this.status = isComplete ? "completed" : "active";
  }

  getPriority() {
    return this.#priority;
  }

  setPriority(prior) {
    this.#priority = prior;
  }

  getNotes() {
    return this.#notes;
  }

  setNotes(note) {
    this.#notes = note;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      date: this.#date,
      status: this.status,
      description: this.#description,
      priority: this.#priority,
      notes: this.#notes,
    };
  }
}