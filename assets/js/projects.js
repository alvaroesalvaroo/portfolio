// All projects

const projects = [
    {
        key: "bxa",
        title: "Bar Xet Auto VI",

        subtitleES: "Un survival en Unity 3D con mecánicas muy diversas de conducción y combate",
        subtitleEN: "A survival game with driving and combat diverse mechanics in Unity 3D",
        subtitleCAT: "Un survival en Unity 3D amb mecàniques molt diverses de conducció i combat",

        descriptionES: `
        El juego combina ataques cuerpo a cuerpo, disparos, granadas y conducción en un entorno plagado de enemigos (personajes de Mortadelo y Filemón) que aparecen cada vez más rápido. 
        Cabe destacar el sistema de (no) apuntado con un arma, una solución interesante para sistemas de disparo sencillos`,
        descriptionCAT: `
        El joc combina atacs cos a cos, trets, granades i conducció en un entorn plagat d'enemics (personatges de Mortadelo i Filemón) que apareixen progressivament més ràpid.
        Cap destacar el sistema de (no) apuntat amb un arma, una solució interessant per sistemes senzills d'apuntat`,
        descriptionEN:`
        The game combines melee attacks, throws, grenades, and driving in an environment plagued with enemies (characters from Mortadelo and Filemón) that appear progressively faster.
        The (non-)aim system with a weapon is a notable feature, an interesting solution for simple shooting systems.`,

        tags: ["C#", "Unity 3D", "Windows build"],
        repoLink: "https://gitlab.com/aruizgarcia14/pec3-un-juego-de-accion",
        donwloadlink: "",
        relevance:70
    },
    {
        key: "fps",
        title: "Barxetita Shooting",
        subtitleES: "Un shooter desarrollado en Unity HDRP",
        subtitleEN: "A shooter developed in Unity HDRP",
        subtitleCAT: "Un shooter desenvolupat a Unity HDRP",

        descriptionES: `
        Un shooter básico con 2 armas, escudo y sistema de munición, enemigos controlados por IA y máquina de estados,
        en un entorno muy atractivo (pero exigente en cuanto a hardware).`,
        descriptionCAT: `
        Un shooter bàsic amb 2 armes, escut i sistema de munició, enemics amb IA de màquina d'estats,
        en un entorn molt atractiu (però exigent en maquinari).`,
        descriptionEN:`
        A basic shooter with 2 weapons, shield and ammo system, state-machine enemies AI,
        in a very good looking (but hardware-demanding) environment`,

        tags: ["C#", "Unity 3D", "Windows build"],
        repoLink: "https://gitlab.com/aruizgarcia14/pec2-un-juego-de-disparos",
        windowsLink: "",
        relevance: 60
    },
    {
        key: "ssp",
        title: "Super Standard Platformer",
        subtitleES: "Un plataformas en Unity 2D. Disponible en Android y WebGL",
        subtitleEN: "A 2D Unity platform. Available on Android and WebGL",
        subtitleCAT: "Un plataformes a Unity 2D. Disponible en Android i WebGL",

        descriptionES: `
           Pese a tener unas mecánicas genéricas, intenté darle personalidad con un boss final y me sirvió para aprender cómo es el proceso de subir una app a Google Play
           (un cambio en las condiciones me dejó fuera del proceso, aunque estuvimos cerca). 
           `,
        descriptionCAT: `
            Tot i tenir unes mecàniques genèriques, vaig intentar donar-li personalitat amb un boss final i em va servir per aprendre com és el procés de pujar una app a Google Play
           (un canvi en les condicions em va deixar fora del procés, encara que vam estar a prop).
            `,
        descriptionEN:`
        A basic shooter with 2 weapons, shield and ammo system, state-machine enemies AI,
        in a very good looking (but hardware-demanding) environment`,

        tags: ["C#", "Unity2D", "Web"],
        repoLink: "https://gitlab.com/aruizgarcia14/pec2_platformergame_alvaroruiz",
        relevance: 50
    },

    {
        key: "racing",
        title: "Barxetita Racing",
        subtitleES: "Un juego de carreras, en el que competimos contra nuestra mejor marca.",
        descriptionES: `Un ejercicio interesante para aprender herramientas claves de Unity como los Scriptable Objects, los Wheel Colliders, telas, shaders...
             En él, implementamos un sistema de guardado de nuestras mejores vueltas. Competimos contra un ghost car que replica nuestra mejor marca. También experimentamos con los Terrain Assets de Unity.`,

        tags:  ["C#", "Unity 3D", "Windows build"],
        repoLink: "",
        relevance: 10
    }

];

