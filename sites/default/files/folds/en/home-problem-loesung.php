<div class="animation animation--problem js--animation-problem editor--content editor--content__consider-margins">

  <div class="section section__50 has-modules sticky--wrapper js--sticky">
    <div class="section--region editor--content">
      <div class="section--module">
        <div class="animation--problem-intro animation--problem-step" data-label="project">
          <div class="animation--problem-figure animation--problem-figure__project mobile__only"></div>
          <h2>It's About Time to Simplify Things.</h2>
          <p class="font-size__l">
            Starting an open source software project as a single company might be simple and not too complex, but that's not very efficient.  In order to save time and money you need a way to collaborate with others.
          </p>

        </div>

        <div class="animation--problem-step even" data-label="many_partners">
          <div class="animation--problem-figure animation--problem-figure__many_partners mobile__only"></div>
          <h3>Legal Situation</h3>
          <p>
            As soon as several parties contribute to a single project the legal aspects become difficult. Each single party needs to negotiate agreements about licenses and patents with each other.
          </p>
        </div>

        <div class="animation--problem-step" data-label="bad_commit">
          <div class="animation--problem-figure animation--problem-figure__bad_commit mobile__only"></div>
          <h3>Risks</h3>
          <p>
          When accepting contributions of others the project takes some risks. The contributions may inadvertently violate the licenses, patents or intellectual properties of third parties.
          </p>
        </div>

        <div class="animation--problem-step even" data-label="withdraw">
          <div class="animation--problem-figure animation--problem-figure__withdraw mobile__only"></div>
          <h3>Risks for the Project</h3>
          <p>
            If one of the parties involved withdraws from the project the whole construct of agreements may fall apart and the project may lose important licenses.
          </p>
        </div>

        <div class="animation--problem-step" data-label="tossca">
          <div class="animation--problem-figure animation--problem-figure__tossca mobile__only"></div>
          <h3>The Simple Solution</h3>
          <p>
          Using the Tossca model all parties contributing to the project sign a contract with and grant a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable license to Tossca. Tossca then grants a license to all users of the project on the same terms.
          </p>
          <p>
           This way the users and contributors are safe and the model is clear and simple for all parties involved.
          </p>
        </div>
      </div>
    </div>

    <div class="section--region editor--content">
      <div class="base--text-align__center section--module">

        <div class="sticky" data-stickycentered="true">
          <figure class="animation--problem-image mobile__hidden">
            <?php
              $build = array(
                '#theme' => 'fold_svg',
                '#path' => 'folds/und/images/animation-new.svg'
              );
              print render($build);
            ?>
          </figure>
        </div>

      </div>
    </div>
  </div>

</div>

<div class="base--text-align__center base--top__50">
  <?php 
    global $conf;
    if (!empty($conf['tossca_path_details'][$language->language])) {
      $vars['details_cta'] = array(
        '#theme' => 'link',
        '#text' => '<span class="button--content">' . t('Get details') . '</span>',
        '#path' => $conf['tossca_path_details'][$language->language],
        '#options' => array(
          'html' => TRUE,
          'attributes' => array(
            'class' => array('button'),
          ),
        ),
      );
    }
    print render($vars['details_cta']);
  ?>
</div>