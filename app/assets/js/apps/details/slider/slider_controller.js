(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['common/app', 'marionette', 'apps/details/slider/slider_view', 'swiper'], function(App, Marionette, SliderView, Swiper) {
    var SliderController;
    return SliderController = (function(superClass) {
      extend(SliderController, superClass);

      function SliderController() {
        return SliderController.__super__.constructor.apply(this, arguments);
      }

      SliderController.prototype.imageList = null;

      SliderController.prototype.region = null;

      SliderController.prototype.initialize = function(options) {
        this.region = options.region;
        this.imageList = options.imageList;
        return this.initView();
      };

      SliderController.prototype.initView = function() {
        var model;
        model = new Backbone.Model({
          imgList: this.imageList
        });
        this.view = new SliderView({
          model: model
        });
        return this.region.show(this.view);
      };

      return SliderController;

    })(Marionette.Controller);
  });

}).call(this);
