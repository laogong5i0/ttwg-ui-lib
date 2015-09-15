(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['common/app', 'tpl!apps/details/comment/templates/comment_details_view.tpl', 'tpl!apps/details/comment/templates/comment_details_item_view.tpl', 'marionette'], function(App, TPL, TPLItem, Marionette) {
    var CommentContentView, CommentsView;
    CommentContentView = (function(superClass) {
      extend(CommentContentView, superClass);

      function CommentContentView() {
        return CommentContentView.__super__.constructor.apply(this, arguments);
      }

      CommentContentView.prototype.tagName = 'li';

      CommentContentView.prototype.template = TPLItem;

      CommentContentView.prototype.className = 'table-view-cell media';

      CommentContentView.prototype.templateHelpers = function() {
        return {
          skuInfo: function() {
            var str;
            str = this.entityInfo.skuText;
            return str.replace(';', ' ');
          },
          buyTime: function() {
            var date, str;
            date = new Date(this.entityInfo.orderTime);
            return str = date.getFullYear().toString() + '-' + date.getMonth().toString() + '-' + date.getDate().toString();
          },
          orderTime: function() {
            var date, str;
            date = new Date(this.entityInfo.orderTime);
            str = date.getFullYear().toString() + '-' + date.getMonth().toString() + '-' + date.getDate().toString() + ' ';
            return str += date.getHours().toString() + ':' + date.getMinutes().toString() + ':' + date.getSeconds().toString();
          }
        };
      };

      return CommentContentView;

    })(Marionette.ItemView);
    return CommentsView = (function(superClass) {
      extend(CommentsView, superClass);

      function CommentsView() {
        return CommentsView.__super__.constructor.apply(this, arguments);
      }

      CommentsView.prototype.childView = CommentContentView;

      CommentsView.prototype.childViewContainer = 'ul';

      CommentsView.prototype.tagName = 'div';

      CommentsView.prototype.template = TPL;

      return CommentsView;

    })(Marionette.CompositeView);
  });

}).call(this);
