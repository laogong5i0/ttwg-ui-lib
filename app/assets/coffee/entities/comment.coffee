define ['common/app', 'marionette'], (App, Marionette)->
	class CommentModel extends Backbone.Model

	class CommentCollection extends Backbone.Collection
		model: CommentModel
		parse: (resp)->
			console.log '%comment响应数据：', "color:blue", resp
			return super(resp) if !resp.isSuccess
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