// Projects logic

function createProjectsInIndex(projectsArray) {
    const container = document.getElementById("projects-container");
    const template = document.getElementById("project-template");
    console.log("creating cards with projects");
    if (!container || !template) {
            console.error("Error: No se encontró el contenedor o el template en el DOM.");
            return;
    }

    projectsArray.forEach(project => {
        // Clonar template
        const clone = template.content.cloneNode(true);

        let card = clone.querySelector('.project-item');
        card.onclick = () => {
            window.location.href = "project-details.html?projectKey="+project.key;
        };
        // Rellenar los datos dentro del clon
        clone.querySelector('.project-title').textContent = project.title;
        let subtitle = clone.querySelector('.service-description');

        // Asinar la key correspondiente para el servicio de traudcción
        subtitle.setAttribute('data-lang-key', project.key + "-subtitle");
        subtitle.textContent = project.subtitleES; // Just in case

        let linkDiv = clone.querySelector('a');

        // Si existe un link, poner un boton
        if (project.repoLink)
        {
            linkDiv.href = project.repoLink;
            if (project.repoLink.toLowerCase().includes("gitlab.com"))
            {
                // linkDiv.textContent = "<i class=\"bi bi-gitlab\"></i>";
                // linkDiv.setAttribute('data-lang-key', "gitlab-link");
            }
            else if (project.repoLink.toLowerCase().includes("github"))
            {
                // linkDiv.textContent = "Link to GitHub";
                //linkDiv.setAttribute('data-lang-key', "github-link");
            }
        }
        else
        {
            linkDiv.remove(); // Borrar link del DOM si no existe
        }

        // Añadir traducciones
        insertProjectTranslation(project);

        // Añadir imagenes
        let image = clone.querySelector('img');
        // En la pagina inicial, solo cargamos la primera imagen
        image.src = "assets/img/projects/" + project.key + "/01.png";

        // Inyectamos en el DOM
        container.appendChild(clone);
    });
}
function createSimilarProjects()
{

}

function createImageCarrousel(project) {
    let image = document.querySelector('img');
    // De momento, solo una imagen
    image.src = "assets/img/projects/" + project.key + "/01.png";
}
function createTags(project) {
    let tagContainer = document.querySelector(".tags-container");
    tagContainer.innerHTML = "";
    for (let i = 0, len = project.tags.length; i < len; i++) {
        let tagHtml = `<a href="#" class="btn tag-button">${project.tags[i]}</a>`;
        tagContainer.innerHTML += tagHtml;
    }
}

function createProjectInDetail()
{
    const params = new URLSearchParams(window.location.search);
    const projectKey = params.get('projectKey');
    let project = null;
    if (projectKey) {
        project = projects.find(p => p.key === projectKey);
    }

    if (!project) {
        console.error("No project key given to projects page");
        document.querySelector('#project-subtitle').textContent = "You hacked this website and there is not project to show";
        return;
    }

    // Añadir imagenes
    createImageCarrousel(project)

    // Aádir tags
    createTags(project);

    let title = document.querySelector('#project-title');
    title.textContent = project.title;

    let subtitle = document.querySelector('#project-subtitle');
    // Asinar la key correspondiente para el servicio de traudcción
    subtitle.setAttribute('data-lang-key', project.key + "-subtitle");
    subtitle.textContent = project.subtitleES; // Just in case

    let description = document.querySelector('#project-description');
    description.textContent = project.descriptionES;
    description.setAttribute('data-lang-key', project.key + "-description");

    let linkDiv = document.querySelector('#repo-link');

    // Si existe un link, poner un boton
    if (project.repoLink)
    {
        linkDiv.href = project.repoLink;
        if (project.repoLink.toLowerCase().includes("gitlab.com"))
        {
            linkDiv.textContent = "Link to Gitlab";
            linkDiv.setAttribute('data-lang-key', "gitlab-link");
        }
        else if (project.repoLink.toLowerCase().includes("github"))
        {
            linkDiv.textContent = "Link to GitHub";
            linkDiv.setAttribute('data-lang-key', "github-link");
        }
    }
    else
    {
        linkDiv.remove(); // Borrar link del DOM si no existe
    }

    // Añadir traducciones
    insertProjectTranslation(project);


}

window.addEventListener("load", () => {
    const path = window.location.pathname;

    if (path.includes("project-details.html") || path === "/") {
        createProjectInDetail();
    } else {
        createProjectsInIndex(projects);
    }
});

