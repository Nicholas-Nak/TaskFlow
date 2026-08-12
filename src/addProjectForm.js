export function renderProjectForm(){
    const existingDialog = document.getElementById("project-dialog");
    if (existingDialog) {
        existingDialog.remove();
    }
    const body = document.querySelector('body');
    
    const dialog  = document.createElement("dialog");
    dialog.setAttribute("id","project-dialog");
    
    const fieldset = document.createElement('fieldset');
    fieldset.setAttribute("id","project-fieldset");

    const legend = document.createElement('legend');
    legend.setAttribute('id',"project-legend");

    const form = document.createElement('form');
    form.setAttribute('id','project-form');
    
    const input = document.createElement('input');
    input.setAttribute('id','project-input');
    input.setAttribute('plaсeholder','Назва проєкту');
    
    const sumbitBtn = document.createElement('button');
    sumbitBtn.setAttribute('id','project-submit');
    sumbitBtn.setAttribute('type', 'submit');
    
    const closeDialog = document.createElement('button');
    closeDialog.setAttribute('id','project-close-dialog');
    closeDialog.setAttribute('type', 'button');

    body.appendChild(dialog);
    dialog.appendChild(fieldset);
    dialog.appendChild(closeDialog);
    fieldset.appendChild(legend);
    fieldset.appendChild(form);
    form.appendChild(input);
    form.appendChild(sumbitBtn);
    
    legend.textContent = "Новий проєкт";
    sumbitBtn.textContent = "Створити проєкт";
    closeDialog.textContent = "Відмінити";
    dialog.showModal();
   closeDialog.addEventListener("click", () => {
    dialog.close();
});

}