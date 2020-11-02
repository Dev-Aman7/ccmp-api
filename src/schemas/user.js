const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		address: { type: String, required: true },
		contact: { type: String, default: 'NA' },
		userType: {
			type: String,
			enum: [
				'Customer',
				'RelationshipManager',
				'HR',
				'AdminTeam',
				'CompanyOperator',
				'ISM',
			],
			required: 'true',
		},
		registrationId: { type: String, unique: true, required: true },
		password: { type: String, required: true },
		resetToken: { type: String },
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('User', User);
