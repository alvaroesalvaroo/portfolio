import html2canvas from 'html2canvas';


let takeTextureContainer = document.querySelector('#project-details-section');
let containerToAppend = document.querySelector('#project-details-section .project-slider');

function initFractal() {
    createFractal();
}
// Exponemos la función al mundo exterior
window.initFractal = initFractal;

async function createFractal()
{
    console.log("Create Fractal");
    containerToAppend.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        console.log(`Generando capa ${i + 1}...`);

        // Capturamos
        const canvas = await createScreenshot();

        // Limpiamos lo anterior y añadimos el nuevo (que ya trae la "foto" de lo anterior)
        containerToAppend.innerHTML = "";
        onCanvasCreated(canvas);

        // Pequeña pausa para que el navegador renderice el canvas en el DOM
        await new Promise(r => setTimeout(r, 150));
    }
    console.log("Fractal completado?");
}


function onCanvasCreated(canvas)
{
    const wrapper = document.createElement('div');
    wrapper.style.padding = "50px"; // Este padding crea el efecto de "hacerse pequeño"
    wrapper.style.display = "flex";
    wrapper.style.justifyContent = "center";
    wrapper.style.alignItems = "center";
    wrapper.style.width = "100%";

    // El canvas debe adaptarse al wrapper
    canvas.style.width = "60%";
    canvas.style.height = "auto";
    canvas.style.display = "block";
    canvas.style.margin = "0 auto";

    wrapper.appendChild(canvas);
    canvas.classList.add('fractal-layer');
    containerToAppend.appendChild(canvas);
    console.log("append canvas", canvas);

}

async function createScreenshot() {
    const canvas = await html2canvas(takeTextureContainer, {
        useCORS: true,
        backgroundColor: null,
        scale: 1,
        ignoreElements: (el) => {
        // Si tienes algún elemento que sabes que da problemas, lo puedes ignorar aquí
        return el.classList.contains('no-canvas');
    }}

    );
    return canvas;
}