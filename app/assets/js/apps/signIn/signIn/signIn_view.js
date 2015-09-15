(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['common/app', 'marionette', 'tpl!apps/signIn/signIn/templates/signIn_view.tpl', 'entities/user'], function(App, Marionette, tpl, User) {
    var SignInView;
    return SignInView = (function(superClass) {
      extend(SignInView, superClass);

      function SignInView() {
        return SignInView.__super__.constructor.apply(this, arguments);
      }

      SignInView.prototype.template = tpl;

      SignInView.prototype.ui = {
        accountInput: '#getAccount',
        passwordInput: '#getPassword',
        sendRequest: '#sendRequest'
      };

      SignInView.prototype.events = {
        'click #getPasswordFromServer': 'getPasswordFromServer',
        'input @ui.accountInput': 'getAccount',
        'input @ui.passwordInput': 'getPassword',
        'click @ui.sendRequest': 'sendRequest'
      };

      SignInView.prototype.checkMsg = {
        account: '请输入正确的手机号码',
        password: '验证码格式不正确'
      };

      SignInView.prototype.initialize = function(attributes) {
        if (attributes == null) {
          attributes = {};
        }
        attributes.isSignIn = true;
        this.model = User.signIn(attributes);
        return this.model.set({
          'account': null,
          'password': null
        });
      };

      SignInView.prototype.parse = function(node) {
        return node.value.trim();
      };

      SignInView.prototype.invoker = function(handler, attrName, args) {
        var ret;
        ret = this.invokeAppHandler(handler, args);
        if (!ret) {
          this.message(attrName);
        }
        return this.model.set(attrName, ret);
      };

      SignInView.prototype.getPasswordFromServer = function() {
        console.log('getPasswordFromServer');
        this.getAccount();
        return this.invokeAppHandler('signInViewGetPassword', this.model);
      };

      SignInView.prototype.invokeAppHandler = function(handler, args) {
        return App.request(handler, args);
      };

      SignInView.prototype.getAccount = function() {
        this.invoker('signInViewCheckAccount', 'account', this.parse(this.ui.accountInput[0]));
        return this.modifyUi();
      };

      SignInView.prototype.getPassword = function() {
        this.invoker('signInViewCheckPassword', 'password', this.parse(this.ui.passwordInput[0]));
        return this.modifyUi();
      };

      SignInView.prototype.modifyUi = function() {
        var fn;
        fn = this.model.get('account') && this.model.get('password') ? 'remove' : 'add';
        fn = fn + 'Class';
        return this.ui.sendRequest[fn]('btn-outlined');
      };

      SignInView.prototype.sendRequest = function() {
        console.log('sendRequest');
        this.getAccount();
        this.getPassword();
        return this.invokeAppHandler('signInViewSendRequest', this.model);
      };

      SignInView.prototype.message = function(attrName) {
        return console.log(this.checkMsg[attrName]);
      };

      return SignInView;

    })(Marionette.ItemView);
  });

}).call(this);
