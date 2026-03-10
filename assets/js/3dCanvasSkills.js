
import * as THREE from 'three';

import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

let cssRenderer;
let cssScene;
let css3DObject;
let iframe;

window.onControlsStart = onControlsStart;
window.onControlsEnd = onControlsEnd;
window.initCSS3D = initCSS3D;
window.renderCSS = renderCSS;

function onControlsStart() {
    console.log("Controls started");
    iframe.style.pointerEvents = 'none';
    // iframe.style.zIndex = '0';
}
function onControlsEnd() {
    console.log("Controls end");
    iframe.style.pointerEvents = 'auto';
}

function resizeCssRenderer (container, referenceObject) {

    cssRenderer.setSize(container.clientWidth - 1, container.clientHeight -1);

    console.log("CSS3D Resized to: " + container.clientWidth - 1 + ", " + container.clientHeight -1);
}




function initCSS3D(container, referenceObject, relativeUrl = "project-all.html") {
    console.log("Init css aditional scene with sizes: " + container.clientWidth + ", " + container.clientHeight );

    cssScene = new THREE.Scene();

    cssRenderer = new CSS3DRenderer();
    cssRenderer.setSize( container.clientWidth, container.clientHeight );
    cssRenderer.domElement.style.position = 'absolute';
    cssRenderer.domElement.classList.add("css-renderer");
    cssRenderer.domElement.style.pointerEvents = 'none';
    cssRenderer.domElement.style.top = '0px';
    cssRenderer.domElement.style.zIndex = '20'; // Por encima de todos, pero sin pointer events

    container.appendChild( cssRenderer.domElement );

    // CREATE BOX
    referenceObject.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(referenceObject);
    const screenSize = new THREE.Vector3();
    box.getSize(screenSize);

    // CREATE GEOMETRY AND MESH
    const geometry = new THREE.PlaneGeometry(screenSize.x, screenSize.y);
    const material = new THREE.MeshBasicMaterial({
        color: 0x000000,
        opacity: 0,
        transparent: false,
        blending: THREE.NoBlending // Esto ayuda a "recortar" si el iframe está detrás
    });
    const meshBase = new THREE.Mesh(geometry, material);
    meshBase.position.copy(referenceObject.position);
    meshBase.rotation.copy(referenceObject.rotation);

    skillsScene.add(meshBase);
    referenceObject.scale.set(new THREE.Vector3(0, 0, 0));


    // Add IFRAME
    const iframeWidth = 1024;
    const iframeHeight = 768;
    iframe = document.createElement( 'iframe' );
    iframe.style.width = iframeWidth + "px";
    iframe.style.height = iframeHeight + "px";
    iframe.style.border = '0px';
    iframe.style.backfaceVisibility = 'visible';
    const baseUrl = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    const finalUrl = new URL(relativeUrl, baseUrl).href;
    console.log("Creating CSS texture based on url: " + finalUrl);
    // "Plz do magic" line:
    // iframe.src = urlWithNoHash;
    iframe.src = finalUrl;

    // Create CSSObject
    css3DObject = new CSS3DObject(iframe);
    referenceObject.updateWorldMatrix(true, false);
    css3DObject.position.copy( meshBase.position );
    css3DObject.rotation.copy( meshBase.rotation );

    // Escala = (Tamaño en Unidades 3D) / (Tamaño en Píxeles)
    // A little bit of hardcoded x scale never killed nobody
    const scaleX = screenSize.x / iframeWidth       * 1.4;

    const scaleY = screenSize.y / iframeHeight;

    css3DObject.scale.set(scaleX, scaleY, 1);

    cssScene.add(css3DObject);

    window.addEventListener("resize", () => {
        resizeCssRenderer(container, referenceObject);
    });
}



function renderCSS(camera) {
    cssRenderer.render(cssScene, camera);
}

/*

function buildFrame( width, height, thickness ) {

    const group = new THREE.Group();
    const material = new THREE.MeshStandardMaterial( { color: 0x2200ff } );

    // Create the frame border
    const outerShape = new THREE.Shape();
    outerShape.moveTo( - ( width / 2 + thickness ), - ( height / 2 + thickness ) );
    outerShape.lineTo( width / 2 + thickness, - ( height / 2 + thickness ) );
    outerShape.lineTo( width / 2 + thickness, height / 2 + thickness );
    outerShape.lineTo( - ( width / 2 + thickness ), height / 2 + thickness );
    outerShape.lineTo( - ( width / 2 + thickness ), - ( height / 2 + thickness ) );

    // Create inner rectangle (hole)
    const innerHole = new THREE.Path();
    innerHole.moveTo( - width / 2, - height / 2 );
    innerHole.lineTo( width / 2, - height / 2 );
    innerHole.lineTo( width / 2, height / 2 );
    innerHole.lineTo( - width / 2, height / 2 );
    innerHole.lineTo( - width / 2, - height / 2 );

    outerShape.holes.push( innerHole );

    const frameGeometry = new THREE.ExtrudeGeometry( outerShape, {
        depth: thickness,
        bevelEnabled: false
    } );

    const frameMesh = new THREE.Mesh( frameGeometry, material );
    frameMesh.position.z = - thickness / 2;
    group.add( frameMesh );

    // Add back plane
    const backGeometry = new THREE.PlaneGeometry( width + ( thickness * 2 ), height + ( thickness * 2 ) );
    const backMesh = new THREE.Mesh( backGeometry, material );
    backMesh.position.set( 0, 0, - thickness / 2 );
    backMesh.rotation.y = Math.PI;
    group.add( backMesh );

    return group;

}
*/
