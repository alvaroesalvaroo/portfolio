<?php


define('PROJECTS_JSON_PATH', __DIR__ . '/../projects.json');

// Alias para los projects
$projects = &$_SESSION['projects'];

//if (empty($_SESSION['projects'])) {
    $_SESSION['projects'] = _loadProjectsFromJSON(PROJECTS_JSON_PATH);

    // TODO: considerar si reordenar el array de objects con atributo "key" en un map.
    $allKeys = [];
//}




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

function _singleProjectCard(string $key, string $lang) {

    $project = _getProjectByKey($key);
    _projectCard($project, $lang);
}

function _allProjectsCarrousel(string $lang) {
    foreach ($_SESSION['projects'] as $p) {
        _projectCard($p, $lang);
    }
}

function _getProjectByKey(string $key) {
    foreach ($_SESSION['projects'] as $p) {
        if ($p->key === $key) {
            return $p;
        }
    }
    return null;
}

function _loadProjectsFromJSON(string $jsonPath) {

    if (!file_exists($jsonPath)) {
        error_log("Project csv not found: $jsonPath");
        return $result;
    }

    $fileContent =  file_get_contents($jsonPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);


    $allProjects = json_decode($fileContent, false);

    foreach ($allProjects as $project) {
        $allKeys[] = $project->key;
    }

    return $allProjects;

}

?>