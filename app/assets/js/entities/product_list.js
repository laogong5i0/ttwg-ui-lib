(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['backbone', 'common/app'], function(Backbone, App) {
    var ProductListModel;
    ProductListModel = (function(superClass) {
      extend(ProductListModel, superClass);

      function ProductListModel() {
        return ProductListModel.__super__.constructor.apply(this, arguments);
      }

      ProductListModel.prototype.defaults = {
        map: {
          list: []
        },
        sort: 1,
        sc: 2,
        pageNO: 0,
        pageSize: 6
      };

      ProductListModel.prototype.parse = function(resp, options) {
        var arr, list, map, prev;
        prev = (this.get('map')).list || [];
        list = resp.data.list || [];
        map = {};
        map[new Date() * 1] = null;
        map.list = prev.concat(list);
        arr = [];
        list.forEach((function(_this) {
          return function(val) {
            return arr.push(val.id);
          };
        })(this));
        console.log(arr);
        return {
          map: map
        };
      };

      return ProductListModel;

    })(Backbone.Model);
    return {
      getModel: function(attributes) {
        if (this.model) {
          return this.model;
        }
        return this.model = new ProductListModel(attributes);
      },
      refreshModel: function(attributes, options) {
        var e, model;
        if (attributes == null) {
          attributes = {};
        }
        if (options == null) {
          options = {};
        }
        model = this.getModel(attributes);
        try {
          delete model.attributes.list;
        } catch (_error) {
          e = _error;
        }
        model.url = App.productUrl + '/front/item/queryList.html';
        model.save(attributes, options);
        return model;
      }
    };
  });

}).call(this);
