<?php 
  
  if (!empty($element['#entity_type']) && $element['#entity_type'] == 'node' && $element['#panelizer_entity_id']) {    
    $attributes .= ' id="node-' . $element['#panelizer_entity_id'] . '" ';
  }

?>
<div class="<?php print $classes; ?>"<?php print $attributes; ?>>
  <?php print render($title_prefix); ?>
  <!-- panelizer-view-mode.tpl.php

  <?php if (!empty($title)): ?>
    <<?php print $title_element;?> <?php print $title_attributes; ?> class="panelizer-view-mode-title">
      <?php if (!empty($entity_url)): ?>
        <a href="<?php print $entity_url; ?>"><?php print $title; ?></a>
      <?php else: ?>
        <?php print $title; ?>
      <?php endif; ?>
    </<?php print $title_element;?>>
  <?php endif; ?>
   -->
  <?php print render($title_suffix); ?>
  <?php print $content; ?>  
</div>