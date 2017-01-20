var ProjectDetail, ProjectDetailWatcher;

ProjectDetail = (function() {
  function ProjectDetail(selector) {
    this.selector = selector;
    this.$wrapper = jQuery(this.selector);
    if (!this.$wrapper.length) {
      return;
    }
    this.$detailClose = this.$wrapper.find('.js--project-back');
    this.$detailWrapper = jQuery('#project--detail');
    this.$detailClose.on('touchstart click', (function(_this) {
      return function(event) {
        event.preventDefault();
        return _this.$detailWrapper.trigger('project:close');
      };
    })(this));
  }

  return ProjectDetail;

})();

module.exports = ProjectDetailWatcher = (function() {
  function ProjectDetailWatcher(selector) {
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

  ProjectDetailWatcher.prototype.matched_tablet = function() {
    return this.elements.each((function(_this) {
      return function(index, element) {
        return _this.instances[index] = new ProjectDetail(jQuery(element));
      };
    })(this));
  };

  ProjectDetailWatcher.prototype.exit_tablet = function() {
    if (!this.instances.length) {
      return;
    }
    return this.instances = [];
  };

  return ProjectDetailWatcher;

})();
