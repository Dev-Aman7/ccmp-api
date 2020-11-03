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

module.exports = {
	create,
	remove,
	changePassword,
};
