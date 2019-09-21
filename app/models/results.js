var mongoose = require('mongoose');

module.exports = mongoose.model('result', {
	
         DATE : { type: Date, default: Date.now },
        COPACTUAL : Number,
        COPPREDICTED : Number
});