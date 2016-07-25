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
 * Utility class
 * @returns {{unique: _unique}}
 * @constructor
 */
var Utility = function () {

    return {
        unique: _unique
    }

};