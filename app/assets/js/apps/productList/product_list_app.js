(function() {
  define(['common/app', 'apps/productList/product_list_router'], function(App, Router) {
    App.on('start', function() {
      return new Router();
    });
    App.addRegions({
      operateRegion: '#operate-region',
      listRegion: '#list-region'
    });
    App.start();
    App.startHistory();
    return App;
  });

}).call(this);
