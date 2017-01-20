<?php
/**
 * @file
 * online_statement_feature.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function online_statement_feature_field_group_info() {
  $field_groups = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_statement_company_gov|node|online_statement|form';
  $field_group->group_name = 'group_statement_company_gov';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'online_statement';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Company (Governance)',
    'weight' => '4',
    'children' => array(
      0 => 'field_statement_company_gov_name',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'label' => 'Company (Governance)',
      'instance_settings' => array(
        'required_fields' => 1,
        'id' => 'group-statement-company-gov',
        'classes' => 'group-statement-company-gov field-group-fieldset',
        'description' => '',
      ),
      'formatter' => 'open',
    ),
  );
  $field_groups['group_statement_company_gov|node|online_statement|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_statement_contr_common|node|online_statement|form';
  $field_group->group_name = 'group_statement_contr_common';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'online_statement';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Statement Common',
    'weight' => '2',
    'children' => array(
      0 => 'field_online_statement_mail',
      1 => 'field_online_statement_name',
    ),
    'format_type' => 'div',
    'format_settings' => array(
      'label' => 'Statement Common',
      'instance_settings' => array(
        'required_fields' => 1,
        'id' => '',
        'classes' => '',
        'description' => '',
        'show_label' => '0',
        'label_element' => 'h3',
        'effect' => 'none',
        'speed' => 'none',
      ),
      'formatter' => 'open',
    ),
  );
  $field_groups['group_statement_contr_common|node|online_statement|form'] = $field_group;

  // Translatables
  // Included for use with string extractors like potx.
  t('Company (Governance)');
  t('Statement Common');

  return $field_groups;
}
