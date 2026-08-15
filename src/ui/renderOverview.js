import { subMilliseconds } from "date-fns";
import { getAppProjects } from "..";
import { Project } from "../logic/classes";
import { clearMain } from "..";
import activeImg from "../images/active.png";
import sunImg from "../images/sunny.png";
import clockImg from "../images/clock.png";
import tickImg from "../images/tick.png";
import { getTodayTasks, getFutureTasks, getCompletedTasks } from "../utils/dateUtils";
function getTotalActive(){
    const projectsRef = getAppProjects();
    const projects = projectsRef.getProjects();
    let total = 0;
    for(let proj of projects){
        total += proj.getActive();
    }
    return total;
}
function getTodayTotal(){
 return getTodayTasks(getAppProjects()).length;
}
function getFutureTotal(){
 return getFutureTasks(getAppProjects()).length;
}
function getCompletedTotal(){
 return getCompletedTasks(getAppProjects()).length;
}

export function renederOverview(){
    clearMain();
 
 const mainContainer = document.getElementById("dynamic-content");
 const mainContentWrapper = document.createElement('div');
 mainContentWrapper.id = "overview-content-wrapper";
 mainContainer.appendChild(mainContentWrapper);
 const headContainer = document.createElement('div');
 headContainer.id = "overview-head-container"

 const headTitle = document.createElement("p");
 headTitle.id = "overview-head-title";
 headTitle.textContent = "Знайди час на те, що важливо"

 const headDescription = document.createElement('p');
 headDescription.id = "overview-head-description";
 headDescription.textContent = "Вдумливий огляд вашого дня, зібраний в одному спокійному місці.";

 mainContentWrapper.appendChild(headContainer);
 headContainer.appendChild(headTitle);
 headContainer.appendChild(headDescription);

 const contentContainer = document.createElement('div');
 contentContainer.id = "overview-main-contaier";

 const firstRowContainer = document.createElement('div');
 firstRowContainer.id = "first-statistic-row";

 const activeConianer = document.createElement('div');
 activeConianer.classList.add("statisctic-container");

 const activePng = document.createElement('img');
 activePng.setAttribute("src",activeImg)
 activePng.setAttribute("alt", "star");
 activePng.classList.add("statistic-logo");

 const activeSpan = document.createElement('span');
 activeSpan.textContent = "Активні завдання";
 activeSpan.classList.add("statistic-span");

 const activeNumber = document.createElement('span');
 activeNumber.classList.add("statistic-number");
 activeNumber.textContent = getTotalActive();
 

 mainContentWrapper.appendChild(contentContainer);
 contentContainer.appendChild(firstRowContainer);
 firstRowContainer.appendChild(activeConianer);
 activeConianer.appendChild(activePng);
 activeConianer.appendChild(activeSpan);
 activeConianer.appendChild(activeNumber);

 
 const todayConianer = document.createElement('div');
 todayConianer.classList.add("statisctic-container");

 const todayPng = document.createElement('img');
 todayPng.setAttribute("src",sunImg);
 todayPng.setAttribute("alt", "sun");
 todayPng.classList.add("statistic-logo");

 const todaySpan = document.createElement('span');
 todaySpan.textContent = "Термін закінчення сьогодні";
 todaySpan.classList.add("statistic-span");

 const todayNumber = document.createElement('span');
 todayNumber.classList.add("statistic-number");
 todayNumber.textContent = getTodayTotal();

 firstRowContainer.appendChild(todayConianer);
 todayConianer.appendChild(todayPng);
 todayConianer.appendChild(todaySpan);
 todayConianer.appendChild(todayNumber);

  const futureConianer = document.createElement('div');
 futureConianer.classList.add("statisctic-container");

 const futurePng = document.createElement('img');
 futurePng.setAttribute("src",clockImg)
 futurePng.setAttribute("alt", "clock");
 futurePng.classList.add("statistic-logo");

 const futureSpan = document.createElement('span');
 futureSpan.textContent = "Майбутні";
 futureSpan.classList.add("statistic-span");

 const futureNumber = document.createElement('span');
 futureNumber.classList.add("statistic-number");
 futureNumber.textContent = getFutureTotal();

 firstRowContainer.appendChild(futureConianer);
 futureConianer.appendChild(futurePng);
 futureConianer.appendChild(futureSpan);
 futureConianer.appendChild(futureNumber);

  const completedConianer = document.createElement('div');
 completedConianer.classList.add("statisctic-container");

 const completedPng = document.createElement('img');
 completedPng.setAttribute("src",tickImg)
 completedPng.setAttribute("alt", "tick");
 completedPng.classList.add("statistic-logo");

 const completedSpan = document.createElement('span');
 completedSpan.textContent = "Завершені";
 completedSpan.classList.add("statistic-span");

 const completedNumber = document.createElement('span');
 completedNumber.classList.add("statistic-number");
 completedNumber.textContent = getCompletedTotal();
 firstRowContainer.appendChild(completedConianer);
 completedConianer.appendChild(completedPng);
 completedConianer.appendChild(completedSpan);
 completedConianer.appendChild(completedNumber);
 const secondRowContainer = document.createElement('div');
  secondRowContainer.id = "second-statistic-row";

  const reminderCard = document.createElement('div');
  reminderCard.classList.add("overview-card", "reminder-card");

  const reminderEyebrow = document.createElement('span');
  reminderEyebrow.classList.add("card-eyebrow");
  reminderEyebrow.textContent = "НІЖНЕ НАГАДУВАННЯ";

  const reminderTitle = document.createElement('h3');
  reminderTitle.classList.add("card-title");
  reminderTitle.textContent = "Маленькі кроки все одно рухають вас вперед.";

  const reminderText = document.createElement('p');
  reminderText.classList.add("card-text");
  reminderText.textContent = "Виберіть одне значуще завдання, приділіть йому всю свою увагу, а решта нехай зачекає своєї черги.";

  reminderCard.append(reminderEyebrow, reminderTitle, reminderText);

  const progressCard = document.createElement('div');
  progressCard.classList.add("overview-card", "progress-card");

  const progressEyebrow = document.createElement('span');
  progressEyebrow.classList.add("card-eyebrow");
  progressEyebrow.textContent = "З ПЕРШОГО ПОГЛЯДУ";

  const progressTitle = document.createElement('h3');
  progressTitle.classList.add("card-title");
  progressTitle.textContent = "Ваш прогрес";

  const totalTasksCount = getTotalActive() + getCompletedTotal();
  const progressPercent = totalTasksCount === 0 ? 0 : Math.round((getCompletedTotal() / totalTasksCount) * 100);

  const progressBarContainer = document.createElement('div');
  progressBarContainer.classList.add("progress-bar-container");

  const progressBarFill = document.createElement('div');
  progressBarFill.classList.add("progress-bar-fill");
  progressBarFill.style.width = `${progressPercent}%`; 
  progressBarContainer.appendChild(progressBarFill);

  const progressStats = document.createElement('div');
  progressStats.classList.add("progress-stats");

  const percentText = document.createElement('span');
  percentText.innerHTML = `<strong>${progressPercent}%</strong> завершено`;

  const projectsText = document.createElement('span');
  const projectsCount = getAppProjects().getProjects().length;
  projectsText.textContent = `${projectsCount} проєкти(ів)`;

  progressStats.append(percentText, projectsText);

  const progressFooter = document.createElement('div');
  progressFooter.classList.add("progress-footer");
  progressFooter.innerHTML = `<span><strong>0</strong> прострочених</span> &middot; <span><strong>0</strong> високий пріоритет</span>`;

  progressCard.append(progressEyebrow, progressTitle, progressBarContainer, progressStats, progressFooter);

  secondRowContainer.append(reminderCard, progressCard);
  contentContainer.appendChild(secondRowContainer);
}