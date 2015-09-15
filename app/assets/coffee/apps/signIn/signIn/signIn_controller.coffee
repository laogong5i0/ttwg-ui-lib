define [
	'common/app',
	'marionette',
	'apps/signIn/signIn/signIn_view',
	'jquery'
	'common/ttwg'
], (App, Marionette, SignInView, $, Ttwg) ->

		# 获取验证码、验证手机号、验证验证码 Controller 上做
		# 获取输入信息在 View 上做

		class SignInController extends Marionette.Controller

			checkRegExp:
				account: /^1[358][0-9]{9}$/
				password: /^[0-9]{6}$/

			initialize: (options = {}) ->
				@view = App.mainRegion.show	new SignInView options

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
						console.log 'kkkkkkk'
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

				data =
					userType: model.userType			# 1: 普通用户。2: 供应商
					type: model.type							# 1: 手机，2: 微信，3: QQ，4:新浪微博
					mobileNum: account
					verifyCode: password
				@sendAjax model.url, data, (resp) =>
					# Ttwg.cookie.setCookie 'userId', "8008"
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

