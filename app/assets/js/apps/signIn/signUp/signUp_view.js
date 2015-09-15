(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['marionette', 'tpl!apps/signIn/signUp/templates/signUp_view.tpl', 'entities/user'], function(Marionette, tpl, User) {
    var SignUpView;
    return SignUpView = (function(superClass) {
      extend(SignUpView, superClass);

      function SignUpView() {
        return SignUpView.__super__.constructor.apply(this, arguments);
      }

      SignUpView.prototype.template = tpl;

      SignUpView.prototype.ui = {
        accountInput: '#getAccount',
        passwordInput: '#getPassword',
        sendRequest: '#sendRequest'
      };

      SignUpView.prototype.events = {
        'click #getPasswordFromServer': 'getPasswordFromServer',
        'input @ui.accountInput': 'getAccount',
        'input @ui.passwordInput': 'getPassword',
        'click @ui.sendRequest': 'sendRequest'
      };

      SignUpView.prototype.checkMsg = {
        account: '请输入正确的手机号码',
        password: '验证码格式不正确'
      };

      SignUpView.prototype.initialize = function(attributes) {
        if (attributes == null) {
          attributes = {};
        }
        this.model = User.signUp(attributes);
        return this.model.set({
          'account': null,
          'password': null
        });
      };

      SignUpView.prototype.parse = function(node) {
        return node.value.trim();
      };

      SignUpView.prototype.invoker = function(handler, attrName, args) {
        var ret;
        ret = this.invokeAppHandler(handler, args);
        if (!ret) {
          this.message(attrName);
        }
        return this.model.set(attrName, ret);
      };

      SignUpView.prototype.getPasswordFromServer = function() {
        console.log('getPasswordFromServer');
        this.getAccount();
        return this.invokeAppHandler('signInViewGetPassword', this.model);
      };

      SignUpView.prototype.invokeAppHandler = function(handler, args) {
        return App.request(handler, args);
      };

      SignUpView.prototype.getAccount = function() {
        this.invoker('signInViewCheckAccount', 'account', this.parse(this.ui.accountInput[0]));
        return this.modifyUi();
      };

      SignUpView.prototype.getPassword = function() {
        this.invoker('signInViewCheckPassword', 'password', this.parse(this.ui.passwordInput[0]));
        return this.modifyUi();
      };

      SignUpView.prototype.modifyUi = function() {
        var fn;
        fn = this.model.get('account') && this.model.get('password') ? 'remove' : 'add';
        fn = fn + 'Class';
        return this.ui.sendRequest[fn]('btn-outlined');
      };

      SignUpView.prototype.sendRequest = function() {
        console.log('sendRequest');
        this.getAccount();
        this.getPassword();
        return this.invokeAppHandler('signInViewSendRequest', this.model);
      };

      SignUpView.prototype.message = function(attrName) {
        return console.log(this.checkMsg[attrName]);
      };

      return SignUpView;

    })(Marionette.ItemView);
  });

}).call(this);
