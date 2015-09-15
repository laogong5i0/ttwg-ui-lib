define [
	'common/app',
	'marionette',
	'apps/signIn/signIn/signIn_controller',
	'apps/signIn/signUp/signUp_controller',
], (App, Marionette, SignInController, SignUpController) -> 
	class SignInRouter extends Marionette.AppRouter

		routes:
			'': 'SignIn'
			'signUp': 'SingUp'

		SignIn: ->
			new SignInController

		SingUp: ->
			new SignUpController