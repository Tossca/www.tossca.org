var Hero;

module.exports = Hero = (function() {
  function Hero(selector) {
    this.selector = selector;
    this.$wrapper = jQuery(this.selector);
    if (!this.$wrapper.length) {
      return;
    }
    console.log('drin');
    this.$win = jQuery(window);
    this.viewport = Drupal.viewPort();
    this.$win.on('resize', (function(_this) {
      return function(event) {
        return _this.handleResize();
      };
    })(this));
  }

  Hero.prototype.handleResize = function() {
    this.viewport = Drupal.viewPort();
    return this.$wrapper.height(this.viewport[1]);
  };

  return Hero;

})();
