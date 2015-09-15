(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['underscore', 'marionette', 'common/app', 'entities/product_list', 'apps/productList/operate/operate_view'], function(_, Marionette, App, ProductList, OperateView) {
    var OperateController;
    return OperateController = (function(superClass) {
      extend(OperateController, superClass);

      function OperateController() {
        return OperateController.__super__.constructor.apply(this, arguments);
      }

      OperateController.prototype.initialize = function(options) {
        if (options == null) {
          options = {};
        }
        this.attachAppRequest();
        return this.fetchModel(options);
      };

      OperateController.prototype.initView = function(model) {
        var view;
        view = new OperateView({
          model: model
        });
        return App.mainRegion.show(view);
      };

      OperateController.prototype.parse = function(obj) {
        var arr, typeMap;
        typeMap = this.typeMap;
        arr = Object.keys(typeMap);
        arr.forEach(function(val) {
          if (!obj.hasOwnProperty(val)) {
            return null;
          }
          return obj[val] = typeMap[val] === 'string' ? String(obj[val]) : parseInt(obj[val]);
        });
        return obj;
      };

      OperateController.prototype.attachAppRequest = function() {
        return App.reqres.setHandler('fetchModel', this.fetchModel, this);
      };

      OperateController.prototype.fetchModel = function(attributes) {
        var options;
        if (attributes == null) {
          attributes = {};
        }
        attributes = _.extend(this.objBase, attributes);
        attributes = this.parse(attributes);
        options = {
          success: (function(_this) {
            return function(model, response, options) {
              return _this.initView(model);
            };
          })(this),
          wait: true
        };
        return ProductList.refreshModel(attributes, options);
      };

      OperateController.prototype.objBase = {
        sort: 1,
        sc: 2,
        pageNO: 0,
        pageSize: 10
      };

      OperateController.prototype.typeMap = {
        ctgId: 'long',
        userId: 'long',
        title: 'string',
        sort: 'int',
        sc: 'int',
        pageNO: 'int',
        pageSize: 'int'
      };

      return OperateController;

    })(Marionette.Controller);
  });

}).call(this);
