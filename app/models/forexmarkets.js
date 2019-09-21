var mongoose = require('mongoose');

module.exports = mongoose.model('forexmarket', {
        DATE : { type: Date, default: Date.now },
        VALUE	: String
});