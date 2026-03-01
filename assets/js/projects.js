// All projects

const allProjects = [
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

        tags: ["C#", "Unity 3D"],
        repoLink: "https://gitlab.com/aruizgarcia14/pec2-un-juego-de-disparos",
        windowsLink: "",
        numberOfImages:6,
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


        tags: ["C#", "Unity 2D", "WebGL"],
        numberOfImages: 2,
        repoLink: "https://gitlab.com/aruizgarcia14/pec2_platformergame_alvaroruiz",
        relevance: 40
    },

    {
        key: "racing",
        title: "Barxetita Racing",
        subtitleES: "Un juego de carreras, en el que competimos contra nuestra mejor marca.",
        subtitleEN: "A racing game where we compete against our own personal best.",
        subtitleCAT: "Un joc de curses on competim contra la nostra millor marca.",
        descriptionES: `Un ejercicio interesante para aprender herramientas claves de Unity como los Scriptable Objects, los Wheel Colliders, telas, shaders...
             En él, implementamos un sistema de guardado de nuestras mejores vueltas. Competimos contra un ghost car que replica nuestra mejor marca. También experimentamos con los Terrain Assets de Unity.`,

        descriptionEN: `An interesting exercise to learn key Unity tools such as Scriptable Objects, Wheel Colliders, cloths, and shaders.
            In this project, we implemented a save system for our fastest laps, allowing us to compete against a ghost car that replicates our best time. We also experimented with Unity's Terrain Assets.`,

        descriptionCAT: `Un exercici interessant per aprendre eines clau d'Unity com els Scriptable Objects, els Wheel Colliders, teles, shaders...
            En ell, implementem un sistema de desat de les nostres millors voltes. Competim contra un ghost car que replica la nostra millor marca. També experimentem amb els Terrain Assets d'Unity.`,

        tags:  ["C#", "Unity 3D", "Windows build"],
        numberOfImages: 1,

        repoLink: "",
        relevance: 10
    },
    {
        key: "stickman",
        title: "Stickman Brawl",
        subtitleES: "Un juego de luchas estilo stickman, con diferentes armas y enemigos. Hecho en Unity 2D",
        subtitleEN: "A stickman fighting game with different weapons and enemies. Made in Unity 2D",
        subtitleCAT: "Un joc de lluites estilo stickman, amb diferents armes i enemics. Fet a Unity 2D",
        descriptionES: `
            Usa funcionalidades como animation layers, es completamente compatible con mando y tiene un selector de dificultad entre tres posibles niveles. 
            Es un juego sencillo inspirado en otros títulos como  One Finger Death Punch o Stick Fight: The Game. Pero estoy satisfecho con el acabado y (moderadamente) con la jugabilidad.
        `,
        descriptionCAT: `            Usa funcionalitats com animation layers, és completament compatible amb mando i té un selector de dificultat entre tres possibles nivells.
            És un joc senzill inspirat en altres títols com One Finger Death Punch o Stick Fight: The Game. Però estic satisfet amb l'acabat i (moderadament) amb la jugabilitat.
        `,
        descriptionEN: `            It uses features like animation layers, is fully compatible with controllers, and has a difficulty selector with three possible levels.
            It's a simple game inspired by other titles like One Finger Death Punch or Stick Fight: The Game. But I'm satisfied with the finish and (moderately) with the gameplay.
        `,
        numberOfImages: 0,
        video: "stickman.mp4",
        tags: ["C#", "Unity 2D", "WebGL"],
        repoLink: "https://gitlab.com/aruizgarcia14/stickman-brawl",
        relevance: 30
    },
    {
        key:"rapbattle",
        title: "Rap Battle Game",
        subtitleES: "Un test de mecánicas sobre eleccion de diálogos durante una batalla de rap, incluyendo sincronización con música.",
        descriptionES: `Una idea en la que el reto consiste en elegir la mejor frase posible durante un patrón breve de espera. El beat musical marca el ritmo del gameloop en 4 fases: frase del rival, elegir respuesta, rapear la respuesta, escuchar la reacción del público. Cada respuesta posible tiene una puntuación asociada (+1, -1 o 0).
        El mayor reto técnico es triggear eventos cuando la muestra de sonido alcanza un sample concreto. La implementación de audio de Unity para WebGL es una cosa.
        `,
        numberOfImages: 2,
        repoLink: "https://gitlab.com/aruizgarcia14/juego-de-aventuras-alvaro-ruiz",
        relevance: 25,
        tags: ["C#", "Unity 2D", "WebGL"]

    },
    {
        key:"mariont",
        title: "Super Marion't",
        subtitleES: "Un juego en C++/Raylib, con físicas hechas a mano",
        subtitleEN: "a C++/Raylib Platformer Game, with handmade physics",
        descriptionEN: `I liked how code result was pretty boilerplate and organized. The game includes a basic Physics Engine, and a 2D Camera with parallax effect..
        `,
        numberOfImages: 2,

        repoLink: "https://gitlab.com/aruizgarcia14/pgpec2-a-platformer-in-c-with-raylib",
        relevance: 60,
        tags: ["C++"]
    },
    {
        key: "ia-motion",
        title: "Flocking and Formation Motion",
        subtitleES: "Simulación de comportamientos de grupo y formaciones dinámicas en Unity 3D",
        subtitleEN: "Flocking and formation motion group behaviors simulation in Unity 3D",
        subtitleCAT: "Simulació de comportaments de grup i formacions dinàmiques a Unity 3D",
        descriptionES: `
        Este proyecto implementa sistemas de movimiento de grupo basados en los algoritmos de Millington y Reynolds. 
        Por un lado, una formación en flecha (arrowhead) donde cada guardia mantiene su posición relativa respecto al siguiente. 
        Por otro, un sistema de 'boids' para un enjambre de abejas que utiliza componentes de cohesión, alineación y separación para lograr un movimiento orgánico.
        Cabe destacar el uso de Árboles de Comportamiento (Behaviour Trees) para coordinar la lógica: el enjambre persigue a los guardias pero regresa al nido si se aleja demasiado.
    `,
        descriptionEN: `
        This project implements group motion systems based on Millington and Reynolds algorithms. 
        It features an emergent arrowhead formation where guards maintain relative positions, and a 'boids' system for a bee swarm using cohesion, alignment, and separation. 
        A notable feature is the integration of Behaviour Trees to coordinate logic: the swarm pursues the guards but returns to its nest if it strays too far.
    `,
        descriptionCAT: `
        Aquest projecte implementa sistemes de moviment de grup basats en els algoritmes de Millington i Reynolds. 
        D'una banda, una formació en fletxa (arrowhead) on cada guàrdia manté la seva posició relativa respecte del següent. 
        De l'altra, un sistema de boids per a un eixam d'abelles que utilitza components de cohesió, alineació i separació per aconseguir un moviment orgànic.
        Cal destacar l'ús d'Arbres de Comportament (Behaviour Trees) per coordinar la lògica: l'eixam persegueix els guàrdies, però torna al niu si s'allunya massa.
        `,
        tags: [
            "C#",
        ],
        video: "flocking1.mp4",
        numberOfImages: 2,
        repoLink: "https://gitlab.com/aruizgarcia14/iapec2-formation-and-flocking-motion-colective-behaviours",
        relevance: 35
    },
    {
        key: "ia-ml",
        title: "Cooperative ML-Agents: Rob the Nest",
        subtitleES: "Entrenamiento de agentes inteligentes mediante aprendizaje por refuerzo cooperativo en Unity",
        subtitleEN: "Cooperative Reinforcement Learning for intelligent agents in Unity",
        subtitleCAT: "Entrenament d'agents intel·ligents mitjançant aprenentatge per reforç cooperatiu a Unity",
        descriptionES: `
        En este proyecto utilicé Unity ML-Agents para entrenar a un grupo de tres "ladrones" que deben cooperar para alcanzar un nido custodiado por una IA enemiga. 
        Lo más interesante fue el proceso de refinamiento de la función de recompensa; inicialmente, los agentes aprendieron a ser "cobardes" para evitar penalizaciones por muerte, lo que me obligó a ajustar los pesos y añadir recompensas por proximidad al objetivo.
        La clave del éxito fue introducir una observación específica (isBeingAggroed), esto logró una victoria de más de un 90%.
    `,
        descriptionEN: `
        In this project, I used Unity ML-Agents to train a group of three "robbers" to cooperate and reach a nest guarded by an AI bee. 
        The most interesting part was the reward function refinement; agents initially learned "coward" behaviors to avoid death penalties, leading me to implement proximity-based rewards. 
        The breakthrough came from adding a specific observation (isBeingAggroed), resulting in a 90% win rate.
    `,
        descriptionCAT: `
        En aquest projecte vaig utilitzar Unity ML-Agents per entrenar un grup de tres "lladres" que han de cooperar per assolir un niu custodiat per una IA enemiga. 
        El més interessant va ser el procés de refinament de la funció de recompensa; inicialment, els agents van aprendre a ser "covards" per evitar penalitzacions per mort, cosa que em va obligar a ajustar els pesos i afegir recompenses per proximitat a l'objectiu.
        La clau de lèxit va ser introduir una observació específica (isBeingAggroed), això va aconseguir una victòria de més dun 90%.
        `,
        tags: [
            "C#",
            "ML-Agents",
        ],
        video: "final-demo.mp4",
        numberOfImages: 1,
        repoLink: "https://gitlab.com/aruizgarcia14/iapec3-machine-learning-with-unity-ml-agents", // Ajustar según tu URL
        relevance: 90
    },
    {
        key: "low-level-bricks",
        title: "Low-Level Bricks",
        subtitleES: "Arcade multiplayer de alto rendimiento desarrollado en C++ y OpenGL",
        subtitleEN: "High-performance multiplayer arcade game built with C++ and OpenGL",
        subtitleCAT: "Arcade multiplayer d'alt rendiment desenvolupat en C++ i OpenGL",
        descriptionES: "Versión extendida del clásico Breakout con soporte para multijugador local. Implementa un motor de renderizado propio (Shaders, Post-procesado) y un sistema de físicas basado en el tutorial de LearnOpenGL. Destaca el uso de herencia para la lógica de dos jugadores y un motor de audio en SDL_mixer con un sistema de 'cooldown' de 50ms para evitar saturación sonora en colisiones múltiples.",
        descriptionEN: "Extended Breakout-style arcade with local multiplayer support. Features a custom rendering engine (Shaders, Post-processing) and physics built on C++ and OpenGL. Key highlights include an inheritance-based architecture for 2-player logic and an SDL_mixer audio engine with a 50ms cooldown system to prevent sound overlapping during rapid collisions.",
        descriptionCAT: "Versió estesa del clàssic Breakout amb suport per a multijugador local. Implementa un motor de renderització propi (Shaders, Post-processat) i un sistema de físiques basat en el tutorial de LearnOpenGL. Destaca l'ús d'herència per a la lògica de dos jugadors i un motor d'àudio en SDL_mixer amb un sistema de 'cooldown' de 50ms per evitar la saturació sonora en col·lisions múltiples.",
        tags: ["C++", "OpenGL", "SDL2"],
        video: "LowLevelBricksDemo.mp4",
        numberOfImages: 1,
        repoLink: "https://gitlab.com/aruizgarcia14/pgpec3-a-game-in-c-with-opengl",
        relevance: 75
    }


];


