var mongoose = require('mongoose');

module.exports = mongoose.model('resultsdetail', {
	DATE : { type: Date, default: Date.now },
        SENTIMENT: Number,
        GOOGLESENTIMENT: Number,
        TWITTERENGLISH: Number,
        TWITTERSPANISH: Number,
        RSSENGLISH: Number,
        RSSSPANISH: Number
});