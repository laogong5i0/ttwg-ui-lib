(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['common/app', 'tpl!apps/details/main/templates/comment.tpl', 'tpl!apps/details/main/templates/comment_item.tpl', 'marionette'], function(App, TPL, TPLItem, Marionette) {
    var CommentView, CommentsView;
    CommentView = (function(superClass) {
      extend(CommentView, superClass);

      function CommentView() {
        return CommentView.__super__.constructor.apply(this, arguments);
      }

      CommentView.prototype.tagName = 'li';

      CommentView.prototype.template = TPLItem;

      return CommentView;

    })(Marionette.ItemView);
    return CommentsView = (function(superClass) {
      extend(CommentsView, superClass);

      function CommentsView() {
        return CommentsView.__super__.constructor.apply(this, arguments);
      }

      CommentsView.prototype.id = 'module-child-comment';

      CommentsView.prototype.childView = CommentView;

      CommentsView.prototype.childViewContainer = 'ul';

      CommentsView.prototype.tagName = 'div';

      CommentsView.prototype.template = TPL;

      return CommentsView;

    })(Marionette.CompositeView);
  });

}).call(this);
