const tooltip = document.getElementById('project-tooltip');
const links = document.querySelectorAll('.art-link');

document.addEventListener('mousemove', (e) => {
    // On déplace la bulle avec un petit décalage (15px) pour ne pas être pile sous le curseur
    tooltip.style.transform = `translate(${e.clientX + 15}px, ${e.clientY + 15}px)`;
});

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        tooltip.textContent = link.getAttribute('data-desc');
        tooltip.style.opacity = '1';
    });

    link.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
    });
});