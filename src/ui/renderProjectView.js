import { clearMain } from "./dom";

export function renderProjectView(project){
    clearMain();
    const mainContent = document.getElementById("dynamic-content");

    const header = document.createElement("div")
    header.id = "project-view-header";

    const headerButtom= document.createElement('div');
    headerButtom.id = 'header-status-container';
    
    const projectName = document.createElement('p');
    projectName.textContent = project.getTitle();
    projectName.id = "project-header-name";
    
    const projectStatus = document.createElement('p');
    projectStatus.id = "project-header-status";
    projectStatus.textContent = project.getActive()+' активних   '+project.getCompleted()+' завершених';
    
    const addbtn = document.createElement('button');
    addbtn.id = "create-task-btn";
    addbtn.textContent = "+ Додати завдання"

    mainContent.appendChild(header);
    header.appendChild(projectName);
    header.appendChild(headerButtom);
    headerButtom.append(projectStatus);
    headerButtom.append(addbtn);

}
