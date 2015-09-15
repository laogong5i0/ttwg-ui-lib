(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['common/app', 'marionette', 'apps/details/main/main_view', 'apps/details/main/details_view', 'entities/product', 'apps/details/main/comment_view', 'entities/comment'], function(App, Marionette, MainView, DetailsView, Product, CommentView, Comment) {
    var MainApp;
    return MainApp = (function(superClass) {
      extend(MainApp, superClass);

      function MainApp() {
        this.renderCommentHeader = bind(this.renderCommentHeader, this);
        return MainApp.__super__.constructor.apply(this, arguments);
      }

      MainApp.prototype.initialize = function(options) {
        if (options == null) {
          options = {};
        }
        this.mainView = new MainView;
        App.mainRegion.show(this.mainView);
        return this.updateView();
      };

      MainApp.prototype.updateView = function() {
        var commentModel, commentView, data, productModel;
        data = {
          itemId: 2
        };
        productModel = Product.getDetials(data, {
          success: (function(_this) {
            return function(model, resp, options) {
              var view;
              view = _this.getView(model);
              return _this.mainView.infoRegion.show(view);
            };
          })(this)
        });
        commentModel = Comment.getComment({
          data: {
            entityId: 1,
            pageSize: 5,
            pageNO: 1
          },
          success: this.renderCommentHeader
        });
        commentView = this.getCommentView(commentModel);
        return this.mainView.commentRegion.show(commentView);
      };

      MainApp.prototype.renderCommentHeader = function(Controller, resp, options) {
        return console.log('---->>>>>>', resp);
      };

      MainApp.prototype.getView = function(model) {
        return new DetailsView({
          model: model
        });
      };

      MainApp.prototype.getCommentView = function(collection) {
        var commentView;
        return commentView = new CommentView({
          collection: collection
        });
      };

      return MainApp;

    })(Marionette.Controller);
  });

}).call(this);
