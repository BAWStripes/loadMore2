var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

http.createServer(function(req, res){
    var pathObj = url.parse(req.url, true);
    console.log(pathObj);
    switch (pathObj.pathname) {
        case '/loadMore':
            var curIdx = pathObj.query.start;
            var len = pathObj.query.len;
            var response = {
                status: 0,
                data: []
            };
            for(var i = 0; i < len; i++) {
                response.data.push('内容' + (parseInt(curIdx) + i))
            }
            if (response.data.length == 0) {
                response.status = -1;
            }
            res.setHeader('Access-Control-Allow-Origin','*');
            res.end(JSON.stringify(response));
            break;
        default:
            fs.readFile(path.join(__dirname ,'static', pathObj.pathname), function(err, data){
                if(err){
                    res.statusCode = 404;
                    res.end('Not found')
                }else{
                    res.end(data)
                }
            })
    }
}).listen(8080);