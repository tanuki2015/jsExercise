const http = require("http");

function start() {
  http.createServer(function(request, response) {
    console.log('request received!');
    response.writeHead(200, { "content-Type": "text/plain" });
    response.write('hello, node.js!');
    response.end();
  }).listen(8888);

  console.log('server has started.');
}

exports.start = start;