// Projects logic
function createProjectCard(project, template, container) {
    // Clonar template
    const clone = template.content.cloneNode(true);

    let card = clone.querySelector('.project-index-item');
    card.onclick = () => {
        window.location.href = "project-details.html?projectKey="+project.key;
    };
    // Rellenar los datos dentro del clon
    clone.querySelector('.project-title').textContent = project.title;
    let subtitle = clone.querySelector('.service-description');

    // Asinar la key correspondiente para el servicio de traudcción
    if (!project.subtitleES) {
        subtitle.remove();
    } else {
        subtitle.setAttribute('data-lang-key', project.key + "-subtitle");
        subtitle.textContent = project.subtitleES; // Just in case
    }


    let linkDiv = clone.querySelector('a');

    // Si existe un link, poner un boton
    if (project.repoLink && project.subtitleES)
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
}

function createProjectsInIndex(projectsArray) {
    const container = document.querySelector("#projects-container");
    const template = document.querySelector("#project-index-template");
    console.log("creating cards with projects");
    if (!container || !template) {
            console.error("Error: No se encontró el contenedor o el template de la sección projects en el index.");
            return;
    }

    projectsArray.forEach((project) => {
        createProjectCard(project, template, container);
    });
}

function getActiveFilters() {
    const params = new URLSearchParams(window.location.search);
    const filtersString = params.get("filters");

    if (!filtersString) return [];

    // Filters are passed like
    // ?filters=C#,Unity 3D,Mobile
    return filtersString.split(",").map(tag => tag.trim());
}

