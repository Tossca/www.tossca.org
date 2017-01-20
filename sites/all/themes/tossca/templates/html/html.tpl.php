<!DOCTYPE html>
<!--[if lt IE 8]>      <html class="no-js ie lt-ie10 lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js ie lt-ie10 lt-ie9"> <![endif]-->
<!--[if IE 9]>         <html class="no-js ie lt-ie10"> <![endif]-->
<!--[if gt IE 9]><!--> <html class="no-js"> <!--<![endif]-->
<head>
  <meta name="format-detection" content="telephone=no" />
  <meta name="viewport" id="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
  <?php print $head; ?>
  <title><?php print $head_title; ?></title>

  <script type="text/javascript">
    var Drupal = Drupal || { 'settings': {}, 'behaviors': {}, 'locale': {} };
  </script>

  <?php print $styles; ?>
   <!--[if (lt IE 10) & (!IEMobile)]>
     <script type="text/javascript">
       Drupal.settings.lt_IE10 = true;
     </script>
   <![endif]-->
</head>

<body class="<?php print $classes; ?>" <?php print $attributes;?>>
  <script type="text/javascript">
    document.getElementsByTagName('html')[0].addClassName = ' js';
  </script>
  <?php print $page; ?>
  <?php print $scripts; ?>
  <?php print $page_bottom; ?>
</body>
</html>