<div class="fold--intro fold--intro__front editor--content editor--content__consider-margins">
  <h1 class="font-size__xxxxl base--clearfix">
    <div class="base--clearfix">Open Source rechtssicher.</div>
    <div class="fold--intro-signature-prefix">Mit nur einer </div><div class="fold--intro-signature">Unterschrift</div>
  </h1>
  <p class="font-size__xl">
    Erschließen Sie neue Potentiale. Profitieren Sie von den Vorteilen, Open Source Lösungen kooperativ zu entwickeln und gemeinsam mit anderen Unternehmen zu veröffentlichen. Mit der Unterstützung von TOSSCA geht das ganz einfach.
  </p>

  <p class="base--text-align__center base--top__50">
    <?php 
      global $conf;
      if (!empty($conf['tossca_path_downloads'][$language->language])) {
        $vars['front_cta'] = array(
          '#theme' => 'link',
          '#text' => '<span class="button--content">' . t('Register and take part') . '</span>',
          '#path' => $conf['tossca_path_downloads'][$language->language],
          '#options' => array(
            'html' => TRUE,
            'attributes' => array(
              'class' => array('button'),
            ),
          ),
        );
      }
      print render($vars['front_cta']);
    ?>
  </p>
</div>
