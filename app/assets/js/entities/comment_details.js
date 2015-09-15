(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['common/app', 'marionette'], function(App, Marionette) {
    var CommentDetailsCollection, CommentDetailsItemModel;
    CommentDetailsItemModel = (function(superClass) {
      extend(CommentDetailsItemModel, superClass);

      function CommentDetailsItemModel() {
        return CommentDetailsItemModel.__super__.constructor.apply(this, arguments);
      }

      return CommentDetailsItemModel;

    })(Backbone.Model);
    return CommentDetailsCollection = (function(superClass) {
      extend(CommentDetailsCollection, superClass);

      function CommentDetailsCollection() {
        return CommentDetailsCollection.__super__.constructor.apply(this, arguments);
      }

      CommentDetailsCollection.prototype.model = CommentDetailsItemModel;

      CommentDetailsCollection.prototype.parse = function(resp) {
        console.log('%comment响应数据：', "color:blue", resp);
        resp = resp.data.pageData.list;
        return CommentDetailsCollection.__super__.parse.call(this, resp);
      };

      CommentDetailsCollection.prototype.url = App.commentUrl + '/comment/query/listComment.html';

      return CommentDetailsCollection;

    })(Backbone.Collection);
  });

}).call(this);
