(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['common/app', 'marionette'], function(App, Marionette) {
    var CommentModel;
    return CommentModel = (function(superClass) {
      extend(CommentModel, superClass);

      function CommentModel() {
        return CommentModel.__super__.constructor.apply(this, arguments);
      }

      CommentModel.prototype.parse = function(resp) {
        console.log('%提交购物车响应数据：', "color:blue", resp);
        return CommentModel.__super__.parse.call(this, resp);
      };

      CommentModel.prototype.url = App.trade + '/trade/order/submitShopingCartInfo.html';

      return CommentModel;

    })(Backbone.Model);
  });

}).call(this);
