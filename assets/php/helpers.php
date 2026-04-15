<?php

/**
 * helpers.php
 *
 * Función helper t() para obtener traducciones en los templates.
 *
 * Uso:
 *   require_once __DIR__ . '/lang/translations.php'; // primero
 *   require_once __DIR__ . '/lang/helpers.php';      // después
 *
 *   // En el HTML:
 *   <a><?= t('see-all') ?></a>
 *   <p><?= t('hero-title') ?></p>
 */


/**
 * Devuelve la traducción de una clave para el idioma activo.
 *
 * Comportamiento:
 *   - Si existe la traducción → devuelve el valor (con HTML permitido, igual que el JS usaba innerHTML)
 *   - Si falta la traducción para el idioma actual → intenta 'en' como fallback
 *   - Si no existe la clave → devuelve la propia clave entre corchetes para detectar errores fácilmente
 *
 * @param string      $key     Clave de traducción (ej. 'see-all', 'hero-title')
 * @param string|null $lang    Forzar idioma concreto. Si es null, usa $currentLanguage global.
 * @return string
 */
function t(string $key, ?string $lang = null): string {
    global $translations, $currentLanguage;

    $lang ??= $currentLanguage ?? DEFAULT_LANGUAGE;

    // Traducción exacta encontrada
    if (!empty($translations[$key][$lang])) {
        return $translations[$key][$lang];
    }

    // Fallback a inglés si el idioma pedido no tiene esa clave
    if ($lang !== DEFAULT_LANGUAGE && !empty($translations[$key][DEFAULT_LANGUAGE])) {
        error_log("Translation fallback to 'en' for key: '$key' in lang: '$lang'");
        return $translations[$key][DEFAULT_LANGUAGE];
    }

    // Clave inexistente — igual que el console.warn del JS original
    error_log("Translation missing for key: '$key' in lang: '$lang'");
    return "[$key]"; // Visible en desarrollo, fácil de buscar en el HTML
}


/**
 * Devuelve true si la clave existe en el idioma activo (útil para condicionales).
 *
 * @param string      $key
 * @param string|null $lang
 * @return bool
 */
function hasTranslation(string $key, ?string $lang = null): bool {
    global $translations, $currentLanguage;
    $lang ??= $currentLanguage ?? DEFAULT_LANGUAGE;
    return !empty($translations[$key][$lang]);
}