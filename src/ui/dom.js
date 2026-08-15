import { getAppProjects } from "../index";
import { renederOverview } from "./renderOverview";
import { renderFilteredView } from "./renderProjectView";
import { getTodayTasks, getFutureTasks, getCompletedTasks } from "../utils/dateUtils";

export function clearMain() {
  const main = document.getElementById("dynamic-content");
  main.innerHTML = "";
}

export function initSidebarToggle() {
    const toggleBtn = document.getElementById('sidebar-toggle');
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('sidebar-collapsed');
        });
    }
}

export function initNavigationFilters() {
    const overviewBtn = document.getElementById("btn-overview");
    const todayBtn = document.getElementById("btn-today");
    const upcomingBtn = document.getElementById("btn-upcoming");
    const completedBtn = document.getElementById("btn-completed");

    if (overviewBtn) {
        overviewBtn.addEventListener("click", () => {
            renederOverview();
        });
    }
    if (todayBtn) {
        todayBtn.addEventListener("click", () => {
            const todayTasks = getTodayTasks(getAppProjects());
            renderFilteredView("Сьогодні", "Завдання, які потрібно виконати сьогодні.", todayTasks);
        });
    }
    if (upcomingBtn) {
        upcomingBtn.addEventListener("click", () => {
            const futureTasks = getFutureTasks(getAppProjects());
            renderFilteredView("Майбутні", "Завдання, заплановані на завтра і пізніше.", futureTasks);
        });
    }
    if (completedBtn) {
        completedBtn.addEventListener("click", () => {
            const completedTasks = getCompletedTasks(getAppProjects());
            renderFilteredView("Завершено", "Список усіх виконаних завдань.", completedTasks);
        });
    }
}