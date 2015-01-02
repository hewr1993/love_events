var Case = require("../models/case")

exports.showAll = function(req, res) {
	Case.fetch(function(err, cases) {
		if (err) {
			res.send({'success': false, 'err': err})
		} else {
			res.render('index', {
				title: '给豆豆',
				cases: cases
			})
		}
	})
}

exports.addCase = function(req, res) {
	var content = req.params.content
	var _case = {content: content}
	Case.save(_case, function(err) {
		if(err) {
			res.send({'success': false, 'err': err})
		} else {
			res.send({'success': true})
		}
	})
}
