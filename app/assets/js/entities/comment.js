(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['common/app', 'marionette'], function(App, Marionette) {
    var CommentCollection, CommentModel;
    CommentModel = (function(superClass) {
      extend(CommentModel, superClass);

      function CommentModel() {
        return CommentModel.__super__.constructor.apply(this, arguments);
      }

      return CommentModel;

    })(Backbone.Model);
    return CommentCollection = (function(superClass) {
      extend(CommentCollection, superClass);

      function CommentCollection() {
        return CommentCollection.__super__.constructor.apply(this, arguments);
      }

      CommentCollection.prototype.model = CommentModel;

      CommentCollection.prototype.parse = function(resp) {
        console.log('%comment响应数据：', "color:blue", resp);
        if (!resp.isSuccess) {
          return CommentCollection.__super__.parse.call(this, resp);
        }
        resp = resp.data.pageData.list;
        return CommentCollection.__super__.parse.call(this, resp);
      };

      CommentCollection.prototype.url = App.commentUrl + '/comment/query/listComment.html';

      return CommentCollection;

    })(Backbone.Collection);
  });

}).call(this);
