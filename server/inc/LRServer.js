gw_server = require('./LRGateway.js');

init = function(gateway_port)	{
	if (gateway_port == undefined) gateway_port = 3000;
	console.log("Starting Application");
	err = require("./LRGateway.js").start(gateway_port);
	if (!err) console.log("Started primary gateway on port " + gateway_port);
	else console.log("Fatal error while attempting to setup primary gateway on port " + gateway_port + "\nError : " + err);

}

exports.initialize = init;
