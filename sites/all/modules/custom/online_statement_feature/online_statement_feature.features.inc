<?php
/**
 * @file
 * online_statement_feature.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function online_statement_feature_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "field_group" && $api == "field_group") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function online_statement_feature_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_node_info().
 */
function online_statement_feature_node_info() {
  $items = array(
    'company' => array(
      'name' => t('Kontributionsunternehmen'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'online_statement' => array(
      'name' => t('Online-Erklärung'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Titel'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
