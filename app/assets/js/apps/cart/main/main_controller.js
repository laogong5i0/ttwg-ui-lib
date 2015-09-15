(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['common/app', 'marionette', 'common/ttwg', 'apps/cart/main/main_view', 'apps/cart/main/tips_view', 'apps/cart/main/emptycart_view', 'entities/submit_shoping_cart'], function(App, Marionette, ttwg, MainView, Tips, EmptyCart, ShopingCart) {
    var MainApp;
    return MainApp = (function(superClass) {
      extend(MainApp, superClass);

      function MainApp() {
        return MainApp.__super__.constructor.apply(this, arguments);
      }

      MainApp.prototype.initialize = function(options) {
        if (options == null) {
          options = {};
        }
        this.mainView = new MainView;
        App.mainRegion.show(this.mainView);
        return this.showContent();
      };

      MainApp.prototype.isLogin = function() {
        this.userid = ttwg.cookie.getCookie('userId');
        if (!this.userid) {
          return false;
        }
        return true;
      };

      MainApp.prototype.isEmptyCart = function() {
        return false;
      };

      MainApp.prototype.showContent = function() {
        var childView, contentView;
        if (!this.isLogin()) {
          if (this.isEmptyCart()) {
            childView = new Tips({
              model: new Backbone.Model({
                tips: '点击登录后，您可以同步电脑和手机购物车中的商品'
              })
            });
            return this.mainView.tips.show(childView);
          } else {
            childView = new Tips({
              model: new Backbone.Model({
                tips: '登录后再付款，可以随时跟踪物流哦！'
              })
            });
            return this.mainView.tips.show(childView);
          }
        } else {
          if (this.isEmptyCart()) {
            contentView = new EmptyCart();
            return this.mainView.cartContent.show(contentView);
          } else {
            return console.log('have products in cart');
          }
        }
      };

      return MainApp;

    })(Marionette.Controller);
  });

}).call(this);
