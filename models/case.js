var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;
var CaseSchema = new Schema({
	headline: String,
	text: String,
	tag: String,
	startDate: String,
	endDate: String,
	media: String,
	thumbnail: String
});
var Case = mongodb.mongoose.model("Case", CaseSchema);
var CaseDAO = function(){};

CaseDAO.prototype.update = function(_id, obj, callback) {
	Case.update({_id: _id}, obj, function(err) {
		callback(err);
	});
}

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
