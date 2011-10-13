init = function(gw_p) {
	try{
		var nstatic = require("node-static")
		var ss = new nstatic.Server("../public");
		var http = require("http").createServer(function(req, res){
			req.on("end", function()	{
				ss.serve(req, res);
			})
		}).listen(gw_p);
	return 0;
	} catch (err) { return err.description; }	
}
exports.start = init;

