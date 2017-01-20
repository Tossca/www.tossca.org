var ProblemSolution;

module.exports = ProblemSolution = (function() {
  function ProblemSolution(selector) {
    this.selector = selector;
    this.$wrapper = jQuery(this.selector);
    if (!this.$wrapper) {
      return;
    }
    this.$win = jQuery(window);
    this.tl = new TimelineLite();
    this.tl.from('#partner-1', 1, {
      opacity: 0
    }).from('#partner-2', 1, {
      opacity: 0
    }).from('#partner-3', 1, {
      opacity: 0
    }).from('#partner-4', 1, {
      opacity: 0
    }).from('#contract-1', 1, {
      drawSVG: 0
    }).from('#contract-2', 1, {
      drawSVG: 0
    }).from('#contract-3', 1, {
      drawSVG: 0
    }).from('#contract-4', 1, {
      drawSVG: 0,
      delay: 2
    }).from('#contract-5', 1, {
      drawSVG: 0
    }).from('#contract-6', 1, {
      drawSVG: 0
    }).to('#partner-1', 1, {
      opacity: 0,
      delay: 2
    }).to('#contract-1', 1, {
      opacity: 0,
      delay: -0.8
    }).to('#contract-2', 1, {
      opacity: 0,
      delay: -0.8
    }).to('#contract-3', 1, {
      opacity: 0,
      delay: -0.8
    }).to('#contract-4', 1, {
      strokeDasharray: 3
    }).to('#contract-5', 1, {
      strokeDasharray: 3,
      delay: -1
    }).to('#contract-6', 1, {
      strokeDasharray: 3,
      delay: -1
    }).to('#problem', 2, {
      opacity: 0,
      delay: 2
    });
    this.tl.pause();
    this.$win.on('scroll', (function(_this) {
      return function(event) {
        var _scrollTop;
        _scrollTop = _this.$win.scrollTop();
        return _this.tl.progress(_scrollTop / 500);
      };
    })(this));
    this.$win.scroll();
  }

  return ProblemSolution;

})();
