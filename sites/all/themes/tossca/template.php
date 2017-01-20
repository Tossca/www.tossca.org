<?php

function tossca_preprocess(&$vars) {
  static $theme_path;
  if (!$theme_path) {
    $theme_path = url(drupal_get_path('theme', 'tossca'), array('absolute' => true,'language' => (object)array('language' =>NULL)));
  }

  drupal_add_js(array('theme_path' => $theme_path), 'setting');
  $vars['theme_path'] = $theme_path;
}


function tossca_preprocess_page(&$vars) {  
  global $language;
  global $conf;

  // Logo
  $vars['header_logo'] = array(
    '#theme' => 'link',
    '#path' => '<front>',
    '#text' => 'tossca.org',
    '#options' => array(
      'html' => TRUE,
      'attributes' => array(
        'class' => array('header--logo'),
      ),
    ),
  );

  if (!empty($conf['tossca_path_downloads'][$language->language])) {
    $vars['header_downloads_link'] = array(
      '#theme' => 'link',
      '#text' => '<span class="button--content">' . t('Start now') . '</span>',
      '#path' => $conf['tossca_path_downloads'][$language->language],
      '#options' => array(
        'html' => TRUE,
        'attributes' => array(
          'class' => array('header--downloads'),
        ),
      ),
    );
  }
}


function tossca_preprocess_node(&$vars) {
  // damit wir kein isset in templates brauchen
  $vars['theme_title_suffix'] = '';
  
  if (!user_access('access contextual links')) {
    return;
  }

  if (!$vars['type'] != 'full') {
    $vars['classes_array'][] = 'contextual-links-region';

    $element = element_info('contextual_links');
    $element['#contextual_links'] = array('node' => array(
      'node',
      array($vars['node']->nid)
      )
    );
    
    $vars['theme_title_suffix'] = drupal_render($element);
    
  }
}


/**
 * Implements hook_css_alter().
 */
function tossca_css_alter(&$css) {
  foreach ($css as $key => $value) {
    
    if (strpos($value['data'], 'contextual') !== FALSE) {
      continue;
    }
    if (strpos($value['data'], 'admin_menu') !== FALSE) {
      continue;
    }

    if (strpos($value['data'], 'bower') !== FALSE) {
      continue;
    }

    if (strpos($value['data'], 'tossca') === FALSE) {
      $exclude[$key] = FALSE;
      continue;
    }
  }

  $css = array_diff_key($css, $exclude);
}

function tossca_field($variables) {
  $output = '';
  foreach ($variables['items'] as $delta => $item) {
    $output .= drupal_render($item);
  }
  return $output;
}

function tossca_button($variables) {
  $element = $variables['element'];
  $element['#attributes']['type'] = 'submit';
  element_set_attributes($element, array('id', 'name', 'value'));

  $element['#attributes']['class'][] = 'form-' . $element['#button_type'];
  if (!empty($element['#attributes']['disabled'])) {
    $element['#attributes']['class'][] = 'form-button-disabled';
  }

  return '<button' . drupal_attributes($element['#attributes']) . '><span class="button--content">' . $element['#attributes']['value'] . '</span></button>';
}

function tossca_image($variables) {
  $attributes = $variables['attributes'];
  $attributes['src'] = file_create_url($variables['path']);

  foreach (array('width', 'height', 'alt', 'title') as $key) {
    if (isset($variables[$key])) {
      $attributes[$key] = $variables[$key];
    }
  }

  return '<img' . drupal_attributes($attributes) . ' />';
}

// function tossca_file_link($variables) {
//   $file = $variables['file'];
//   $url = file_create_url($file->uri);

//   // Human-readable names, for use as text-alternatives to icons.
//   $mime_name = array(
//     'application/msword' => 'DOC',
//     'application/vnd.ms-excel' => 'XLS',
//     'application/vnd.ms-powerpoint' => 'PPT',
//     'application/pdf' => 'PDF',
//     'video/quicktime' => 'MOV',
//     'audio/mpeg' => 'MPEG',
//     'audio/wav' => 'WAVE',
//     'image/jpeg' => 'Bild',
//     'image/png' => 'Bild',
//     'image/gif' => 'Bild',
//     'application/zip' => 'ZIP',
//     'application/octet-stream' => 'Datei',
//   );

//   $mimetype = file_get_mimetype($file->uri);

//   // Set options as per anchor format described at
//   // http://microformats.org/wiki/file-format-examples
//   $options = array(
//     'attributes' => array(
//       'type' => $file->filemime . '; length=' . $file->filesize,
//     ),
//   );

//   $link_text = $mime_name[$file->filemime] . ' herunterladen';

