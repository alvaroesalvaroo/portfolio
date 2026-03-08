import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const modelPath = "./assets/3Dmodels/laboratorio-small.glb";

const scene = new THREE.Scene();
window.skillsScene = scene; // Open up this object

// const container = window;
const container = document.querySelector('.extra-webgl-container');
const sizes = {
    width: container.clientWidth - 1,
    height: container.clientWidth -1 ,
};

// Create renderer in html canvas webgl element
const canvas = document.querySelector(".extra-webgl-container canvas");
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true // To combine other renderers
});

// ===== CSSRenderer stuff ========= //
renderer.domElement.style.zIndex = '1';
renderer.domElement.style.pointerEvents = 'none';

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
    let screen = {};
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
        if (child.name.includes("CameraLookAt"))
        {
            // camTarget = child;
        }
        if (child.name === "screen") {
            screen = child;
        }

    })
    initCSS3D(container, screen);
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
    console.log("Init lab scene in container with sizes: " + sizes.width + ", " + sizes.height);


    // Load glb model
    const loader = new GLTFLoader();
    // Onload
    loader.load( modelPath, function ( gltf ) {
        onSceneLoaded(gltf.scene);
        setupLights();
        resize();

        camera.position.copy(camPositions[0].position);
        camera.rotation.copy(camPositions[0].rotation);
        camera.lookAt(0, 0, 0);
        // console.log("cam look at ", camTarget.position);
       // initialRotationY = camera.rotation.y;
        renderer.setAnimationLoop( animate );


    }, undefined, function ( error ) {
        console.error( error );
    } );
}

// -------------
// MAIN LOOP
// Constants are create outside for a better optimization

const clock = new THREE.Clock();

function animate() {

    // Update
    const deltaTime = clock.getDelta();

    if (!isObserved)    return; // Skip render when not observed

    // Render
    renderer.render(scene, camera);

    try {
       renderCSS(camera);
    } catch (e) {
        console.error(e);
    }

}

init();
