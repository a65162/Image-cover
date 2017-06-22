## Introduction
This plugin is for someone wanting ``<img/>`` tag having background cover effect. It can help you.

## Arguments
Name      | Type   | Default | Description
--------- | ------ | ------- | ---------------------
Bg_Settings | Object | position: center center <br />repeat: no-repeat <br/> size: cover <br/> attachment:scroll| These settings are similar from [CSS background](https://www.w3schools.com/css/css_background.asp)（Optional）
Method    | String | Cover   | It's provided 5 methods including 'Cover', 'SetHeight' , 'DeviceHeight', 'RemoveCover' and 'ElSameHeight'（Optional）
Args      | Object | null    | Some of the methods need type parameters.(ElSameHeight and SetHeight) （Optional）
Fn        | Function |  null |  A function to call once the cover is complete called once per matched element. （Optional）


## Method
It's going to tell you these methods' definition.
### Cover
It's provided a basic image cover that gives original height to its parent' element.

### SetHeight
You can set a custom height for your image.
This method has two parameters including 'custom_Height' and 'ratio', therefore you have to settle it.

> What is the ratio?  
When your custom_Height' value is greater than device' height, it'll be used custom_Height Multiplied by ratio to give a specific height.

### DeviceHeight
Using device height to set image height.

### RemoveCover
Removing all cover JavaScript
### ElSameHeight
You can let image equal height with a specific element, so you have to give a parameter which is called "El".

## Example

### Basic:
````
$('.selector').ImageCover();
````

### Advanced
````
var bg_settings = {
  position: 'left center',
  attachment: 'fixed',
};

var args = {
  custom_Height: 300,
  ratio:         0.6,
};
$('.selector').ImageCover(bg_settings,'SetHeight',args,function() {
  // Do something after Cover is complete.
});

````