//   // Use the description as the link text if available.
//   if (empty($file->description)) {
//     // $link_text = $file->filename;
//     $file_name = $file->filename;
//   }
//   else {
//     // $link_text = $file->description;
//     $file_name = $file->description;
//     $options['attributes']['title'] = check_plain($file->filename);
//     $options['attributes']['target'] = '_blank';
//   }

//   $options['attributes']['class'][] = 'editor--link__emphasized';
//   return '<div class="content--file-link"><strong>' . $file_name . '</strong><br />' . l($link_text, $url, $options) . '</div>';
// }



function tossca_form_element($variables) {
  $element = &$variables['element'];

  // This function is invoked as theme wrapper, but the rendered form element
  // may not necessarily have been processed by form_builder().
  $element += array(
    '#title_display' => 'before',
  );

  
  // Add element #id for #type 'item'.
  if (isset($element['#markup']) && !empty($element['#id'])) {
    $attributes['id'] = $element['#id'];
  }
  
  // Add element's #type and #name as class to aid with JS/CSS selectors.
  $attributes['class'] = array('form-item');

  if (!empty($element['#type'])) {
    $attributes['class'][] = 'form-type-' . strtr($element['#type'], '_', '-');
  }
  if (!empty($element['#name'])) {
    $attributes['class'][] = 'form-item-' . strtr($element['#name'], array(' ' => '-', '_' => '-', '[' => '-', ']' => ''));
  }
  // Add a class for disabled elements to facilitate cross-browser styling.
  if (!empty($element['#attributes']['disabled'])) {
    $attributes['class'][] = 'form-disabled';
  }
  

  // Add error class to form-item wrapper
  if ($error = form_get_error($element)) {
    if (!empty($_SESSION['messages']['error'])) {
      foreach ($_SESSION['messages']['error'] as $key => $value) {
        if ($error == $value) {
          unset($_SESSION['messages']['error'][$key]);
        }
      }
      if (!count($_SESSION['messages']['error'])) {
        unset($_SESSION['messages']['error']);
      }
    }
    $attributes['class'][] = 'form-item-error';
  }

  if (!empty($element['#description'])) {
    $attributes['class'][] = 'info--wrapper';
  }

  $output = '<div' . drupal_attributes($attributes) . '>' . "\n";

  // If #title is not set, we don't display any label or required marker.
  if (!isset($element['#title'])) {
    $element['#title_display'] = 'none';
  }

  $prefix = isset($element['#field_prefix']) ? '<span class="field-prefix">' . $element['#field_prefix'] . '</span> ' : '';
  $suffix = isset($element['#field_suffix']) ? ' <span class="field-suffix">' . $element['#field_suffix'] . '</span>' : '';

  switch ($element['#title_display']) {
    case 'before':
    case 'invisible':
      $output .= ' ' . theme('form_element_label', $variables);
      $output .= ' ' . $prefix . $element['#children'] . $suffix . "\n";
      break;

    case 'after':
      $output .= ' ' . $prefix . $element['#children'] . $suffix;
      $output .= ' ' . theme('form_element_label', $variables) . "\n";
      break;

    case 'none':
    case 'attribute':
      // Output no label and no required marker, only the children.
      $output .= ' ' . $prefix . $element['#children'] . $suffix . "\n";
      break;
  }

  if (!empty($element['#description'])) {
    $output .= '<div class="info js--info"><div class="info--content">' . $element['#description'] . "</div></div>\n";
  }

  if (!empty($error)) {
    $output .= '<div class="form-item-error-message">' . $error .' </div>';
  }

  $output .= "</div>\n";

  return $output;
}

function tossca_form_element_label($variables) {
  $element = $variables['element'];
  // This is also used in the installer, pre-database setup.
  $t = get_t();


  // If title and required marker are both empty, output no label.
  if ((!isset($element['#title']) || $element['#title'] === '') && empty($element['#required'])) {
    return '';
  }


  // If the element is required, a required marker is appended to the label.
  $required = (!empty($element['#required']) || !empty($element['#custom_required'])) ? theme('form_required_marker', array('element' => $element)) : '';

  $title = filter_xss_admin($element['#title']);

  $attributes = array();
  // Style the label as class option to display inline with the element.
  if ($element['#title_display'] == 'after') {
    $attributes['class'] = 'option';
  }
  // Show label only to screen readers to avoid disruption in visual flows.
  elseif ($element['#title_display'] == 'invisible') {
    $attributes['class'] = 'element-invisible';
  }

  if (!empty($element['#id'])) {
    $attributes['for'] = $element['#id'];
  }
  // The leading whitespace helps visually separate fields from inline labels.
  return ' <label' . drupal_attributes($attributes) . '>' . $t('!title !required', array('!title' => $title, '!required' => $required)) . "</label>\n";
}

/**
 * Implementation of hook_form_FORM_ID_alter().
 */
function tossca_form_user_login_alter(&$form, &$form_state) {
  $form['#attributes']['class'][] = 'form--label__inline';
}