var Forms, Modernizr;

Modernizr = require('../modernizr');

module.exports = Forms = (function() {
  function Forms() {
    var _type, _types, i, len;
    jQuery('.form-select, .form-radio, .form-checkbox, .form-type-bef-checkbox input').uniform();
    jQuery('.form--label__inline label').inFieldLabels();
    jQuery('#online-statement-node-form').on('state:visible', function(event) {
      if (event.trigger) {
        if (event.value) {
          setTimeout(function() {
            return jQuery(event.target).closest('.form-item, .form-submit, .form-wrapper').fadeIn(500);
          }, 500);
        } else {
          jQuery(event.target).closest('.form-item, .form-submit, .form-wrapper').fadeOut(500);
        }
      }
      return event.stopPropagation();
    });
    _types = ['governance', 'individual'];
    for (i = 0, len = _types.length; i < len; i++) {
      _type = _types[i];
      jQuery('.field-name-field-statement-cmpny-' + _type + ' select').data('type', _type).change(function(event) {
        var $element, $target;
        $element = jQuery(this);
        $target = jQuery('#statement--adress-target__' + $element.data('type'));
        if (!isNaN(this.value)) {
          return jQuery.getJSON('/js/online-statement/company/' + this.value + '/address', (function(_this) {
            return function(data) {
              if (data.success) {
                return $target.empty().html(data.data);
              }
            };
          })(this));
        } else {
          return $target.empty();
        }
      }).trigger('change');
    }
    this.$infos = jQuery('.js--info');
    this.$body = jQuery('body');
    if (Modernizr.touchevents) {
      this.$infos.on('touchstart', (function(_this) {
        return function(event) {
          var $info;
          $info = jQuery(event.target);
          $info.data('hover', !$info.data('hover'));
          $info.parent('.info--wrapper').toggleClass('hover', $info.data('hover'));
          _this.$body.toggleClass('info--is-active', $info.data('hover'));
          return event.stopPropagation();
        };
      })(this));
      this.$body.on('touchstart', (function(_this) {
        return function(event) {
          _this.$infos.parent('.info--wrapper').removeClass('hover');
          return _this.$body.removeClass('info--is-active');
        };
      })(this));
    } else {
      this.$infos.hover((function(_this) {
        return function(event) {
          var $info;
          $info = jQuery(event.target);
          $info.parent('.info--wrapper').toggleClass('hover', event.type === 'mouseenter');
          return _this.$body.toggleClass('info--is-active', event.type === 'mouseenter');
        };
      })(this));
    }
  }

  return Forms;

})();
