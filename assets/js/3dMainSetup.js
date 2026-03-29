import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
// import {OrbitControls} from "three/addons/controls/OrbitControls.js";

// Experimental shaders:// import { SMAAPass } // import { ShaderPass } // import { FXAAShader }

// Global
window.isMainSceneObserved = true;


// Scene setup
const scene = new THREE.Scene();
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(
        60,
        sizes.width / sizes.height,   // aspect
        0.1,                          // near point
        1000                          // far away point
);


const canvas = document.querySelector("canvas.webgl");

const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias : true});
renderer.setSize( sizes.width, sizes.height );

// === CONTROLS =====
// const controlsDomElement = document.createElement("div");
// controlsDomElement.id = "controls";
// controlsDomElement.style.zIndex = "1";
// controlsDomElement.style.position = "absolute";
// controlsDomElement.style.top = "0";
// controlsDomElement.style.width = "100%";
// controlsDomElement.style.height = "50%";
// const isUsingMouse = window.matchMedia("(pointer: fine)").matches;
// if (isUsingMouse) {
//   controlsDomElement.style.height = "100%";
//
// }
// // controlsDomElement.style.pointerEvents = "auto";
// const controlsContainer = document.querySelector("#hero");
// // controlsContainer.style.pointerEvents = "none";
// // controlsContainer.style.position = "relative";
// controlsContainer.appendChild(controlsDomElement);
// const controls = new OrbitControls(camera, controlsDomElement);
// controls.enableZoom = false;
// controls.enablePan = false;
// controls.rotateSpeed = 0.2;

// Bloom effect
const composer = new EffectComposer(renderer); // Renderer must have sizes already defined
const renderPass = new RenderPass(scene, camera);

// Experimental filters:
// const smaaPass = new SMAAPass(window.innerWidth, window.innerHeight);
// const fxaaPass = new ShaderPass(FXAAShader);


// Lighting
let lightPosition;

// Animation
const rotationSceneSpeed = 0.5;
const clock = new THREE.Clock();
let deltaTime;
let mixer;



// Traverse scene to find light position and sun material
function onScenelLoaded(model)
{
  scene.add( model );
  model.traverse( ( child ) => {

    if (child.name.toLowerCase().includes("light")) {
      lightPosition = child.position;
    }
    if (child.isMesh) {
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      for (const material of materials) {
        if (material.name.startsWith("sun"))
        {
          let texture = material["map"];

          const emissiveMaterial = new THREE.MeshStandardMaterial({
            color: 0x111111,          // Color base del objeto (oscuro para que resalte el brillo)
            emissive: 0xffffff,       // Color del brillo (blanco si la textura ya tiene color)
            emissiveIntensity: 2,     // Fuerza del resplandor
            emissiveMap: texture, // La textura que dicta dónde hay luz
            roughness: 0.4,
            metalness: 0.7
          });

          child.material = emissiveMaterial;

        }
      }
    }
  })

}

function createLights()
{
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // Luz general, suave
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  // directionalLight.position.set(-2, 0, -5);
  directionalLight.position.copy(lightPosition);

  scene.add(directionalLight);
  scene.add(directionalLight.target);
}

// ---------
// SCREEN RESIZE
function resize() {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.screen.height;

  // Reallocate camera
  camera.aspect = sizes.width / sizes.height;
  camera.position.set(3, 1, 5);
  if (sizes.width < 1225 && sizes.width >= 1000) // Tablet intermediate level
  {
    camera.position.set(2, 1, 6);
  }
  else if (sizes.width < 1000) {
    camera.position.set(1.5, 1, 7);
  }
  camera.updateProjectionMatrix();

  // // Controls update
  // let cameraPos = new THREE.Vector3();
  // let cameraDir = new THREE.Vector3();
  // camera.getWorldPosition(cameraPos);
  // camera.getWorldDirection(cameraDir);
  // controls.update();
  // console.log(controls.getAzimuthalAngle());
  // controls.minPolarAngle = 80 * Math.PI / 180;
  // controls.maxPolarAngle = 90 * Math.PI / 180;
  // controls.maxAzimuthAngle = controls.getAzimuthalAngle() + 0 * Math.PI / 180;
  // controls.minAzimuthAngle = controls.getAzimuthalAngle() + 0 * Math.PI / 180;
  // controls.target.copy(camera.position).add(cameraDir.multiplyScalar(5));
  //
  //
  // controls.update();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  composer.setSize(sizes.width, sizes.height);
  composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  console.log("pixel ratio is " + Math.min(window.devicePixelRatio, 2));

}
window.addEventListener("resize", () => resize());

//--------------
// INIT
function init() {

  console.log("Init Main three.js scene");

  // Init bloom
  const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,  // Fuerza del brillo (0 a 3 suele estar bien)
      0.4,  // Radio (qué tanto se expande el blur)
      0.6  // Threshold (qué tan brillante debe ser un color para que empiece a brillar)
  );
  composer.addPass(renderPass);
  composer.addPass(bloomPass);
  // composer.addPass(smaaPass);
  // const pixelRatio = renderer.getPixelRatio();
  // fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / (sizes.width * pixelRatio);
  // fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / (sizes.height * pixelRatio);
  // composer.addPass(fxaaPass);

  // Load glb model
  const loader = new GLTFLoader();
  // Onload
  loader.load( './assets/3Dmodels/EscenaMain-Rig.glb', function ( gltf ) {
    mixer = new THREE.AnimationMixer(gltf.scene);

    // Recorremos el array de animaciones y las disparamos todas
    gltf.animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.play();
    });

    onScenelLoaded(gltf.scene);
    createLights();
    resize();


  }, undefined, function ( error ) {
    console.error( error );
  } );
}

// -------------
// MAIN LOOP

renderer.setAnimationLoop( animate );

function animate() {

  if (!window.isMainSceneObserved)  return;

  // Update scene and camera
  deltaTime = clock.getDelta();
  if (mixer) {
    mixer.update(deltaTime);
  }
  if (scene) {
    scene.rotation.set(scene.rotation.x, scene.rotation.y -= rotationSceneSpeed * deltaTime, scene.rotation.z);
  }

  // controls.update();

  // Render
  // renderer.render( scene, camera ); // old, no bloom effect
  composer.render(deltaTime);
}

init();
