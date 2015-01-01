/*************************************************************************
	> File Name: server.js
	> Created Time: Fri 02 Jan 2015 01:59:57 AM HKT
	> Author: Wayne Ho
	> Mail: hewr2010@gmail.com 
 ************************************************************************/

// determine port
var port = 13920;
if (process.argv.length > 2) port = parseInt(process.argv[2])

var express = require('express');
app = express();
app.use(express.static(__dirname));
app.listen(port);
console.log("Server Running on " + port);

var MyModule = require('./my_module.js');
my_module = new MyModule()
my_module.work()
