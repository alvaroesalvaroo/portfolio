<?php
require_once __DIR__ . '/translations.php';

$lang = $_GET['lang'] ?? '';

if (setLanguageCookie($lang)) {
    // Volver a la página anterior, o a / si no hay referer
    $redirect = $_SERVER['HTTP_REFERER'] ?? '/';
    header('Location: ' . $redirect);
} else {
    http_response_code(400);
    echo "Idioma no soportado: " . htmlspecialchars($lang);
}
exit;