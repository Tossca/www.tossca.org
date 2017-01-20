module.exports = class Accordion
  constructor: (@selector) ->
    @$accordions = jQuery(@selector)
    return unless @$accordions.length

    @$accordions.each (index, element) =>
      $accordion = jQuery element
      $items = $accordion.find '.accordion--item'
      _options = 
        heightStyle: "content"
        collapsible: true
        active: true
        animate: 100
      
      if $accordion.data 'collapse'
        _options.active = false
        

      # if $items.length > 1
      $accordion.accordion _options