class NavigationMobile
  constructor: (@$wrapper) ->
    return unless @$wrapper.length

    @active = false
    
    @$body = jQuery 'body'
    @$win = jQuery window
    @$trigger = jQuery '#navigation--mobile-trigger'
    @$navigation = jQuery '#navigation--mobile-content'

    @$trigger.on 'click.navigationMobile', (event) =>
      event.preventDefault()
      @active = !@active
      @$body.toggleClass 'navigation--mobile-active', @active

    @$win.on 'resize.navigationMobile', (event) =>
      _viewport = Drupal.viewPort()
      @$navigation.height(_viewport[1] - 50)

    @$win.trigger 'resize.navigationMobile'

  destroy: ->
    @$win.off 'resize.navigationMobile'
    @$trigger.off 'click.navigationMobile'
    @$navigation.height 'auto'
    @active = @$body = @$win = @$trigger = @$navigation = null



module.exports = class NavigationMobileWatcher
  constructor: (@selector) ->
    @instances = []
    @elements = jQuery @selector

    Breakpoints.on
      name: 'TO_MOBILE_BREAKPOINT'
      matched: => @matched_mobile.apply(@, arguments)
      exit: => @exit_mobile.apply(@, arguments)

  matched_mobile: ->
    @elements.each (index, element) =>
      @instances[index] = new NavigationMobile jQuery(element)

  exit_mobile: ->
    return unless @instances.length
    for instance, index in @instances
      instance.destroy()
    @instances = []