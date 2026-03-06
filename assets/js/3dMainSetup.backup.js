import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import CustomCamera from './CustomCamera.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

const scene = new THREE.Scene();
const sizes = {
width: window.innerWidth,
height: window.innerHeight,
};

const myCamera = new CustomCamera(sizes, 75);

// Create renderer in html canvas webgl element
const canvas = document.querySelector("canvas.webgl");

const renderer = new THREE.WebGLRenderer({canvas});
// document.body.appendChild( renderer.domElement );


// Bloom effect

const composer = new EffectComposer(renderer); // Renderer must have sizes already defined




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


function onScenelLoaded(model)
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

  scene.background = new THREE.Color( 0xaa0000 );



  debugModelInfo(model);
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
  composer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//--------------
// INIT
// ------------


function init() {

  // Init bloom
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);

  const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,  // Fuerza del brillo (0 a 3 suele estar bien)
      0.4,  // Radio (qué tanto se expande el blur)
      0.6  // Threshold (qué tan brillante debe ser un color para que empiece a brillar)
  );
  const renderPass = new RenderPass(scene, myCamera.camera);

  console.log(bloomPass);
  console.log(renderPass);

  composer.passes = [];
  composer.addPass(renderPass);
  composer.addPass(bloomPass);


  // Load glb model
  const loader = new GLTFLoader();
  // Onload
  loader.load( './assets/3Dmodels/EscenaEstaticaCompressed.glb', function ( gltf ) {
    onScenelLoaded(gltf.scene);
    createLights();
  }, undefined, function ( error ) {
    console.error( error );
  } );
}

// -------------
// MAIN LOOP
// ---------------

renderer.setAnimationLoop( animate );
const clock = new THREE.Clock();

function animate() {

  if (scene)
  {
    scene.rotation.set(scene.rotation.x, scene.rotation.y -=0.005, scene.rotation.z);
  }


  // Camera and render
  myCamera.update();
  // renderer.render( scene, myCamera.camera );
  // try {
    composer.render(clock.getDelta()); // Missing delta time
  // } catch (e) {
    // console.log("Postprocessing not possible. Standard rendering")
    // renderer.render(scene, myCamera.camera);
  // }

}


init();

