var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    cors = require('cors'),
    request = require('request'),
    app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

var host = 'dev.erikqin.com',
    port = 80;

app.get('/config', function(req, res, next) {
    var qs = req.query;
    if (qs['host'] || qs['port']) {
        host = qs['host'] ? qs['host'] : host;
        port = qs['port'] ? qs['port'] : port;
        res.send('恭喜设置成功，你的host：' + host + '，port：' + port);
    } else {
        res.send('oh,天啊，设置错误，请检查你的参数时候正确？');
    }
});

app.post('/*', function(req, res, next) {
    var url = 'http://' + host + ':' + port + req.url;
    var postData = req.body;
    // the post options  
    console.log(url);
    request.post(url, {
        form: postData
    }, function(err, httpResponse, body) {
        if (err) return;
        res.send(body);
    });
});

app.listen(9000, function() {
    console.log('CORS-enabled web server listening on port 9000');
});
