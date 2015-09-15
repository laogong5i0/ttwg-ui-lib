define [
	'common/app',
	'apps/signIn/signIn_router'
], (App, Router) ->

	App.on 'start', ->
		new Router()

	App.start()

	App.startHistory()


