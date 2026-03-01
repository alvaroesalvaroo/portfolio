import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import CustomCamera from './CustomCamera.js';

const DEBUG_MODE = true;
const scene = new THREE.Scene();
const sizes = {
width: window.innerWidth,
height: window.innerHeight,
};

const myCamera = new CustomCamera(sizes, 75);


// Create renderer in html canvas webgl element
const canvas = document.querySelector("canvas.webgl");

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize( sizes.width, sizes.height );
// document.body.appendChild( renderer.domElement );

//==============TODO: bloom
//

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

// 1. Creamos el compositor
const composer = new EffectComposer(renderer);

// 2. Añadimos el pase de renderizado normal (lo que ya tienes)
const renderPass = new RenderPass(scene, myCamera.camera);
composer.addPass(renderPass);

// 3. Añadimos el pase de Bloom (el blur de luz)
const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,  // Fuerza del brillo (0 a 3 suele estar bien)
    0.4,  // Radio (qué tanto se expande el blur)
    0.6  // Threshold (qué tan brillante debe ser un color para que empiece a brillar)
);
composer.addPass(bloomPass);
//==============

// Load model
const loader = new GLTFLoader();
let loadedScene = null;

loader.load( './assets/3Dmodels/EscenaEstaticaCompressed.glb', function ( gltf ) {
  loadedScene = gltf.scene;
  onModelLoaded(gltf.scene);

  createLights();

}, undefined, function ( error ) {

  console.error( error );
} );
function debugModelInfo(model)
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


function onModelLoaded(model)
{
  scene.add( model );
  model.traverse( ( child ) => {
    if (child.isMesh) {
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      for (const material of materials) {
        if (material.name.startsWith("sun"))
        {
          console.log("Here is sun");
          let texture = material["map"];
          console.log("material " + material.name+ " with map texture" + texture.name);

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



  // if (DEBUG_MODE === true) debugModelInfo(model);
}


function createLights()
{
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // Luz general, suave
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(-2, 0, -5); 
  
  // if (earthModel)
  // {
  //   directionalLight.target.position.set(earthModel.position.x, earthModel.position.y, earthModel.position.z);
  // }
  scene.add(directionalLight);
  scene.add(directionalLight.target);
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

// -------------
// MAIN LOOP
// ---------------

renderer.setAnimationLoop( animate );


function animate() {

  if (loadedScene)
  {
    loadedScene.rotation.set(loadedScene.rotation.x, loadedScene.rotation.y -=0.005, loadedScene.rotation.z);
  }
  
  
  // Camera and render
  myCamera.update();
  // renderer.render( scene, myCamera.camera );
  composer.render();
  
}
