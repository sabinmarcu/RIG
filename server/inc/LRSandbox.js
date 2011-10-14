Commmon = require("./LRCommon.js");

bml = {
    80: "Access Gateway",
    81: "Authentication Gateway",
    82: "Static file serve Gateway",
    5941: "Information Gateway"
}

libs = {
    "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"
}
css = {
    "screen" : ":82/css/screen.css"
}

infoGatewayServer = function()   {
    
    printPort = function(res, array)   {
        for( index in array ) {
            res.write("Port " + index + " mapped to " + array[index] + "<br>");
        }
    }
    
    is = Common.http.createServer(function(req, res){
        res.writeHead(200, {"Content-Type": "text/html"})
        printPort(res, bml);
        printPort(res, Common.config.data.modules);
        res.end();
    }).listen(5941, Common.config.data.server.address);
}

accessGatewayServer = function()    {
     var server = Common.http.createServer(function(req, res){if (req.url != "/") {             
             res.writeHead(404, {"Content-type": "text/html"});
             res.write("Not Found!");
         }
         else  {
             res.writeHead(200, {"Content-type": "text/html"});
             res.write("<html>\n\
<head>\n\
<title>Loading RIG ... </title>\n\
<script type='text/javascript' id='libs'>libs = "+JSON.stringify(libs)+"; css = "+JSON.stringify(css)+"; LR = {}; </script>\n\
<script type='text/javascript' id='init'></script>\n\
<script type='text/javascript' id='loader'>document.getElementById('init').src = 'http://' + window.location.hostname + ':82/init.js';</script>\n\
</head>\n\
<body></body>\n\
</html>");
         }
         res.end();
     }).listen(80, Common.config.data.server.address)
}

staticGatewayServer = function()    {
	try{
		var nstatic = require("node-static")
		var ss = new nstatic.Server(process.cwd()+"/public", {headers : {"Access-Control-Allow-Origin" : "*"}});
		var http = require("http").createServer(function(req, res){
			req.on("end", function()	{
				ss.serve(req, res);
			})
		}).listen(82, Common.config.data.server.address);
	return 0;
	} catch (err) { return err.description; }	
}


module.exports = {
    initInfoGW: infoGatewayServer,
    initAccessGW: accessGatewayServer,
    initStaticGW: staticGatewayServer
}