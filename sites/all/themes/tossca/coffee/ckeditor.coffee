if typeof CKEDITOR != 'undefined'

  CKEDITOR.addStylesSet 'drupal',
    [
      {
        name: 'Text klein'
        element: 'p'
        attributes:
          class: 'font-size__s'
      },
      {
        name: 'Text groß'
        element: 'p'
        attributes:
          class: 'font-size__l'
      },
      {
        name: 'Liste liniert'
        element: 'ul'
        attributes:
          class: 'list__lined'
      },
      {
        name: 'Liste Checkboxes'
        element: 'ul'
        attributes:
          class: 'list__checked'
      }
    ]