var http = require('http');
var request = require('request');
var key = require('./keys');

var port = 8082;

var requestHandler = function (req, res) {
    var route = 'https://www.googleapis.com/urlshortener/v1/url?key=' + key;
    var args = process.argv[2];
    if (route !== '/favicon.ico') {
        var options = {
            method: 'POST',
            url: 'https://www.googleapis.com/urlshortener/v1/url',
            qs: { key: key },
            headers:
            { 'content-type': 'application/json' },
            body: { longUrl: args },
            json: true
        };

        request(options, function (error, response, body) {
            if (error) {
                throw new Error(error);
            };
            console.log(body);
            res.end(JSON.stringify(body));
        });
    };
};

var server = http.createServer(requestHandler);

server.listen(port, function () {
    console.log('Listening on port: ', port);
});

