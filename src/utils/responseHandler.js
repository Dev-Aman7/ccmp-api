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

const add = (res, id, msg) => {
	return res.status(201).json({
		status: true,
		message: `Successfully added ${msg}`,
		data: {
			_id: id,
		},
	});
};

const update = (res, msg) => {
	return res.status(200).json({
		status: true,
		message: `Successfully updated ${msg}`,
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
export { err500, update, add, remove, get, nodata };
