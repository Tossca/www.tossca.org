var Scroll, ScrollWatcher;

Scroll = (function() {
  function Scroll(selector) {
    this.selector = selector;
    this.$wrappers = jQuery(this.selector);
    this.$win = jQuery(window);
    this.$wrappers.each((function(_this) {
      return function(index, element) {
        _this.$wrapper = jQuery(element);
        return _this.$wrapper.once('scroll', function() {
          _this.$scroll = _this.$wrapper.find('.scroll');
          _this.$inner = _this.$scroll.find(">:first-child");
          _this.$trigger = _this.$wrapper.find('.scroll--trigger');
          _this.$triggerUp = _this.$wrapper.find('.scroll--trigger-up');
          _this.$triggerDown = _this.$wrapper.find('.scroll--trigger-down');
          _this.scrollHeight = 0;
          _this.innerHeight = 0;
          _this.maxScroll = 0;
          _this.reachedTop = false;
          _this.reachedBottom = false;
          _this.isEnabled = true;
          _this.lockedUp = false;
          _this.lockedDown = false;
          _this.$scroll.on('scroll', function(event) {
            if (!_this.isEnabled) {
              return;
            }
            return _this._onScroll();
          });
          _this.$triggerDown.on('touchstart click', function(event) {
            var _pos, _scrollDelta;
            event.preventDefault();
            if (_this.reachedBottom) {
              return false;
            }
            _pos = _this.$inner.position();
            _scrollDelta = _this.innerHeight - _this.scrollHeight;
            if (_scrollDelta > _this.scrollHeight) {
              _scrollDelta = _this.scrollHeight - 24;
            }
            if (!_this.lockedDown) {
              _this.lockedDown = true;
              return _this.$scroll.stop().animate({
                'scrollTop': Math.abs(_pos.top - _scrollDelta)
              }, 600, function() {
                return this.lockedDown = false;
              });
            }
          });
          _this.$triggerUp.on('touchstart click', function(event) {
            var _pos, _scrollDelta;
            event.preventDefault();
            if (_this.reachedTop) {
              return false;
            }
            _pos = _this.$inner.position();
            _scrollDelta = _this.innerHeight - _this.scrollHeight;
            if (_scrollDelta > _this.scrollHeight) {
              _scrollDelta = _this.scrollHeight - 24;
            }
            if (!_this.lockedUp) {
              _this.lockedUp = true;
              return _this.$scroll.stop().animate({
                'scrollTop': Math.abs(_pos.top + _scrollDelta)
              }, 600, function() {
                return this.lockedUp = false;
              });
            }
          });
          _this.$win.on('resize', function(event) {
            _this.scrollHeight = _this.$scroll.outerHeight();
            _this.innerHeight = _this.$inner.outerHeight();
            _this.maxScroll = _this.scrollHeight - _this.innerHeight;
            if (_this.scrollHeight > _this.innerHeight) {
              _this.isEnabled = false;
              _this.$trigger.removeClass('is-enabled');
            } else {
              _this.isEnabled = true;
              _this.$trigger.addClass('is-enabled');
            }
            return _this.$scroll.trigger('scroll');
          });
          return _this.$wrapper.imagesLoaded(function() {
            _this.$scroll.trigger('scroll');
            return _this.$win.trigger('resize');
          });
        });
      };
    })(this));
  }

  Scroll.prototype._onScroll = function() {
    return this._requestTick();
  };

  Scroll.prototype._requestTick = function() {
    var _update;
    _update = (function(_this) {
      return function() {
        var _pos;
        _this.ticking = false;
        _pos = _this.$inner.position();
        if (_pos.top === 0) {
          _this.$wrapper.addClass('has-reached-top');
          _this.reachedTop = true;
        } else if (_this.reachedTop) {
          _this.$wrapper.removeClass('has-reached-top');
          _this.reachedTop = false;
        }
        if (_pos.top === _this.maxScroll) {
          _this.$wrapper.addClass('has-reached-bottom');
          return _this.reachedBottom = true;
        } else if (_this.reachedBottom) {
          _this.$wrapper.removeClass('has-reached-bottom');
          return _this.reachedBottom = false;
        }
      };
    })(this);
    if (!this.ticking) {
      requestAnimationFrame(_update);
    }
    return this.ticking = true;
  };

  return Scroll;

})();

module.exports = ScrollWatcher = (function() {
  function ScrollWatcher(selector) {
    this.selector = selector;
    this.elements = jQuery(this.selector);
    this.elements.each((function(_this) {
      return function(index, element) {
        var $element, _dataScroll;
        $element = jQuery(element);
        _dataScroll = $element.data('scroll');
        if (_dataScroll === 'all-devices') {
          return new Scroll(element);
        }
      };
    })(this));
    this.instancesTablet = [];
    this.elementsTablet = jQuery(this.selector);
    Breakpoints.on({
      name: 'FROM_MOBILE_BREAKPOINT',
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
    this.instancesMobile = [];
    this.elementsMobile = jQuery(this.selector);
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

  ScrollWatcher.prototype.matched_tablet = function() {
    return this.elementsTablet.each((function(_this) {
      return function(index, element) {
        var $element, _dataScroll;
        $element = jQuery(element);
        _dataScroll = $element.data('scroll');
        if (_dataScroll === 'mobile-only') {
          return;
        }
        return _this.instancesTablet[index] = new Scroll(element);
      };
    })(this));
  };

  ScrollWatcher.prototype.exit_tablet = function() {
    if (!this.instancesTablet.length) {
      return;
    }
    return this.instancesTablet = [];
  };

  ScrollWatcher.prototype.matched_mobile = function() {
    return this.elementsMobile.each((function(_this) {
      return function(index, element) {
        var $element, _dataScroll;
        $element = jQuery(element);
        _dataScroll = $element.data('scroll');
        if (_dataScroll === 'mobile-only') {
          return _this.instancesMobile[index] = new Scroll(element);
        }
      };
    })(this));
  };

  ScrollWatcher.prototype.exit_mobile = function() {
    if (!this.instancesMobile.length) {
      return;
    }
    return this.instancesMobile = [];
  };

  return ScrollWatcher;

})();
