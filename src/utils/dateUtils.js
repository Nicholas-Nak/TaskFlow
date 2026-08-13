import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
export function renderCurrentTime(){
const today = new Date();
const formattedDate = format(today, 'EEEE d MMMM', { locale: uk });
const capitalizedDate = formattedDate.toUpperCase() ;
const currentDateContainer = document.querySelector(".current-date-container > p");
currentDateContainer.textContent = capitalizedDate;
}