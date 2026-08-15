export function clearMain() {
  const main = document.getElementById("dynamic-content");
  main.innerHTML = "";
}
export function initSidebarToggle() {
    const toggleBtn = document.getElementById('sidebar-toggle');
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('sidebar-collapsed');
        });
    }
}