define [
	'common/app',
	'marionette',
	'tpl!apps/signIn/signIn/templates/signIn_view.tpl',
	'entities/user'
], (App, Marionette, tpl, User) ->
	class SignInView extends Marionette.ItemView

		template: tpl

		ui: 
			accountInput: '#getAccount'
			passwordInput: '#getPassword'
			sendRequest: '#sendRequest'

		events:
			# 获取验证码
			'click #getPasswordFromServer': 'getPasswordFromServer'
			# 获取用户帐户
			'input @ui.accountInput': 'getAccount'
			# 获取用户输入的验证码
			'input @ui.passwordInput': 'getPassword'
			# 提交登录申请
			'click @ui.sendRequest': 'sendRequest'

		checkMsg:
			account: '请输入正确的手机号码'
			password: '验证码格式不正确'

		initialize: (attributes = {}) ->
			attributes.isSignIn = true
			@model = User.signIn(attributes)
			@model.set 
				'account': null
				'password': null

		parse: (node) ->
			node.value.trim();

		invoker: (handler, attrName, args) ->
			ret = @invokeAppHandler handler, args
			# 验证结果为false，显示错误信息
			@message attrName if not ret
			@model.set attrName, ret

		# 获取验证码
		getPasswordFromServer: ->
			console.log 'getPasswordFromServer'
			@getAccount()
			@invokeAppHandler 'signInViewGetPassword', @model

		# 调用App上注册的 handler
		invokeAppHandler: (handler, args) ->
			App.request handler, args

		getAccount: ->
			@invoker 'signInViewCheckAccount', 
				'account', 
				@parse @.ui.accountInput[0]

			@modifyUi()

		getPassword: ->
			@invoker 'signInViewCheckPassword', 
				'password', 
				@parse @.ui.passwordInput[0]

			@modifyUi()

		# ui 状态变化
		# 详尽功能后期再做，此处只写提交按钮的变化
		modifyUi:  ->
			fn = if @model.get('account') and @model.get('password') then 'remove' else 'add'
			fn = fn + 'Class'
			# 验证通过，则可以点击提交
			@ui.sendRequest[fn] 'btn-outlined'

		# 提交登录信息
		sendRequest: ->
			console.log 'sendRequest'
			@getAccount();
			@getPassword();
			@invokeAppHandler 'signInViewSendRequest', @model

		message: (attrName) ->
			console.log  @checkMsg[attrName]