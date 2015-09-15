define ['common/app', 'marionette'], (App, Marionette)->
	class ProductModel extends Backbone.Model
		parse: (resp)->
			console.log '%cproduct响应数据：', "color:blue", resp
			resp = resp.data
			super resp

	API = 
		getModel: (data={}) ->
			return @model if @model
			@model = new ProductModel data
			@model

		getDetials: (options={})->
			model = @getModel()
			model.url = App.productUrl + '/front/item/queryDetail.html'
			# model.save params, options
			model.fetch options
			model


	# App.reqres.setHandler 'product:getDetials', (params, options)->
	# 	API.getProduct params, options
