var mongoose = require('mongoose')
var CaseSchema = require('../schemas/case')
var Case = mongoose.model('Case', CaseSchema)

module.exports = Case
