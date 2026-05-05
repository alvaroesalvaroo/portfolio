<?php


define('PROJECTS_JSON_PATH', __DIR__ . '/../projects.json');



if (empty($_SESSION['projects'])) {
    $_SESSION['projects'] = _loadProjectsFromJSON(PROJECTS_JSON_PATH);
}

// Alias para los projects
$sessionProjects = &$_SESSION['projects'];


// De momento, para la pagina de inicio


function _showProjectCard($project, string $lang, bool $showLinks): void
{
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

    $imgLink = "assets/img/projects/" . $project->key . "/01.webp";

    if (isset($project->gif) && isset($project->gifIsFirst) && $project->gifIsFirst) {
        $imgLink = "assets/img/projects/" . $project->key . "/" . $project->gif;
    }

    $cardLink = "project-details.php?projectKey=" . $project->key;

    $card = "";

    $card .= '<div class="project-index-item" data-project-key="'. $project->key .'" onclick="window.location.href=\'' . $cardLink . '\'">'; // Triples comillas por mezclar HTML, JS y PHP. Golaso
    $card .= '<h5 class="project-title">' .$title. '</h5>';
    $card .= '<img class ="img-fluid" src="'. $imgLink .'" alt="">';
    $card .= '<p class="service-description p-description">' . $subtitle . '</p>';

    $card .= '<div class="links-container">';

    if ($showLinks) {
        // Github/Gitlab link
        if (isset($project->repoLink)) {
            $iconType = "bi bi-link-45deg";
            if (str_contains(strtolower($project->repoLink), "gitlab")) $iconType = "bi bi-gitlab";
            if (str_contains(strtolower($project->repoLink), "github")) $iconType = "bi bi-github";

            $card .= _linkIconHTML($iconType, $project->repoLink);
        }
        // Windows link
        if (isset($project->windowsLink)) {
            $card .= _linkIconHTML("bi bi-windows", $project->windowsLink);
        }
        if (isset($project->webLink)) {
            $card .= _linkIconHTML("bi bi-globe", $project->webLink);
        }
    }


    $card .= '</div> </div>';

    echo $card;
}


