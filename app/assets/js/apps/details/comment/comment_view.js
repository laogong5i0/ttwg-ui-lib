(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['common/app', 'tpl!apps/details/comment/templates/comment.tpl', 'tpl!apps/details/comment/templates/comment_item.tpl', 'tpl!apps/details/comment/templates/comment_header.tpl', 'tpl!apps/details/comment/templates/comment_bottom.tpl', 'marionette'], function(App, TPL, TPLItem, TPLHeader, TPLBottom, Marionette) {
    var CommentBottomView, CommentContentView, CommentHeaderView, CommentsView;
    CommentContentView = (function(superClass) {
      extend(CommentContentView, superClass);

      function CommentContentView() {
        return CommentContentView.__super__.constructor.apply(this, arguments);
      }

      CommentContentView.prototype.tagName = 'li';

      CommentContentView.prototype.template = TPLItem;

      CommentContentView.prototype.className = 'table-view-cell media';

      return CommentContentView;

    })(Marionette.ItemView);
    CommentHeaderView = (function(superClass) {
      extend(CommentHeaderView, superClass);

      function CommentHeaderView() {
        return CommentHeaderView.__super__.constructor.apply(this, arguments);
      }

      CommentHeaderView.prototype.tagName = 'li';

      CommentHeaderView.prototype.template = TPLHeader;

      CommentHeaderView.prototype.className = 'table-view-cell clearfix';

      return CommentHeaderView;

    })(Marionette.ItemView);
    CommentBottomView = (function(superClass) {
      extend(CommentBottomView, superClass);

      function CommentBottomView() {
        return CommentBottomView.__super__.constructor.apply(this, arguments);
      }

      CommentBottomView.prototype.tagName = 'li';

      CommentBottomView.prototype.template = TPLBottom;

      CommentBottomView.prototype.className = 'clearfix';

      return CommentBottomView;

    })(Marionette.ItemView);
    return CommentsView = (function(superClass) {
      extend(CommentsView, superClass);

      function CommentsView() {
        return CommentsView.__super__.constructor.apply(this, arguments);
      }

      CommentsView.prototype.id = 'module-details-comment';

      CommentsView.prototype.childViewContainer = 'ul';

      CommentsView.prototype.tagName = 'div';

      CommentsView.prototype.template = TPL;

      CommentsView.prototype.getChildView = function(item) {
        if (item.get('headerData')) {
          return CommentHeaderView;
        } else if (item.get('bottomData')) {
          return CommentBottomView;
        } else {
          return CommentContentView;
        }
      };

      return CommentsView;

    })(Marionette.CompositeView);
  });

}).call(this);
