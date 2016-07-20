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
var $unique = function (array) {
    var flags  = [],
        output = [],
        l      = array.length,
        i;
    for (i = 0; i < l; i++) {
        if (flags[array[i].outerHTML]) {
            continue;
        }
        flags[array[i].outerHTML] = true;
        output.push(array[i]);
    }

    return output;
};
