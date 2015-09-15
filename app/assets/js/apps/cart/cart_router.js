(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['common/app', 'marionette', 'apps/cart/main/main_controller'], function(App, Marionette, MainController) {
    var MainApp;
    return MainApp = (function(superClass) {
      extend(MainApp, superClass);

      function MainApp() {
        return MainApp.__super__.constructor.apply(this, arguments);
      }

      MainApp.prototype.routes = {
        '': 'defaultPage',
        'sku/:id': 'skupage'
      };

      MainApp.prototype.defaultPage = function(id) {
        console.log('defaultPage');
        return this.mainController = new MainController();
      };

      MainApp.prototype.skupage = function(id) {};

      return MainApp;

    })(Marionette.AppRouter);
  });

}).call(this);
