/*************************************************************************
	> File Name: app.js
	> Created Time: Fri 02 Jan 2015 01:48:56 PM HKT
	> Author: Wayne Ho
	> Mail: hewr2010@gmail.com 
 ************************************************************************/

var port = process.env.PORT || 13920
var express = require('express')
var mongoose = require('mongoose')
var CaseRoute = require('./routes/case')
var app = express()

app.set('views', './views')
app.set('view engine', 'jade')
app.listen(port)
console.log("Listen on " + port)

app.use("/static", express.static(__dirname + '/static'))
app.use("/bower", express.static(__dirname + '/bower_components'))

app.get('/', function(req, res) {
	res.render('index', {
		title: '给豆豆'
	})
})
app.get('/new/:content', CaseRoute.addCase)
