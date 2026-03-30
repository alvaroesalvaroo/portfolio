import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const modelPath = "./assets/3Dmodels/laboratorio-small.glb";

const scene = new THREE.Scene();
window.skillsScene = scene; // Open up this object


let container = {};
const sizes = {};

// Create renderer in html canvas webgl element
let canvas = {};
let renderer = {};
let controls = {};
let controlsDomElement = {};


// Reference for creating other canvas inside
let cssScreen = {};

// La xinxeta es un secret debug
let xinxeta;

const lights = [];

function setupLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);
    for (const light of lights) {
        light.intensity = 15;
    }
}

function onSceneLoaded(model)
{
    scene.add( model );
    let meshCount = 0;


    model.traverse( ( child ) => {
        if (child.isMesh) {
            meshCount++;
            child.receiveShadow = true;
        } else if (child.isLight) {
            lights.push(child);
        }

        if (child.name.startsWith("CameraPosition")) {
            console.log("cam position found on small lab scene");
            camPositions.push(child);
        }

        if (child.name === "screen") {
            cssScreen = child;
        }

        if (child.name.includes("Circle.002") ) {
            xinxeta = child;
        }

    })

    console.log("Loaded scene with mesh count: " + meshCount);
}

// ---------
// SCREEN RESIZE
// --------

function resize () {
    // Update sizes
    sizes.width = container.clientWidth - 1;
    sizes.height = container.clientHeight - 1;
    // console.log("Resized lab small canvas to " + sizes.width + ", " + sizes.height);
    camera.aspect = sizes.width / sizes.height;
    let isNarrowDevice = sizes.width < narrowThreshold;
    camera.setFocalLength(isNarrowDevice ? fovNarrow : fov);
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}



//--------------
// INIT SCENE AND CAMERA
// ------------

const fov = 50;
const fovNarrow = 45; // For (narrow) mobile devices
const narrowThreshold = 500;

let camera;

let camPositions = [];

function init() {

    // Select and clear container
    container = document.querySelector('#project-details-section .project-slider');
    // Save original size
    sizes.width = container.clientWidth - 1; sizes.height = container.clientHeight - 1;

    container.classList.remove('init-swiper');
    container.classList.add('extra-webgl-container');
    container.innerHTML = "";

    // Append canvas
    canvas = document.createElement("canvas");
    container.appendChild(canvas);
    // canvas.style.zIndex = '1';


    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true // To combine other renderers
    });

    // Controls related
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.pointerEvents = 'none';
    // Por encima de canvas renderer  de controlsElement, pero sin recibir eventos
    renderer.domElement.style.zIndex = '10';

    camera = new THREE.PerspectiveCamera(fov,
        sizes.width / sizes.height,   // aspect
        0.01,                          // near point
        1000                          // far away point
    );

    // Controls require an invisible dom element
    const controlsDomElement = document.createElement('div');
    controlsDomElement.classList.add('controls');
    controlsDomElement.style.position = 'absolute';
    controlsDomElement.style.top = '0';
    controlsDomElement.style.width = '100%';
    controlsDomElement.style.height = '100%';
    controlsDomElement.style.pointerEvents = 'auto';
    controlsDomElement.style.zIndex = '1'; // Debajo de CSS Renderer y debajo de WebGl Renderer, pero capturando pointer events
    container.appendChild(controlsDomElement);
    // document.body.appendChild(controlsDomElement);

    controls = new OrbitControls(camera);
    controls.connect( controlsDomElement );
    controls.enableDamping = true; // Suaviza el movimiento (da inercia)
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false; // Mantiene el eje Y estable


    // When controls are used, css screen is not interactable
    controls.addEventListener('start', () => {
        window.onControlsStart();
    });

    controls.addEventListener('end', () => {
        // controlsDomElement.style.pointerEvents = 'none';
        window.onControlsEnd();
    });

    // container.addEventListener('mousedown', (e) => {
    //     // Si el clic NO fue en el iframe, activamos el escudo
    //     if (e.target === controlsDomElement) {
    //         controlsDomElement.style.pointerEvents = 'auto';
    //     }
    // }, true); // Usamos 'true' para capturar el evento antes que nadie


    window.addEventListener("resize", resize);

    console.log("Init lab (small) scene in container with sizes: " + sizes.width + ", " + sizes.height);

    // Load glb model
    const loader = new GLTFLoader();

    // AFTER LOAD MODEL
    loader.load( modelPath, function ( gltf ) {
        onSceneLoaded(gltf.scene);
        setupLights();
        resize();

        initCSS3D(container, cssScreen, "index.html");

        controls.target.copy(cssScreen.position);
        controls.update();

        const currentAzimuth = controls.getAzimuthalAngle();
        controls.minAzimuthAngle = currentAzimuth - 45 * (Math.PI / 180);
        controls.maxAzimuthAngle = currentAzimuth + 40 * (Math.PI / 180);

        const currentPolar = controls.getPolarAngle();
        controls.minPolarAngle = 45 * (Math.PI / 180);
        // controls.minPolarAngle = currentPolar - 2 * (Math.PI / 180); // 45 grados hacia arriba
        controls.maxPolarAngle = 98 * (Math.PI / 180); // Un poco hacia abajo
        controls.update();

        const initialDistance = camera.position.distanceTo(controls.target);
        controls.minDistance = initialDistance;
        controls.maxDistance = initialDistance + 1;

        camera.position.copy(camPositions[0].position);
        // camera.lookAt(screen.position);
        renderer.setAnimationLoop( animate );

    }, undefined, function ( error ) {
        console.error( "Error loading model" + error );
    } );
}

// -------------
// MAIN LOOP

const clock = new THREE.Clock();
let deltaTime;

function animate() {

    controls.update(); // Solo necesario si enableDamping = true o autoRotate = true

    // Render
    renderer.render(scene, camera);

    try {
        renderCSS(camera);
    } catch (e) {
        console.error(e);
    }
}

// ---------
// CONDITIONAL INIT
function isProjectPage() {
    const params = new URLSearchParams(window.location.search);
    return params.get('projectKey') === "this";
}

if (isProjectPage()) {
    init();
}

