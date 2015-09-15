(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['common/app', 'marionette', 'apps/details/main/main_controller', 'apps/details/sku/sku_controller'], function(App, Marionette, DetailsController, SkuController) {
    var MainApp;
    return MainApp = (function(superClass) {
      extend(MainApp, superClass);

      function MainApp() {
        return MainApp.__super__.constructor.apply(this, arguments);
      }

      MainApp.prototype.routes = {
        'productdetails/:id': 'detailsPage',
        'sku/:id': 'skupage'
      };

      MainApp.prototype.detailsPage = function(id) {
        if (this.skuController) {
          this.skuController.closeDialog();
        }
        if (this.productDetails) {
          return;
        }
        return this.productDetails = new DetailsController({
          productId: id,
          userId: 1
        });
      };

      MainApp.prototype.skupage = function(id) {
        return this.skuController = new SkuController({
          productId: id,
          userId: 1
        });
      };

      return MainApp;

    })(Marionette.AppRouter);
  });

}).call(this);
