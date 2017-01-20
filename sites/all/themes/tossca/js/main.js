var Accordion, AnimationProblem, Breakpoints, FastClick, Forms, InfieldLabel, Jumpmenu, Modernizr, NavigationMobile, Roles, Sticky, Tabs, Waypoints;

Modernizr = require('./modernizr');

FastClick = require('../../../../../bower_components/fastclick/lib/fastclick.js');

Breakpoints = require('../../../../../bower_components/js-breakpoints/breakpoints.js');

InfieldLabel = require('../../../../../bower_components/jquery-infield-label/src/jquery.infieldlabel.js');

Waypoints = require('../../../../../bower_components/waypoints/lib/jquery.waypoints.js');

require("../../../../../bower_components/jquery.uniform/src/js/jquery.uniform.js");

Forms = require('./components/forms');

Accordion = require('./components/accordion');

Jumpmenu = require('./components/jumpmenu');

Tabs = require('./components/tabs');

Sticky = require('./components/sticky');

AnimationProblem = require('./components/animation-problem');

Roles = require('./components/roles');

NavigationMobile = require('./components/navigation-mobile');

Drupal.viewPort = function() {
  var viewPortHeight, viewPortWidth;
  viewPortWidth = void 0;
  viewPortHeight = void 0;
  if (typeof window.innerWidth !== "undefined") {
    viewPortWidth = window.innerWidth;
    viewPortHeight = window.innerHeight;
  } else if (typeof document.documentElement !== "undefined" && typeof document.documentElement.clientWidth !== "undefined" && document.documentElement.clientWidth !== 0) {
    viewPortWidth = document.documentElement.clientWidth;
    viewPortHeight = document.documentElement.clientHeight;
  } else {
    viewPortWidth = document.getElementsByTagName("body")[0].clientWidth;
    viewPortHeight = document.getElementsByTagName("body")[0].clientHeight;
  }
  return [viewPortWidth, viewPortHeight];
};

Drupal.behaviors.fastclick = {
  attach: function() {
    if (Modernizr.touchevents) {
      return FastClick(document.body);
    }
  }
};

Drupal.behaviors.accordion = {
  attach: function() {
    return jQuery('.js--accordion').once('accordion', function() {
      return new Accordion('.js--accordion');
    });
  }
};

Drupal.behaviors.jumpmenu = {
  attach: function() {
    return jQuery('.js--jumpmenu').once('jumpmenu', function() {
      return new Jumpmenu('.js--jumpmenu');
    });
  }
};

Drupal.behaviors.forms = {
  attach: function() {
    return jQuery('form').once('forms', function() {
      return new Forms();
    });
  }
};

Drupal.behaviors.tabs = {
  attach: function() {
    return jQuery('.js--tabs').once('tabs', function() {
      return new Tabs('.js--tabs');
    });
  }
};

Drupal.behaviors.sticky = {
  attach: function() {
    return jQuery('.js--sticky').once('sticky', function() {
      return new Sticky('.js--sticky');
    });
  }
};

Drupal.behaviors.animation_problem = {
  attach: function() {
    return jQuery('.js--animation-problem').once('animation-problem', function() {
      return new AnimationProblem('.js--animation-problem');
    });
  }
};

Drupal.behaviors.roles = {
  attach: function() {
    return jQuery('.js--roles').once('roles', function() {
      return new Roles('.js--roles');
    });
  }
};

Drupal.behaviors.navigation_mobile = {
  attach: function() {
    return jQuery('.js--navigation-mobile').once('header', function() {
      return new NavigationMobile('.js--navigation-mobile');
    });
  }
};
