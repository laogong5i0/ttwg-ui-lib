define [
	'common/app',
	'marionette',
	'apps/signIn/signUp/signUp_view',
	'jquery'
], (App, Marionette, SignUpView, $) ->

  # 获取验证码、验证手机号、验证验证码 Controller 上做
  # 获取输入信息在 View 上做

	class SignUpController extends Marionette.Controller

		checkRegExp:
			account: /^1[358][0-9]{9}$/
			password: /^[0-9]{6}$/

		initialize: (options = {}) ->
			@view = App.mainRegion.show	new SignUpView options

			return @ if App.reqres.setHandler 'signInViewCheckAccount'

			# 检测验手机号格式
			App.reqres.setHandler 'signInViewCheckAccount', @checkAccount, @

			# 检测验证码格式
			App.reqres.setHandler 'signInViewCheckPassword', @checkPassword, @

			# 获取验证码
			App.reqres.setHandler 'signInViewGetPassword', @getPassword, @

			# 提交请求
			App.reqres.setHandler 'signInViewSendRequest', @sendRequest, @

			@

		getPassword: (model = {}) ->
			data =
				mobileNum: model.get 'account'
				type: model.captchaType	

			data.mobileNum and @sendAjax model.getvfcodeUrl,
				data,
				(resp) =>
					@message resp.message if not resp.isSuccess

		checkAccount: (phone) ->
			if @checkRegExp.account.test phone then phone else null

		checkPassword: (captcha) ->
			if @checkRegExp.password.test captcha then captcha else null

		# 提交登录信息
		sendRequest: (model) ->
			account = model.get 'account'

			try
				password = parseInt model.get 'password'
			catch e
				password = null

			return null if not (account and password)

			# data 其实应该在model中定义一个函数
			# 提供统一的接口，这样就不用在这里改了
			# 忙，先这样弄着
			data =
				mobileNum: account
				verifyCode: password

			@sendAjax model.url, data, (resp) =>
				@message resp.message if not resp.isSuccess

		# 登录页面的接口全是 post 方式
		# 且要设置application/json
		# 所以在此处封装一下
		sendAjax: (url, data, success) ->
			$.ajax
				url: url
				data: JSON.stringify data
				type: 'POST'
				contentType: 'application/json'
				success: success

		# 错误提示
		message: (msg) ->
			alert msg

