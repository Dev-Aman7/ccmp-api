const router = require('express').Router();
const validate = require('../../middlewares/validation');
const controller = require('./controller');

router.post('/user/create', validate.isHR, (req, res) => {
	const { name, email, address, contact, userType } = req.body;
	// console.log
	console.table(req.body);
	controller
		.createUser(name, email, address, contact, userType)
		.then((result) => {
			res.status(200).json({
				status: true,
				message: 'Successfully created user',
				data: result,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				status: false,
				message: 'Something went wrong',
			});
		});
});

router.post('/user/remove', validate.isHR, (req, res) => {
	const { employeeId } = req.body;
	controller
		.removeUser(employeeId)
		.then((result) => {
			res.status(200).json({
				status: true,
				message: 'Successfully deleted user',
			});
		})
		.catch((err) => {
			res.status(500).json({
				status: false,
				message: 'Something went wrong',
			});
		});
});

module.exports = router;
