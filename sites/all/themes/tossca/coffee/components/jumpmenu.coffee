Waypoints = require '../../../../../../bower_components/waypoints/lib/noframework.waypoints.js'
WaypointsSticky = require '../../../../../../bower_components/waypoints/lib/shortcuts/sticky.js'

module.exports = class Jumpmenu
  constructor: (@selector) ->
    @$wrapper = jQuery @selector
    @$jumpmenu = @$wrapper.find 'ul'
    @$header = jQuery '#header'
    @$anchors = jQuery '.jumpmenu--anchor'
    @offset_jumpmenu = 80
    return unless @$anchors.length

    # _viewport = Drupal.viewPort()
    # if _viewport[0] < 560
    #   @$offset_jumpmenu = 50

    @$anchors.each (index, _anchor) =>
      $anchor = jQuery _anchor
      $template = jQuery '<li></li>'
      $link = jQuery '<a href="#' + $anchor.data('id') + '">' + $anchor.data('title') + '</a>'
      @$jumpmenu.append($template.append($link))

      $target = jQuery($link[0].hash + '-target')
      if $target.length
        $link.on 'touchstart click', (event) =>
          event.preventDefault()
          @scrollTo($target)


    _sticky = new Waypoint.Sticky
      element: @$wrapper[0]
      stuckClass: 'jumpmenu__sticky'
      offset: @offset_jumpmenu


  scrollTo: ($target, duration = 450) =>
    @threshold = @$header.outerHeight() + @$jumpmenu.outerHeight()
      
    jQuery('html, body').stop().animate
      'scrollTop': $target.offset().top - @threshold
    , duration