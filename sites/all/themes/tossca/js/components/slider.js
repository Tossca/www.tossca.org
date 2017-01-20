var Slider;

module.exports = Slider = (function() {
  function Slider(selector) {
    var _options;
    this.selector = selector;
    this.$wrapper = jQuery(this.selector);
    if (!this.$wrapper.length) {
      return;
    }
    this.$win = jQuery(window);
    this.$hero = jQuery('.hero');
    this.$slider = this.$wrapper;
    _options = {
      mode: 'fade',
      auto: false,
      controls: false,
      speed: 3000,
      slideMargin: 0,
      pager: false
    };
    if (this.$hero.length > 1) {
      _options.auto = true;
    }
    this.$slider.bxSlider(_options);
    this.$sliderWrapper = this.$sliderWrapper || jQuery('.bx-wrapper');
    this.$sliderViewport = this.$sliderViewport || jQuery('.bx-viewport');
    this.$sliderItems = this.$wrapper.find('.hero');
    this.$height = this.$height || jQuery([]).add(this.$sliderWrapper).add(this.$sliderViewport).add(this.$sliderItems);
    this.$win.on('resize', (function(_this) {
      return function() {
        return _this.handleResize();
      };
    })(this));
    this.handleResize();
  }

  Slider.prototype.handleResize = function() {
    var _viewport;
    _viewport = Drupal.viewPort();
    return this.$height.height(_viewport[1]);
  };

  return Slider;

})();
