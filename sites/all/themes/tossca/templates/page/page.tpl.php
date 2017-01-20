<?php
  global $conf;
?>

<header class="header navigation-mobile--wrapper js--navigation-mobile" id="header"> 
  <?php print render($header_logo) ?>
  <a href="#" class="header--navigation-trigger navigation--mobile-trigger" id="navigation--mobile-trigger"> 
    <i class="navigation--mobile-trigger-icon"><span class="i1"></span><span class="i2"></span><span class="i3"></span><span class="i4"></span></i> <?php print t('Menu') ?>
  </a>
  <h1><span class="base__hidden">tossca.org</span></h1>
  <div class="navigation--mobile-content" id="navigation--mobile-content">
    <nav class="navigation header--navigation navigation--header" id=navigation--header>
      <?php print render($page['header_navigation']) ?>
    </nav>
    <div class="locale header--locale locale--header">
      <?php print render($page['header_locale']) ?>
    </div>
    <?php if (!empty($conf['tossca_path_downloads'][$language->language])): ?>
      <?php
        $text = '<span class="button--content">' . t('Start now') . '</span>';
        $path = $conf['tossca_path_downloads'][$language->language];
        $options = array(
          'html' => TRUE,
          'attributes' => array(
            'class' => array('header--downloads'),
          ),
        );
        print l($text, $path, $options);
      ?>
    <?php endif ?>
  </div>
  
</header>

<main class="base--wrapper footer--wrapper <?php print $classes ?>" id="main--wrapper">
  <?php if ($tabs && !empty($tabs['#primary'])): ?>
    <div class="tabs-wrapper">
      <?php print render($tabs); ?>
    </div>
  <?php endif; ?>
  <?php if ($messages && !empty($messages)): ?>
    <div class="drupal--messages-wrapper">
      <?php print render($messages); ?>
    </div>
  <?php endif ?>

  <section class="base--content">
    <?php print render($page['content']); ?>
  </section>

  <div class="footer--push"></div>
  <div class="info--overlay"></div>
</main>


<footer class="footer">
  <nav class="navigation navigation--footer footer--navigation">
    <?php print render($page['footer_navigation']) ?>
  </nav>
</footer>