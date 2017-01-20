<div class="fold--intro editor--content editor--content__consider-margins">
  <div class="roles js--roles">
    <ul class="tabs--list roles--tabs mobile__hidden">
      <li>
        <a href="#init-company">Init. Company</a>
      </li>
      <li>
        <a href="#governance">Project Manager</a>
      </li>
      <li>
        <a href="#license">License</a>
      </li>
      <li>
        <a href="#contrib-company">Company</a>
      </li>
      <li>
        <a href="#individual">Indiv. Contributor</a>
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
          <h3>Initiating Company</h3>
            <p>The company starts the project, selects the license, grants rights to Tossca and selects the initial project manager.</p>
        </div>
        <div class="roles--caption even" id="governance-caption">
        <div class="roles--caption-figure roles--caption-figure__governance mobile__only"></div>
          <h3>Project Manager</h3>
            <p>The project manager has to ensure that only contributions by people who have signed an agreement with Tossca are accepted.</p>
        </div>
        <div class="roles--caption" id="license-caption">
        <div class="roles--caption-figure roles--caption-figure__license mobile__only"></div>
          <h3>License</h3>
            <p>The project selects its license, Tossca grants this license to the users of the project.</p>
        </div>
        <div class="roles--caption even" id="contrib-company-caption">
        <div class="roles--caption-figure roles--caption-figure__contrib-company mobile__only"></div>
          <h3>Contributing Company</h3>
            <p>Companies allow selected employees to collaborate on Tossca projects as contributors or project managers.</p>
        </div>
        <div class="roles--caption" id="individual-caption">
        <div class="roles--caption-figure roles--caption-figure__individual mobile__only"></div>
          <h3>Individual Contributors</h3>
          <p>Contributors may be employees of contributng companies or collaborate on their own terms.</p>
        </div>
      </figcaption>
    </figure>
  </div>
</div>