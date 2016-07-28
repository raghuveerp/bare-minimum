/**
 * Created by raghuveer on 7/27/16.
 */

var utility = Utility();
var url     = 'http://jsonplaceholder.typicode.com/posts';

document.getElementById('content').addEventListener('click', function (element) {
    var output = document.getElementById('output');

    if (element.target.id === 'click') {
        utility.$http(url).get().then(function (data) {
            output.innerHTML =JSON.stringify(JSON.parse(data), null, 4) ;
        });
    } else if (element.target.id === 'clear') {
        output.innerHTML = "";
    }

});

