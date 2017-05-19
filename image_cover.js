(function($) {
  Image_cover = function(id, settings) {
    this.id = id;
    this.background = {};
    this.background.position = 'center center';
    this.background.repeat = 'no-repeat';
    this.background.size = 'cover';
    this.background.attachment = 'scroll';
    $.extend(this.background, settings);
  };

  Image_cover.prototype.cover = function() {
    var settings = this.background;
    var banner = $(this.id);
    var img = banner.find('img');

    $("<img/>").attr('src', img.attr('src')).load(function() {
      var img_Height = this.height;
      img.css('display', 'none');
      banner.css({
        'background-position': settings.position,
        'background-repeat': settings.repeat,
        'background-size:': settings.size,
        'background-attachment': settings.attachment,
        'background-image': 'url(' + img.attr('src') + ')',
        'height': img_Height
      });
    });
  };
})(jQuery);
