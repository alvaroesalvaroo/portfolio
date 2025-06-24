// La aniamcion typed necesita otro procedimiento


// Variable global para almacenar las traducciones cargadas
let translations = {};
let currentLanguage = 'en'; // Idioma por defecto

/**
 * Carga las traducciones desde el archivo CSV.
 * @returns {Promise<void>} Una promesa que se resuelve cuando las traducciones están cargadas.
 */
async function loadTranslations() {
    const response = await fetch('./assets/language.csv'); // Asegúrate de que la ruta sea correcta
    const csvText = await response.text();

    // Parsear CSV por linea y ';' como divisor
    const lines = csvText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    if (lines.length === 0) return;

    const headers = lines[0].split(';');
    const dataRows = lines.slice(1);

    translations = {}; // Limpiar traducciones anteriores

    dataRows.forEach(row => {
        const values = row.split(';');
        const key = values[0];
        translations[key] = {};
        for (let i = 1; i < headers.length; i++) {
            translations[key][headers[i]] = values[i];
        }
    });

    console.log('Traducciones cargadas:', translations);

}

/**
 * Aplica las traducciones a los elementos del DOM.
 */
function applyTranslations() {
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.dataset.langKey;
        if (translations[key] && translations[key][currentLanguage]) {
            element.textContent = translations[key][currentLanguage];
        } else {
            console.warn(`Translation missing for key: ${key} in language: ${currentLanguage}`);
        }
    });
    // Actualizar atributos placeholder si es necesario
    document.querySelectorAll('[data-lang-placeholder]').forEach(element => {
        const key = element.dataset.langPlaceholder;
        if (translations[key] && translations[key][currentLanguage]) {
            element.placeholder = translations[key][currentLanguage];
        }
    });
    // Para las animaciones de "typing"
    showCorrectTypedAnimation();

}
const typedInstances = {};
    // Reconocer las typed animations
function initializeAllTypedAnimations() {
    return;
    const typedElementsRefs = { // Renombrado para evitar confusión con el objeto typedInstances
        'es': document.getElementById('typed-es'),
        'en': document.getElementById('typed-en'),
        'fr': document.getElementById('typed-fr'),
        'cat': document.getElementById('typed-cat') // Asegúrate de incluirlo si lo usas
    };

    for (const langCode in typedElementsRefs) {
        const element = typedElementsRefs[langCode];
        if (element && element.dataset.typedItems) {
            // **¡AQUÍ SE CREA LA INSTANCIA DE TYPED.JS Y SE ALMACENA!**
            typedInstances[langCode] = new Typed(`#${element.id}`, {
                strings: element.dataset.typedItems.split(','), // Lee del HTML
                typeSpeed: 100,
                backSpeed: 60,
                loop: true,
                showCursor: true,
                autoInsertCss: true,
            });
            // Pausar inmediatamente si no es el idioma activo al cargar
            typedInstances[langCode].stop(); 
            typedInstances[langCode].reset(); 
        }
    }
}


function showCorrectTypedAnimation() {
    return;
    console.log("Show correct typed with instances "+ typedInstances);
    const allTypedSpans = document.querySelectorAll('.typed'); // Selecciona todos los spans con la clase 'typed'

    allTypedSpans.forEach(span => {
        const spanId = span.id; // Ej: 'typed-es'
        const langCodeFromId = spanId.replace('typed-', ''); // Extrae 'es'

        const allCursors = document.querySelectorAll('.typed-cursor');
        allCursors.forEach(cursor => {
            cursor.remove(); // Elimina el elemento del DOM
            console.log("Cursor eliminado:", cursor);
        });
        if (langCodeFromId === currentLanguage) {
            console.log("Encontrado typed " + langCodeFromId);
            span.classList.remove('d-none'); // Muestra el span correcto
            if (typedInstances[langCodeFromId]) {
                console.log("Iniciando typed " + langCodeFromId);
                typedInstances[langCodeFromId].start(); // Inicia o reanuda la animación
            }
            else
            {
                console.log("No se ha podido reproducir " + langCodeFromId);
            }
        } else {
            span.classList.add('d-none'); // Oculta los demás
            if (typedInstances[langCodeFromId]) {
                console.log("Parando typed " + langCodeFromId);
                typedInstances[langCodeFromId].stop(); // Pausa la animación para los ocultos
                typedInstances[langCodeFromId].reset();
            }
            else
            {
                console.log("No se ha podido parar " + langCodeFromId);
            }
        }
    });
}

/**
 * Cambia el idioma de la página.
 * @param {string} lang El código del idioma (ej. 'es', 'en').
 */
function setLanguage(lang) {
    if (translations[Object.keys(translations)[0]] && translations[Object.keys(translations)[0]][lang]) {
        currentLanguage = lang;
        localStorage.setItem('preferredLanguage', lang); // Guardar preferencia
        applyTranslations();
        console.log(`Idioma cambiado a: ${lang}`);
    } else {
        console.error(`Idioma ${lang} no soportado o traducciones no cargadas.`);
    }
}



// Inicialización: Cargar traducciones y aplicar el idioma inicial

document.addEventListener('DOMContentLoaded', async () => {
    await loadTranslations();
    
    initializeAllTypedAnimations();

    // Elegir idioma inicial basado en la ubicación/preferencia
    const storedLang = localStorage.getItem('preferredLanguage');
    const browserLang = navigator.language.split('-')[0]; // 'es-ES' -> 'es'

    if (storedLang && translations[Object.keys(translations)[0]] && translations[Object.keys(translations)[0]][storedLang]) {
        currentLanguage = storedLang;
    } else if (translations[Object.keys(translations)[0]] && translations[Object.keys(translations)[0]][browserLang]) {
        currentLanguage = browserLang;
    }
    applyTranslations();

    // Botones de cambio de idioma
    document.getElementById('lang-es')?.addEventListener('click', () => setLanguage('es'));
    document.getElementById('lang-en')?.addEventListener('click', () => setLanguage('en'));
    document.getElementById('lang-cat')?.addEventListener('click', () => setLanguage('cat'));
});