function filterProjects(exclude = true) {
    const excludedTags = getActiveFilters();
    if (excludedTags.length === 0) return allProjects;

    // Filtramos la lista original
    // Is the only point where we use the global variable :p

    let filteredProjects = allProjects.filter(project => {
        // This is so difficult
        if (!project.tags)
        {a
            // If no tags, always be filtered
            console.log("No tags in " + project.key);
            return true;
        }
        const hasExcludedTag = project.tags.some(tag => excludedTags.includes(tag));

        // Passing the test means the project is not excluded
        return (hasExcludedTag !== exclude);
    });

    updateProjects(filteredProjects)
}

function setActiveTag(tagToActivate, tagButton)
{

    let tagContainer = document.querySelector(".tags-container");
    let tagAllButtons = tagContainer.querySelectorAll(".btn.tag-filter");
    // Deactivate all buttons
    for (const tag of tagAllButtons) {
        tag.classList.add("active");
    }
    // Activate this button
    tagButton.classList.remove("active");

    // Url has only one filter
    const newFiltersParam = tagToActivate;
    const newURL = `project-all.html?filters=${encodeURIComponent(newFiltersParam)}`;
    window.history.pushState({ filters: newFiltersParam }, '', newURL);
    // window.location.href = `project-all.html?filters=${newFiltersParam}`;

    filterProjects(false);
}

