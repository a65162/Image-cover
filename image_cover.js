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
  };


  /**
   * Cover
   * Basic method that use original img height settles all background properties.
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
   * @param  {[type]} custom_Height [description]
   * @param  {[type]} ratio         [description]
   * @return {[type]}               [description]
   */
  Image_cover.prototype.SetHeight = function(args) {
    var block = $(this.id);
    var Cover_block_img = block.find('img');
    var that = this;
    that.Cover();

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

      that.SetHeight_Responsive(args.custom_Height, args.ratio, img);

      // Clean All handler
      that.CleanAllHandler(window, 'resize', uuid);

      $(window).on('resize.SetHeight' + uuid, function() {
        console.log('sadsa');
        that.SetHeight_Responsive(args.custom_Height, args.ratio, img);
      });
    });
  };


  /**
   * DeviceHeight
   * @return {[type]} [description]
   */
  Image_cover.prototype.DeviceHeight = function() {
    var block = $(this.id);
    var Cover_block_img = block.find('img');
    var that = this;
    that.Cover();

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
   * @param  {[type]} El [description]
   * @return {[type]}    [description]
   */

  Image_cover.prototype.ElSameHeight = function(args) {
    var block = $(this.id);
    var Cover_block_img = block.find('img');
    var that = this;
    that.Cover();

    that.ElSameHeight_Responsive = function(a, b) {
      a.parent('.image-cover-processed').css({
        'height': b.innerHeight(),
      });
    };

    Cover_block_img.each(function(index, element) {
      var Els = $(args.El).eq(index);
      var uuid = that.specific_id[index];
      var img = $(this);

      that.ElSameHeight_Responsive(img, Els);

      // Clean All handler
      that.CleanAllHandler(window, 'resize', uuid);

      $(window).on('resize.ElSameHeight' + uuid, function() {
        that.ElSameHeight_Responsive(img, Els);
      });
    });
  };



  // plugin defintion.
  $.fn.ImageCover = function (bg_settings,method,args,fn) {

    if(typeof method !== 'string' || !Image_cover.prototype.hasOwnProperty(method)) {
      method = 'Cover';
    }

    if(Image_cover.prototype[method].length === 0) {
      args = null;
    }else if(args === undefined || typeof args !=='object') {
      throw 'Pleas given correct args';
    }

    if(this.selector === '') {
      throw 'Pleas given a selector(Id or ClassName)';
    }

    var Cover = new Image_cover(this.selector,bg_settings);
    Cover[method](args);

    return $.isFunction(fn) ? this.each(fn) : this;
   };


})(jQuery);
