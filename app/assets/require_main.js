require.config({
  baseUrl: 'assets',
  urlArgs: 'bust=' + Math.random(),
  paths: {
    backbone: '../lib/backbone-amd/backbone',
    jquery: '../lib/jquery/jquery',
    json2: '../lib/json2/json2',
    underscore: '../lib/underscore/underscore',
    marionette: '../lib/backbone.marionette/lib/backbone.marionette',
    tpl: '../lib/requirejs-tpl/tpl',
    localstorage: '../lib/backbone.localstorage/backbone.localstorage',
    swiper: '../lib/swiper/dist/idangerous.swiper',
    common: 'js/common',
    apps: 'js/apps',
    entities: 'js/entities'
  },
  shim: {
    jquery: {
      exports: '$'
    },
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['jquery', 'underscore', 'json2'],
      exports: 'Backbone'
    },
    marionette: {
      deps: ['backbone'],
      exports: 'Marionette'
    }
  }
});

require([window.page], function(App) {
  return console.log("start app");
});
