var mongoose = require('mongoose');

module.exports = mongoose.model('', {
	ID : String,
        DATE : { type: Date, default: Date.now },
        SENTIMENT : Number,
        TEXT : String,
        SOURCE 	: String
});