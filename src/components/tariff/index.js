const router = require('express').Router();
const validation = require('../../middlewares/validation');
const responseHandler = require('../../utils/responseHandler');
const controller = require('./controller');

router.post('/create', validation.isAdminTeam, (req, res) => {
	const { planName, type, tariff, rental, duration } = req.body;

	controller
		.create(planName, type, tariff, rental, duration)
		.then((result) => {
			responseHandler.add(res, result, 'Tariff');
		})
		.catch((err) => {
			responseHandler.err500(res, err);
		});
});

router.get('/all', (req, res) => {
	controller
		.getAll()
		.then((result) => {
			if (!result) {
				responseHandler.nodata(res, 'Tariff');
			} else responseHandler.get(res, result, 'Tariff');
		})
		.catch((err) => {
			responseHandler.err500(res, err);
		});
});

router.get('/:id', (req, res) => {
	controller
		.get(req.params.id)
		.then((result) => {
			if (!result) {
				responseHandler.nodata(res, 'Tariff');
			} else responseHandler.get(res, result, 'Tariff');
		})
		.catch((err) => {
			responseHandler.err500(res, err);
		});
});

router.patch('/:planId', validation.isAdminTeam, (req, res) => {
	controller
		.update(req.params.planId, req.body)
		.then((result) => {
			responseHandler.update(res, result, 'Tariff');
		})
		.catch((err) => {
			responseHandler.err500(res, err);
		});
});

router.delete('/:id', validation.isAdminTeam, (req, res) => {
	controller
		.remove(req.params.id)
		.then(() => {
			responseHandler.remove(res, 'Tariff');
		})
		.catch((err) => {
			responseHandler.err500(res, err);
		});
});

module.exports = router;
