var express = require('express');
var server = express();

server.use('/', express.static(__dirname + '/'));

server.get('*', (req, res) => {
    res.redirect('/');
});

server.listen(80);