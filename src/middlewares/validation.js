const jwt = require('jsonwebtoken');
const User = require('../schemas/user');

const isHR = (req, res, next) => {
	const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);

	User.findById(decodedToken.userId).then((result) => {
		if (result.userType === 'HR') {
			next();
		} else {
			res.status(401).json({
				status: false,
				message: ' Unauthorized access',
			});
		}
	});
};

const isRelationshipManager = (req, res, next) => {
	const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);

	User.findById(decodedToken.userId).then((result) => {
		if (result.userType === 'RelationshipManager') {
			next();
		} else {
			res.status(401).json({
				status: false,
				message: ' Unauthorized access',
			});
		}
	});
};

const isAdminTeam = (req, res, next) => {
	const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);

	User.findById(decodedToken.userId).then((result) => {
		if (result.userType === 'AdminTeam') {
			next();
		} else {
			res.status(401).json({
				status: false,
				message: ' Unauthorized access',
			});
		}
	});
};

const isCompanyOperator = (req, res, next) => {
	const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);

	User.findById(decodedToken.userId).then((result) => {
		if (result.userType === 'CompanyOperator') {
			next();
		} else {
			res.status(401).json({
				status: false,
				message: ' Unauthorized access',
			});
		}
	});
};

const isISM = (req, res, next) => {
	const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);

	User.findById(decodedToken.userId).then((result) => {
		if (result.userType === 'ISM') {
			next();
		} else {
			res.status(401).json({
				status: false,
				message: ' Unauthorized access',
			});
		}
	});
};

const validUser = (req, res, next) => {
	const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
	if (decodedToken.userId === req.body.userId) {
		next();
	} else {
		res.status(403).json({
			status: false,
			message: 'Forbidden entry',
		});
	}
};

module.exports = {
	isHR,
	validUser,
	isRelationshipManager,
	isAdminTeam,
	isCompanyOperator,
	isISM,
};
