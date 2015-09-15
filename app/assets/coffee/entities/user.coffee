define ['common/app', 'marionette'], (App, Marionette)->
	class SignIn extends Backbone.Model

		defaults:
			account: '输入手机号码'
			password: '输入验证码'

		parse: (resp)->
			console.log '响应数据：', resp
			super resp

	# 获取短信验证码
 	# "userVfCode": host.user + "/user/getvfcode.html"

 	# 提交注册信息
 	# "userReg": host.user + "/user/reg.html"
 	# 普通用户登录
  # "userLogin": host.user + "/user/login.html",

  # 供应商登录
  # "supplierLogin": host.user + "/user/supplierlogin.html",
  # 获取验证码 type: 0：注册，1：找回密码，2：登录，3：申请开店

	API = 
		getSignModel: (data) ->
			return @model if @model
			@model = new SignIn data
			@model

		signIn: (params={}, options={})->
			model = @getSignModel(params)
			model.set params
			
			model.url = App.userUrl + '/user/login.html'
			model.getvfcodeUrl = App.userUrl + '/user/getvfcode.html'

			model.captchaType = 2
			model.userType = 1
			model.type = 1

			#model.save params, options
			model

		signUp: (params={}, options={})->

			model = @getSignModel(params)
			model.set params

			model.url = App.userUrl + '/user/reg.html'
			model.getvfcodeUrl = App.userUrl + '/user/getvfcode.html'
			
			model.captchaType = 0

			#model.save params, options
			model

	# App.reqres.setHandler 'user:signIn', (params, options)->
	# 	API.signIn params, options
