(function() {
  define(['common/app', 'apps/cart/cart_router'], function(App, Router) {
    App.on('start', function() {
      return new Router();
    });
    console.log('cart start');
    App.start();
    return App.startHistory();
  });

}).call(this);
