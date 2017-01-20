var Sticky, StickyWatcher;

Sticky = (function() {
  function Sticky($wrapper) {
    this.$wrapper = $wrapper;
    this.$win = jQuery(window);
    this.$element = this.$wrapper.find('.sticky');
    if (!this.$element.length) {
      return;
    }
    this.$parentElement = this.$element.parent();
    this.$parentElementWidth = this.$parentElement.outerWidth();
    this.headerHeight = 70;
    this.wrapperTop = this.$wrapper.offset().top;
    this.wrapperHeight = this.$wrapper.outerHeight();
    this.wrapperBottom = this.wrapperTop + this.wrapperHeight;
    this.elementHeight = this.$element.outerHeight();
    this.$jumpmenu = jQuery('#jumpmenu');
    this.$header = jQuery('#header');
    this.threshold = 0;
    this.ticking = false;
    this.centered = this.$element.data('stickycentered') ? this.$element.data('stickycentered') : false;
    this.$win.on('scroll.sticky', (function(_this) {
      return function(event) {
        return _this._onScroll();
      };
    })(this));
    this.$win.on('resize.sticky', (function(_this) {
      return function(event) {
        return _this._onResize();
      };
    })(this));
    setTimeout((function(_this) {
      return function() {
        return _this._onResize();
      };
    })(this), 400);
  }

  Sticky.prototype._onResize = function() {
    var _viewport;
    if (this.$wrapper == null) {
      return;
    }
    _viewport = Drupal.viewPort();
    this.$parentElementWidth = this.$parentElement.outerWidth();
    this.elementHeight = this.$element.outerHeight();
    this.wrapperHeight = this.$wrapper.outerHeight();
    this.wrapperTop = this.$wrapper.offset().top;
    this.wrapperBottom = this.wrapperTop + this.wrapperHeight;
    if (this.centered) {
      this.threshold = (_viewport[1] / 2) - this.elementHeight / 2;
    } else {
      this.threshold = this.$header.outerHeight() + this.$jumpmenu.outerHeight() + 50;
    }
    return this._requestTick();
  };

  Sticky.prototype._onScroll = function() {
    return this._requestTick();
  };

  Sticky.prototype._requestTick = function() {
    var _update;
    if (this.$element == null) {
      return;
    }
    _update = (function(_this) {
      return function() {
        var _scrollY, _top;
        _this.ticking = false;
        _scrollY = window.scrollY || window.pageYOffset;
        if (_scrollY > _this.wrapperTop - _this.threshold) {
          _this.$element.css({
            position: 'fixed',
            top: _this.threshold,
            width: _this.$parentElementWidth
          });
          if (_this.wrapperBottom < _scrollY + _this.elementHeight + _this.threshold) {
            _top = _this.wrapperBottom - (_scrollY + _this.elementHeight);
            return _this.$element.css({
              top: _top
            });
          }
        } else if (_scrollY < _this.wrapperTop || _this.elementHeight >= _this.wrapperHeight) {
          return _this.$element.css({
            position: 'static'
          });
        }
      };
    })(this);
    if (!this.ticking) {
      requestAnimationFrame(_update);
    }
    return this.ticking = true;
  };

  Sticky.prototype.destroy = function() {
    this.$win.off('sticky');
    return this.$win = this.$wrapper = this.$element = this.wrapperTop = this.wrapperHeight = this.wrapperBottom = this.elementHeight = this.threshold = this.ticking = null;
  };

  return Sticky;

})();

module.exports = StickyWatcher = (function() {
  function StickyWatcher(wrapper) {
    this.wrapper = wrapper;
    this.instances = [];
    this.$elements = jQuery(this.wrapper);
    Breakpoints.on({
      name: 'FROM_MOBILE_BREAKPOINT',
      matched: (function(_this) {
        return function() {
          return _this.matched_wide.apply(_this, arguments);
        };
      })(this),
      exit: (function(_this) {
        return function() {
          return _this.exit_wide.apply(_this, arguments);
        };
      })(this)
    });
  }

  StickyWatcher.prototype.matched_wide = function() {
    return this.$elements.each((function(_this) {
      return function(index, element) {
        return _this.instances[index] = new Sticky(jQuery(element));
      };
    })(this));
  };

  StickyWatcher.prototype.exit_wide = function() {
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

  return StickyWatcher;

})();
