var Mobile, MobileWatcher;

Mobile = (function() {
  function Mobile($body) {
    this.$body = $body;
    this.activeClass = 'navigation--mobile-active';
    this.active = false;
    this.$trigger = jQuery('#navigation--mobile-trigger');
    this.$trigger.on('click.mobile', (function(_this) {
      return function(event) {
        return _this._onTriggerClick(event);
      };
    })(this));
    this.$body.on('click.mobile', (function(_this) {
      return function(event) {
        return _this._onBodyClick(event);
      };
    })(this));
  }

  Mobile.prototype._onTriggerClick = function(event) {
    event.preventDefault();
    if (!this.active) {
      event.stopPropagation();
      this.$body.addClass(this.activeClass);
      return this.active = true;
    }
  };

  Mobile.prototype._onBodyClick = function(event) {
    return this._hideNavigation();
  };

  Mobile.prototype._hideNavigation = function() {
    if (this.active) {
      return setTimeout((function(_this) {
        return function() {
          _this.$body.removeClass(_this.activeClass);
          return _this.active = false;
        };
      })(this), 100);
    }
  };

  Mobile.prototype.destroy = function() {
    this.$trigger.off('mobile');
    this.$body.off('mobile');
    return this.$body = this.$trigger = this.activeClass = this.active = null;
  };

  return Mobile;

})();

module.exports = MobileWatcher = (function() {
  function MobileWatcher(selector) {
    this.selector = selector;
    this.instances = [];
    this.$elements = jQuery(this.selector);
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

  MobileWatcher.prototype.matched_mobile = function() {
    return this.$elements.each((function(_this) {
      return function(index, element) {
        return _this.instances[index] = new Mobile(jQuery(element));
      };
    })(this));
  };

  MobileWatcher.prototype.exit_mobile = function() {
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

  return MobileWatcher;

})();
