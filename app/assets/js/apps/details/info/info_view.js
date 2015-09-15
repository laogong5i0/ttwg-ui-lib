(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['common/app', 'tpl!apps/details/info/templates/info_view.tpl', 'marionette'], function(App, TPL, Marionette) {
    var ChildView;
    return ChildView = (function(superClass) {
      extend(ChildView, superClass);

      function ChildView() {
        this.gotoSku = bind(this.gotoSku, this);
        return ChildView.__super__.constructor.apply(this, arguments);
      }

      ChildView.prototype.tagName = 'div';

      ChildView.prototype.template = TPL;

      ChildView.prototype.events = {
        'click #sku': "gotoSku"
      };

      ChildView.prototype.gotoSku = function() {
        return App.navigate("#sku/" + (this.model.get('id')), true);
      };

      return ChildView;

    })(Marionette.LayoutView);
  });

}).call(this);
