var Example, ExampleWatcher;

Example = (function() {
  function Example($element) {
    this.$element = $element;
    console.log(this.$element);
  }

  Example.prototype.destroy = function() {
    return this.$element = null;
  };

  return Example;

})();

module.exports = ExampleWatcher = (function() {
  function ExampleWatcher(selector) {
    this.selector = selector;
    this.instances = [];
    this.elements = jQuery(this.selector);
    console.log(this.elements);
    Breakpoints.on({
      name: 'TO_TABLET_BREAKPOINT',
      matched: (function(_this) {
        return function() {
          return _this.matched_tablet.apply(_this, arguments);
        };
      })(this),
      exit: (function(_this) {
        return function() {
          return _this.exit_tablet.apply(_this, arguments);
        };
      })(this)
    });
  }

  ExampleWatcher.prototype.matched_tablet = function() {
    console.log('matched_mobile');
    return this.elements.each((function(_this) {
      return function(index, element) {
        return _this.instances[index] = new Example(jQuery(element));
      };
    })(this));
  };

  ExampleWatcher.prototype.exit_tablet = function() {
    var i, index, instance, len, ref;
    console.log('exit_mobile');
    if (!this.instances.length) {
      return;
    }
    ref = this.instances;
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      instance = ref[index];
      console.log(instance, 'destroy');
      instance.destroy();
    }
    return this.instances = [];
  };

  return ExampleWatcher;

})();
