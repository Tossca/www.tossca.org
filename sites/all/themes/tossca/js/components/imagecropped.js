var Imagecropped;

module.exports = Imagecropped = (function() {
  function Imagecropped($elements) {
    this.$elements = $elements;
    if (!this.$elements.length) {
      return;
    }
    this.$elements.each(function(index, value) {
      var $element, $img, _src;
      $element = jQuery(value);
      $img = $element.find('img');
      _src = $img.attr('src');
      $element.css({
        "background-image": 'url(' + _src + ')'
      });
      return $img.css({
        visibility: "hidden"
      });
    });
  }

  return Imagecropped;

})();
