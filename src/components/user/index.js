const router = require('express').Router();
const controller = require('./controller');
const validation = require('../../middlewares/validation');

router.patch('/password', validation.validUser, (req, res) => {
	const { newPassword, oldPassword, userId } = req.body;
	controller
		.changePassword(oldPassword, newPassword, userId)
		.then((result) => {
			if (result) {
				res.status(200).json({
					status: true,
					message: 'Successfully changed password',
				});
			} else {
				res.status(401).json({
					status: false,
					message: 'Password mismatch',
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				status: false,
				message: 'Something went wrong',
				err: err.message,
			});
		});
});

module.exports = router;
