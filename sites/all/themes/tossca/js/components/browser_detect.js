var BrowserDetect;

module.exports = BrowserDetect = (function() {
  function BrowserDetect() {
    this.browser = this.searchString(this.dataBrowser) || 'Other';
    this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || 'Unknown';
  }

  BrowserDetect.prototype.searchString = function(data) {
    var dataString, i;
    i = 0;
    while (i < data.length) {
      dataString = data[i].string;
      this.versionSearchString = data[i].subString;
      if (dataString.indexOf(data[i].subString) !== -1) {
        return data[i].identity;
      }
      i++;
    }
  };

  BrowserDetect.prototype.searchVersion = function(dataString) {
    var index, rv;
    index = dataString.indexOf(this.versionSearchString);
    if (index === -1) {
      return;
    }
    rv = dataString.indexOf('rv:');
    if (this.versionSearchString === 'Trident' && rv !== -1) {
      return parseFloat(dataString.substring(rv + 3));
    } else {
      return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    }
  };

  BrowserDetect.prototype.dataBrowser = [
    {
      string: navigator.userAgent,
      subString: 'Edge',
      identity: 'MS Edge'
    }, {
      string: navigator.userAgent,
      subString: 'Chrome',
      identity: 'Chrome'
    }, {
      string: navigator.userAgent,
      subString: 'MSIE',
      identity: 'Explorer'
    }, {
      string: navigator.userAgent,
      subString: 'Trident',
      identity: 'Explorer'
    }, {
      string: navigator.userAgent,
      subString: 'Firefox',
      identity: 'Firefox'
    }, {
      string: navigator.userAgent,
      subString: 'Safari',
      identity: 'Safari'
    }, {
      string: navigator.userAgent,
      subString: 'Opera',
      identity: 'Opera'
    }
  ];

  return BrowserDetect;

})();
