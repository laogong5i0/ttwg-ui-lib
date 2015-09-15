define [
	'backbone',
	'common/app'
], (Backbone, App) ->
	class ProductListModel extends Backbone.Model

		defaults:
			map: 
				list: []

			# ctgId			: 0			#分类ID	long	N	 	 
			# userId		: 0			#用户ID号	long	N	 	 
			# title			: ''		#商品名	string	N	 	 
			sort			: 1			#排序类型	int	N	 	1 综合 2销量 3价格
			sc				: 2			#排序方式	int	N	 	1降序 2升序
			pageNO		: 0			#当前页	int	Y	 	 
			pageSize	: 6			#每页记录数	int	Y	 

		
		parse: (resp, options) ->
			# list 数组很大，为了在验证是否相同的时候大量循环
			# 可以添加一个随机 key，在最外层就通过 _.isEqual 验证

			prev = (@.get 'map').list || []
			list = resp.data.list || []
			map = {}

			map[new Date() * 1] = null
			map.list = prev.concat list

			# 验证排序成功与否，输出 id
			arr = []
			list.forEach (val)=>
				arr.push val.id
			console.log arr
			# 验证结束
			map: map

	getModel: (attributes) ->
		return @model if @model
		@model = new ProductListModel attributes

	refreshModel: (attributes = {}, options = {}) ->
		model = @getModel attributes
		try
			# 服务端不传 list 属性，所以在每次请求的时候，先删除 list
			# 在 success 中再添加上，这样可以在请求成功能之后再触发 changes
			#
			# 直接删除，是会在下一次 set 的时候检测 _previousAttributes
			# 所以此时不会触发 model.change 事件

			delete model.attributes.list
		catch e

		model.url = App.productUrl + '/front/item/queryList.html'
		model.save attributes, options
		model
