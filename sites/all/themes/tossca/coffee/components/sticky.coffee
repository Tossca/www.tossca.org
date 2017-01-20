class Sticky
  constructor: (@$wrapper) ->
    @$win = jQuery window
    @$element = @$wrapper.find '.sticky'
    return unless @$element.length

    @$parentElement = @$element.parent()
    @$parentElementWidth = @$parentElement.outerWidth()
    @headerHeight = 70 # .header.is-flat …
    @wrapperTop = @$wrapper.offset().top
    @wrapperHeight = @$wrapper.outerHeight()
    @wrapperBottom = @wrapperTop + @wrapperHeight
    @elementHeight = @$element.outerHeight()
    @$jumpmenu = jQuery '#jumpmenu'
    @$header = jQuery '#header'
    @threshold = 0
    @ticking = false
    @centered = if @$element.data('stickycentered') then @$element.data('stickycentered') else false
    
    @$win.on 'scroll.sticky', (event) =>
      @_onScroll()

    @$win.on 'resize.sticky', (event) =>
      @_onResize()
    
    setTimeout =>
      @_onResize()
    , 400


  _onResize: () ->
    return unless @$wrapper?

    _viewport = Drupal.viewPort()
    @$parentElementWidth = @$parentElement.outerWidth()
    @elementHeight = @$element.outerHeight()
    @wrapperHeight = @$wrapper.outerHeight()
    @wrapperTop = @$wrapper.offset().top
    @wrapperBottom = @wrapperTop + @wrapperHeight
    
    if @centered
      @threshold = (_viewport[1] / 2) - @elementHeight / 2
    else
      @threshold = @$header.outerHeight() + @$jumpmenu.outerHeight() + 50


    @_requestTick()


  _onScroll: () ->
    @_requestTick()

  _requestTick: () ->    
    return unless @$element?
    _update = () =>
      @ticking = false
      _scrollY = (window.scrollY || window.pageYOffset)


      # sticky top
      if _scrollY > @wrapperTop - @threshold
        @$element.css
          position: 'fixed'
          top: @threshold
          width: @$parentElementWidth

        # sticky bottom
        if @wrapperBottom < _scrollY + @elementHeight + @threshold
          _top = @wrapperBottom - (_scrollY + @elementHeight)
          @$element.css
            top: _top
      
      # not sticky
      else if _scrollY < @wrapperTop || @elementHeight >= @wrapperHeight
        @$element.css
          position: 'static'


    if(!@ticking)
      requestAnimationFrame(_update)
    @ticking = true


  destroy: () ->
    @$win.off 'sticky'
    @$win = @$wrapper = @$element = @wrapperTop = @wrapperHeight = @wrapperBottom = @elementHeight = @threshold = @ticking = null



module.exports = class StickyWatcher
  constructor: (@wrapper) ->
    @instances = []
    @$elements = jQuery @wrapper

    Breakpoints.on
      name: 'FROM_MOBILE_BREAKPOINT'
      matched: => @matched_wide.apply(@, arguments)
      exit: => @exit_wide.apply(@, arguments)

    
  matched_wide: ->
    @$elements.each (index, element) =>
      @instances[index] = new Sticky jQuery(element)


  exit_wide: ->
    return unless @instances.length
    for instance, index in @instances
      instance.destroy()
    @instances = []