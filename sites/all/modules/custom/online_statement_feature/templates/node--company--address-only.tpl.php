<div class="font-size__l base--bottom__20">
  <?php if (!empty($content['company_address']['street'])): ?>
    <?php print render($content['company_address']['street']) ?>
  <?php endif ?>
  <?php if (!empty($content['company_address']['additional'])): ?>
    <br />
    <?php print render($content['company_address']['additional']) ?>
  <?php endif ?>
  <?php if (!empty($content['company_address']['postal_code']) || !empty($content['company_address']['city'])): ?>
    <br />
  <?php endif ?>
  <?php if (!empty($content['company_address']['postal_code'])): ?>
    <?php print render($content['company_address']['postal_code']) ?>
  <?php endif ?>
  <?php if (!empty($content['company_address']['city'])): ?>
    <?php print render($content['company_address']['city']) ?>
  <?php endif ?>
  <?php if (!empty($content['company_address']['country_name'])): ?>
    <br />
    <?php print render($content['company_address']['country_name']) ?>
  <?php endif ?>
</div>