const http = require('http');
var fs = require('fs');

const PORT = 4000;

http.createServer(function (request, response) {
	console.log('request starting...', new Date());
	const headers = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
		'Access-Control-Max-Age': 2592000, // 30 days
	};
	if (request.method === 'OPTIONS') {
		response.writeHead(204, headers);
		response.end();
		return;
	}
	//console.log('request', request);
	console.log('URL==> ', request.url);
	var filePath = './audio/files' + request.url;
	console.log('CUURENT FILE ===> ', filePath);

	fs.readFile(filePath, function (error, content) {
		response.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
		if (error) {
			if (error.code == 'ENOENT') {
				fs.readFile('./404.html', function (error, content) {
					response.end(content, 'utf-8');
				});
			}
			else {
				response.writeHead(500);
				response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
				response.end();
			}
		}
		else {

			//console.log('CONSTENT ===> ', content);
			response.end(content, 'utf-8');
		}
	});
}).listen(PORT);
console.log(`Server listening PORT ${PORT}`);