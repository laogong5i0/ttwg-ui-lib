(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['marionette', 'tpl!apps/signIn/signIn/templates/signIn_view.tpl', 'entities/user'], function(Marionette, tpl, User) {
    var SignInView;
    return SignInView = (function(superClass) {
      extend(SignInView, superClass);

      function SignInView() {
        return SignInView.__super__.constructor.apply(this, arguments);
      }

      SignInView.prototype.template = tpl;

      SignInView.prototype.initialize = function(attributes) {
        if (attributes == null) {
          attributes = {};
        }
        attributes.isSignIn = true;
        return this.model = User.signIn(attributes);
      };

      return SignInView;

    })(Marionette.ItemView);
  });

}).call(this);
