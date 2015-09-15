(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['common/app', 'marionette', 'apps/signIn/signIn/signIn_view', 'jquery', 'common/ttwg'], function(App, Marionette, SignInView, $, Ttwg) {
    var SignInController;
    return SignInController = (function(superClass) {
      extend(SignInController, superClass);

      function SignInController() {
        return SignInController.__super__.constructor.apply(this, arguments);
      }

      SignInController.prototype.checkRegExp = {
        account: /^1[358][0-9]{9}$/,
        password: /^[0-9]{6}$/
      };

      SignInController.prototype.initialize = function(options) {
        if (options == null) {
          options = {};
        }
        this.view = App.mainRegion.show(new SignInView(options));
        if (App.reqres.setHandler('signInViewCheckAccount')) {
          return this;
        }
        App.reqres.setHandler('signInViewCheckAccount', this.checkAccount, this);
        App.reqres.setHandler('signInViewCheckPassword', this.checkPassword, this);
        App.reqres.setHandler('signInViewGetPassword', this.getPassword, this);
        App.reqres.setHandler('signInViewSendRequest', this.sendRequest, this);
        return this;
      };

      SignInController.prototype.getPassword = function(model) {
        var data;
        if (model == null) {
          model = {};
        }
        data = {
          mobileNum: model.get('account'),
          type: model.captchaType
        };
        return data.mobileNum && this.sendAjax(model.getvfcodeUrl, data, (function(_this) {
          return function(resp) {
            console.log('kkkkkkk');
            if (!resp.isSuccess) {
              return _this.message(resp.message);
            }
          };
        })(this));
      };

      SignInController.prototype.checkAccount = function(phone) {
        if (this.checkRegExp.account.test(phone)) {
          return phone;
        } else {
          return null;
        }
      };

      SignInController.prototype.checkPassword = function(captcha) {
        if (this.checkRegExp.password.test(captcha)) {
          return captcha;
        } else {
          return null;
        }
      };

      SignInController.prototype.sendRequest = function(model) {
        var account, data, e, password;
        account = model.get('account');
        try {
          password = parseInt(model.get('password'));
        } catch (_error) {
          e = _error;
          password = null;
        }
        if (!(account && password)) {
          return null;
        }
        data = {
          userType: model.userType,
          type: model.type,
          mobileNum: account,
          verifyCode: password
        };
        return this.sendAjax(model.url, data, (function(_this) {
          return function(resp) {
            if (!resp.isSuccess) {
              return _this.message(resp.message);
            }
          };
        })(this));
      };

      SignInController.prototype.sendAjax = function(url, data, success) {
        return $.ajax({
          url: url,
          data: JSON.stringify(data),
          type: 'POST',
          contentType: 'application/json',
          success: success
        });
      };

      SignInController.prototype.message = function(msg) {
        return alert(msg);
      };

      return SignInController;

    })(Marionette.Controller);
  });

}).call(this);
