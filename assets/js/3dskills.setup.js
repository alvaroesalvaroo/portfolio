import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import CustomCamera from './CustomCamera.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

const modelPath = "./assets/3Dmodels/laboratorio.glb";

const scene = new THREE.Scene();
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

const myCamera = new CustomCamera(sizes, 75);
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
        if (child.name === "CameraPosition") {s
            child.updateWorldMatrix(true, false);s
            const worldPos = new THREE.Vector3();
            child.getWorldPosition(worldPos);
            myCamera.camera.position.copy(worldPos);
            myCamera.camera.rotation.copy(child.rotation);
            // myCamera.camera.updateProjectionMatrix();
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
    myCamera.resize(sizes);

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//--------------
// INIT
// ------------


function init() {
    renderer.setSize( sizes.width, sizes.height );

    // Load glb model
    const loader = new GLTFLoader();
    // Onload
    loader.load( modelPath, function ( gltf ) {
        onScenelLoaded(gltf.scene);
        // createLights();
       moveCameraToBlenderPosition();
    }, undefined, function ( error ) {
        console.error( error );
    } );
}


// -------------
// MAIN LOOP
// ---------------

renderer.setAnimationLoop( animate );


function animate() {

    // Camera and render
    myCamera.update();
    renderer.render( scene, myCamera.camera );

}

init();