function toggleFilter(tagToToggle, button) {
    let currentFilters = getActiveFilters();

    // TODO: grey out button using active attribute

    button.classList.toggle("active");


    if (currentFilters.includes(tagToToggle)) {
        // Si ya estaba, lo quitamos (lo "des-excluimos")
        currentFilters = currentFilters.filter(t => t !== tagToToggle);
    } else {
        // Si no estaba, lo añadimos a la lista negra
        currentFilters.push(tagToToggle);
    }

    // Put filters in url
    const newFiltersParam = currentFilters.join(",");
    const newURL = `project-all.html?filters=${encodeURIComponent(newFiltersParam)}`;
    window.history.pushState({ filters: newFiltersParam }, '', newURL);
    // window.location.href = `project-all.html?filters=${newFiltersParam}`;

    filterProjects(true);


}

function getAllTags() {
    let allTags = [];

    for (let i = 0; i < allProjects.length; i++) {

        let currentProjectTags = allProjects[i].tags;
        if (currentProjectTags === undefined) continue;
        for (let j = 0; j < currentProjectTags.length; j++) {
            let tag = currentProjectTags[j];

            if (!allTags.includes(tag)) {
                allTags.push(tag);
            }
        }
    }
    return allTags;
}


function createAllTags() {
    let tagContainer = document.querySelector(".tags-container");
    tagContainer.innerHTML = "";

    // Load all
    let tags = getAllTags();
    for (let i = 0; i < tags.length; i++) {
        let tagName = tags[i];
        let tagButton = document.createElement("a");
        tagButton.href="#";
        tagButton.className = "btn tag-filter";
        tagButton.id = `tag-${tagName}`;
        tagButton.textContent = tagName;

        tagButton.addEventListener("click", function(event) {
            event.preventDefault();
            // toggleFilter(tagName, this); // 'this' será el botón pulsado
            setActiveTag(tagName, this);
        });

        tagContainer.appendChild(tagButton);
    }

}

function updateProjects(projects) {
    console.log("Updating projects to " + projects.length + " results");
    const container = document.querySelector("#projects-all-container");
    const template = document.querySelector("#project-all-template");

    // Clear container
    container.innerHTML = "";
    for (const project of projects) {
        createProjectCard(project, template, container);
    }
}

function createAllProjects() {
    console.log("creating all projects");
    const container = document.querySelector("#projects-all-container");
    container.innerHTML = "";
    const template = document.querySelector("#project-all-template");
    if (!container || !template) {
        console.error("Error: No se encontró el contenedor o el template de la sección projects en projects-all");
        return;
    }
    for (const project of allProjects) {
        createProjectCard(project, template, container);
        insertProjectTranslation(project);

    }

    createAllTags();
}

function createSimilarProjects(project)
{
    // Decide three most relevant and relatec projects

    const scoredProjects = [];
    // tag in common: + 1000 pts
    for (const candidateProject of allProjects) {
        if (candidateProject.key === project.key)   continue;

        let currentScore = 0;
        currentScore += candidateProject.relevance || 0;

        if (candidateProject.tags && project.tags) {
            for (const tag of candidateProject.tags) {
                // Compute tags in common
                if (project.tags.includes(tag)) {
                    currentScore += 1000;
                }
            }
        }

        scoredProjects.push({
            project: candidateProject,
            score: currentScore
        });
    }

    // Sort descendent, take 3 first
    const topThree = scoredProjects
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

    // Add elements to DOM
    const container = document.querySelector("#similar-projects-container");
    const template = document.querySelector("#related-project-template");

    for (const topScoredProject of topThree) {
        
        topScoredProject.project.subtitleEN = topScoredProject.project.subtitleES = topScoredProject.project.subtitleCAT = undefined;
        createProjectCard(topScoredProject.project, template, container);
    }


}

