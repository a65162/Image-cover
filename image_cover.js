(function($) {

  Image_cover = function(id, settings) {

    // Default settings
    this.id = id;
    this.background = {};
    this.background.position = 'center center';
    this.background.repeat = 'no-repeat';
    this.background.size = 'cover';
    this.background.attachment = 'scroll';

    // If it has custom settigns merge it.
    $.extend(this.background, settings);
  };


// cover effect

  Image_cover.prototype.cover = function() {
    var settings = this.background;
    var block = $(this.id);
    var img = block.find('img');

    img.each(function(index,element) {
      var this_img = $(element);
      $("<img/>").attr('src', this_img.attr('src')).load(function() {
        var img_Height = this.height;
        this_img.css('display', 'none').parent().css({
          'background-position': settings.position,
          'background-repeat': settings.repeat,
          'background-size': settings.size,
          'background-attachment': settings.attachment,
          'background-image': 'url(' + this_img.attr('src') + ')',
          'display': 'block',
          'height': img_Height
        });
      });
    });
  };



  // Set custom Height

  Image_cover.prototype.setHeight = function( custom_Height , ratio ) {
    var block = $(this.id);
    var block_uuid = this.id;
    var img = block.find('img');
    var that = this;

    img.each(function(index,element) {
      var this_img = $(element);

      $("<img/>").attr('src', this_img.attr('src')).load(function() {
        that.setHeight_responsive(custom_Height,ratio,this_img);

        // Whather same event is exixting, it'll remove it.
        $(window).off('resize.setHeight'+ index + block_uuid );

        $(window).on('resize.setHeight'+ index + block_uuid,function() {
          that.setHeight_responsive(custom_Height,ratio,this_img);
        });
      });
    });

    this.setHeight_responsive = function(a,b,c) {
      if (a > $(window).height()) {
        var Height = a * b;
        c.parent().css({
          'height': Height
        });
      } else {
        c.parent().css({
          'height': a
        });
      }
    };
  };




  // using device height
  Image_cover.prototype.device_height = function() {
    var block = $(this.id);
    var block_uuid = this.id;
    var img = block.find('img');
    var that = this;

    img.each(function(index,element) {
      var this_img = $(element);
      $("<img/>").attr('src', this_img.attr('src')).load(function() {
        that.device_height_responsive(this_img);
        // Whather same event is exixting, it'll remove it.
        $(window).off('resize.device_height'+ index + block_uuid);
        $(window).on('resize.device_height'+ index + block_uuid , function() {
            that.device_height_responsive(this_img);
        });
      });
    });


    this.device_height_responsive = function(a) {
      a.parent().css({
        'height' : $(window).height(),
      });
    };
  };


  // remove all effect
  //
  Image_cover.prototype.remove_cover = function() {
    var block = $(this.id);
    var block_uuid = this.id;
    var img = block.find('img');

    img.each(function(index,element) {
      var this_img = $(element);

      $("<img/>").attr('src', this_img.attr('src')).load(function() {
        this_img.css('display','block').parent().removeAttr('style');
        $(window).off('resize.setHeight'+ index + block_uuid);
        $(window).off('resize.device_height'+ index + block_uuid);
      });
    });
  };

})(jQuery);
