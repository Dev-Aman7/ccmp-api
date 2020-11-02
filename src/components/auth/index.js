const router = require('express').Router();
const user = require('../../schemas/user');
const controller = require('./controller');

router.post('/signup', (req, res) => {
	const { name, email, address, contact } = req.body;
	controller
		.signUp(name, email, address, contact, 'Customer')
		.then((result) => {
			res.status(200).json({
				status: true,
				data: result,
				message: 'Successfully signed up user',
			});
		})
		.catch((err) => {
			console.log(err);
			if (err.code === 11000) {
				res.status(409).json({
					status: false,
					message: 'Email already in use',
				});
			} else
				res.status(500).json({
					status: false,
					message: 'Something went wrong',
				});
		});
});

router.post('/signin', (req, res) => {
	const { email, password } = req.body;
	controller
		.signIn(email, password)
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({
				status: false,
				message: 'Something went wrong',
			});
		});
});

router.post('/password/reset', (req, res) => {
	const { token, password } = req.body;
	controller
		.resetPassword(token, password)
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({
				status: false,
				message: 'Something went wrong',
			});
		});
});
router.post('/password/forgot', (req, res) => {
	const { email } = req.body;
	controller
		.forgotPassword(email)
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({
				status: false,
				message: 'Something went wrong',
			});
		});
});

module.exports = router;
