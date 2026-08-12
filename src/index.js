import "./styles.css";
import { renderCurrentTime } from "./time";
import { renderProjectForm } from "./addProjectForm";
import { Projects, Project, Todo } from "./classes";

renderCurrentTime();
let appProjects = new Projects();

export function saveStorage() {
  localStorage.setItem("todoList_data", JSON.stringify(appProjects));
}
function loadStorage() {
  const data = localStorage.getItem("todoList_data");

  if (data) {
    const parsedData = JSON.parse(data);
    parsedData.projects.forEach((projData) => {
      const project = new Project(projData.title, projData.id);
      projData.tasks.forEach((taskData) => {
        const task = new Todo(taskData.title, taskData.id, taskData.status);
        project.addTask(task);
      });

      appProjects.addProject(project);
    });
  } else {
    const firstProject = new Project("Базовий");
    appProjects.addProject(firstProject);
    saveStorage();
  }
}
loadStorage();

function clearMain() {
  const main = document.getElementById("dynamic-content");
  main.innerHTML = "";
}
const newProjectBtn = document.getElementById("New-project");
newProjectBtn.addEventListener("click", () => {
  renderProjectForm();
});
