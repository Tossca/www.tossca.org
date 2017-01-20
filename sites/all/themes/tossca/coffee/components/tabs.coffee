module.exports = class Tabs
  constructor: (@selector) ->
    @$tabs = jQuery(@selector)
    @$win = jQuery window
    return unless @$tabs.length

    options =
      hide: 'fade'
      heightStyle: 'auto'
      activate: (event, ui) =>
        _hash = ui.newTab.context.hash.replace('-target', '')
        window.location.hash = _hash

    if window.location.hash?
      @$target = jQuery('a[href="' + window.location.hash + '-target"]').parent()
      if @$target.length
        options.active = @$target.index()

    @$tabs.tabs(options)
    @$win.resize()