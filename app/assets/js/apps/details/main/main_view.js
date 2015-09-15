(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['common/app', 'tpl!apps/details/main/templates/main_view.tpl', 'marionette', 'common/toast'], function(App, TPL, Marionette, Toast) {
    var ChildView;
    return ChildView = (function(superClass) {
      extend(ChildView, superClass);

      function ChildView() {
        return ChildView.__super__.constructor.apply(this, arguments);
      }

      ChildView.prototype.id = 'module-details-main';

      ChildView.prototype.tagName = 'div';

      ChildView.prototype.template = TPL;

      ChildView.prototype.regions = {
        sliderRegion: '#sliderRegion',
        infoRegion: '#infoRegion',
        commentRegion: '#commentRegion',
        moreRegion: '#moreRegion'
      };

      ChildView.prototype.events = {
        'click #addToCart': 'carEntrance'
      };

      ChildView.prototype.carEntrance = function() {
        App.request('details:main:click:addToCart');
        return new Toast('已添加到购物车');
      };

      return ChildView;

    })(Marionette.LayoutView);
  });

}).call(this);
