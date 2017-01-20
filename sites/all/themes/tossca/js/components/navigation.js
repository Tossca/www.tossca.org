var Navigation,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

module.exports = Navigation = (function() {
  function Navigation(selector) {
    var $anchors, ref;
    this.selector = selector;
    this.scrollTo = bind(this.scrollTo, this);
    this.$navigation = jQuery(this.selector);
    if (((ref = Drupal.settings.page_feature) != null ? ref.anchors : void 0) == null) {
      return;
    }
    $anchors = jQuery(Drupal.settings.page_feature.anchors);
    this.$header_logo = jQuery('.header--logo');
    $anchors.each((function(_this) {
      return function(index, _anchor) {
        var $link, $target, $template;
        $template = jQuery('<li></li>');
        $link = jQuery('<a href="#' + _anchor.anchor + '">' + _anchor.title + '</a>');
        _this.$navigation.append($template.append($link));
        $target = jQuery($link[0].hash + '-target');
        if ($target.length) {
          return $link.on('touchstart click', function(event) {
            event.preventDefault();
            return _this.scrollTo($target);
          });
        }
      };
    })(this));
    jQuery('.hero--hint').on('touchstart click', (function(_this) {
      return function(event) {
        event.preventDefault();
        return _this.scrollTo(jQuery('.jump-menu--anchor').eq(0));
      };
    })(this));
  }

  Navigation.prototype.scrollTo = function($target, duration) {
    var _viewport;
    if (duration == null) {
      duration = 450;
    }
    this.threshold = 76;
    _viewport = Drupal.viewPort();
    if (_viewport[0] < 516) {
      this.threshold = 66;
    }
    return jQuery('html, body').stop().animate({
      'scrollTop': $target.offset().top - this.threshold
    }, duration);
  };

  return Navigation;

})();
