import { isToday, isAfter, isBefore, addDays, parseISO, startOfDay, endOfDay } from 'date-fns';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

export function renderCurrentTime() {
    const today = new Date();
    const formattedDate = format(today, 'EEEE d MMMM', { locale: uk });
    const capitalizedDate = formattedDate.toUpperCase();
    const currentDateContainer = document.querySelector(".current-date-container > p");
    if (currentDateContainer) {
        currentDateContainer.textContent = capitalizedDate;
    }
}

export function getAllTasks(appProjects) {
    return appProjects.getProjects().flatMap(project => project.getTasks());
}

export function getTodayTasks(appProjects) {
    const allTasks = getAllTasks(appProjects);
    
    return allTasks.filter(task => {
        if (!task.getDate()) return false; 
        const taskDate = parseISO(task.getDate()); 
        return isToday(taskDate);
    });
}
export function getFutureTasks(appProjects) {
    const allTasks = getAllTasks(appProjects);
    
    const endOfToday = endOfDay(new Date());
    
    return allTasks.filter(task => {
        if (!task.getDate()) return false;
        
        const taskDate = parseISO(task.getDate());
        return isAfter(taskDate, endOfToday);
    });
}

export function getCompletedTasks(appProjects) {
    const allTasks = getAllTasks(appProjects);
    return allTasks.filter(task => task.isCompleted());
}

export function findProjectByTask(task, appProjects) {
    return appProjects.getProjects().find(project => 
        project.getTasks().some(t => t.id === task.id)
    );
}

export function getOverdueTasks(appProjects) {
    const allTasks = getAllTasks(appProjects);
    const startOfToday = startOfDay(new Date());
    
    return allTasks.filter(task => {
        if (!task.getDate() || task.isCompleted()) return false;
        
        const taskDate = parseISO(task.getDate());
        return isBefore(taskDate, startOfToday);
    });
}

export function getHighPriorityTasks(appProjects) {
    const allTasks = getAllTasks(appProjects);
    return allTasks.filter(task => {
        return task.getPriority() === 'high' && !task.isCompleted();
    });
}