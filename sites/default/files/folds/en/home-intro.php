<div class="fold--intro fold--intro__front editor--content editor--content__consider-margins">
  <h1 class="font-size__xxxxl base--clearfix">
    <div class="base--clearfix">Open Source Legally Secure.</div>
    <div class="fold--intro-signature-prefix">With just one </div><div class="fold--intro-signature">Signature</div>
  </h1>
  <p class="font-size__xl">
    Embrace the advantages of developing and publishing Open Source Software in collaboration with other companies. Tossca helps to make this collaboration easy.
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
