
data = {};
Common = require("./LRCommon.js");

readAll = function()    {
    try{
        files = Common.fs.readdirSync(process.cwd() + "/configs")
        files.forEach(function(file) {
                if (file.substring(file.length-4) == "json")  
                    addElem(JSON.parse(Common.fs.readFileSync(process.cwd() + "/configs/" + file)), file.substring(0, file.length - 5)); 
        })
    } catch (err) { console.log("Error while reading configs : " + err.description) }
}

addElem = function(v, name) {
    data[name] = v;
}

exports.readAll = readAll;
exports.data = data;