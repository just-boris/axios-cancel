var axios = require('axios');
var Cancellation = require('cancel/lib/Cancellation').default;
var CancellationError = require('cancel/lib/CancellationError').default;
var currentCancellation;

axios.defaults.adapter = require('../xhr');

var button = document.querySelector('.load');

function finishRequest(status) {
    currentCancellation = null;
    button.innerText = 'Make request'
    document.querySelector('.status').innerHTML = status;
}

button.addEventListener('click', function() {
    if(!currentCancellation) {
        button.innerText = 'Cancel'
        currentCancellation = new Cancellation()
        document.querySelector('.status').innerHTML = 'Loading...'
        axios('/api', {
            cancellation: currentCancellation
        }).then(function(response) {
            finishRequest(JSON.stringify(response.data))
        }, function(error) {
            if(error instanceof CancellationError) {
                finishRequest('cancelled');
            } else {
                finishRequest('error');
            }
        })
    } else {
        currentCancellation.cancel();
        finishRequest();
    }
});
