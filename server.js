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







// request.post({url:url, oauth:oauth}, function (e, r, body) {
//     // ready to make signed requests on behalf of the user
//     var perm_data = qs.parse(body)
//       , oauth =
//         { consumer_key: CONSUMER_KEY
//         , consumer_secret: CONSUMER_SECRET
//         , token: perm_data.oauth_token
//         , token_secret: perm_data.oauth_token_secret
//         }
//       , url = 'https://api.twitter.com/1.1/users/show.json'
//       , qs =
//         { screen_name: perm_data.screen_name
//         , user_id: perm_data.user_id
//         }
//       ;
//     request.get({url:url, oauth:oauth, qs:qs, json:true}, function (e, r, user) {
//       console.log(user)
//     })
//   })

