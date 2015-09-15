define ['common/application'], (Application)->
	return window.App if window.App
	App = new Application
	App.addRegions
		mainRegion: '#main-region'
		dialogRegion: '#dialog-region'

	window.App = App