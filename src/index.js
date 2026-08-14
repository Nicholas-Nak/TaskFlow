import "./styles.css";
import { renderCurrentTime } from "./utils/dateUtils";
import { loadStorage, saveStorage } from "./logic/storage";
import { initProjectModal } from "./ui/modals";
import { renderProjects } from "./ui/renderProjects";
import { Project, Task } from "./logic/classes";
import { initTaskModal } from "./ui/modals";

export const appProjects = loadStorage();

const hasBasicProject = appProjects
  .getProjects()
  .some((p) => p.id === "inbox");

if (!hasBasicProject) {
  const testProject = new Project("Вхідний", "inbox");
  appProjects.addProject(testProject);
  saveStorage(appProjects);
}

renderCurrentTime();
renderProjects();
initProjectModal();
initTaskModal();

export function clearMain() {
  const main = document.getElementById("dynamic-content");
  main.innerHTML = "";
}
