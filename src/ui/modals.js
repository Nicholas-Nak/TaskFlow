
import { Project } from "../logic/classes";
import { saveStorage } from "../logic/storage"; 
import { appProjects } from "../index";
import { renderProjects } from "./renderProjects";

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