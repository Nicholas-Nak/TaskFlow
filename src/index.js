import "./styles.css";
import { renderCurrentTime } from "./utils/dateUtils";
import { loadStorage } from "./logic/storage";
import { initProjectModal } from "./ui/modals";

renderCurrentTime();

export const appProjects = loadStorage(); 

//initProjectModal();

function clearMain() {
  const main = document.getElementById("dynamic-content");
  main.innerHTML = "";
}