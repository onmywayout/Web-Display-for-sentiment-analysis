var mongoose = require('mongoose');

module.exports = mongoose.model('statu', {
	ID : String,
        DATE : { type: Date, default: Date.now },
        ERROR: String,
        INFO: String,
        ORIGIN: String,
        IP: String,
});