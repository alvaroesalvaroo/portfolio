<?php

require_once __DIR__ . '/assets/php/translations.php'; // Carga CSV + sesión + detecta idioma
require_once __DIR__ . '/assets/php/helpers.php';       // Función t()
require_once __DIR__ . '/assets/php/projects.php';

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <title>Service Details - Instant Bootstrap Template</title>
  <meta name="description" content="">
  <meta name="keywords" content="">

  <!-- Favicons -->
<!--  <link href="assets/img/icons/favicon.png" rel="icon">-->
<!--  <link href="assets/img/icons/apple-touch-icon.png" rel="apple-touch-icon">-->

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com" rel="preconnect">
  <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

  <!-- Vendor CSS Files -->
  <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="assets/vendor/aos/aos.css" rel="stylesheet">
<!--  <link href="assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">-->
  <link href="assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">

  <!-- Main CSS File -->
  <link href="assets/css/main.css" rel="stylesheet">
  <!-- Projects CSS File -->
  <link href="assets/css/projects.css" rel="stylesheet">

</head>

<body class="service-details-page">

  <header id="header" class="header d-flex align-items-center fixed-top">
    <div class="container position-relative d-flex align-items-center justify-content-between">

      <a href="." class="logo d-flex align-items-center me-auto me-xl-0">
        <!-- Uncomment the line below if you also wish to use an image logo -->
        <!-- <img src="assets/img/logo.webp" alt=""> -->
        <h1 class="sitename"><i class="bi bi-house"></i></h1>
      </a>

      <nav id="navmenu" class="navmenu">
        <ul>
          <li><a href="." id="homemobilebutton"><?= t("home") ?></a></li>
          <li><a href=".#contact"><?= t("contact") ?></a></li>
<!--          <li><a href="index.php"><?= t("projects") ?></a></li>-->

          <li class="dropdown"><a href="#"><span><?= t("language") ?></span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
            <ul>
                <li><a href="./assets/php/set_lang.php?lang=es" id = "lang-es">Español</a></li>

                <li><a href="./assets/php/set_lang.php?lang=en" id = "lang-en">English</a></li>
                <li><a href="./assets/php/set_lang.php?lang=cat" id = "lang-cat">Català</a></li>

            </ul>
          </li>

        </ul>
        <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
      </nav>

    </div>
  </header>

  <main class="main">
    <!-- Project title -->
    <div class="project-page-title light-background">
      <div class="container">
        <h1 id = "project-title-all"><?= t("all-title") ?></h1>

        <p id = "project-subtitle-all"><?= t("all-subtitle") ?></p>
      </div>
    </div><!-- End Page Title -->

    <!-- Project Details Section -->
    <section class ="projects section" > <!--class="service-details section"-->

      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="filters-container">
          <div class="btn-dropdown"><i class="bi bi-chevron-down"></i>

          </div>
          <p><?= t("filters") ?></p>
        </div>

        <div class="tags-container-dropdown">
<!--            <a href="#"><span ></span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>-->

        <?php showAllTags(); ?>
        </div>


        <!--Template is outside beacuse container is cleared each filter-->
        <template id="project-all-template">
          <div class="col-md-4">
            <div class="project-index-item">
              <h5 class="project-title"> </h5>
              <img class ="img-fluid" src="#" alt="">

              <p class="service-description p-description">Descripción corta/subtitulo del proyecto.</p>

              <div class="project-tags mt-3" style="font-size: 0.8rem; opacity: 0.7;">
              </div>
              <div class="links-container">
                <a class="project-link" href="#" >
                  <i class="bi bi-gitlab"></i>
                </a>
              </div>

            </div>
          </div>
        </template>

      <div id = "projects-all-container" class="service-gallery row gy-3" data-aos="fade-up" data-aos-delay="300">

        <?php showAllProjectsPage(); ?>

          <script>
              // Pass data to js, asociando las keys de cada projecto con sus tags
              const projectTags = <?= json_encode(
                      array_map(
                              fn($p) => $p->tags ?? [],
                              (array)$_SESSION['projects']
                      )
              ) ?>;
          </script>
      </div>

      </div>
    </section><!-- /Service Details Section -->

  </main>


  <?php require_once "footer.php"; ?>

  <!-- Scroll Top -->
  <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

  <!-- Vendor JS Files -->
  <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/vendor/aos/aos.js"></script>
<!--  <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>-->
<!--  <script src="assets/vendor/purecounter/purecounter_vanilla.js"></script>-->
  <script src="assets/vendor/typed.js/typed.umd.js"></script>
  <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>

  <!-- Main JS File -->


  <script src="assets/js/main.js"></script>
<!--  <script src="assets/js/projects.js"></script>-->
  <script src="assets/js/projects-helpers.js"></script>
<!--  <script src="backups/language-manager.js.backup"></script>-->

</body>

</html>