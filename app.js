const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwt = require('express-jwt');
require('dotenv').config();
// connect to db
require('./src/components/db/setup').connect();

const swaggerDocs = require('./src/docs/index');
const auth = require('./src/components/auth');
const hr = require('./src/components/HR');
const user = require('./src/components/user');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
	jwt({
		secret: process.env.SECRET,
		algorithms: ['HS256'],
		credentialsRequired: true,
		getToken: function fromHeaderOrQuerystring(req) {
			// console.log(req.headers);
			if (
				req.headers.authorization &&
				req.headers.authorization.split(' ')[0] === 'Bearer'
			) {
				return req.headers.authorization.split(' ')[1];
			}
			if (req.query && req.query.token) {
				return req.query.token;
			}
			// console.log("in else", req.originalUrl);
			return null;
		},
	}).unless({
		path: [
			'/auth/signin',
			'/auth/signup',
			'/auth/password/forgot',
			'/auth/password/reset',
		],
	}),
);

app.use('/auth', auth);
app.use('/swagger', swaggerDocs);
app.use('/hr', hr);
app.use('/user', user);
// error handler
// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	if (!process.env.NODE_ENV) {
		console.log(err);
	}
	res.status(err.status || 500).send({
		error: true,
		message: err.message,
		error_detail: {
			message: err.message,
			code: err.status,
		},
	});
	next();
});

module.exports = app;
