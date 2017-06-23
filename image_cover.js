(function($) {

  /**
   * [Image_cover description]
   * @param       {[Object|String]} id - It needs a target(id or ClassName or jQuery Object)
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
     */
    this.CleanAllHandler = function(selector, event ) {
      // get all prototype from 'this' object
      var prototypes = Object.getPrototypeOf(this);
      for (var prototype in prototypes) {
        var event_namespace = event + '.' + prototype;
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

    Cover_block_img.each(function(index, element) {
      var naturalHeight = this.naturalHeight;

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
   * @param  {[Object]} args - it is contains of two parameters.
   * @param  {[String]} args.custom_Height -
   * @param  {[String]} args.ratio -
   */
  Image_cover.prototype.SetHeight = function(args) {
    var block = $(this.id);
    var Cover_block_img = block.find('img');
    var that = this;
    that.Cover();

    /**
     * SetHeight_Responsive
     *
     * @param  {[type]} a [description]
     * @param  {[type]} b [description]
     * @param  {[String|Object]} c - It's a jQuery selector.
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
      var img = $(this);

      that.SetHeight_Responsive(args.custom_Height, args.ratio, img);

      // Clean All handler
      that.CleanAllHandler(block, 'resize');

      $(block).on('resize.SetHeight', function() {
        that.SetHeight_Responsive(args.custom_Height, args.ratio, img);
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
     * @param  {[String|Object]} a - It's a jQuery selector.
     */
    that.Device_Height_Responsive = function(a) {
      a.parent('.image-cover-processed').css({
        'height': $(window).height(),
      });
    };

    Cover_block_img.each(function(index, element) {
      var img = $(this);

      that.Device_Height_Responsive(img);

      // Clean All handler
      that.CleanAllHandler(block, 'resize');

      $(block).on('resize.DeviceHeight', function() {
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

    Cover_block_img.each(function(index, element) {

      $(this).css('display', 'block')
          .parent('.image-cover-processed')
          .removeAttr('style')
          .removeClass('image-cover-processed');

      // Clean All handler
      that.CleanAllHandler(block, 'resize');
    });
  };

  /**
   * ElSameHeight
   *
   * You can let image equal height with specific element.
   *
   * @param {[Object]} args - it contains a parameter.
   * @param {[String]} args.El -
   */

  Image_cover.prototype.ElSameHeight = function(args) {
    var block = $(this.id);
    var Cover_block_img = block.find('img');
    var that = this;
    that.Cover();

    /**
     * ElSameHeight_Responsive
     *
     * @param  {[String|Object]} a [description]
     * @param  {[String|Object]} b [description]
     */
    that.ElSameHeight_Responsive = function(a, b) {
      a.parent('.image-cover-processed').css({
        'height': b.innerHeight(),
      });
    };

    Cover_block_img.each(function(index, element) {
      var Els = $(args.El).eq(index) || $(args.El).eq(0);
      var img = $(this);

      that.ElSameHeight_Responsive(img, Els);

      // Clean All handler
      that.CleanAllHandler(block, 'resize');

      $(block).on('resize.ElSameHeight', function() {
        that.ElSameHeight_Responsive(img, Els);
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

    this.Image_cover = new Image_cover(this.selector,bg_settings);
    this.Image_cover[method](args);

    return $.isFunction(fn) ? this.each(fn) : this;
   };


})(jQuery);
