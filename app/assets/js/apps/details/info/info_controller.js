(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['common/app', 'marionette', 'apps/details/info/info_view', 'apps/details/sku/sku_controller'], function(App, Marionette, InfoView, SkuController) {
    var SliderController;
    return SliderController = (function(superClass) {
      extend(SliderController, superClass);

      function SliderController() {
        return SliderController.__super__.constructor.apply(this, arguments);
      }

      SliderController.prototype.model = null;

      SliderController.prototype.region = null;

      SliderController.prototype.initialize = function(options) {
        this.region = options.region;
        this.model = options.model;
        return this.initView();
      };

      SliderController.prototype.initView = function() {
        this.viewMain = this.getView(this.model);
        return this.region.show(this.viewMain);
      };

      SliderController.prototype.getView = function(model) {
        return new InfoView({
          model: model
        });
      };

      return SliderController;

    })(Marionette.Controller);
  });

}).call(this);
