(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['backbone', 'marionette', 'apps/productList/operate/operate_controller', 'apps/productList/list/list_controller'], function(Backbone, Marionette, OperateController, ListController) {
    var ProductRouter;
    return ProductRouter = (function(superClass) {
      extend(ProductRouter, superClass);

      function ProductRouter() {
        return ProductRouter.__super__.constructor.apply(this, arguments);
      }

      ProductRouter.prototype.initialize = function() {
        return this.route(/^.*$/, "hasChange");
      };

      ProductRouter.prototype.hasChange = function() {
        return new OperateController();
      };

      ProductRouter.prototype.parseHash = function(hashStr) {
        var cur, reg, ret;
        reg = this.reg;
        ret = {};
        if (typeof hashStr !== 'string' || hashStr.length < 1) {
          return ret;
        }
        while ((cur = reg.exec(hashStr)) !== null) {
          ret[cur[1]] = cur[2];
        }
        return ret;
      };

      ProductRouter.prototype.reg = /(\w+)(?:=)(\w+)/g;

      return ProductRouter;

    })(Marionette.AppRouter);
  });

}).call(this);
