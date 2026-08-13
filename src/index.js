import "./styles.css";
import { renderCurrentTime } from "./utils/dateUtils";
import { loadStorage } from "./logic/storage";
import { initProjectModal } from "./ui/modals";

renderCurrentTime();

export const appProjects = loadStorage(); 

//initProjectModal();
const dialog = document.getElementById("project-dialog");
const openBtn = document.getElementById("New-project");
openBtn.addEventListener("click", () => {
    dialog.showModal();
  });

function clearMain() {
  const main = document.getElementById("dynamic-content");
  main.innerHTML = "";
}