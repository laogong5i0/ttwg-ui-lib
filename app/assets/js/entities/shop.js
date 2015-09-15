(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['common/app', 'marionette'], function(App, Marionette) {
    var API, ShopModel;
    ShopModel = (function(superClass) {
      extend(ShopModel, superClass);

      function ShopModel() {
        return ShopModel.__super__.constructor.apply(this, arguments);
      }

      ShopModel.prototype.parse = function(resp) {
        console.log('%cproduct响应数据：', "color:blue", resp);
        resp = resp.data;
        return ShopModel.__super__.parse.call(this, resp);
      };

      return ShopModel;

    })(Backbone.Model);
    return API = {
      getModel: function(data) {
        if (data == null) {
          data = {};
        }
        if (this.model) {
          return this.model;
        }
        this.model = new ProductModel(data);
        return this.model;
      },
      getDetials: function(options) {
        var model;
        if (options == null) {
          options = {};
        }
        model = this.getModel();
        model.url = App.productUrl + '/front/item/queryDetail.html';
        model.fetch(options);
        return model;
      }
    };
  });

}).call(this);
