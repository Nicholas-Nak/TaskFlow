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
    
    const searchContainer = document.createElement("div");
    searchContainer.id = "search-container";
    
    const searchInputText = document.createElement('input');
    searchInputText.id = "search-input-text";
    searchInputText.setAttribute("placeholder","Пошук завдань...");
    searchInputText.setAttribute("type","text");

    const searchSelect = document.createElement("select");
    searchSelect.setAttribute('name','prioryty');
    searchSelect.id = "priority-select";

    const searchPriority1 = document.createElement("option");
    searchPriority1.textContent = "Пріоритет";
    searchPriority1.setAttribute("value","priority");

     const searchPriority2 = document.createElement("option");
    searchPriority2.textContent = "Дата виконання";
    searchPriority2.setAttribute("value","daedlineDate");

     const searchPriority3 = document.createElement("option");
    searchPriority3.textContent = "Дата створення";
    searchPriority3.setAttribute("value","creatDate");

     const searchPriority4 = document.createElement("option");
    searchPriority4.textContent = "Назва";
    searchPriority4.setAttribute("value","title");

    mainContent.appendChild(searchContainer);
    searchContainer.appendChild(searchInputText);
    searchContainer.appendChild(searchSelect);
    searchSelect.appendChild(searchPriority1);
    searchSelect.appendChild(searchPriority2);
    searchSelect.appendChild(searchPriority3);
    searchSelect.appendChild(searchPriority4);
    

}
