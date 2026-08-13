
import "../logic/classes"
import closeIconPath from "../images/free-icon-close-1828747.png";
import editIconPath from "../images/pen.png"
import { loadStorage, saveStorage } from "../logic/storage";
 
export function renderProjects() {
  const allProjects = loadStorage();
  const projectsContainer = document.getElementById('projects-container');
  
  projectsContainer.innerHTML = '';

  allProjects.getProjects().forEach((project) => {
    const projContainer = document.createElement('div');
    projContainer.classList.add('project');
    
    const projBtn = document.createElement('button');
    projBtn.classList.add('project-inbox-btn'); 
    
    const projectNameContainer = document.createElement('div');
    projectNameContainer.classList.add('project-name-container');

    const circleStatus = document.createElement('div');
    circleStatus.classList.add("circle-status-info");

    const projectTitle = document.createElement('span');
    projectTitle.textContent = project.getTitle();

    const activeProjects = document.createElement('span');
    activeProjects.classList.add("quantity-of-inbox"); 
    activeProjects.textContent = '(' + project.getActive() + ')';
    
    const editBtn = document.createElement('button');
    editBtn.classList.add("icon-btn", "edit-btn"); 
    
    const editImg = document.createElement('img');
    editImg.setAttribute("src", editIconPath);
    editBtn.setAttribute("alt", "pen");
    
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('icon-btn', 'delete-btn'); 

    const deleteImg = document.createElement('img');
    deleteImg.setAttribute("src", closeIconPath);
    deleteBtn.setAttribute("alt", "close");

    projectsContainer.appendChild(projContainer);
    projContainer.appendChild(projBtn);
    projBtn.appendChild(projectNameContainer);
    projectNameContainer.appendChild(circleStatus);
    projectNameContainer.appendChild(projectTitle);
    projectNameContainer.appendChild(activeProjects); 
    
    projContainer.appendChild(editBtn);
    editBtn.appendChild(editImg);
    
    projContainer.appendChild(deleteBtn);
    deleteBtn.appendChild(deleteImg);

    deleteBtn.addEventListener('click', () => {
      allProjects.deleteProject(project);
      saveStorage(allProjects);
      renderProjects(); 
    });
  });
}