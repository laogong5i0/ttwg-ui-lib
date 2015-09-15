define ['common/app', 'apps/main/main_router'], (App, Router)->
	App.on 'start', ->
		new Router()
	App.start()
	App.startHistory();
