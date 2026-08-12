import { NoEmitOnErrorsPlugin } from "webpack";

export class Projects {
  #projects = [];
  quantity = 0;
  addProject(proj) {
    this.#projects.push(proj);
    this.quantity++;
  }
  deleteProject(proj) {
    const idToDelete = proj.id;
    this.#projects = this.#projects.filter((ptoj) => proj.id !== idToDelete);
    this.quantity--;
  }
}

export class Project {
  constructor(title) {
    this.id = crypto.randomUUID();
    this.title = title;
  }
  #active = 0;
  #comleted = 0;
  getTitle() {
    return this.title;
  }
  #tasks = [];
  addTask(task) {
    this.#tasks.push(task);
    this.#active == this.#active++;
  }
  deleteTask(task) {
    const idToDelete = task.id;
    this.#tasks = this.#tasks.filter((task) => task.id !== idToDelete);
    this.#active == this.#active--;
  }
  delete;
  getActive() {
    return this.#active;
  }
}

export class Todo {
  constructor(title, description, priority, notes) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.date = date;
    this.notes = notes;
    this.status = active;
  }
  getTitle(){

  }
  setTitle(){
    
  }
  getDescription(){

  }
}

const Projects = new Projects();
const firstProject = new Project("Базовий");
Projects.addProject(firstProject);

