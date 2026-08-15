import { clearMain } from "./dom";
import { openTaskModal } from "./modals";
import {
  handleEditTask,
  handleDeleteTask,
  handleViewDetails,
} from "./taskActions";
import { renderProjects } from "./renderProjects";
import { findProjectByTask } from "../utils/dateUtils";
import { getAppProjects } from "..";
import { saveStorage } from "../logic/storage";



function createTaskElement(task, project, isFilteredView = false) {
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
  taskDate.textContent = task.getDate() || "Без терміну";

  const taskPriority = document.createElement("span");
  taskPriority.classList.add("task-priority");
  if (task.getPriority()) {
    taskPriority.classList.add(`priority-${task.getPriority().toLowerCase()}`);
    taskPriority.textContent = task.getPriority().toUpperCase();
  }

  metaContainer.appendChild(taskDate);
  metaContainer.appendChild(taskPriority);

  if (isFilteredView) {
    const projectBadge = document.createElement("span");
    projectBadge.classList.add("task-date");
    projectBadge.textContent = `📁 ${project ? project.getTitle() : "Невідомо"}`;
    projectBadge.style.marginLeft = "10px";
    metaContainer.appendChild(projectBadge);
  }

  infoContainer.appendChild(taskTitle);
  infoContainer.appendChild(metaContainer);

  const actionsContainer = document.createElement("div");
  actionsContainer.classList.add("task-actions");

  const detailsBtn = document.createElement("button");
  detailsBtn.textContent = "Деталі";
  detailsBtn.classList.add("task-btn", "details-btn");
  detailsBtn.addEventListener("click", () => handleViewDetails(task, project));

  const editBtn = document.createElement("button");
  editBtn.textContent = "Редагувати";
  editBtn.classList.add("task-btn", "edit-btn");
  editBtn.addEventListener("click", () => handleEditTask(task, project));

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Видалити";
  deleteBtn.classList.add("task-btn", "delete-btn");
  deleteBtn.addEventListener("click", () => handleDeleteTask(task, project));

  actionsContainer.appendChild(detailsBtn);
  actionsContainer.appendChild(editBtn);
  actionsContainer.appendChild(deleteBtn);

  taskCard.appendChild(checkbox);
  taskCard.appendChild(infoContainer);
  taskCard.appendChild(actionsContainer);

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      taskCard.classList.add("completed");
      task.setCompleted(true);
    } else {
      taskCard.classList.remove("completed");
      task.setCompleted(false);
    }
    const projectStatus = document.getElementById("project-header-status");
    if (projectStatus && !isFilteredView) {
      projectStatus.textContent = project.getActive() + " активних   " + project.getCompleted() + " завершених";
    }

    saveStorage(getAppProjects());
    renderProjects();
  });

  return taskCard;
}

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

  function displayTasks(tasksArray) {
    tasksContainer.innerHTML = "";

    if (tasksArray.length === 0) {
      const emptyMsg = document.createElement("p");
      emptyMsg.textContent = "Завдань не знайдено.";
      emptyMsg.style.textAlign = "center";
      emptyMsg.style.color = "#64748b";
      emptyMsg.style.marginTop = "2rem";
      tasksContainer.appendChild(emptyMsg);
      return;
    }

    tasksArray.forEach((task) => {
      const taskCard = createTaskElement(task, project, false);
      tasksContainer.appendChild(taskCard);
    });
  }

  function updateTasksView() {
    const searchTerm = searchInputText.value.toLowerCase();
    const sortValue = searchSelect.value;

    let processedTasks = project.getTasks().filter((task) => {
      return task.getTitle().toLowerCase().includes(searchTerm);
    });

    processedTasks.sort((a, b) => {
      if (sortValue === "title") {
        return a.getTitle().localeCompare(b.getTitle());
      } else if (sortValue === "priority") {
        const weight = { high: 3, medium: 2, low: 1 };
        const weightA = weight[a.getPriority().toLowerCase()] || 0;
        const weightB = weight[b.getPriority().toLowerCase()] || 0;
        return weightB - weightA;
      } else if (sortValue === "daedlineDate") {
        if (!a.getDate()) return 1;
        if (!b.getDate()) return -1;
        return new Date(a.getDate()) - new Date(b.getDate());
      } else if (sortValue === "creatDate") {
        return b.getCreatedAt() - a.getCreatedAt();
      }
      return 0;
    });

    displayTasks(processedTasks);
  }

  searchInputText.addEventListener("input", updateTasksView);
  searchSelect.addEventListener("change", updateTasksView);

  updateTasksView();
}

export function renderFilteredView(titleText, subtitleText, tasksArray) {
  clearMain();
  const mainContent = document.getElementById("dynamic-content");

  const header = document.createElement("div");
  header.id = "project-view-header";

  const titleContainer = document.createElement("div");

  const projectName = document.createElement("p");
  projectName.textContent = titleText;
  projectName.id = "project-header-name";

  const projectSubtitle = document.createElement("p");
  projectSubtitle.textContent = subtitleText;
  projectSubtitle.classList.add("project-header-subtitle");

  titleContainer.appendChild(projectName);
  titleContainer.appendChild(projectSubtitle);

  const headerBottom = document.createElement("div");
  headerBottom.id = "header-status-container";

  const projectStatus = document.createElement("p");
  projectStatus.id = "project-header-status";
  projectStatus.textContent = `Всього завдань: ${tasksArray.length}`;

  mainContent.appendChild(header);
  header.appendChild(titleContainer);
  header.appendChild(headerBottom);
  headerBottom.append(projectStatus);

  const tasksContainer = document.createElement("div");
  tasksContainer.id = "tasks-list-container";
  mainContent.appendChild(tasksContainer);

  if (tasksArray.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.classList.add("empty-state-container");

    const emptyIcon = document.createElement("div");
    emptyIcon.classList.add("empty-state-icon");
    emptyIcon.innerHTML = "📭";

    const emptyTitle = document.createElement("h3");
    emptyTitle.textContent = "Тут нічого немає";

    const emptyDesc = document.createElement("p");
    emptyDesc.textContent = "Наразі в цьому поданні немає завдань.";

    emptyState.append(emptyIcon, emptyTitle, emptyDesc);
    tasksContainer.appendChild(emptyState);
    return;
  }

  tasksArray.forEach((task) => {
    const originalProject = findProjectByTask(task, getAppProjects());
    const taskCard = createTaskElement(task, originalProject, true);
    tasksContainer.appendChild(taskCard);
  });
}