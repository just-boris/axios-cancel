## Axios-cancel

Custom adapter for [axios] with ability to [cancel requests](https://github.com/mzabriskie/axios/issues/333).
It uses [cancel] library as shared source of cancel-related abstractions.

Now it works only in browser environment and contains modified version of original axios XHR-adapter. If you are also interested in Node.js support, [let me know](https://github.com/just-boris/axios-cancel/issues/new)

## Installation

1. Install this repository as dependency `npm install github:just-boris/axios-cancel#v2.0.0`
2. You should have `axios` (version 0.14) installed. For previous version support, install v1.0.0 of this package
3. Module uses CommonJS modules, so you need to use Webpack or Browerify to build it for browser. See [example](example) folder for possible setup.

## Usage

Use it as custom adapter for your requests. Then you can provide `cancellation` option whenever you need to make request cancelable

```js
var cancelXhrAdapter = require('axios-cancel');
var axios = require('axios');
var cancel = require('axios-cancel/cancel');

var cancellation = new cancel.Cancellation();

axios(url, {
  adapter: cancelXhrAdapter,
  cancellation: cancellation
}).then(function() {
  console.log('request finished successfully');
}, function(error) {
  if(error instanceof cancel.CancellationError) {
    console.log('request has been cancelled');
  }
});

//later in code when you need to cancel the request above
cancellation.cancel();
```

**ProTip**: you can set new adapter as default to use it for all requests

```js
axios.defaults.adapter = cancelXhrAdapter;
```

## Example with React and ES6

```js
import React from 'react';
import axios from 'axios';
import cancelXhrAdapter from 'axios-cancel';
import {Cancellation} from 'axios-cancel/cancel';

class App extends React.Component {

  componentDidMount() {
    this.cancellation = new Cancellation();
    axios('/api', {
      adapter: cancelXhrAdapter,
      cancellation: this.cancellation
    }).then(({data}) => {
      this.setState({data});
      this.cancellation = null;
    });
  }

  compomentWillUnmount() {
    if(this.cancellation) {
      this.cancellation.cancel();
    }
  }
}
```

Now you can get rid of data, when you are not interested in it anymore. Yay!

[axios]: https://github.com/mzabriskie/axios
[cancel]: https://github.com/nickuraltsev/cancel
