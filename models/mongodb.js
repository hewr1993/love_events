var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todoudou');
exports.mongoose = mongoose;
