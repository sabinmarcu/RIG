var nstatic = require("node-static")
var ss = new nstatic.Server("../public");
var http = require("http").createServer(function(req, res){
	req.on("end", function()	{
		ss.serve(req, res);
	})
	console.log("Served : " + req.url);
}).listen(80);
