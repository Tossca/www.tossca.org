var Modernizr, ProjectOverview, ProjectOverviewWatcher, _;

Modernizr = require('../modernizr');

_ = require('../../../../../../bower_components/underscore/underscore.js');

ProjectOverview = (function() {
  function ProjectOverview(selector) {
    this.selector = selector;
    this.$wrapper = jQuery(this.selector);
    if (!this.$wrapper.length) {
      return;
    }
    this.$outerWrapper = this.$wrapper.parents('.base--content-1');
    this.$overviewItems = this.$wrapper.find('.project--overview-item');
    this.$overviewTrigger = this.$wrapper.find('.project--trigger');
    this.$overviewTriggerPrev = this.$wrapper.find('.project--trigger-prev');
    this.$overviewTriggerNext = this.$wrapper.find('.project--trigger-next');
    this.overviewCurrentIndex = 0;
    this.overviewDirection = null;
    this.overviewIsAnimating = false;
    this.overviewWheelLocked = false;
    this.overviewSwiping = false;
    this.initOverview();
    this.$detailLinks = this.$wrapper.find('.project--link');
    this.$detailWrapper = jQuery('#project--detail');
    this.$detailTarget = jQuery('#project--detail-target');
    this.$detailClose = jQuery('.js--project-back');
    this.detailCache = {};
    this.detailCurrent = null;
    this.initDetailView();
  }

  ProjectOverview.prototype.initOverview = function() {
    var _supportedWheelEvent;
    this.$overviewItems.each((function(_this) {
      return function(index, element) {
        return _this.$overviewItems.eq(index).data('classList', _this.$overviewItems.eq(index).attr('class'));
      };
    })(this));
    this.$overviewItems.eq(0).addClass('is-current');
    this.updateOverviewTrigger();
    this.$overviewTriggerPrev.on('touchstart click', (function(_this) {
      return function(event) {
        event.preventDefault();
        if (_this.overviewIsAnimating) {
          return;
        }
        _this.overviewDirection = 'down';
        return _this.overviewAnimate();
      };
    })(this));
    this.$overviewTriggerNext.on('touchstart click', (function(_this) {
      return function(event) {
        event.preventDefault();
        if (_this.overviewIsAnimating) {
          return;
        }
        _this.overviewDirection = 'up';
        return _this.overviewAnimate();
      };
    })(this));
    if (!Modernizr.touchevents) {
      this.handleWheelEventDebounced = _.throttle(this.handleWheelEvent, 100);
      _supportedWheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : document.onmousewheel !== void 0 ? 'mousewheel' : 'DOMMouseScroll';
      this.$wrapper.on(_supportedWheelEvent, (function(_this) {
        return function(event) {
          event.preventDefault();
          if (_this.overviewWheelLocked) {
            return;
          }
          return _this.handleWheelEventDebounced(event);
        };
      })(this));
    }
    if (Modernizr.touchevents) {
      return this.$wrapper.on('swipe', (function(_this) {
        return function(event) {
          _this.overviewSwiping = true;
          if (event.direction === 'up') {
            _this.$overviewTriggerNext.trigger('click');
          }
          if (event.direction === 'down') {
            return _this.$overviewTriggerPrev.trigger('click');
          }
        };
      })(this));
    }
  };

  ProjectOverview.prototype.handleWheelEvent = function(event) {
    if (event.originalEvent.deltaY < 0) {
      return this.$overviewTriggerPrev.trigger('click');
    } else if (event.originalEvent.deltaY > 0) {
      return this.$overviewTriggerNext.trigger('click');
    }
  };

  ProjectOverview.prototype.overviewAnimate = function(_nextIndex) {
    var $current, $next;
    if (this.overviewIsAnimating) {
      return;
    }
    $current = this.$overviewItems.eq(this.overviewCurrentIndex);
    if (this.overviewDirection === 'down') {
      if (this.overviewCurrentIndex <= 0) {
        return false;
      }
      $next = this.$overviewItems.eq(this.overviewCurrentIndex - 1).addClass('is-next');
    } else if (this.overviewDirection === 'up') {
      if (this.overviewCurrentIndex >= this.$overviewItems.length - 1) {
        return;
      }
      $next = this.$overviewItems.eq(this.overviewCurrentIndex + 1).addClass('is-next');
    }
    if (_nextIndex != null) {
      $next = this.$overviewItems.eq(_nextIndex).addClass('is-next');
      this.overviewDirection = 'up';
      if (_nextIndex < this.overviewCurrentIndex) {
        this.overviewDirection = 'down';
      }
    }
    if (this.$overviewItems.index($current) !== this.$overviewItems.index($next)) {
      this.overviewIsAnimating = true;
      this.overviewWheelLocked = true;
      $current.addClass('animate--out__' + this.overviewDirection);
      $next.addClass('animate--in__' + this.overviewDirection);
      this.$detailWrapper.trigger('project:close');
      return this.$wrapper.one('animationend oAnimationEnd MSAnimationEnd', (function(_this) {
        return function(event) {
          return _this.overviewAnimateOnEnd();
        };
      })(this));
    }
  };

  ProjectOverview.prototype.overviewAnimateOnEnd = function() {
    var $current, $next;
    $current = this.$overviewItems.eq(this.overviewCurrentIndex);
    $next = jQuery('.is-next');
    $current.attr('class', $current.data('classList'));
    $next.attr('class', $next.data('classList'));
    $next.addClass('is-current');
    this.overviewCurrentIndex = this.$overviewItems.index($next);
    this.updateOverviewTrigger();
    return setTimeout((function(_this) {
      return function() {
        _this.overviewIsAnimating = false;
        _this.overviewWheelLocked = false;
        return _this.overviewSwiping = false;
      };
    })(this), 300);
  };

  ProjectOverview.prototype.updateOverviewTrigger = function() {
    this.$outerWrapper.removeClass('base__inverted');
    this.$outerWrapper.addClass(this.$overviewItems.eq(this.overviewCurrentIndex).find('.project--link').data('bg'));
    if (this.overviewCurrentIndex === 0) {
      this.$wrapper.addClass('has-reached-first');
    } else {
      this.$wrapper.removeClass('has-reached-first');
    }
    if (this.overviewCurrentIndex === this.$overviewItems.length - 1) {
      return this.$wrapper.addClass('has-reached-last');
    } else {
      return this.$wrapper.removeClass('has-reached-last');
    }
  };

  ProjectOverview.prototype.initDetailView = function() {
    var $parentOverviewItem, $target;
    this.$detailLinks.each((function(_this) {
      return function(index, element) {
        var $link, _id, _url;
        $link = jQuery(element);
        _id = $link[0].id;
        _url = $link[0].href;
        _this.detailCache[_id] = {
          url: _url,
          detailHtml: null,
          hash: null
        };
        $link.on('touchend click', function(event) {
          event.preventDefault();
          if (_this.detailCurrent === _id) {
            return;
          }
          if (_this.detailCache[_id].url) {
            _this.$detailWrapper.removeClass('is-active');
            _this.$outerWrapper.addClass('is-visible');
            setTimeout(function() {
              if (_this.detailCache[_id].detailHtml) {
                _this.$detailWrapper.addClass('is-active');
                _this.$detailTarget.html(_this.detailCache[_id].detailHtml);
                return Drupal.attachBehaviors();
              } else {
                return _this.$detailTarget.load(_this.detailCache[_id].url + ' #main--wrapper .content', function() {
                  _this.$detailWrapper.addClass('is-active');
                  _this.detailCache[_id].detailHtml = _this.$detailTarget.html();
                  return Drupal.attachBehaviors();
                });
              }
            }, 10);
            _this.detailCurrent = _id;
            return window.location.hash = _id;
          }
        });
        _this.$detailClose.on('touchstart click', function(event) {
          event.preventDefault();
          return _this.$detailWrapper.trigger('project:close');
        });
        return _this.$detailWrapper.on('project:close', function(event) {
          _this.$detailWrapper.removeClass('is-active');
          _this.$outerWrapper.removeClass('is-visible');
          _this.detailCurrent = null;
          return window.location.hash = '';
        });
      };
    })(this));
    if (window.location.hash) {
      $target = jQuery(window.location.hash);
      if (!$target.length) {
        return;
      }
      $parentOverviewItem = $target.parents('.project--overview-item');
      return setTimeout((function(_this) {
        return function() {
          $target.trigger('click');
          _this.overviewAnimate(_this.$overviewItems.index($parentOverviewItem));
          return _this.updateOverviewTrigger();
        };
      })(this), 600);
    }
  };

  return ProjectOverview;

})();

module.exports = ProjectOverviewWatcher = (function() {
  function ProjectOverviewWatcher(selector) {
    this.selector = selector;
    this.instances = [];
    this.elements = jQuery(this.selector);
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
  }

  ProjectOverviewWatcher.prototype.matched_tablet = function() {
    return this.elements.each((function(_this) {
      return function(index, element) {
        return _this.instances[index] = new ProjectOverview(jQuery(element));
      };
    })(this));
  };

  ProjectOverviewWatcher.prototype.exit_tablet = function() {
    if (!this.instances.length) {
      return;
    }
    return this.instances = [];
  };

  return ProjectOverviewWatcher;

})();
