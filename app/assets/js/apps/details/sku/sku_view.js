(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['common/app', 'tpl!apps/details/sku/templates/sku_view.tpl', 'marionette'], function(App, TPL, Marionette) {
    var ChildView;
    return ChildView = (function(superClass) {
      extend(ChildView, superClass);

      function ChildView() {
        return ChildView.__super__.constructor.apply(this, arguments);
      }

      ChildView.prototype.tagName = 'dialog';

      ChildView.prototype.template = TPL;

      ChildView.prototype.className = 'sku';

      ChildView.prototype.events = {
        'click .close': 'closeSelf',
        'click #skuDecrease': 'decrease',
        'click #skuPlus': 'plus'
      };

      ChildView.prototype.decrease = function() {
        this.productNum = parseInt(this.$('.num-display').text());
        return this.$('.num-display').text(this.productNum - 1);
      };

      ChildView.prototype.plus = function() {
        this.productNum = parseInt(this.$('.num-display').text());
        return this.$('.num-display').text(this.productNum + 1);
      };

      ChildView.prototype.closeSelf = function() {
        return App.navigate('#productdetails/2', true);
      };

      ChildView.prototype.onDomRefresh = function() {};

      ChildView.prototype.onShow = function() {};

      ChildView.prototype.onRender = function() {};

      return ChildView;

    })(Marionette.LayoutView);
  });

}).call(this);
