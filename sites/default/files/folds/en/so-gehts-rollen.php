<div class="fold--intro editor--content editor--content__consider-margins">
  <div class="roles js--roles">
    <ul class="tabs--list roles--tabs mobile__hidden">
      <li>
        <a href="#init-company">Init. company</a>
      </li>
      <li>
        <a href="#governance">Project lead</a>
      </li>
      <li>
        <a href="#license">License</a>
      </li>
      <li>
        <a href="#contrib-company">Company</a>
      </li>
      <li>
        <a href="#individual">Indiv. contributor</a>
      </li>
    </ul>
    <figure>
      <?php
        $build = array(
          '#theme' => 'fold_svg',
          '#path' => 'folds/en/images/roles.svg'
        );
        print render($build);
      ?>
      <figcaption>
        <div class="roles--caption" id="init-company-caption">
          <div class="roles--caption-figure roles--caption-figure__init-company mobile__only"></div>
          <h3>Initiierendes Kontributionsunternehmen</h3>
          <p>Das Unternehmen startet das Projekt, wählt die Lizenz, räumt Tossca Rechte ein und benennt den ersten Projektverantwortlichen.</p>
        </div>
        <div class="roles--caption even" id="governance-caption">
        <div class="roles--caption-figure roles--caption-figure__governance mobile__only"></div>
          <h3>Projektverantwortlicher</h3>
          <p>Der Projektverantwortliche sorgt dafür, dass nur Beiträge von Tossca-Kontributoren angenommen werden.</p>
        </div>
        <div class="roles--caption" id="license-caption">
        <div class="roles--caption-figure roles--caption-figure__license mobile__only"></div>
          <h3>Lizenz</h3>
          <p>Das Projekt wählt seine Lizenz selber, Tossca tritt als Lizenzgeber für das Projekt auf.</p>
        </div>
        <div class="roles--caption even" id="contrib-company-caption">
        <div class="roles--caption-figure roles--caption-figure__contrib-company mobile__only"></div>
          <h3>Kontributionsunternehmen</h3>
          <p>Unternehmen räumen Angestellten das Recht ein, als Kontributoren oder Projektverantwortliche an Projekten teilzunehmen.</p>
        </div>
        <div class="roles--caption" id="individual-caption">
        <div class="roles--caption-figure roles--caption-figure__individual mobile__only"></div>
          <h3>Individualkontributor</h3>
          <p>Kontributoren können als Angestellte eines Kontributionsunternehmens oder als private Kontributoren beitragen.</p>
        </div>
      </figcaption>
    </figure>
  </div>
</div>