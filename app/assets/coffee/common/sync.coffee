define ['marionette'], (Marionette)->
  methodMap =
    create: 'POST'
    update: 'PUT'
    patch: 'PATCH'
    delete: 'DELETE'
    read: 'GET'

  _sync = Backbone.sync


  Backbone.sync = (method, model, options = {}) ->
    type = methodMap[method]
    _.defaults options,
      emulateHTTP: Backbone.emulateHTTP
      emulateJSON: Backbone.emulateJSON
    params =
      type: type
      dataType: 'json'

    params.url = _.result(model, 'url') || urlError() if !options.url

    if (!(_.has options, 'data') and model and (method == 'create' or method == 'update' or method == 'patch'))
      params.contentType = 'application/x-www-form-urlencoded'
      params.data = JSON.stringify(options.attrs or model.toJSON(options));
      params.data = JSON.parse params.data

    # // For older servers, emulate JSON by encoding the request into an HTML-form.
    if options.emulateJSON
      params.contentType = 'application/x-www-form-urlencoded'
      params.data = if params.data then model: params.data else {}


    if options.emulateHTTP and (type == 'PUT' or type == 'DELETE' or type == 'PATCH')
      params.type = 'POST'
      if (options.emulateJSON) params.data._method = type
        beforeSend = options.beforeSend
        options.beforeSend = (xhr)->
          xhr.setRequestHeader('X-HTTP-Method-Override', type)
          return beforeSend.apply(this, arguments) if beforeSend

    # // Don't process data on a non-GET request.
    if params.type != 'GET' and !options.emulateJSON
      params.processData = true

    # // If we're sending a `PATCH` request, and we're in an old Internet Explorer
    # // that still has ActiveX enabled by default, override jQuery to use that
    # // for XHR instead. Remove this line when jQuery supports `PATCH` on IE8.
    if params.type == 'PATCH' and noXhrPatch
      params.xhr = ()->
        return new ActiveXObject 'Microsoft.XMLHTTP'

    if params.type=='GET'
      # params.contentType = 'application/x-www-form-urlencoded'
      # params.data = JSON.stringify(options.attrs or model.toJSON(options));
      # params.data = JSON.parse params.data
      params.processData = true
      
    # // Make the request, allowing the user to override any Ajax options.
    xhr = options.xhr = Backbone.ajax(_.extend(params, options))


    # options.beforeSend = (xhr)->
    # 	# xhr.setRequestHeader 'crossDomain', true
    # 	# xhr.setRequestHeader 'Accept', '*/*'
    # 	xhr.setRequestHeader 'Content-Type', 'application/x-www-form-urlencoded'

    return xhr
