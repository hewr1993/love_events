var mongoose = require('mongoose')

var CaseSchema = new mongoose.Schema({
	content: String,
	date: {
		type: Date,
		default: Date.now()
	}
})

CaseSchema.pre('save', function(next) {
	next()
})

CaseSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.sort('date')
			exec(cb)
	},
	findById: function(id, cb) {
		return this.findOne({_id: id})
			exec(cb)
	}
}

module.exports = CaseSchema
