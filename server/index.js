var express = require('express');
var app     = require('express')();
var server  = require('http').Server(app);
var path    = require('path');
var spawn   = require('child_process').spawn;
var fs      = require('fs');
var ws      = require('websocket').server;

server.listen(80);
console.log('Linux Dash Server Started!');

app.use(express.static(path.resolve(__dirname + '/../')));

app.get('/', function (req, res) {
	res.sendFile(path.resolve(__dirname + '/../index.html'));
});

app.get('/websocket', function (req, res) {

  res.send({
    websocket_support: true,
  });

});

wsServer = new ws({
	httpServer: server
});

function getShellFilePath(moduleName) {
  return __dirname + '/modules/shell_files/' + moduleName + '.sh';
}

function shellPathAndModuleNameAreValid(shellFilePath, moduleName) {

  var moduleInvalidName = moduleName.indexOf('.') > -1;
  var moduleNameEmpty   = !moduleName;
  var moduleNotFound    = !fs.existsSync(shellFilePath);
  var isValid = true;

  if (moduleInvalidName || moduleNameEmpty || moduleNotFound) {
    isValid = false;
  }

  return isValid;
}

wsServer.on('request', function(request) {

	var wsClient = request.accept('linux-dash', request.origin);

  wsClient.on('message', function(wsReq) {

    var moduleName = wsReq.utf8Data;
    var shellFile  = getShellFilePath(moduleName);

    if (!shellPathAndModuleNameAreValid(shellFile, moduleName)) {
      return;
    }

		var command = spawn(shellFile, [ wsReq.color || '' ]);
		var output  = [];

		command.stdout.on('data', function(chunk) {
			output.push(chunk);
		});

		command.on('close', function(code) {

			if (code === 0) {

        var wsResponse = {
          moduleName: moduleName,
				  output: output.toString(),
        };

				wsClient.sendUTF(JSON.stringify(wsResponse));
			}

		});

  });

});

app.get('/server/', function (req, res) {

	var shellFile = getShellFilePath(req.query.module);

	if (!shellPathAndModuleNameAreValid(shellFile, req.query.module)) {
    res.sendStatus(406);
    return;
  }

	var command = spawn(shellFile, [ req.query.color || '' ]);
	var output  = [];

	command.stdout.on('data', function(chunk) {
		output.push(chunk);
	});

	command.on('close', function(code) {
		if (code === 0) res.send(output.toString());
		else res.sendStatus(500);
	});

});
