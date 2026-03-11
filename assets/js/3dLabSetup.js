import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";


const modelPath = "./assets/3Dmodels/laboratorio.glb";

const scene = new THREE.Scene();
window.skillsScene = scene; // Open up this object

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

// CAMERA
const fov = 50;
const fovNarrow = 45; // For (narrow) mobile devices
const narrowThreshold = 500; // device screen width theshold (in pixels) to change fov

let camera = new THREE.PerspectiveCamera(fov, sizes.width / sizes.height, 0.01, 1000);

const rotationSpeed = 5;
const speed = 1;
let currentTargetIndex = 0;
let camPositions = [];

const constrolsDomElement = document.createElement("div");
constrolsDomElement.style.position = "absolute";
constrolsDomElement.style.top = "0px";
constrolsDomElement.style.width = "100%";
constrolsDomElement.style.height = "100%";
constrolsDomElement.style.zIndex = "1";
container.appendChild(constrolsDomElement);
const controls = new OrbitControls(camera);
controls.enableZoom = false;
controls.enableRotate = false;
controls.enablePan = true;
controls.enableDamping = false;
// controls.screenSpacePanning = false;
controls.mouseButtons = {
    LEFT: THREE.MOUSE.PAN,
    MIDDLE: THREE.MOUSE.DOLLY, // Zoom con rueda
    RIGHT: THREE.MOUSE.PAN
};

// 4. Mapeo para Touch (Un dedo ahora es PAN en lugar de ROTATE)
controls.touches = {
    ONE: THREE.TOUCH.PAN,
    TWO: THREE.TOUCH.DOLLY_PAN // Zoom y pan con dos dedos
};
controls.connect(constrolsDomElement);

let areControlsReceivingInputs = false;
// let isOnTransition = true; // Legacy system
controls.addEventListener('start', () => {
    areControlsReceivingInputs = true;
    // window.onControlsStart();
});

controls.addEventListener('end', () => {
    areControlsReceivingInputs = false;
    controls.update();
    // window.onControlsEnd();
});

// ===== CSSRenderer stuff ========= //
renderer.domElement.style.zIndex = '2';
renderer.domElement.style.pointerEvents = 'none';

function debugModelMatsAndTextures(model)
{
    console.log("Success loading " + model.name+ " with mesh children");
    model.traverse( ( child ) => {

        const materials = Array.isArray(child.material) ? child.material : [child.material];
        for (const mat of materials) {
            if (!mat) continue;
            console.log("material " + mat.name+ " of object" + child.name);

            const textureKeys = ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'emissiveMap'];
            for (const key in textureKeys) {
                if (mat[key]) {
                    console.log("texture " + mat[key].name+ " of object" + child.name);
                }
            }

        }

    });

}


const lights = [];

