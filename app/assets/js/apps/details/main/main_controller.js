(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['common/app', 'marionette', 'apps/details/main/main_view', 'apps/details/info/info_controller', 'apps/details/comment/comment_controller', 'apps/details/slider/slider_controller', 'apps/details/more/more_controller', 'entities/product', 'common/ttwg', 'entities/submit_shoping_cart'], function(App, Marionette, MainView, InfoController, CommentController, SliderController, MoreController, Product, Ttwg, ShopingCart) {
    var MainApp;
    return MainApp = (function(superClass) {
      extend(MainApp, superClass);

      function MainApp() {
        this.addToCart = bind(this.addToCart, this);
        return MainApp.__super__.constructor.apply(this, arguments);
      }

      MainApp.prototype.productId = null;

      MainApp.prototype.userId = null;

      MainApp.prototype.initialize = function(options) {
        if (options == null) {
          options = {};
        }
        this.productId = options.productId;
        this.userId = options.userId;
        App.reqres.setHandler('details:main:click:addToCart', this.addToCart);
        this.mainView = new MainView;
        App.mainRegion.show(this.mainView);
        return this.updateView();
      };

      MainApp.prototype.updateView = function() {
        var commentController, data, moreController, productModel, sliderController;
        data = {
          itemId: this.productId,
          userId: this.userId
        };
        productModel = Product.getDetials({
          data: data,
          success: (function(_this) {
            return function(model, resp, options) {
              var infoController;
              return infoController = new InfoController({
                model: model,
                region: _this.mainView.infoRegion
              });
            };
          })(this)
        });
        commentController = new CommentController({
          entityId: this.productId,
          entityType: 1,
          region: this.mainView.commentRegion
        });
        sliderController = new SliderController({
          imageList: ['http://placehold.it/320x480', 'http://placehold.it/320x480'],
          region: this.mainView.sliderRegion
        });
        return moreController = new MoreController({
          model: null,
          region: this.mainView.moreRegion
        });
      };

      MainApp.prototype.addToCart = function() {
        debugger;
        var data, userid;
        userid = this.isSignIn();
        data = {
          buyerId: userid,
          shopingcartItemList: '321'
        };
        console.log('addToCart');
        this.shopingCart = new ShopingCart();
        return this.shopingCart.save(data, {
          success: (function(_this) {
            return function(model, resp, options) {
              return console.log('add to cart success', resp);
            };
          })(this)
        });
      };

      MainApp.prototype.isSignIn = function() {
        var userid;
        userid = ttwg.cookie.getCookie('userId');
        if (!userid) {
          return false;
        }
        return userid;
      };

      return MainApp;

    })(Marionette.Controller);
  });

}).call(this);
