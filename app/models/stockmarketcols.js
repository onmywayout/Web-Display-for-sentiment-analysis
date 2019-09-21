var mongoose = require('mongoose');

module.exports = mongoose.model('stockmarketcol', {
	ID : String,
        DATE : { type: Date, default: Date.now },
         PFBCOLOMVOL  : Number,
        PFBCOLOMVAL  : Number,
        PFBCOLOMVAR  : Number,
        PRECVOL  : Number,
        PRECVAL  : Number,
        PRECVAR  : Number,
        ECOPETROLVOL  : Number,
        ECOPETROLVAL  : Number,
        ECOPETROLVAR  : Number,
});