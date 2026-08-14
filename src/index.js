import "./styles.css";
import { renderCurrentTime } from "./utils/dateUtils";
import { loadStorage, saveStorage } from "./logic/storage";
import { renderProjects } from "./ui/renderProjects";
import { Project, Task } from "./logic/classes";
import { initProjectModal, initTaskModal, initDeleteConfirmModal } from "./ui/modals";
import { initNavigationFilters } from "./ui/modals";

export const appProjects = loadStorage();
export function getAppProjects() {
  return appProjects;
}
const hasBasicProject = appProjects
  .getProjects()
  .some((p) => p.id === "inbox");

if (!hasBasicProject) {
  const basicProject = new Project("Вхідний", "inbox");
  appProjects.addProject(basicProject);
  saveStorage(appProjects);
}


renderCurrentTime();
renderProjects();
initProjectModal();
initTaskModal();
initDeleteConfirmModal();
initNavigationFilters();

export function clearMain() {
  const main = document.getElementById("dynamic-content");
  main.innerHTML = "";
}
