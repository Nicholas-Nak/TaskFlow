import './styles.css';
import { renderCurrentTime } from './time';
import { renderProjectForm } from './addProjectForm';
renderCurrentTime();

function clearMain(){
    const main = document.getElementById("dynamic-content");
    main.innerHTML = '';
}
const Projects = new Projects();
const firstProject = new Project("Базовий");
Projects.addProject(firstProject);

const newProject = document.getElementById("New-project");
newProject.addEventListener("click", ()=>{
    renderProjectForm();
    new
});
