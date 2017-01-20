module.exports = class Roles
  constructor: (@selector) ->
    @$wrapper = jQuery(@selector)
    return unless @$wrapper

    _ids = ['#init-company', '#governance', '#license', '#contrib-company', '#individual']
    @$tabs = @$wrapper.find '.roles--tabs li'
    @$captions = @$wrapper.find '.roles--caption'
    @current = null

    jQuery(_ids).each (index, _id) =>
      _tl = new TimelineMax()
      _tl
        # .from _id + ' #connection-start,' + _id + ' [data-name=connection-start]', 0.2, {opacity: 0}
        .from _id + '-path', 1, {drawSVG: 0}
        # .from _id + ' #connection-end,' + _id + ' [data-name=connection-end]', 0.2, {opacity: 0, delay: -0.2}
        .pause()

      $element = jQuery _id
      $illustration = $element.find _id + '-illu'
      $element.data('tl', _tl)
      
      $element.on 'click', (event)=>
        @$tabs.removeClass 'ui-state-active'
        $element.trigger 'roles:on'
        if @current? && @current != $element
          @current.trigger 'roles:off'
        @current = $element
    
      $element.on 'roles:on', (event) =>
        $illustration.attr 'class', 'is-active'
        jQuery(@$tabs.find('a[href=' + _id + ']')).parent('li').addClass 'ui-state-active'
        @$captions.filter(_id + '-caption').addClass 'is-active'
        _tl = $element.data 'tl'
        _tl.timeScale(1).play()

      $element.on 'roles:off', (event) =>
        $illustration.attr 'class', ''
        @$captions.filter(_id + '-caption').removeClass 'is-active'
        _tl = $element.data 'tl'
        _tl.timeScale(3).reverse()

    
    @$captions.each (index, _caption) =>
      $caption = jQuery _caption
      $caption.on 'click', (event) =>
        _id = '#' + $caption[0].id.replace('-caption', '')
        $element = jQuery _id
        $element.trigger 'roles:off'


    @$tabs.each (index, _tab) =>
      $tab = jQuery _tab
      $link = $tab.find 'a'
      $link.on 'click', (event) =>
        @$tabs.removeClass 'ui-state-active'
        event.preventDefault()
        if $link[0].hash?
          $tab.addClass 'ui-state-active'
          $element = jQuery $link[0].hash
          $element.trigger 'click'