(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['common/app', 'tpl!apps/cart/main/templates/main_view.tpl', 'marionette'], function(App, TPL, Marionette) {
    var ChildView;
    return ChildView = (function(superClass) {
      extend(ChildView, superClass);

      function ChildView() {
        return ChildView.__super__.constructor.apply(this, arguments);
      }

      ChildView.prototype.id = 'module-cart-main';

      ChildView.prototype.tagName = 'div';

      ChildView.prototype.template = TPL;

      ChildView.prototype.regions = {
        tips: '#tips',
        cartContent: '#cartContent'
      };

      return ChildView;

    })(Marionette.LayoutView);
  });

}).call(this);
