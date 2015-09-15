(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['common/app', 'marionette', 'apps/details/sku/sku_view', 'entities/product'], function(App, Marionette, SkuView, Product) {
    var SliderController;
    return SliderController = (function(superClass) {
      extend(SliderController, superClass);

      function SliderController() {
        return SliderController.__super__.constructor.apply(this, arguments);
      }

      SliderController.prototype.model = null;

      SliderController.prototype.region = null;

      SliderController.prototype.productId = null;

      SliderController.prototype.userId = null;

      SliderController.prototype.initialize = function(options) {
        this.productId = options.productId;
        this.userId = options.userId;
        this.region = options.region;
        this.model = options.model;
        return this.initView();
      };

      SliderController.prototype.initView = function() {
        var productModel;
        return productModel = Product.getDetials({
          data: {
            itemId: this.productId,
            userId: this.userId
          },
          success: (function(_this) {
            return function(model, resp, options) {
              _this.viewMain = new SkuView({
                model: model
              });
              return App.showDialog(_this.viewMain, 'modal');
            };
          })(this)
        });
      };

      SliderController.prototype.closeDialog = function() {
        return App.closeDialog();
      };

      return SliderController;

    })(Marionette.Controller);
  });

}).call(this);
