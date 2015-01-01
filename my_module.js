/*************************************************************************
	> File Name: my_module.js
	> Created Time: Fri 02 Jan 2015 03:12:54 AM HKT
	> Author: Wayne Ho
	> Mail: hewr2010@gmail.com 
 ************************************************************************/

// constructor.
var MyModule = function() {
};

MyModule.prototype.work = function() {
	console.log("My module is working. ");
};

// Export the MyModule constructor from this module.
module.exports = MyModule;
