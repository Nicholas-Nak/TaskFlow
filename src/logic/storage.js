import { Projects, Project, Task } from "./classes";

export function saveStorage(appProjects) {
  localStorage.setItem("todoList_data", JSON.stringify(appProjects));
}

export function loadStorage() {
  const data = localStorage.getItem("todoList_data");

  const appProjects = new Projects();

  if (data) {
    const parsedData = JSON.parse(data);

    parsedData.projects.forEach((projData) => {
      const project = new Project(projData.title, projData.id);

      projData.tasks.forEach((taskData) => {
        const task = new Task(taskData.title,taskData.date,taskData.priority, taskData.id, taskData.status);
        project.addTask(task);
      });

      appProjects.addProject(project);
    });
  } else {
    const firstProject = new Project("Базовий");
    appProjects.addProject(firstProject);
    saveStorage(appProjects);
  }
  return appProjects;
}
