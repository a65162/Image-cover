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
        'display': 'block',
        'height': img_Height
      });
    });
  };

  Image_cover.prototype.setHeight = function(custom_Height, ratio ) {
    var banner = $(this.id);
    var img = banner.find('img');

    this.responsive = function(a,b) {
      if (a > $(window).height()) {
        var Height = $(window).height() * b;
        banner.css({
          'height': Height
        });
      } else {
        banner.css({
          'height': a
        });
      }
    };
    var that = this;

    $("<img/>").attr('src', img.attr('src')).load(function() {
      that.responsive(custom_Height,ratio);
      $(window).resize(function() {
        that.responsive(custom_Height,ratio);
      });
    });
  };

})(jQuery);
