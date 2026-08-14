
import closeIconPath from "../images/free-icon-close-1828747.png";
import editIconPath from "../images/pen.png";
import { saveStorage } from "../logic/storage";
import { renderProjectView } from "./renderProjectView";
import { openDeleteConfirmModal } from "./modals";
import { getAppProjects } from "../index";
export function renderProjects() {
 const allProjects = getAppProjects();
  const projectsContainer = document.getElementById("projects-container");

  projectsContainer.innerHTML = "";

  allProjects.getProjects().forEach((project) => {
    const projContainer = document.createElement("div");
    projContainer.classList.add("project");

    const projBtn = document.createElement("button");
    projBtn.classList.add("inbox");

    const projectNameContainer = document.createElement("div");
    projectNameContainer.classList.add("project-name-container");

    const circleStatus = document.createElement("div");
    circleStatus.classList.add("circle-status-info");

    const projectTitle = document.createElement("span");
    projectTitle.textContent = project.getTitle();

    const activeProjects = document.createElement("span");
    activeProjects.classList.add("quantity-of-inbox");
    activeProjects.textContent = "(" + project.getActive() + ")";

    const editBtn = document.createElement("button");
    editBtn.classList.add("icon-btn", "icon-edit-btn");

    const editImg = document.createElement("img");
    editImg.classList.add("pen-icon");
    editImg.setAttribute("src", editIconPath);
    editBtn.setAttribute("alt", "pen");
if (project.id !== "inbox") {
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("icon-btn", "icon-delete-btn");

    const deleteImg = document.createElement("img");
    deleteImg.classList.add("close-icon");
    deleteImg.setAttribute("src", closeIconPath);
    deleteBtn.setAttribute("alt", "close");
      projContainer.appendChild(deleteBtn);
    deleteBtn.appendChild(deleteImg);
      deleteBtn.addEventListener("click", () => {
    openDeleteConfirmModal(project);
});
}
    projectsContainer.appendChild(projContainer);
    projContainer.appendChild(projBtn);
    projBtn.appendChild(projectNameContainer);
    projectNameContainer.appendChild(circleStatus);
    projectNameContainer.appendChild(projectTitle);
    projBtn.appendChild(activeProjects);
    projContainer.appendChild(editBtn);
    editBtn.appendChild(editImg);

  
    const dialogRename = document.getElementById("project-rename-dialog");
    const renameForm = document.getElementById("project-rename-form");
    const renameInput = document.getElementById("project-rename-input"); 
    const closeRenameBtn = document.getElementById("project-rename-close-dialog");

     projBtn.addEventListener("click", ()=>{
      renderProjectView(project)});



    editBtn.addEventListener("click", () => {
      renameInput.value = project.getTitle(); 
      dialogRename.showModal();
      renameForm.onsubmit = (e) => {
        e.preventDefault();

        const projectRename = renameInput.value.trim();

        if (projectRename) {
          project.setTitle(projectRename);
          saveStorage(allProjects);       
          renderProjects();
          renderProjectView(project);            
        }

        dialogRename.close();
      };
    });

    closeRenameBtn.onclick = () => {
      dialogRename.close();
      renameForm.reset();
    };
  }); 
} 