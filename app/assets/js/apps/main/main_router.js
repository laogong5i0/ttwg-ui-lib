(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['common/app', 'marionette', 'apps/main/child/child_controller'], function(App, Marionette, ChildController) {
    var MainApp;
    return MainApp = (function(superClass) {
      extend(MainApp, superClass);

      function MainApp() {
        return MainApp.__super__.constructor.apply(this, arguments);
      }

      MainApp.prototype.routes = {
        '': 'main',
        'childpage': 'childPage'
      };

      MainApp.prototype.main = function() {
        console.log('main------>>1');
        return new ChildController;
      };

      MainApp.prototype.childPage = function() {
        return console.log('main child page ------->>');
      };

      return MainApp;

    })(Marionette.AppRouter);
  });

}).call(this);
