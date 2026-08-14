import { Project, Task } from "../logic/classes";
import { saveStorage } from "../logic/storage";
import { appProjects } from "../index";
import { renderProjects } from "./renderProjects";
import { renderProjectView } from "./renderProjectView";

let currentTargetProject = null;

export function openTaskModal(project) {
  currentTargetProject = project;
  const taskDialog = document.getElementById("task-dialog");
  taskDialog.showModal();
}

export function initTaskModal() {
  const dialog = document.getElementById("task-dialog");
  const closeBtn = document.getElementById("task-close-dialog");
  const form = document.getElementById("task-form");

  closeBtn.addEventListener("click", () => {
    dialog.close();
    form.reset();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("task-title-input").value.trim();
    const desc = document.getElementById("task-desc-input").value.trim();
    const date = document.getElementById("task-date-input").value;
    const priority = document.getElementById("task-priority-select").value;
    const notes = document.getElementById("task-notes-input").value.trim();

    if (title && currentTargetProject) {
      const newTask = new Task(title, date, priority);
      newTask.setDescription(desc);
      newTask.setNotes(notes);

      currentTargetProject.addTask(newTask);

      saveStorage(appProjects);

      renderProjectView(currentTargetProject);
    }

    dialog.close();
    form.reset();
  });
}
export function initProjectModal() {
  const dialog = document.getElementById("project-dialog");
  const openBtn = document.getElementById("New-project");
  const closeBtn = document.getElementById("project-close-dialog");
  const form = document.getElementById("project-form");
  const input = document.getElementById("project-input");

  openBtn.addEventListener("click", () => {
    dialog.showModal();
  });

  closeBtn.addEventListener("click", () => {
    dialog.close();
    form.reset();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const projectName = input.value.trim();

    if (projectName) {
      const newProject = new Project(projectName);
      appProjects.addProject(newProject);
      saveStorage(appProjects);
      console.log("Створено новий проєкт", appProjects.getProjects());
      renderProjects();
    }

    dialog.close();
    form.reset();
  });
}
