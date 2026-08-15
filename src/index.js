import "./styles.css";
import { renderCurrentTime } from "./utils/dateUtils";
import { loadStorage, saveStorage } from "./logic/storage";
import { renderProjects } from "./ui/renderProjects";
import { Project, Task } from "./logic/classes";
import { initProjectModal, initTaskModal, initDeleteConfirmModal } from "./ui/modals";
import { initNavigationFilters } from "./ui/modals";
import { renederOverview } from "./ui/renderOverview";
import { initSidebarToggle } from "./ui/dom";

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
initSidebarToggle();
initDeleteConfirmModal();
initNavigationFilters();
renederOverview();

export function clearMain() {
  const main = document.getElementById("dynamic-content");
  main.innerHTML = "";
}
