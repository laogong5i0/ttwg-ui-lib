(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['common/app', 'marionette', 'apps/main/child/child_view', 'entities/user'], function(App, Marionette, ChildView, User) {
    var MainApp;
    return MainApp = (function(superClass) {
      extend(MainApp, superClass);

      function MainApp() {
        return MainApp.__super__.constructor.apply(this, arguments);
      }

      MainApp.prototype.initialize = function(options) {
        if (options == null) {
          options = {};
        }
        return this.updateView();
      };

      MainApp.prototype.updateView = function() {
        var data, model;
        data = {
          channelAccount: "620005858",
          channelPassword: "123456"
        };
        return model = User.signIn(data, {
          success: (function(_this) {
            return function(model, resp, options) {
              var view;
              view = _this.getView(model);
              return App.mainRegion.show(view);
            };
          })(this)
        });
      };

      MainApp.prototype.getView = function(model) {
        return new ChildView({
          model: model
        });
      };

      return MainApp;

    })(Marionette.Controller);
  });

}).call(this);
