var mongoose = require('mongoose');

module.exports = mongoose.model('evaluatedsentiment', {
	ID : String,
        DATE : { type: Date, default: Date.now },
        SENTIMENT : Number,
        TYPE : String,
        LANGUAGE: String
});