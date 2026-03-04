import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import CustomCamera from './CustomCamera.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

const modelPath = "./assets/3Dmodels/laboratorio.glb";

const scene = new THREE.Scene();
const container = document.querySelector(".extra-webgl-container");
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

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

// TODO:
function setupLight(light) {
    console.log(`Luz detectada: ${light.name} | Intensidad original: ${light.intensity}`);
    light.intensity = 10;
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
            setupLight(child);
        }

        if (child.name.includes("CameraPosition1") || child.name.includes("CameraPosition2")) {
            console.log("Append target");
            camPositions.push(child);
        }
        if (child.name.includes("CameraLookAt"))
        {
            console.log("Found camera look at");

            camTarget = child;
        }

    })
    console.log("Scene loaded: " + modelPath + " with mesh children: " + childCount);
}

function createLights()
{

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // Luz general, suave
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-2, 0, -5);

    scene.add(directionalLight);
    scene.add(directionalLight.target);
}

function moveCameraToBlenderPosition() {
    scene.traverse( ( child ) => {
        if (child.name === "CameraPosition") {
            child.updateWorldMatrix(true, false);
            const worldPos = new THREE.Vector3();
            console.log(worldPos);
            child.getWorldPosition(worldPos);
            camera.position.copy(worldPos);
            // camera.rotation.copy(child.rotation);
            // camera.updateProjectionMatrix();
        }
    })
}

// ---------
// SCREEN RESIZE
// --------
window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//--------------
// INIT SCENE AND CAMERA
// ------------

let camera = new THREE.PerspectiveCamera(
    50,
    sizes.width / sizes.height,   // aspect
    0.1,                          // near point
    1000                          // far away point
);
const rotationSpeed = 1;
const maxMoveSpeed = 1;
const minMoveSpeed = 0.2;
let currentTargetIndex = 0;
let camPositions = [];
let camTarget;


let initialRotationY= null;

let angleBounds = [0.5, -0.5];

function calibrateCameraPosition() {
    // Initial camera "hardcoded" calibration to refine blender's position in responsive

    // Works ok for mobile
    // camPositions[0].position.y -= 1;
    // camPositions[1].position.x += 0.1;

}
function init() {
    renderer.setSize( sizes.width, sizes.height );




    // Load glb model
    const loader = new GLTFLoader();
    // Onload
    loader.load( modelPath, function ( gltf ) {
        onScenelLoaded(gltf.scene);
        // createLights();
       // moveCameraToBlenderPosition();

        calibrateCameraPosition();

        camera.position.copy(camPositions[0].position);

        camera.lookAt(camTarget.position);
       // initialRotationY = camera.rotation.y;
        renderer.setAnimationLoop( animate );


    }, undefined, function ( error ) {
        console.error( error );
    } );
}

// -------------
// MAIN LOOP
// ---------------

const clock = new THREE.Clock();

const targetPos = new THREE.Vector3();
const targetQuat = new THREE.Quaternion();

function animate() {
    const deltaTime = clock.getDelta();

    if (camPositions.length === 0) console.log("No cam targets!");
    const activeTarget = camPositions[currentTargetIndex];

    activeTarget.updateWorldMatrix(true, false);
    activeTarget.getWorldPosition(targetPos);
    activeTarget.getWorldQuaternion(targetQuat);



    // camera.quaternion.slerp(targetQuat, rotationSpeed * deltaTime);    // Render
    camera.lookAt(camTarget.position);

    camera.updateProjectionMatrix();

    const distance = camera.position.distanceTo(targetPos);
    let speed = maxMoveSpeed;
    if (distance < 1)
    {
        speed = maxMoveSpeed *distance/1;
    }
    if (distance < 0.1) {
        speed = minMoveSpeed;
        currentTargetIndex = (currentTargetIndex + 1) % camPositions.length;
        console.log("Objetivo alcanzado. Cambiando a:", camPositions[currentTargetIndex].name);
    }
    else
    {
        const direction = new THREE.Vector3().subVectors(targetPos, camera.position).normalize();
        camera.position.add(direction.multiplyScalar(speed * deltaTime));
    }

    renderer.render( scene, camera );

}

init();

