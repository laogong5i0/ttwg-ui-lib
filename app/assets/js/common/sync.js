(function() {
  define(['marionette'], function(Marionette) {
    var _sync, methodMap;
    methodMap = {
      create: 'POST',
      update: 'PUT',
      patch: 'PATCH',
      "delete": 'DELETE',
      read: 'GET'
    };
    _sync = Backbone.sync;
    return Backbone.sync = function(method, model, options) {
      var beforeSend, params, type, xhr;
      if (options == null) {
        options = {};
      }
      type = methodMap[method];
      _.defaults(options, {
        emulateHTTP: Backbone.emulateHTTP,
        emulateJSON: Backbone.emulateJSON
      });
      params = {
        type: type,
        dataType: 'json'
      };
      if (!options.url) {
        params.url = _.result(model, 'url') || urlError();
      }
      if (!(_.has(options, 'data')) && model && (method === 'create' || method === 'update' || method === 'patch')) {
        params.contentType = 'application/x-www-form-urlencoded';
        params.data = JSON.stringify(options.attrs || model.toJSON(options));
        params.data = JSON.parse(params.data);
      }
      if (options.emulateJSON) {
        params.contentType = 'application/x-www-form-urlencoded';
        params.data = params.data ? {
          model: params.data
        } : {};
      }
      if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
        params.type = 'POST';
        if (options.emulateJSON(params.data._method = type)) {
          beforeSend = options.beforeSend;
          options.beforeSend = function(xhr) {
            xhr.setRequestHeader('X-HTTP-Method-Override', type);
            if (beforeSend) {
              return beforeSend.apply(this, arguments);
            }
          };
        }
      }
      if (params.type !== 'GET' && !options.emulateJSON) {
        params.processData = true;
      }
      if (params.type === 'PATCH' && noXhrPatch) {
        params.xhr = function() {
          return new ActiveXObject('Microsoft.XMLHTTP');
        };
      }
      if (params.type === 'GET') {
        params.processData = true;
      }
      xhr = options.xhr = Backbone.ajax(_.extend(params, options));
      return xhr;
    };
  });

}).call(this);
