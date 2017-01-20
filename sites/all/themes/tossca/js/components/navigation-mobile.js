var NavigationMobile, NavigationMobileWatcher;

NavigationMobile = (function() {
  function NavigationMobile($wrapper) {
    this.$wrapper = $wrapper;
    if (!this.$wrapper.length) {
      return;
    }
    this.active = false;
    this.$body = jQuery('body');
    this.$win = jQuery(window);
    this.$trigger = jQuery('#navigation--mobile-trigger');
    this.$navigation = jQuery('#navigation--mobile-content');
    this.$trigger.on('click.navigationMobile', (function(_this) {
      return function(event) {
        event.preventDefault();
        _this.active = !_this.active;
        return _this.$body.toggleClass('navigation--mobile-active', _this.active);
      };
    })(this));
    this.$win.on('resize.navigationMobile', (function(_this) {
      return function(event) {
        var _viewport;
        _viewport = Drupal.viewPort();
        return _this.$navigation.height(_viewport[1] - 50);
      };
    })(this));
    this.$win.trigger('resize.navigationMobile');
  }

  NavigationMobile.prototype.destroy = function() {
    this.$win.off('resize.navigationMobile');
    this.$trigger.off('click.navigationMobile');
    this.$navigation.height('auto');
    return this.active = this.$body = this.$win = this.$trigger = this.$navigation = null;
  };

  return NavigationMobile;

})();

module.exports = NavigationMobileWatcher = (function() {
  function NavigationMobileWatcher(selector) {
    this.selector = selector;
    this.instances = [];
    this.elements = jQuery(this.selector);
    Breakpoints.on({
      name: 'TO_MOBILE_BREAKPOINT',
      matched: (function(_this) {
        return function() {
          return _this.matched_mobile.apply(_this, arguments);
        };
      })(this),
      exit: (function(_this) {
        return function() {
          return _this.exit_mobile.apply(_this, arguments);
        };
      })(this)
    });
  }

  NavigationMobileWatcher.prototype.matched_mobile = function() {
    return this.elements.each((function(_this) {
      return function(index, element) {
        return _this.instances[index] = new NavigationMobile(jQuery(element));
      };
    })(this));
  };

  NavigationMobileWatcher.prototype.exit_mobile = function() {
    var i, index, instance, len, ref;
    if (!this.instances.length) {
      return;
    }
    ref = this.instances;
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      instance = ref[index];
      instance.destroy();
    }
    return this.instances = [];
  };

  return NavigationMobileWatcher;

})();
