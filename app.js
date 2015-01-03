/*************************************************************************
	> File Name: app.js
	> Created Time: Fri 02 Jan 2015 01:48:56 PM HKT
	> Author: Wayne Ho
	> Mail: hewr2010@gmail.com
 ************************************************************************/

var port = process.env.PORT || 13920
var express = require('express')
var multer  = require('multer')
var mongoose = require('mongoose')
var CaseModel = require("./models/case")
var moment = require('moment')
var app = express()

app.use(multer({
	dest: './static/uploads/',
	includeEmptyFields: true,
	rename: function(fieldname, filename) {
		return filename + Date.now();
	},
	onFileUploadStart: function(file) {
		//console.log(file.originalname + ' is starting ...')
	},
	onFileUploadComplete: function(file) {
		//console.log(file.fieldname + ' uploaded to  ' + file.path)
	}
}));

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

app.get('/admin', function(req, res) {
	res.render('admin', {
	})
})

app.post('/admin/new', function(req, res) {
	var headline = req.body.headline || ""
	var text = req.body.text || ""
	var tag = req.body.tag || ""
	var startDate = moment(req.body.startDate).format("MM/DD/YYYY")
	var endDate = moment(req.body.endDate ? req.body.endDate : startDate).format("MM/DD/YYYY")
	var media_filename = req.files.media ? req.files.media.name : ""
	var thumbnail_filename = req.files.thumbnail ? req.files.thumbnail.name : ""
	if (headline.length == 0 || moment(startDate).format("YYYY/MM/DD") > moment(endDate).format("YYYY/MM/DD")) {
		res.send({success: "no", content:headline + " " + startDate + " " + endDate})
		return
	}
	obj = {
		headline: headline,
		text: text,
		tag: tag,
		startDate: startDate,
		endDate: endDate,
		media: media_filename,
		thumbnail: thumbnail_filename
	}
	CaseModel.save(obj, function(err) {
		if (err) {
			res.send({success: "no"})
		} else {
			res.send({success: "yes"})
		}
	})
})

app.post('/admin/modify/:id', function(req, res) {
	var _id = req.params.id || ""
	var headline = req.body.headline || ""
	var text = req.body.text || ""
	var tag = req.body.tag || ""
	var startDate = moment(req.body.startDate).format("MM/DD/YYYY")
	var endDate = moment(req.body.endDate ? req.body.endDate : startDate).format("MM/DD/YYYY")
	var media_filename = req.files.media ? req.files.media.name : ""
	var thumbnail_filename = req.files.thumbnail ? req.files.thumbnail.name : ""
	if (_id.length == 0 || headline.length == 0 || moment(startDate).format("YYYY/MM/DD") > moment(endDate).format("YYYY/MM/DD")) {
		res.send({success: "no", content: _id + " " + headline})
		return
	}
	obj = {
		headline: headline,
		text: text,
		tag: tag,
		startDate: startDate,
		endDate: endDate
	}
	if (media_filename.length > 0) obj.media = media_filename
	if (thumbnail_filename.length > 0) obj.thumbnail = thumbnail_filename
	CaseModel.update(_id, obj, function(err) {
		if (err) {
			res.send({success: "no", content: err})
		} else {
			res.send({success: "yes"})
		}
	})
})

app.get('/cases', function(req, res) {
	CaseModel.fetch(function(err, cases) {
		if (err) {
			res.send({success: "no"})
		} else {
			var resultJSON = {
				timeline: {
					headline: "大时代的小日子",
					type: "default",
					text: "蛋蛋和豆豆爱情生活的点点滴滴",
					asset: {
						"media":"/static/imgs/ourlove.jpg",
						"credit":"",
						"caption":""
					},
					date: []
				}
			};
			for (var i in cases) {
				var _case = cases[i]
				var startDate = moment(_case.startDate).format("YYYY,MM,DD")
				var endDate = moment(_case.endDate).format("YYYY,MM,DD")
				var obj = {
					startDate: startDate,
					endDate: endDate,
					headline: _case.headline,
					text: _case.text,
					tag: _case.tag,
					classname: "",
					asset: {
						media: _case.media,
						thumbnail: _case.thumbnail == "" ? _case.media : _case.thumbnail,
						credit: "",
						caption: ""
					}
				}
				obj.asset.media = obj.asset.media == "" ? "/static/imgs/iloveu.png" : "/static/uploads/" + obj.asset.media
				obj.asset.thumbnail = obj.asset.thumbnail == "" ? "/static/imgs/iloveu.png" : "/static/uploads/" + obj.asset.thumbnail
				resultJSON.timeline.date.push(obj)
			}
			res.send(resultJSON)
		}
	})
})

app.get('/cases/info', function(req, res) {
	CaseModel.fetch(function(err, cases) {
		if (err) {
			res.send({success: "no"})
		} else {
			res.send(cases)
		}
	})
})