function setupLights() {
    // Ajustar luz ambiente
    // const ambientLight = new THREE.AmbientLight(0xffffff, 1.3); // Luz general, suave
    // scene.add(ambientLight);
    //
    // const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
    // sunLight.rotation.set(5, 10, 7.5); // Orientación del sol
    // sunLight.castShadow = true;
    // sunLight.shadow.mapSize.width = 1024;
    // sunLight.shadow.mapSize.height = 1024;
    // sunLight.shadow.camera.near = 0.5;
    // sunLight.shadow.camera.far = 50;

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
            child.updateWorldMatrix(true, false);
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
// INIT SCENE
// ------------
let targetDistances = ["2", "2", "2", "2"];

function updateControlsTarget() {
    const activeTarget = camPositions[currentTargetIndex];
    controls.enabled = false;
    controls.enableDamping = false;

    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyQuaternion(camera.quaternion); // Dirección a la que mira la cámara
    // El nuevo target estará a 1 unidad de la cámara
    const newTarget = new THREE.Vector3().copy(camera.position).add(forward.multiplyScalar(targetDistances[currentTargetIndex]));
    controls.target.copy(newTarget);

    // Resetear límites antes de aplicar los nuevos (Limpieza)
    controls.minAzimuthAngle = -Infinity;
    controls.maxAzimuthAngle = Infinity;
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI;
    controls.update();

    controls.minPolarAngle = 40 * Math.PI / 180;
    controls.maxPolarAngle = 90 * Math.PI / 180;
    controls.maxAzimuthAngle = controls.getAzimuthalAngle() + 20 * Math.PI / 180;
    controls.minAzimuthAngle = controls.getAzimuthalAngle() - 20 * Math.PI / 180;

    controls.enabled = true;
    controls.enableDamping = true;
    controls.update();
}
const buttonKeys = ["cambutton3D", "cambuttonWeb", "cambuttonPhysics", "cambuttonMusic"];
const langKeys = ["3dartist-description", "fullstack-description", "physicist-description", "sound-description"];
function setupButtons() {
    for (let i = 0; i < buttonKeys.length; i++) {
        let button = document.querySelector("#" + buttonKeys[i]);

        if (!button) console.log("button key is missing " + buttonKeys[i]);
        button.addEventListener("click", () => {
            currentTargetIndex = i;
            // isOnTransition = true;
            controls.enabled = false;
            changeDescription(i);
        })
    }
}

const descriptionElement = document.querySelector("#skill-description");
function changeDescription(index) {
    descriptionElement.dataset.langKey = langKeys[index];
    try { applyTranslations()}
    catch(e) { console.warn("Translations could not be applied")}
}




function init() {
    console.log("Init lab scene in container with sizes: " + sizes.width + ", " + sizes.height);


    // Load glb model
    const loader = new GLTFLoader();
    // Onload
    loader.load( modelPath, function ( gltf ) {
        onSceneLoaded(gltf.scene);
        setupLights();
        resize();


        setupButtons();

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

const targetPos = new THREE.Vector3();
const targetQuat = new THREE.Quaternion();
const m1 = new THREE.Matrix4();
const correction = new THREE.Matrix4().makeRotationX(-Math.PI / 2);

let isPositionClose, isRotationClose;
function lerpCameraPositionAndRotation(deltaTime) {

    if (camPositions.length === 0) console.warn("No cam targets in lab scene!");

    const activeTarget = camPositions[currentTargetIndex];
    activeTarget.getWorldPosition(targetPos);

    isRotationClose = isPositionClose = false;
    const distance = camera.position.distanceTo(targetPos);

    if (distance > 0.05) {
        // Lerp position
        camera.position.lerpVectors(camera.position, targetPos, speed * deltaTime);
        isPositionClose = true;
        updateControlsTarget();
    }

    // Sustituyamos     activeTarget.getWorldQuaternion(targetQuat); por este follon:
    m1.extractRotation(activeTarget.matrixWorld);
    m1.multiply(correction);
    targetQuat.setFromRotationMatrix(m1);
    // Lerp rotation
    // Quaternions are a thing. when quaternion.dot gets to 1, angle is the same
    let howCloseIAm = Math.abs(camera.quaternion.dot(targetQuat)); // Gets to 1 quickly
    if (1 - howCloseIAm > 0.00001) {
        camera.quaternion.slerp(targetQuat, rotationSpeed * deltaTime);
        isRotationClose = true;
    }

    if (isRotationClose && isRotationClose) {
        updateControlsTarget();
    }
}

const maxPanDistance = 0.2;
function isCamaraFarAwayFromItsTarget() {
    return (camera.position.distanceTo(camPositions[currentTargetIndex].position) >= maxPanDistance);
}

const previousPos = new THREE.Vector3();
const previousControlsTarget = new THREE.Vector3();
function animate() {

    // Update
    const deltaTime = clock.getDelta();

    if (areControlsReceivingInputs) {
        previousPos.copy(camera.position);
        previousControlsTarget.copy(controls.target);
        // controls.update();
        if (isCamaraFarAwayFromItsTarget()) {
            const anchor = new THREE.Vector3();
            camPositions[currentTargetIndex].getWorldPosition(anchor);
            const direction = new THREE.Vector3().subVectors(camera.position, anchor).normalize();
            camera.position.copy(anchor).add(direction.multiplyScalar(maxPanDistance));

            controls.update();
            controls.enabled = false;
        }
    } else {
        lerpCameraPositionAndRotation(deltaTime);
    }

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
initObservedListener(container);

// Control if canvas is being observed
let isObserved = false;

function initObservedListener(mainContainer) {
    const observer = new IntersectionObserver((entries) => {
        // Como solo observamos uno, podemos acceder directamente al primer entry
        const entry = entries[0];
        isObserved = entry.isIntersecting;

        // If this scene is observed, main scene will be considered as not observed
        window.isMainSceneObserved = !isObserved;

    }, { threshold: 0.1 });

    observer.observe(mainContainer);
}

