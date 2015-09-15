define ['common/app', 'marionette'], (App, Marionette)->
	class CommentDetailsItemModel extends Backbone.Model

	class CommentDetailsCollection extends Backbone.Collection
		model: CommentDetailsItemModel
		parse: (resp)->
			console.log '%comment响应数据：', "color:blue", resp
			resp = resp.data.pageData.list
			super resp
		
		url: App.commentUrl + '/comment/query/listComment.html'

	# API = 
	# 	getModel: (data) ->
	# 		return @model if @model
	# 		@model = new CommentCollection data
	# 		@model

	# 	getComment: (params={})->
	# 		model = @getModel()
	# 		model.url = App.commentUrl + '/comment/query/listComment.html'
	# 		model.fetch params
	# 		model

