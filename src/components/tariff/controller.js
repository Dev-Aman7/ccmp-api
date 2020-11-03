const tariff = require('../../schemas/tariff');
const Tariff = require('../../schemas/tariff');

const create = (planName, type, tariff, rental, duration) => {
	const data = new Tariff({
		planName,
		type,
		tariff,
		rental,
		duration,
	});
	return data.save();
};

const get = (id) => {
	return Tariff.findById(id);
};
const getAll = () => {
	return Tariff.find();
};
const update = (id, data) => {
	return Tariff.findByIdAndUpdate(id, data, {
		new: true,
	});
};

const remove = (planId) => {
	console.log(planId);
	return Tariff.findByIdAndDelete(planId);
};

module.exports = {
	create,
	remove,
	update,
	getAll,
	get,
};
