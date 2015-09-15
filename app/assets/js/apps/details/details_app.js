(function() {
  define(['common/app', 'apps/details/details_router'], function(App, Router) {
    App.on('start', function() {
      return new Router();
    });
    console.log('details start');
    App.start();
    return App.startHistory();
  });

}).call(this);
