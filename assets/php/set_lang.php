<?php
require_once __DIR__ . '/translations.php';

$lang = $_GET['lang'] ?? '';

// Si el usuario cambia de idioma vía GET (o POST desde un botón/form):
// Ejemplo: miblog.com/index.php?setLang=es
//if (!empty($_GET['setLang'])) {
//    setLanguageCookie($_GET['setLang']);
//    // Redirigir a la misma página sin el parámetro para URLs limpias
//    header('Location: ' . strtok($_SERVER['REQUEST_URI'], '?'));
//    exit;
//}

if (setLanguageCookie($lang)) {
    // Volver a la página anterior, o a / si no hay referer
    $redirect = $_SERVER['HTTP_REFERER'] ?? '/';
    header('Location: ' . $redirect);
} else {
    http_response_code(400);
    echo "Idioma no soportado: " . htmlspecialchars($lang);
}
exit;