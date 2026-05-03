<?php


define('PROJECTS_JSON_PATH', __DIR__ . '/../projects.json');



//if (empty($_SESSION['projects'])) {
    $_SESSION['projects'] = _loadProjectsFromJSON(PROJECTS_JSON_PATH);
//}

// Alias para los projects
$sessionProjects = &$_SESSION['projects'];




// De momento, para la pagina de inicio
function _projectCard($project, string $lang) {
    $title = $project->title;
    $subtitle = "";
    if ($lang == "es") {
        $subtitle = $project->subtitleES;
    }
    else if ($lang == "en") {
        $subtitle = $project->subtitleEN;
    }
    else if ($lang == "cat") {
        $subtitle = $project->subtitleCAT;
    }
    $description = "";
    if ($lang == "es") {
        $description = $project->descriptionES;
    }
    else if ($lang == "en") {
        $description = $project->descriptionEN;
    }
    else if ($lang == "cat") {
        $description = $project->descriptionCAT;
    }

    // TODO: considerar gifs
    $imgLink = "assets/img/projects/" . $project->key . "/01.webp";

    $card = '<div class="swiper-slide">';
    $card .= '<div class="project-index-item">';
    $card .= '<h5 class="project-title">' .$title. '</h5>';
    $card .= '<img class ="img-fluid" src="'. $imgLink .'" alt="">';
    $card .= '<p class="service-description p-description">' . $subtitle . '</p>';

    $card .= '<div class="links-container">';

    // TODO: considerar mas links, cambiar iconos.
    if (isset($project->repoLink)) {
        $card .= '<a class="project-link" href="' . $project->repoLink . '" >';
        $card .= '<i class="bi bi-gitlab"></i>';
        $card .= '</a>';
    }


    $card .= '</div> </div> </div>';

    echo $card;

    return;
}

function _sortProjectsByRelevanceWithRandomness(&$allProjects) {

    foreach ($allProjects as $project) {
        // sumamos entero aleatorio entre 0 y 30
        if (isset($project->relevance)) {
            $project->relevance += mt_rand(0, 30);
        }
    }

    usort($allProjects, function($a, $b) {

        $scoreA = $a->relevance ?? 0;
        $scoreB = $b->relevance ?? 0;

        // Orden descendente usando el operador nave espacial
        return $scoreB <=> $scoreA;
    });
}




function _loadProjectsFromJSON(string $jsonPath) {

    if (!file_exists($jsonPath)) {
        error_log("Project csv not found: $jsonPath");
        return $result;
    }

    $fileContent =  file_get_contents($jsonPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    // All projects, key is just another filed of the object
    $allProjects = json_decode($fileContent, false);

    _sortProjectsByRelevanceWithRandomness($allProjects);

    $remappedProjects = [];



    // All projects, key field is also the key of the arraymap
    foreach ($allProjects as $project) {
        if (isset($project->key)) {
            $remappedProjects[$project->key] = $project;
        }
    }
    return $remappedProjects;

}
// PUBLIC methods

// INDEX PAGE
function showAllProjectsCarrousel() {
    global $currentLanguage;
    foreach ($_SESSION['projects'] as $p) {
        _projectCard($p, $currentLanguage);
    }
}

// Project details page
function showTitle() {
    $key = '';
    if (isset($_GET['projectKey'])) {
        $key = htmlspecialchars($_GET['projectKey']);
    }
    else {
        $key = 'this';
    }

    echo $_SESSION['projects'][$key]->title;

}

function showSubtitle() {
    global $currentLanguage;
    $key = '';
    if (isset($_GET['projectKey'])) {
        $key = htmlspecialchars($_GET['projectKey']);
    }
    else {
        $key = 'this';
    }

    $subtitle = "";
    if ($currentLanguage == "es") {
        $subtitle = $_SESSION['projects'][$key]->subtitleES;
    }
    else if ($currentLanguage == "en") {
        $subtitle = $_SESSION['projects'][$key]->subtitleEN;
    }
    else if ($currentLanguage == "cat") {
        $subtitle = $_SESSION['projects'][$key]->subtitleCAT;
    }

    echo $subtitle;

}
function showDescription() {

    global $currentLanguage;
    $key = '';
    if (isset($_GET['projectKey'])) {
        $key = htmlspecialchars($_GET['projectKey']);
    }
    else {
        $key = 'this';
    }

    $description = "";
    if ($currentLanguage == "es") {
        $description = $_SESSION['projects'][$key]->descriptionES;
    }
    else if ($currentLanguage == "en") {
        $description = $_SESSION['projects'][$key]->descriptionEN;
    }
    else if ($currentLanguage == "cat") {
        $description = $_SESSION['projects'][$key]->descriptionCAT;
    }

    echo $description;

}


function showProjectMediaCarrousel() {
    echo 'this is the media caroousel';
}

function showTags() {
}

?>