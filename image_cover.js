(function($) {

  Image_cover = function(id, settings) {

    // Default settings
    this.id = id;
    this.background = {};
    this.background.position = 'center center';
    this.background.repeat = 'no-repeat';
    this.background.size = 'cover';
    this.background.attachment = 'scroll';

    /**
     * [description]
     * Remove all binding event on this object
     *
     * @param  {[type]} selector    [description]
     *         what selector do you bind event
     *         on it?
     * @param  {[type]} event       [description]
     *         what event do you want to
     *         remove?
     * @param  {[type]} specific_id [description]
     *         This is a namespace which is
     *         called on binding event.
     * @return {[type]}             [description]
     */

    this.CleanAllHandler = function (selector,event,specific_id) {
      // get all prototype from 'this' object
      var prototypes = Object.getPrototypeOf(this);
      for (var prototype in prototypes) {
        var event_namespace =  event + '.' + prototype + specific_id;
        $(selector).off(event_namespace);
      }
    };

    // If it has custom settigns merge it.
    $.extend(this.background, settings);
  };


// cover effect
/**
 * [description]
 * @return {[type]} [description]
 */
  Image_cover.prototype.Cover = function() {
    var settings = this.background;
    var block = $(this.id);
    var block_uuid = this.id;
    Cover_that = this;
    Cover_block_img = block.find('img');

    this.specific_id = [];

    Cover_block_img.each(function(index,element) {
      var this_img = $(element);
      Cover_that.specific_id[index] = block_uuid+index;

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
        }).addClass('image-cover-processed');
      });
    });
  };



  // Set custom Height
  /**
   * [description]
   * @param  {[type]} custom_Height [description]
   * @param  {[type]} ratio         [description]
   * @return {[type]}               [description]
   */
  Image_cover.prototype.SetHeight = function( custom_Height , ratio ) {

    Cover_block_img.each(function(index,element) {
      var this_img = $(element);

      $("<img/>").attr('src', this_img.attr('src')).load(function() {
        Cover_that.SetHeight_Responsive(custom_Height,ratio,this_img);

        // Clean All handler
        Cover_that.CleanAllHandler(window,'resize', Cover_that.specific_id[index]);

        $(window).on('resize.SetHeight'+ Cover_that.specific_id[index],function() {
          Cover_that.SetHeight_Responsive(custom_Height,ratio,this_img);
        });
      });
    });

    this.SetHeight_Responsive = function(a,b,c) {
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
  /**
   * [description]
   * @return {[type]} [description]
   */
  Image_cover.prototype.Device_Height = function() {
    Cover_block_img.each(function(index,element) {
      var this_img = $(element);

      $("<img/>").attr('src', this_img.attr('src')).load(function() {
        Cover_that.Device_Height_Responsive(this_img);

        // Clean All handler
        Cover_that.CleanAllHandler(window,'resize', Cover_that.specific_id[index]);

        $(window).on('resize.Device_Height'+ Cover_that.specific_id[index] , function() {
            Cover_that.Device_Height_Responsive(this_img);
        });
      });
    });


    this.Device_Height_Responsive = function(a) {
      a.parent().css({
        'height' : $(window).height(),
      });
    };
  };


  // remove all effect
  /**
   * [description]
   * @return {[type]} [description]
   */
  Image_cover.prototype.Remove_Cover = function() {
    Cover_block_img.each(function(index,element) {
      var this_img = $(element);

      $("<img/>").attr('src', this_img.attr('src')).load(function() {
        this_img.css('display','block').parent().removeAttr('style').removeClass('image-cover-processed');

        // Clean All handler
        Cover_that.CleanAllHandler(window,'resize', Cover_that.specific_id[index]);
      });
    });
  };
})(jQuery);
