// Stop propagation de los .project-link para que la card no se "active"

document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', event => event.stopPropagation());
});