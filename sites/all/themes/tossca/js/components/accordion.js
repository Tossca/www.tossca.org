var Accordion;

module.exports = Accordion = (function() {
  function Accordion(selector) {
    this.selector = selector;
    this.$accordions = jQuery(this.selector);
    if (!this.$accordions.length) {
      return;
    }
    this.$accordions.each((function(_this) {
      return function(index, element) {
        var $accordion, $items, _options;
        $accordion = jQuery(element);
        $items = $accordion.find('.accordion--item');
        _options = {
          heightStyle: "content",
          collapsible: true,
          active: true,
          animate: 100
        };
        if ($accordion.data('collapse')) {
          _options.active = false;
        }
        return $accordion.accordion(_options);
      };
    })(this));
  }

  return Accordion;

})();
