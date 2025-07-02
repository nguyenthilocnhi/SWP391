function includeHTML() {
    const elements = document.querySelectorAll('[data-include]');
    elements.forEach(async (el) => {
        const file = el.getAttribute('data-include');
        if (file) {
            const resp = await fetch(file);
            if (resp.ok) {
                el.innerHTML = await resp.text();
                // Highlight current page in sidebar
                highlightCurrentPage();
            }
        }
    });
}

function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && currentPath.includes(href.split('/').pop())) {
            item.classList.add('active');
        }
    });
}

window.addEventListener('DOMContentLoaded', includeHTML); 