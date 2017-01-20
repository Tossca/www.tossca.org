var Jumpmenu, Waypoints, WaypointsSticky,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Waypoints = require('../../../../../../bower_components/waypoints/lib/noframework.waypoints.js');

WaypointsSticky = require('../../../../../../bower_components/waypoints/lib/shortcuts/sticky.js');

module.exports = Jumpmenu = (function() {
  function Jumpmenu(selector) {
    var _sticky;
    this.selector = selector;
    this.scrollTo = bind(this.scrollTo, this);
    this.$wrapper = jQuery(this.selector);
    this.$jumpmenu = this.$wrapper.find('ul');
    this.$header = jQuery('#header');
    this.$anchors = jQuery('.jumpmenu--anchor');
    this.offset_jumpmenu = 80;
    if (!this.$anchors.length) {
      return;
    }
    this.$anchors.each((function(_this) {
      return function(index, _anchor) {
        var $anchor, $link, $target, $template;
        $anchor = jQuery(_anchor);
        $template = jQuery('<li></li>');
        $link = jQuery('<a href="#' + $anchor.data('id') + '">' + $anchor.data('title') + '</a>');
        _this.$jumpmenu.append($template.append($link));
        $target = jQuery($link[0].hash + '-target');
        if ($target.length) {
          return $link.on('touchstart click', function(event) {
            event.preventDefault();
            return _this.scrollTo($target);
          });
        }
      };
    })(this));
    _sticky = new Waypoint.Sticky({
      element: this.$wrapper[0],
      stuckClass: 'jumpmenu__sticky',
      offset: this.offset_jumpmenu
    });
  }

  Jumpmenu.prototype.scrollTo = function($target, duration) {
    if (duration == null) {
      duration = 450;
    }
    this.threshold = this.$header.outerHeight() + this.$jumpmenu.outerHeight();
    return jQuery('html, body').stop().animate({
      'scrollTop': $target.offset().top - this.threshold
    }, duration);
  };

  return Jumpmenu;

})();
