var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;
var CaseSchema = new Schema({
	content: String,
	date : { type: Date, default: Date.now},
});
var Case = mongodb.mongoose.model("Case", CaseSchema);
var CaseDAO = function(){};

CaseDAO.prototype.save = function(obj, callback) {
	var instance = new Case(obj);
	instance.save(function(err) {
		callback(err);
	});
};

CaseDAO.prototype.fetch = function(callback) {
	Case.find({}, function(err, obj){
		callback(err, obj);
	});
};

module.exports = new CaseDAO();