function createMediaCarrousel(project) {
    let numberOfImages = project.numberOfImages || 1;

    let container = document.querySelector("#projects-images-container");
    let template = document.querySelector("#project-details-template");

    if (project.video) {
        // if videos is an array, add them all

        const videos = Array.isArray(project.video) ? project.video : [project.video];
        videos.forEach(video => {
            const clone = template.content.cloneNode(true);
            const videoTag = clone.querySelector('video');
            const sourceTag = videoTag.querySelector('source');

            sourceTag.src = `assets/img/projects/${project.key}/${video}`;
            videoTag.classList.remove('d-none'); // Mostrar video

            // Importante: Cargar el video después de cambiar el source
            videoTag.load();

            container.appendChild(clone);
        });
    }

    // Images
    for (let i = 1; i <= numberOfImages; i++) {
        const clone = template.content.cloneNode(true);
        let image = clone.querySelector('img');

        image.src = "assets/img/projects/" + project.key + "/" +
            i.toString().padStart(2, '0') + ".png";
        container.appendChild(clone);
    }



}

function createTags(project) {
    let tagContainer = document.querySelector(".tags-container");
    tagContainer.innerHTML = "";
    for (let i = 0, len = project.tags.length; i < len; i++) {
        let tagHtml = `<a href="#" class="btn tag-button">${project.tags[i]}</a>`;
        tagContainer.innerHTML += tagHtml;
    }
}

function createProjectInDetail(projects) {
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
    createMediaCarrousel(project)

    // Añadir tags
    createTags(project);

    // Añadir proyectos similares
    createSimilarProjects(project);

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
    if (project.repoLink) {
        linkDiv.href = project.repoLink;
        if (project.repoLink.toLowerCase().includes("gitlab.com")) {
            linkDiv.textContent = "Link to Gitlab";
            linkDiv.setAttribute('data-lang-key', "gitlab-link");
        } else if (project.repoLink.toLowerCase().includes("github")) {
            linkDiv.textContent = "Link to GitHub";
            linkDiv.setAttribute('data-lang-key', "github-link");
        }
    } else {
        linkDiv.remove(); // Borrar link del DOM si no existe
    }

    // Añadir traducciones
    insertProjectTranslation(project);

}

function setupTagsDropdown() {
    const btnDropdown = document.querySelector(".btn-dropdown");
    const tagContainer = document.querySelector(".tags-container");

    btnDropdown.addEventListener("click", function () {

        // Mover elementos
        this.classList.toggle("active");
        const isNowActive = tagContainer.classList.toggle("show");

        // Despues del transition time, recargamos proyectos
        setTimeout(() => {

            // 3. Si se acaba de cerrar (no está activo), resetear proyectos
            if (isNowActive) {
                // setActiveTag("C#", document.getElementById(`tag-C#`));
            } else {
                createAllProjects();
            }
        }, 400);
    });
}

function sortProjectsByRelevanceWithRandomness() {
    allProjects.sort((a, b) => {
        // Calculamos la "puntuación temporal" restando un random entre 0 y 30
        const scoreA = a.relevance - (Math.random() * 30);
        const scoreB = b.relevance - (Math.random() * 30);

        // Orden descendente (de mayor puntuación a menor)
        return scoreB - scoreA;
    });
}


window.addEventListener("load", () => {
    // const fullURL = window.location.href; // La URL entera
    const path = window.location.pathname;
    // Check if we are on index
    const isHome = path === "/" || path.endsWith("/portfolio/") || path.includes("index.html");
    sortProjectsByRelevanceWithRandomness();
    if (isHome) {
        createProjectsInIndex(allProjects);
    } else if (path.includes("project-details.html")) {
        createProjectInDetail(allProjects); // The function will detect which project to show based on the URL parameters
    } else if (path.includes("project-all.html")) {
        createAllProjects();
        setupTagsDropdown();
    } else {
        console.error("I dont know which scene am I");
    }
});

