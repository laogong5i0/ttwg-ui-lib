(function(){

    var ttwg = ttwg || {};
    ttwg.version = '0.0.1';

    // query string ------------------------------------------------------------
    /**
    * @description Object that contains all of the query string parameters as properties.
    * @public
    * @field
    * @example
    * var example = ttwg.queryString.keyName;
    */
    ttwg.queryString = (function () {
        'use strict';
        var params = {},
            q = window.location.search.substring(1),
            e = q.split('&'),
            l = e.length,
            f,
            i = 0;
        for (i; i < l; i += 1) {
            f = e[i].split('=');
            params[f[0]] = decodeURIComponent(f[1]);
        }
        return params;
    } ());

    // COOKIES ------------------------------------------------------------

    /**
    * @namespace ttwg cookie functionality.
    */
    ttwg.cookie = (function () {
        'use strict';

        /**
        * @private
        */
        var memo = [];
        return {

            /**
            * @description Retrieve the value of a cookie.
            * @param {String} name Name of cookie value to retrieve
            * @returns {String} Value of the cookie specifed by the name parameter.
            * @public
            * @function
            */
            getCookie: function (name) {
                var dc,
    				l,
    				i,
    				j;
                // Perf note: FF 3.6.8 Win 7 loop of 1000 took 20 ms without memoize; Chrome took 58 ms
                // With memoize, 17 ms in FF and still 58 ms in Chrome.
                //if (typeof memo[name] !== 'undefined') {
                //	return memo[name];
                //}
                dc = document.cookie;
                l = dc.length;
                if (l > 0) {
                    i = dc.indexOf(name + '=');
                    if (i !== -1) {
                        i = i + name.length + 1;
                        j = dc.indexOf(';', i);
                        if (j === -1) {
                            j = l;
                        }
                        memo[name] = dc.substring(i, j);
                        return decodeURIComponent(dc.substring(i, j));
                    }
                }
                return false;
            },

            /**
            * @description Set a cookie.
            * @param {String} name Name of the cookie to set.
            * @param {String} value Value of the cookie to be set.
            * @param {Integer} [expires="session"] Number of days for the cookie to be set.
            * @param {String} [path="Current directory"] Cookie path. Best to set to '/'.
            * @param {String} [domain="Current domain"] Cookie domain. Defaults to current domain/subdomain.
            * @returns {Boolean} TRUE if cookie was set.
            * @public
            * @function
            */
            setCookie: function (name, value, expires, path, domain) {
                var expDate;
                // Must have a name.
                if (name) {
                    // If non-falsy expires, (positive or negative) update date.
                    if (expires) {
                        expDate = new Date();
                        expDate.setDate(expDate.getDate() + expires);
                        expires = expDate.toUTCString();
                    } else {
                        expires = '';
                    }
                    // Set cookie.
                    document.cookie = name + '=' + value +
    					((expires) ? ';expires=' + expires : '') +
    					((path) ? ';path=' + path : '') +
    					((domain) ? ';domain=' + domain : '');
                    return true;
                }
                return false;
            },

            /**
            * @description Utility method for calling ttwg.cookie.setCookie().
            * @param {String} name Name of the cookie to delete.
            * @param {String} [path="Current directory"] Path of cookie to delete.
            * @param {String} [path="Current directory"] Domain of cookie to delete.
            * @returns {Boolean} TRUE if cookie was deleted.
            * @public
            * @function
            */
            deleteCookie: function (name, path, domain) {
                domain = domain || '';
                isSuccessful = false;
                if (ttwg.cookie.getCookie(name)) {
                    if (domain === '') {
                        isSuccessful = ttwg.cookie.setCookie(name, '', -1000, path);
                    } else {
                        isSuccessful = ttwg.cookie.setCookie(name, '', -1000, path, domain);
                    }
                }
                return isSuccessful;
            }

        };
    } ());

    // UTILITIES ----------------------------------------------------------

    ttwg.utilities = (function () {
        'use strict';

        var ua = navigator.userAgent,
    		platform = navigator.platform,
    		mobileExp = /android|iPhone|iPod/i,
    		osData = [
    			{
    			    string: ua.toLowerCase(),
    			    subString: 'android',
    			    identity: 'Android'
    			},
    			{
    			    string: ua,
    			    subString: 'iPad',
    			    identity: 'iOS'
    			},
    			{
    			    string: ua,
    			    subString: 'iPhone',
    			    identity: 'iOS'
    			},
    			{
    			    string: ua,
    			    subString: 'iPod',
    			    identity: 'iOS'
    			},
    			{
    			    string: navigator.platform,
    			    subString: 'Linux',
    			    identity: 'Linux'
    			},
    			{
    			    string: platform,
    			    subString: 'Mac',
    			    identity: 'Mac'
    			},
    			{
    			    string: platform,
    			    subString: 'Win',
    			    identity: 'Windows'
    			}
    		];

        return {

            /**
            * Based on PPK's BrowserDetect
            * http://stackoverflow.com/questions/743129/mobile-detection-using-javascript
            */
            os: (function () {
                var searchString = function (data) {
                    var i = 0,
    					l = data.length,
    					ds,
    					dp;
                    for (i; i < l; i++) {
                        ds = data[i].string;
                        dp = data[i].prop;
                        if (ds) {
                            if (ds.indexOf(data[i].subString) !== -1) {
                                return data[i].identity;
                            }
                        } else if (dp) {
                            return data[i].identity;
                        }
                    }
                };
                return searchString(osData);
            } ()),

            isMobile: function() { return window.outerWidth <= 768; },

            jQuery: function () {
                return (!(typeof $ === 'undefined' || typeof jQuery === 'undefined') && $ === jQuery);
            }

        };

    } ());
    
    window.ttwg = ttwg;
})()
/*===========================
AMD Export
===========================*/
if (typeof(module) !== 'undefined')
{
    module.exports = window.ttwg;
}
else if (typeof define === 'function' && define.amd) {
    define(function () {
        return window.ttwg;
    });
}