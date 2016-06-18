var webpack = require('webpack');
var config = require('./webpack.config');
var webpackDevServer = require('webpack-dev-server');

var compiler = webpack(config);
var server = new webpackDevServer(compiler, {
    contentBase: './example',
    stats: { colors: true }
});

server.use('/api', function(req, res) {
    setTimeout(function() {
        res.send({done: true})
    }, 5000)
});

server.listen(3000);
