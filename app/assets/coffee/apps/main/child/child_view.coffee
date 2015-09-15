define ['common/app', 'tpl!apps/main/child/templates/child_view.tpl', 'marionette'], (App, TPL, Marionette)->
	class ChildView extends Marionette.LayoutView
		id: 'module-child',
		tagName:'div',
		template: TPL,
		events: {},
		# updateView: (data)->
		# 	console.log 'llllllllllllll', data
		initialize: (opstions={})->
			super(opstions)

		# onRender: ->
		# 	console.log("layout child was render!", TPL);

		# render: (data)->
		# 	console.log '000------1>>', data