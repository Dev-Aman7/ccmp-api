const User = require('../../schemas/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const userController = require('../user/controller');

const signUp = async (name, email, address, contact, userType) => {
	return userController.create(name, email, address, contact, userType);
};

const signIn = (registrationId, password) => {
	return User.findOne({ registrationId: registrationId }).then((result) => {
		if (!result) {
			return {
				status: false,
				message: 'No such user',
			};
		} else {
			let compare = bcrypt.compareSync(password, result.password);
			if (compare) {
				const token = jwt.sign(
					{ userId: result._id },
					process.env.SECRET,
				);
				delete result.password;
				return {
					status: true,
					message: 'Success',
					data: result,
					token,
				};
			} else {
				return {
					status: false,
					message: 'Wrong registration id or password',
				};
			}
		}
	});
};

const forgotPassword = async (email) => {
	const token = jwt.sign(email, process.env.RESET_KEY);
	return User.findOneAndUpdate({ email }, { resetToken: token }).then(
		(result) => {
			if (result) {
				let transporter = nodemailer.createTransport({
					// host: "smtp.ethereal.email",
					// port: 587,
					// secure: false, // true for 465, false for other ports
					service: 'gmail',
					auth: {
						user: process.env.Email, // generated ethereal user
						pass: process.env.Password, // generated ethereal password
					},
				});

				// send mail with defined transport object
				transporter.sendMail({
					from: 'Aman Kumar', // sender address
					to: email, // list of receivers
					subject: 'Reset Password link', // Subject line

					html: `<a href=${process.env.CLIENT_URL}/password/reset/${token}> Click here</a><br/> <p>Or paste this link ${process.env.CLIENT_URL}/password/reset/${token}</p>`, // html body
				});
				return {
					status: true,
					message: 'A reset link has been sent to your account',
				};
			} else {
				return {
					status: false,
					message: 'No user found',
				};
			}
		},
	);
};

const resetPassword = async (token, password) => {
	const encrypted = bcrypt.hashSync(password, Number(process.env.salt));

	return User.findOneAndUpdate(
		{ resetToken: token },
		{ resetToken: '', password: encrypted },
	).then((result) => {
		if (!result) {
			return {
				status: false,
				message: 'Link expired',
			};
		} else {
			return {
				status: true,
				message: 'Successfully changed password',
			};
		}
	});
};

module.exports = {
	signUp,
	signIn,
	resetPassword,
	forgotPassword,
};
