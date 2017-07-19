(function($) {

  /**
   * [Image_cover description]
   * @param       {[Object|String]} id - It needs a target(id or ClassName)
   * @param       {[Object]} settings - CSS background settings
   * @param       {[String]} settings.position - background-position
   * @param       {[String]} settings.repeat - background-repeat
   * @param       {[String]} settings.size - background-size
   * @param       {[String]} settings.attachment - background-attachment
   * @constructor
   */
  function Image_cover(id, settings) {

    // Default settings
    this.id = id;
    this.background = {};
    this.background.position = 'center center';
    this.background.repeat = 'no-repeat';
    this.background.size = 'cover';
    this.background.attachment = 'scroll';

    /**
     * CleanAllHandler
     * Remove all binding event on this object
     *
     * @param  {[String|Object]} selector - what selector do you bind event on it?
     * @param  {[String]} event - what event do you want to remove?
     * @param  {[String]} specific_id - This is a namespace which is called on binding event.
     */
    this.CleanAllHandler = function(selector, event, specific_id) {
      // get all prototype from 'this' object
      var prototypes = Object.getPrototypeOf(this);
      for (var prototype in prototypes) {
        var event_namespace = event + '.' + prototype + specific_id;
        $(selector).off(event_namespace);
      }
    };

    // this.AddHandler = function (selector,event,prototype,specific_id) {
    //   var events = $(selector).data('events');
    //   var event_namespace =  event + '.' + prototype + specific_id;
    //
    //   $.each(events, function(key,value) {
    //     if(key === event) {
    //       var namespaces = value;
    //       $.each(namespaces , function(key,value) {
    //         if(value.namespace === event_namespace ) {
    //             return false;
    //         }
    //       });
    //       console.log('asdasd');
    //     }
    //   });
    // };

    // If it has custom settigns, then merging it.
    $.extend(this.background, settings);
  }


  /**
   * Cover
   * Basic method that use original img height
   * and settles all background properties.
   */
  Image_cover.prototype.Cover = function() {
    var settings = this.background;
    var block = $(this.id);
    var block_uuid = this.id;
    var that = this;
    var Cover_block_img = block.find('img');

    this.specific_id = [];

    Cover_block_img.each(function(index, element) {
      var naturalHeight = this.naturalHeight;
      that.specific_id[index] = block_uuid + index;

      $(this).css('display', 'none').parent().not('.image-cover-processed').css({
        'background-position': settings.position,
        'background-repeat': settings.repeat,
        'background-size': settings.size,
        'background-attachment': settings.attachment,
        'background-image': 'url(' + $(this).attr('src') + ')',
        'display': 'block',
        'height': naturalHeight
      }).addClass('image-cover-processed');
    });
  };


  /**
   * SetHeight
   *
   * You can set custom height for your image.
   *
   * @param  {[Object]} args - it is contains two parameters.
   * @param  {[number]} args.custom_Height - given number to apply on the image.
   * @param  {[number]} args.ratio - Whether custom_Height is greater than device height, it'll be used.
   */
  Image_cover.prototype.SetHeight = function(args) {
    var block = $(this.id);
    var Cover_block_img = block.find('img');
    var custom_Height = args.custom_Height;
    var ratio = args.ratio;
    var that = this;
    that.Cover();

    /**
     * SetHeight_Responsive
     *
     * @param  {[number]} a - given number to apply on the image.
     * @param  {[number]} b - Whether custom_Height is greater than device height, it'll be used.
     * @param  {[String|Object]} c - which image do you want to apply?
     */
    that.SetHeight_Responsive = function(a, b, c) {
      if (a > $(window).height()) {
        var Height = a * b;
        c.parent('.image-cover-processed').css({
          'height': Height
        });
      } else {
        c.parent('.image-cover-processed').css({
          'height': a
        });
      }
    };

    Cover_block_img.each(function(index, element) {
      var uuid = that.specific_id[index];
      var img = $(this);

      that.SetHeight_Responsive(custom_Height, ratio , img);

      // Clean All handler
      that.CleanAllHandler(window, 'resize', uuid);

      $(window).on('resize.SetHeight' + uuid, function() {
        that.SetHeight_Responsive(custom_Height, ratio , img);
      });
    });
  };


  /**
   * DeviceHeight
   *
   * Using device height to set image height.
   *
   */
  Image_cover.prototype.DeviceHeight = function() {
    var block = $(this.id);
    var Cover_block_img = block.find('img');
    var that = this;
    that.Cover();

    /**
     * Device_Height_Responsive
     *
     * @param  {[String|Object]} a - which image do you want to apply?
     */
    that.Device_Height_Responsive = function(a) {
      a.parent('.image-cover-processed').css({
        'height': $(window).height(),
      });
    };

    Cover_block_img.each(function(index, element) {
      var uuid = that.specific_id[index];
      var img = $(this);

      that.Device_Height_Responsive(img);

      // Clean All handler
      that.CleanAllHandler(window, 'resize', uuid);

      $(window).on('resize.DeviceHeight' + uuid, function() {
        that.Device_Height_Responsive(img);
      });
    });
  };


  /**
   * RemoveCover
   *
   * remove all background effect
   */
  Image_cover.prototype.RemoveCover = function() {
    var block = $(this.id);
    var Cover_block_img = block.find('img');
    var that = this;
    that.Cover();

    Cover_block_img.each(function(index, element) {
      var uuid = that.specific_id[index];

      $(this).css('display', 'block')
          .parent('.image-cover-processed')
          .removeAttr('style')
          .removeClass('image-cover-processed');

      // Clean All handler
      that.CleanAllHandler(window, 'resize', uuid);
    });
  };

  /**
   * ElSameHeight
   *
   * You can let image equal height with specific element.
   *
   * @param {[Object]} args - it contains a parameter.
   * @param {[String||Object]} args.El - A selector which let image is equal height with it can be a string or jQuery object.
   */

  Image_cover.prototype.ElSameHeight = function(args) {
    var block = $(this.id);
    var Cover_block_img = block.find('img');
    var El = args.El;
    var that = this;
    that.Cover();

    /**
     * ElSameHeight_Responsive
     *
     * @param  {[String|Object]} a - which image do you want to apply?
     * @param  {[String|Object]} b - A selector which let image is equal height with it can be a string or jQuery object.
     */
    that.ElSameHeight_Responsive = function(a, b) {
      a.parent('.image-cover-processed').css({
        'height': b.innerHeight(),
      });
    };

    Cover_block_img.each(function(index, element) {
      var target = $(El).eq(index) || $(El).eq(0);
      var uuid = that.specific_id[index];
      var img = $(this);

      that.ElSameHeight_Responsive(img, target);

      // Clean All handler
      that.CleanAllHandler(window, 'resize', uuid);

      $(window).on('resize.ElSameHeight' + uuid, function() {
        that.ElSameHeight_Responsive(img, target);
      });
    });
  };



  // plugin defintion.
  $.fn.ImageCover = function (bg_settings,method,args,fn) {

    // If method is given wrong string, it'll set a default value.
    if(typeof method !== 'string' || !Image_cover.prototype.hasOwnProperty(method)) {
      method = 'Cover';
    }

    // Whether method has no argument, it'll let args had null.
    // If args is not object or undefined, it'll throw a erroe message.
    if(Image_cover.prototype[method].length === 0) {
      args = null;
    }else if(args === undefined || typeof args !=='object') {
      throw 'Please give a correct args';
    }

    var selector = '.' + this[0].classList.value.replace(/\ /g,'.');

    this.Image_cover = new Image_cover(selector,bg_settings);
    this.Image_cover[method](args);

    return $.isFunction(fn) ? this.each(fn) : this;
   };


})(jQuery);
