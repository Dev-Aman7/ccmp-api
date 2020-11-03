// const User=require('../../schemas/user');
const userController = require('../user/controller');
const createUser = (name, email, address, contact, userType) => {
	console.log('user', name);
	return userController.create(name, email, address, contact, userType);
};

const removeUser = (id) => {
	return userController.remove(id);
};
module.exports = {
	createUser,
	removeUser,
};
