// Stop propagation de los .project-link para que la card no se "active"

document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', event => event.stopPropagation());
});


// setup filters
window.addEventListener("load", () => {
    const path = window.location.pathname;

    if (path.includes("project-all.php")) {
        btnDropdown.addEventListener("click", toggleTagsDropdown);
        setupTagsButtons();
        const activeFilters = getActiveFilters();
        if (activeFilters.length > 0) {
            filterProjects();
            toggleTagsDropdown();
            silentRemarkActiveTag(activeFilters[0]);
        }
    }
});

const btnDropdown = document.querySelector(".btn-dropdown");
const tagContainer = document.querySelector(".tags-container-dropdown");

function setupTagsButtons() {

    const allTags = document.querySelectorAll('.btn.tag-filter');

    allTags.forEach(tagButton => {
        tagButton.addEventListener("click", function (event) {
            event.preventDefault();
            // toggleFilter(tagName, this); // 'this' será el botón pulsado
            setActiveTag(this.textContent.trim(), this);
        });
    });
}

// ok!
function getActiveFilters() {
    const params = new URLSearchParams(window.location.search);
    const filtersString = params.get("filters");

    if (!filtersString) return [];

    // Filters are passed like
    // ?filters=C#,Unity 3D,Mobile
    return filtersString.split(",").map(tag => tag.trim());
}

//ok!
function showAllProjects() {
    const allCards = document.querySelectorAll(".col-md-4");

    if (allCards.isEmpty) {
        console.error("Error: no se encuentran los cards en projects.all");
        return;
    }
    for (const card of allCards) {
        card.classList.remove('project-hidden'); // mostrar
    }
}

function toggleTagsDropdown() {
    console.log("Toogle tag dropdwon");
    // Mover elementos
    btnDropdown.classList.toggle("active");
    const isNowActive = tagContainer.classList.toggle("show");

    // Despues del transition time, recargamos proyectos
    setTimeout(() => {

        // Si se acaba de cerrar (no está activo), resetear proyectos
        if (!isNowActive) {
            showAllProjects();
        }
    }, 400);
}

function setActiveTag(tagToActivate, tagButton)
{

    let tagContainer = document.querySelector(".tags-container-dropdown");
    let tagAllButtons = tagContainer.querySelectorAll(".btn.tag-filter");
    // Deactivate all buttons
    for (const tag of tagAllButtons) {
        tag.classList.add("active");
    }
    // Activate this button
    tagButton.classList.remove("active");

    // Url has only one filter
    const newFiltersParam = tagToActivate;
    const newURL = `project-all.php?filters=${encodeURIComponent(newFiltersParam)}`;
    window.history.pushState({ filters: newFiltersParam }, '', newURL);

    filterProjects();
}

// Al llegar a la url project-all.php?filters=tag, remarcamos esta etiqueta
function silentRemarkActiveTag(activeTag) {
    console.log("Remarking " + activeTag);
    let tagContainer = document.querySelector(".tags-container-dropdown");
    let tagButtons = tagContainer.querySelectorAll('a');
    tagButtons.forEach(tag => {
        if (tag.textContent.trim() === activeTag) {
            tag.classList.remove("active");
        } else {
            tag.classList.add("active");
        }
    })
}

// Project tags lo incrusta PHP en el html
function getTagsByKey(key) {
    return projectTags[key] ?? [];
}

function filterProjects() {

    const filteredTags = getActiveFilters();

    showAllProjects();
    // Cogemos la lista de cards original
    const allCards = document.querySelectorAll('.col-md-4');

    allCards.forEach(card => {
        const son = card.querySelector(".project-index-item");
        const key = son.dataset.projectKey;

        const tags = projectTags[key] ?? [];
        if (tags.length === 0) {
            console.warn("There are no tags in project " + key);
        }

        const hasTag = tags.some(tag => filteredTags.includes(tag));

        if (!hasTag) {
            card.classList.add('project-hidden');
        }
        else {
            card.classList.remove('project-hidden');

        }
    });

}
