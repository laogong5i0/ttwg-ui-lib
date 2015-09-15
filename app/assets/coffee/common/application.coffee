define ['marionette', 'common/sync'], (Marionette)->
	class Application extends Marionette.Application

		navigate: (route, options={}) ->
			Backbone.history.navigate route, options

		startHistory: ->
			if Backbone.history
				Backbone.history.start()

		# 两种dialog
		# type=modal, 从下往上拉
		# type=none,直接弹框
		showDialog: (view, type='none')->
			@.dialogRegion.$el.show()
			if type=='modal'
				view.$el.addClass('modal')
				@.dialogRegion.show view
				setTimeout ()=> 
					view.$el.addClass('active')
				, 10
			else
				@.dialogRegion.show view
				top = (@.dialogRegion.$el.height() - view.$el.height())/2
				view.$el.css('top', top)
			@currentDialogType = type
			@currentDialogView = view

		closeDialog: ()->
			if @currentDialogType == 'modal'
				@currentDialogView.$el.removeClass('active')
				setTimeout ()=>
					@.dialogRegion.$el.hide()
				, 250
			

		productUrl: 'http://item.ttwg.com'
		userUrl:	'http://user.ttwg.com'
		commentUrl: 'http://comment.ttwg.com'
		trade:		'http://trade.ttwg.com'