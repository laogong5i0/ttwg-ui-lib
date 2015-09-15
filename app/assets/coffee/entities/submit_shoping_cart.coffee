define ['common/app', 'marionette'], (App, Marionette)->
	class CommentModel extends Backbone.Model
		parse: (resp)->
			console.log '%提交购物车响应数据：', "color:blue", resp
			super resp

		url: App.trade + '/trade/order/submitShopingCartInfo.html'

