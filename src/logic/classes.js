export class Projects {
  #projects = [];
  quantity = 0;

  addProject(proj) {
    this.#projects.push(proj);
    this.quantity++;
  }

  deleteProject(proj) {
    const idToDelete = proj.id;
    this.#projects = this.#projects.filter((p) => p.id !== idToDelete);
    this.quantity--;
  }

  getProjects() {
    return this.#projects;
  }

  toJSON() {
    return {
      projects: this.#projects,
      quantity: this.quantity,
    };
  }
}

export class Project {
  #active = 0;
  #completed = 0;
  #tasks = [];

  constructor(title, id = crypto.randomUUID()) {
    this.id = id;
    this.title = title;
  }
  setTitle(title){
    this.title = title;
  }

  getTitle() {
    return this.title;
  }

  addTask(task) {
    this.#tasks.push(task);
    this.#active++;
  }

  deleteTask(task) {
    const idToDelete = task.id;
    this.#tasks = this.#tasks.filter((task) => task.id !== idToDelete);
    this.#active--;
  }

  getActive() {
    return this.#active;
  }

  setActive(count) {
    this.#active = count;
  }
  getCompleted(){
    return this.#completed;
  }
  getTasks() {
    return this.#tasks;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      active: this.#active,
      completed: this.#completed,
      tasks: this.#tasks,
    };
  }
}

export class Todo {
  #description = "";
  #priority = "";
  #notes = "";

  constructor(title, id = crypto.randomUUID(), status = "active") {
    this.id = id;
    this.title = title;
    this.status = status;
  }

  getTitle() {
    return this.title;
  }

  setTitle(title) {
    this.title = title;
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

  changeStatus(status) {
    this.status = status;
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
      status: this.status,
      description: this.#description,
      priority: this.#priority,
      notes: this.#notes,
    };
  }
}
