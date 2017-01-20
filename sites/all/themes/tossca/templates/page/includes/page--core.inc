<header class="header" id="header"> 
  <?php print render($header_logo) ?> 
</header>

<main class="base--wrapper <?php print $classes ?>">  
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
    <div class="base__centered base--top__100">
      <?php print render($page['content']); ?>
    </div>
  </section>
</main>

<!-- <footer class="footer">
  FOOTER
</footer> -->