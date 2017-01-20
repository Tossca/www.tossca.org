<div class="animation animation--problem js--animation-problem editor--content editor--content__consider-margins">

  <div class="section section__50 has-modules sticky--wrapper js--sticky">
    <div class="section--region editor--content">
      <div class="section--module">
        <div class="animation--problem-intro animation--problem-step" data-label="project">
          <div class="animation--problem-figure animation--problem-figure__project mobile__only"></div>
          <h2>Es ist Zeit, die Dinge zu vereinfachen.</h2>
          <p class="font-size__l">
            Ein OSS-Projekt durch ein einzelnes Unternehmen ist einfach und unkompliziert, aber ineffizient. Erst die Zusammenarbeit mehrerer Unternehmen spart Zeit und Kosten.
          </p>

        </div>

        <div class="animation--problem-step even" data-label="many_partners">
          <div class="animation--problem-figure animation--problem-figure__many_partners mobile__only"></div>
          <h3>Rechtliche Situation</h3>
          <p>
            Sobald jedoch mehrere Unternehmen bzw. Kontributoren am Projekt teilnehmen, wird die rechtliche Absicherung kompliziert. Jede Partei muss mit jeder anderen Partei Verträge über Lizenzen und Patente aushandeln.
          </p>
        </div>

        <div class="animation--problem-step" data-label="bad_commit">
          <div class="animation--problem-figure animation--problem-figure__bad_commit mobile__only"></div>
          <h3>Risiken</h3>
          <p>
            Die Veröffentlichung eigener Open Source Software birgt aber auch Risiken. Selbst erstellte OSS enthält in der Regel andere OSS an der eventuell versehentlich Änderungen vorgenommen wurden. Hierbei können Patente und Lizenzvereinbarungen verletzt werden.
          </p>
        </div>

        <div class="animation--problem-step even" data-label="withdraw">
          <div class="animation--problem-figure animation--problem-figure__withdraw mobile__only"></div>
          <h3>Gefahr für das Projekt</h3>
          <p>
            Ziehen sich Teilnehmer zurück, ist das Konstrukt gefährdet, weil dem Projekt damit eventuell wichtige Rechte oder Lizenzen entzogen werden.
          </p>
        </div>

        <div class="animation--problem-step" data-label="tossca">
          <div class="animation--problem-figure animation--problem-figure__tossca mobile__only"></div>
          <h3>Die einfache Lösung</h3>
          <p>
            Durch das durchdachte Modell von Tossca, in dem alle Verträge nur mit Tossca geschlossen werden und die Lizenz des Projekts durch Tossca erteilt wird, herrscht Klarheit und Sicherheit für alle Projektteilnehmer.
          </p>
          <p>
            Lizenzen für eingebrachte Software-Bestandteile werden zeitlich unbegrenzt an Tossca erteilt. Tossca ist verpflichtet, diese ebenso  zeitlich unbegrenzt zur Verfügung zu stellen.
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