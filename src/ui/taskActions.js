import { getAppProjects } from "../index";
import { saveStorage } from "../logic/storage";
import { renderProjectView } from "./renderProjectView";
import { renderProjects } from "./renderProjects";
import { openEditTaskModal } from "./modals";

export function handleDeleteTask(task, project) {
  project.deleteTask(task);
  saveStorage(getAppProjects());
  renderProjectView(project);
  renderProjects();
}

export function handleViewDetails(task, project) {
  const mainContent = document.getElementById("dynamic-content");
  mainContent.innerHTML = "";

  const detailsCard = document.createElement("div");
  detailsCard.classList.add("task-details-card");

  const backBtn = document.createElement("button");
  backBtn.classList.add("details-back-btn");
  backBtn.textContent = "← Назад";
  backBtn.addEventListener("click", () => {
    renderProjectView(project);
  });

  const title = document.createElement("h2");
  title.classList.add("details-title");
  title.textContent = task.getTitle();

  const metaInfo = document.createElement("div");
  metaInfo.classList.add("details-meta");

  const statusObj = document.createElement("p");
  const statusText = task.isCompleted() ? "Завершено" : "Активне";
  statusObj.innerHTML = `Статус: <span>${statusText}</span>`;

  const priorityObj = document.createElement("p");
  const priorityText = task.getPriority()
    ? task.getPriority().toUpperCase()
    : "Немає";
  priorityObj.innerHTML = `Пріоритет: <span>${priorityText}</span>`;

  const dueDateObj = document.createElement("p");
  const dateText = task.getDate() ? task.getDate() : "Без терміну";
  dueDateObj.innerHTML = `Дата виконання: <span>${dateText}</span>`;

  metaInfo.append(statusObj, priorityObj, dueDateObj);

  const hr1 = document.createElement("hr");

  const descTitle = document.createElement("h3");
  descTitle.textContent = "Опис";
  const descText = document.createElement("p");
  descText.classList.add("details-text");
  descText.textContent = task.getDescription() || "Опис відсутній.";

  const hr2 = document.createElement("hr");

  const notesTitle = document.createElement("h3");
  notesTitle.textContent = "Нотатки";
  const notesText = document.createElement("p");
  notesText.classList.add("details-text");
  notesText.textContent = task.getNotes() || "Нотатки відсутні.";

  const editBtn = document.createElement("button");
  editBtn.classList.add("details-edit-btn");
  editBtn.textContent = "Редагувати завдання";
  editBtn.addEventListener("click", () => {
    handleEditTask(task, project);
  });

  detailsCard.append(
    backBtn,
    title,
    metaInfo,
    hr1,
    descTitle,
    descText,
    hr2,
    notesTitle,
    notesText,
    editBtn,
  );

  mainContent.appendChild(detailsCard);
}

export function handleEditTask(task, project) {
  openEditTaskModal(task, project);
}
