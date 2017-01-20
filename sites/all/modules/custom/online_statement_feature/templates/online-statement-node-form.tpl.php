<?php
  global $language;
?>

<div class="fold">
  <div class="fold--inner editor--content">
    <div class="font-size__xl base--text-align__center statement--type-select">
      <?php print drupal_render_children($form['field_online_statement_type']) ?>
    </div>
  </div>
</div>


<div class="fold fold__emphasized fold__narrow">
  <div class="fold--inner">
    <div class="section section__100">
      <div class="section--region editor--content">
        <?php print drupal_render($form['online_statement_headline_individual']) ?>
        <?php print drupal_render($form['online_statement_headline_governance']) ?>
      </div>
    </div>
    <div class="section section__50 has-modules form--statement-header">
      <div class="section--region">
        <div class="section--module editor--content">
          <?php print render($form['group_statement_contr_common']) ?>
          <?php # print drupal_render($form['online_statement_header_left_individual']) ?>
          <div id="edit-online-statement-header-left-individual" class="form-wrapper">
            <?php print drupal_render($form['field_statement_cmpny_individual']) ?>
            <div class="statement--adress-target" id="statement--adress-target__individual"></div>
            <p class="font-size__s base--top__30 base--top__20__mobile">
              <?php print t('nachfolgend „Sie“ oder „Individualkontributor(in)“ genannt') ?>
            </p>
          </div>
          <?php print drupal_render($form['online_statement_header_left_governance']) ?>
          <span class="form--statement-dividertext"><?php print t('to', array(), array('content' => 'online_statement')) ?></span>

        </div>
      </div>
      <div class="section--region">
        <div class="section--module editor--content">
          <?php print drupal_render($form['online_statement_header_right_individual']) ?>
          <?php # print drupal_render($form['online_statement_header_right_governance']) ?>
          <div class="form-wrapper" id="edit-online-statement-header-right-governance">
            <ol>
              <li class="font-size__l">
                <?php print variable_get("online_statement_feature_address_tossca_{$language->language}", "") ?>
              </li>
              <li>
                <?php print drupal_render($form['field_statement_cmpny_governance']) ?>
              </li>
            </ol>
            <div class="statement--adress-target" id="statement--adress-target__governance"></div>
          </div>
        </div>
      </div>
    </div>


    <div class="form--statement-body editor--content">
      <?php print drupal_render($form['online_statement_text_individual']) ?>
      <?php print drupal_render($form['online_statement_text_governance']) ?>
    </div>


    <?php print render($form['field_online_statement_terms']) ?>
    <div class="base__float-right">
      <?php
        hide($form['field_statement_cmpny_individual']);
        hide($form['field_statement_cmpny_governance']);
        print drupal_render_children($form);
      ?>
    </div>
  </div>
</div>