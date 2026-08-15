import "./styles.css";
import { renderCurrentTime } from "./utils/dateUtils";
import { loadStorage, saveStorage } from "./logic/storage";
import { renderProjects } from "./ui/renderProjects";
import { Project, Task } from "./logic/classes";
import { initProjectModal, initTaskModal, initDeleteConfirmModal, initRenameProjectModal } from "./ui/modals";
import { initNavigationFilters } from "./ui/dom";
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
initRenameProjectModal();
initSidebarToggle();
initDeleteConfirmModal();
initNavigationFilters();
renederOverview();
