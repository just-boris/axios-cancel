var axios = require('axios');
var cancel = require('../cancel');

//set custom adapter as default for all axios calls
axios.defaults.adapter = require('../xhr');

var button = document.querySelector('.load');
var cancellation;

function finishRequest(status) {
    cancellation = null;
    button.innerText = 'Make request'
    document.querySelector('.status').innerHTML = status;
}

button.addEventListener('click', function() {
    if(!cancellation) {
        button.innerText = 'Cancel'
        document.querySelector('.status').innerHTML = 'Loading...'

        //put cancellation token as request option
        cancellation = new cancel.Cancellation()
        axios('/api', {cancellation: cancellation}).then(function() {
            finishRequest('Success')
        }, function(error) {
            //cancellation can be handled there as special error object
            finishRequest(error instanceof cancel.CancellationError ? 'Cancelled' : 'Error');
        })
    } else {
        //cancel token if we have some unresolved
        cancellation.cancel();
        finishRequest();
    }
});
