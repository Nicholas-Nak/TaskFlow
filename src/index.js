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
  .some((p) => p.getTitle() === "Basic");

if (!hasBasicProject) {
  const testProject = new Project("Basic");

  const task1 = new Task("Суда", "2026-08-15", "High");
  const task2 = new Task("Спати", "2026-08-20", "Medium");
  const task3 = new Task("Пофіксити", "", "Low");

  task3.setCompleted(true);

  testProject.addTask(task1);
  testProject.addTask(task2);
  testProject.addTask(task3);

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
