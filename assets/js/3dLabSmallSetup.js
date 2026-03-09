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


// Reference for creating other canvas inside
let screen = {};



const lights = [];

function setupLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);
    for (const light of lights) {
        light.intensity = 10;
    }
}
let xinxeta;
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
            screen = child;
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
    console.log("Resized lab small canvas to " + sizes.width + ", " + sizes.height);
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

let camera = new THREE.PerspectiveCamera(
    fov,
    sizes.width / sizes.height,   // aspect
    0.01,                          // near point
    1000                          // far away point
);

let camPositions = [];

function init() {

    // Create and clearn container
    container = document.querySelector('#project-details-section .project-slider');
    container.classList.remove('init-swiper');
    container.classList.add('extra-webgl-container');
    container.innerHTML = "";

    sizes.width = container.clientWidth - 1; sizes.height = container.clientHeight - 1;
    canvas = document.createElement("canvas");
    container.appendChild(canvas);

    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true // To combine other renderers
    });

    // ===== CSSRenderer stuff ========= //
    renderer.domElement.style.zIndex = '1';
    renderer.domElement.style.pointerEvents = 'none';

    window.addEventListener("resize", resize);

    console.log("Init lab (small) scene in container with sizes: " + sizes.width + ", " + sizes.height);

    // Load glb model
    const loader = new GLTFLoader();
    // Onload
    loader.load( modelPath, function ( gltf ) {
        onSceneLoaded(gltf.scene);
        setupLights();
        resize();

        initCSS3D(container, screen, "index.html");

        camera.position.copy(camPositions[0].position);
        camera.lookAt(screen.position);
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

