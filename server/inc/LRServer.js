Common = require("./LRCommon.js"); 

init = function(gateway_port)	{
        Common.config.readAll(); 
	console.log("Starting Application");
        require("./LRSandbox").initInfoGW();
        require("./LRSandbox").initAccessGW();
        require("./LRSandbox").initStaticGW();
}

exports.initialize = init;
