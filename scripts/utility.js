/**
 * Created by raghuveer on 7/19/16.
 */

/**
 * Helper method to find unique array elements based on outerHTML
 * This is to avoid submitting same hidden field multiple time
 * because of the ajax calls mades while typing
 * @param array
 * @returns {Array}
 */
var _unique = function (array) {
    var flags  = [],
        output = [];
    for (var i = 0; i < array.length; i++) {
        if (flags[array[i]]) {
            continue;
        }
        flags[array[i]] = true;
        output.push(array[i]);
    }

    return output;
};

/**
 * Creating the bare minimum functionality for a Differed object/Promise
 * This is needed because not all browsers supports Promises by default
 * Special thanks to Internet Explorer here
 * @type {{promise: {state: string, then: Function}, resolve: Function, reject: Function}}
 */
var _promise = {
    promise: {
        state: 'pending',
        then: function (_resolve, _reject) {
            if (this.state === 'fulfill') {
                _resolve(this.result)
            } else if (this.state === 'reject') {
                _reject(this.error)
            } else {
                this._resolve = _resolve;
                this._reject  = _reject;
            }
        }
    },
    resolve: function (result) {
        this.promise.state  = 'fulfill';
        this.promise.result = result;
        if (this.promise._resolve) {
            this.promise._resolve(result);
        }
    },
    reject: function (error) {
        this.promise.state = 'reject';
        this.promise.error = error;
        if (this.promise._reject) {
            this.promise._reject(error);
        }
    }
};

/**
 * bare minimum implementation of jQuery ajax method in vanila javascript
 * @param url
 * @returns {{get: 'get', post: 'post', put: 'put', delete: 'delete'}} Promise
 */
var _myhttp = function (url) {
    var main = {
        ajax: function (method, url, args) {

            var request = new XMLHttpRequest();
            request.open(method, url);

            if (args && (method === 'POST' || method === 'PUT')) {
                request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
                request.send(args);
            } else {
                request.send();
            }

            request.onload  = function () {
                if (this.status >= 200 && this.status < 400) {
                    _promise.resolve(this.response);
                } else {
                    _promise.reject(this.statusText);
                }
            };
            request.onerror = function () {
                _promise.reject(this.statusText);
            };

            return _promise.promise;
        }
    };

    return {
        'get': function (args) {
            return main.ajax('GET', url, args);
        },
        'post': function (args) {
            return main.ajax('POST', url, args);
        },
        'put': function (args) {
            return main.ajax('PUT', url, args);
        },
        'delete': function (args) {
            return main.ajax('DELETE', url, args);
        }
    };
};

/**
 * Utility class
 * @returns {{unique: _unique}}
 * @constructor
 */
var Utility = function () {

    return {
        unique: _unique,
        $promise: _promise,
        $http: _myhttp
    }

};