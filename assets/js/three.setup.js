import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const sizes = {
width: window.innerWidth,
height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(
75,                         // fov
sizes.width / sizes.height, // aspect ratio
0.1,                        // near point
1000                        // far away point
);



camera.position.z = 5;
camera.position.x = 3;
camera.position.y = 1;

// Create renderer in html canvas webgl element
const canvas = document.querySelector("canvas.webgl");

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize( window.innerWidth, window.innerHeight );
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





// --- CAMERA MOVEMENT WITH WASD ---
// For better results might be needed:
// import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;

const velocity = 0.4;
let direction = new THREE.Vector3();


document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyW':
            moveForward = true;
            break;
        case 'KeyA':
            moveLeft = true;
            break;
        case 'KeyS':
            moveBackward = true;
            break;
        case 'KeyD':
            moveRight = true;
            break;
        case 'KeyE':
            moveUp = true;
            break;
        case 'KeyQ':
            moveDown = true;
            break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'KeyW':
            moveForward = false;
            break;
        case 'KeyA':
            moveLeft = false;
            break;
        case 'KeyS':
            moveBackward = false;
            break;
        case 'KeyD':
            moveRight = false;
            break;
        case 'KeyE':
            moveUp = false;
            break;
        case 'KeyQ':
            moveDown = false;
            break;
    }
});

function updateCamera()
{
    direction.z = Number( moveBackward ) - Number( moveForward );
    direction.x = Number( moveRight ) - Number( moveLeft );
    direction.y = Number( moveUp ) - Number ( moveDown);
    direction.normalize(); // Ensure diagonal movement is not fastest


    // Aplica el movimiento a los controles de la cámara

    if (moveForward || moveBackward || moveLeft || moveRight || moveUp || moveDown)
    {
      camera.position.addScaledVector(direction , velocity);
    }
}

// ---------
// SCREEN RESIZE
// --------
window.addEventListener("resize", () => {
// Update sizes
sizes.width = window.innerWidth;
sizes.height = window.innerHeight;

// Update camera
camera.aspect = sizes.width / sizes.height;
camera.updateProjectionMatrix();

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
  updateCamera();
  renderer.render( scene, camera );
  
}
