<?php
/**
 * @file
 * online_statement_feature.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function online_statement_feature_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'online_statement_overview';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Online-Erklärungen';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Online-Erklärungen';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['access']['perm'] = 'access online statements overview';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '50';
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'created' => 'created',
    'field_online_statement_name' => 'field_online_statement_name',
    'field_online_statement_type' => 'field_online_statement_type',
    'field_statement_cmpny_individual' => 'field_statement_cmpny_individual',
    'field_statement_cmpny_governance' => 'field_statement_cmpny_governance',
  );
  $handler->display->display_options['style_options']['default'] = 'created';
  $handler->display->display_options['style_options']['info'] = array(
    'created' => array(
      'sortable' => 1,
      'default_sort_order' => 'desc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_online_statement_name' => array(
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_online_statement_type' => array(
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_statement_cmpny_individual' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_statement_cmpny_governance' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  $handler->display->display_options['style_options']['sticky'] = TRUE;
  /* Field: Content: Post date */
  $handler->display->display_options['fields']['created']['id'] = 'created';
  $handler->display->display_options['fields']['created']['table'] = 'node';
  $handler->display->display_options['fields']['created']['field'] = 'created';
  $handler->display->display_options['fields']['created']['label'] = 'Datum';
  $handler->display->display_options['fields']['created']['date_format'] = 'medium';
  $handler->display->display_options['fields']['created']['second_date_format'] = 'long';
  /* Field: Content: Name */
  $handler->display->display_options['fields']['field_online_statement_name']['id'] = 'field_online_statement_name';
  $handler->display->display_options['fields']['field_online_statement_name']['table'] = 'field_data_field_online_statement_name';
  $handler->display->display_options['fields']['field_online_statement_name']['field'] = 'field_online_statement_name';
  /* Field: Content: Typ */
  $handler->display->display_options['fields']['field_online_statement_type']['id'] = 'field_online_statement_type';
  $handler->display->display_options['fields']['field_online_statement_type']['table'] = 'field_data_field_online_statement_type';
  $handler->display->display_options['fields']['field_online_statement_type']['field'] = 'field_online_statement_type';
  /* Field: Content: Unternehmen */
  $handler->display->display_options['fields']['field_statement_cmpny_individual']['id'] = 'field_statement_cmpny_individual';
  $handler->display->display_options['fields']['field_statement_cmpny_individual']['table'] = 'field_data_field_statement_cmpny_individual';
  $handler->display->display_options['fields']['field_statement_cmpny_individual']['field'] = 'field_statement_cmpny_individual';
  $handler->display->display_options['fields']['field_statement_cmpny_individual']['label'] = 'Unternehmen (Inidividualkontributor)';
  $handler->display->display_options['fields']['field_statement_cmpny_individual']['alter']['path'] = 'node/[field_statement_cmpny_individual-target_id]';
  $handler->display->display_options['fields']['field_statement_cmpny_individual']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_statement_cmpny_individual']['settings'] = array(
    'link' => 1,
  );
  /* Field: Content: Unternehmen */
  $handler->display->display_options['fields']['field_statement_cmpny_governance']['id'] = 'field_statement_cmpny_governance';
  $handler->display->display_options['fields']['field_statement_cmpny_governance']['table'] = 'field_data_field_statement_cmpny_governance';
  $handler->display->display_options['fields']['field_statement_cmpny_governance']['field'] = 'field_statement_cmpny_governance';
  $handler->display->display_options['fields']['field_statement_cmpny_governance']['label'] = 'Unternehmen (Projektverantwortlicher)';
  $handler->display->display_options['fields']['field_statement_cmpny_governance']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_statement_cmpny_governance']['settings'] = array(
    'link' => 1,
  );
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'online_statement' => 'online_statement',
  );
  $handler->display->display_options['filters']['type']['expose']['operator_id'] = 'type_op';
  $handler->display->display_options['filters']['type']['expose']['label'] = 'Typ';
  $handler->display->display_options['filters']['type']['expose']['operator'] = 'type_op';
  $handler->display->display_options['filters']['type']['expose']['identifier'] = 'type';
  /* Filter criterion: Content: Typ (field_online_statement_type) */
  $handler->display->display_options['filters']['field_online_statement_type_tid']['id'] = 'field_online_statement_type_tid';
  $handler->display->display_options['filters']['field_online_statement_type_tid']['table'] = 'field_data_field_online_statement_type';
  $handler->display->display_options['filters']['field_online_statement_type_tid']['field'] = 'field_online_statement_type_tid';
  $handler->display->display_options['filters']['field_online_statement_type_tid']['value'] = '';
  $handler->display->display_options['filters']['field_online_statement_type_tid']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_online_statement_type_tid']['expose']['operator_id'] = 'field_online_statement_type_tid_op';
  $handler->display->display_options['filters']['field_online_statement_type_tid']['expose']['label'] = 'Typ';
  $handler->display->display_options['filters']['field_online_statement_type_tid']['expose']['operator'] = 'field_online_statement_type_tid_op';
  $handler->display->display_options['filters']['field_online_statement_type_tid']['expose']['identifier'] = 'field_online_statement_type_tid';
  $handler->display->display_options['filters']['field_online_statement_type_tid']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  $handler->display->display_options['filters']['field_online_statement_type_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_online_statement_type_tid']['vocabulary'] = 'online_statement_types';

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['path'] = 'admin/tossca/online-statements';
  $handler->display->display_options['menu']['type'] = 'normal';
  $handler->display->display_options['menu']['title'] = 'Online-Erklärungen Übersicht';
  $handler->display->display_options['menu']['weight'] = '0';
  $handler->display->display_options['menu']['name'] = 'management';
  $handler->display->display_options['menu']['context'] = 0;
  $handler->display->display_options['menu']['context_only_inline'] = 0;
  $translatables['online_statement_overview'] = array(
    t('Master'),
    t('Online-Erklärungen'),
    t('more'),
    t('Apply'),
    t('Reset'),
    t('Sort by'),
    t('Asc'),
    t('Desc'),
    t('Items per page'),
    t('- All -'),
    t('Offset'),
    t('« first'),
    t('‹ previous'),
    t('next ›'),
    t('last »'),
    t('Datum'),
    t('Name'),
    t('Typ'),
    t('Unternehmen (Inidividualkontributor)'),
    t('Unternehmen (Projektverantwortlicher)'),
    t('Page'),
  );
  $export['online_statement_overview'] = $view;

  $view = new view();
  $view->name = 'statement_companies';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'statement_companies';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: Content: Name */
  $handler->display->display_options['fields']['field_company_name']['id'] = 'field_company_name';
  $handler->display->display_options['fields']['field_company_name']['table'] = 'field_data_field_company_name';
  $handler->display->display_options['fields']['field_company_name']['field'] = 'field_company_name';
  $handler->display->display_options['fields']['field_company_name']['label'] = '';
  $handler->display->display_options['fields']['field_company_name']['element_label_colon'] = FALSE;
  /* Field: Location: City */
  $handler->display->display_options['fields']['city']['id'] = 'city';
  $handler->display->display_options['fields']['city']['table'] = 'location';
  $handler->display->display_options['fields']['city']['field'] = 'city';
  $handler->display->display_options['fields']['city']['label'] = '';
  $handler->display->display_options['fields']['city']['element_label_colon'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'company' => 'company',
  );

  /* Display: Entity Reference */
  $handler = $view->new_display('entityreference', 'Entity Reference', 'statement_companies');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'entityreference_style';
  $handler->display->display_options['style_options']['search_fields'] = array(
    'field_company_name' => 'field_company_name',
    'city' => 'city',
  );
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'entityreference_fields';
  $handler->display->display_options['row_options']['separator'] = '–';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $translatables['statement_companies'] = array(
    t('Master'),
    t('more'),
    t('Apply'),
    t('Reset'),
    t('Sort by'),
    t('Asc'),
    t('Desc'),
    t('Items per page'),
    t('- All -'),
    t('Offset'),
    t('« first'),
    t('‹ previous'),
    t('next ›'),
    t('last »'),
    t('Entity Reference'),
  );
  $export['statement_companies'] = $view;

  return $export;
}
