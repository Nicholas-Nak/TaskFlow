import { getAppProjects } from "../index"; 
import { saveStorage } from "../logic/storage";
import { renderProjectView } from "./renderProjectView";
import { renderProjects } from "./renderProjects";

export function handleDeleteTask(task, project) {
   project.deleteTask(task);
   saveStorage(getAppProjects());
   renderProjectView(project);
   renderProjects();
}

export function handleEditTask(task, project){

} 

export function handleViewDetails(task){

}