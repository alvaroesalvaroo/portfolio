<?php

/**
 * translations.php
 *
 * Carga las traducciones desde el CSV y las cachea en $_SESSION
 * para no repetir el I/O en la misma sesión.
 *
 * Uso: require_once __DIR__ . '/lang/translations.php';
 * Después ya tienes disponible la función t() del helpers.php.
 */

// Asegurarse de que la sesión está iniciada
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Ruta al CSV
define('TRANSLATIONS_CSV_PATH', __DIR__ . '/../language.csv');
// error_log("CSV path: " . TRANSLATIONS_CSV_PATH);
// error_log("CSV exists: " . (file_exists(TRANSLATIONS_CSV_PATH) ? 'YES' : 'NO'));
// Idiomas soportados
define('SUPPORTED_LANGUAGES', ['es', 'en', 'cat']);
define('DEFAULT_LANGUAGE', 'en');


// ------------------------------------------------------------
// Carga (o recupera de sesión) el array de traducciones
// ------------------------------------------------------------

if (empty($_SESSION['translations'])) {
    $_SESSION['translations'] = _loadTranslationsFromCSV(TRANSLATIONS_CSV_PATH);
}
// else {
//     error_log("SESSION[translations] IS CONSIDERED TO EXISTS");
// }

// Alias corto para el resto del código
$translations = &$_SESSION['translations'];


// ------------------------------------------------------------
// Detección del idioma activo
// ------------------------------------------------------------

$currentLanguage = _detectLanguage();


// ------------------------------------------------------------
// Funciones internas
// ------------------------------------------------------------

/**
 * Parsea el CSV y devuelve un array con forma:
 *   ['key' => ['es' => '...', 'en' => '...', 'cat' => '...'], ...]
 *
 * El CSV usa ';' como separador y '#' o '//' al inicio de línea
 * para comentarios (igual que el comportamiento del JS original).
 *
 * @param string $csvPath Ruta absoluta al archivo CSV.
 * @return array
 */
function _loadTranslationsFromCSV(string $csvPath): array {
    $result = [];

    if (!file_exists($csvPath)) {
        error_log("Translations CSV not found: $csvPath");
        return $result;
    }

    $lines = file($csvPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if (empty($lines)) return $result;

    // Primera línea: cabecera  →  key ; es ; en ; cat
    $headers = array_map('trim', explode(';', $lines[0]));
    $dataRows = array_slice($lines, 1);

    foreach ($dataRows as $line) {
        $line = trim($line);

        // Ignorar comentarios (igual que el JS: startsWith("//"))
        if (str_starts_with($line, '//') || str_starts_with($line, '#')) continue;

        $values = explode(';', $line);
        $key    = trim($values[0] ?? '');
        if ($key === '') continue;

        $result[$key] = [];
        for ($i = 1; $i < count($headers); $i++) {
            $lang  = trim($headers[$i]);
            $value = trim($values[$i] ?? '');
            $result[$key][$lang] = $value;
        }
    }

    return $result;
}

/**
 * Detecta el idioma con la siguiente prioridad:
 *   1. Cookie 'lang'  (se establece cuando el usuario elige idioma)
 *   2. Accept-Language header del navegador
 *   3. Idioma por defecto ('en')
 *
 * @return string Código de idioma validado ('es' | 'en' | 'cat')
 */
function _detectLanguage(): string {
    $supported = SUPPORTED_LANGUAGES;

    // 1. Cookie
    if (!empty($_COOKIE['lang']) && in_array($_COOKIE['lang'], $supported, true)) {
        return $_COOKIE['lang'];
    }

    // 2. Accept-Language header  →  "es-ES,es;q=0.9,en;q=0.8"
    if (!empty($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
        // Extraer los códigos de idioma en orden de preferencia
        preg_match_all('/([a-z]{2,3})(?:-[A-Z]{2,3})?(?:;q=[\d.]+)?/', $_SERVER['HTTP_ACCEPT_LANGUAGE'], $matches);
        foreach ($matches[1] as $lang) {
            if (in_array($lang, $supported, true)) {
                return $lang;
            }
        }
    }

    // 3. Fallback
    return DEFAULT_LANGUAGE;
}

/**
 * Cambia el idioma activo y lo persiste en una cookie de 1 año.
 * Llama a esto cuando el usuario hace clic en un botón de idioma.
 *
 * Ejemplo de uso en un endpoint dedicado:
 *   require_once 'lang/translations.php';
 *   setLanguageCookie($_GET['lang'] ?? 'en');
 *   header('Location: ' . ($_SERVER['HTTP_REFERER'] ?? '/'));
 *   exit;
 *
 * @param string $lang Código de idioma a establecer.
 * @return bool True si el idioma es válido y se guardó la cookie.
 */
function setLanguageCookie(string $lang): bool {
    if (!in_array($lang, SUPPORTED_LANGUAGES, true)) return false;

    setcookie(
        'lang',
        $lang,
        [
            'expires'  => time() + 60 * 60 * 24 * 365, // 1 año
            'path'     => '/',
            'samesite' => 'Lax',
            'secure'   => isset($_SERVER['HTTPS']),  // solo HTTPS en producción
            'httponly' => true,
        ]
    );

    // Actualizar también la variable global para la request actual
    global $currentLanguage;
    $currentLanguage = $lang;

    return true;
}


// ------------------------------------------------------------
// TODO: insertProjectTranslations()
//
// Signature sugerida:
//   function insertProjectTranslations(array $allProjects): void
//
// Pautas:
//   - Recibe el array $allProjects (equivalente al allProjects del JS)
//   - Para cada proyecto, genera las claves '<key>-subtitle' y '<key>-description'
//     y las añade a $_SESSION['translations'] (y al alias $translations)
//   - Estructura de cada proyecto esperada:
//       ['key' => 'my-project', 'subtitleES' => '...', 'subtitleEN' => '...', ...]
//   - Llamarla DESPUÉS de require_once este archivo y ANTES de renderizar el HTML
//   - Ejemplo de implementación:
//
//   function insertProjectTranslations(array $allProjects): void {
//       global $translations;
//       foreach ($allProjects as $project) {
//           $descKey = $project['key'] . '-description';
//           $subKey  = $project['key'] . '-subtitle';
//           $translations[$descKey] = array_filter([
//               'es'  => $project['descriptionES']  ?? '',
//               'en'  => $project['descriptionEN']  ?? '',
//               'cat' => $project['descriptionCAT'] ?? '',
//           ]);
//           $translations[$subKey] = array_filter([
//               'es'  => $project['subtitleES']  ?? '',
//               'en'  => $project['subtitleEN']  ?? '',
//               'cat' => $project['subtitleCAT'] ?? '',
//           ]);
//       }
//   }
// ------------------------------------------------------------