import { ta } from "date-fns/locale";
import { clearMain } from "./dom";
import { openTaskModal } from "./modals";
import {
  handleEditTask,
  handleDeleteTask,
  handleViewDetails,
} from "./taskActions";
import { renderProjects } from "./renderProjects";

export function renderProjectView(project) {
  clearMain();
  const mainContent = document.getElementById("dynamic-content");

  const header = document.createElement("div");
  header.id = "project-view-header";

  const headerButtom = document.createElement("div");
  headerButtom.id = "header-status-container";

  const projectName = document.createElement("p");
  projectName.textContent = project.getTitle();
  projectName.id = "project-header-name";

  const projectStatus = document.createElement("p");
  projectStatus.id = "project-header-status";
  projectStatus.textContent =
    project.getActive() +
    " активних   " +
    project.getCompleted() +
    " завершених";

  const addbtn = document.createElement("button");
  addbtn.id = "create-task-btn";
  addbtn.textContent = "+ Додати завдання";
  addbtn.addEventListener("click", () => {
    openTaskModal(project);
  });

  mainContent.appendChild(header);
  header.appendChild(projectName);
  header.appendChild(headerButtom);
  headerButtom.append(projectStatus);
  headerButtom.append(addbtn);

  const searchContainer = document.createElement("div");
  searchContainer.id = "search-container";

  const searchInputText = document.createElement("input");
  searchInputText.id = "search-input-text";
  searchInputText.setAttribute("placeholder", "Пошук завдань...");
  searchInputText.setAttribute("type", "text");

  const searchSelect = document.createElement("select");
  searchSelect.setAttribute("name", "prioryty");
  searchSelect.id = "priority-select";

  const searchPriority1 = document.createElement("option");
  searchPriority1.textContent = "Пріоритет";
  searchPriority1.setAttribute("value", "priority");

  const searchPriority2 = document.createElement("option");
  searchPriority2.textContent = "Дата виконання";
  searchPriority2.setAttribute("value", "daedlineDate");

  const searchPriority3 = document.createElement("option");
  searchPriority3.textContent = "Дата створення";
  searchPriority3.setAttribute("value", "creatDate");

  const searchPriority4 = document.createElement("option");
  searchPriority4.textContent = "Назва";
  searchPriority4.setAttribute("value", "title");

  mainContent.appendChild(searchContainer);
  searchContainer.appendChild(searchInputText);
  searchContainer.appendChild(searchSelect);
  searchSelect.appendChild(searchPriority1);
  searchSelect.appendChild(searchPriority2);
  searchSelect.appendChild(searchPriority3);
  searchSelect.appendChild(searchPriority4);

  const tasksContainer = document.createElement("div");
  tasksContainer.id = "tasks-list-container";
  mainContent.appendChild(tasksContainer);

  project.getTasks().forEach((task) => {
    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.classList.add("task-checkbox");

    if (task.isCompleted()) {
      checkbox.checked = true;
      taskCard.classList.add("completed");
    }
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("task-info");

    const taskTitle = document.createElement("span");
    taskTitle.classList.add("task-title");
    taskTitle.textContent = task.getTitle();

    const metaContainer = document.createElement("div");
    metaContainer.classList.add("task-meta");

    const taskDate = document.createElement("span");
    taskDate.classList.add("task-date");
    taskDate.textContent = task.getDate() || "Без терміну погашення";

    const taskPriority = document.createElement("span");
    taskPriority.classList.add("task-priority");
    taskPriority.classList.add(`priority-${task.getPriority().toLowerCase()}`);
    taskPriority.textContent = task.getPriority().toUpperCase();

    metaContainer.appendChild(taskDate);
    metaContainer.appendChild(taskPriority);
    infoContainer.appendChild(taskTitle);
    infoContainer.appendChild(metaContainer);

    const actionsContainer = document.createElement("div");
    actionsContainer.classList.add("task-actions");

    const detailsBtn = document.createElement("button");
    detailsBtn.textContent = "Деталі";
    detailsBtn.classList.add("task-btn", "details-btn");
    detailsBtn.addEventListener("click", () =>
      handleViewDetails(task, project),
    );

    const editBtn = document.createElement("button");
    editBtn.textContent = "Редагувати";
    editBtn.classList.add("task-btn", "edit-btn");
    editBtn.addEventListener("click", () => {
      handleEditTask(task, project);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Видалити";
    deleteBtn.classList.add("task-btn", "delete-btn");
    deleteBtn.addEventListener("click", () => {
      handleDeleteTask(task, project);
    });

    actionsContainer.appendChild(detailsBtn);
    actionsContainer.appendChild(editBtn);
    actionsContainer.appendChild(deleteBtn);

    taskCard.appendChild(checkbox);
    taskCard.appendChild(infoContainer);
    taskCard.appendChild(actionsContainer);

    tasksContainer.appendChild(taskCard);

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        taskCard.classList.add("completed");
        task.setCompleted(true);
      } else {
        taskCard.classList.remove("completed");
        task.setCompleted(false);
      }
      const projectStatus = document.getElementById("project-header-status");
      if (projectStatus) {
        projectStatus.textContent =
          project.getActive() +
          " активних   " +
          project.getCompleted() +
          " завершених";
      }
      renderProjects();
    });
  });
}
