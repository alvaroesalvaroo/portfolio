<?php /* TRANSLATIONS SERVICE*/

require_once __DIR__ . '/assets/php/translations.php'; // Carga CSV + sesión + detecta idioma
require_once __DIR__ . '/assets/php/helpers.php';       // Función t()
require_once __DIR__ . '/assets/php/projects.php';       // Función t()

// var_dump($sessionProjects);
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0 maximum-scale=1.0, user-scalable=no" name="viewport">
  <title>Alvaro Ruiz | Videogame Programmer</title>

  <meta name="description" content="Portfolio of Alvaro Ruiz, programmer and game developer">
  <meta name="keywords" content="Full stack dev, Programmer, Game dev, 3D artist, Unity, Blender">

  <!-- Favicons -->
  <link href="assets/img/icons/ar.svg" rel="icon">
  <link href="assets/img/icons/ar.svg" rel="apple-touch-icon">

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
  <!-- Projects CSS File-->
  <link href="assets/css/projects.css" rel="stylesheet">
  <!-- Skills tab CSS File-->
  <link href="assets/css/skills.css" rel="stylesheet">
  <!-- Loader CSS File-->
  <link href="assets/css/loader.css" rel="stylesheet">

</head>

<body class="index-page">

  <div id="loader">
    <div class="spinner"></div>
    <p><?= t("loading") ?></p>
  </div>

  <header id="header" class="header d-flex align-items-center fixed-top">
    <div class="container position-relative d-flex align-items-center justify-content-between">

      <!-- I do not have a logo since I do not truly believe in the "personal brand" concept -->

      <!-- <a href="index.php" class="logo d-flex align-items-center me-auto me-xl-0">
        <img src="assets/img/logo.webp" alt="">
      </a> -->
      <a href="." class="active homebutton"><?= t("home") ?></a>
      <nav id="navmenu" class="navmenu">
        <ul>
          <li><a href="." id="homemobilebutton"><?= t("home") ?></a></li>
            <li><a href="#aboutme"><?= t("aboutme") ?></a></li>
            <li><a href="project-all.php"><?= t("projects") ?></a></li>

            <li class="dropdown"><a><span><?= t("language") ?></span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
              <ul>
                <li><a href="./assets/php/set_lang.php?lang=es" id = "lang-es">Español</a></li>
                
                <li><a href="./assets/php/set_lang.php?lang=en" id = "lang-en">English</a></li>
                <li><a href="./assets/php/set_lang.php?lang=cat" id = "lang-cat">Català</a></li>

              </ul>
            </li>
            <li><a href="#contact"><?= t("contact") ?></a></li>
          
        </ul>
        <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
      </nav>

      <!-- <a class="btn-getstarted" href="index.php#about">Get Started</a> -->

    </div>
  </header>

  <main class="main">
    <canvas class="webgl"></canvas>
    <!-- Hero Section -->
    <section id="hero" class="hero section">
      <div class="container">
        <div class="hero-wrapper">

          <div class="hero-main-content text-center">
            <h1 class="hero-title" data-aos="zoom-in" data-aos-delay="200">
              Alvaro Ruiz<br>
                <span id="typed-es" class="typed" data-typed-items="Programmer,Game Dev,3D Artist"></span>
                <span id="typed-en" class="typed d-none" data-typed-items="Programmer,Videogame Developer,3D Artist"></span>
                <span id="typed-cat" class="typed d-none" data-typed-items="Programador,Desenvolupador de Videojocs,Artista 3D"></span>
           </h1>

            <p class="hero-description" data-aos="fade-up" data-aos-delay="300"><?= t("mainmsg") ?></p>


          </div>

        </div>
      </div>
    </section><!-- /Hero Section -->

    <!-- About Section -->
    <section id="aboutme" class="about section" data-aos="fade-up" data-aos-duration="300" data-aos-once="false">

      <div class="container" data-aos="fade" data-aos-delay="300" data-aos-duration="200" data-aos-easing="ease-in-out" data-aos-once="false">

        <div class="row align-items-center justify-content-between g-lg-5">
          <div class="col-lg-6" data-aos="fade-right" data-aos-delay="200">
            <div class="image-wrapper">
              <img src="assets/img/MiCarita.webp" class="img-fluid rounded" alt="About Us Image">
            </div>
          </div>

          <div class="col-lg-6" data-aos="fade-left" data-aos-delay="300">
            <div class="content">
              <h5><?= t("Iam") ?></h5>
              <h2 class="mb-4"><?= t("programmer") ?></h2>
              <!-- <h5 class="mb-4">Crafting innovative solutions since 2010</h5> -->

              <p><?= t("programmerinfo") ?></p>


              <!-- <div class="mt-5" data-aos="fade-up" data-aos-delay="600">
                <a href="#" class="btn btn-outline-primary">Contact Us</a>
              </div> -->
            </div>
          </div>
        </div>

      </div>

    </section><!-- /About Section -->


    <!-- Mis proyectos section -->
    <section id="projects" class="projects section">

      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="container section-title" data-aos="fade-up">

          <h3><?= t("projects") ?></h3>
        </div>

        <div class="project-slider swiper init-swiper-on-render">
          <script type="application/json" class="swiper-config">
            {
              "loop": true,
              "speed": 600,
              "autoplay": {
                "delay": 40000
              },
              "slidesPerView": 1,
              "spaceBetween": 30,
              "navigation": {
                "nextEl": ".swiper-button-next",
                "prevEl": ".swiper-button-prev"
              },
              "watchSlidesProgress": true,
              "on": {
                "init": "function() { this.autoplay.stop(); }"
              },
              "breakpoints": {
                "768": {
                  "slidesPerView": 2
                },
                "1200": {
                  "slidesPerView": 3
                }
              }
            }
          </script>


          <div class="swiper-wrapper" id ="projects-container">
            <?php showAllProjectsCarrousel() ?>

            <template id="project-index-template">
              <div class="swiper-slide">
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
            <!--</div>--><!--Close projects container-->
          </div><!--Close swipper wrapper-->

          <div class="actions">
            <a href="project-all.php" class="btn-primary"><?= t("see-all") ?></a>

            <div class="swiper-navigation">
              <div class="swiper-button-prev"></div>
              <div class="swiper-button-next"></div>
            </div>
          </div>

        </div>
      </div><!--Close slider element-->

    </section><!-- /Services Section -->


    <!-- Otros roles/skills section-->
    <section id="skill-tabs" class="features-tabs section">
      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <hr class = "line-separator" data-aos="grow-left" data-aos-delay="100">

        <h4><?= t("Iamalso") ?></h4>
        <br>
        <!-- <div class="tabs-wrapper"> -->
          <ul class="nav nav-tabs" data-aos="fade-up" data-aos-delay="100">

            <li class="nav-item">
              <a class="nav-link active show" data-bs-toggle="tab" id = "cambutton3D">

                <div class="tab-content">
                  <h5><?= t("3dartist") ?></h5>
                </div>
              </a>
            </li><!-- End tab nav item -->

            <li class="nav-item" >
              <a class="nav-link" data-bs-toggle="tab" id = "cambuttonMusic">

                <div class="tab-content">
                  <h5><?= t("sound") ?></h5>
                  <!--                  <span><?= t("soundmore") ?></span>-->
                </div>
              </a>
            </li><!-- End tab nav item -->

            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" id = "cambuttonWeb">
                <div class="tab-content">
                  <h5><?= t("fullstack") ?></h5>
                </div>
              </a>
            </li><!-- End tab nav item -->


            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" id = "cambuttonPhysics">

                <div class="tab-content">
                  <h5><?= t("physicist") ?></h5>
