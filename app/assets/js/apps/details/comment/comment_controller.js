(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['common/app', 'marionette', 'apps/details/comment/comment_view', 'entities/comment'], function(App, Marionette, CommentView, Comment) {
    var CommentController;
    return CommentController = (function(superClass) {
      extend(CommentController, superClass);

      function CommentController() {
        this.renderCommentHeaderAndBottom = bind(this.renderCommentHeaderAndBottom, this);
        return CommentController.__super__.constructor.apply(this, arguments);
      }

      CommentController.prototype.pageSize = 2;

      CommentController.prototype.pageNO = 1;

      CommentController.prototype.totalPage = 1;

      CommentController.prototype.entityId = null;

      CommentController.prototype.entityType = null;

      CommentController.prototype.region = null;

      CommentController.prototype.initialize = function(options) {
        this.region = options.region;
        this.entityId = options.entityId;
        this.entityType = options.entityType;
        return this.initView();
      };

      CommentController.prototype.initView = function() {
        var commentModel;
        commentModel = this.loadPage(this.entityId, 1);
        this.commentView = this.getCommentView(commentModel);
        this.region.show(this.commentView);
        return this.nextPage();
      };

      CommentController.prototype.nextPage = function() {
        this.pageNO += 1;
        if (this.pageNO >= this.totalPage) {
          return;
        }
        return this.loadPage(this.entityId, this.pageNO);
      };

      CommentController.prototype.loadPage = function(entityId, pageNO) {
        var commentModel;
        if (pageNO == null) {
          pageNO = 1;
        }
        commentModel = new Comment();
        commentModel.fetch({
          data: {
            entityId: entityId,
            pageSize: this.pageSize,
            pageNO: pageNO,
            entityType: this.entityType
          },
          remove: false,
          success: this.renderCommentHeaderAndBottom
        });
        return commentModel;
      };

      CommentController.prototype.renderCommentHeaderAndBottom = function(Controller, resp, options) {
        var bottomModel, headerModel;
        this.totalPage = resp.data.pageData.totalPage;
        this.pageNO = resp.data.pageData.pageNO;
        if (this.pageNO >= 2) {
          return;
        }
        headerModel = new Backbone.Model({
          headerData: resp.data.pageData.totalNum
        });
        this.commentView.collection.add(headerModel, {
          at: 0
        });
        bottomModel = new Backbone.Model({
          bottomData: resp.data.pageData.totalNum
        });
        return this.commentView.collection.add(bottomModel);
      };

      CommentController.prototype.getCommentView = function(collection) {
        var commentView;
        return commentView = new CommentView({
          collection: collection
        });
      };

      return CommentController;

    })(Marionette.Controller);
  });

}).call(this);
