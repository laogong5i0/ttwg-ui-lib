(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['marionette', 'tpl!apps/productList/list/templates/list_view.tpl'], function(Marionette, tpl) {
    var ProductView;
    return ProductView = (function(superClass) {
      extend(ProductView, superClass);

      function ProductView() {
        return ProductView.__super__.constructor.apply(this, arguments);
      }

      ProductView.prototype.template = tpl;

      return ProductView;

    })(Marionette.ItemView.extend);
  });

}).call(this);
