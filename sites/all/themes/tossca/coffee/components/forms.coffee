Modernizr = require '../modernizr'

module.exports = class Forms
  constructor: () ->
    jQuery('.form-select, .form-radio, .form-checkbox, .form-type-bef-checkbox input').uniform()
    jQuery('.form--label__inline label').inFieldLabels()

    #
    # statement form
    #
    jQuery('#online-statement-node-form').on 'state:visible', (event) ->
      if event.trigger
        if event.value
          setTimeout ->
            jQuery(event.target)
              .closest('.form-item, .form-submit, .form-wrapper')
              .fadeIn(500)
          , 500
        else
          jQuery(event.target)
            .closest('.form-item, .form-submit, .form-wrapper')
            .fadeOut(500)
      event.stopPropagation()
    

    # company addreses
    # .field-name-field-statement-cmpny-governance
    # .field-name-field-statement-cmpny-individual

    _types = ['governance', 'individual']
    for _type in _types
      jQuery('.field-name-field-statement-cmpny-' + _type + ' select')
        .data 'type', _type
        .change (event) ->
          $element = jQuery @
          $target = jQuery('#statement--adress-target__' + $element.data('type'))
          if !isNaN(@.value)
            jQuery.getJSON '/js/online-statement/company/' + @.value + '/address', (data) =>
              if data.success
                $target.empty().html data.data    
          else
            $target.empty()
        .trigger 'change'


    # Info
    @$infos = jQuery('.js--info')
    @$body = jQuery 'body'

    if Modernizr.touchevents
      @$infos.on 'touchstart', (event) =>
        # console.log event
        $info = jQuery event.target
        $info.data 'hover', !$info.data('hover')
        $info.parent('.info--wrapper').toggleClass 'hover', $info.data('hover')
        @$body.toggleClass 'info--is-active', $info.data('hover')
        event.stopPropagation()

      @$body.on 'touchstart', (event) =>
        @$infos.parent('.info--wrapper').removeClass 'hover'
        @$body.removeClass 'info--is-active'

    else
      
      @$infos.hover (event) =>
        $info = jQuery event.target
        $info.parent('.info--wrapper').toggleClass 'hover', event.type == 'mouseenter'
        @$body.toggleClass 'info--is-active', event.type == 'mouseenter'
