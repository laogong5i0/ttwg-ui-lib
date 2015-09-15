(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['common/app', 'marionette', 'apps/signIn/signIn/signIn_controller', 'apps/signIn/signUp/signUp_controller'], function(App, Marionette, SignInController, SignUpController) {
    var SignInRouter;
    return SignInRouter = (function(superClass) {
      extend(SignInRouter, superClass);

      function SignInRouter() {
        return SignInRouter.__super__.constructor.apply(this, arguments);
      }

      SignInRouter.prototype.routes = {
        '': 'SignIn',
        'signUp': 'SingUp'
      };

      SignInRouter.prototype.SignIn = function() {
        return new SignInController;
      };

      SignInRouter.prototype.SingUp = function() {
        return new SignUpController;
      };

      return SignInRouter;

    })(Marionette.AppRouter);
  });

}).call(this);
