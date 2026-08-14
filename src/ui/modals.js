import { Project, Task } from "../logic/classes";
import { saveStorage } from "../logic/storage";
import { getAppProjects } from "../index";
import { renderProjects } from "./renderProjects";
import { renderProjectView } from "./renderProjectView";

let currentTargetProject = null;
let currentEditingTask = null;

export function openTaskModal(project) {
  currentTargetProject = project;
  currentEditingTask = null;

  const dialog = document.getElementById("task-dialog");
  const form = document.getElementById("task-form");
  const legend = document.getElementById("task-legend");
  const submitBtn = document.getElementById("task-submit");

  form.reset();
  if (legend) {
    legend.textContent = "Створити завдання";
    submitBtn.textContent = "Cтворити";
  }

  dialog.showModal();
}

export function openEditTaskModal(task, project) {
  currentTargetProject = project;
  currentEditingTask = task;

  const dialog = document.getElementById("task-dialog");
  const legend = document.getElementById("task-legend");
  const submitBtn = document.getElementById("task-submit");

  if (legend) {
    legend.textContent = "Редагувати завдання";
    submitBtn.textContent = "Змінити";
  }

  document.getElementById("task-title-input").value = task.getTitle();
  document.getElementById("task-desc-input").value =
    task.getDescription() || "";
  document.getElementById("task-date-input").value = task.getDate() || "";
  document.getElementById("task-priority-select").value =
    task.getPriority() || "";
  document.getElementById("task-notes-input").value = task.getNotes() || "";

  dialog.showModal();
}

export function initTaskModal() {
  const dialog = document.getElementById("task-dialog");
  const closeBtn = document.getElementById("task-close-dialog");
  const form = document.getElementById("task-form");

  closeBtn.addEventListener("click", () => {
    dialog.close();
    form.reset();
    currentEditingTask = null;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("task-title-input").value.trim();
    const desc = document.getElementById("task-desc-input").value.trim();
    const date = document.getElementById("task-date-input").value;
    const priority = document.getElementById("task-priority-select").value;
    const notes = document.getElementById("task-notes-input").value.trim();

    if (title && currentTargetProject) {
      if (currentEditingTask) {
        currentEditingTask.setTitle(title);
        currentEditingTask.setDescription(desc);
        currentEditingTask.setDate(date);
        currentEditingTask.setPriority(priority);
        currentEditingTask.setNotes(notes);
      } else {
        const newTask = new Task(title, date, priority);
        newTask.setDescription(desc);
        newTask.setNotes(notes);
        currentTargetProject.addTask(newTask);
      }
      saveStorage(getAppProjects());
      renderProjectView(currentTargetProject);
      renderProjects();
    }

    dialog.close();
    form.reset();
    currentEditingTask = null;
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
      getAppProjects().addProject(newProject);
      saveStorage(getAppProjects());
      console.log("Створено новий проєкт", getAppProjects().getProjects());
      renderProjects();
    }

    dialog.close();
    form.reset();
  });
}
let projectToDelete = null;

export function openDeleteConfirmModal(project) {
  projectToDelete = project;
  const dialog = document.getElementById("delete-confirm-dialog");
  dialog.showModal();
}

export function initDeleteConfirmModal() {
  const dialog = document.getElementById("delete-confirm-dialog");
  const cancelBtn = document.getElementById("cancel-delete-btn");
  const confirmBtn = document.getElementById("confirm-delete-btn");

  cancelBtn.addEventListener("click", () => {
    projectToDelete = null;
    dialog.close();
  });

  confirmBtn.addEventListener("click", () => {
    if (projectToDelete) {
      getAppProjects().deleteProject(projectToDelete);
      saveStorage(getAppProjects());
      renderProjects();

      const inboxProject = getAppProjects()
        .getProjects()
        .find((p) => p.id === "inbox");
      if (inboxProject) {
        renderProjectView(inboxProject);
      }
    }

    projectToDelete = null;
    dialog.close();
  });
}
