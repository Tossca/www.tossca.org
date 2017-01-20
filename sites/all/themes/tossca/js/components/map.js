var Map, Modernizr,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Modernizr = require('../modernizr');

module.exports = Map = (function() {
  function Map(selector) {
    this.selector = selector;
    this.init = bind(this.init, this);
    this.win = jQuery(window);
    this.$wrapper = jQuery('.contactfold');
    this.settings = Drupal.settings.map_feature;
    this.element = document.getElementById(this.selector);
    this.options = {
      mapTypeControl: false,
      streetViewControl: false,
      scrollwheel: false,
      zoom: 18,
      minZoom: 6,
      maxZoom: 19,
      center: {
        lat: 49.99937,
        lng: 8.27781
      }
    };
    this.center = new google.maps.LatLng(this.options.center.lat, this.options.center.lng);
    if (this.element) {
      jQuery(this.element).once('map', (function(_this) {
        return function() {
          return _this.init(_this.element);
        };
      })(this));
    }
  }

  Map.prototype.init = function(element) {
    this.element = element;
    this.set_style();
    this.set_marker();
    this.win.resize((function(_this) {
      return function(event) {
        var _viewport;
        _viewport = Drupal.viewPort();
        _this.map.setCenter(_this.center);
        if (_viewport[0] >= 768) {
          return _this.map.panBy(-(_this.$wrapper.width() / 4), 0);
        }
      };
    })(this));
    return setTimeout((function(_this) {
      return function() {
        return _this.win.resize();
      };
    })(this), 250);
  };

  Map.prototype.set_style = function() {
    var styles;
    styles = this.get_styles();
    this.styledMap = new google.maps.StyledMapType(styles, {
      name: "Styled Map"
    });
    this.options.mapTypeControlOptions = {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    };
    this.map = new google.maps.Map(this.element, this.options);
    this.map.mapTypes.set('map_style', this.styledMap);
    return this.map.setMapTypeId('map_style');
  };

  Map.prototype.set_marker = function(position) {
    var _marker;
    this.pin = new google.maps.MarkerImage("/sites/all/themes/maf/images/map--pin.png", null, null, null, new google.maps.Size(42, 60));
    return _marker = new google.maps.Marker({
      position: this.center,
      map: this.map,
      icon: this.pin
    });
  };

  Map.prototype.get_styles = function() {
    var style;
    return style = [
      {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
          {
            'saturation': -100
          }
        ]
      }, {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
          {
            'saturation': -100
          }
        ]
      }, {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "visibility": "off"
          }, {
            "hue": "#000"
          }, {
            "color": "#d9d9d9"
          }
        ]
      }, {
        "featureType": "poi.business",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      }, {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "lightness": 100
          }, {
            "visibility": "simplified"
          }, {
            "color": "#d9d9d9"
          }
        ]
      }, {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "visibility": "on"
          }, {
            "lightness": 700
          }
        ]
      }, {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
          {
            "color": "#4f8499"
          }
        ]
      }
    ];
  };

  return Map;

})();
