import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import CustomCamera from './CustomCamera.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

const modelPath = "./assets/3Dmodels/laboratorio.glb";

const scene = new THREE.Scene();
window.scene = scene;
// const container = window;
const container = document.querySelector('.extra-webgl-container');
console.log(container);
const sizes = {
    width: container.clientWidth,
    height: container.clientWidth,
};

console.log("container sizes are " + sizes.width + ", " + sizes.height);

// Create renderer in html canvas webgl element
const canvas = document.querySelector(".extra-webgl-container canvas");
const renderer = new THREE.WebGLRenderer({canvas});




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

function onScenelLoaded(model)
{
    scene.add( model );
    let childCount = 0;
    model.traverse( ( child ) => {
        if (child.isMesh) {
            childCount++;
            // console.log("Mesh loaded: " + child.name);
            // debugModelMatsAndTextures(model);
        } else if (child.isLight) {
            // Light adjustement
            lights.push(child);
        }

        if (child.name.startsWith("CameraPosition")) {
            console.log("cam position found");
            camPositions.push(child);
        }
        if (child.name.includes("CameraLookAt"))
        {
            console.log("Found camera look at");

            // camTarget = child;
        }

    })

    setupLights();
    console.log("Scene loaded: " + modelPath + " with mesh children: " + childCount);



}


// ---------
// ---------
// SCREEN RESIZE
// --------
function resize () {
    // Update sizes
    sizes.width = container.clientWidth;
    sizes.height = container.clientHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

window.addEventListener("resize", resize);


//--------------
// INIT SCENE AND CAMERA
// ------------

let camera = new THREE.PerspectiveCamera(
    25,
    sizes.width / sizes.height,   // aspect
    0.1,                          // near point
    1000                          // far away point
);
const rotationSpeed = 1;
const speed = 1;
let currentTargetIndex = 0;
let camPositions = [];
// let camTarget;


let initialRotationY= null;

let angleBounds = [0.5, -0.5];


const buttonKeys = ["cambutton3D", "cambuttonWeb", "cambuttonPhysics", "cambuttonMusic"];
const langKeys = ["3dartist-description", "fullstack-description", "sound-description", "physicist-description"];
function setupButtons() {
    for (let i = 0; i < buttonKeys.length; i++) {
        let button = document.querySelector("#" + buttonKeys[i]);

        if (!button) console.log("button key is missing " + buttonKeys[i]);
        button.addEventListener("click", (e) => {
            currentTargetIndex = i;
        })
    }
}
// TODO:
const descriptionElement = document.querySelector(".tab-content h5");
function changeDescription(index) {
    descriptionElement.dataset.dataLangKey = langKeys[index];
    try { applyTranslations()}
    catch(e) { console.warn("Translations could not be applied")}
}




function init() {
    resize();

    // Load glb model
    const loader = new GLTFLoader();
    // Onload
    loader.load( modelPath, function ( gltf ) {
        onScenelLoaded(gltf.scene);
        setupButtons();

        camera.position.copy(camPositions[0].position);
        camera.rotation.copy(camPositions[0].rotation);
        console.log("cam move to ", camPositions[0].position);
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


function lerpCameraPositionAndRotation(deltaTime) {

    if (camPositions.length === 0) console.log("No cam targets!");

    const activeTarget = camPositions[currentTargetIndex];
    activeTarget.updateWorldMatrix(true, false);
    activeTarget.getWorldPosition(targetPos);

    const distance = camera.position.distanceTo(targetPos);
    if (distance > 0.005) {
        // Lerp position
        camera.position.lerpVectors(camera.position, targetPos, speed * deltaTime);
    }

    // Sustituyamos     activeTarget.getWorldQuaternion(targetQuat); por este follon:
    m1.extractRotation(activeTarget.matrixWorld);
    m1.multiply(correction);
    targetQuat.setFromRotationMatrix(m1);
    // Lerp rotation
    // Quaternions are a thing. when quaternion.dot gets to 1, angle is the same
    if (1 - Math.abs(camera.quaternion.dot(targetQuat)) > 0.000001) {
        camera.quaternion.slerp(targetQuat, rotationSpeed * deltaTime);
    }
}

function animate() {
    const deltaTime = clock.getDelta();
    lerpCameraPositionAndRotation(deltaTime);

    renderer.render(scene, camera);

}

init();

