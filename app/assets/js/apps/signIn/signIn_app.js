(function() {
  define(['common/app', 'apps/signIn/signIn_router'], function(App, Router) {
    App.on('start', function() {
      return new Router();
    });
    App.start();
    return App.startHistory();
  });

}).call(this);
