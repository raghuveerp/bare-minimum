/**
 * Created by raghuveer on 7/19/16.
 */



var $http = function (url) {
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
                    $promise.resolve(this.response);
                } else {
                    $promise.reject(this.statusText);
                }
            };
            request.onerror = function () {
                $promise.reject(this.statusText);
            };

            return $promise.promise;
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
