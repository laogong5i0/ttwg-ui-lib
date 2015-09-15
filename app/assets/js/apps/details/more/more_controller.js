(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['common/app', 'marionette', 'apps/details/more/more_view', 'apps/details/more/prod_property_view', 'apps/details/slider/slider_controller', 'apps/details/comment/comment_details_controller'], function(App, Marionette, MoreView, ProdPropertyView, SliderController, CommentController) {
    var MoreController;
    return MoreController = (function(superClass) {
      extend(MoreController, superClass);

      function MoreController() {
        this.gotoMoreCommens = bind(this.gotoMoreCommens, this);
        this.gotoProdProperty = bind(this.gotoProdProperty, this);
        this.gotoImageDetails = bind(this.gotoImageDetails, this);
        return MoreController.__super__.constructor.apply(this, arguments);
      }

      MoreController.prototype.model = null;

      MoreController.prototype.region = null;

      MoreController.prototype.initialize = function(options) {
        this.region = options.region;
        this.model = options.model;
        App.reqres.setHandler('details:more:click:imgDetails', this.gotoImageDetails);
        App.reqres.setHandler('details:more:click:prodProperty', this.gotoProdProperty);
        App.reqres.setHandler('details:more:click:moreCommens', this.gotoMoreCommens);
        this.initView();
        return this.gotoImageDetails();
      };

      MoreController.prototype.initView = function() {
        this.viewMain = this.getView();
        return this.region.show(this.viewMain);
      };

      MoreController.prototype.getView = function(model) {
        return new MoreView();
      };

      MoreController.prototype.gotoImageDetails = function() {
        if (this.imageDetails) {
          return;
        }
        return this.imageDetails = new SliderController({
          imageList: ['http://placehold.it/320x480', 'http://placehold.it/320x480'],
          region: this.viewMain.imgDetails
        });
      };

      MoreController.prototype.gotoProdProperty = function() {
        if (this.prodProperty) {
          return;
        }
        this.prodProperty = new ProdPropertyView();
        return this.viewMain.prodProperty.show(this.prodProperty);
      };

      MoreController.prototype.gotoMoreCommens = function() {
        if (this.commentController) {
          return;
        }
        return this.commentController = new CommentController({
          entityId: 2,
          entityType: 1,
          region: this.viewMain.commenMore
        });
      };

      return MoreController;

    })(Marionette.Controller);
  });

}).call(this);
