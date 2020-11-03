const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tariff = new Schema({
	planName: { type: String, required: true, unique: true },
	type: { type: String, required: true, enum: ['Data', 'Voice'] },
	tariff: { type: String, required: true },
	rental: { type: Boolean, required: true, default: false },
	duration: { type: String, required: true },
});

module.exports = mongoose.model('Tariff', Tariff);
