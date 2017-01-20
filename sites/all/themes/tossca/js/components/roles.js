var Roles;

module.exports = Roles = (function() {
  function Roles(selector) {
    var _ids;
    this.selector = selector;
    this.$wrapper = jQuery(this.selector);
    if (!this.$wrapper) {
      return;
    }
    _ids = ['#init-company', '#governance', '#license', '#contrib-company', '#individual'];
    this.$tabs = this.$wrapper.find('.roles--tabs li');
    this.$captions = this.$wrapper.find('.roles--caption');
    this.current = null;
    jQuery(_ids).each((function(_this) {
      return function(index, _id) {
        var $element, $illustration, _tl;
        _tl = new TimelineMax();
        _tl.from(_id + '-path', 1, {
          drawSVG: 0
        }).pause();
        $element = jQuery(_id);
        $illustration = $element.find(_id + '-illu');
        $element.data('tl', _tl);
        $element.on('click', function(event) {
          _this.$tabs.removeClass('ui-state-active');
          $element.trigger('roles:on');
          if ((_this.current != null) && _this.current !== $element) {
            _this.current.trigger('roles:off');
          }
          return _this.current = $element;
        });
        $element.on('roles:on', function(event) {
          $illustration.attr('class', 'is-active');
          jQuery(_this.$tabs.find('a[href=' + _id + ']')).parent('li').addClass('ui-state-active');
          _this.$captions.filter(_id + '-caption').addClass('is-active');
          _tl = $element.data('tl');
          return _tl.timeScale(1).play();
        });
        return $element.on('roles:off', function(event) {
          $illustration.attr('class', '');
          _this.$captions.filter(_id + '-caption').removeClass('is-active');
          _tl = $element.data('tl');
          return _tl.timeScale(3).reverse();
        });
      };
    })(this));
    this.$captions.each((function(_this) {
      return function(index, _caption) {
        var $caption;
        $caption = jQuery(_caption);
        return $caption.on('click', function(event) {
          var $element, _id;
          _id = '#' + $caption[0].id.replace('-caption', '');
          $element = jQuery(_id);
          return $element.trigger('roles:off');
        });
      };
    })(this));
    this.$tabs.each((function(_this) {
      return function(index, _tab) {
        var $link, $tab;
        $tab = jQuery(_tab);
        $link = $tab.find('a');
        return $link.on('click', function(event) {
          var $element;
          _this.$tabs.removeClass('ui-state-active');
          event.preventDefault();
          if ($link[0].hash != null) {
            $tab.addClass('ui-state-active');
            $element = jQuery($link[0].hash);
            return $element.trigger('click');
          }
        });
      };
    })(this));
  }

  return Roles;

})();
