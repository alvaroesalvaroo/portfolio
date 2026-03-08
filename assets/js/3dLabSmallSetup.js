import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const modelPath = "./assets/3Dmodels/laboratorio-small.glb";

const scene = new THREE.Scene();
window.skillsScene = scene; // Open up this object


let container = {};
const sizes = {
    width: container.clientWidth - 1,
    height: container.clientWidth -1 ,
};

// Create renderer in html canvas webgl element
let canvas = {};
let renderer = {};


// Reference for creating other canvas inside
let screen = {};



const lights = [];

function setupLights() {
    for (const light of lights) {
        light.intensity = 10;
        if (light.name.includes("Spot")) {
            light.intensity = 0;
        }
    }
}

function onSceneLoaded(model)
{
    scene.add( model );
    let childCount = 0;

    model.traverse( ( child ) => {
        if (child.isMesh) {
            childCount++;
            child.receiveShadow = true;
        } else if (child.isLight) {
            lights.push(child);
        }

        if (child.name.startsWith("CameraPosition")) {
            console.log("cam position found on lab scene");
            camPositions.push(child);
        }

        if (child.name === "screen") {
            screen = child;
        }

    })
}

// ---------
// SCREEN RESIZE
// --------
window.addEventListener("resize", resize);

function resize () {
    // Update sizes
    sizes.width = container.clientWidth - 1;
    sizes.height = container.clientHeight - 1;
    console.log("Resized lab canvas to " + sizes.width + ", " + sizes.height);
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

    container = document.querySelector('.extra-webgl-container');
    canvas = document.querySelector(".extra-webgl-container canvas");
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true // To combine other renderers
    });

    // ===== CSSRenderer stuff ========= //
    renderer.domElement.style.zIndex = '1';
    renderer.domElement.style.pointerEvents = 'none';

    console.log("Init lab (small) scene in container with sizes: " + sizes.width + ", " + sizes.height);

    // Load glb model
    const loader = new GLTFLoader();
    // Onload
    loader.load( modelPath, function ( gltf ) {
        onSceneLoaded(gltf.scene);
        setupLights();
        resize();

        initCSS3D(container, screen);

        camera.position.copy(camPositions[0].position);
        camera.rotation.copy(camPositions[0].rotation);

        renderer.setAnimationLoop( animate );


    }, undefined, function ( error ) {
        console.error( error );
    } );
}

// -------------
// MAIN LOOP

const clock = new THREE.Clock();
let deltaTime;

function animate() {

    // Update
    deltaTime = clock.getDelta();

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

