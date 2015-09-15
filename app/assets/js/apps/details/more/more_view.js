(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['common/app', 'tpl!apps/details/more/templates/more_view.tpl', 'marionette', 'common/widget'], function(App, TPL, Marionette, Widget) {
    var ChildView;
    return ChildView = (function(superClass) {
      extend(ChildView, superClass);

      function ChildView() {
        return ChildView.__super__.constructor.apply(this, arguments);
      }

      ChildView.prototype.id = 'module-details-more';

      ChildView.prototype.tagName = 'div';

      ChildView.prototype.template = TPL;

      ChildView.prototype.regions = {
        imgDetails: '#imgDetails',
        prodProperty: '#prodProperty',
        commenMore: '#moreCommens'
      };

      ChildView.prototype.events = {
        'click .control-item': 'gotoProdProperty'
      };

      ChildView.prototype.onDomRefresh = function() {
        return Widget.segmented(this.el);
      };

      ChildView.prototype.gotoProdProperty = function(el) {
        var currentTab;
        currentTab = $(el.currentTarget).attr('tab');
        if (currentTab === 'imgDetails') {
          return App.request('details:more:click:imgDetails');
        } else if (currentTab === 'prodProperty') {
          return App.request('details:more:click:prodProperty');
        } else {
          return App.request('details:more:click:moreCommens');
        }
      };

      return ChildView;

    })(Marionette.LayoutView);
  });

}).call(this);
