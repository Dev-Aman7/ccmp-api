const err500 = (res, err) => {
	if (err.code === 11000) {
		return res.status(409).json({
			status: false,
			message: 'No duplicate values',
			err: err.message,
		});
	}
	return res.status(500).json({
		status: false,
		message: 'Something went wrong',
		err: err.message,
	});
};

const add = (res, data, msg) => {
	return res.status(201).json({
		status: true,
		message: `Successfully added ${msg}`,
		data: data,
	});
};

const update = (res, data, msg) => {
	return res.status(200).json({
		status: true,
		message: `Successfully updated ${msg}`,
		data,
	});
};

const remove = (res, msg) => {
	return res.status(200).json({
		status: true,
		message: `Successfully deleted ${msg}`,
	});
};

const get = (res, data, msg) => {
	return res.status(200).json({
		status: true,
		message: `Successfully fetched ${msg}`,
		data,
	});
};

const nodata = (res, msg) => {
	return res.status(204).json({
		status: true,
		message: `No ${msg} Found`,
	});
};
module.exports = { err500, update, add, remove, get, nodata };
