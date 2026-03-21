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

        tags: ["C#", "Unity 3D"],
        repoLink: "https://gitlab.com/aruizgarcia14/pec3-un-juego-de-accion",
        windowsLink: "https://drive.google.com/drive/folders/1StYa06P6bNei5cgcGYwyURMpUS6NNvwT?usp=sharing",
        webLink: "https://play.unity.com/es/user/98453246-b7ce-49c5-ab6b-c4f3c5546cb9",
        numberOfImages: 3,
        relevance:75
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
        windowsLink: "https://drive.google.com/drive/folders/1StYa06P6bNei5cgcGYwyURMpUS6NNvwT?usp=sharing",
        numberOfImages:6,
        relevance: 70
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


        tags: ["C#", "Unity 2D", "Web"],
        numberOfImages: 3,
        gif: "ssp-menu.gif",
        gifIsFirst: true,
        repoLink: "https://gitlab.com/aruizgarcia14/pec2_platformergame_alvaroruiz",
        windowsLink: "https://drive.google.com/drive/folders/1lbniG5F2ZeoO-HrxS_lg2mOPlM_nEJCL?usp=sharing",
        webLink: "https://play.unity.com/es/user/98453246-b7ce-49c5-ab6b-c4f3c5546cb9",
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

        tags:  ["C#", "Unity 3D"],
        numberOfImages: 5,

        repoLink: "https://gitlab.com/aruizgarcia14/pec1-unjuegodecarreras",
        windowsLink: "https://drive.google.com/drive/folders/1StYa06P6bNei5cgcGYwyURMpUS6NNvwT?usp=sharing",
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
        tags: ["C#", "Unity 2D", "Web"],
        repoLink: "https://gitlab.com/aruizgarcia14/stickman-brawl",
        windowsLink: "https://drive.google.com/drive/folders/1lbniG5F2ZeoO-HrxS_lg2mOPlM_nEJCL?usp=sharing",
        webLink: "https://play.unity.com/es/user/98453246-b7ce-49c5-ab6b-c4f3c5546cb9",

        relevance: 30
    },
    {
        key:"rapbattle",
        title: "Rap Battle Game",
        subtitleES: "Un test de mecánicas sobre eleccion de diálogos durante una batalla de rap, incluyendo sincronización con música.",
        subtitleEN: "A mechanics test for dialogue choices during a rap battle, featuring music synchronization.",
        subtitleCAT: "Un test de mecàniques sobre elecció de diàlegs durant una batalla de rap, incloent sincronització amb la música.",
        descriptionES: `Una idea en la que el reto consiste en elegir la mejor frase posible durante un patrón breve de espera. El beat musical marca el ritmo del gameloop en 4 fases: frase del rival, elegir respuesta, rapear la respuesta, escuchar la reacción del público. Cada respuesta posible tiene una puntuación asociada (+1, -1 o 0).
        El mayor reto técnico es triggear eventos cuando la muestra de sonido alcanza un sample concreto. La implementación de audio de Unity para WebGL es una cosa.
        `,
        descriptionCAT: `
        Una idea on el repte consisteix a triar la millor frase possible durant un patró breu d'espera. El beat musical marca el ritme del gameloop en 4 fases: frase del rival, triar resposta, rapejar la resposta, escoltar la reacció del públic. Cada resposta possible té una puntuació associada (+1, –1 o 0).
        El repte tècnic més gran és triggear esdeveniments quan la mostra de so arriba a un sample concret. La implementació d'àudio d'Unity per a WebGL és una cosa.
        `,
        descriptionEN: `
        An idea where the challenge is to choose the best possible phrase during a short holding pattern. The musical beat sets the rhythm of the gameloop in 4 phases: rival's phrase, choose an answer, rap the answer, listen to the audience's reaction. Each possible answer has an associated score (+1, -1 or 0).
        The biggest technical challenge is triggering events when the sound sample reaches a specific sample. Unity's audio implementation for WebGL is one thing.
        `,
        numberOfImages: 2,
        repoLink: "https://gitlab.com/aruizgarcia14/juego-de-aventuras-alvaro-ruiz",
        windowsLink: "https://drive.google.com/drive/folders/1lbniG5F2ZeoO-HrxS_lg2mOPlM_nEJCL?usp=sharing",
        relevance: 25,
        tags: ["C#", "Unity 2D"]

    },
    {
        key:"mariont",
        title: "Super Marion't",
        subtitleES: "Un juego en C++/Raylib, con físicas hechas desde cero",
        subtitleEN: "a C++/Raylib Platformer Game, with handmade physics",
        subtitleCAT: "Un joc a C++/Raylib, amb físiques fetes des de zero",
        descriptionEN: `I liked how code result was pretty boilerplate and organized. The project includes basic managers every engine need (Textures, Resources, Animation, Sound, TileMap)
        and also as a basic Physics Engine, and a 2D Camera with parallax effect.
        `,
        descriptionES: `Me gustó cómo el código final resultó ser bastante boilerplate y organizado. El proyecto incluye gestores básicos que cada motor necesita (Texturas, Recursos, Animación, Sonido, TileMap)
        y también un motor de física básico, una cámara 2D con efecto de paralaje.`,
        descriptionCAT: `Em va agradar com el codi va resultar molt boilerplate i organitzat. El projecte inclou gestors bàsics que cada motor necessita (Textures, Recursos, Animació, So, TileMap)
        i també un motor físic bàsic, és a dir, una càmera 2D amb efecte de paral·laxi.`,
        numberOfImages: 2,

        repoLink: "https://gitlab.com/aruizgarcia14/pgpec2-a-platformer-in-c-with-raylib",
        windowsLink: "https://gitlab.com/aruizgarcia14/pgpec2-a-platformer-in-c-with-raylib/-/tree/main/build/x64-Release?ref_type=heads",
        relevance: 55,
        tags: ["C++", "OpenGL"]
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
        La clave del éxito fue introducir una observación específica para cada agente (amIBeingAggroed), esto logró una victoria de más de un 90%.
    `,
        descriptionEN: `
        In this project, I used Unity ML-Agents to train a group of three "robbers" to cooperate and reach a nest guarded by an AI bee. 
        The most interesting part was the reward function refinement; agents initially learned "coward" behaviors to avoid death penalties, leading me to implement proximity-based rewards. 
        The breakthrough came from adding a specific observation for each agent (amIBeingAggroed), resulting in a 90% win rate.
    `,
        descriptionCAT: `
        En aquest projecte vaig utilitzar Unity ML-Agents per entrenar un grup de tres "lladres" que han de cooperar per assolir un niu custodiat per una IA enemiga. 
        El més interessant va ser el procés de refinament de la funció de recompensa; inicialment, els agents van aprendre a ser "covards" per evitar penalitzacions per mort, cosa que em va obligar a ajustar els pesos i afegir recompenses per proximitat a l'objectiu.
        La clau de lèxit va ser introduir una observació específica a cada agent (amIBeingAggroed), això va aconseguir una victòria de més dun 90%.
        `,
        tags: [
            "C#",
            "ML-Agents",
        ],
        video: "final-demo.mp4",
        numberOfImages: 1,
        repoLink: "https://gitlab.com/aruizgarcia14/iapec3-machine-learning-with-unity-ml-agents", // Ajustar según tu URL
        relevance: 80
    },
    {
        key: "low-level-bricks",
        title: "Low-Level Bricks",
        subtitleES: "Arcade multiplayer de alto rendimiento desarrollado en C++ y OpenGL",
        subtitleEN: "High-performance multiplayer arcade game built with C++ and OpenGL",
        subtitleCAT: "Arcade multiplayer d'alt rendiment desenvolupat en C++ i OpenGL",
        descriptionES: "Versión extendida del clásico Breakout con soporte para multijugador local. Implementa un motor de renderizado propio (Shaders, Post-procesado) y un sistema de físicas basado en el tutorial de LearnOpenGL. Destaca el uso de herencia en el Game Controller para la lógica de dos jugadores y un motor de audio en SDL_mixer.",
        descriptionEN: "Extended Breakout-style arcade with local multiplayer support. Features a custom rendering engine (Shaders, Post-processing) and physics built on C++ and OpenGL. Key highlights include an inheritance-based architecture on the Game Controller for 2-player logic and an SDL_mixer audio engine.",
        descriptionCAT: "Versió estesa del clàssic Breakout amb suport per a multijugador local. Implementa un motor de renderització propi (Shaders, Post-processat) i un sistema de físiques basat en el tutorial de LearnOpenGL. Destaca l'ús d'herència en el Game Controller per a la lògica de dos jugadors i un motor d'àudio en SDL_mixer.",
        tags: ["C++", "OpenGL", "SDL2", "Multiplayer"],
        video: "LowLevelBricksDemo.mp4",
        numberOfImages: 4,
        repoLink: "https://gitlab.com/aruizgarcia14/pgpec3-a-game-in-c-with-opengl",
        windowsLink: "https://gitlab.com/aruizgarcia14/pgpec3-a-game-in-c-with-opengl/-/tree/main/build?ref_type=heads",
        relevance: 75
    },
    {
        key: "tanks",
        title: "Tanks! You're Welcome",
        subtitleES: "Un juego multijugador, tanto en local como online",
        subtitleEN: "A multiplayer game, both local and online",
        subtitleCAT: "Un joc multijugador, tant en local com online",
        descriptionES: `En este juego, bombardearemos a los tanques de nuestros amigos durante una serie de rondas. En local, dividiremos la pantalla y añadiremos un minimapa. En el modo online, usaremos la librería de Mirror y sincronización con leaderboards en Playfab.
            El sistema de colisión de la cámara y el código son altamente reciclables.`,
        descriptionEN:`
        In this game, we bomb our friends' tanks over a series of rounds. The local mode features split-screen and a minimap, while the online mode uses the Mirror library and leaderboard synchronization via Playfab. Both the camera collision system and the code are highly reusable.
        `,
        descriptionCAT: `
        En aquest joc, bombardejarem els tancs dels nostres amics durant una sèrie de rondes. En local, dividirem la pantalla i afegirem un minimapa. En el mode online, utilitzarem la llibreria de Mirror i sincronització amb leaderboards a Playfab. El sistema de col·lisió de la càmera i el codi són altament reciclables.
        ` ,
        tags: ["C#", "Unity 3D", "Multiplayer"],
        gif: "CamCollisions.gif",
        numberOfImages: 2,
        repoLink: "https://gitlab.com/aruizgarcia14/jmpec1-alvaroruiz",
        repoLink2:"https://gitlab.com/aruizgarcia14/jm-practica-final",
        windowsLink: "https://drive.google.com/drive/folders/1rJ6Yp1zIPcwDtg_cJLMW28tB9vyyLLVh?usp=sharing",
        relevance: 50,
    },

    {
        key: "ocalight",
        title: "Ocaligh",
        subtitleES: "El proyecto más sencillo, simple y moderadamente divertido que verás hoy.",
        subtitleEN: "The simplest and most moderately fun project you will see today.",
        subtitleCAT: "El projecte més senzill, simple i moderadament divertit que veuràs avui.",
        descriptionES: ` Cuando jugamos al clásico juego de la Oca, no tomamos ninguna decisión. Esto hace posible que simplemente pulsando un botón, un programa calcule los resultados.
        Por suerte, me tomé yo mismo la molestia en hacerlo. Disfruta, pero moderadamente.
        `,
        descriptionEN:`When we play the classic Game of the Goose, we don't make any decisions. This makes it possible for a program to calculate the results with just the press of a button.
        Luckily, I took the trouble to do it myself. Enjoy, but moderately.
        `,
        descriptionCAT: `Quan juguem al clàssic joc de l'Oca, no prenem cap decisió. Això fa possible que, simplement prement un botó, un programa calculi els resultats.
        Per sort, m'he pres la molèstia de fer-ho jo mateix. Gaudeix-ne, però moderadament.
        `,
        tags: ["Web", "Multiplayer"],
        webLink: "https://ocalight.barxetitafest.es/?i=1",
        numberOfImages: 1,
        relevance: -100, // Siempre el último

    },
    {
        key: "this",
        title: "this.project",
        subtitleES: "Este portfolio ha sido hecho con Three.js y Bootstrap",
        subtitleEN: "This portfolio was built using Three.js and Bootstrap",
        subtitleCAT: "Aquest portfolio ha estat fet amb Three.js i Bootstrap",
        descriptionES: "Autoalojado en mi pequeña Raspberry, un espacio personal en el que aprender renderizados 3D en web, y compartir y mostrar mis proyectos.",
        descriptionEN: "Self-hosted on my small Raspberry Pi, a personal space to learn 3D web rendering and to share and showcase my projects.",
        descriptionCAT: "Autoallotjat en la meva petita Raspberry Pi, un espai personal on aprendre renderitzats 3D en web, i compartir i mostrar els meus projectes.",
        tags: ["Web"],
        webLink: "index.html",
        repoLink: "https://github.com/alvaroesalvaroo/portfolio",
        numberOfImages: 1,
        relevance: -10,

    },


    {
        key: "nebulosa",
        title: "Gravity Ballet",
        subtitleES: "Simulación de gravedad N-cuerpos y efectos visuales renderizados por CPU con SDL2",
        subtitleEN: "N-body gravity simulation and CPU-rendered visual effects",
        subtitleCAT: "Simulació de gravetat N-cossos i efectes visuals renderitzats per CPU amb SDL2",

        descriptionES: `
       Un experimento de física y gráficos "low-level" en C++. Implementa una coreografía gravitatoria donde las partículas generan una nebulosa dinámica. 
       El desafío principal fue optimizar el renderizado manual de píxeles y el uso de buffers precalculados para funciones de seno cardinal, evitando el uso de la GPU para el blending.
       `,
        descriptionCAT: `
       Un experiment de física i gràfics "low-level" en C++. Implementa una coreografia gravitatòria on les partícules generen una nebulosa dinàmica. 
       El desfici principal va ser optimitzar el renderitzat manual de píxels i l'ús de buffers precalculats per a funcions de sinus cardinal, evitant l'ús de la GPU per al blending.
        `,
        descriptionEN:`
        A low-level C++ physics and graphics experiment. It simulates a gravitational ballet where particles generate a dynamic nebula effect. 
        The main challenge was optimizing manual pixel-buffer rendering and using precomputed sine function buffers to achieve smooth visuals entirely on the CPU without hardware blending.
        `,

        tags: ["C++", "SDL2"],
        numberOfImages: 2,
        video: "Nebulosa.mp4",
        repoLink: "https://gitlab.com/aruizgarcia14/evs-cpu-rendered-particle-nebulae-effect",
        windowsLink: "https://gitlab.com/aruizgarcia14/evs-cpu-rendered-particle-nebulae-effect/-/tree/master/build/x64-Boxed",
        webLink: "",
        relevance: 20
    },


];


function addLinksToCard(project, linkContainer) {
    // const linkContainer = templateClone.querySelector(".links-container");
    if (!linkContainer) return;

    linkContainer.innerHTML = "";

    const createLink = (href, iconClass) => {
        if (!href) return null;

        const a = document.createElement('a');
        a.className = "project-link";
        a.href = href;
        a.target = "_blank";

        a.onclick = (event) => {
            event.stopPropagation(); // Esto evita que el clic "suba" hasta el card.onclick
        };

        const icon = document.createElement('i');
        icon.className = iconClass;
        a.appendChild(icon);

        return a;
    };

    // Repo Link (GitLab / GitHub)
    if (project.repoLink) {
        let iconType = "bi bi-link-45deg";
        if (project.repoLink.toLowerCase().includes("gitlab")) iconType = "bi bi-gitlab";
        if (project.repoLink.toLowerCase().includes("github")) iconType = "bi bi-github";

        const linkEl = createLink(project.repoLink, iconType);
        if (linkEl) linkContainer.appendChild(linkEl);
    }

    // Windows Link
    if (project.windowsLink) {
        const winLink = createLink(project.windowsLink, "bi bi-windows");
        if (winLink) linkContainer.appendChild(winLink);
    }

    // Web Link
    if (project.webLink) {
        const webLink = createLink(project.webLink, "bi bi-globe");
        if (webLink) linkContainer.appendChild(webLink);
    }

    if (!project.repoLink && !project.webLink && !project.windowsLink) {
        linkContainer.remove();
    }
}

// Projects logic
function createProjectCard(project, template, container) {
    // Clonar template
    const clone = template.content.cloneNode(true);

    let card = clone.querySelector('.project-index-item');
    card.onclick = () => {
        window.location.href = "project-details.html?projectKey="+project.key;
    };
    // Rellenar los datos dentro del clon
    let title = clone.querySelector('.project-title');
    title.textContent = project.title;
    title.classList.add(project.key+"-title");
    let subtitle = clone.querySelector('.service-description');

    // Asinar la key correspondiente para el servicio de traudcción
    if (!project.subtitleES) {
        subtitle.remove();
    } else {
        subtitle.setAttribute('data-lang-key', project.key + "-subtitle");
        subtitle.textContent = project.subtitleES; // Just in case
    }
    const linkContainer = clone.querySelector(".links-container");
    addLinksToCard(project, linkContainer);

    // Añadir imagenes
    let image = clone.querySelector('img');
    // En la pagina inicial, solo cargamos la primera imagen
    if (project.gif && project.gifIsFirst) {
        image.src = "assets/img/projects/" + project.key + "/" + project.gif;
    }
    else {
        image.src = "assets/img/projects/" + project.key + "/01.webp";
    }

    // Inyectamos en el DOM
    container.appendChild(clone);
}

function createProjectsInIndex(projectsArray) {
    const container = document.querySelector("#projects-container");
    const template = document.querySelector("#project-index-template");
    console.log("creating index projects carrousel");
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
    let tagContainer = document.querySelector(".tags-container-dropdown");

    if (!tagContainer) {
        console.warn("No tags will be created since .tags-container-dropdown was not found");
        return;
    }
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
            i.toString().padStart(2, '0') + ".webp";
        container.appendChild(clone);
    }

    // Gif
    if (project.gif)
    {
        const clone = template.content.cloneNode(true);
        let image = clone.querySelector('img');

        image.src = "assets/img/projects/" + project.key + "/" +
            project.gif;
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


    // Añadir tags
    createTags(project);

    // Añadir proyectos similares
    createSimilarProjects(project);

    let title = document.querySelector('#project-title');
    title.textContent = project.title;
    title.classList.add(project.key + "-title");
    let subtitle = document.querySelector('#project-subtitle');
    // Asinar la key correspondiente para el servicio de traudcción
    subtitle.setAttribute('data-lang-key', project.key + "-subtitle");
    subtitle.textContent = project.subtitleES; // Just in case

    let description = document.querySelector('#project-description');
    description.textContent = project.descriptionES;
    description.setAttribute('data-lang-key', project.key + "-description");

    let linksContainer = document.querySelector('.links-container-detail');

    // Si existe un link, poner un boton
    addLinksToCard(project, linksContainer);

    // Añadir imagenes, a no ser que...
    if (project.key !== "this") {
        createMediaCarrousel(project)
    }
}

function setupTagsDropdown() {
    const btnDropdown = document.querySelector(".btn-dropdown");
    const tagContainer = document.querySelector(".tags-container-dropdown");

    btnDropdown.addEventListener("click", function () {

        // Mover elementos
        this.classList.toggle("active");
        const isNowActive = tagContainer.classList.toggle("show");

        // Despues del transition time, recargamos proyectos
        setTimeout(() => {

            // 3. Si se acaba de cerrar (no está activo), resetear proyectos
            if (!isNowActive) {
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
    applyTranslations();

});

