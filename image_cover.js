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

  Image_cover.prototype.cover = function(custom_Height) {
    var settings = this.background;
    var banner = $(this.id);
    var img = banner.find('img');
    var Height = custom_Height;

    img.css('display', 'none');
    banner.css({
      'background-position': settings.position,
      'background-repeat': settings.repeat,
      'background-size:': settings.size,
      'background-attachment': settings.attachment,
      'background-image': 'url(' + img.attr('src') + ')',
      'display':'block',
    });

    if(custom_Height) {
      banner.css('height', custom_Height);
    }else {
      $("<img/>").attr('src', img.attr('src')).load(function() {
        var img_Height = this.height;
        banner.css('height', img_Height);
      });
    }
  };
})(jQuery);
