import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import CustomCamera from './CustomCamera.js';

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

// Load model
const loader = new GLTFLoader();
let loadedScene = null;

loader.load( './assets/3Dmodels/EscenaEstatica.glb', function ( gltf ) {
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
        if ( child.isMesh ) {
            console.log(child.name);
        }
      });
}

function onModelLoaded(model)
{
  scene.add( model );
  debugModelInfo(model);
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
  renderer.render( scene, myCamera.camera );
  
}
