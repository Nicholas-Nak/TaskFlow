import { loadStorage } from "../logic/storage";
import "../logic/classes"
import closeIconPath from "../images/free-icon-close-1828747.png";
import editIconPath from "../images/pen.png"
 
export function renderProjects(){
   const  allProjects = loadStorage();
   const projectsContainer = document.getElementById('projects-container');
   projectsContainer.innerHTML = '';
   allProjects.getProjects().forEach((project)=>{ 
    const  projContainer = document.createElement('div');
    projContainer.classList.add('project');
    
    const projBtn = document.createElement('button');
    projBtn.id ='inbox';
    
    const projectNameContainer = document.createElement('div');
    projectNameContainer.classList.add('project-name-container');

    const circleStatus = document.createElement('div');
    circleStatus.classList.add("circle-status-info");

    const projectTitle = document.createElement('span');
    projectTitle.textContent = project.getTitle();

    const activeProjects = document.createElement('span');
    activeProjects.id = "quantity-of-inbox";
    activeProjects.textContent = '('+project.getActive()+')';
    
    const editBtn = document.createElement('button');
    editBtn.id = 'icon-edit-btn';
    editBtn.classList.add("icon-btn");
    
    const editImg = document.createElement('img');
    editImg.id = 'pen-icon';
    editImg.setAttribute("src", editIconPath);
    editBtn.setAttribute("alt","pen");
    
    const deleteBtn = document.createElement('button');
    deleteBtn.id = "icon-delete-btn";
    deleteBtn.classList.add('icon-btn');

    const deleteImg = document.createElement('img');
    deleteImg.id = 'close-icon';
    deleteImg.setAttribute("src",closeIconPath);
    deleteBtn.setAttribute("alt","close");

    
     
    projectsContainer.appendChild(projContainer);
    projContainer.appendChild(projBtn);
    projBtn.appendChild(projectNameContainer);
    projectNameContainer.appendChild(circleStatus);
    projectNameContainer.appendChild(projectTitle);
    projContainer.appendChild(editBtn);
    editBtn.appendChild(editImg);
    projContainer.appendChild(deleteBtn);
    deleteBtn.appendChild(deleteImg);

   });
   

}