// All projects

const projects = [
  {
    langKey: "BXA",
    title: "Bar Xet Auto VI",

    subtitleES: "Un survival en Unity 3D con mecánicas muy diversas de conducción y combate",
    subtitleEN: "A survival game with driving and combat diverse mechanics in Unity3D",
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
        
    tags: ["Unity", "Unity3D", "WebGL", "Windows-build", "Android"],
    repolink: "https://gitlab.com/aruizgarcia14/pec3-un-juego-de-accion",
    donwloadlink: "",
    imagedir: "/img/bxa"
  },
  {
    langkey: "shooter",
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

        
    tags: ["Unity", "Unity3D", "WebGL"],
    repolink: "https://gitlab.com/aruizgarcia14/pec3-un-juego-de-accion",
    imagedir: "/img/bxa"
  },

];

// Projects logic


function createProjectsInDOM(projectsArray) {
    const container = document.getElementById("projects-container");
    const template = document.getElementById("project-template");
    console.log("creating cards with projects");
    if (!container || !template) {
            console.error("Error: No se encontró el contenedor o el template en el DOM.");
            return;
    }
    projectsArray.forEach(project => {
        // Clonamos el contenido del template
        const clone = template.content.cloneNode(true);

        // Rellenamos los datos buscando dentro del clon
        clone.querySelector('.service-title').textContent = project.title;
        clone.querySelector('.service-title').setAttribute('data-lang-key', project.langKey);
        clone.querySelector('.service-description').textContent = project.subtitleES;
        //clone.querySelector('.project-link').href = project.link;

        // Inyectamos en el DOM
        container.appendChild(clone);
    });
}

createProjectsInDOM(projects);