function _linkIconHTML($iconType, $link): string
{
    $linkHtml = "";
    $linkHtml .= '<a class="project-link" href="' . $link . '" target="_blank">';
    $linkHtml .= '<i class="' . $iconType . '"></i>';
    $linkHtml .= '</a>';
    return $linkHtml;
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




function _loadProjectsFromJSON(string $jsonPath) : array {

    $remappedProjects = [];

    if (!file_exists($jsonPath)) {
        error_log("Project csv not found: $jsonPath");
        return $remappedProjects;
    }

    $fileContent =  file_get_contents($jsonPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    // All projects, key is just another filed of the object
    $allProjects = json_decode($fileContent, false);

    _sortProjectsByRelevanceWithRandomness($allProjects);




    // All projects, key field is also the key of the arraymap
    foreach ($allProjects as $project) {
        if (isset($project->key)) {
            $remappedProjects[$project->key] = $project;
        }
    }
    return $remappedProjects;

}
// ------ PUBLIC (called from HTML) -------- //

// INDEX PAGE
function showAllProjectsCarrousel(): void
{
    global $currentLanguage;
    foreach ($_SESSION['projects'] as $p) {
        echo '<div class="swiper-slide">';
        _showProjectCard($p, $currentLanguage, true);
        echo '</div>';
    }
}

// All PROJECTS PAGE
function showAllProjectsPage(): void
{
    global $currentLanguage;
    foreach ($_SESSION['projects'] as $p) {
        echo '<div class="col-md-4">';
        _showProjectCard($p, $currentLanguage, true);
        echo '</div>';
    }
}

function showAllTags(): void {
    $projects = $_SESSION['projects'] ?? [];

    // Recopilar tags únicas
    $allTags = [];
    foreach ($projects as $project) {
        foreach ($project->tags ?? [] as $tag) {
            if (!in_array($tag, $allTags)) {
                $allTags[] = $tag;
            }
        }
    }

    foreach ($allTags as $tag) {
        $id = 'tag-' . htmlspecialchars($tag);
        echo '<a href="#" class="btn tag-filter" id="' . $id . '">' . htmlspecialchars($tag) . '</a>';
    }
}

// Project details page
function showTitle($key): void
{
    echo $_SESSION['projects'][$key]->title;
}

function showSubtitle($key): void
{
    global $currentLanguage;


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
function showDescription($key): void
{

    global $currentLanguage;

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


function showLinks($key) : void {
    $project = $_SESSION['projects'][$key];

    if (isset($project->repoLink)) {
        $iconType = "bi bi-link-45deg";
        if (str_contains(strtolower($project->repoLink), "gitlab")) $iconType = "bi bi-gitlab";
        if (str_contains(strtolower($project->repoLink), "github")) $iconType = "bi bi-github";

        echo _linkIconHTML($iconType, $project->repoLink);
    }

    if (isset($project->windowsLink)) {
        echo _linkIconHTML("bi bi-windows", $project->windowsLink);
    }
    if (isset($project->webLink)) {
        echo _linkIconHTML("bi bi-globe", $project->webLink);
    }

}

function showProjectMediaCarrousel($key): void
{

    // Añadir imagenes, a no ser que...
    if ($key == "this") return;

    $project = $_SESSION['projects'][$key];

    $numberOfImages = $project->numberOfImages ?? 0;

    // Videos (van primero)
    if (!empty($project->video)) {
        $videos = is_array($project->video) ? $project->video : [$project->video];
        foreach ($videos as $video) {
            $src = "assets/img/projects/$key/$video";
            echo '<div class="swiper-slide">';
            echo '<video class="img-fluid" src="' . htmlspecialchars($src) . '" playsinline muted preload="auto"></video>';
            echo '</div>';
        }
    }

    // Imágenes numeradas
    for ($i = 1; $i <= $numberOfImages; $i++) {
        $filename = str_pad($i, 2, '0', STR_PAD_LEFT);
        $src = "assets/img/projects/$key/{$filename}.webp";
        echo '<div class="swiper-slide">';
        echo   '<div class="project-details-item">';
        echo     '<img class="img-fluid" src="' . htmlspecialchars($src) . '" alt="' . htmlspecialchars($key) . ' screenshot">';
        echo   '</div>';
        echo '</div>';
    }

    // Gif
    if (!empty($project->gif)) {
        $src = "assets/img/projects/$key/{$project->gif}";
        echo '<div class="swiper-slide">';
        echo   '<div class="project-details-item">';
        echo     '<img class="img-fluid" src="' . htmlspecialchars($src) . '" alt="' . htmlspecialchars($key) . ' gif">';
        echo   '</div>';
        echo '</div>';
    }
}

function showTags($key): void
{
    $project = $_SESSION['projects'][$key];
    $tags = $project->tags ?? [];

    foreach ($tags as $tag) {
        $link = "project-all.php?filters=" . urlencode($tag);
        echo '<a href="' . htmlspecialchars($link) . '" class="btn tag-button">' . htmlspecialchars($tag) . '</a>';
    }
}

function showRelatedProjects($key): void
{
    $project = $_SESSION['projects'][$key];
    $allProjects = $_SESSION['projects'];

    // Puntuar candidatos
    $scoredProjects = [];
    foreach ($allProjects as $candidate) {
        if ($candidate->key === $key) continue;

        $score = $candidate->relevance ?? 0;

        // +1000 por cada tag en común
        $candidateTags = $candidate->tags ?? [];
        $projectTags   = $project->tags   ?? [];
        foreach ($candidateTags as $tag) {
            if (in_array($tag, $projectTags)) {
                $score += 1000;
            }
        }

        $scoredProjects[] = ['project' => $candidate, 'score' => $score];
    }

    // Ordenar descendente y coger los 3 primeros
    usort($scoredProjects, fn($a, $b) => $b['score'] <=> $a['score']);
    $topThree = array_slice($scoredProjects, 0, 3);

    // Renderizar — sin subtitle, igual que el JS ponía undefined
    global $currentLanguage;
    foreach ($topThree as $scored) {

        echo '<div class="col-md-4">';
        _showProjectCard($scored['project'], $currentLanguage, false);
        echo '</div>';

    }
}



// handly debug
// echo '<script>alert("A")</script>';

?>


