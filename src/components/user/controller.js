const User = require('../../schemas/user');

const randomString = require('randomstring');
const bcrypt = require('bcrypt');
require('dotenv').config();

const create = (name, email, address, contact, userType) => {
	const pass = randomString.generate(6);
	console.log('Salt', process.env.salt);
	const salt = Number(process.env.salt);
	const encrypted = bcrypt.hashSync(pass, salt);
	const data =
		userType === 'Customer'
			? new User({
					name,
					email,
					address,
					contact,
					userType,
					password: encrypted,
					registrationId: randomString.generate('10'),
			  })
			: new User({
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

module.exports = {
	create,
};
