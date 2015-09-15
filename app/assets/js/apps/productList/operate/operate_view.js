(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['marionette', 'common/app', 'tpl!apps/productList/operate/templates/operate_view.tpl', 'common/ScrollPage'], function(Marionette, App, tpl, ScrollPage) {
    var OperateView;
    return OperateView = (function(superClass) {
      extend(OperateView, superClass);

      function OperateView() {
        return OperateView.__super__.constructor.apply(this, arguments);
      }

      OperateView.prototype.template = tpl;

      OperateView.prototype.tagName = 'div';

      OperateView.prototype.regions = {
        list: '.table-view'
      };

      OperateView.prototype.className = 'product-list-wapper';

      OperateView.prototype.ui = {
        synthesis: '#synthesis',
        volume: '#volume',
        price: '#price',
        listStyle: '#listStyle'
      };

      OperateView.prototype.events = {
        'touchend @ui.synthesis': 'synthesis',
        'touchend @ui.volume': 'volume',
        'touchend @ui.price': 'price',
        'touchend @ui.listStyle': 'listStyle'
      };

      OperateView.prototype.status = {
        synthesis: true,
        volume: true,
        price: true
      };

      OperateView.prototype.sortMap = {
        synthesis: 1,
        volume: 2,
        price: 3
      };

      OperateView.prototype.initialize = function(options) {
        this.listenTo(this.model, 'change:sort', this.sortChange);
        this.listenTo(this.model, 'change:sc', this.sortChange);
        return this.listenTo(this.model, 'change:map', this.pageChange);
      };

      OperateView.prototype.synthesis = function(event) {
        return this.setModel('synthesis');
      };

      OperateView.prototype.volume = function(event) {
        return this.setModel('volume');
      };

      OperateView.prototype.price = function(event) {
        return this.setModel('price');
      };

      OperateView.prototype.sortChange = function(args) {
        return App.request('fetchModel', this.model.toJSON());
      };

      OperateView.prototype.pageChange = function(args) {
        return console.log('page change');
      };

      OperateView.prototype.listStyle = function(event) {};

      OperateView.prototype.onRender = function(view) {};

      OperateView.prototype.setModel = function(name) {
        var sc;
        sc = this.statusChange(name);
        return this.model.set({
          sort: this.sortMap[name],
          sc: sc
        });
      };

      OperateView.prototype.statusChange = function(name) {
        this.status[name] = !this.status[name];
        if (this.status[name]) {
          return 2;
        } else {
          return 1;
        }
      };

      return OperateView;

    })(Marionette.LayoutView);
  });

}).call(this);
