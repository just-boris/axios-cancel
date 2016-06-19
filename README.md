## Axios-cancel

Custom adapter for [axios] with ability to cancel requests

## Installation

1. Install this repository as dependency `npm install github:just-boris/axios-cancel`
2. You should have `axios` installed.
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
import adapter from 'axios-cancel';
import {Cancellation} from 'axios-cancel/cancel';

class App extends React.Component {
  
  componentDidMount() {
    this.cancellation = new Cancellation();
    axios('/api', {adapter, cancellation}).then(
      ({data}) => this.setState({data})
    )
  }
  
  compomentWillUnmount() {
  }
}
```

[axios]: https://github.com/mzabriskie/axios
