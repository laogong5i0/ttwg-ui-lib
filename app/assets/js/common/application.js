(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['marionette', 'common/sync'], function(Marionette) {
    var Application;
    return Application = (function(superClass) {
      extend(Application, superClass);

      function Application() {
        return Application.__super__.constructor.apply(this, arguments);
      }

      Application.prototype.navigate = function(route, options) {
        if (options == null) {
          options = {};
        }
        return Backbone.history.navigate(route, options);
      };

      Application.prototype.startHistory = function() {
        if (Backbone.history) {
          return Backbone.history.start();
        }
      };

      Application.prototype.showDialog = function(view, type) {
        var top;
        if (type == null) {
          type = 'none';
        }
        this.dialogRegion.$el.show();
        if (type === 'modal') {
          view.$el.addClass('modal');
          this.dialogRegion.show(view);
          setTimeout((function(_this) {
            return function() {
              return view.$el.addClass('active');
            };
          })(this), 10);
        } else {
          this.dialogRegion.show(view);
          top = (this.dialogRegion.$el.height() - view.$el.height()) / 2;
          view.$el.css('top', top);
        }
        this.currentDialogType = type;
        return this.currentDialogView = view;
      };

      Application.prototype.closeDialog = function() {
        if (this.currentDialogType === 'modal') {
          this.currentDialogView.$el.removeClass('active');
          return setTimeout((function(_this) {
            return function() {
              return _this.dialogRegion.$el.hide();
            };
          })(this), 250);
        }
      };

      Application.prototype.productUrl = 'http://item.ttwg.com';

      Application.prototype.userUrl = 'http://user.ttwg.com';

      Application.prototype.commentUrl = 'http://comment.ttwg.com';

      Application.prototype.trade = 'http://trade.ttwg.com';

      return Application;

    })(Marionette.Application);
  });

}).call(this);
