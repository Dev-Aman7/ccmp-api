const router = require('express').Router();
const controller = require('./controller');
const validation = require('../../middlewares/validation');
const responseHandler = require('../../utils/responseHandler');

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

router.patch('/:userId/tariff/:planId/subscribe', (req, res) => {
	controller
		.subscribe(req.params.userId, req.params.planId)
		.then((result) => {
			responseHandler.update(res, result, 'Tariff');
		})
		.catch((err) => {
			responseHandler.err500(res, err);
		});
});

router.patch('/:userId/tariff/:planId/unsubscribe', (req, res) => {
	console.log('unsubscribe');
	controller
		.unsubscribe(req.params.userId, req.params.planId)
		.then((result) => {
			responseHandler.update(res, result, 'Tariff');
		})
		.catch((err) => {
			responseHandler.err500(res, err);
		});
});

router.get('/:userId/subscriptions', (req, res) => {
	controller
		.fetchSubscriptions(req.params.userId)
		.then((result) => {
			responseHandler.get(res, result, 'Subscriptions');
		})
		.catch((err) => {
			responseHandler.err500(res, err);
		});
});

module.exports = router;
