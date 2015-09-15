(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['common/app', 'marionette', 'tpl!apps/details/slider/templates/slider_view.tpl'], function(App, Marionette, TPL) {
    var ChildView;
    return ChildView = (function(superClass) {
      extend(ChildView, superClass);

      function ChildView() {
        return ChildView.__super__.constructor.apply(this, arguments);
      }

      ChildView.prototype.tagName = 'div';

      ChildView.prototype.template = TPL;

      ChildView.prototype.className = 'swiper-container';

      ChildView.prototype.onDomRefresh = function() {
        var swiper;
        return swiper = new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          slidesPerView: 1,
          paginationClickable: true,
          spaceBetween: 15,
          loop: true
        });
      };

      return ChildView;

    })(Marionette.ItemView);
  });

}).call(this);
