/*************************************************************************
	> File Name: app.js
	> Created Time: Fri 02 Jan 2015 01:48:56 PM HKT
	> Author: Wayne Ho
	> Mail: hewr2010@gmail.com 
 ************************************************************************/

var port = process.env.PORT || 13920
var express = require('express')
var mongoose = require('mongoose')
var Case = require('./models/case')
var app = express()

mongoose.connect('mongodb://localhost/todoudou')

app.set('views', './views')
app.set('view engine', 'jade')
app.listen(port)
console.log("Listen on " + port)

app.get('/', function(req, res) {
	Case.fetch(function(err, cases) {
		if (err) {
			console.log(err)
		}
		res.render('index', {
			title: '给豆豆',
			cases: []
		})
	})
})

app.get('/new/:content', function(req, res) {
	var content = req.params.content
	_case = new Case({content: content})
	_case.save(function(err, _case){
		if (err) console.log(err)
		res.render('debug', {
			content: _case
		})
	})
})

