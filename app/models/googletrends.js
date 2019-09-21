var mongoose = require('mongoose');

module.exports = mongoose.model('googletrend', {
	 ENDWEEKDATE: { type: Date, default: Date.now },
        DOLAR: Number,
        PRECIO_DOLAR: Number,
        TRM: Number,
        DIVISAS: Number,
        COLOMBIAN_PESO: Number,
});