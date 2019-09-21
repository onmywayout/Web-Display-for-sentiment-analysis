var mongoose = require('mongoose');

module.exports = mongoose.model('spanishtweets', {
	user_name : String,
        tweet_ID: String,
        DATE : { type: Date, default: Date.now },
        SENTIMENT : Number,
        TEXT : String,
        souce 	: String
});