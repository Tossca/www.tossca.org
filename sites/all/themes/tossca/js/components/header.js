var Header;

module.exports = Header = (function() {
  function Header(selector) {
    this.selector = selector;
    this.$wrapper = jQuery(this.selector);
    if (!this.$wrapper.length) {
      return;
    }
    this.active = false;
    this.$body = jQuery('body');
    this.$trigger = jQuery('#navigation-mobile--trigger');
    this.$trigger.on('click', (function(_this) {
      return function(event) {
        event.preventDefault();
        _this.active = !_this.active;
        return _this.$body.toggleClass('navigation--mobile-active', _this.active);
      };
    })(this));
  }

  return Header;

})();
