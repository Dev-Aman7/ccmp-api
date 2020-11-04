const User = require('../../schemas/user');

const randomString = require('randomstring');
const bcrypt = require('bcrypt');
require('dotenv').config();

const create = (name, email, address, contact, userType) => {
	console.log('name', name);
	const pass = randomString.generate(6);
	console.log('Salt', process.env.salt);
	const salt = Number(process.env.salt);
	const registrationId = randomString.generate(5);
	const encrypted = bcrypt.hashSync(pass, salt);
	const data =
		userType === 'Customer'
			? new User({
					registrationId,
					name,
					email,
					address,
					contact,
					userType,
					password: encrypted,
					registrationId: registrationId,
			  })
			: new User({
					registrationId,
					name,
					email,
					address,
					contact,
					userType,
					password: encrypted,
			  });
	return data.save().then((result) => {
		console.log('User', result);
		result.password = pass;
		return result;
	});
};

const remove = (id) => {
	return User.findByIdAndDelete(id);
};

const changePassword = async (old, newPass, id) => {
	const result = await User.findById(id);
	const verify = bcrypt.compareSync(old, result.password);
	if (verify) {
		let encrypted = bcrypt.hashSync(newPass, Number(process.env.salt));
		await User.findByIdAndUpdate(id, { password: encrypted });
		return true;
	} else {
		return false;
	}
};

const subscribe = (userId, planId) => {
	console.log('subscribe', userId, planId);
	return User.findByIdAndUpdate(
		userId,
		{ $addToSet: { subscriptions: { planId, date: Date.now() } } },
		{ new: true },
	);
};

const unsubscribe = (userId, planId) => {
	return User.findByIdAndUpdate(
		userId,
		{
			$pull: { subscriptions: { planId } },
		},
		{ new: true },
	);
};

const fetchSubscriptions = (userId) => {
	console.log(' I came');
	return User.findById(userId).populate('subscriptions.planId');
};

module.exports = {
	create,
	remove,
	changePassword,
	subscribe,
	unsubscribe,
	fetchSubscriptions,
};
