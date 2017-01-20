var Tabs;

module.exports = Tabs = (function() {
  function Tabs(selector) {
    var options;
    this.selector = selector;
    this.$tabs = jQuery(this.selector);
    this.$win = jQuery(window);
    if (!this.$tabs.length) {
      return;
    }
    options = {
      hide: 'fade',
      heightStyle: 'auto',
      activate: (function(_this) {
        return function(event, ui) {
          var _hash;
          _hash = ui.newTab.context.hash.replace('-target', '');
          return window.location.hash = _hash;
        };
      })(this)
    };
    if (window.location.hash != null) {
      this.$target = jQuery('a[href="' + window.location.hash + '-target"]').parent();
      if (this.$target.length) {
        options.active = this.$target.index();
      }
    }
    this.$tabs.tabs(options);
    this.$win.resize();
  }

  return Tabs;

})();
