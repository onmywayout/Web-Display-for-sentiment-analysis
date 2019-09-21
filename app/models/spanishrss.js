var mongoose = require('mongoose');

module.exports = mongoose.model('spanishrs', {
	ID : String,
        DATE : { type: Date, default: Date.now },
        SENTIMENT : Number,
        TEXT : String,
        SOURCE 	: String
});