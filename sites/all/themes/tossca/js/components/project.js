var Project, ProjectWatcher;

Project = (function() {
  function Project(selector) {
    this.selector = selector;
    this.$elements = jQuery(this.selector);
    if (Drupal.settings.lt_ie9 != null) {
      return;
    }
    if (!this.$elements.length) {
      return;
    }
    this.$elements.each(function(index, value) {
      this.$element = jQuery(value);
      this.$img = this.$element.find('img');
      this.src = this.$img.attr('src');
      this.$element.css({
        "background-image": 'url(' + this.src + ')'
      });
      return this.$img.css({
        visibility: "hidden"
      });
    });
  }

  return Project;

})();

module.exports = ProjectWatcher = (function() {
  function ProjectWatcher(selector) {
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

  ProjectWatcher.prototype.matched_tablet = function() {
    return this.elements.each((function(_this) {
      return function(index, element) {
        return _this.instances[index] = new Project(jQuery(element));
      };
    })(this));
  };

  ProjectWatcher.prototype.exit_tablet = function() {
    var i, index, instance, len, ref;
    if (!this.instances.length) {
      return;
    }
    ref = this.instances;
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      instance = ref[index];
      instance.destroy();
    }
    return this.instances = [];
  };

  return ProjectWatcher;

})();
