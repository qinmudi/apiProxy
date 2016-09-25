var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    http = require('http'),
    querystring = require('querystring'),
    app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());

app.get('/*', function(req, res, next) {
    console.log(req.url);
    console.log(req.query);
    res.json({
        msg: 'This is CORS-enabled for all origins!'
    });
});

app.post('/*', function(req, res, next) {
    // console.log(req.url);
    // console.log(req.body);
    var postData = req.body;
    // the post options  
    var opts = {
        host: 'dev.erikqin.com',
        port: '80',
        path: req.url,
        method: 'POST'
    };

    // 服务器端发送REST请求  
    var reqPost = http.request(opts, function(resPost) {
        console.log(res.statusCode);
        console.log(JSON.stringify(resPost.headers));
        resPost.on('data', function(d) {
            return res.send(d);
        });
    });

    reqPost.write(querystring.stringify(postData));

    reqPost.end();

    reqPost.on('error', function(e) {
        console.error(e.message);
    });
});

app.listen(9000, function() {
    console.log('CORS-enabled web server listening on port 9000');
});
