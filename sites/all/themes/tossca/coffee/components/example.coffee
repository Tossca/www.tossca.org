
class Example
  constructor: (@$element) ->
    console.log @$element

  destroy: () ->
    @$element = null


module.exports = class ExampleWatcher
  constructor: (@selector) ->
    @instances = []
    @elements = jQuery @selector
    console.log @elements

    Breakpoints.on
      name: 'TO_TABLET_BREAKPOINT'
      matched: => @matched_tablet.apply(@, arguments)
      exit: => @exit_tablet.apply(@, arguments)

  matched_tablet: ->
    console.log 'matched_mobile'
    @elements.each (index, element) =>
      @instances[index] = new Example jQuery(element)

  exit_tablet: ->
    console.log 'exit_mobile'
    return unless @instances.length
    for instance, index in @instances
      console.log instance, 'destroy'
      instance.destroy()
    @instances = []