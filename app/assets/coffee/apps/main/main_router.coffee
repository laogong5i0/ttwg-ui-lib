define ['common/app', 'marionette',
'apps/main/child/child_controller'], (App, Marionette, ChildController)->
	class MainApp extends Marionette.AppRouter
		routes:
			'': 'main'
			'childpage': 'childPage'

		main: ->
			console.log 'main------>>1'
			new ChildController

		childPage: ->
			console.log 'main child page ------->>'