<!--                  <span><?= t("physicistmore") ?></span>-->
                </div>
              </a>
            </li><!-- End tab nav item -->

          </ul>

            <div class="tab-pane fade active show" id="features-tabs-tab-1">
              <div class="row align-items-center">

                <div class="col-lg-7">
                  <div class="visual-content">
                    <div class="extra-webgl-container">
                      <canvas> </canvas>
                    </div>
                  </div>
                </div>

                <div class="col-lg-5">
                  <div class="content-wrapper">
                    <p id="skill-description"><?= t("3dartist-description") ?></p>
                  </div>
                </div>


              </div>
            </div><!-- End tab content item -->


      </div>
    </section><!-- /Features Tabs Section -->


    <!-- Contact Section -->
    <section id="contact" class="contact section">
      <!-- Section Title -->
      <div class="container section-title" data-aos="fade-up">
        <h2><?= t("contact") ?></h2>
        <p><?= t("send-me-email") ?></p><span id="email-copy"> info@alvaro-ruiz.dev</span> <i class="bi bi-clipboard"></i>
      </div><!-- End Section Title -->

    </section><!-- /Contact Section -->

  </main>

  <footer id="footer" class="footer light-background">

    <div class="copyright text-center">
      <div class="container d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between align-items-center">

        <div class="d-flex flex-column align-items-center align-items-lg-start">
          <div>
            Alvaro Ruiz Portfolio (Beta)
          </div>
          <div class="credits"><?= t("madewith") ?></a>
          </div>
        </div>

        <div class="social-links order-first order-lg-last mb-3 mb-lg-0">
<!--          <a href=""><i class="bi bi-twitter-x"></i></a>-->
<!--          <a href=""><i class="bi bi-facebook"></i></a>-->
          <a href="https://www.linkedin.com/in/alvaro-ruiz-garcia/"><i class="bi bi-linkedin"></i></a>
          <a href="https://www.instagram.com/alvarodelchill"><i class="bi bi-instagram"></i></a>

        </div>

      </div>
    </div>

  </footer>

  <!-- Scroll Top -->
  <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>


  <!--Allows importmaps to load on IOS 16-->
  <script async src="https://ga.jspm.io/npm:es-module-shims@1.10.1/dist/es-module-shims.js"></script>

  <!-- Vendor JS Files -->
  <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/vendor/aos/aos.js"></script>
<!--  <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>-->
<!--  <script src="assets/vendor/purecounter/purecounter_vanilla.js"></script>-->
  <script src="assets/vendor/typed.js/typed.umd.js"></script>
  <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>

  <!--Translating service files. -->
  <!--<script src="assets/js/projects.js"></script>-->
  <script src="assets/js/projects-helpers.js"></script>
<!--  <script src="assets/js/language-manager.js"></script>-->
  <!-- Main JS File -->
  <script src="assets/js/main.js"></script>

  <!--Three.js 3D model library and setup-->
  <script type="importmap">
  {
    "imports": {
      "three": "./assets/vendor/three/build/three.module.min.js",
      "three/addons/": "./assets/vendor/three/examples/jsm/"
    }
  }
  </script>

  <script type="module" src="assets/js/3dMainSetup.js"></script>
  <script type="module" src="assets/js/3dCssRender.js"></script> <!-- Tiene que ir antes porque controla el nivel de fractal -->
  <script type="module" src="assets/js/3dLabSetup.js"></script>

</body>

</html>