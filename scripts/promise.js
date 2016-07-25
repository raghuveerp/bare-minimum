/**
 * Created by raghuveer on 7/19/16.
 */

;
(function () {
    'use strict';

    /**
     * Creating the bare minimum functionality for a Differed object/Promise
     * This is needed because not all browsers supports Promises by default
     * Special thanks to Internet Explorer here
     * @type {{promise: {state: string, then: Function}, resolve: Function, reject: Function}}
     */
    var $promise = {
        promise: {
            state: 'pending',
            then: function (x, y) {
                if (this.state === 'fulfill') {
                    x(this.result)
                } else if (this.state === 'reject') {
                    y(this.error)
                } else {
                    this.x = x;
                    this.y = y;
                }
            }
        },
        resolve: function (result) {
            this.promise.state  = 'fulfill';
            this.promise.result = result;
            if (this.promise.x) {
                this.promise.x(result);
            }
        },
        reject: function (error) {
            this.promise.state = 'reject';
            this.promise.error = error;
            if (this.promise.y) {
                this.promise.y(error);
            }
        }
    };

})();