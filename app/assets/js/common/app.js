(function() {
  define(['common/application'], function(Application) {
    var App;
    if (window.App) {
      return window.App;
    }
    App = new Application;
    App.addRegions({
      mainRegion: '#main-region',
      dialogRegion: '#dialog-region'
    });
    return window.App = App;
  });

}).call(this);
